"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  BarChart2,
  CheckCircle,
  ChevronRight,
  Crown,
  Eye,
  Globe,
  Mail,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
  ArrowUp,
  ArrowDown,
  Download,
} from "lucide-react";

// ─── Local UI primitives (strictly scoped to this component) ─────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-3 mb-4">
      <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
      {action}
    </div>
  );
}

function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${map[color] ?? map.blue}`}>{children}</span>
  );
}

// ─── Mock ASME data (scoped only to ASME Pages) ──────────────────────────────

const FEATURED_ASMES = [
  { id: 1, name: "Vikramaditya Sen", role: "Energy Transition Analyst", sector: "Renewable Energy", industry: "Green Hydrogen", country: "India", expertise: "LCOH Modelling", initials: "VS", color: "from-amber-500 to-orange-600", verified: true, featured: true, rate: "$90/hr", followers: "1.2K", views: "18.4K" },
  { id: 2, name: "Ananya Roy", role: "FinTech Compliance Analyst", sector: "Finance", industry: "FinTech", country: "India", expertise: "UPI Cross-Border", initials: "AR", color: "from-cyan-500 to-blue-600", verified: true, featured: false, rate: "$85/hr", followers: "980", views: "14.1K" },
  { id: 3, name: "Priya Nair", role: "Defence Technology Analyst", sector: "Defence", industry: "UAV & Drone Tech", country: "India", expertise: "Sensor Fusion", initials: "PN", color: "from-purple-500 to-indigo-600", verified: true, featured: true, rate: "$95/hr", followers: "1.5K", views: "22.6K" },
  { id: 4, name: "Siddharth Mehta", role: "Trade Compliance Analyst", sector: "Shipping", industry: "Customs & Logistics", country: "India", expertise: "Manifest Digitization", initials: "SM", color: "from-teal-500 to-emerald-600", verified: false, featured: false, rate: "$80/hr", followers: "760", views: "9.8K" },
  { id: 5, name: "Meghna Iyer", role: "Biotech Regulatory Analyst", sector: "Biotechnology", industry: "Phytochemicals", country: "India", expertise: "EU Export Compliance", initials: "MI", color: "from-rose-500 to-pink-600", verified: true, featured: false, rate: "$88/hr", followers: "840", views: "11.3K" },
  { id: 6, name: "Rohan Pillai", role: "AgriTech Innovation Analyst", sector: "Agriculture", industry: "Precision Farming", country: "India", expertise: "Drone Sprayer Policy", initials: "RP", color: "from-green-500 to-teal-600", verified: false, featured: false, rate: "$78/hr", followers: "620", views: "7.4K" },
];

const TOP_ASMES_TABS = ["Most Viewed", "Most Followed", "Most Active", "Top Rated"] as const;
type TopTab = typeof TOP_ASMES_TABS[number];

const TOP_ASMES: Record<TopTab, typeof FEATURED_ASMES> = {
  "Most Viewed": [FEATURED_ASMES[2], FEATURED_ASMES[0], FEATURED_ASMES[1], FEATURED_ASMES[4]],
  "Most Followed": [FEATURED_ASMES[2], FEATURED_ASMES[0], FEATURED_ASMES[1], FEATURED_ASMES[3]],
  "Most Active": [FEATURED_ASMES[0], FEATURED_ASMES[2], FEATURED_ASMES[4], FEATURED_ASMES[5]],
  "Top Rated": [FEATURED_ASMES[2], FEATURED_ASMES[0], FEATURED_ASMES[1], FEATURED_ASMES[4]],
};

const RANKING_TABS = ["Overall", "By Industry", "By Sector", "By Country"] as const;
type RankTab = typeof RANKING_TABS[number];

type RankEntry = { rank: number; name: string; initials: string; color: string; detail: string; metric: string; change: number };
const RANKINGS: Record<RankTab, RankEntry[]> = {
  Overall: [
    { rank: 1, name: "Priya Nair", initials: "PN", color: "from-purple-500 to-indigo-600", detail: "Defence · UAV Tech", metric: "22.6K views", change: 2 },
    { rank: 2, name: "Vikramaditya Sen", initials: "VS", color: "from-amber-500 to-orange-600", detail: "Energy · Green H2", metric: "18.4K views", change: 0 },
    { rank: 3, name: "Ananya Roy", initials: "AR", color: "from-cyan-500 to-blue-600", detail: "Finance · FinTech", metric: "14.1K views", change: -1 },
    { rank: 4, name: "Meghna Iyer", initials: "MI", color: "from-rose-500 to-pink-600", detail: "Biotech · Export", metric: "11.3K views", change: 3 },
    { rank: 5, name: "Siddharth Mehta", initials: "SM", color: "from-teal-500 to-emerald-600", detail: "Shipping · Customs", metric: "9.8K views", change: -2 },
  ],
  "By Industry": [
    { rank: 1, name: "Vikramaditya Sen", initials: "VS", color: "from-amber-500 to-orange-600", detail: "Green Hydrogen", metric: "LCOH Modelling", change: 1 },
    { rank: 2, name: "Priya Nair", initials: "PN", color: "from-purple-500 to-indigo-600", detail: "UAV Technology", metric: "Sensor Fusion", change: 0 },
    { rank: 3, name: "Ananya Roy", initials: "AR", color: "from-cyan-500 to-blue-600", detail: "FinTech", metric: "UPI Cross-Border", change: 0 },
    { rank: 4, name: "Meghna Iyer", initials: "MI", color: "from-rose-500 to-pink-600", detail: "Phytochemicals", metric: "EU Compliance", change: 2 },
    { rank: 5, name: "Rohan Pillai", initials: "RP", color: "from-green-500 to-teal-600", detail: "Precision Farming", metric: "Drone Policy", change: -1 },
  ],
  "By Sector": [
    { rank: 1, name: "Priya Nair", initials: "PN", color: "from-purple-500 to-indigo-600", detail: "Defence", metric: "4 publications", change: 1 },
    { rank: 2, name: "Vikramaditya Sen", initials: "VS", color: "from-amber-500 to-orange-600", detail: "Renewable Energy", metric: "6 publications", change: 0 },
    { rank: 3, name: "Ananya Roy", initials: "AR", color: "from-cyan-500 to-blue-600", detail: "Finance", metric: "3 publications", change: -1 },
    { rank: 4, name: "Meghna Iyer", initials: "MI", color: "from-rose-500 to-pink-600", detail: "Biotechnology", metric: "5 publications", change: 2 },
    { rank: 5, name: "Siddharth Mehta", initials: "SM", color: "from-teal-500 to-emerald-600", detail: "Shipping", metric: "2 publications", change: 0 },
  ],
  "By Country": [
    { rank: 1, name: "Priya Nair", initials: "PN", color: "from-purple-500 to-indigo-600", detail: "India", metric: "1.5K followers", change: 0 },
    { rank: 2, name: "Vikramaditya Sen", initials: "VS", color: "from-amber-500 to-orange-600", detail: "India", metric: "1.2K followers", change: 1 },
    { rank: 3, name: "Ananya Roy", initials: "AR", color: "from-cyan-500 to-blue-600", detail: "India", metric: "980 followers", change: -1 },
    { rank: 4, name: "Meghna Iyer", initials: "MI", color: "from-rose-500 to-pink-600", detail: "India", metric: "840 followers", change: 0 },
    { rank: 5, name: "Rohan Pillai", initials: "RP", color: "from-green-500 to-teal-600", detail: "India", metric: "620 followers", change: 0 },
  ],
};

const EMERGING_ASMES = [
  { name: "Rohan Pillai", role: "AgriTech Innovation Analyst", initials: "RP", color: "from-green-500 to-teal-600", label: "Emerging", sector: "Agriculture", momentum: "+42% engagement this week" },
  { name: "Kavya Sharma", role: "Space Tech Policy Analyst", initials: "KS", color: "from-indigo-500 to-purple-600", label: "Rising", sector: "Space Tech", momentum: "+38% engagement this week" },
  { name: "Arjun Das", role: "Smart Manufacturing Analyst", initials: "AD", color: "from-blue-500 to-cyan-600", label: "New", sector: "Manufacturing", momentum: "Newly Verified" },
];

const TRENDING_ASMES = [
  { name: "Vikramaditya Sen", initials: "VS", color: "from-amber-500 to-orange-600", sector: "Renewable Energy", signal: "18 searches today", rank: 1 },
  { name: "Priya Nair", initials: "PN", color: "from-purple-500 to-indigo-600", sector: "Defence", signal: "14 new follows today", rank: 2 },
  { name: "Ananya Roy", initials: "AR", color: "from-cyan-500 to-blue-600", sector: "FinTech", signal: "Trending in FinTech", rank: 3 },
  { name: "Meghna Iyer", initials: "MI", color: "from-rose-500 to-pink-600", sector: "Biotechnology", signal: "3 new articles this week", rank: 4 },
];

const SECTORS = [
  { name: "Renewable Energy", count: "48 ASMEs", icon: "⚡" },
  { name: "FinTech & Finance", count: "62 ASMEs", icon: "💳" },
  { name: "Defence & Security", count: "35 ASMEs", icon: "🛡️" },
  { name: "Biotechnology", count: "41 ASMEs", icon: "🧬" },
  { name: "Shipping & Logistics", count: "53 ASMEs", icon: "🚢" },
  { name: "Agriculture & AgriTech", count: "44 ASMEs", icon: "🌾" },
  { name: "Semiconductors & IT", count: "58 ASMEs", icon: "💻" },
  { name: "Healthcare & Pharma", count: "39 ASMEs", icon: "🏥" },
];

const INDUSTRIES = [
  { name: "Green Hydrogen", count: "12 ASMEs" },
  { name: "UPI Cross-Border", count: "9 ASMEs" },
  { name: "UAV & Drone Tech", count: "14 ASMEs" },
  { name: "Phytochemicals", count: "7 ASMEs" },
  { name: "Precision Farming", count: "11 ASMEs" },
  { name: "Customs Digitization", count: "8 ASMEs" },
  { name: "Smart Manufacturing", count: "16 ASMEs" },
  { name: "Space Technology", count: "5 ASMEs" },
];

const COUNTRIES = [
  { name: "India", count: "280 ASMEs", flag: "🇮🇳" },
  { name: "Singapore", count: "42 ASMEs", flag: "🇸🇬" },
  { name: "UAE", count: "38 ASMEs", flag: "🇦🇪" },
  { name: "United Kingdom", count: "31 ASMEs", flag: "🇬🇧" },
  { name: "Germany", count: "24 ASMEs", flag: "🇩🇪" },
  { name: "USA", count: "19 ASMEs", flag: "🇺🇸" },
];

const EXPERTISES = [
  { name: "Regulatory Compliance", count: "68 ASMEs" },
  { name: "Export & Trade", count: "54 ASMEs" },
  { name: "AI & Data Science", count: "47 ASMEs" },
  { name: "Sustainability", count: "42 ASMEs" },
  { name: "Policy Analysis", count: "38 ASMEs" },
  { name: "Supply Chain", count: "35 ASMEs" },
];

const ACHIEVEMENTS = [
  { name: "Vikramaditya Sen", achievement: "Published landmark LCOH report adopted by 3 GoI committees", type: "Research Achievement", time: "2 days ago" },
  { name: "Priya Nair", achievement: "Recognized at DefExpo 2026 for UAV sensor fusion research", type: "Award Recognition", time: "5 days ago" },
  { name: "Ananya Roy", achievement: "ASEAN FinTech Summit keynote speaker on UPI cross-border rails", type: "Speaking Achievement", time: "1 week ago" },
];

const RECOGNIZED_ASMES = [
  { name: "Priya Nair", initials: "PN", color: "from-purple-500 to-indigo-600", badge: "Award Recognized", badgeIcon: "🏆", detail: "DefExpo 2026 Recognition" },
  { name: "Vikramaditya Sen", initials: "VS", color: "from-amber-500 to-orange-600", badge: "Verified Expert", badgeIcon: "✓", detail: "GoI Energy Panel Verified" },
  { name: "Ananya Roy", initials: "AR", color: "from-cyan-500 to-blue-600", badge: "Featured Expert", badgeIcon: "⭐", detail: "iGEN Editorial Selection" },
];

const COMPARE_POOL = FEATURED_ASMES.slice(0, 5);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ASMEPagesView() {
  const [activeTopTab, setActiveTopTab] = useState<TopTab>("Most Viewed");
  const [activeRankTab, setActiveRankTab] = useState<RankTab>("Overall");
  const [compareA, setCompareA] = useState(0);
  const [compareB, setCompareB] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeNavSection, setActiveNavSection] = useState("featured");

  const navItems = [
    { id: "featured", label: "Featured" },
    { id: "top", label: "Top ASMEs" },
    { id: "rankings", label: "Rankings" },
    { id: "emerging", label: "Emerging" },
    { id: "trending", label: "Trending" },
    { id: "sector", label: "By Sector" },
    { id: "industry", label: "By Industry" },
    { id: "country", label: "By Country" },
    { id: "expertise", label: "By Expertise" },
    { id: "compare", label: "Compare" },
  ];

  const scrollTo = (id: string) => {
    setActiveNavSection(id);
    const el = document.getElementById(`asme-section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const asmA = COMPARE_POOL[compareA];
  const asmB = COMPARE_POOL[compareB];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/20 px-3 py-1 rounded-full bg-white/10 inline-block">
              ASME Pages
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Discover the Top &amp; Emerging ASMEs
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-2xl">
              Explore featured, top-performing, emerging, trending and recognized Associate Subject Matter Experts across industries, sectors, countries and areas of expertise.
            </p>
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-white/40 placeholder:text-gray-400"
                  placeholder="Search ASMEs, industries, expertise or sectors..."
                  aria-label="Search ASMEs"
                />
              </div>
              <Link href="/eoi" className="bg-white text-blue-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shrink-0">
                Explore ASMEs →
              </Link>
              <Link href="/eoi" className="border border-white/30 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0">
                Get Featured →
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { label: "ASMEs Listed", value: "3,200+" },
                { label: "Sectors Covered", value: "50" },
                { label: "Industries", value: "1,350+" },
                { label: "Countries", value: "38" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY DISCOVERY NAV ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-1 overflow-x-auto py-2" style={{ scrollbarWidth: "none" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-label={`Navigate to ${item.label}`}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeNavSection === item.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-blue-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── FEATURED ASMEs ────────────────────────────────────────────────── */}
        <section id="asme-section-featured">
          <SectionTitle
            title="Featured ASMEs"
            action={<Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">View All →</Link>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_ASMES.map((asme) => (
              <Card key={asme.id} className="p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${asme.color} text-white font-bold text-sm flex items-center justify-center shrink-0`}>
                      {asme.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">{asme.name}</h3>
                      <p className="text-[9px] text-gray-400">{asme.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {asme.featured && <Badge color="amber">FEATURED</Badge>}
                    {asme.verified && (
                      <span className="flex items-center gap-0.5 text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge color="blue">{asme.sector}</Badge>
                  <Badge color="indigo">{asme.industry}</Badge>
                  <Badge color="purple">{asme.country}</Badge>
                </div>
                <div className="text-[9px] text-gray-400 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-2">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{asme.views}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{asme.followers}</span>
                  <span className="font-bold text-blue-600 ml-auto">{asme.rate}</span>
                </div>
                <Link
                  href="/eoi"
                  className="block w-full text-center text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  aria-label={`View ${asme.name} ASME profile`}
                >
                  View ASME →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── TOP ASMEs ─────────────────────────────────────────────────────── */}
        <section id="asme-section-top">
          <SectionTitle title="Top ASMEs" action={<TrendingUp className="h-4 w-4 text-blue-500" />} />
          <Card className="p-4 space-y-4">
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800 flex-wrap">
              {TOP_ASMES_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTopTab(tab)}
                  className={`flex-1 min-w-[80px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    activeTopTab === tab
                      ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {TOP_ASMES[activeTopTab].map((asme, idx) => (
                <div key={asme.id} className="flex items-center gap-3 py-3">
                  <span className="text-sm font-bold text-blue-600 w-6 shrink-0 text-center">#{idx + 1}</span>
                  <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                    {asme.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{asme.name}</p>
                    <p className="text-[9px] text-gray-400">{asme.sector} · {asme.industry}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[9px] text-gray-400">
                      {activeTopTab === "Most Viewed" && <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{asme.views}</span>}
                      {activeTopTab === "Most Followed" && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{asme.followers}</span>}
                      {activeTopTab === "Most Active" && <span className="text-emerald-600 font-bold">Active</span>}
                      {activeTopTab === "Top Rated" && <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Star className="h-3 w-3 fill-amber-500" />4.8</span>}
                    </span>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded-lg hover:bg-blue-100" aria-label={`View ${asme.name}`}>
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── RANKINGS ──────────────────────────────────────────────────────── */}
        <section id="asme-section-rankings">
          <SectionTitle
            title="ASME Rankings"
            action={<Badge color="indigo">Updated Weekly</Badge>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-4 space-y-4">
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800 flex-wrap">
                  {RANKING_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveRankTab(tab)}
                      className={`flex-1 min-w-[70px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                        activeRankTab === tab
                          ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {RANKINGS[activeRankTab].map((item) => (
                    <div key={item.rank} className="flex items-center gap-3 py-3">
                      <div className="w-6 shrink-0 text-center">
                        <span className={`text-sm font-bold ${item.rank <= 3 ? "text-amber-500" : "text-gray-400"}`}>#{item.rank}</span>
                      </div>
                      <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${item.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {item.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-[9px] text-gray-400">{item.detail}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] text-gray-400">{item.metric}</span>
                        {item.change > 0 && (
                          <span className="flex items-center gap-0.5 text-[8px] font-bold text-emerald-600" aria-label={`Up ${item.change} positions`}>
                            <ArrowUp className="h-2.5 w-2.5" />+{item.change}
                          </span>
                        )}
                        {item.change < 0 && (
                          <span className="flex items-center gap-0.5 text-[8px] font-bold text-rose-500" aria-label={`Down ${Math.abs(item.change)} positions`}>
                            <ArrowDown className="h-2.5 w-2.5" />{item.change}
                          </span>
                        )}
                        {item.rank <= 3 && <Trophy className="h-3.5 w-3.5 text-amber-500" aria-label="Top 3" />}
                        <Link href="/eoi" className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded-lg" aria-label={`View ${item.name}`}>View →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            {/* Methodology */}
            <div>
              <Card className="p-4 space-y-3">
                <SectionTitle title="How Rankings Work" action={<BarChart2 className="h-4 w-4 text-gray-400" />} />
                <p className="text-[10px] text-gray-500 leading-relaxed">Rankings are recalculated weekly using a transparent combination of platform signals.</p>
                {[
                  { signal: "Platform engagement", weight: "30%" },
                  { signal: "Content activity", weight: "25%" },
                  { signal: "Profile completeness", weight: "20%" },
                  { signal: "Verified credentials", weight: "15%" },
                  { signal: "Follower growth", weight: "10%" },
                ].map((item) => (
                  <div key={item.signal} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] text-gray-600 dark:text-gray-400">{item.signal}</span>
                    <span className="text-[10px] font-bold text-blue-600">{item.weight}</span>
                  </div>
                ))}
                <Link href="/eoi" className="block text-center text-[10px] font-bold text-blue-600 hover:underline pt-1">
                  Full Methodology →
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* ── EMERGING + TRENDING ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <section id="asme-section-emerging">
            <Card className="p-4 h-full space-y-4">
              <SectionTitle title="Emerging ASMEs" action={<Sparkles className="h-4 w-4 text-purple-500" />} />
              <div className="space-y-3">
                {EMERGING_ASMES.map((asme, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {asme.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{asme.name}</span>
                        <Badge color={asme.label === "Emerging" ? "purple" : asme.label === "Rising" ? "indigo" : "blue"}>{asme.label}</Badge>
                      </div>
                      <p className="text-[9px] text-gray-400">{asme.role}</p>
                      <p className="text-[9px] text-emerald-600 font-bold mt-0.5">{asme.momentum}</p>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 shrink-0" aria-label={`View ${asme.name}`}>View →</Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section id="asme-section-trending">
            <Card className="p-4 h-full space-y-4">
              <SectionTitle title="Trending ASMEs This Week" action={<TrendingUp className="h-4 w-4 text-blue-500" />} />
              <div className="space-y-3">
                {TRENDING_ASMES.map((asme) => (
                  <div key={asme.rank} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 h-6 w-6 rounded flex items-center justify-center shrink-0" aria-label={`Rank ${asme.rank}`}>
                      #{asme.rank}
                    </span>
                    <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {asme.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{asme.name}</p>
                      <p className="text-[8px] text-gray-400">{asme.signal}</p>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 shrink-0" aria-label={`View ${asme.name}`}>View →</Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── BY SECTOR ─────────────────────────────────────────────────────── */}
        <section id="asme-section-sector">
          <SectionTitle
            title="Explore ASMEs by Sector"
            action={<Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">All 50 Sectors →</Link>}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {SECTORS.map((sec) => (
              <Link key={sec.name} href="/eoi" aria-label={`Explore ASMEs in ${sec.name}`}>
                <Card className="p-4 hover:border-blue-400 transition-colors cursor-pointer group">
                  <div className="text-2xl mb-2" aria-hidden="true">{sec.icon}</div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 leading-snug">{sec.name}</h3>
                  <p className="text-[9px] text-gray-400 mt-1">{sec.count}</p>
                  <span className="text-[9px] font-bold text-blue-600 mt-2 block">Explore →</span>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── BY INDUSTRY ───────────────────────────────────────────────────── */}
        <section id="asme-section-industry">
          <SectionTitle
            title="Explore ASMEs by Industry"
            action={<Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">All 1,350+ Industries →</Link>}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind) => (
              <Link key={ind.name} href="/eoi" aria-label={`Explore ASMEs in ${ind.name}`}>
                <Card className="p-3 hover:border-indigo-400 transition-colors cursor-pointer group">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 leading-snug">{ind.name}</h3>
                  <p className="text-[9px] text-gray-400 mt-1">{ind.count}</p>
                  <span className="text-[9px] font-bold text-indigo-600 mt-1.5 block">Explore →</span>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── BY COUNTRY ────────────────────────────────────────────────────── */}
        <section id="asme-section-country">
          <SectionTitle
            title="Explore ASMEs by Country"
            action={<Globe className="h-4 w-4 text-gray-400" />}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COUNTRIES.map((c) => (
              <Link key={c.name} href="/eoi" aria-label={`Explore ASMEs in ${c.name}`}>
                <Card className="p-4 text-center hover:border-blue-400 transition-colors cursor-pointer group">
                  <div className="text-3xl mb-2" aria-hidden="true">{c.flag}</div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600">{c.name}</h3>
                  <p className="text-[9px] text-gray-400 mt-0.5">{c.count}</p>
                  <span className="text-[9px] font-bold text-blue-600 mt-1 block">Explore →</span>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── BY EXPERTISE ──────────────────────────────────────────────────── */}
        <section id="asme-section-expertise">
          <SectionTitle title="Top ASMEs by Expertise" action={<Target className="h-4 w-4 text-gray-400" />} />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EXPERTISES.map((exp) => (
              <Link key={exp.name} href="/eoi" aria-label={`Explore ${exp.name} ASMEs`}>
                <Card className="p-3 hover:border-purple-400 transition-colors cursor-pointer group flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-purple-600">{exp.name}</h3>
                    <p className="text-[9px] text-gray-400 mt-0.5">{exp.count}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-purple-500 shrink-0" aria-hidden="true" />
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── RECOGNIZED + ACHIEVEMENTS ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <section>
            <Card className="p-4 space-y-4">
              <SectionTitle title="Recognized ASMEs" action={<Award className="h-4 w-4 text-amber-500" />} />
              <div className="space-y-3">
                {RECOGNIZED_ASMES.map((asme, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {asme.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{asme.name}</span>
                      <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-600">
                          {asme.badgeIcon} {asme.badge}
                        </span>
                        <span className="text-[8px] text-gray-400">{asme.detail}</span>
                      </div>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 shrink-0" aria-label={`View ${asme.name}`}>View →</Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section>
            <Card className="p-4 space-y-4">
              <SectionTitle title="ASME Achievements" action={<Trophy className="h-4 w-4 text-amber-500" />} />
              <div className="space-y-3">
                {ACHIEVEMENTS.map((a, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{a.name}</span>
                      <Badge color="amber">{a.type}</Badge>
                      <span className="text-[8px] text-gray-400 ml-auto">{a.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">{a.achievement}</p>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline">Read Story →</Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── COMPARE ASMEs ─────────────────────────────────────────────────── */}
        <section id="asme-section-compare">
          <SectionTitle title="Compare ASMEs" action={<Badge color="indigo">Public Data Only</Badge>} />
          <Card className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "ASME A", val: compareA, set: setCompareA },
                { label: "ASME B", val: compareB, set: setCompareB },
              ].map((sel) => (
                <div key={sel.label}>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">{sel.label}</label>
                  <select
                    value={sel.val}
                    onChange={(e) => sel.set(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm font-bold text-gray-800 dark:text-gray-200 outline-none focus:border-blue-500"
                    aria-label={`Select ${sel.label}`}
                  >
                    {COMPARE_POOL.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs" role="table" aria-label="ASME comparison table">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th scope="col" className="text-left py-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider w-36">Attribute</th>
                    <th scope="col" className="py-2 text-[10px] font-bold text-blue-600 text-center">{asmA.name}</th>
                    <th scope="col" className="py-2 text-[10px] font-bold text-indigo-600 text-center">{asmB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {[
                    { attr: "Sector", a: asmA.sector, b: asmB.sector },
                    { attr: "Industry", a: asmA.industry, b: asmB.industry },
                    { attr: "Country", a: asmA.country, b: asmB.country },
                    { attr: "Expertise", a: asmA.expertise, b: asmB.expertise },
                    { attr: "Verified", a: asmA.verified ? "✓ Yes" : "—", b: asmB.verified ? "✓ Yes" : "—" },
                    { attr: "Featured", a: asmA.featured ? "⭐ Yes" : "—", b: asmB.featured ? "⭐ Yes" : "—" },
                    { attr: "Followers", a: asmA.followers, b: asmB.followers },
                    { attr: "Total Views", a: asmA.views, b: asmB.views },
                    { attr: "Advisory Rate", a: asmA.rate, b: asmB.rate },
                  ].map((row) => (
                    <tr key={row.attr}>
                      <td className="py-2.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{row.attr}</td>
                      <td className="py-2.5 text-center text-[10px] font-semibold text-gray-800 dark:text-gray-200">{row.a}</td>
                      <td className="py-2.5 text-center text-[10px] font-semibold text-gray-800 dark:text-gray-200">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[9px] text-gray-400 text-center">Only publicly available data is shown. Private information is never displayed.</p>
          </Card>
        </section>

        {/* ── RECOMMENDED ───────────────────────────────────────────────────── */}
        <section>
          <SectionTitle title="Recommended for You" action={<Badge color="indigo">Personalised</Badge>} />
          <Card className="p-4 space-y-3">
            <p className="text-[10px] text-gray-500">Recommendations are based on your followed sectors, industries and reading behaviour.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FEATURED_ASMES.slice(0, 3).map((asme) => (
                <div key={asme.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {asme.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{asme.name}</p>
                      <p className="text-[8px] text-gray-400">Because you follow {asme.sector}</p>
                    </div>
                  </div>
                  <Link href="/eoi" className="block text-center text-[9px] font-bold bg-blue-600 text-white py-1.5 rounded-lg" aria-label={`View ${asme.name}`}>
                    View ASME →
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── PREMIUM INTELLIGENCE ──────────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-900 space-y-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Unlock Advanced ASME Intelligence</h2>
                <p className="text-[10px] text-gray-500 mt-1">Access premium discovery, ranking history, AI insights, and enterprise intelligence tools.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "FREE",
                  color: "border-gray-200 dark:border-gray-800",
                  items: ["Basic search & discovery", "Featured ASMEs", "Basic rankings", "Basic filters"],
                  locked: false,
                },
                {
                  tier: "PRO",
                  color: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
                  items: ["Advanced Rankings", "Ranking History", "ASME Comparison", "Advanced Filters", "Expertise Intelligence", "Trending Signals"],
                  locked: true,
                },
                {
                  tier: "ENTERPRISE",
                  color: "border-purple-400 bg-purple-50 dark:bg-purple-950/20",
                  items: ["Custom Intelligence", "Expert Discovery", "Industry Expert Intel", "AI Expert Matching", "Custom Research", "Priority Placement"],
                  locked: true,
                },
              ].map((plan) => (
                <div key={plan.tier} className={`border rounded-xl p-4 space-y-2 ${plan.color}`}>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{plan.tier}</span>
                  <ul className="space-y-1.5 mt-2">
                    {plan.items.map((item) => (
                      <li key={item} className="text-[10px] text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                        {plan.locked ? (
                          <>
                            <span className="shrink-0 mt-0.5" aria-hidden="true">🔒</span>
                            <span>{item}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href="/eoi" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 rounded-xl transition-colors">
              Unlock Premium Intelligence →
            </Link>
          </Card>
        </section>

        {/* ── GET FEATURED + GET VERIFIED ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Get Your ASME Featured</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Increase your visibility among professionals and businesses.</p>
              </div>
            </div>
            <ul className="space-y-2">
              {["Featured ASME Placement", "Industry Featured Spot", "Sector Featured Spot", "Country Featured Spot", "Sponsored Placement"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-400">
                  <Zap className="h-3 w-3 text-amber-500 shrink-0" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors">
              Get Featured →
            </Link>
          </Card>

          <Card className="p-6 space-y-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Build Trust with Verification</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Verify your professional credentials and strengthen visibility.</p>
              </div>
            </div>
            <ul className="space-y-2">
              {[
                "✓ Verified badge on your profile",
                "✓ Credential verification",
                "✓ Increased search visibility",
                "✓ Featured eligibility",
                "✓ Trusted by B2B professionals",
              ].map((item) => (
                <li key={item} className="text-[10px] text-gray-600 dark:text-gray-400">{item}</li>
              ))}
            </ul>
            <Link href="/eoi" className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors">
              Get Verified →
            </Link>
          </Card>
        </div>

        {/* ── SPONSORED ASMEs ───────────────────────────────────────────────── */}
        <section>
          <SectionTitle title="Sponsored ASMEs" action={<Badge color="amber">SPONSORED</Badge>} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURED_ASMES.filter((a) => a.featured).map((asme) => (
              <Card key={asme.id} className="p-4 border-amber-200 dark:border-amber-900 relative space-y-3">
                <span className="absolute top-3 right-3 text-[8px] font-bold bg-amber-100 dark:bg-amber-950/30 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  SPONSORED
                </span>
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center`}>
                    {asme.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{asme.name}</p>
                    <p className="text-[9px] text-gray-400">{asme.sector} · {asme.industry}</p>
                  </div>
                </div>
                <Link href="/eoi" className="block text-center text-[10px] font-bold bg-blue-600 text-white py-2 rounded-lg" aria-label={`View ${asme.name}`}>
                  View ASME →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ────────────────────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-white/70" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">ASME Intelligence Brief</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get weekly rankings, emerging ASMEs, industry experts, business achievements and professional opportunities.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-52 rounded-xl bg-white/15 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20"
                placeholder="Enter your email"
                aria-label="Newsletter email address"
                type="email"
              />
              <button
                className="bg-white text-blue-700 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shrink-0"
                aria-label="Subscribe to ASME Intelligence Brief"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-[9px] text-white/50 text-center">Trusted by 18,000+ B2B professionals · Unsubscribe anytime</p>
          </Card>
        </section>

      </div>
    </div>
  );
}

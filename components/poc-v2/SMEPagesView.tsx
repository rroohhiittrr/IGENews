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
  Briefcase,
  ShieldCheck,
} from "lucide-react";

// ─── Local UI primitives (strictly scoped to SME Pages) ──────────────────────

function Card({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
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
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border border-indigo-200 dark:border-indigo-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.blue}`}>{children}</span>
  );
}

// ─── Mock SME data (scoped only to SME Pages) ────────────────────────────────

const FEATURED_SMES = [
  { id: 1, name: "Dr. Arvind Subramanian", role: "Principal Semiconductor Architect", sector: "Technology", industry: "Semiconductors & OSAT", country: "India", expertise: "3nm Lithography & Packaging", initials: "AS", color: "from-blue-600 to-indigo-700", verified: true, featured: true, rate: "$120/hr", followers: "2.4K", views: "34.2K" },
  { id: 2, name: "Dr. Meenakshi Sundaram", role: "Biopharma Regulatory Lead", sector: "Healthcare", industry: "Biosimilars & Oncology", country: "India", expertise: "USFDA & EMA Filings", initials: "MS", color: "from-cyan-500 to-teal-600", verified: true, featured: false, rate: "$110/hr", followers: "1.8K", views: "28.5K" },
  { id: 3, name: "Commodore R. Venkat", role: "Defence Avionics & Radar Specialist", sector: "Defence", industry: "Aerospace & Radar", country: "India", expertise: "AESA Radar Integration", initials: "RV", color: "from-indigo-600 to-purple-700", verified: true, featured: true, rate: "$130/hr", followers: "2.9K", views: "41.8K" },
  { id: 4, name: "Raghavendra Kulkarni", role: "Green Hydrogen Infrastructure SME", sector: "Energy", industry: "Renewables & Hydrogen", country: "India", expertise: "PEM Electrolysers", initials: "RK", color: "from-emerald-500 to-teal-700", verified: true, featured: false, rate: "$105/hr", followers: "1.5K", views: "22.4K" },
  { id: 5, name: "Nandini Bhattacharya", role: "FinTech Settlement & Cross-Border SME", sector: "Finance", industry: "Digital Payments", country: "India", expertise: "ISO 20022 & UPI Rails", initials: "NB", color: "from-purple-600 to-rose-600", verified: true, featured: false, rate: "$115/hr", followers: "1.9K", views: "26.1K" },
  { id: 6, name: "Suresh Narayanan", role: "Supply Chain Resilience Consultant", sector: "Logistics", industry: "Multimodal Freight", country: "India", expertise: "IMEC Corridors", initials: "SN", color: "from-amber-500 to-orange-600", verified: false, featured: false, rate: "$95/hr", followers: "1.1K", views: "16.8K" },
];

const TOP_SMES_TABS = ["Most Viewed", "Most Followed", "Most Active", "Top Rated"] as const;
type TopTab = typeof TOP_SMES_TABS[number];

const TOP_SMES: Record<TopTab, typeof FEATURED_SMES> = {
  "Most Viewed": [FEATURED_SMES[2], FEATURED_SMES[0], FEATURED_SMES[1], FEATURED_SMES[4]],
  "Most Followed": [FEATURED_SMES[2], FEATURED_SMES[0], FEATURED_SMES[4], FEATURED_SMES[1]],
  "Most Active": [FEATURED_SMES[0], FEATURED_SMES[2], FEATURED_SMES[3], FEATURED_SMES[1]],
  "Top Rated": [FEATURED_SMES[2], FEATURED_SMES[0], FEATURED_SMES[1], FEATURED_SMES[4]],
};

const RANKING_TABS = ["Overall", "By Industry", "By Sector", "By Country"] as const;
type RankTab = typeof RANKING_TABS[number];

type RankEntry = { rank: number; name: string; initials: string; color: string; detail: string; metric: string; change: number };
const RANKINGS: Record<RankTab, RankEntry[]> = {
  Overall: [
    { rank: 1, name: "Commodore R. Venkat", initials: "RV", color: "from-indigo-600 to-purple-700", detail: "Defence · AESA Radar", metric: "41.8K views", change: 2 },
    { rank: 2, name: "Dr. Arvind Subramanian", initials: "AS", color: "from-blue-600 to-indigo-700", detail: "Technology · 3nm OSAT", metric: "34.2K views", change: 0 },
    { rank: 3, name: "Dr. Meenakshi Sundaram", initials: "MS", color: "from-cyan-500 to-teal-600", detail: "Healthcare · Biosimilars", metric: "28.5K views", change: -1 },
    { rank: 4, name: "Nandini Bhattacharya", initials: "NB", color: "from-purple-600 to-rose-600", detail: "Finance · UPI Rails", metric: "26.1K views", change: 3 },
    { rank: 5, name: "Raghavendra Kulkarni", initials: "RK", color: "from-emerald-500 to-teal-700", detail: "Energy · Green H2", metric: "22.4K views", change: 1 },
  ],
  "By Industry": [
    { rank: 1, name: "Dr. Arvind Subramanian", initials: "AS", color: "from-blue-600 to-indigo-700", detail: "Semiconductors & OSAT", metric: "3nm Lithography", change: 1 },
    { rank: 2, name: "Commodore R. Venkat", initials: "RV", color: "from-indigo-600 to-purple-700", detail: "Aerospace & Radar", metric: "AESA Radar", change: 0 },
    { rank: 3, name: "Nandini Bhattacharya", initials: "NB", color: "from-purple-600 to-rose-600", detail: "Digital Payments", metric: "ISO 20022", change: 0 },
    { rank: 4, name: "Dr. Meenakshi Sundaram", initials: "MS", color: "from-cyan-500 to-teal-600", detail: "Biosimilars & Oncology", metric: "USFDA Approvals", change: 2 },
    { rank: 5, name: "Raghavendra Kulkarni", initials: "RK", color: "from-emerald-500 to-teal-700", detail: "Renewables & Hydrogen", metric: "PEM Electrolysers", change: -1 },
  ],
  "By Sector": [
    { rank: 1, name: "Commodore R. Venkat", initials: "RV", color: "from-indigo-600 to-purple-700", detail: "Defence & Aerospace", metric: "8 publications", change: 1 },
    { rank: 2, name: "Dr. Arvind Subramanian", initials: "AS", color: "from-blue-600 to-indigo-700", detail: "Technology & Deep Tech", metric: "12 publications", change: 0 },
    { rank: 3, name: "Dr. Meenakshi Sundaram", initials: "MS", color: "from-cyan-500 to-teal-600", detail: "Healthcare & Life Sciences", metric: "9 publications", change: -1 },
    { rank: 4, name: "Nandini Bhattacharya", initials: "NB", color: "from-purple-600 to-rose-600", detail: "Financial Services", metric: "7 publications", change: 2 },
    { rank: 5, name: "Raghavendra Kulkarni", initials: "RK", color: "from-emerald-500 to-teal-700", detail: "Energy & Infrastructure", metric: "6 publications", change: 0 },
  ],
  "By Country": [
    { rank: 1, name: "Commodore R. Venkat", initials: "RV", color: "from-indigo-600 to-purple-700", detail: "India", metric: "2.9K followers", change: 0 },
    { rank: 2, name: "Dr. Arvind Subramanian", initials: "AS", color: "from-blue-600 to-indigo-700", detail: "India", metric: "2.4K followers", change: 1 },
    { rank: 3, name: "Nandini Bhattacharya", initials: "NB", color: "from-purple-600 to-rose-600", detail: "India", metric: "1.9K followers", change: -1 },
    { rank: 4, name: "Dr. Meenakshi Sundaram", initials: "MS", color: "from-cyan-500 to-teal-600", detail: "India", metric: "1.8K followers", change: 0 },
    { rank: 5, name: "Raghavendra Kulkarni", initials: "RK", color: "from-emerald-500 to-teal-700", detail: "India", metric: "1.5K followers", change: 0 },
  ],
};

const EMERGING_SMES = [
  { name: "Suresh Narayanan", role: "Supply Chain Resilience Consultant", initials: "SN", color: "from-amber-500 to-orange-600", label: "Emerging", sector: "Logistics", momentum: "+48% engagement this week" },
  { name: "Dr. Tanya Deshmukh", role: "Quantum Encryption Fellow", initials: "TD", color: "from-purple-500 to-indigo-600", label: "Rising", sector: "Deep Tech", momentum: "+41% engagement this week" },
  { name: "Vikram Singhania", role: "Autonomous Vehicle Systems SME", initials: "VS", color: "from-blue-500 to-cyan-600", label: "New", sector: "Automotive", momentum: "Newly Verified" },
];

const TRENDING_SMES = [
  { name: "Dr. Arvind Subramanian", initials: "AS", color: "from-blue-600 to-indigo-700", sector: "Semiconductors", signal: "24 searches today", rank: 1 },
  { name: "Commodore R. Venkat", initials: "RV", color: "from-indigo-600 to-purple-700", sector: "Defence", signal: "19 new follows today", rank: 2 },
  { name: "Nandini Bhattacharya", initials: "NB", color: "from-purple-600 to-rose-600", sector: "FinTech", signal: "Trending in Cross-Border", rank: 3 },
  { name: "Dr. Meenakshi Sundaram", initials: "MS", color: "from-cyan-500 to-teal-600", sector: "Biosimilars", signal: "4 new research briefs", rank: 4 },
];

const SECTORS = [
  { name: "Semiconductors & Deep Tech", count: "72 SMEs", icon: "💻" },
  { name: "Healthcare & Biosimilars", count: "58 SMEs", icon: "🏥" },
  { name: "Defence & Aerospace", count: "48 SMEs", icon: "🛡️" },
  { name: "Clean Energy & Hydrogen", count: "64 SMEs", icon: "⚡" },
  { name: "Banking & FinTech Rails", count: "76 SMEs", icon: "💳" },
  { name: "Logistics & Multimodal", count: "51 SMEs", icon: "🚢" },
  { name: "AgriTech & Precision Farming", count: "46 SMEs", icon: "🌾" },
  { name: "Advanced Materials & Chemical", count: "39 SMEs", icon: "🧬" },
];

const INDUSTRIES = [
  { name: "OSAT Chip Packaging", count: "18 SMEs" },
  { name: "AESA Radar & Avionics", count: "15 SMEs" },
  { name: "PEM Electrolysers", count: "14 SMEs" },
  { name: "USFDA Clinical Regulatory", count: "12 SMEs" },
  { name: "ISO 20022 Cross-Border", count: "16 SMEs" },
  { name: "IMEC Trade Corridors", count: "11 SMEs" },
  { name: "Quantum-Resistant Crypto", count: "9 SMEs" },
  { name: "Industrial EV Powertrains", count: "14 SMEs" },
];

const COUNTRIES = [
  { name: "India", count: "420 SMEs", flag: "🇮🇳" },
  { name: "Singapore", count: "64 SMEs", flag: "🇸🇬" },
  { name: "UAE", count: "52 SMEs", flag: "🇦🇪" },
  { name: "United Kingdom", count: "45 SMEs", flag: "🇬🇧" },
  { name: "Germany", count: "38 SMEs", flag: "🇩🇪" },
  { name: "USA", count: "31 SMEs", flag: "🇺🇸" },
];

const EXPERTISES = [
  { name: "Strategic Advisory", count: "94 SMEs" },
  { name: "Regulatory Compliance", count: "82 SMEs" },
  { name: "Deep Tech & R&D", count: "75 SMEs" },
  { name: "Trade Finance & Rails", count: "68 SMEs" },
  { name: "Supply Chain Optimization", count: "56 SMEs" },
  { name: "Policy Formulation", count: "49 SMEs" },
];

const ACHIEVEMENTS = [
  { name: "Dr. Arvind Subramanian", achievement: "Authored India Semiconductor Mission packaging standard specifications", type: "Policy Contribution", time: "1 day ago" },
  { name: "Commodore R. Venkat", achievement: "Lead technical architect for indigenous naval surveillance radar testbed", type: "Defence Milestone", time: "3 days ago" },
  { name: "Nandini Bhattacharya", achievement: "Delivered keynote at Global FinTech Festival on CBDC cross-border liquidity", type: "Keynote Lecture", time: "5 days ago" },
];

const RECOGNIZED_SMES = [
  { name: "Commodore R. Venkat", initials: "RV", color: "from-indigo-600 to-purple-700", badge: "Award Recognized", badgeIcon: "🏆", detail: "National Defence Innovation Citation" },
  { name: "Dr. Arvind Subramanian", initials: "AS", color: "from-blue-600 to-indigo-700", badge: "Verified Expert", badgeIcon: "✓", detail: "ISM Committee Senior Advisor" },
  { name: "Dr. Meenakshi Sundaram", initials: "MS", color: "from-cyan-500 to-teal-600", badge: "Featured Expert", badgeIcon: "⭐", detail: "iGEN Healthcare Editorial Selection" },
];

const COMPARE_POOL = FEATURED_SMES.slice(0, 5);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SMEPagesView() {
  const [activeTopTab, setActiveTopTab] = useState<TopTab>("Most Viewed");
  const [activeRankTab, setActiveRankTab] = useState<RankTab>("Overall");
  const [compareA, setCompareA] = useState(0);
  const [compareB, setCompareB] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeNavSection, setActiveNavSection] = useState("featured");

  const navItems = [
    { id: "featured", label: "Featured" },
    { id: "top", label: "Top SMEs" },
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
    const el = document.getElementById(`sme-section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const smeA = COMPARE_POOL[compareA];
  const smeB = COMPARE_POOL[compareB];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-950 text-white relative overflow-hidden border-b border-indigo-950/60">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full bg-cyan-950/60 inline-flex items-center gap-1.5 shadow-xs">
              <Sparkles className="h-3 w-3 text-cyan-300" /> SME PAGES • SUBJECT MATTER EXPERTS
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Discover Top &amp; Emerging Subject Matter Experts
            </h1>
            <p className="text-base text-cyan-100/85 leading-relaxed max-w-2xl font-normal">
              Explore featured, top-performing, emerging, trending and recognized Subject Matter Experts across industries, sectors, countries and specialized technical disciplines.
            </p>
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400"
                  placeholder="Search SMEs, industries, specialized expertise or sectors..."
                  aria-label="Search SMEs"
                />
              </div>
              <Link href="/eoi" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm">
                Explore SMEs →
              </Link>
              <Link href="/eoi" className="border border-white/30 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs">
                Get Featured →
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-2 border-t border-white/15">
              {[
                { label: "SMEs Listed", value: "4,800+" },
                { label: "Sectors Covered", value: "50 GoI Sectors" },
                { label: "Mapped Industries", value: "1,350+ Verticals" },
                { label: "Countries Active", value: "42 Countries" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold tracking-tight text-white">{s.value}</div>
                  <div className="text-[10px] text-cyan-200/70 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY DISCOVERY NAV ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-1 overflow-x-auto py-2.5" style={{ scrollbarWidth: "none" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-label={`Navigate to ${item.label}`}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeNavSection === item.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── FEATURED SMEs ────────────────────────────────────────────────── */}
        <section id="sme-section-featured">
          <SectionTitle
            title="Featured Subject Matter Experts"
            action={<Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">View All →</Link>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_SMES.map((sme) => (
              <Card key={sme.id} className="p-4 space-y-3 hover:shadow-md hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${sme.color} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                      {sme.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">{sme.name}</h3>
                      <p className="text-[9px] text-gray-500 font-medium">{sme.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {sme.featured && <Badge color="amber">FEATURED</Badge>}
                    {sme.verified && (
                      <span className="flex items-center gap-0.5 text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/40">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge color="blue">{sme.sector}</Badge>
                  <Badge color="indigo">{sme.industry}</Badge>
                  <Badge color="purple">{sme.country}</Badge>
                </div>
                <div className="text-[9px] text-gray-500 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-2">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{sme.views}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{sme.followers}</span>
                  <span className="font-bold text-blue-600 ml-auto">{sme.rate}</span>
                </div>
                <Link
                  href="/eoi"
                  className="block w-full text-center text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors shadow-xs"
                  aria-label={`View ${sme.name} SME profile`}
                >
                  View SME Profile →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── TOP SMEs ─────────────────────────────────────────────────────── */}
        <section id="sme-section-top">
          <SectionTitle title="Top SMEs Leaderboard" action={<TrendingUp className="h-4 w-4 text-blue-500" />} />
          <Card className="p-4 space-y-4">
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800 flex-wrap">
              {TOP_SMES_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTopTab(tab)}
                  className={`flex-1 min-w-[80px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    activeTopTab === tab
                      ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {TOP_SMES[activeTopTab].map((sme, idx) => (
                <div key={sme.id} className="flex items-center gap-3 py-3">
                  <span className="text-sm font-bold text-blue-600 w-6 shrink-0 text-center">#{idx + 1}</span>
                  <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${sme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                    {sme.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{sme.name}</p>
                    <p className="text-[9px] text-gray-400">{sme.sector} · {sme.industry}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[9px] text-gray-400">
                      {activeTopTab === "Most Viewed" && <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{sme.views}</span>}
                      {activeTopTab === "Most Followed" && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{sme.followers}</span>}
                      {activeTopTab === "Most Active" && <span className="text-emerald-600 font-bold">Active</span>}
                      {activeTopTab === "Top Rated" && <span className="flex items-center gap-0.5 text-amber-500 font-bold"><Star className="h-3 w-3 fill-amber-500" />4.9</span>}
                    </span>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2.5 py-1 rounded-lg hover:bg-blue-100" aria-label={`View ${sme.name}`}>
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── RANKINGS ──────────────────────────────────────────────────────── */}
        <section id="sme-section-rankings">
          <SectionTitle
            title="SME Official Rankings"
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
                          : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
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
                        <p className="text-[9px] text-gray-500">{item.detail}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] text-gray-500">{item.metric}</span>
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
                <SectionTitle title="How SME Rankings Work" action={<BarChart2 className="h-4 w-4 text-gray-400" />} />
                <p className="text-[10px] text-gray-500 leading-relaxed">Rankings are recalculated weekly using a transparent combination of authenticated advisory signals and editorial citations.</p>
                {[
                  { signal: "Advisory & Research Citations", weight: "30%" },
                  { signal: "Content & Keynote Contributions", weight: "25%" },
                  { signal: "Peer Recognition & Awards", weight: "20%" },
                  { signal: "Profile Completeness & Verification", weight: "15%" },
                  { signal: "Industry Direct Inquiries", weight: "10%" },
                ].map((row) => (
                  <div key={row.signal} className="flex items-center justify-between text-[10px] border-b border-gray-100 dark:border-gray-800 pb-1.5">
                    <span className="text-gray-600 dark:text-gray-400">{row.signal}</span>
                    <span className="font-bold text-blue-600">{row.weight}</span>
                  </div>
                ))}
                <div className="bg-blue-50 dark:bg-blue-950/20 p-2.5 rounded-lg text-[9px] text-blue-700 dark:text-blue-300 font-medium">
                  Rankings are independent, auditable, and cannot be purchased.
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ── EMERGING & TRENDING SMEs ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emerging SMEs */}
          <section id="sme-section-emerging">
            <Card className="p-4 space-y-3 h-full">
              <SectionTitle title="Emerging SMEs to Watch" action={<Sparkles className="h-4 w-4 text-amber-500" />} />
              <div className="space-y-3">
                {EMERGING_SMES.map((sme) => (
                  <div key={sme.name} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${sme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {sme.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{sme.name}</p>
                          <Badge color={sme.label === "Rising" ? "purple" : sme.label === "Emerging" ? "amber" : "emerald"}>{sme.label}</Badge>
                        </div>
                        <p className="text-[9px] text-gray-400">{sme.role}</p>
                        <p className="text-[8px] text-emerald-600 font-semibold">{sme.momentum}</p>
                      </div>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 shrink-0 hover:underline">Profile →</Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Trending SMEs */}
          <section id="sme-section-trending">
            <Card className="p-4 space-y-3 h-full">
              <SectionTitle title="Trending SMEs This Week" action={<TrendingUp className="h-4 w-4 text-rose-500" />} />
              <div className="space-y-3">
                {TRENDING_SMES.map((sme) => (
                  <div key={sme.name} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${sme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {sme.initials}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{sme.name}</p>
                        <p className="text-[9px] text-gray-400">{sme.sector}</p>
                        <p className="text-[8px] text-blue-600 font-semibold">{sme.signal}</p>
                      </div>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 shrink-0 hover:underline">Profile →</Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── RECOGNITION & AWARDS ─────────────────────────────────────────── */}
        <section id="sme-section-recognition">
          <SectionTitle title="SME Achievements &amp; Recognitions" action={<Trophy className="h-4 w-4 text-amber-500" />} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4 space-y-3">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-blue-500" /> Recent Accomplishments
              </h3>
              <div className="space-y-2.5">
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.name} className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{a.name}</span>
                      <span className="text-[8px] text-gray-400">{a.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-600 dark:text-gray-300">{a.achievement}</p>
                    <Badge color="blue">{a.type}</Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4 space-y-3">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-amber-500" /> Recognized &amp; Editorial Picks
              </h3>
              <div className="space-y-2.5">
                {RECOGNIZED_SMES.map((r) => (
                  <div key={r.name} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${r.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {r.initials}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{r.name}</p>
                        <p className="text-[9px] text-gray-400">{r.detail}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/40">
                      {r.badgeIcon} {r.badge}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ── BY SECTOR ────────────────────────────────────────────────────── */}
        <section id="sme-section-sector">
          <SectionTitle
            title="Browse SMEs by Sector"
            action={<Link href="/en/poc-v2/all-sector-directory" className="text-[10px] font-bold text-blue-600 hover:underline">All 50 Sectors →</Link>}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SECTORS.map((s) => (
              <Card key={s.name} className="p-3 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer">
                <span className="text-xl">{s.icon}</span>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1.5 leading-snug">{s.name}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{s.count}</p>
                <Link href="/eoi" className="text-[8px] font-bold text-blue-600 hover:underline mt-1.5 block">Explore SMEs →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── BY INDUSTRY ──────────────────────────────────────────────────── */}
        <section id="sme-section-industry">
          <SectionTitle
            title="Browse SMEs by Key Industry"
            action={<Link href="/en/poc-v2/all-industry" className="text-[10px] font-bold text-blue-600 hover:underline">All Industries →</Link>}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind) => (
              <Card key={ind.name} className="p-3 hover:border-blue-300 hover:shadow-xs transition-all">
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{ind.name}</p>
                <p className="text-[9px] text-blue-600 font-semibold mt-0.5">{ind.count}</p>
                <Link href="/en/poc-v2/all-industry" className="text-[8px] font-bold text-gray-400 hover:text-blue-600 mt-1.5 block">View Directory →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── BY COUNTRY ───────────────────────────────────────────────────── */}
        <section id="sme-section-country">
          <SectionTitle
            title="Browse SMEs by Country"
            action={<Link href="/en/poc-v2/all-country" className="text-[10px] font-bold text-blue-600 hover:underline">All Countries →</Link>}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COUNTRIES.map((c) => (
              <Card key={c.name} className="p-3 text-center hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer">
                <span className="text-2xl">{c.flag}</span>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{c.name}</p>
                <p className="text-[9px] text-gray-400">{c.count}</p>
                <Link href="/en/poc-v2/all-country" className="text-[8px] font-bold text-blue-600 hover:underline mt-1 block">View →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── BY EXPERTISE ─────────────────────────────────────────────────── */}
        <section id="sme-section-expertise">
          <SectionTitle title="Browse SMEs by Area of Expertise" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {EXPERTISES.map((e) => (
              <Card key={e.name} className="p-3 hover:border-blue-300 hover:shadow-xs transition-all">
                <Target className="h-4 w-4 text-blue-500 mb-1" />
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{e.name}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{e.count}</p>
                <Link href="/eoi" className="text-[8px] font-bold text-blue-600 hover:underline mt-1 block">Find Experts →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── COMPARE SMEs ─────────────────────────────────────────────────── */}
        <section id="sme-section-compare">
          <SectionTitle title="Compare Subject Matter Experts" action={<Badge color="purple">Interactive Comparison</Badge>} />
          <Card className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">SELECT EXPERT A</label>
                <select
                  value={compareA}
                  onChange={(e) => setCompareA(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs font-semibold outline-none focus:border-blue-500"
                >
                  {COMPARE_POOL.map((s, idx) => (
                    <option key={s.id} value={idx}>{s.name} — {s.sector}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">SELECT EXPERT B</label>
                <select
                  value={compareB}
                  onChange={(e) => setCompareB(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs font-semibold outline-none focus:border-blue-500"
                >
                  {COMPARE_POOL.map((s, idx) => (
                    <option key={s.id} value={idx}>{s.name} — {s.sector}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 text-[10px]">
                    <th className="py-2 pr-4">ATTRIBUTE</th>
                    <th className="py-2 px-4 text-blue-600 font-bold">{smeA.name}</th>
                    <th className="py-2 pl-4 text-indigo-600 font-bold">{smeB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-[11px]">
                  <tr>
                    <td className="py-2 text-gray-400">Sector</td>
                    <td className="py-2 px-4 font-bold">{smeA.sector}</td>
                    <td className="py-2 pl-4 font-bold">{smeB.sector}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Industry</td>
                    <td className="py-2 px-4">{smeA.industry}</td>
                    <td className="py-2 pl-4">{smeB.industry}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Advisory Rate</td>
                    <td className="py-2 px-4 font-bold text-blue-600">{smeA.rate}</td>
                    <td className="py-2 pl-4 font-bold text-indigo-600">{smeB.rate}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Profile Views</td>
                    <td className="py-2 px-4">{smeA.views}</td>
                    <td className="py-2 pl-4">{smeB.views}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Followers</td>
                    <td className="py-2 px-4">{smeA.followers}</td>
                    <td className="py-2 pl-4">{smeB.followers}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Core Expertise</td>
                    <td className="py-2 px-4 font-semibold text-emerald-600">{smeA.expertise}</td>
                    <td className="py-2 pl-4 font-semibold text-emerald-600">{smeB.expertise}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Verification</td>
                    <td className="py-2 px-4">{smeA.verified ? "✓ Verified SME" : "Standard"}</td>
                    <td className="py-2 pl-4">{smeB.verified ? "✓ Verified SME" : "Standard"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Action</td>
                    <td className="py-2 px-4">
                      <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">View Profile →</Link>
                    </td>
                    <td className="py-2 pl-4">
                      <Link href="/eoi" className="text-[10px] font-bold text-indigo-600 hover:underline">View Profile →</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* ── MONETIZATION / PROMOTION BANNER ──────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900 space-y-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">SME Profile Promotion</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white mt-1">Promote Your Subject Matter Expert Profile</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Get premium placement across sector leaderboards, homepage highlights, and direct corporate engagement requests.
                </p>
              </div>
              <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm">
                Apply for Promotion →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[10px] text-gray-700 dark:text-gray-300 font-medium">
              <div>✓ Featured Leaderboard Placement</div>
              <div>✓ Verified SME Badge</div>
              <div>✓ Priority Directory Listing</div>
              <div>✓ Direct Client Inquiries</div>
            </div>
          </Card>
        </section>

        {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">SME Intelligence Digest</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get weekly SME briefings, emerging specialized expert insights, and advisory rate updates directly in your inbox.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-52 rounded-xl bg-white/15 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20"
                placeholder="Enter work email..."
                aria-label="Newsletter email address"
                type="email"
              />
              <button
                className="bg-white text-blue-950 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-xs"
                aria-label="Subscribe to SME Intelligence Digest"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-[9px] text-white/50 text-center">Trusted by 24,000+ B2B professionals · Unsubscribe anytime</p>
          </Card>
        </section>

      </div>
    </div>
  );
}

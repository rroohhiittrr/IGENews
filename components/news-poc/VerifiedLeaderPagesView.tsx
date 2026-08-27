"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart2,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Compass,
  Crown,
  Download,
  Eye,
  FileText,
  Filter,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  HelpCircle,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  UserPlus,
  Users,
  Zap
} from "lucide-react";

// ─── Local UI Primitives (Strictly Scoped to Verified Leader Pages) ───────────

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
        <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
        {action}
      </div>
      {subtitle && <p className="text-[10px] text-gray-500 font-normal">{subtitle}</p>}
    </div>
  );
}

function Badge({ children, color = "emerald" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    teal: "bg-teal-50 dark:bg-teal-950/20 text-teal-600 border border-teal-200 dark:border-teal-900/40",
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border border-indigo-200 dark:border-indigo-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.emerald}`}>
      {children}
    </span>
  );
}

// ─── Verified Leaders Master Dataset ─────────────────────────────────────────

interface LeaderCardData {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  sector: string;
  country: string;
  flag: string;
  followers: string;
  views: string;
  score: number;
  rank: number;
  featured?: boolean;
  rising?: boolean;
  trending?: boolean;
  verified?: boolean;
  recentlyJoined?: boolean;
  tags: string[];
  photo: string;
}

const FEATURED_VERIFIED_LEADERS: LeaderCardData[] = [
  {
    id: "vlead-1",
    name: "Jensen Huang",
    role: "Founder & CEO",
    company: "NVIDIA Corp",
    industry: "Semiconductors & AI",
    sector: "Deep Tech & Computing",
    country: "United States",
    flag: "🇺🇸",
    followers: "245.8K",
    views: "520.1K",
    score: 98,
    rank: 1,
    featured: true,
    verified: true,
    trending: true,
    tags: ["Sovereign Compute", "Enterprise AI", "GPU Clusters"],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "vlead-2",
    name: "N. Chandrasekaran",
    role: "Chairman",
    company: "Tata Sons",
    industry: "Conglomerate & Tech",
    sector: "Technology & Heavy Industry",
    country: "India",
    flag: "🇮🇳",
    followers: "128.4K",
    views: "340.2K",
    score: 98,
    rank: 2,
    featured: true,
    verified: true,
    trending: true,
    tags: ["Sovereign AI", "Semiconductors", "Global Strategy"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "vlead-3",
    name: "Ananya Sengupta",
    role: "Managing Director, South Asia",
    company: "Standard Chartered",
    industry: "Cross-Border Treasury",
    sector: "Financial Services",
    country: "Singapore / India",
    flag: "🇸🇬",
    followers: "42.8K",
    views: "115.6K",
    score: 95,
    rank: 3,
    featured: true,
    verified: true,
    trending: true,
    tags: ["Sustainable Trade", "Digital Treasury", "ESG Liquidity"],
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "vlead-4",
    name: "Dr. Rajesh Grover",
    role: "Chief Technology Officer",
    company: "Adani Green Hydrogen",
    industry: "Clean Tech & Renewables",
    sector: "Energy & Infrastructure",
    country: "India",
    flag: "🇮🇳",
    followers: "31.5K",
    views: "92.4K",
    score: 94,
    rank: 4,
    featured: true,
    verified: true,
    tags: ["Alkaline Stacks", "Solar-Wind Grids", "Green Ammonia"],
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80"
  }
];

const RISING_VERIFIED_LEADERS: LeaderCardData[] = [
  {
    id: "vlead-5",
    name: "Dr. Elena Vance",
    role: "Board Member",
    company: "Biocon Biologics",
    industry: "Biosimilars & Biopharma",
    sector: "Healthcare & Life Sciences",
    country: "United States",
    flag: "🇺🇸",
    followers: "28.9K",
    views: "74.1K",
    score: 92,
    rank: 9,
    rising: true,
    verified: true,
    tags: ["FDA Approvals", "Oncology", "Clinical Trials"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "vlead-6",
    name: "Elena Rostova",
    role: "Global Head of Supply Chain",
    company: "Pacific Logistics",
    industry: "Logistics & Maritime",
    sector: "Transport & Trade",
    country: "Germany / UAE",
    flag: "🇩🇪",
    followers: "24.1K",
    views: "68.2K",
    score: 93,
    rank: 8,
    rising: true,
    verified: true,
    tags: ["IMEC Corridors", "Port Automation", "Cold Chain"],
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "vlead-7",
    name: "Pooja Malhotra",
    role: "Chief Financial Officer",
    company: "PayPulse Technologies",
    industry: "FinTech & Payments",
    sector: "Financial Services",
    country: "India",
    flag: "🇮🇳",
    followers: "18.2K",
    views: "45.1K",
    score: 91,
    rank: 12,
    rising: true,
    verified: true,
    tags: ["Cross-Border UPI", "Treasury Ops", "Series C"],
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
  }
];

const RECENTLY_VERIFIED_LEADERS: LeaderCardData[] = [
  {
    id: "vlead-8",
    name: "Dr. Alok Verma",
    role: "Chief Scientific Officer",
    company: "Viksit Life Sciences",
    industry: "Biotech & Genomics",
    sector: "Healthcare & Life Sciences",
    country: "India",
    flag: "🇮🇳",
    followers: "5.4K",
    views: "18.2K",
    score: 89,
    rank: 28,
    recentlyJoined: true,
    verified: true,
    tags: ["CRISPR", "Biosimilars", "Clinical Research"],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "vlead-9",
    name: "Marcus Vance",
    role: "Managing Director, APAC",
    company: "Nordic Clean Tech",
    industry: "CleanTech & Carbon Capture",
    sector: "Environment & Energy",
    country: "Germany / India",
    flag: "🇩🇪",
    followers: "8.1K",
    views: "22.6K",
    score: 88,
    rank: 32,
    recentlyJoined: true,
    verified: true,
    tags: ["Direct Air Capture", "EU Taxonomy", "ESG Capital"],
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80"
  }
];

const VERIFIED_RANKINGS_DATA: Record<string, { rank: number; name: string; company: string; role: string; score: number; flag: string; country: string; change: string }[]> = {
  overall: [
    { rank: 1, name: "Jensen Huang", company: "NVIDIA Corp", role: "CEO", score: 98, flag: "🇺🇸", country: "USA", change: "▲ 0" },
    { rank: 2, name: "N. Chandrasekaran", company: "Tata Sons", role: "Chairman", score: 98, flag: "🇮🇳", country: "India", change: "▲ +1" },
    { rank: 3, name: "Ananya Sengupta", company: "Standard Chartered", role: "MD South Asia", score: 95, flag: "🇸🇬", country: "Singapore", change: "▲ +2" },
    { rank: 4, name: "Dr. Rajesh Grover", company: "Adani Green Hydrogen", role: "CTO", score: 94, flag: "🇮🇳", country: "India", change: "▲ +1" },
    { rank: 5, name: "Elena Rostova", company: "Pacific Logistics", role: "Global Head", score: 93, flag: "🇩🇪", country: "Germany", change: "▲ 0" },
  ],
  industry: [
    { rank: 1, name: "Jensen Huang", company: "NVIDIA Corp", role: "CEO", score: 98, flag: "🇺🇸", country: "USA", change: "Top Tech" },
    { rank: 2, name: "Ananya Sengupta", company: "Standard Chartered", role: "MD", score: 95, flag: "🇸🇬", country: "Singapore", change: "Top Finance" },
    { rank: 3, name: "Dr. Rajesh Grover", company: "Adani Green Hydrogen", role: "CTO", score: 94, flag: "🇮🇳", country: "India", change: "Top Energy" },
    { rank: 4, name: "Dr. Elena Vance", company: "Biocon Biologics", role: "Board Member", score: 92, flag: "🇺🇸", country: "USA", change: "Top Healthcare" },
  ],
  sector: [
    { rank: 1, name: "N. Chandrasekaran", company: "Tata Sons", role: "Chairman", score: 98, flag: "🇮🇳", country: "India", change: "Industrial" },
    { rank: 2, name: "Elena Rostova", company: "Pacific Logistics", role: "Global Head", score: 93, flag: "🇩🇪", country: "Germany", change: "Logistics" },
    { rank: 3, name: "Pooja Malhotra", company: "PayPulse", role: "CFO", score: 91, flag: "🇮🇳", country: "India", change: "FinTech" },
  ],
  country: [
    { rank: 1, name: "N. Chandrasekaran", company: "Tata Sons", role: "Chairman", score: 98, flag: "🇮🇳", country: "India", change: "#1 India" },
    { rank: 2, name: "Jensen Huang", company: "NVIDIA Corp", role: "CEO", score: 98, flag: "🇺🇸", country: "USA", change: "#1 USA" },
    { rank: 3, name: "Ananya Sengupta", company: "Standard Chartered", role: "MD", score: 95, flag: "🇸🇬", country: "Singapore", change: "#1 Singapore" },
  ]
};

const VERIFIED_INDUSTRY_PREVIEW = [
  { name: "Technology & AI", count: "420 Verified Leaders", topLeader: "Jensen Huang (NVIDIA Corp)" },
  { name: "Banking & Finance", count: "340 Verified Leaders", topLeader: "Ananya Sengupta (Standard Chartered)" },
  { name: "Renewable Energy & Hydrogen", count: "280 Verified Leaders", topLeader: "Dr. Rajesh Grover (Adani Green)" },
  { name: "Healthcare & BioPharma", count: "230 Verified Leaders", topLeader: "Dr. Elena Vance (Biocon Biologics)" },
  { name: "Advanced Manufacturing", count: "310 Verified Leaders", topLeader: "N. Chandrasekaran (Tata Sons)" },
  { name: "Logistics & Supply Chain", count: "210 Verified Leaders", topLeader: "Elena Rostova (Pacific Logistics)" },
];

const VERIFIED_SECTORS_LIST = [
  { name: "Technology & Computing", count: "580 Verified Leaders", top: "NVIDIA / Tata OSAT Packaging" },
  { name: "Financial Services", count: "490 Verified Leaders", top: "Standard Chartered / PayPulse" },
  { name: "Energy & Infrastructure", count: "420 Verified Leaders", top: "Adani Green / Reliance Clean Energy" },
  { name: "Healthcare & Biotech", count: "350 Verified Leaders", top: "Biocon Biologics / Viksit" },
  { name: "Transport & Supply Chain", count: "310 Verified Leaders", top: "Pacific Logistics / DP World" },
  { name: "Industrial & Defense", count: "380 Verified Leaders", top: "Tata Sons / L&T Heavy Engineering" },
];

const VERIFIED_COUNTRIES_LIST = [
  { country: "India", flag: "🇮🇳", count: "1,480 Verified", top: "N. Chandrasekaran (Tata Sons)" },
  { country: "United States", flag: "🇺🇸", count: "960 Verified", top: "Jensen Huang (NVIDIA Corp)" },
  { country: "Singapore", flag: "🇸🇬", count: "290 Verified", top: "Ananya Sengupta (StanChart)" },
  { country: "United Arab Emirates", flag: "🇦🇪", count: "340 Verified", top: "Sheikh Tahnoon bin Zayed (G42)" },
  { country: "United Kingdom", flag: "🇬🇧", count: "410 Verified", top: "Jonathan Reynolds (DBT)" },
  { country: "Germany", flag: "🇩🇪", count: "260 Verified", top: "Elena Rostova (Pacific Logistics)" },
];

const VERIFIED_RECOGNIZED_AWARDS = [
  { leader: "Jensen Huang", award: "Time 100 Most Influential in AI 2026", category: "AI & Computing", date: "Aug 2026" },
  { leader: "N. Chandrasekaran", award: "Global Industry Leadership Excellence Award 2026", category: "Conglomerate Strategy", date: "Jul 2026" },
  { leader: "Ananya Sengupta", award: "Asian Banker of the Year 2026", category: "Sustainable Finance", date: "Aug 2026" },
  { leader: "Dr. Rajesh Grover", award: "Renewable Energy Innovator 2026", category: "Green Hydrogen R&D", date: "Jun 2026" },
];

const LEADERSHIP_TYPES = [
  "All", "CEO", "Founder", "Managing Director", "CFO", "CTO", "COO", "Chairperson", "President", "Board Director", "Enterprise Investor", "Industry Expert"
];

const EXPERTISE_CATEGORIES = [
  "Sovereign AI Compute", "Semiconductor OSAT", "Green Hydrogen Synthesis", "Cross-Border Trade Treasury", "FDA Regulatory Strategy", "IMEC Multi-Modal Routing", "Direct Air Capture", "Digital Payments & UPI", "Boardroom Risk Governance"
];

const VERIFIED_ACHIEVEMENTS = [
  { leader: "N. Chandrasekaran", title: "Commissioned $14B Sovereign AI Supercluster in Gujarat", date: "This Week", tag: "Milestone" },
  { leader: "Dr. Rajesh Grover", title: "Scaled 3 GW Electrolyser Pilot at Khavda Renewable Park", date: "2 Days Ago", tag: "Energy R&D" },
  { leader: "Elena Rostova", title: "Executed 30% Multimodal Routing Pivot into IMEC Corridor", date: "Last Week", tag: "Supply Chain" },
  { leader: "Ananya Sengupta", title: "Deployed $1.5B Green Trade Window for Asian Exporters", date: "3 Days Ago", tag: "ESG Finance" },
];

const VERIFIED_RECENT_MOVES = [
  { leader: "Dr. Rajesh Grover", move: "Appointed CTO", company: "Adani Green Hydrogen", date: "Effective Today" },
  { leader: "Ananya Sengupta", move: "Named MD South Asia Corporate Banking", company: "Standard Chartered", date: "Effective Yesterday" },
  { leader: "Dr. Elena Vance", move: "Elected to Board of Directors", company: "Biocon Biologics", date: "Effective 2 Days Ago" },
  { leader: "Sarah Al-Hashemi", move: "Appointed Head of Sovereign Digital Assets", company: "Emirates NBD", date: "Effective Last Week" },
];

const VERIFIED_COMPANY_LEADERS = [
  { company: "Tata Sons", leaders: "N. Chandrasekaran (Chairman), Girish Wagh (ED)", count: "24 Verified Leaders" },
  { company: "NVIDIA Corporation", leaders: "Jensen Huang (CEO), Colette Kress (CFO)", count: "16 Verified Leaders" },
  { company: "Adani Green Hydrogen", leaders: "Gautam Adani (Chairman), Dr. Rajesh Grover (CTO)", count: "18 Verified Leaders" },
  { company: "Standard Chartered", leaders: "Bill Winters (CEO), Ananya Sengupta (MD)", count: "14 Verified Leaders" },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function VerifiedLeaderPagesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rankingTab, setRankingTab] = useState<"overall" | "industry" | "sector" | "country">("overall");
  const [selectedType, setSelectedType] = useState("All");
  const [followedState, setFollowedState] = useState<Record<string, boolean>>({
    "vlead-1": true,
    "vlead-2": true,
    "vlead-3": true
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const toggleFollow = (id: string) => {
    setFollowedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFeatured = FEATURED_VERIFIED_LEADERS.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType =
      selectedType === "All" ||
      l.role.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/20 px-3 py-1 rounded-full bg-white/10 inline-flex items-center gap-1.5 shadow-xs">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-300" /> VERIFIED LEADER PAGES
              </span>
              <span className="text-[10px] font-semibold text-teal-200 bg-teal-950/40 border border-teal-800/50 px-2.5 py-0.5 rounded-full">
                Verified Discovery, Rankings &amp; Recognition Hub
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Discover the Verified Leaders Shaping Business &amp; Industry
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-2xl font-normal">
              Explore verified executives, CXOs, founders, and decision-makers across industries, sectors, and global markets with authenticated trust signals and impact benchmarks.
            </p>

            {/* 02. Search & Discovery */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search verified leaders, company, sector, or expertise (e.g. Jensen Huang, Sovereign AI, Tata)..."
                  aria-label="Search verified leaders, company, sector, or expertise"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("featured-leaders-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-emerald-950 font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors shrink-0 shadow-sm"
              >
                Explore Verified Leaders →
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("leader-rankings-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-white/30 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs"
              >
                View Rankings →
              </button>
            </div>

            {/* Live Counter Strip */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-white/15">
              {[
                { label: "Verified CXOs", value: "2,840+ Profiles" },
                { label: "Enterprise Groups", value: "1,150+ Companies" },
                { label: "Tracked Sectors", value: "50 GoI Sectors" },
                { label: "Verified Rankings", value: "Weekly Updated" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold tracking-tight text-white">{s.value}</div>
                  <div className="text-[10px] text-white/65 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 08. QUICK DISCOVERY NAVIGATION CHIPS ─────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-1.5 overflow-x-auto py-2.5" style={{ scrollbarWidth: "none" }}>
            {[
              { label: "Featured", id: "featured-leaders-section" },
              { label: "Top Leaders", id: "top-leaders-section" },
              { label: "Rankings", id: "leader-rankings-section" },
              { label: "Industries", id: "industries-section" },
              { label: "Sectors", id: "sectors-section" },
              { label: "Countries", id: "countries-section" },
              { label: "Rising Leaders", id: "rising-leaders-section" },
              { label: "Trending", id: "trending-section" },
              { label: "Recognition & Awards", id: "recognition-section" },
              { label: "Expertise", id: "expertise-section" },
              { label: "Achievements", id: "achievements-section" },
              { label: "Leadership Moves", id: "moves-section" },
              { label: "Recommended", id: "recommended-section" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-all shrink-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 03. FEATURED VERIFIED LEADERS ───────────────────────────────────── */}
        <section id="featured-leaders-section">
          <SectionTitle
            title="Featured Verified Leaders"
            subtitle="Prominent verified decision-makers, CXOs, and industry innovators."
            action={<Badge color="emerald">✓ Verified Spotlight</Badge>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredFeatured.map((leader) => (
              <Card key={leader.id} className="p-4 flex flex-col justify-between hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <img src={leader.photo} alt={leader.name} className="h-12 w-12 rounded-xl object-cover border-2 border-emerald-500/40" />
                    <div className="flex flex-col items-end gap-1">
                      {leader.trending && <Badge color="indigo">🔥 Trending</Badge>}
                      <Badge color="emerald">✓ Verified Pro</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white leading-snug">{leader.name}</h3>
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-[10px] text-gray-500 font-semibold">{leader.role} · {leader.company}</p>
                    <p className="text-[9px] text-gray-400 pt-0.5">{leader.flag} {leader.country} · {leader.industry}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {leader.tags.map((tag) => (
                      <span key={tag} className="text-[8px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 px-1.5 py-0.5 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-emerald-600">Score: {leader.score}/100</span>
                  <Link href="/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">
                    View Profile →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 04. TOP LEADERS PREVIEW & 05. LEADER RANKINGS ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="leader-rankings-section">

          {/* 04. Top Leaders Preview */}
          <div className="lg:col-span-4 space-y-4" id="top-leaders-section">
            <Card className="p-4 h-full space-y-4">
              <SectionTitle
                title="Top Verified Leaders Preview"
                action={<Trophy className="h-4 w-4 text-amber-500" />}
              />
              <p className="text-[10px] text-gray-500">Highest-ranked verified executive leaders across global platform activity.</p>
              <div className="space-y-3">
                {FEATURED_VERIFIED_LEADERS.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display text-base font-bold text-amber-500 w-6 text-center">#{lead.rank}</span>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                          <CheckCircle className="h-3 w-3 text-emerald-600 shrink-0" />
                        </div>
                        <span className="text-[9px] text-gray-400">{lead.company} · {lead.country}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600">{lead.score} pts</span>
                  </div>
                ))}
              </div>
              <Link href="/en/news-poc/all-leaders" className="block text-center text-xs font-bold text-emerald-600 hover:underline pt-2">
                View All Verified Leaders Directory →
              </Link>
            </Card>
          </div>

          {/* 05. Leader Rankings & Transparency */}
          <div className="lg:col-span-8 space-y-4">
            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 flex-wrap gap-2">
                <div>
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Verified Leader Rankings
                  </h2>
                  <p className="text-[10px] text-gray-500">Audited multidimensional metric based on verified industry impact &amp; citations.</p>
                </div>
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                  {(["overall", "industry", "sector", "country"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setRankingTab(tab)}
                      className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase transition-all ${
                        rankingTab === tab ? "bg-white dark:bg-gray-800 text-emerald-600 shadow-2xs font-bold" : "text-gray-400"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {VERIFIED_RANKINGS_DATA[rankingTab].map((item) => (
                  <div key={item.rank} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-gray-400 w-5 text-center">#{item.rank}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-900 dark:text-white">{item.name}</span>
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                          <span className="text-xs">{item.flag}</span>
                        </div>
                        <span className="text-[9px] text-gray-500">{item.role} at {item.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-semibold text-emerald-600">{item.change}</span>
                      <span className="font-display font-bold text-emerald-600">{item.score} / 100</span>
                      <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline">
                        Profile →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ranking Transparency */}
              <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-[9px] text-gray-600 dark:text-gray-400 space-y-1">
                <span className="font-bold text-emerald-600 uppercase tracking-wider block">How Verified Rankings Work:</span>
                <p>
                  Rankings reflect verified corporate disclosures, audited board appointments, editorial coverage citations, and authentic B2B engagement signals. All scores are independently verified and tamper-proof.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* ── 06. TOP LEADERS BY INDUSTRY & 07. LEADERS BY SECTOR ─────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 06. Top Leaders by Industry */}
          <section id="industries-section">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Top Verified Leaders by Industry" action={<Layers className="h-4 w-4 text-teal-500" />} />
              <div className="space-y-2.5">
                {VERIFIED_INDUSTRY_PREVIEW.map((ind) => (
                  <div key={ind.name} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{ind.name}</span>
                        <span className="text-[8px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/20 px-1.5 py-0.2 rounded">{ind.count}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Top: {ind.topLeader}</p>
                    </div>
                    <Link href="/en/news-poc/all-leaders" className="text-[9px] font-bold text-teal-600 hover:underline shrink-0">
                      Explore Leaders →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 07. Leaders by Sector */}
          <section id="sectors-section">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Verified Leadership Across Sectors" action={<Compass className="h-4 w-4 text-emerald-500" />} />
              <div className="space-y-2.5">
                {VERIFIED_SECTORS_LIST.map((sec) => (
                  <div key={sec.name} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{sec.name}</span>
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.2 rounded">{sec.count}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Focus: {sec.top}</p>
                    </div>
                    <Link href="/en/news-poc/all-leaders" className="text-[9px] font-bold text-emerald-600 hover:underline shrink-0">
                      Explore →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 08. GLOBAL LEADERSHIP / BY COUNTRY ──────────────────────────────── */}
        <section id="countries-section">
          <SectionTitle
            title="Global Verified Leadership"
            subtitle="Discover authenticated decision-makers shaping bilateral corridors and regional enterprise growth."
            action={<Globe className="h-4 w-4 text-emerald-500" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {VERIFIED_COUNTRIES_LIST.map((c) => (
              <Card key={c.country} className="p-3.5 space-y-2 hover:border-emerald-300 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg" aria-hidden="true">{c.flag}</span>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white">{c.country}</h3>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600 block mt-1">{c.count}</span>
                  <p className="text-[8px] text-gray-400 mt-0.5 line-clamp-2">{c.top}</p>
                </div>
                <Link href="/en/news-poc/all-leaders" className="text-[9px] font-bold text-emerald-600 hover:underline pt-2 block">
                  Explore Country Leaders →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 09. RISING LEADERS & 12. TRENDING LEADERS ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="rising-leaders-section">

          {/* 09. Rising Leaders */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Rising Verified Leaders" action={<Badge color="emerald">High Velocity</Badge>} />
              <p className="text-[10px] text-gray-500">Verified executives receiving increasing market citations and new boardroom mandates.</p>
              <div className="space-y-3">
                {RISING_VERIFIED_LEADERS.map((leader) => (
                  <div key={leader.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={leader.photo} alt={leader.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{leader.name}</h4>
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-[9px] text-gray-500">{leader.role} · {leader.company}</span>
                        <div className="flex gap-1 mt-0.5">
                          {leader.tags.slice(0, 2).map(t => (
                            <span key={t} className="text-[7px] text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-1 py-0.2 rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Link href="/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0">
                      View Profile →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 12. Trending Leaders */}
          <section id="trending-section">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Trending Verified Leaders" action={<Flame className="h-4 w-4 text-teal-500" />} />
              <p className="text-[10px] text-gray-500">Verified leaders with highest profile views, news citations, and follower velocity this week.</p>
              <div className="space-y-3">
                {FEATURED_VERIFIED_LEADERS.map((leader) => (
                  <div key={leader.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={leader.photo} alt={leader.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{leader.name}</h4>
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                          <span className="text-[8px] bg-teal-50 dark:bg-teal-950/40 text-teal-600 px-1 rounded font-bold">🔥 Trending</span>
                        </div>
                        <span className="text-[9px] text-gray-500">{leader.company} · {leader.views} views</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFollow(leader.id)}
                      className={`text-[9px] font-bold px-3 py-1 rounded-lg transition-colors shrink-0 ${
                        followedState[leader.id]
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {followedState[leader.id] ? "Following ✓" : "+ Follow"}
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 13. RECOGNIZED & AWARDED LEADERS ─────────────────────────────────── */}
        <section id="recognition-section">
          <SectionTitle
            title="Recognized &amp; Awarded Verified Leaders"
            subtitle="Excellence citations, industry recognitions, and global corporate leadership awards."
            action={<Award className="h-4 w-4 text-amber-500" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VERIFIED_RECOGNIZED_AWARDS.map((item, idx) => (
              <Card key={idx} className="p-4 space-y-2 hover:border-amber-300 transition-colors flex flex-col justify-between">
                <div className="space-y-1.5">
                  <Badge color="amber">🏆 {item.category}</Badge>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{item.award}</h3>
                  <div className="flex items-center gap-1">
                    <p className="text-[10px] text-gray-600 dark:text-gray-400 font-semibold">{item.leader}</p>
                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[9px] text-gray-400">
                  <span>{item.date}</span>
                  <Link href="/eoi" className="font-bold text-amber-600 hover:underline">
                    Explore →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 14. LEADERSHIP TYPES & 15. LEADERS BY EXPERTISE ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="expertise-section">

          {/* 14. Leadership Types */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Explore by Leadership Type" action={<User className="h-4 w-4 text-emerald-500" />} />
              <div className="flex flex-wrap gap-2 pt-1">
                {LEADERSHIP_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                      selectedType === type
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-emerald-600 border border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </Card>
          </section>

          {/* 15. Leaders by Expertise */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Verified Leaders by Expertise" action={<Sparkles className="h-4 w-4 text-teal-500" />} />
              <div className="flex flex-wrap gap-2 pt-1">
                {EXPERTISE_CATEGORIES.map((exp) => (
                  <span
                    key={exp}
                    onClick={() => setSearchQuery(exp)}
                    className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-900/40 rounded-xl text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer hover:border-teal-400 transition-colors"
                  >
                    <Target className="h-3 w-3 text-teal-500" /> {exp}
                  </span>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 16. RECENTLY JOINED LEADERS & 17. LEADERSHIP ACHIEVEMENTS ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="achievements-section">

          {/* 16. Recently Verified Leaders */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Recently Verified Leaders" action={<Badge color="emerald">New Audits</Badge>} />
              <div className="space-y-3">
                {RECENTLY_VERIFIED_LEADERS.map((l) => (
                  <div key={l.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={l.photo} alt={l.name} className="h-10 w-10 rounded-lg object-cover border border-emerald-500/40" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{l.name}</h4>
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                          <span className="text-[7px] bg-emerald-100 text-emerald-700 px-1 py-0.2 rounded font-bold uppercase">Verified</span>
                        </div>
                        <span className="text-[9px] text-gray-500">{l.role} · {l.company}</span>
                      </div>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline shrink-0">
                      View Profile →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 17. Leadership Achievements */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Latest Verified Achievements" action={<Award className="h-4 w-4 text-teal-500" />} />
              <div className="space-y-3">
                {VERIFIED_ACHIEVEMENTS.map((a, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{a.leader}</span>
                      <Badge color="teal">{a.tag}</Badge>
                    </div>
                    <p className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">{a.title}</p>
                    <span className="text-[8px] text-gray-400 block pt-0.5">{a.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 18. RECENT MOVES & 19. LEADERS BEHIND LEADING COMPANIES ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="moves-section">

          {/* 18. Recent Leadership Moves */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Recent Leadership Moves" action={<Briefcase className="h-4 w-4 text-emerald-500" />} />
              <div className="space-y-2.5">
                {VERIFIED_RECENT_MOVES.map((m, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{m.leader}</h4>
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                      </div>
                      <p className="text-[10px] text-emerald-600 font-semibold">{m.move} — {m.company}</p>
                      <span className="text-[8px] text-gray-400">{m.date}</span>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline shrink-0">
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 19. Leaders Behind Leading Companies */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Leaders Behind Leading Companies" action={<Building2 className="h-4 w-4 text-teal-500" />} />
              <div className="space-y-2.5">
                {VERIFIED_COMPANY_LEADERS.map((c, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{c.company}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{c.leaders}</p>
                      <span className="text-[8px] font-bold text-teal-600">{c.count}</span>
                    </div>
                    <Link href="/en/news-poc/all-leaders" className="text-[9px] font-bold text-teal-600 hover:underline shrink-0">
                      Explore Leaders →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 20. RECOMMENDED LEADERS & 21. BUILD NETWORK ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="recommended-section">

          {/* 20. Recommended Leaders */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Recommended Verified Leaders For You" action={<Badge color="teal">Personalized</Badge>} />
              <p className="text-[10px] text-gray-500">Recommended because you follow Deep Tech, Sovereign AI, and Renewable Energy.</p>
              <div className="space-y-3">
                {FEATURED_VERIFIED_LEADERS.slice(0, 2).map((l) => (
                  <div key={l.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={l.photo} alt={l.name} className="h-10 w-10 rounded-lg object-cover border border-emerald-500/40" />
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{l.name}</h4>
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span className="text-[9px] text-gray-500">{l.role} at {l.company}</span>
                      </div>
                    </div>
                    <Link href="/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0">
                      Connect →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 21. Build Your Verified Leadership Network */}
          <section>
            <Card className="p-6 bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950 text-white border-none space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-teal-300 uppercase tracking-widest">Network Growth</span>
                <h3 className="text-base font-bold">Build Your Verified Leadership Network</h3>
                <p className="text-xs text-white/80 leading-relaxed font-normal">
                  Follow authenticated executives, board members, and sector experts you care about to personalize your daily leadership intelligence feed.
                </p>
              </div>
              <div className="flex gap-3 pt-2 flex-wrap">
                <Link href="/en/news-poc/all-leaders" className="bg-white text-emerald-950 font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors">
                  Discover Leaders →
                </Link>
                <Link href="/eoi" className="border border-white/30 bg-white/10 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-white/20 transition-colors">
                  Follow Leaders →
                </Link>
              </div>
            </Card>
          </section>
        </div>

        {/* ── 22. PREMIUM LEADER RANKINGS & INTELLIGENCE ──────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 text-white border-none space-y-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Unlock Advanced Verified Intelligence</h2>
                <p className="text-[10px] text-white/70 mt-1">Upgrade your verified pro tier to access full leadership influence scorecards, boardroom trend signals, and bespoke dossiers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "FREE (REGISTERED)",
                  color: "border-white/20 bg-white/5",
                  items: ["Basic leader discovery", "Featured leaders preview", "Popular leaders", "Basic rankings", "Search & filters"],
                  locked: false
                },
                {
                  tier: "PRO (VERIFIED)",
                  color: "border-emerald-400 bg-emerald-950/40",
                  items: ["Verified trust badge", "Leadership influence radar", "Industry & country deep dives", "Leadership trend signals", "AI leader insights"],
                  locked: false
                },
                {
                  tier: "ENTERPRISE",
                  color: "border-amber-400 bg-amber-950/30",
                  items: ["Executive intelligence dossiers", "Competitor leadership monitoring", "Custom leader research", "Boardroom advisory matching", "CRM integration"],
                  locked: true
                }
              ].map((plan) => (
                <div key={plan.tier} className={`border rounded-xl p-4 space-y-2 ${plan.color}`}>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{plan.tier}</span>
                  <ul className="space-y-1.5 mt-2">
                    {plan.items.map((item) => (
                      <li key={item} className="text-[10px] text-white/80 flex items-start gap-1.5">
                        {plan.locked ? (
                          <>
                            <span className="shrink-0 mt-0.5" aria-hidden="true">🔒</span>
                            <span>{item}</span>
                          </>
                        ) : (
                          <>
                            <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link href="/eoi" className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-xs">
              Explore Enterprise Intelligence →
            </Link>
          </Card>
        </section>

        {/* ── 23. FEATURED LEADER PROMOTION ───────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Executive Monetization</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white mt-1">Increase Your Verified Leadership Visibility</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Get discovered by businesses, professionals, and decision-makers across your industry and target geographic markets.
                </p>
              </div>
              <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm">
                Promote Your Profile →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[10px] text-gray-700 dark:text-gray-300 font-medium">
              <div>✓ Verified Leader Badge</div>
              <div>✓ Featured Leader Placement</div>
              <div>✓ Featured Industry Spotlight</div>
              <div>✓ Priority Advisory Leads</div>
            </div>
          </Card>
        </section>

        {/* ── 24. LEADERSHIP NEWSLETTER ──────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-emerald-800 to-teal-900 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-white/70" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">Verified Leadership Brief</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get important verified leadership news, emerging leaders, achievements, and executive movements delivered to your inbox every morning.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-52 rounded-xl bg-white/15 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20"
                placeholder="Enter your corporate email..."
                aria-label="Newsletter email address"
                type="email"
              />
              <button
                className="bg-white text-emerald-950 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors shrink-0 shadow-xs"
                aria-label="Subscribe to Verified Leadership Brief"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-[9px] text-white/50 text-center">Trusted by 28,000+ executives · Zero spam · Unsubscribe anytime</p>
          </Card>
        </section>

      </div>
    </div>
  );
}

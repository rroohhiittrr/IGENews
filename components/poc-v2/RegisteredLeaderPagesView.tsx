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
  CheckCircle,
  ChevronRight,
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
  Zap,
  Clock,
  ShieldCheck,
  Check
} from "lucide-react";

// ─── Local UI primitives (strictly scoped to Registered Leader Pages) ────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
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

// ─── Mock Data for Leader Pages ──────────────────────────────────────────────

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

const FEATURED_LEADERS: LeaderCardData[] = [
  {
    id: "lead-1",
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
    rank: 1,
    featured: true,
    verified: true,
    trending: true,
    tags: ["Sovereign AI", "Semiconductors", "Global Strategy"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "lead-2",
    name: "Jensen Huang",
    role: "Founder & CEO",
    company: "NVIDIA Corp",
    industry: "Semiconductors & AI",
    sector: "Deep Tech & Computing",
    country: "United States",
    flag: "🇺🇸",
    followers: "245.8K",
    views: "520.1K",
    score: 97,
    rank: 2,
    featured: true,
    verified: true,
    trending: true,
    tags: ["GPU Clusters", "Enterprise AI", "Hardware"],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "lead-3",
    name: "Mukesh Ambani",
    role: "Chairman & Managing Director",
    company: "Reliance Industries",
    industry: "Energy & Telecom",
    sector: "Renewables & Infrastructure",
    country: "India",
    flag: "🇮🇳",
    followers: "182.3K",
    views: "410.5K",
    score: 96,
    rank: 3,
    featured: true,
    verified: true,
    tags: ["Green Hydrogen", "5G Network", "Retail Scale"],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "lead-4",
    name: "Sheikh Tahnoon bin Zayed",
    role: "Chairman",
    company: "ADQ / G42",
    industry: "Sovereign Capital & AI",
    sector: "Finance & Sovereign Wealth",
    country: "UAE",
    flag: "🇦🇪",
    followers: "94.2K",
    views: "215.0K",
    score: 95,
    rank: 4,
    featured: true,
    verified: true,
    tags: ["Indo-Gulf Corridors", "Supercomputing", "Strategic Co-Investment"],
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80"
  }
];

const RISING_LEADERS: LeaderCardData[] = [
  {
    id: "lead-5",
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
    tags: ["Cross-Border UPI", "Treasury", "Series C"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "lead-6",
    name: "Dr. Rajesh Grover",
    role: "Chief Technology Officer",
    company: "Adani Green Hydrogen",
    industry: "Renewable Energy",
    sector: "Energy & Utilities",
    country: "India",
    flag: "🇮🇳",
    followers: "14.5K",
    views: "39.4K",
    score: 89,
    rank: 18,
    rising: true,
    verified: true,
    tags: ["Electrolysers", "Green Ammonia", "Khavda Hub"],
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "lead-7",
    name: "Elena Rostova",
    role: "Global Head of Supply Chain",
    company: "Pacific Logistics",
    industry: "Logistics & Maritime",
    sector: "Transport & Trade",
    country: "Singapore",
    flag: "🇸🇬",
    followers: "22.8K",
    views: "58.2K",
    score: 92,
    rank: 9,
    rising: true,
    verified: true,
    tags: ["IMEC Corridors", "Port Logistics", "Carbon Border Tax"],
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80"
  }
];

const RECENTLY_JOINED_LEADERS: LeaderCardData[] = [
  {
    id: "lead-8",
    name: "Dr. Alok Verma",
    role: "Chief Scientific Officer",
    company: "Viksit Life Sciences",
    industry: "Biotech & Genomics",
    sector: "Healthcare & Life Sciences",
    country: "India",
    flag: "🇮🇳",
    followers: "4.1K",
    views: "12.8K",
    score: 86,
    rank: 42,
    recentlyJoined: true,
    verified: true,
    tags: ["CRISPR", "Biosimilars", "Clinical Trials"],
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "lead-9",
    name: "Marcus Vance",
    role: "Managing Director, APAC",
    company: "Nordic Clean Tech",
    industry: "CleanTech & Carbon Capture",
    sector: "Environment & Energy",
    country: "Germany / India",
    flag: "🇩🇪",
    followers: "6.3K",
    views: "16.4K",
    score: 87,
    rank: 38,
    recentlyJoined: true,
    verified: true,
    tags: ["Direct Air Capture", "EU Taxonomy", "ESG Capital"],
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80"
  }
];

const RANKINGS_DATA: Record<string, { rank: number; name: string; company: string; role: string; score: number; flag: string; country: string; change: string }[]> = {
  overall: [
    { rank: 1, name: "N. Chandrasekaran", company: "Tata Sons", role: "Chairman", score: 98, flag: "🇮🇳", country: "India", change: "▲ 0" },
    { rank: 2, name: "Jensen Huang", company: "NVIDIA Corp", role: "CEO", score: 97, flag: "🇺🇸", country: "USA", change: "▲ +1" },
    { rank: 3, name: "Mukesh Ambani", company: "Reliance Industries", role: "Chairman", score: 96, flag: "🇮🇳", country: "India", change: "▲ 0" },
    { rank: 4, name: "Sheikh Tahnoon bin Zayed", company: "ADQ / G42", role: "Chairman", score: 95, flag: "🇦🇪", country: "UAE", change: "▲ +2" },
    { rank: 5, name: "Dr. Lisa Su", company: "AMD", role: "CEO", score: 94, flag: "🇺🇸", country: "USA", change: "▲ +1" },
  ],
  industry: [
    { rank: 1, name: "Jensen Huang", company: "NVIDIA Corp", role: "CEO", score: 97, flag: "🇺🇸", country: "USA", change: "Top Tech" },
    { rank: 2, name: "Dr. Lisa Su", company: "AMD", role: "CEO", score: 94, flag: "🇺🇸", country: "USA", change: "Top Semi" },
    { rank: 3, name: "Pooja Malhotra", company: "PayPulse", role: "CFO", score: 91, flag: "🇮🇳", country: "India", change: "Top FinTech" },
  ],
  sector: [
    { rank: 1, name: "N. Chandrasekaran", company: "Tata Sons", role: "Chairman", score: 98, flag: "🇮🇳", country: "India", change: "Industrial" },
    { rank: 2, name: "Mukesh Ambani", company: "Reliance Industries", role: "Chairman", score: 96, flag: "🇮🇳", country: "India", change: "Energy" },
    { rank: 3, name: "Elena Rostova", company: "Pacific Logistics", role: "Global Head", score: 92, flag: "🇸🇬", country: "Singapore", change: "Logistics" },
  ],
  country: [
    { rank: 1, name: "N. Chandrasekaran", company: "Tata Sons", role: "Chairman", score: 98, flag: "🇮🇳", country: "India", change: "#1 India" },
    { rank: 2, name: "Jensen Huang", company: "NVIDIA Corp", role: "CEO", score: 97, flag: "🇺🇸", country: "USA", change: "#1 USA" },
    { rank: 3, name: "Sheikh Tahnoon bin Zayed", company: "ADQ / G42", role: "Chairman", score: 95, flag: "🇦🇪", country: "UAE", change: "#1 UAE" },
  ]
};

const INDUSTRY_LEADERS_PREVIEW = [
  { name: "Technology & AI", count: "340 Leaders", topLeader: "Jensen Huang (NVIDIA)" },
  { name: "Finance & Banking", count: "280 Leaders", topLeader: "Ananya Sengupta (Standard Chartered)" },
  { name: "Renewable Energy", count: "215 Leaders", topLeader: "Dr. Rajesh Grover (Adani Green)" },
  { name: "Healthcare & Life Sciences", count: "190 Leaders", topLeader: "Dr. Elena Vance (Biocon)" },
  { name: "Heavy Manufacturing", count: "260 Leaders", topLeader: "N. Chandrasekaran (Tata Sons)" },
  { name: "Logistics & Maritime", count: "175 Leaders", topLeader: "Elena Rostova (Pacific Logistics)" },
];

const SECTORS_LIST = [
  { name: "Technology & Computing", count: "540 Leaders", top: "NVIDIA / AMD" },
  { name: "Financial Services", count: "480 Leaders", top: "Standard Chartered / Razorpay" },
  { name: "Energy & Infrastructure", count: "390 Leaders", top: "Reliance / Adani" },
  { name: "Healthcare & Biotech", count: "310 Leaders", top: "Biocon / Viksit" },
  { name: "Transport & Supply Chain", count: "280 Leaders", top: "Pacific Logistics / DP World" },
  { name: "Industrial Manufacturing", count: "360 Leaders", top: "Tata Group / L&T" },
];

const COUNTRY_LEADERS_LIST = [
  { country: "India", flag: "🇮🇳", count: "1,240 Leaders", top: "N. Chandrasekaran (Tata Sons)" },
  { country: "United States", flag: "🇺🇸", count: "890 Leaders", top: "Jensen Huang (NVIDIA)" },
  { country: "United Kingdom", flag: "🇬🇧", count: "380 Leaders", top: "Jonathan Reynolds (DBT)" },
  { country: "United Arab Emirates", flag: "🇦🇪", count: "290 Leaders", top: "Sheikh Tahnoon bin Zayed (ADQ)" },
  { country: "Singapore", flag: "🇸🇬", count: "240 Leaders", top: "Elena Rostova (Pacific Logistics)" },
  { country: "Germany", flag: "🇩🇪", count: "210 Leaders", top: "Marcus Vance (Nordic Clean)" },
];

const RECOGNIZED_AWARDS = [
  { leader: "N. Chandrasekaran", award: "Global Industry Leadership Award 2026", category: "Conglomerate Excellence", date: "Aug 2026" },
  { leader: "Jensen Huang", award: "Pioneer in Computing Architecture", category: "Tech Innovation", date: "Jul 2026" },
  { leader: "Dr. Elena Vance", award: "Healthcare Governance Excellence", category: "Regulatory Leadership", date: "Aug 2026" },
  { leader: "Pooja Malhotra", award: "Emerging CFO of the Year", category: "FinTech Leadership", date: "Jun 2026" },
];

const LEADERSHIP_TYPES = [
  "CEO", "Founder", "Managing Director", "CFO", "CTO", "COO", "Chairperson", "President", "Board Director", "Investor", "Industry Expert"
];

const EXPERTISE_CATEGORIES = [
  "Business Strategy", "Sovereign AI & Computing", "Cross-Border Trade", "Sustainable Finance", "Semiconductor OSAT", "Electrolyser Engineering", "Supply Chain Corridors", "Direct Air Capture", "Digital Transformation"
];

const LEADERSHIP_ACHIEVEMENTS = [
  { leader: "N. Chandrasekaran", title: "Commissioned $14B Sovereign AI Supercluster in Gujarat", date: "This Week", tag: "Milestone" },
  { leader: "Dr. Rajesh Grover", title: "Scaled 3 GW Electrolyser Pilot at Khavda Renewable Park", date: "2 Days Ago", tag: "Energy R&D" },
  { leader: "Elena Rostova", title: "Executed 30% Multimodal Routing Pivot into IMEC Corridor", date: "Last Week", tag: "Supply Chain" },
];

const RECENT_LEADERSHIP_MOVES = [
  { leader: "Dr. Rajesh Grover", move: "Appointed CTO", company: "Adani Green Hydrogen", date: "Effective Today" },
  { leader: "Ananya Sengupta", move: "Named MD South Asia Corporate Banking", company: "Standard Chartered", date: "Effective Yesterday" },
  { leader: "Dr. Elena Vance", move: "Elected to Board of Directors", company: "Biocon Biologics", date: "Effective 2 Days Ago" },
  { leader: "Suresh Narayanan", move: "Transitioned to Senior Board Advisor", company: "Nestlé South Asia", date: "Effective Last Week" },
];

const COMPANY_LEADERS = [
  { company: "Tata Group", leaders: "N. Chandrasekaran (Chairman), Girish Wagh (Executive Director)", count: "18 Leaders Tracked" },
  { company: "NVIDIA Corp", leaders: "Jensen Huang (CEO), Colette Kress (CFO)", count: "12 Leaders Tracked" },
  { company: "Adani Group", leaders: "Gautam Adani (Chairman), Dr. Rajesh Grover (CTO)", count: "15 Leaders Tracked" },
  { company: "Standard Chartered", leaders: "Bill Winters (CEO), Ananya Sengupta (MD)", count: "10 Leaders Tracked" },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function RegisteredLeaderPagesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rankingTab, setRankingTab] = useState<"overall" | "industry" | "sector" | "country">("overall");
  const [selectedType, setSelectedType] = useState("All");
  const [followedState, setFollowedState] = useState<Record<string, boolean>>({
    "lead-1": true,
    "lead-2": true
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const toggleFollow = (id: string) => {
    setFollowedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 border border-white/20 px-3 py-1 rounded-full bg-white/10 inline-flex items-center gap-1.5 shadow-xs">
                <Crown className="h-3 w-3 text-amber-300" /> LEADER PAGES
              </span>
              <span className="text-[10px] font-semibold text-cyan-200 bg-cyan-950/40 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                Discovery, Rankings &amp; Recognition Hub
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Discover the Leaders Shaping Business &amp; Industry
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-2xl font-normal">
              Explore featured, top, emerging, and influential leaders across industries, sectors, and global markets.
            </p>

            {/* 02. Search & Discovery */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search leaders, company, industry, or expertise (e.g. CEO Technology India, Tata)..."
                  aria-label="Search leaders, company, industry or expertise"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("featured-leaders-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-blue-900 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-sm"
              >
                Explore Leaders →
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
                { label: "Verified Leaders", value: "2,800+ Profiles" },
                { label: "Tracked Companies", value: "1,150+ Enterprises" },
                { label: "Global Sectors", value: "50 Sectors" },
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
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all shrink-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 03. FEATURED LEADERS ────────────────────────────────────────────── */}
        <section id="featured-leaders-section">
          <SectionTitle
            title="Featured Leaders"
            subtitle="Prominent C-Suite decision makers and enterprise pioneers."
            action={<Badge color="amber">Featured Placement</Badge>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_LEADERS.map((leader) => (
              <Card key={leader.id} className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <img src={leader.photo} alt={leader.name} className="h-12 w-12 rounded-xl object-cover border border-gray-200 dark:border-gray-800" />
                    <div className="flex flex-col items-end gap-1">
                      {leader.trending && <Badge color="indigo">🔥 Trending</Badge>}
                      {leader.verified && <Badge color="blue">✓ Verified</Badge>}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white leading-snug">{leader.name}</h3>
                    <p className="text-[10px] text-gray-500 font-semibold">{leader.role} · {leader.company}</p>
                    <p className="text-[9px] text-gray-400 pt-0.5">{leader.flag} {leader.country} · {leader.industry}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {leader.tags.map((tag) => (
                      <span key={tag} className="text-[8px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-blue-600">Score: {leader.score}/100</span>
                  <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors">
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
                title="Top Leaders Preview"
                action={<Trophy className="h-4 w-4 text-amber-500" />}
              />
              <p className="text-[10px] text-gray-500">Highest-ranked executive leaders across global platform activity.</p>
              <div className="space-y-3">
                {FEATURED_LEADERS.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display text-base font-bold text-amber-500 w-6 text-center">#{lead.rank}</span>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                        <span className="text-[9px] text-gray-400">{lead.company} · {lead.country}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-purple-600">{lead.score} pts</span>
                  </div>
                ))}
              </div>
              <Link href="/en/poc-v2/all-leaders" className="block text-center text-xs font-bold text-blue-600 hover:underline pt-2">
                View All Top Leaders Directory →
              </Link>
            </Card>
          </div>

          {/* 05. Leader Rankings & Transparency */}
          <div className="lg:col-span-8 space-y-4">
            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 flex-wrap gap-2">
                <div>
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Leader Rankings
                  </h2>
                  <p className="text-[10px] text-gray-500">Multidimensional metric based on verified industry impact &amp; citations.</p>
                </div>
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                  {(["overall", "industry", "sector", "country"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setRankingTab(tab)}
                      className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase transition-all ${
                        rankingTab === tab ? "bg-white dark:bg-gray-800 text-blue-600 shadow-2xs" : "text-gray-400"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {RANKINGS_DATA[rankingTab].map((item) => (
                  <div key={item.rank} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-gray-400 w-5 text-center">#{item.rank}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-900 dark:text-white">{item.name}</span>
                          <span className="text-xs">{item.flag}</span>
                        </div>
                        <span className="text-[9px] text-gray-500">{item.role} at {item.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-semibold text-emerald-500">{item.change}</span>
                      <span className="font-display font-bold text-blue-600">{item.score} / 100</span>
                      <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline">
                        Profile →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* 12. Ranking Transparency */}
              <div className="bg-blue-50/60 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900/40 text-[9px] text-gray-600 dark:text-gray-400 space-y-1">
                <span className="font-bold text-blue-600 uppercase tracking-wider block">How Rankings Work:</span>
                <p>
                  Rankings are computed dynamically using platform engagement, verified business achievements, executive news citations, peer recognition awards, and followed leadership signals. No payments manipulate organic scores.
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
              <SectionTitle title="Top Leaders by Industry" action={<Layers className="h-4 w-4 text-purple-500" />} />
              <div className="space-y-2.5">
                {INDUSTRY_LEADERS_PREVIEW.map((ind) => (
                  <div key={ind.name} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{ind.name}</span>
                        <span className="text-[8px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/20 px-1.5 py-0.2 rounded">{ind.count}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Top: {ind.topLeader}</p>
                    </div>
                    <Link href="/en/poc-v2/all-leaders" className="text-[9px] font-bold text-purple-600 hover:underline shrink-0">
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
              <SectionTitle title="Leadership Across Sectors" action={<Compass className="h-4 w-4 text-emerald-500" />} />
              <div className="space-y-2.5">
                {SECTORS_LIST.map((sec) => (
                  <div key={sec.name} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{sec.name}</span>
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.2 rounded">{sec.count}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Focus: {sec.top}</p>
                    </div>
                    <Link href="/en/poc-v2/all-leaders" className="text-[9px] font-bold text-emerald-600 hover:underline shrink-0">
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
            title="Global Leadership"
            subtitle="Discover decision makers shaping bilateral corridors and regional enterprise growth."
            action={<Globe className="h-4 w-4 text-blue-500" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {COUNTRY_LEADERS_LIST.map((c) => (
              <Card key={c.country} className="p-3.5 space-y-2 hover:border-blue-300 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg" aria-hidden="true">{c.flag}</span>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white">{c.country}</h3>
                  </div>
                  <span className="text-[9px] font-bold text-blue-600 block mt-1">{c.count}</span>
                  <p className="text-[8px] text-gray-400 mt-0.5 line-clamp-2">{c.top}</p>
                </div>
                <Link href="/en/poc-v2/all-leaders" className="text-[9px] font-bold text-blue-600 hover:underline pt-2 block">
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
              <SectionTitle title="Rising Leaders" action={<Badge color="emerald">High Velocity</Badge>} />
              <p className="text-[10px] text-gray-500">Executives receiving increasing market citations and recent operational mandates.</p>
              <div className="space-y-3">
                {RISING_LEADERS.map((leader) => (
                  <div key={leader.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={leader.photo} alt={leader.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{leader.name}</h4>
                        <span className="text-[9px] text-gray-500">{leader.role} · {leader.company}</span>
                        <div className="flex gap-1 mt-0.5">
                          {leader.tags.slice(0, 2).map(t => (
                            <span key={t} className="text-[7px] text-gray-400 bg-gray-200 dark:bg-gray-800 px-1 py-0.2 rounded">{t}</span>
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
              <SectionTitle title="Trending Leaders" action={<Flame className="h-4 w-4 text-indigo-500" />} />
              <p className="text-[10px] text-gray-500">Leaders with highest profile views, news mentions, and searches this week.</p>
              <div className="space-y-3">
                {FEATURED_LEADERS.map((leader) => (
                  <div key={leader.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={leader.photo} alt={leader.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{leader.name}</h4>
                          <span className="text-[8px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 px-1 rounded font-bold">🔥 Trending</span>
                        </div>
                        <span className="text-[9px] text-gray-500">{leader.company} · {leader.views} views</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFollow(leader.id)}
                      className={`text-[9px] font-bold px-3 py-1 rounded-lg transition-colors shrink-0 ${
                        followedState[leader.id]
                          ? "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/40"
                          : "bg-blue-600 text-white hover:bg-blue-700"
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
            title="Recognized &amp; Awarded Leaders"
            subtitle="Excellence citations, industry recognitions, and corporate leadership awards."
            action={<Award className="h-4 w-4 text-amber-500" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RECOGNIZED_AWARDS.map((item, idx) => (
              <Card key={idx} className="p-4 space-y-2 hover:border-amber-300 transition-colors flex flex-col justify-between">
                <div className="space-y-1.5">
                  <Badge color="amber">🏆 {item.category}</Badge>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{item.award}</h3>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-semibold">{item.leader}</p>
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
              <SectionTitle title="Explore by Leadership Type" action={<User className="h-4 w-4 text-blue-500" />} />
              <div className="flex flex-wrap gap-2 pt-1">
                {LEADERSHIP_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                      selectedType === type
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 border border-gray-200 dark:border-gray-800"
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
              <SectionTitle title="Leaders by Expertise" action={<Sparkles className="h-4 w-4 text-indigo-500" />} />
              <div className="flex flex-wrap gap-2 pt-1">
                {EXPERTISE_CATEGORIES.map((exp) => (
                  <span
                    key={exp}
                    className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/40 rounded-xl text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer hover:border-indigo-400"
                  >
                    <Target className="h-3 w-3 text-indigo-500" /> {exp}
                  </span>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 16. RECENTLY JOINED LEADERS & 17. LEADERSHIP ACHIEVEMENTS ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="achievements-section">

          {/* 16. Recently Joined Leaders */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Recently Joined Leaders" action={<Badge color="blue">New Profiles</Badge>} />
              <div className="space-y-3">
                {RECENTLY_JOINED_LEADERS.map((l) => (
                  <div key={l.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={l.photo} alt={l.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{l.name}</h4>
                          <span className="text-[7px] bg-blue-100 text-blue-600 px-1 py-0.2 rounded font-bold uppercase">New</span>
                        </div>
                        <span className="text-[9px] text-gray-500">{l.role} · {l.company}</span>
                      </div>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline shrink-0">
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
              <SectionTitle title="Latest Leadership Achievements" action={<Award className="h-4 w-4 text-purple-500" />} />
              <div className="space-y-3">
                {LEADERSHIP_ACHIEVEMENTS.map((a, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{a.leader}</span>
                      <Badge color="purple">{a.tag}</Badge>
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
              <SectionTitle title="Recent Leadership Moves" action={<Briefcase className="h-4 w-4 text-blue-500" />} />
              <div className="space-y-2.5">
                {RECENT_LEADERSHIP_MOVES.map((m, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{m.leader}</h4>
                      <p className="text-[10px] text-blue-600 font-semibold">{m.move} — {m.company}</p>
                      <span className="text-[8px] text-gray-400">{m.date}</span>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline shrink-0">
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
              <SectionTitle title="Leaders Behind Leading Companies" action={<Building2 className="h-4 w-4 text-indigo-500" />} />
              <div className="space-y-2.5">
                {COMPANY_LEADERS.map((c, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{c.company}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{c.leaders}</p>
                      <span className="text-[8px] font-bold text-indigo-600">{c.count}</span>
                    </div>
                    <Link href="/en/poc-v2/all-leaders" className="text-[9px] font-bold text-indigo-600 hover:underline shrink-0">
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
              <SectionTitle title="Recommended Leaders For You" action={<Badge color="indigo">Personalized</Badge>} />
              <p className="text-[10px] text-gray-500">Recommended because you follow Technology, Semiconductors, and Infrastructure.</p>
              <div className="space-y-3">
                {FEATURED_LEADERS.slice(0, 2).map((l) => (
                  <div key={l.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={l.photo} alt={l.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{l.name}</h4>
                        <span className="text-[9px] text-gray-500">{l.role} at {l.company}</span>
                      </div>
                    </div>
                    <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0">
                      Connect →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 21. Build Your Leadership Network */}
          <section>
            <Card className="p-6 bg-gradient-to-br from-indigo-900 to-blue-950 text-white border-none space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-cyan-300 uppercase tracking-widest">Network Growth</span>
                <h3 className="text-base font-bold">Build Your Leadership Network</h3>
                <p className="text-xs text-white/80 leading-relaxed font-normal">
                  Follow executives, board members, and sector experts you care about to personalize your daily news stream and executive alerts.
                </p>
              </div>
              <div className="flex gap-3 pt-2 flex-wrap">
                <Link href="/en/poc-v2/all-leaders" className="bg-white text-blue-950 font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
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
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-none space-y-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Unlock Advanced Leader Intelligence</h2>
                <p className="text-[10px] text-white/70 mt-1">Upgrade your free registered tier to access full leadership influence scorecards, trend detection, and custom dossiers.</p>
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
                  color: "border-purple-400 bg-purple-950/40",
                  items: ["Advanced leader rankings", "Leadership influence radar", "Industry & country deep dives", "Leadership trend signals", "AI leader insights"],
                  locked: true
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

            <Link href="/eoi" className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-xs">
              Unlock Premium →
            </Link>
          </Card>
        </section>

        {/* ── 23. FEATURED LEADER PROMOTION ───────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Executive Monetization</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white mt-1">Increase Your Leadership Visibility</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Get discovered by businesses, professionals, and decision makers across your industry and target geographic markets.
                </p>
              </div>
              <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm">
                Promote Your Profile →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[10px] text-gray-700 dark:text-gray-300 font-medium">
              <div>✓ Featured Leader Placement</div>
              <div>✓ Verified Leader Badge</div>
              <div>✓ Featured Industry Spotlight</div>
              <div>✓ Priority Advisory Leads</div>
            </div>
          </Card>
        </section>

        {/* ── 24. LEADERSHIP NEWSLETTER ──────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-white/70" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">Leadership Brief</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get important leadership news, emerging leaders, achievements, and executive movements delivered to your inbox every morning.
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
                className="bg-white text-blue-900 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-xs"
                aria-label="Subscribe to Leadership Brief"
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

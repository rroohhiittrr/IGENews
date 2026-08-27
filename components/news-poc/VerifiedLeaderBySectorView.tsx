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

// ─── Local UI primitives (strictly scoped to Verified Leaders By Sector) ─────

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
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.emerald}`}>{children}</span>
  );
}

// ─── Mock Data for Verified By Sector Hub ─────────────────────────────────────

interface SectorItem {
  id: string;
  name: string;
  leaderCount: string;
  industryCount: string;
  newsCount: string;
  tag: string;
  tagColor: string;
  featuredLeader: string;
  featuredRole: string;
  topIndustries: string[];
}

const SECTORS_MASTER: SectorItem[] = [
  {
    id: "tech",
    name: "Technology & Deep Tech",
    leaderCount: "580 Verified Leaders",
    industryCount: "28 Industries",
    newsCount: "164 Stories",
    tag: "FEATURED",
    tagColor: "emerald",
    featuredLeader: "Jensen Huang",
    featuredRole: "Founder & CEO, NVIDIA",
    topIndustries: ["Sovereign AI", "Semiconductors", "Cloud & GPUs", "Cybersecurity"]
  },
  {
    id: "finance",
    name: "Financial Services & FinTech",
    leaderCount: "490 Verified Leaders",
    industryCount: "22 Industries",
    newsCount: "132 Stories",
    tag: "TRENDING",
    tagColor: "teal",
    featuredLeader: "Ananya Sengupta",
    featuredRole: "Managing Director, Standard Chartered",
    topIndustries: ["Cross-Border Treasury", "Digital UPI Rails", "Corporate Debt", "Sustainable ESG"]
  },
  {
    id: "energy",
    name: "Energy & Infrastructure",
    leaderCount: "420 Verified Leaders",
    industryCount: "19 Industries",
    newsCount: "114 Stories",
    tag: "EDITOR'S PICK",
    tagColor: "amber",
    featuredLeader: "Dr. Rajesh Grover",
    featuredRole: "CTO, Adani Green Hydrogen",
    topIndustries: ["Green Hydrogen", "Solar Super-Parks", "Grid Storage", "Electrolysers"]
  },
  {
    id: "pharma",
    name: "Healthcare & Life Sciences",
    leaderCount: "350 Verified Leaders",
    industryCount: "16 Industries",
    newsCount: "98 Stories",
    tag: "FEATURED",
    tagColor: "purple",
    featuredLeader: "Dr. Elena Vance",
    featuredRole: "Board Member, Biocon Biologics",
    topIndustries: ["Biosimilars", "Genomics", "Clinical Trials", "Vaccine Cold Chains"]
  },
  {
    id: "mfg",
    name: "Industrial & Advanced Manufacturing",
    leaderCount: "380 Verified Leaders",
    industryCount: "24 Industries",
    newsCount: "106 Stories",
    tag: "EDITOR'S PICK",
    tagColor: "indigo",
    featuredLeader: "N. Chandrasekaran",
    featuredRole: "Chairman, Tata Sons",
    topIndustries: ["OSAT Packaging", "Automotive EVs", "Defence Electronics", "Precision Tooling"]
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    leaderCount: "310 Verified Leaders",
    industryCount: "14 Industries",
    newsCount: "92 Stories",
    tag: "TRENDING",
    tagColor: "emerald",
    featuredLeader: "Elena Rostova",
    featuredRole: "Global Head, Pacific Logistics",
    topIndustries: ["IMEC Corridors", "Multimodal Freight", "Port Infrastructure", "Cold Chain"]
  }
];

const TOP_LEADERS_BY_SECTOR: Record<string, { name: string; role: string; company: string; score: number; flag: string; photo: string }[]> = {
  tech: [
    { name: "Jensen Huang", role: "CEO", company: "NVIDIA Corp", score: 98, flag: "🇺🇸", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" },
    { name: "N. Chandrasekaran", role: "Chairman", company: "Tata Sons", score: 98, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" },
    { name: "Dr. Lisa Su", role: "CEO", company: "AMD", score: 94, flag: "🇺🇸", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80" }
  ],
  finance: [
    { name: "Ananya Sengupta", role: "MD South Asia", company: "Standard Chartered", score: 95, flag: "🇸🇬", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80" },
    { name: "Sheikh Tahnoon bin Zayed", role: "Chairman", company: "ADQ / G42", score: 95, flag: "🇦🇪", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80" },
    { name: "Pooja Malhotra", role: "CFO", company: "PayPulse", score: 91, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80" }
  ],
  energy: [
    { name: "Dr. Rajesh Grover", role: "CTO", company: "Adani Green Hydrogen", score: 94, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80" },
    { name: "Mukesh Ambani", role: "Chairman", company: "Reliance Industries", score: 96, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80" },
    { name: "Marcus Vance", role: "MD APAC", company: "Nordic Clean Tech", score: 88, flag: "🇩🇪", photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80" }
  ],
  pharma: [
    { name: "Dr. Elena Vance", role: "Board Member", company: "Biocon Biologics", score: 92, flag: "🇺🇸", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80" },
    { name: "Dr. Alok Verma", role: "CSO", company: "Viksit Life Sciences", score: 89, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80" },
    { name: "Kiran Mazumdar-Shaw", role: "Executive Chairperson", company: "Biocon", score: 95, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80" }
  ],
  mfg: [
    { name: "N. Chandrasekaran", role: "Chairman", company: "Tata Sons", score: 98, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" },
    { name: "A.M. Naik", role: "Chairman Emeritus", company: "L&T Heavy Engineering", score: 93, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" },
    { name: "Girish Wagh", role: "Executive Director", company: "Tata Motors", score: 91, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80" }
  ],
  logistics: [
    { name: "Elena Rostova", role: "Global Head", company: "Pacific Logistics", score: 93, flag: "🇩🇪", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80" },
    { name: "Sultan Ahmed Bin Sulayem", role: "Group Chairman & CEO", company: "DP World", score: 94, flag: "🇦🇪", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80" },
    { name: "Rizwan Soomar", role: "CEO & MD Subcontinent", company: "DP World", score: 90, flag: "🇮🇳", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80" }
  ]
};

const SECTOR_RANKINGS_DATA: Record<string, { rank: number; name: string; role: string; company: string; score: number; change: string }[]> = {
  tech: [
    { rank: 1, name: "Jensen Huang", role: "CEO", company: "NVIDIA Corp", score: 98, change: "▲ 0" },
    { rank: 2, name: "N. Chandrasekaran", role: "Chairman", company: "Tata Sons", score: 98, change: "▲ +1" },
    { rank: 3, name: "Dr. Lisa Su", role: "CEO", company: "AMD", score: 94, change: "▲ +1" },
    { rank: 4, name: "Nandan Nilekani", role: "Chairman", company: "Infosys", score: 93, change: "▲ 0" },
  ],
  finance: [
    { rank: 1, name: "Ananya Sengupta", role: "MD South Asia", company: "Standard Chartered", score: 95, change: "▲ +2" },
    { rank: 2, name: "Sheikh Tahnoon bin Zayed", role: "Chairman", company: "ADQ / G42", score: 95, change: "▲ +1" },
    { rank: 3, name: "Pooja Malhotra", role: "CFO", company: "PayPulse", score: 91, change: "▲ +1" },
    { rank: 4, name: "Bill Winters", role: "Group CEO", company: "Standard Chartered", score: 90, change: "▲ 0" },
  ],
  energy: [
    { rank: 1, name: "Dr. Rajesh Grover", role: "CTO", company: "Adani Green Hydrogen", score: 94, change: "▲ +2" },
    { rank: 2, name: "Mukesh Ambani", role: "Chairman", company: "Reliance Industries", score: 96, change: "▲ 0" },
    { rank: 3, name: "Marcus Vance", role: "MD", company: "Nordic Clean Tech", score: 88, change: "▲ +1" },
    { rank: 4, name: "Sumant Sinha", role: "Chairman", company: "ReNew Power", score: 88, change: "▲ 0" },
  ],
  pharma: [
    { rank: 1, name: "Kiran Mazumdar-Shaw", role: "Executive Chairperson", company: "Biocon", score: 95, change: "▲ 0" },
    { rank: 2, name: "Dr. Elena Vance", role: "Board Member", company: "Biocon Biologics", score: 92, change: "▲ +1" },
    { rank: 3, name: "Dr. Alok Verma", role: "CSO", company: "Viksit Life Sciences", score: 89, change: "▲ +2" },
  ],
  mfg: [
    { rank: 1, name: "N. Chandrasekaran", role: "Chairman", company: "Tata Sons", score: 98, change: "▲ 0" },
    { rank: 2, name: "A.M. Naik", role: "Chairman Emeritus", company: "L&T Heavy Engineering", score: 93, change: "▲ 0" },
    { rank: 3, name: "Girish Wagh", role: "Executive Director", company: "Tata Motors", score: 91, change: "▲ +1" },
  ],
  logistics: [
    { rank: 1, name: "Elena Rostova", role: "Global Head", company: "Pacific Logistics", score: 93, change: "▲ 0" },
    { rank: 2, name: "Sultan Ahmed Bin Sulayem", role: "Group Chairman & CEO", company: "DP World", score: 94, change: "▲ +1" },
    { rank: 3, name: "Rizwan Soomar", role: "CEO & MD Subcontinent", company: "DP World", score: 90, change: "▲ 0" },
  ]
};

const SECTOR_NEWS_FEED = [
  {
    id: "vsn-1",
    sector: "Technology & Deep Tech",
    headline: "NVIDIA and Tata Sons Expand Sovereign AI GPU Supercomputing Grid in Gujarat and Hyderabad",
    leader: "Jensen Huang & N. Chandrasekaran",
    company: "NVIDIA / Tata",
    time: "25 mins ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "vsn-2",
    sector: "Financial Services & FinTech",
    headline: "Standard Chartered Deploys $1.5B Cross-Border Sustainable Liquidity Window for Asian Exporters",
    leader: "Ananya Sengupta",
    company: "Standard Chartered",
    time: "2 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "vsn-3",
    sector: "Energy & Infrastructure",
    headline: "Adani Green Launches 3 GW Electrolyser Pilot at Khavda Hybrid Renewable Park",
    leader: "Dr. Rajesh Grover",
    company: "Adani Green Hydrogen",
    time: "3 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80"
  }
];

const SECTOR_LEADERSHIP_MOVES = [
  { sector: "Energy", leader: "Dr. Rajesh Grover", move: "Appointed CTO", company: "Adani Green Hydrogen", date: "Effective Today" },
  { sector: "Finance", leader: "Ananya Sengupta", move: "Named MD South Asia", company: "Standard Chartered", date: "Effective Yesterday" },
  { sector: "Healthcare", leader: "Dr. Elena Vance", move: "Elected to Board of Directors", company: "Biocon Biologics", date: "Effective 2 Days Ago" },
  { sector: "Manufacturing", leader: "Sarah Al-Hashemi", move: "Appointed Head of Sovereign Digital Assets", company: "Emirates NBD", date: "Effective Last Week" }
];

const SECTOR_ACHIEVEMENTS = [
  { sector: "Technology", leader: "N. Chandrasekaran", milestone: "$14B Sovereign AI Supercluster Commissioned", tag: "Tech Infrastructure" },
  { sector: "Energy", leader: "Dr. Rajesh Grover", milestone: "Scaled 3 GW Electrolyser Stack Efficiency to 82%", tag: "Clean Energy R&D" },
  { sector: "Logistics", leader: "Elena Rostova", milestone: "Secured 30% Multimodal Berth Capacity on IMEC Route", tag: "Supply Chain" },
  { sector: "Finance", leader: "Ananya Sengupta", milestone: "Deployed $1.5B Green Trade Liquidity Window", tag: "ESG Treasury" }
];

const SECTOR_ROLES = ["All Roles", "CEO", "Founder", "CFO", "CTO", "COO", "Managing Director", "Chairperson", "Board Director"];

const SECTOR_EXPERTISE_MAP: Record<string, string[]> = {
  tech: ["Sovereign AI & LLMs", "Semiconductor Packaging (OSAT)", "Enterprise GPU Cloud", "Zero-Trust Cybersecurity"],
  finance: ["Cross-Border Trade Corridors", "Digital UPI & CBDC Rails", "Sovereign Co-Investment", "ESG Debt Instruments"],
  energy: ["Alkaline Electrolysers", "Direct Air Capture", "Green Ammonia Synthesis", "Carbon Border Tax Mitigation"],
  pharma: ["Biosimilar Approvals", "Genomic Sequencing", "FDA Regulatory Governance", "Cold Chain Therapeutics"],
  mfg: ["OSAT Packaging Fabs", "Defense Electronics", "Precision Tooling", "Robotic Automation"],
  logistics: ["IMEC Transit Routes", "Port Automation", "Cold Chain Logistics", "Green Shipping Corridors"]
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function VerifiedLeaderBySectorView() {
  const [selectedSectorId, setSelectedSectorId] = useState("tech");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [followedSectors, setFollowedSectors] = useState<Record<string, boolean>>({
    tech: true,
    energy: true,
    finance: true
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const toggleFollowSector = (id: string) => {
    setFollowedSectors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentSector = SECTORS_MASTER.find((s) => s.id === selectedSectorId) || SECTORS_MASTER[0];
  const topLeadersList = TOP_LEADERS_BY_SECTOR[selectedSectorId] || TOP_LEADERS_BY_SECTOR.tech;
  const rankingsList = SECTOR_RANKINGS_DATA[selectedSectorId] || SECTOR_RANKINGS_DATA.tech;
  const expertiseList = SECTOR_EXPERTISE_MAP[selectedSectorId] || SECTOR_EXPERTISE_MAP.tech;

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 border border-white/20 px-3 py-1 rounded-full bg-white/10 inline-flex items-center gap-1.5 shadow-xs">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-300" /> VERIFIED BY SECTOR
              </span>
              <span className="text-[10px] font-semibold text-teal-200 bg-teal-950/40 border border-teal-800/50 px-2.5 py-0.5 rounded-full">
                Verified Sector Leadership Discovery Hub
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Explore Verified Leaders Across Every Sector
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-2xl font-normal">
              Discover verified executive leaders, boardroom decision-makers, sector-specific innovation benchmarks, and verified corporate intelligence across all 50 sectors.
            </p>

            {/* 02. Search Bar */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search sector, verified leader, industry or expertise (e.g. Technology leaders, Green Hydrogen)..."
                  aria-label="Search sector, verified leader, industry or expertise"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("sector-nav-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-emerald-950 font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors shrink-0 shadow-sm"
              >
                Explore Sectors →
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("top-sector-leaders-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-white/30 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs"
              >
                View Top Leaders →
              </button>
            </div>

            {/* Live Counter Strip */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-white/15">
              {[
                { label: "Active Sectors", value: "50 GoI Sectors" },
                { label: "Verified CXOs", value: "2,840+ Profiles" },
                { label: "Mapped Industries", value: "1,350+ Verticals" },
                { label: "Verified Stories", value: "1,450+ Indexed" },
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

      {/* ── 03. SECTOR SELECTOR TABS BAR ─────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs" id="sector-nav-section">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-2 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
            {SECTORS_MASTER.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSectorId(sec.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedSectorId === sec.id
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800"
                }`}
              >
                <span>{sec.name}</span>
                <span className={`text-[8px] px-1.5 py-0.2 rounded font-mono ${
                  selectedSectorId === sec.id ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                }`}>
                  {sec.leaderCount.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 04. FEATURED SECTORS OVERVIEW GRID ──────────────────────────────── */}
        <section>
          <SectionTitle
            title="Featured Sectors Overview"
            subtitle="Explore high-activity sectors with verified CXO leaders, key industries, and daily news briefings."
            action={<Badge color="emerald">Core Verified Ecosystem</Badge>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTORS_MASTER.map((sec) => (
              <Card
                key={sec.id}
                className={`p-5 flex flex-col justify-between space-y-3 cursor-pointer transition-all ${
                  selectedSectorId === sec.id
                    ? "ring-2 ring-emerald-600 border-transparent shadow-md"
                    : "hover:border-emerald-300 hover:shadow-xs"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      {sec.tag}
                    </span>
                    <span className="text-[9px] text-gray-400 font-semibold">{sec.newsCount}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white leading-snug">{sec.name}</h3>
                  <div className="flex items-center gap-1">
                    <p className="text-[10px] text-gray-500">
                      Featured: <strong className="text-gray-800 dark:text-gray-200">{sec.featuredLeader}</strong> ({sec.featuredRole})
                    </p>
                    <CheckCircle className="h-3 w-3 text-emerald-600 shrink-0" />
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {sec.topIndustries.slice(0, 3).map((ind) => (
                      <span key={ind} className="text-[8px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 px-1.5 py-0.5 rounded font-medium">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedSectorId(sec.id)}
                    className="text-[10px] font-bold text-emerald-600 hover:underline"
                  >
                    View Sector Hub →
                  </button>
                  <span className="text-[9px] text-gray-400 font-mono">{sec.leaderCount}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 05. TOP LEADERS BY SECTOR & 06. SECTOR LEADERSHIP RANKINGS ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="top-sector-leaders-section">

          {/* 05. Top Leaders by Sector */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title={`Top Verified Leaders in ${currentSector.name}`}
                subtitle={`Top-ranked executives and founders driving ${currentSector.name.toLowerCase()} growth.`}
                action={<Trophy className="h-4 w-4 text-amber-500" />}
              />
              <div className="space-y-3">
                {topLeadersList.map((lead, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={lead.photo} alt={lead.name} className="h-11 w-11 rounded-xl object-cover border-2 border-emerald-500/40" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-bold text-xs text-amber-500">#{idx + 1}</span>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                          <CheckCircle className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span className="text-xs">{lead.flag}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-semibold">{lead.role} · {lead.company}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display font-bold text-xs text-emerald-600 block">{lead.score} / 100</span>
                      <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline">
                        Profile →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/en/news-poc/all-leaders" className="block text-center text-xs font-bold text-emerald-600 hover:underline pt-2">
                View All {currentSector.name} Leaders Directory →
              </Link>
            </Card>
          </div>

          {/* 06. Sector Leadership Rankings */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title={`${currentSector.name} Verified Rankings`}
                subtitle="Live computed benchmark based on verified platform influence & executive decisions."
                action={<Sparkles className="h-4 w-4 text-teal-600" />}
              />
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {rankingsList.map((item) => (
                  <div key={item.rank} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-gray-400 w-5 text-center">#{item.rank}</span>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-gray-900 dark:text-white">{item.name}</span>
                          <CheckCircle className="h-3 w-3 text-emerald-600 shrink-0" />
                        </div>
                        <p className="text-[9px] text-gray-500">{item.role} at {item.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-semibold text-emerald-600">{item.change}</span>
                      <span className="font-display font-bold text-teal-600">{item.score} pts</span>
                      <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline">
                        Profile →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ranking Methodology */}
              <div className="bg-teal-50/60 dark:bg-teal-950/20 p-3 rounded-xl border border-teal-200/60 dark:border-teal-900/40 text-[9px] text-gray-600 dark:text-gray-400 space-y-1">
                <span className="font-bold text-teal-600 uppercase tracking-wider block">Ranking Methodology:</span>
                <p>
                  Rankings reflect verified executive appointments, published news citations, peer recognition awards, and sector follow engagement across 50 sectors.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* ── 09. SECTOR LEADERSHIP NEWS ───────────────────────────────────────── */}
        <section>
          <SectionTitle
            title="Latest Verified Leadership News by Sector"
            subtitle="Executive appointments, strategic pivots, and corporate statements in the active sector."
            action={
              <Link href="/en/news-poc/leader-news/verified/news" className="text-xs font-bold text-emerald-600 hover:underline">
                View All Leadership News →
              </Link>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SECTOR_NEWS_FEED.map((news) => (
              <Card key={news.id} className="p-4 flex flex-col justify-between space-y-3 hover:shadow-md hover:border-emerald-300 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] text-gray-500">
                    <span className="font-bold text-emerald-600">{news.sector}</span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white leading-snug hover:text-emerald-600 cursor-pointer">
                    {news.headline}
                  </h3>
                  <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                    <span>{news.leader} ({news.company})</span>
                    <span>{news.readTime}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
                  <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline">
                    Read Story →
                  </Link>
                  <button onClick={() => alert("Story link copied to clipboard")} className="text-gray-400 hover:text-emerald-600" aria-label="Share story">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 10. LEADERSHIP MOVES & 11. ACHIEVEMENTS BY SECTOR ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 10. Leadership Moves */}
          <section>
            <Card className="p-5 h-full space-y-4">
              <SectionTitle title="Recent Leadership Moves by Sector" action={<Briefcase className="h-4 w-4 text-emerald-500" />} />
              <div className="space-y-2.5">
                {SECTOR_LEADERSHIP_MOVES.map((m, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{m.leader}</h4>
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                        <span className="text-[8px] bg-emerald-50 dark:bg-emerald-950 text-emerald-600 px-1.5 py-0.2 rounded font-bold">{m.sector}</span>
                      </div>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{m.move} — {m.company}</p>
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

          {/* 11. Achievements by Sector */}
          <section>
            <Card className="p-5 h-full space-y-4">
              <SectionTitle title="Sector Leadership Achievements" action={<Award className="h-4 w-4 text-amber-500" />} />
              <div className="space-y-2.5">
                {SECTOR_ACHIEVEMENTS.map((a, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{a.leader}</span>
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                      </div>
                      <Badge color="amber">{a.tag}</Badge>
                    </div>
                    <p className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">{a.milestone}</p>
                    <span className="text-[8px] text-gray-400 block pt-0.5">Sector: {a.sector}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 14. INDUSTRIES WITHIN SECTOR ────────────────────────────────────── */}
        <Card className="p-5 space-y-3">
          <SectionTitle title="Industries in this Sector" action={<Layers className="h-4 w-4 text-teal-500" />} />
          <p className="text-[10px] text-gray-500">Sub-industry divisions classified under {currentSector.name}.</p>
          <div className="space-y-1.5 pt-1">
            {currentSector.topIndustries.map((ind) => (
              <div key={ind} className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg text-[10px] font-semibold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span>{ind}</span>
                <Link href="/en/news-poc/all-industry" className="text-[8px] font-bold text-teal-600 hover:underline">Directory →</Link>
              </div>
            ))}
          </div>
        </Card>

        {/* ── 17. RECOMMENDED LEADERS ─────────────────────────────────────────── */}
        <Card className="p-5 space-y-3">
          <SectionTitle title="Recommended Verified Sector Leaders" action={<Badge color="teal">Personalized</Badge>} />
          <p className="text-[10px] text-gray-500">Leaders aligned with your followed sectors and verified reading activity.</p>
          <div className="space-y-2.5">
            {topLeadersList.slice(0, 2).map((l, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
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

        {/* ── 19. PREMIUM SECTOR INTELLIGENCE ─────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 text-white border-none space-y-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Unlock Verified Sector Intelligence</h2>
                <p className="text-[10px] text-white/70 mt-1">Upgrade your verified pro tier to track predictive executive movement signals and boardroom dossiers across all 50 sectors.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "FREE (REGISTERED)",
                  color: "border-white/20 bg-white/5",
                  items: ["Sector discovery & navigation", "Top leader preview (Top 3)", "Basic leadership news feed", "Role & expertise filters", "Follow sectors"],
                  locked: false
                },
                {
                  tier: "PRO (VERIFIED)",
                  color: "border-emerald-400 bg-emerald-950/40",
                  items: ["Complete sector leader rankings", "Sector AI briefings", "Executive movement radar", "Cross-sector comparison", "Custom sector alerts"],
                  locked: false
                },
                {
                  tier: "ENTERPRISE",
                  color: "border-amber-400 bg-amber-950/30",
                  items: ["Bespoke sector leadership research", "Executive advisory matching", "Competitor board tracking", "Dedicated sector analyst", "CRM workflow integration"],
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
              Unlock Enterprise Sector Intelligence →
            </Link>
          </Card>
        </section>

        {/* ── 20. FEATURED SECTOR / 21. PROMOTION ──────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Sector Leadership Promotion</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white mt-1">Boost Your Visibility in {currentSector.name}</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Position your executive profile, keynote insights, or corporate advisory practice directly in front of active sector decision makers.
                </p>
              </div>
              <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm">
                Promote Your Profile →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[10px] text-gray-700 dark:text-gray-300 font-medium">
              <div>✓ Featured Sector Leader</div>
              <div>✓ Verified Leader Badge</div>
              <div>✓ Featured Expertise Spotlight</div>
              <div>✓ Executive Advisory Inquiries</div>
            </div>
          </Card>
        </section>

        {/* ── 22. SECTOR LEADERSHIP NEWSLETTER ────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-emerald-800 to-teal-900 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-white/70" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">Sector Leadership Brief</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get curated leadership appointments, executive movements, and major investment stories from {currentSector.name} delivered to your inbox weekly.
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
                aria-label="Subscribe to Sector Leadership Brief"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-[9px] text-white/50 text-center">Zero spam · Unsubscribe anytime</p>
          </Card>
        </section>

      </div>
    </div>
  );
}

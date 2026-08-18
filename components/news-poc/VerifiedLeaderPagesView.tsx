"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart2,
  Bell,
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
  Zap,
} from "lucide-react";

// ─── Local UI Primitives ─────────────────────────────────────────────────────

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

function Badge({ children, color = "purple" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border border-indigo-200 dark:border-indigo-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.purple}`}>
      {children}
    </span>
  );
}

// ─── Verified Leaders Master Dataset ─────────────────────────────────────────

interface VerifiedLeader {
  id: string;
  name: string;
  role: string;
  company: string;
  sector: string;
  industry: string;
  country: string;
  countryFlag: string;
  expertise: string[];
  recognition: string;
  followers: string;
  score: number;
  badge: "FEATURED" | "TRENDING" | "RISING" | "RECOGNIZED" | "TO WATCH" | "VERIFIED";
  photo: string;
  verifiedDate: string;
  recentActivity: string;
  bioSnippet: string;
}

const VERIFIED_LEADERS_MASTER: VerifiedLeader[] = [
  {
    id: "vl-1",
    name: "Jensen Huang",
    role: "Founder & CEO",
    company: "NVIDIA Corporation",
    sector: "Technology & Deep Tech",
    industry: "Semiconductors & AI",
    country: "United States",
    countryFlag: "🇺🇸",
    expertise: ["Sovereign AI Compute", "Enterprise GPU Clusters", "Accelerated Computing"],
    recognition: "Time 100 Most Influential in AI 2026",
    followers: "128.4K",
    score: 98,
    badge: "FEATURED",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    verifiedDate: "Verified Jan 2026",
    recentActivity: "Announced $14B Sovereign AI Supercluster expansion in Mumbai",
    bioSnippet: "Pioneer in accelerated computing and AI infrastructure architectures."
  },
  {
    id: "vl-2",
    name: "N. Chandrasekaran",
    role: "Chairman",
    company: "Tata Sons",
    sector: "Technology & Deep Tech",
    industry: "Conglomerate & Tech",
    country: "India",
    countryFlag: "🇮🇳",
    expertise: ["Global Supply Chains", "Semiconductor OSAT", "Enterprise Cloud Transformation"],
    recognition: "Global Business Leadership Excellence Award 2026",
    followers: "94.2K",
    score: 98,
    badge: "FEATURED",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    verifiedDate: "Verified Feb 2026",
    recentActivity: "Commissioned Tata OSAT packaging facility in Dholera",
    bioSnippet: "Leading one of India's largest conglomerates across AI, aerospace, and energy."
  },
  {
    id: "vl-3",
    name: "Ananya Sengupta",
    role: "Managing Director, South Asia",
    company: "Standard Chartered",
    sector: "Financial Services",
    industry: "Cross-Border Treasury",
    country: "Singapore / India",
    countryFlag: "🇸🇬",
    expertise: ["Sustainable Trade Finance", "Digital Currency Rails", "ESG Liquidity"],
    recognition: "Asian Banker of the Year 2026",
    followers: "42.8K",
    score: 93,
    badge: "TRENDING",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
    verifiedDate: "Verified Mar 2026",
    recentActivity: "Deployed $1.5B Green Trade Window for Asian Exporters",
    bioSnippet: "Pioneering sustainable cross-border treasury instruments across APAC corridors."
  },
  {
    id: "vl-4",
    name: "Dr. Rajesh Grover",
    role: "Chief Technology Officer",
    company: "Adani Green Hydrogen",
    sector: "Energy & Infrastructure",
    industry: "Clean Tech & Renewables",
    country: "India",
    countryFlag: "🇮🇳",
    expertise: ["Alkaline Electrolysers", "Hybrid Solar-Wind Grids", "Green Ammonia"],
    recognition: "Renewable Energy Innovator 2026",
    followers: "31.5K",
    score: 91,
    badge: "RISING",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    verifiedDate: "Verified Apr 2026",
    recentActivity: "Scaled 3 GW electrolyser stack efficiency to 82% at Khavda",
    bioSnippet: "Leading deep-tech research into scalable green hydrogen production."
  },
  {
    id: "vl-5",
    name: "Dr. Elena Vance",
    role: "Board Member",
    company: "Biocon Biologics",
    sector: "Healthcare & Life Sciences",
    industry: "Biosimilars & Biopharma",
    country: "United States",
    countryFlag: "🇺🇸",
    expertise: ["FDA Regulatory Strategy", "Oncology Biosimilars", "Clinical Trial Governance"],
    recognition: "Global Pharma Governance Fellow",
    followers: "28.9K",
    score: 90,
    badge: "RECOGNIZED",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    verifiedDate: "Verified May 2026",
    recentActivity: "Secured US FDA nod for oncology biosimilar franchise",
    bioSnippet: "Specialist in biopharmaceutical clinical governance and international filings."
  },
  {
    id: "vl-6",
    name: "Elena Rostova",
    role: "Global Logistics Head",
    company: "Pacific Logistics Group",
    sector: "Logistics & Supply Chain",
    industry: "Multi-Modal Freight",
    country: "Germany / UAE",
    countryFlag: "🇩🇪",
    expertise: ["IMEC Transit Routes", "Automated Port Infrastructure", "Cold Chain Logistics"],
    recognition: "Supply Chain Excellence Citation 2026",
    followers: "24.1K",
    score: 89,
    badge: "TO WATCH",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    verifiedDate: "Verified June 2026",
    recentActivity: "Secured 30% multimodal berth capacity on IMEC transit route",
    bioSnippet: "Directing multi-modal container networks across Europe-Gulf-India trade lanes."
  }
];

export default function VerifiedLeaderPagesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedRoleCategory, setSelectedRoleCategory] = useState("All");
  const [rankingTab, setRankingTab] = useState<"Overall" | "Technology" | "Finance" | "Energy">("Overall");
  const [followedLeaders, setFollowedLeaders] = useState<Record<string, boolean>>({
    "vl-1": true,
    "vl-2": true,
  });
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(["vl-1", "vl-2"]);

  const toggleFollow = (id: string) => {
    setFollowedLeaders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompare = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id];
      }
      return [...prev, id];
    });
  };

  const filteredLeaders = VERIFIED_LEADERS_MASTER.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSector = selectedSector === "All" || l.sector.includes(selectedSector);
    const matchesRole =
      selectedRoleCategory === "All" ||
      (selectedRoleCategory === "CEOs" && (l.role.includes("CEO") || l.role.includes("Chief Executive"))) ||
      (selectedRoleCategory === "Chairpersons" && l.role.includes("Chairman")) ||
      (selectedRoleCategory === "Directors" && (l.role.includes("Director") || l.role.includes("Board"))) ||
      (selectedRoleCategory === "CTOs" && l.role.includes("CTO"));
    return matchesSearch && matchesSector && matchesRole;
  });

  const featuredLeaderOfWeek = VERIFIED_LEADERS_MASTER[1]; // N. Chandrasekaran
  const trendingLeaders = VERIFIED_LEADERS_MASTER.filter((l) => l.badge === "TRENDING" || l.badge === "FEATURED");
  const risingLeaders = VERIFIED_LEADERS_MASTER.filter((l) => l.badge === "RISING" || l.badge === "TO WATCH");
  const comparedLeaderObjects = VERIFIED_LEADERS_MASTER.filter((l) => selectedForCompare.includes(l.id));

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. PREMIUM HERO SECTION ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#15092e] via-[#1d0e40] to-slate-950 text-white relative overflow-hidden border-b border-purple-950/60">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#c084fc_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-950/60 inline-flex items-center gap-1.5 shadow-xs">
                <Crown className="h-3 w-3 text-amber-400" /> VERIFIED LEADERS • PRO
              </span>
              <span className="text-[10px] font-semibold text-purple-200 bg-purple-900/30 border border-purple-700/40 px-2.5 py-0.5 rounded-full">
                Discovery, Ranking & Recognition Hub
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Discover the Leaders Shaping Business
            </h1>

            <p className="text-base text-purple-100/85 leading-relaxed max-w-2xl font-normal">
              Explore verified leaders, executives, and decision-makers across industries, sectors, and markets.
            </p>

            {/* 02. Search & Filter Bar */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search leader, company, sector or expertise (e.g. Jensen Huang, AI, Green Hydrogen)..."
                  aria-label="Search leader, company, sector or expertise"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("featured-leaders-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Explore Verified Leaders →
              </button>
              <Link
                href="/en/news-poc/all-leaders"
                className="border border-purple-400/40 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs flex items-center gap-1.5"
              >
                <UserCheck className="h-4 w-4 text-purple-300" />
                <span>Find a Leader →</span>
              </Link>
            </div>

            {/* Live Metrics Counter */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-purple-800/30">
              {[
                { label: "Verified Leaders", value: "2,840+ CXOs" },
                { label: "Tracked Sectors", value: "50 GoI Sectors" },
                { label: "Global Coverage", value: "120+ Markets" },
                { label: "Annual Citations", value: "48,000+ News" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold tracking-tight text-white">{s.value}</div>
                  <div className="text-[10px] text-purple-300/70 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. ADVANCED SECTOR & ROLE FILTER BAR ────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sector:</span>
            {["All", "Technology", "Finance", "Energy", "Healthcare", "Logistics"].map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedSector === sec
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-purple-600"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 border-l border-gray-200 dark:border-gray-800 pl-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Role:</span>
            {["All", "CEOs", "Chairpersons", "Directors", "CTOs"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRoleCategory(role)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${
                  selectedRoleCategory === role
                    ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 17. LEADER OF THE WEEK (FEATURED SHOWCASE) ──────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-r from-[#1f0d3a] via-[#150a29] to-slate-900 text-white border border-purple-900/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[9px] font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-amber-400" /> LEADER OF THE WEEK SPOTLIGHT
              </span>
              <Badge color="purple">EDITOR'S CHOICE</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 flex items-center gap-4">
                <img
                  src={featuredLeaderOfWeek.photo}
                  alt={featuredLeaderOfWeek.name}
                  className="h-24 w-24 rounded-2xl object-cover border-2 border-purple-400 shadow-md"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-lg font-bold text-white">{featuredLeaderOfWeek.name}</h3>
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-xs text-purple-200 font-semibold">{featuredLeaderOfWeek.role}</p>
                  <p className="text-[11px] text-gray-400">{featuredLeaderOfWeek.company} · {featuredLeaderOfWeek.country}</p>
                </div>
              </div>

              <div className="md:col-span-8 space-y-3 border-t md:border-t-0 md:border-l border-white/10 md:pl-6 pt-4 md:pt-0">
                <div>
                  <span className="text-[9px] text-purple-300 uppercase font-semibold">Key 2026 Milestone:</span>
                  <p className="text-xs text-white/90 font-medium mt-0.5">{featuredLeaderOfWeek.recentActivity}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredLeaderOfWeek.expertise.map((exp) => (
                    <span key={exp} className="text-[9px] bg-white/10 text-purple-200 px-2 py-0.5 rounded border border-white/15">
                      {exp}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Link href="/eoi" className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors shadow-xs">
                    Explore Leader Profile →
                  </Link>
                  <span className="text-[10px] text-purple-300/80 font-mono">{featuredLeaderOfWeek.followers} Followers</span>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ── 03. FEATURED VERIFIED LEADERS (COMPACT DISCOVERY CARDS) ─────────── */}
        <section id="featured-leaders-section" className="space-y-4">
          <SectionTitle
            title="Featured Verified Leaders"
            subtitle="Curated executives with verified track records, published platform insights, and recognized industry authority."
            action={<span className="text-xs font-bold text-purple-600 font-mono">{filteredLeaders.length} Leaders</span>}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeaders.map((lead) => {
              const isFollowed = followedLeaders[lead.id];
              const isComparing = selectedForCompare.includes(lead.id);

              return (
                <Card key={lead.id} className="p-5 flex flex-col justify-between space-y-4 hover:border-purple-400 transition-all shadow-xs">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={lead.photo} alt={lead.name} className="h-12 w-12 rounded-xl object-cover border border-gray-200 dark:border-gray-800" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white leading-tight">{lead.name}</h3>
                            <CheckCircle className="h-3.5 w-3.5 text-purple-600" />
                          </div>
                          <p className="text-[10px] text-gray-500 font-semibold">{lead.role} · {lead.company}</p>
                          <span className="text-[9px] text-gray-400">{lead.sector} · {lead.countryFlag} {lead.country}</span>
                        </div>
                      </div>
                      <Badge color="purple">{lead.badge}</Badge>
                    </div>

                    <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {lead.recentActivity}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {lead.expertise.slice(0, 2).map((exp) => (
                        <span key={exp} className="text-[8px] bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded font-semibold">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFollow(lead.id)}
                        className={`text-[9px] px-2 py-1 rounded-lg font-bold transition-all ${
                          isFollowed
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                      >
                        {isFollowed ? "Following ✓" : "+ Follow"}
                      </button>
                      <button
                        onClick={() => toggleCompare(lead.id)}
                        className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                          isComparing
                            ? "bg-purple-50 text-purple-700 border-purple-300 font-bold"
                            : "text-gray-400 border-gray-200 hover:text-gray-600"
                        }`}
                      >
                        {isComparing ? "Comparing ✓" : "+ Compare"}
                      </button>
                    </div>

                    <Link href="/eoi" className="text-[10px] font-bold text-purple-600 hover:underline inline-flex items-center gap-0.5">
                      <span>View Leader</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── 04. TOP VERIFIED LEADERS & 05. VERIFIED LEADER RANKINGS ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 04. Top Verified Leaders */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="Top Verified Leaders"
                subtitle="Highest-rated executives based on verified platform engagement and published insights."
                action={<Trophy className="h-4 w-4 text-amber-500" />}
              />
              <div className="space-y-3">
                {VERIFIED_LEADERS_MASTER.slice(0, 4).map((lead, idx) => (
                  <div key={lead.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 hover:border-purple-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={lead.photo} alt={lead.name} className="h-11 w-11 rounded-xl object-cover border border-gray-200 dark:border-gray-800" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-bold text-xs text-amber-500">#{idx + 1}</span>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                          <CheckCircle className="h-3 w-3 text-purple-600" />
                        </div>
                        <p className="text-[10px] text-gray-500 font-semibold">{lead.role} · {lead.company}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display font-bold text-xs text-purple-600 block">{lead.score} pts</span>
                      <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline">
                        Profile →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 05. Verified Leader Rankings */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="Verified Leader Rankings"
                subtitle="Transparent platform ranking methodology computed from governance, citations, and peer reviews."
                action={<Badge color="purple">VERIFIED BENCHMARK</Badge>}
              />

              <div className="flex gap-1.5 border-b border-gray-100 dark:border-gray-800 pb-2">
                {(["Overall", "Technology", "Finance", "Energy"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setRankingTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      rankingTab === tab ? "bg-purple-600 text-white" : "text-gray-500 hover:text-purple-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                {VERIFIED_LEADERS_MASTER.map((lead, idx) => (
                  <div key={lead.id} className="py-2 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-gray-400 w-5 text-center">#{idx + 1}</span>
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">{lead.name}</span>
                        <p className="text-[9px] text-gray-500">{lead.company} · {lead.sector}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-purple-600">{lead.score}</span>
                      <Link href="/eoi" className="text-[9px] font-bold text-purple-600 hover:underline">
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50/60 dark:bg-purple-950/20 p-3 rounded-xl border border-purple-100 dark:border-purple-900/40 text-[9px] text-gray-600 dark:text-gray-400 space-y-1">
                <span className="font-bold text-purple-600 uppercase tracking-wider block">Transparent Methodology:</span>
                <p>
                  Rankings reflect verified corporate disclosures, audited board appointments, editorial coverage citations, and authentic B2B engagement signals.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* ── 06. TRENDING LEADERS & 07. RISING LEADERS ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 06. Trending Leaders */}
          <Card className="p-5 space-y-4">
            <SectionTitle
              title="Trending Leaders"
              subtitle="Executives experiencing high readership velocity and recent boardroom citations."
              action={<Flame className="h-4 w-4 text-orange-500" />}
            />
            <div className="space-y-3">
              {trendingLeaders.map((l) => (
                <div key={l.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={l.photo} alt={l.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{l.name}</h4>
                        <span className="text-[8px] bg-orange-50 text-orange-600 px-1.5 py-0.2 rounded font-bold">🔥 TRENDING</span>
                      </div>
                      <p className="text-[10px] text-gray-500">{l.role} at {l.company}</p>
                    </div>
                  </div>
                  <Link href="/eoi" className="text-[9px] font-bold text-purple-600 hover:underline shrink-0">
                    Explore →
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* 07. Rising Leaders */}
          <Card className="p-5 space-y-4">
            <SectionTitle
              title="Rising Leaders"
              subtitle="Emerging leaders showing rapid follower growth and new enterprise achievements."
              action={<TrendingUp className="h-4 w-4 text-emerald-500" />}
            />
            <div className="space-y-3">
              {risingLeaders.map((l) => (
                <div key={l.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={l.photo} alt={l.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{l.name}</h4>
                        <span className="text-[8px] bg-emerald-50 text-emerald-600 px-1.5 py-0.2 rounded font-bold">▲ RISING</span>
                      </div>
                      <p className="text-[10px] text-gray-500">{l.role} at {l.company}</p>
                    </div>
                  </div>
                  <Link href="/eoi" className="text-[9px] font-bold text-purple-600 hover:underline shrink-0">
                    Explore →
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── 14. EXPERTISE EXPLORER & 15. CATEGORY EXPLORER ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 14. Leadership Expertise Explorer */}
          <Card className="p-5 space-y-4">
            <SectionTitle title="Find Leaders by Expertise" action={<Target className="h-4 w-4 text-purple-600" />} />
            <p className="text-xs text-gray-500">Discover verified executives matching specialized technical and commercial competencies.</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Sovereign AI Compute",
                "Semiconductor Packaging",
                "Green Hydrogen Synthesis",
                "Cross-Border Trade Treasury",
                "FDA Regulatory Strategy",
                "IMEC Multi-Modal Routing",
                "Digital Payments & UPI",
                "Boardroom Risk Governance",
              ].map((exp) => (
                <button
                  key={exp}
                  onClick={() => setSearchQuery(exp)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/40 hover:bg-purple-100 transition-colors"
                >
                  {exp}
                </button>
              ))}
            </div>
          </Card>

          {/* 15. Leadership Category Explorer */}
          <Card className="p-5 space-y-4">
            <SectionTitle title="Explore Leadership Types" action={<Users className="h-4 w-4 text-indigo-500" />} />
            <p className="text-xs text-gray-500">Browse verified leadership profiles classified by corporate governance rank.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {[
                { label: "CEOs & Founders", count: "840 Profiles" },
                { label: "Chairpersons", count: "320 Profiles" },
                { label: "CTOs & R&D Heads", count: "510 Profiles" },
                { label: "Managing Directors", count: "480 Profiles" },
                { label: "Board Directors", count: "390 Profiles" },
                { label: "Enterprise Investors", count: "300 Profiles" },
              ].map((cat) => (
                <div key={cat.label} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-0.5">
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white">{cat.label}</h5>
                  <span className="text-[9px] text-gray-400 font-mono">{cat.count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── 21. COMPARE LEADERS (INTERACTIVE) ─────────────────────────────────── */}
        {comparedLeaderObjects.length > 1 && (
          <section className="space-y-4">
            <Card className="p-5 space-y-4 bg-gradient-to-br from-purple-50/40 via-white to-blue-50/40 dark:from-purple-950/20 dark:via-[#0f172a] dark:to-blue-950/20 border-purple-200 dark:border-purple-900">
              <SectionTitle
                title="Compare Verified Leaders"
                subtitle="Side-by-side benchmark across selected executive profiles."
                action={
                  <button onClick={() => setSelectedForCompare([])} className="text-xs font-bold text-purple-600 hover:underline">
                    Clear Comparison
                  </button>
                }
              />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 text-[10px] uppercase font-bold">
                      <th className="p-3">ATTRIBUTES</th>
                      {comparedLeaderObjects.map((l) => (
                        <th key={l.id} className="p-3 text-gray-900 dark:text-white font-bold">{l.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Designation & Company</td>
                      {comparedLeaderObjects.map((l) => (
                        <td key={l.id} className="p-3 font-semibold">{l.role} at {l.company}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Sector & Geography</td>
                      {comparedLeaderObjects.map((l) => (
                        <td key={l.id} className="p-3">{l.sector} ({l.countryFlag} {l.country})</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Influence Score</td>
                      {comparedLeaderObjects.map((l) => (
                        <td key={l.id} className="p-3 font-bold text-purple-600">{l.score} / 100</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Key Recognition</td>
                      {comparedLeaderObjects.map((l) => (
                        <td key={l.id} className="p-3 text-[10px] text-gray-700 dark:text-gray-300">{l.recognition}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        )}

        {/* ── 25. PREMIUM VISIBILITY & 26. BUSINESS OPPORTUNITIES ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 25. Premium Leader Visibility */}
          <Card className="p-6 bg-gradient-to-br from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900 space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Executive Promotion</span>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Increase Your Leadership Visibility</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-normal">
                Highlight your executive milestones, corporate vision, and keynote thought leadership in front of verified enterprise peers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-700 dark:text-gray-300 font-medium">
              <div>✓ Featured Leader Badge</div>
              <div>✓ Sector Spotlight Feature</div>
              <div>✓ Keynote Video Hosting</div>
              <div>✓ Executive Advisory Inquiries</div>
            </div>
            <Link href="/eoi" className="block text-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm">
              Explore Visibility Plans →
            </Link>
          </Card>

          {/* 26. Business Opportunities */}
          <Card className="p-6 bg-gradient-to-br from-purple-900 to-slate-900 text-white border-none space-y-4 shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-purple-300 uppercase tracking-widest">B2B Networking</span>
              <h3 className="text-base font-bold">Connect With Industry Leaders</h3>
              <p className="text-xs text-purple-100/80 leading-relaxed font-normal">
                Initiate corporate advisory inquiries, bilateral partnership discussions, or board speaking invitations directly with verified leaders.
              </p>
            </div>
            <Link href="/eoi" className="text-center bg-white text-purple-950 font-bold text-xs py-2.5 rounded-xl hover:bg-purple-50 transition-colors shadow-xs">
              Connect With a Leader →
            </Link>
          </Card>
        </div>

        {/* ── 28. ENTERPRISE LEADER DISCOVERY CTA ─────────────────────────────── */}
        <section>
          <Card className="p-8 bg-gradient-to-br from-slate-950 via-[#1e0e38] to-purple-950 text-white border border-purple-800/40 space-y-6 shadow-xl">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="max-w-2xl space-y-2">
                <span className="text-[9px] font-bold text-purple-300 uppercase tracking-widest">Enterprise Talent & Board Matching</span>
                <h2 className="text-2xl font-bold tracking-tight">Find the Right Leaders for Your Business</h2>
                <p className="text-xs text-purple-100/80 leading-relaxed">
                  Discover verified executives, decision-makers, and industry experts for strategic partnerships, research panels, consulting, and board appointments.
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/eoi" className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm">
                  Explore Enterprise →
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-4 py-3 rounded-xl transition-colors">
                  Talk to Sales →
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-purple-800/40 pt-4 text-xs font-medium text-purple-200">
              <div>✓ Executive Matchmaking</div>
              <div>✓ Custom Board Research</div>
              <div>✓ Direct Advisory Introductions</div>
              <div>✓ Dedicated Account Manager</div>
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
}

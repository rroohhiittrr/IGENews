"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Check,
  Sparkles,
  Plus,
  Lock,
  Mail,
  HelpCircle,
  Award,
  TrendingUp,
  SlidersHorizontal,
  Bookmark,
  Heart,
  ShieldCheck,
  ArrowRight,
  Building,
  ChevronRight,
  Star,
  Users,
  CheckCircle,
  MessageSquare,
  MapPin,
  Info,
  Crown,
  Share2,
  Globe
} from "lucide-react";
import { mockData } from "@/lib/mock/factory";

interface RankedReaderType {
  rank: number;
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  countryCode: string;
  location: string;
  bio: string;
  interests: string[];
  reason: string;
  score: number;
  isVerified: boolean;
  avatarInitials: string;
  bgGradient: string;
  badge: string;
}

// Organic Reader Contribution Standings Mock Database
const ORGANIC_RANKINGS: RankedReaderType[] = [
  {
    rank: 1,
    id: "rr-1",
    name: "Rajesh Sharma",
    role: "SME Executive",
    company: "Sharma Manufacturing",
    industry: "Manufacturing",
    countryCode: "IN",
    location: "Mumbai, India",
    bio: "Focused on industrial automation setups, bilateral supply chain exports, and factory floor telemetry.",
    interests: ["Global Trade", "AI", "Manufacturing"],
    reason: "Consistent, high-quality contributions to semiconductor equipment import tariff discussions.",
    score: 98.4,
    isVerified: true,
    avatarInitials: "RS",
    bgGradient: "from-blue-600 to-indigo-700",
    badge: "🏆 Community Contributor"
  },
  {
    rank: 2,
    id: "rr-2",
    name: "Elena Petrova",
    role: "Compliance Manager",
    company: "EuroBotanics GmbH",
    industry: "Healthcare",
    countryCode: "DE",
    location: "Frankfurt, Germany",
    bio: "Specializing in heavy metal limit audits, botanical import regulatory files, and global ESG certifications.",
    interests: ["Compliance", "Logistics", "Sustainability"],
    reason: "Valuable advice on Phytochemical Screening and compliance guides for raw imports.",
    score: 97.2,
    isVerified: true,
    avatarInitials: "EP",
    bgGradient: "from-emerald-600 to-teal-700",
    badge: "💡 Insightful Reader"
  },
  {
    rank: 3,
    id: "rr-3",
    name: "Kamil Al-Mansoori",
    role: "Tech Founder",
    company: "Mansoori AI Solutions",
    industry: "Technology",
    countryCode: "AE",
    location: "Dubai, UAE",
    bio: "Developing sovereign datacenter structures, generative code engines, and smart logistics telemetry modules.",
    interests: ["Startups", "AI", "Innovation"],
    reason: "Leading discussions on GCC CEPA software licensing duty corridors.",
    score: 96.5,
    isVerified: true,
    avatarInitials: "KA",
    bgGradient: "from-amber-600 to-orange-700",
    badge: "💬 Discussion Contributor"
  },
  {
    rank: 4,
    id: "rr-4",
    name: "Lin Xiao",
    role: "Finance Specialist",
    company: "Apex Wealth Advisors",
    industry: "Financial Services",
    countryCode: "SG",
    location: "Singapore City",
    bio: "Structuring digital cross-border trade settlements, escrow API rails, and bilateral compliance frameworks.",
    interests: ["Finance", "Trade Corridor", "Legal"],
    reason: "Outstanding support of escrow trade settlements in bilateral payment rails.",
    score: 95.8,
    isVerified: true,
    avatarInitials: "LX",
    bgGradient: "from-red-650 to-rose-750",
    badge: "📚 Knowledge Contributor"
  },
  {
    rank: 5,
    id: "rr-5",
    name: "Sarah Jenkins",
    role: "Operations Manager",
    company: "LogiCargo Transit",
    industry: "Logistics",
    countryCode: "US",
    location: "Houston, USA",
    bio: "Steering maritime freight integrations, port yard telemetry systems, and cross-border corridor routes.",
    interests: ["Supply Chain", "Global Trade", "Logistics"],
    reason: "Active participation in IMEC Multimodal corridor shipping and freight rate indexing.",
    score: 94.9,
    isVerified: false,
    avatarInitials: "SJ",
    bgGradient: "from-slate-700 to-slate-900",
    badge: "🌍 Global Reader"
  }
];

// Rising Contributors Mock Database
const RISING_CONTRIBUTORS = [
  {
    id: "rr-12",
    name: "Marcus Schmidt",
    role: "Clean Tech Researcher",
    company: "Munich Energy Lab",
    industry: "Energy",
    countryCode: "DE",
    bio: "Investigating green hydrogen electrolysis, electrolyzer test grids, and carbon capture telemetry panels.",
    reason: "Consistent recent community participation in energy transition discussions.",
    initials: "MS"
  },
  {
    id: "rr-16",
    name: "Dr. Ananya Varma",
    role: "Research Director",
    company: "Verma Biotech",
    industry: "Healthcare",
    countryCode: "IN",
    bio: "Conducting clinical trials, pharmaceutical formulations audits, and botanical raw material screening.",
    reason: "Growing community recognition for accepted compliance answers.",
    initials: "AV"
  }
];

// Interactive tooltips database for badges
const RECOGNITION_BADGES_INFO = [
  {
    title: "🏆 Community Contributor",
    description: "Regularly contributes high-quality, verified community content, starting valuable conversation threads."
  },
  {
    title: "💡 Insightful Reader",
    description: "Awarded to readers providing detailed perspectives on policy briefs and technical trade files."
  },
  {
    title: "💬 Discussion Contributor",
    description: "Consistently replies to complex questions on cross-border logistics and compliance codes."
  },
  {
    title: "🌍 Global Reader",
    description: "Given to readers participating across multiple international country corridor discussion boards."
  }
];

export default function ReaderTopCommunityView() {
  // --- STATE DECLARATIONS ---
  const [activeTab, setActiveTab] = useState<"all" | "tech" | "mfg" | "logistics" | "energy">("all");
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [hoveredBadgeTitle, setHoveredBadgeTitle] = useState<string | null>(null);

  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isReaderProOpen, setIsReaderProOpen] = useState(false);
  const [joinEmail, setJoinEmail] = useState("");
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const countriesList = mockData.countries();

  const getCountryFlag = (code: string): string => {
    const match = countriesList.find(c => c.code === code);
    return match ? match.flagEmoji : "🌐";
  };

  const getCountryName = (code: string): string => {
    const match = countriesList.find(c => c.code === code);
    return match ? match.name : "Global";
  };

  // Filter rankings according to tabs
  const getFilteredRankings = () => {
    if (activeTab === "all") return ORGANIC_RANKINGS;
    if (activeTab === "tech") return ORGANIC_RANKINGS.filter(r => r.industry === "Technology");
    if (activeTab === "mfg") return ORGANIC_RANKINGS.filter(r => r.industry === "Manufacturing");
    if (activeTab === "logistics") return ORGANIC_RANKINGS.filter(r => r.industry === "Logistics" || r.industry === "Logistics & Maritime");
    if (activeTab === "energy") return ORGANIC_RANKINGS.filter(r => r.industry === "Sustainable Energy" || r.industry === "Energy");
    return ORGANIC_RANKINGS;
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-16">
      
      {/* 01. TOP READERS HERO */}
      <section className="bg-gradient-to-br from-[#0a0d18] via-[#0f1428] to-[#06080e] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold bg-emerald-650 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
                READER COMMUNITY RECOGNITION
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Top Readers
              </h1>
              <p className="text-slate-350 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Discover readers making meaningful contributions, starting valuable conversations and helping shape the Reader Community.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#rankings-view"
                  className="bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-emerald-750 transition-all cursor-pointer shadow-md hover:shadow-emerald-500/20 flex items-center gap-1.5"
                >
                  Explore Top Readers <ArrowRight className="h-4.5 w-4.5" />
                </a>
                <button
                  onClick={() => setIsMethodologyOpen(true)}
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Info className="h-4 w-4 text-emerald-450" /> View Methodology
                </button>
                <button
                  onClick={() => setIsJoinOpen(true)}
                  className="bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Become a Recognized Reader
                </button>
              </div>
            </div>

            {/* Statistics (09) */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs shadow-xl">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Recognition Index Summary
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-2xl font-extrabold text-white">500+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Recognized Readers</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">20+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">50+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Industries</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">40+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Countries</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02. RECOGNITION CATEGORIES / QUICK FILTERS */}
      <section className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-805 sticky top-0 z-30 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6 flex items-center justify-between overflow-x-auto whitespace-nowrap">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All Standings" },
              { id: "tech", label: "Technology" },
              { id: "mfg", label: "Manufacturing" },
              { id: "logistics", label: "Logistics" },
              { id: "energy", label: "Energy" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white shadow-3xs"
                    : "bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-emerald-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsMethodologyOpen(true)}
            className="text-[10.5px] font-extrabold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer pl-4"
          >
            How Top Readers Are Recognized <Info className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main id="rankings-view" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* 03. OVERALL TOP CONTRIBUTORS */}
        <section className="space-y-4">
          <div className="border-b border-gray-205 dark:border-gray-850 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-emerald-650" /> Top Reader Contributors
            </h2>
            <span className="text-[10px] text-gray-400 font-medium">Rankings updated daily</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getFilteredRankings().slice(0, 3).map((rdr) => (
              <div
                key={rdr.id}
                className="bg-white dark:bg-[#0f172a] border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-650 dark:hover:border-emerald-500 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
              >
                {/* Large rank indicator */}
                <div className="absolute -top-3 -right-3 text-7xl font-black text-gray-100 dark:text-slate-800/20 select-none font-mono leading-none group-hover:text-emerald-100 dark:group-hover:text-emerald-950/20 transition-colors">
                  #{rdr.rank}
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${rdr.bgGradient} text-white font-extrabold flex items-center justify-center text-sm border border-white/10 shadow-3xs`}>
                      {rdr.avatarInitials}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-tight flex items-center gap-1">
                        {rdr.name}
                        {rdr.isVerified && <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                        {rdr.role} · {rdr.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold py-1 px-2.5 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-805">
                    <span className="text-gray-405">Contribution Index Score</span>
                    <span className="text-emerald-600">{rdr.score} Rating</span>
                  </div>

                  <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">
                    {rdr.bio}
                  </p>

                  <div className="p-3 bg-emerald-50/50 dark:bg-emerald-955/10 border border-emerald-105/50 rounded-xl space-y-1">
                    <h5 className="text-[9px] font-bold text-emerald-650 uppercase tracking-wide">Recognition Category</h5>
                    <p className="text-[10px] text-gray-655 dark:text-slate-300 leading-snug font-normal">"{rdr.reason}"</p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-150 dark:border-gray-855 flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                    {getCountryFlag(rdr.countryCode)} {getCountryName(rdr.countryCode)}
                  </span>
                  <Link
                    href={`/en/reader/username`}
                    className="text-[10px] font-extrabold text-emerald-650 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    View Public Profile <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 04. TOP READERS BY INDUSTRY */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building className="h-4.5 w-4.5 text-emerald-600" /> Top Readers by Industry
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Active sectors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { industry: "Technology", leaders: ORGANIC_RANKINGS.filter(r => r.interests.includes("AI")) },
              { industry: "Manufacturing", leaders: ORGANIC_RANKINGS.filter(r => r.interests.includes("Manufacturing")) },
              { industry: "Logistics", leaders: ORGANIC_RANKINGS.filter(r => r.interests.includes("Logistics")) }
            ].map((ind, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-850">
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">{ind.industry} Standings</h3>
                </div>

                <div className="space-y-3">
                  {ind.leaders.map((ldr, lIdx) => (
                    <div key={ldr.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-400 text-[10px]">#{lIdx + 1}</span>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1">
                            {ldr.name}
                            {ldr.isVerified && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                          </h4>
                          <p className="text-[9px] text-gray-405 mt-0.5">{ldr.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600">{ldr.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05. TOP READERS BY COUNTRY / REGION */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-emerald-600" /> Top Readers by Country & Region
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Bilateral trade corridors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { country: "India Corridor", code: "IN", leaders: ORGANIC_RANKINGS.filter(r => r.countryCode === "IN") },
              { country: "UAE Corridor", code: "AE", leaders: ORGANIC_RANKINGS.filter(r => r.countryCode === "AE") },
              { country: "Germany & Europe", code: "DE", leaders: ORGANIC_RANKINGS.filter(r => r.countryCode === "DE") }
            ].map((corridor, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-850">
                  <span className="text-xl">{getCountryFlag(corridor.code)}</span>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">{corridor.country}</h3>
                </div>

                <div className="space-y-3">
                  {corridor.leaders.map((ldr, lIdx) => (
                    <div key={ldr.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-gray-400 text-[10px]">#{lIdx + 1}</span>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1">
                            {ldr.name}
                            {ldr.isVerified && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                          </h4>
                          <p className="text-[9px] text-gray-405 mt-0.5">{ldr.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600">{ldr.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. RISING READERS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-650" /> Rising Readers
            </h2>
            <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-955/20 text-emerald-650 px-2 py-0.5 rounded">
              High activity momentum
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RISING_CONTRIBUTORS.map((ldr) => (
              <div key={ldr.id} className="p-4 rounded-xl border border-gray-155 dark:border-gray-850 bg-gray-55/35 dark:bg-gray-905/10 space-y-2 flex flex-col justify-between hover:border-emerald-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-emerald-650 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded uppercase">
                    ↑ RISING CONTRIBUTOR
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-605 font-bold flex items-center justify-center text-[9px]">
                      {ldr.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-none">
                        {ldr.name}
                      </h4>
                      <p className="text-[9.5px] text-gray-400 mt-1">{ldr.role} · {getCountryFlag(ldr.countryCode)}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-slate-350 leading-relaxed font-normal">{ldr.bio}</p>
                </div>
                <div className="pt-3 border-t border-gray-150/40 dark:border-gray-850 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-gray-400">Reason: {ldr.reason}</span>
                  <Link
                    href={`/en/reader/username`}
                    className="text-[9.5px] font-bold text-emerald-600 hover:text-emerald-500 transition-all"
                  >
                    View profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 07. RECOGNIZED COMMUNITY CONTRIBUTORS */}
        <section className="space-y-4">
          <div className="border-b border-gray-205 dark:border-gray-850 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-emerald-650" /> Recognized Community Contributors
            </h2>
            <span className="text-[9px] text-slate-400 font-semibold">Editorial selections</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ORGANIC_RANKINGS.slice(0, 4).map((ldr) => (
              <div
                key={ldr.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-emerald-550 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-650 font-bold flex items-center justify-center text-[9px]">
                      {ldr.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-none">{ldr.name}</h4>
                      <p className="text-[9px] text-gray-400 font-semibold mt-1">{ldr.role}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-slate-350 leading-relaxed font-normal">{ldr.bio}</p>
                </div>

                <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-850 flex justify-between items-center">
                  <span className="text-[9.5px] font-bold bg-amber-50 dark:bg-amber-955/20 text-amber-505 px-2 py-0.5 rounded border border-amber-250/20">
                    {ldr.badge}
                  </span>
                  <Link href={`/en/reader/username`} className="text-[9.5px] font-extrabold text-emerald-655 hover:underline">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 08. READER ACHIEVEMENTS & RECOGNITION BADGES (INTERACTIVE HOVER TOOLTIPS) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Achievements (08) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Info className="h-4.5 w-4.5 text-emerald-650" /> Reader Achievements Taxonomy
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-gray-655 dark:text-slate-350">
              <div className="space-y-1">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1"><Check className="h-4 w-4 text-emerald-600" /> 25+ Meaningful Discussions</h5>
                <p className="text-[10px] text-gray-500 leading-snug font-normal">Initiating threads focusing on international tariffs or Phytochemical exports.</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1"><Check className="h-4 w-4 text-emerald-600" /> 10+ Helpful Contributions</h5>
                <p className="text-[10px] text-gray-500 leading-snug font-normal">Replies logged as helpful solutions by other B2B platform subscribers.</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1"><Check className="h-4 w-4 text-emerald-600" /> Consistent Monthly Participation</h5>
                <p className="text-[10px] text-gray-500 leading-snug font-normal">Logging active comment replies across at least three country corridors.</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1"><Check className="h-4 w-4 text-emerald-600" /> Event Check-Ins Mapped</h5>
                <p className="text-[10px] text-gray-500 leading-snug font-normal">Attendance in verified AMA webinars and cross-border trade roundtables.</p>
              </div>
            </div>
          </div>

          {/* Recognition Badges Tooltips */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-emerald-600" /> Recognition Badges Index
            </h3>
            <p className="text-[10.5px] text-gray-400 leading-snug font-normal">
              Hover over each badge to discover the qualification rules:
            </p>

            <div className="grid grid-cols-2 gap-2 relative">
              {RECOGNITION_BADGES_INFO.map((b) => (
                <div
                  key={b.title}
                  onMouseEnter={() => setHoveredBadgeTitle(b.title)}
                  onMouseLeave={() => setHoveredBadgeTitle(null)}
                  className="p-2.5 rounded-lg border border-gray-205 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-emerald-500 text-center font-bold text-[11px] text-emerald-600 cursor-help transition-all relative"
                >
                  {b.title}

                  {hoveredBadgeTitle === b.title && (
                    <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-3 rounded-lg bg-slate-900 text-white border border-slate-750 text-[10px] text-left leading-normal font-normal shadow-lg">
                      {b.description}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 09. WHY THESE READERS STAND OUT */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex items-center gap-1.5">
            <Info className="h-4.5 w-4.5 text-emerald-600" />
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Why These Readers Stand Out</h3>
          </div>
          
          <div className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal space-y-2">
            <p>
              IGEN's recognition methodology measures active contribution quality. We look at the value of comments, verified professional titles, and collaborative engagement. 
            </p>
            <p>
              We firmly believe in organic credibility: paid listing enhancements never impact standing ratings. Promoted features are strictly isolated.
            </p>
          </div>
        </section>

        {/* 10. RECOMMENDED READERS TO FOLLOW */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 rounded-2xl p-5 shadow-3xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-emerald-600 fill-emerald-500 animate-pulse" /> Readers You May Want to Follow
            </h2>
            <span className="text-[9px] text-gray-400 font-medium">Matching interests</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "rr-3", name: "Kamil Al-Mansoori", reason: "Recommended because you track Technology.", role: "Tech Founder", flag: "🇦🇪", initials: "KA" },
              { id: "rr-4", name: "Lin Xiao", reason: "Recommended because you track Trade Corridor.", role: "Finance Specialist", flag: "🇸🇬", initials: "LX" },
              { id: "rr-5", name: "Sarah Jenkins", reason: "Recommended because you track Logistics.", role: "Operations Manager", flag: "🇺🇸", initials: "SJ" }
            ].map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-gray-155 dark:border-gray-850 bg-gray-55/40 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-emerald-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-emerald-650 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded uppercase">
                    {rec.reason}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center text-[9px]">
                      {rec.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {rec.name}
                      </h4>
                      <p className="text-[9.5px] text-gray-450 mt-0.5 leading-none">{rec.role} · {rec.flag}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <Link
                    href={`/en/reader/username`}
                    className="text-[9.5px] font-bold text-emerald-650 hover:text-emerald-500 transition-all"
                  >
                    Request Roundtable Callback →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. COMMUNITY CONTRIBUTION PREVIEW */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-805 rounded-2xl p-5 space-y-4">
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="h-4.5 w-4.5 text-emerald-650" /> What Top Readers Are Contributing
          </h3>
          
          <div className="space-y-3">
            {[
              { author: "Rajesh Sharma", thread: "Should India accelerate semiconductor equipment import tariff exemptions?", reply: "Exemptions are critical to offset tool packaging setup rates in Gujarat plants.", category: "Trade Policy" },
              { author: "Elena Petrova", thread: "Impact of new GoI Phytochemical export benchmarks on small scale units", reply: "Accreditation guidelines require testing setups matching EN 17025 codes.", category: "Compliance" }
            ].map((act, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-gray-150 dark:border-gray-850 flex justify-between items-center hover:border-emerald-500/50 bg-gray-50/50 dark:bg-gray-900/10">
                <div className="max-w-xs sm:max-w-md">
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded uppercase">
                    {act.category}
                  </span>
                  <h4 className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight mt-1">By {act.author} on "{act.thread}"</h4>
                  <p className="text-[10px] text-gray-550 dark:text-slate-350 italic mt-0.5">"{act.reply}"</p>
                </div>
                <Link
                  href={`/en/poc-v2/communities/reader/top`}
                  className="text-[9.5px] font-bold text-emerald-650 hover:underline cursor-pointer shrink-0 ml-4"
                >
                  View Discussion →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 12. HOW RECOGNITION WORKS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex items-center gap-1.5">
            <Info className="h-4.5 w-4.5 text-emerald-600" />
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">How Reader Recognition Works</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-medium text-gray-655 dark:text-slate-355">
            <div className="space-y-1 p-3 rounded-xl border border-gray-150 dark:border-gray-850">
              <span className="text-purple-600 font-extrabold">01</span>
              <h5 className="font-bold text-gray-900 dark:text-white">Participate</h5>
              <p className="text-[10px] text-gray-500 leading-snug font-normal">Join trade discussions and check-in to roundtables.</p>
            </div>
            <div className="space-y-1 p-3 rounded-xl border border-gray-150 dark:border-gray-850">
              <span className="text-purple-600 font-extrabold">02</span>
              <h5 className="font-bold text-gray-900 dark:text-white">Contribute</h5>
              <p className="text-[10px] text-gray-500 leading-snug font-normal">Share helpful perspectives on raw export compliance.</p>
            </div>
            <div className="space-y-1 p-3 rounded-xl border border-gray-150 dark:border-gray-850">
              <span className="text-purple-600 font-extrabold">03</span>
              <h5 className="font-bold text-gray-900 dark:text-white">Engage</h5>
              <p className="text-[10px] text-gray-500 leading-snug font-normal">Vote in community polls and resolve peer trade queries.</p>
            </div>
            <div className="space-y-1 p-3 rounded-xl border border-gray-150 dark:border-gray-850">
              <span className="text-purple-600 font-extrabold">04</span>
              <h5 className="font-bold text-gray-900 dark:text-white">Get Recognized</h5>
              <p className="text-[10px] text-gray-500 leading-snug font-normal">Verified inputs trigger editorial standings promotions.</p>
            </div>
            <div className="space-y-1 p-3 rounded-xl border border-gray-150 dark:border-gray-850">
              <span className="text-purple-600 font-extrabold">05</span>
              <h5 className="font-bold text-gray-900 dark:text-white">Build Reputation</h5>
              <p className="text-[10px] text-gray-500 leading-snug font-normal">Earn badges, get featured, and gain community trust.</p>
            </div>
          </div>
        </section>

        {/* 13 & 14. BECOME RECOGNIZED & READER PRO MONETIZATION CTAs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Become Recognized CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 md:col-span-2 bg-gradient-to-br from-white via-white to-emerald-500/5 dark:from-[#0f172a] dark:to-emerald-950/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-emerald-650 bg-emerald-50 dark:bg-emerald-950/45 px-2 py-0.5 rounded uppercase tracking-wider">Reader Indexing</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Become a Recognized Reader</h3>
              <p className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal">
                Participate in verified discussions, share compliance guides, and establish your reputation within the IGEN Reader Community.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setIsJoinOpen(true)}
                className="bg-emerald-650 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Join Reader Community
              </button>
              <button
                onClick={() => setIsJoinOpen(true)}
                className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 text-emerald-655 border border-emerald-200 dark:border-emerald-900/40 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Verify Reader Profile →
              </button>
            </div>
          </div>

          {/* Reader Pro CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-amber-500/5 dark:from-[#0f172a] dark:to-amber-955/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-amber-500 bg-amber-55/20 px-2 py-0.5 rounded uppercase tracking-wider">Reader Pro Package</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Unlock More Reader Community Experiences</h3>
              <p className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal">
                Get full access to premium closed-door discussions, exclusive webinars, and advanced corridor reports.
              </p>
            </div>
            <button
              onClick={() => setIsReaderProOpen(true)}
              className="w-full bg-amber-550 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center shadow-xs"
            >
              Upgrade to Reader Pro
            </button>
          </div>

        </section>

        {/* 15. NEWSLETTER / COMMUNITY BRIEF */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-800 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">weekly briefed highlights</span>
              <h3 className="font-display text-base md:text-xl font-bold text-white">Reader Community Brief</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-normal">
                Stay updated with reader recognition standings, active discussion highlights, and upcoming webinars delivered directly to your corporate inbox.
              </p>
            </div>

            <div className="lg:col-span-5 w-full">
              {newsletterSuccess ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1.5 animate-pulse">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                  <h4 className="text-xs font-bold text-white">Subscribed Successfully!</h4>
                  <p className="text-[10px] text-slate-300">You will receive first briefings in your inbox next Monday.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) setNewsletterSuccess(true);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your corporate email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder-slate-400 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-emerald-500 font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* --- METHODOLOGY MODAL --- */}
      {isMethodologyOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-emerald-655" /> Reader Standing Methodology
              </h4>
              <button
                onClick={() => setIsMethodologyOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-655 dark:text-slate-350 leading-relaxed font-normal max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              <p>
                Our algorithm processes four key parameters to rank active contributors in the Reader Index:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li><strong>Discussion Quality (30% weight)</strong>: Detailed, logical posts addressing tariffs, phytosanitary requirements, or CEPA software duties.</li>
                <li><strong>Helpful Peer Feedback (30% weight)</strong>: Votes logged as accepted answers on compliance and logistics threads.</li>
                <li><strong>Event & AMA Attendance (20% weight)</strong>: Active check-ins logged for webinars and roundtable discussions.</li>
                <li><strong>Corridor Diversity (20% weight)</strong>: Activity distributed across at least two separate bilateral country nodes.</li>
              </ul>
              <p className="border-t border-gray-100 dark:border-gray-850 pt-2.5 mt-2.5 text-gray-500 font-semibold">
                IGEN enforces a strict organic ranking trust rule: commercial sponsorships are never integrated into standings and are kept separate.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsMethodologyOpen(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- JOIN READER MODAL --- */}
      {isJoinOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="h-5 w-5 text-emerald-600" /> Apply for Reader Recognition
              </h4>
              <button
                onClick={() => {
                  setIsJoinOpen(false);
                  setJoinSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {joinSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Recognition Setup Logged</h5>
                <p className="text-[10px] text-gray-500 px-4 leading-normal font-normal">
                  Thank you! Your request has been logged. Our moderators will review your registered comment history to apply badge index upgrades.
                </p>
                <button
                  onClick={() => {
                    setIsJoinOpen(false);
                    setJoinSuccess(false);
                  }}
                  className="bg-gray-100 dark:bg-gray-855 text-gray-600 dark:text-slate-350 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (joinEmail.trim()) setJoinSuccess(true);
                }}
                className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Corporate / Reader Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. reader@company.com"
                    value={joinEmail}
                    onChange={(e) => setJoinEmail(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-emerald-550"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Sector of Interest</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Logistics & Supply Chain"
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-emerald-550"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsJoinOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-emerald-650 hover:bg-emerald-705 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- READER PRO MODAL --- */}
      {isReaderProOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-amber-500" /> Upgrade to Reader Pro
              </h4>
              <button
                onClick={() => {
                  setIsReaderProOpen(false);
                  setProSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-650 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {proSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Pro Upgrade Requested</h5>
                <p className="text-[10px] text-gray-505 px-4 font-normal leading-normal">
                  Thank you! We have logged your request for the Reader Pro upgrade. A billing assistant will contact your secretariat to activate features.
                </p>
                <button
                  onClick={() => {
                    setIsReaderProOpen(false);
                    setProSuccess(false);
                  }}
                  className="bg-gray-100 dark:bg-gray-855 text-gray-600 dark:text-slate-355 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355">
                <p className="text-[11px] leading-relaxed font-normal">
                  Get full access to premium closed-door discussions, exclusive webinars, and advanced corridor reports.
                </p>
                <div className="space-y-2 border border-amber-250/20 bg-amber-50/20 p-3.5 rounded-xl">
                  <h5 className="font-bold text-amber-650 uppercase tracking-wide text-[9px]">Pro Features</h5>
                  <ul className="list-disc pl-4 space-y-1 font-semibold text-[10.5px]">
                    <li>Full B2B directory networking callbacks</li>
                    <li>Access to premium compliance discussion briefs</li>
                    <li>Exclusive check-ins to invite-only webinars</li>
                  </ul>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReaderProOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setProSuccess(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
                  >
                    Confirm Pro Upgrade
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

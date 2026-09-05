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

interface RankedLeaderType {
  rank: number;
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  countryCode: string;
  location: string;
  bio: string;
  expertise: string[];
  reason: string;
  score: number;
  isVerified: boolean;
  avatarInitials: string;
  bgGradient: string;
  badge: string;
}

// Organic Leadership Rankings Mock Database
const ORGANIC_RANKINGS: RankedLeaderType[] = [
  // Technology
  {
    rank: 1,
    id: "rl-1",
    name: "Jensen Huang",
    role: "CEO",
    company: "NVIDIA",
    industry: "Technology",
    countryCode: "US",
    location: "California, USA",
    bio: "Pioneering GPU-accelerated computing, sovereign compute frameworks, and next-generation tensor core allocation networks.",
    expertise: ["AI Infrastructure", "Semiconductors", "Global Supply Chain"],
    reason: "Outstanding contribution to global AI hardware infrastructure allocation & sovereign compute standards.",
    score: 99.4,
    isVerified: true,
    avatarInitials: "JH",
    bgGradient: "from-green-600 to-emerald-700",
    badge: "Industry Leader"
  },
  {
    rank: 2,
    id: "rl-2",
    name: "Satya Nadella",
    role: "CEO",
    company: "Microsoft",
    industry: "Technology",
    countryCode: "US",
    location: "Washington, USA",
    bio: "Transforming enterprise cloud platforms with unified generative AI copilots and bilateral data protection guardrails.",
    expertise: ["Generative AI", "Cloud Infrastructure", "Enterprise Tech"],
    reason: "Pioneered scaled enterprise copilot deployment and structured data protection protocols.",
    score: 98.7,
    isVerified: true,
    avatarInitials: "SN",
    bgGradient: "from-blue-600 to-indigo-700",
    badge: "Industry Leader"
  },
  {
    rank: 3,
    id: "rl-3",
    name: "Sundar Pichai",
    role: "CEO",
    company: "Alphabet",
    industry: "Technology",
    countryCode: "US",
    location: "California, USA",
    bio: "Leading multimodal generative search models, global developer ecosystem scaling, and digital capability training.",
    expertise: ["Search Tech", "Multimodal Models", "Ecosystem Strategy"],
    reason: "Significant contribution to multimodal search indexing algorithms and public LLM integrations.",
    score: 97.9,
    isVerified: true,
    avatarInitials: "SP",
    bgGradient: "from-red-500 via-yellow-500 to-green-600",
    badge: "Industry Leader"
  },
  // Semiconductors
  {
    rank: 1,
    id: "rl-4",
    name: "Lisa Su",
    role: "CEO",
    company: "AMD",
    industry: "Semiconductors",
    countryCode: "US",
    location: "California, USA",
    bio: "Directing high-performance compute architectures, raw wafer assembly expansions, and bilateral logic chip testing.",
    expertise: ["Semiconductors", "Server Hardware", "Supply Resilience"],
    reason: "Exemplary operations strategy in diversifying semiconductor foundry partnerships and logic card packaging.",
    score: 98.9,
    isVerified: true,
    avatarInitials: "LS",
    bgGradient: "from-emerald-650 to-teal-805",
    badge: "Industry Leader"
  },
  {
    rank: 2,
    id: "rl-5",
    name: "N. Chandrasekaran",
    role: "Chairman",
    company: "Tata Sons",
    industry: "Semiconductors",
    countryCode: "IN",
    location: "Mumbai, India",
    bio: "Deploying high-volume semiconductor assembly facilities and packaging plants in Gujarat, establishing domestic presence.",
    expertise: ["Semiconductor Capex", "Electronics Mfg", "Conglomerate Strategy"],
    reason: "Initiated India's first high-volume commercial semiconductor wafer testing & assembly project.",
    score: 97.4,
    isVerified: true,
    avatarInitials: "NC",
    bgGradient: "from-blue-700 to-indigo-900",
    badge: "Regional Leader"
  },
  // Logistics
  {
    rank: 1,
    id: "rl-6",
    name: "Sultan bin Sulayem",
    role: "Group Chairman & CEO",
    company: "DP World",
    industry: "Logistics & Maritime",
    countryCode: "AE",
    location: "Dubai, UAE",
    bio: "Spearheading smart port terminal setups, logistics telemetry, and CEPA corridor freight corridors.",
    expertise: ["Port Logistics", "Maritime Freight", "CEPA Corridors"],
    reason: "Pioneered cross-border trade digitization and automated cargo telemetry within India-UAE shipping lanes.",
    score: 98.2,
    isVerified: true,
    avatarInitials: "SS",
    bgGradient: "from-amber-600 to-orange-700",
    badge: "Industry Leader"
  },
  {
    rank: 2,
    id: "rl-7",
    name: "Gautam Adani",
    role: "Chairman",
    company: "Adani Group",
    industry: "Logistics & Maritime",
    countryCode: "IN",
    location: "Ahmedabad, India",
    bio: "Expanding cross-border terminal infrastructures, logistics corridors, and regional bilateral energy grids.",
    expertise: ["Terminal Infrastructure", "Logistics Networks", "Bilateral Energy"],
    reason: "Successfully connected regional shipping lanes via container terminal developments.",
    score: 96.8,
    isVerified: true,
    avatarInitials: "GA",
    bgGradient: "from-indigo-650 to-blue-905",
    badge: "Regional Leader"
  },
  // Sustainable Energy
  {
    rank: 1,
    id: "rl-8",
    name: "Mukesh Ambani",
    role: "Chairman",
    company: "Reliance Industries",
    industry: "Sustainable Energy",
    countryCode: "IN",
    location: "Mumbai, India",
    bio: "Advancing raw gigafactory deployments for clean energy integration, PV modules, and green hydrogen frameworks.",
    expertise: ["Sustainable Energy", "Petrochemicals", "Industrial Expansion"],
    reason: "Fast-tracked electrolyzer gigafactory deployment to secure sub-$1 green hydrogen production costs.",
    score: 98.5,
    isVerified: true,
    avatarInitials: "MA",
    bgGradient: "from-blue-700 to-teal-700",
    badge: "Industry Leader"
  },
  {
    rank: 2,
    id: "rl-9",
    name: "Christian Bruch",
    role: "CEO",
    company: "Siemens Energy",
    industry: "Sustainable Energy",
    countryCode: "DE",
    location: "Munich, Germany",
    bio: "Spearheading clean energy grid integration, manufacturing lines, and green hydrogen supply networks.",
    expertise: ["Clean Energy", "Grid Engineering", "Green Hydrogen"],
    reason: "Implemented high-efficiency gas turbine systems and green hydrogen electrolysis integration blueprints.",
    score: 97.1,
    isVerified: true,
    avatarInitials: "CB",
    bgGradient: "from-cyan-600 to-teal-700",
    badge: "Regional Leader"
  }
];

// Rising Leaders Mock Database
const RISING_LEADERS = [
  {
    id: "rl-10",
    name: "Hana Al Rostamani",
    role: "Group CEO",
    company: "First Abu Dhabi Bank",
    industry: "Financial Services",
    countryCode: "AE",
    bio: "Spearheading digital trade finance, automated letters of credit, and bilateral currency liquidity hubs.",
    reason: "Rapidly expanding bilateral trade finance operations across Middle East-India trade corridors.",
    initials: "HR"
  },
  {
    id: "rl-11",
    name: "Piyush Gupta",
    role: "CEO",
    company: "DBS Group",
    industry: "Financial Services",
    countryCode: "SG",
    bio: "Transforming digital banking APIs, regional cross-border payment rails, and green finance certifications.",
    reason: "Strong integration of API-driven bilateral cross-border payments in Southeast Asia.",
    initials: "PG"
  },
  {
    id: "rl-12",
    name: "Helen Wong",
    role: "Group CEO",
    company: "OCBC Bank",
    industry: "Financial Services",
    countryCode: "SG",
    bio: "Directing commercial lending operations, regional currency liquidity, and sustainable ESG financing projects.",
    reason: "Outstanding support of transition finance frameworks for green supply chains.",
    initials: "HW"
  }
];

// Interactive tooltips database for badges
const RECOGNITION_BADGES_INFO = [
  {
    title: "Industry Leader",
    description: "Awarded to executives scoring above 98.0 in their respective sector classification, showing global operational footprint and strategic execution."
  },
  {
    title: "Regional Leader",
    description: "Recognizes leaders steering major infrastructure or policy corridors with high regional bilateral trade integration (e.g. India-Middle East)."
  },
  {
    title: "Rising Leader",
    description: "Identifies emerging C-suite leaders who show significant progress in platform-tracked community engagement, recent insights, or webinars."
  },
  {
    title: "Verified Leader",
    description: "Exclusively given to C-suite figures whose corporate identity, title, and corporate registry records are audited and verified by the IGEN secretariat."
  }
];

export default function LeaderTopCommunityView() {
  // --- STATE DECLARATIONS ---
  const [activeTab, setActiveTab] = useState<"all" | "tech" | "semi" | "logistics" | "energy">("all");
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [hoveredBadgeTitle, setHoveredBadgeTitle] = useState<string | null>(null);
  
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isExecutiveClubOpen, setIsExecutiveClubOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [clubSuccess, setClubSuccess] = useState(false);
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
    if (activeTab === "semi") return ORGANIC_RANKINGS.filter(r => r.industry === "Semiconductors");
    if (activeTab === "logistics") return ORGANIC_RANKINGS.filter(r => r.industry === "Logistics & Maritime");
    if (activeTab === "energy") return ORGANIC_RANKINGS.filter(r => r.industry === "Sustainable Energy");
    return ORGANIC_RANKINGS;
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-16">
      
      {/* 01. TOP LEADERS HERO */}
      <section className="bg-gradient-to-br from-[#0b0c15] via-[#101424] to-[#07080f] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-lg uppercase tracking-wider shadow-xs">
                LEADERSHIP RECOGNITION
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Top Leaders
              </h1>
              <p className="text-slate-350 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Discover leading, recognized and rising executives shaping industries, businesses and the global economy. Organically scored based on verified corporate achievements.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#rankings-view"
                  className="bg-purple-600 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-purple-750 transition-all cursor-pointer shadow-md hover:shadow-purple-500/20 flex items-center gap-1.5"
                >
                  Explore Top Leaders <ArrowRight className="h-4.5 w-4.5" />
                </a>
                <button
                  onClick={() => setIsMethodologyOpen(true)}
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Info className="h-4 w-4 text-purple-400" /> View Methodology
                </button>
                <button
                  onClick={() => setIsVerificationOpen(true)}
                  className="bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Get Recognized
                </button>
              </div>
            </div>

            {/* Trust/Ranking Statistics (09) */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs shadow-xl">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Recognition Index Summary
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-2xl font-extrabold text-white">1,000+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Recognized Leaders</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">50+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Sectors Tracked</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">80+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Corridor Nations</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">200+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Rising Leaders</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02. RANKING NAVIGATION / QUICK FILTERS */}
      <section className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-805 sticky top-0 z-30 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6 flex items-center justify-between overflow-x-auto whitespace-nowrap">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All Index standings" },
              { id: "tech", label: "Technology" },
              { id: "semi", label: "Semiconductors" },
              { id: "logistics", label: "Logistics & Maritime" },
              { id: "energy", label: "Sustainable Energy" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-3xs"
                    : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-purple-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsMethodologyOpen(true)}
            className="text-[10.5px] font-extrabold text-purple-600 hover:underline flex items-center gap-1 cursor-pointer pl-4"
          >
            How rankings work <Info className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main id="rankings-view" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* 03. TOP LEADERS BY INDUSTRY (#1, #2, #3 podium style showcase) */}
        <section className="space-y-4">
          <div className="border-b border-gray-205 dark:border-gray-850 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-purple-650" /> Sector Standings Index
            </h2>
            <span className="text-[10px] text-gray-400 font-medium">Rankings updated daily</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getFilteredRankings().slice(0, 3).map((ldr) => (
              <div
                key={ldr.id}
                className="bg-white dark:bg-[#0f172a] border-2 border-gray-200 dark:border-gray-800 hover:border-purple-600 dark:hover:border-purple-500 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all duration-300 relative group overflow-hidden"
              >
                {/* Large ranking indicator */}
                <div className="absolute -top-3 -right-3 text-7xl font-black text-gray-100 dark:text-slate-800/20 select-none font-mono leading-none group-hover:text-purple-100 dark:group-hover:text-purple-950/20 transition-colors">
                  #{ldr.rank}
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${ldr.bgGradient} text-white font-extrabold flex items-center justify-center text-sm border border-white/10 shadow-3xs`}>
                      {ldr.avatarInitials}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-tight flex items-center gap-1">
                        {ldr.name}
                        {ldr.isVerified && <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                        {ldr.role} · {ldr.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold py-1 px-2.5 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-805">
                    <span className="text-gray-405">Industry Standing Index</span>
                    <span className="text-purple-600">{ldr.score} Rating</span>
                  </div>

                  <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">
                    {ldr.bio}
                  </p>

                  <div className="p-3 bg-purple-50/50 dark:bg-purple-955/10 border border-purple-105/50 rounded-xl space-y-1">
                    <h5 className="text-[9px] font-bold text-purple-650 uppercase tracking-wide">Recognition Rationale</h5>
                    <p className="text-[10px] text-gray-600 dark:text-slate-300 leading-snug font-normal">"{ldr.reason}"</p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-150 dark:border-gray-855 flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                    {getCountryFlag(ldr.countryCode)} {getCountryName(ldr.countryCode)}
                  </span>
                  <Link
                    href={`/en/poc-v2/leader-news/pages/featured`}
                    className="text-[10px] font-extrabold text-purple-605 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    View Executive Profile <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 04. TOP LEADERS BY COUNTRY / REGION */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-purple-600" /> Corridor Standings Index
            </h2>
            <span className="text-[10px] text-gray-400 font-medium">Bilateral leaders</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { country: "India", code: "IN", leaders: ORGANIC_RANKINGS.filter(l => l.countryCode === "IN") },
              { country: "United States", code: "US", leaders: ORGANIC_RANKINGS.filter(l => l.countryCode === "US") },
              { country: "Germany & Europe", code: "DE", leaders: ORGANIC_RANKINGS.filter(l => l.countryCode === "DE") }
            ].map((corridor, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-gray-850">
                  <span className="text-xl">{getCountryFlag(corridor.code)}</span>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">{corridor.country} Corridor</h3>
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
                          <p className="text-[9px] text-gray-405 mt-0.5">{ldr.role} · {ldr.company}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-purple-600">{ldr.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05. RISING LEADERS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-4.5 w-4.5 text-purple-650" /> Rising Leaders
            </h2>
            <span className="text-[9px] font-bold bg-purple-50 dark:bg-purple-950/20 text-purple-650 px-2 py-0.5 rounded">
              High activity momentum
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RISING_LEADERS.map((ldr) => (
              <div key={ldr.id} className="p-4 rounded-xl border border-gray-155 dark:border-gray-855 bg-gray-55/30 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-purple-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-emerald-650 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded uppercase">
                    ↑ RISING LEADER
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center text-[9px]">
                      {ldr.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-none">
                        {ldr.name}
                      </h4>
                      <p className="text-[9.5px] text-gray-400 mt-1">{ldr.role} · {ldr.company} {getCountryFlag(ldr.countryCode)}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-slate-350 leading-relaxed font-normal">{ldr.bio}</p>
                </div>
                <div className="pt-3 border-t border-gray-150/40 dark:border-gray-850 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-gray-400">Reason: {ldr.reason}</span>
                  <Link
                    href={`/en/poc-v2/leader-news/pages/featured`}
                    className="text-[9.5px] font-bold text-purple-600 hover:text-purple-500 transition-all"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. FEATURED & RECOGNIZED LEADERS */}
        <section className="space-y-4">
          <div className="border-b border-gray-205 dark:border-gray-850 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-purple-650" /> Featured & Recognized Leaders
            </h2>
            <span className="text-[9px] text-slate-400 font-semibold">Editorial selections</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ORGANIC_RANKINGS.slice(0, 4).map((ldr) => (
              <div
                key={ldr.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-purple-550 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-650 font-bold flex items-center justify-center text-[9px]">
                      {ldr.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-none">{ldr.name}</h4>
                      <p className="text-[9px] text-gray-400 font-semibold mt-1">{ldr.role} · {ldr.company}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-slate-350 leading-relaxed font-normal">{ldr.bio}</p>
                </div>

                <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-850 flex justify-between items-center">
                  <span className="text-[9.5px] font-bold bg-amber-50 dark:bg-amber-955/25 text-amber-505 px-2 py-0.5 rounded border border-amber-250/20">
                    {ldr.badge}
                  </span>
                  <Link href={`/en/poc-v2/leader-news/pages/featured`} className="text-[9.5px] font-extrabold text-purple-600 hover:underline">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 07 & 08. INDUSTRY & REGIONAL SPOTLIGHT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Industry Spotlight */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building className="h-4.5 w-4.5 text-purple-650" /> Technology Leadership Spotlight
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 font-normal">
              Highlighting C-suite executives driving AI frameworks, logic card test platforms, and sovereign compute grids.
            </p>

            <div className="space-y-3">
              {ORGANIC_RANKINGS.filter(l => l.industry === "Technology" || l.industry === "Semiconductors").slice(0, 3).map((ldr) => (
                <div key={ldr.id} className="p-3 rounded-lg border border-gray-150 dark:border-gray-850 flex justify-between items-center hover:border-purple-500/50 bg-gray-50/50 dark:bg-gray-900/10">
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white">{ldr.name}</h4>
                    <p className="text-[9px] text-gray-400 font-semibold mt-0.5">{ldr.role} · {ldr.company}</p>
                  </div>
                  <Link
                    href={`/en/poc-v2/leader-news/pages/featured`}
                    className="text-[9.5px] font-bold text-purple-600 hover:underline cursor-pointer"
                  >
                    Spotlight Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Spotlight */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-purple-650" /> Bilateral Regional Spotlight
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 font-normal">
              Mapping infrastructure developers, monetary governors, and trade corridor ministers bridging India, UAE, and Germany.
            </p>

            <div className="space-y-3">
              {ORGANIC_RANKINGS.filter(l => l.countryCode === "IN" || l.countryCode === "AE").slice(0, 3).map((ldr) => (
                <div key={ldr.id} className="p-3 rounded-lg border border-gray-150 dark:border-gray-855 flex justify-between items-center hover:border-purple-500/50 bg-gray-50/50 dark:bg-gray-900/10">
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white">{ldr.name}</h4>
                    <p className="text-[9px] text-gray-400 font-semibold mt-0.5">{ldr.role} · {ldr.company}</p>
                  </div>
                  <Link
                    href={`/en/poc-v2/leader-news/pages/featured`}
                    className="text-[9.5px] font-bold text-purple-600 hover:underline cursor-pointer"
                  >
                    Spotlight Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 09. VERIFIED LEADERS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" /> Top Verified Leaders
            </h2>
            <span className="text-[9px] text-gray-400 font-semibold">Registry credential audits complete</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ORGANIC_RANKINGS.map((ldr) => (
              <div key={ldr.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-xl p-4 shadow-3xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-650 font-bold flex items-center justify-center text-[9px] border border-emerald-250/20">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-none">{ldr.name}</h4>
                    <p className="text-[9px] text-gray-405 mt-1 font-semibold">{ldr.company} · {getCountryFlag(ldr.countryCode)}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-bold text-gray-400 uppercase">
                    <span>Audit Status</span>
                    <span className="text-emerald-500">Completed 100%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 rounded overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. LEADERSHIP EXPERTISE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Leader Rankings by Expertise</h2>
            <span className="text-[10px] text-gray-400 font-semibold">Specific capabilities taxonomy</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "AI Infrastructure", "Semiconductors", "Global Supply Chain", "Generative AI", "Cloud Infrastructure",
              "Enterprise Tech", "Multimodal Models", "Ecosystem Strategy", "Server Hardware", "Supply Resilience",
              "Semiconductor Capex", "Electronics Mfg", "Conglomerate Strategy", "Port Logistics", "Maritime Freight",
              "CEPA Corridors", "Terminal Infrastructure", "Logistics Networks", "Bilateral Energy", "Sustainable Energy"
            ].map((exp) => (
              <button
                key={exp}
                onClick={() => {
                  alert(`Filtering directory by expertise: ${exp}`);
                }}
                className="px-3.5 py-2 text-[10px] font-bold bg-white border border-gray-205 dark:bg-[#0f172a] dark:border-gray-800 text-gray-700 dark:text-slate-300 rounded-xl transition-all hover:border-purple-500 cursor-pointer shadow-3xs"
              >
                #{exp}
              </button>
            ))}
          </div>
        </section>

        {/* 11 & 12. WHY LEADERS STAND OUT & BADGES TOOLTIPS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Why Leaders Stand Out (11) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Info className="h-4.5 w-4.5 text-purple-650" /> Why These Leaders Stand Out
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-gray-655 dark:text-slate-350">
              <div className="space-y-1">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1"><Check className="h-4 w-4 text-purple-605" /> Verified C-Suite Roles</h5>
                <p className="text-[10px] text-gray-500 leading-snug font-normal">Identities are checked against regulatory corporate registry listings.</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1"><Check className="h-4 w-4 text-purple-605" /> Active Corridor Policy</h5>
                <p className="text-[10px] text-gray-500 leading-snug font-normal">Executives steer international corridors (CEPA frameworks, IMEC).</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1"><Check className="h-4 w-4 text-purple-605" /> Community Contribution</h5>
                <p className="text-[10px] text-gray-500 leading-snug font-normal">Participation in AMA workshops, advisory boards, and roundtables.</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-1"><Check className="h-4 w-4 text-purple-605" /> Peer Recommendation</h5>
                <p className="text-[10px] text-gray-500 leading-snug font-normal">Receiving consistent callback connections from other C-suite members.</p>
              </div>
            </div>
          </div>

          {/* Interactive Badges Tooltips (12) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-purple-600" /> Leadership Recognition Badges
            </h3>
            <p className="text-[10.5px] text-gray-400 leading-snug font-normal">
              Hover over each badge category to understand its qualification criteria:
            </p>

            <div className="grid grid-cols-2 gap-2 relative">
              {RECOGNITION_BADGES_INFO.map((b) => (
                <div
                  key={b.title}
                  onMouseEnter={() => setHoveredBadgeTitle(b.title)}
                  onMouseLeave={() => setHoveredBadgeTitle(null)}
                  className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-purple-500 text-center font-bold text-xs text-purple-600 cursor-help transition-all relative"
                >
                  {b.title}

                  {/* Absolute Tooltip rendering */}
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

        {/* 13. RECOMMENDED LEADERS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 rounded-2xl p-5 shadow-3xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-purple-600 fill-purple-500 animate-pulse" /> Leaders You May Want to Know
            </h2>
            <span className="text-[9px] text-gray-400 font-medium">Personalized alignment</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "rl-3", name: "Sundar Pichai", reason: "Recommended because you follow Technology.", role: "CEO, Alphabet", flag: "🇺🇸", initials: "SP" },
              { id: "rl-5", name: "N. Chandrasekaran", reason: "Recommended because you follow Semiconductors.", role: "Chairman, Tata Sons", flag: "🇮🇳", initials: "NC" },
              { id: "rl-9", name: "Christian Bruch", reason: "Recommended because you follow Clean Energy.", role: "CEO, Siemens Energy", flag: "🇩🇪", initials: "CB" }
            ].map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-gray-155 dark:border-gray-850 bg-gray-55/40 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-purple-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-purple-650 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded uppercase">
                    {rec.reason}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center text-[9px]">
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
                    href={`/en/poc-v2/leader-news/pages/featured`}
                    className="text-[9.5px] font-bold text-purple-650 hover:text-purple-500 transition-all"
                  >
                    Request Roundtable Callback →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 14. RANKING METHODOLOGY SUMMARY */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex items-center gap-1.5">
            <Info className="h-4.5 w-4.5 text-purple-600" />
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">How Are Leaders Scored and Mapped?</h3>
          </div>
          
          <div className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal space-y-2">
            <p>
              Leader standing scores (rating from 1 to 100) are generated daily based on public registry validation, logged C-suite credentials, steering of bilateral trade corridors, and active peer-advisory contributions to roundtable forums.
            </p>
            <p>
              We enforce a strict <strong>Ranking Trust Principle</strong>: paid promotions and sponsorships never influence organic standings. All sponsored content is isolated and clearly labeled.
            </p>
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="text-purple-600 hover:underline font-bold text-[10.5px] flex items-center gap-1"
            >
              Read full methodology statement <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* 15 & 16. VISIBILITY & MEMBERSHIP MONETIZATION CTAs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Get Recognized Visibility CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 md:col-span-2 bg-gradient-to-br from-white via-white to-purple-500/5 dark:from-[#0f172a] dark:to-purple-950/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-purple-650 bg-purple-50 dark:bg-purple-950/45 px-2 py-0.5 rounded uppercase tracking-wider">Executive Recognition</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Could You Be One of the Top Leaders?</h3>
              <p className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal">
                Build your leadership profile, verify your corporate identity registry records, and strengthen your visibility across the global advisory networks.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setIsVerificationOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Get Recognized
              </button>
              <button
                onClick={() => setIsVerificationOpen(true)}
                className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 text-purple-650 border border-purple-200 dark:border-purple-900/40 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Verify Corporate Profile →
              </button>
            </div>
          </div>

          {/* Premium Membership CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-amber-500/5 dark:from-[#0f172a] dark:to-amber-955/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-955/20 px-2 py-0.5 rounded uppercase tracking-wider">Executive Club Exclusive</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Unlock More Executive Opportunities</h3>
              <p className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal">
                Gain access to private C-suite discussions, exclusive CEO AMAs, and premium bilateral research reports.
              </p>
            </div>
            <button
              onClick={() => setIsExecutiveClubOpen(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center shadow-xs"
            >
              Join Executive Club
            </button>
          </div>

        </section>

        {/* 17. SPONSORED LEADERSHIP CONTENT (CLEARLY SEGREGATED) */}
        <section className="bg-white dark:bg-[#0f172a] border-2 border-dashed border-gray-205 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-850 pb-2 flex justify-between items-center">
            <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <Crown className="h-4 w-4 text-amber-500" /> Sponsored Leadership
            </h3>
            <span className="text-[8.5px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded uppercase">
              Promoted Visibility Placement
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { company: "Cognizant Technology Solutions", title: "Heterogeneous Multi-Cloud Architectures Strategy Guide", sponsor: "Presented by Cognizant Research" },
              { company: "DP World Group Secretariat", title: "Middle East-India Maritime Corridor Telemetry Webinar Series", sponsor: "Presented by DP World Global" }
            ].map((spon, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-155 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/10 space-y-3 flex flex-col justify-between hover:border-amber-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8.5px] font-bold text-amber-650 bg-amber-50 dark:bg-amber-955/20 px-2 py-0.5 rounded uppercase">
                    {spon.sponsor}
                  </span>
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-white leading-snug">
                    {spon.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-semibold">{spon.company}</p>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <button
                    onClick={() => alert(`Opening sponsored link: ${spon.title}`)}
                    className="text-[9.5px] font-extrabold text-amber-600 hover:text-amber-500 transition-all cursor-pointer"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 18. LEADERSHIP NEWSLETTER */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-800 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest block">Weekly BRIEF Alerts</span>
              <h3 className="font-display text-base md:text-xl font-bold text-white">Subscribe to the Leadership Brief</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-normal">
                Stay updated with leading executives, leadership recognition, executive insights and upcoming events delivered straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5 w-full">
              {newsletterSuccess ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1.5 animate-pulse">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                  <h4 className="text-xs font-bold text-white">Subscribed Successfully!</h4>
                  <p className="text-[10px] text-slate-300 font-medium">Expect your first briefings next Monday morning.</p>
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
                    className="w-full bg-white/10 text-white placeholder-slate-405 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-purple-550 font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-750 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
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
                <Info className="h-4.5 w-4.5 text-purple-655" /> Leadership Standings Methodology
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
                Our algorithm processes four key parameters to rank global executives:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-medium">
                <li><strong>Verified Identity (30% weight)</strong>: Confirmed regulatory role, verified corporate email, and corporate registrar validation.</li>
                <li><strong>Bilateral Integration (30% weight)</strong>: Steering of cross-border corridors, shipping telemetries, or international currency liquidity hubs.</li>
                <li><strong>Peer Recommendations (20% weight)</strong>: Number of roundtables initiated and successfully closed callbacks logged within the network.</li>
                <li><strong>Community Engagement (20% weight)</strong>: Active insight briefs, Q&A hosting, and AMA session moderations.</li>
              </ul>
              <p className="border-t border-gray-100 dark:border-gray-850 pt-2.5 mt-2.5 text-gray-500 font-semibold">
                Note: In compliance with our transparent ranking trust principles, paid featured spots are isolated in the Sponsored panels and never influence organic indices.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsMethodologyOpen(false)}
                className="bg-purple-600 hover:bg-purple-750 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MONETIZATION MODAL: GET VERIFIED / RECOGNIZED --- */}
      {isVerificationOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-600" /> Apply for Leadership Verification
              </h4>
              <button
                onClick={() => {
                  setIsVerificationOpen(false);
                  setVerificationSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {verificationSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Audit Request Received</h5>
                <p className="text-[10px] text-gray-500 px-4">
                  We have successfully logged your verification request. An advisory coordinator from the IGEN secretariat will contact your office in 1-2 business days.
                </p>
                <button
                  onClick={() => {
                    setIsVerificationOpen(false);
                    setVerificationSuccess(false);
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
                  if (verificationEmail.trim()) setVerificationSuccess(true);
                }}
                className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Corporate email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. executive@company.com"
                    value={verificationEmail}
                    onChange={(e) => setVerificationEmail(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-850 p-2.5 focus:outline-hidden dark:text-white focus:border-purple-550"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Affiliation / Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CEO, DP World India"
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-850 p-2.5 focus:outline-hidden dark:text-white focus:border-purple-550"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsVerificationOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-purple-600 hover:bg-purple-750 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Apply for Verification
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- MONETIZATION MODAL: EXECUTIVE CLUB --- */}
      {isExecutiveClubOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-amber-500" /> Unlock Executive Club Membership
              </h4>
              <button
                onClick={() => {
                  setIsExecutiveClubOpen(false);
                  setClubSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {clubSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Club Registration Received</h5>
                <p className="text-[10px] text-gray-505 px-4 font-normal leading-normal">
                  Thank you! We have successfully registered your request to join the IGEN Executive Club. A membership director will reach out to schedule an onboarding call.
                </p>
                <button
                  onClick={() => {
                    setIsExecutiveClubOpen(false);
                    setClubSuccess(false);
                  }}
                  className="bg-gray-100 dark:bg-gray-855 text-gray-600 dark:text-slate-355 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355">
                <p className="text-[11px] leading-relaxed font-normal">
                  Join the exclusive network of CEOs, Founders, and Trade Ministers in private executive roundtables.
                </p>
                <div className="space-y-2 border border-amber-250/20 bg-amber-50/20 p-3.5 rounded-xl">
                  <h5 className="font-bold text-amber-650 uppercase tracking-wide text-[9px]">Club Benefits</h5>
                  <ul className="list-disc pl-4 space-y-1 font-semibold text-[10.5px]">
                    <li>Direct advisory connection capabilities</li>
                    <li>Private bilateral corridor events access</li>
                    <li>Premium trade intelligence brief alerts</li>
                  </ul>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsExecutiveClubOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setClubSuccess(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
                  >
                    Submit Club Application
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

"use client";

import React, { useState, useEffect } from "react";
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
  Globe,
  Building,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  Bookmark,
  Heart,
  Eye,
  CheckCircle,
  FileText,
  UserCheck,
  TrendingUp,
  BookmarkCheck,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  Users,
  Briefcase,
  Crown,
  Calendar,
  MessageSquare,
  MapPin,
  ChevronDown
} from "lucide-react";
import { mockData } from "@/lib/mock/factory";

interface ReaderCardType {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  countryCode: string;
  location: string;
  bio: string;
  interests: string[];
  isVerified: boolean;
  isFeatured: boolean;
  avatarInitials: string;
  bgGradient: string;
  activity: string;
}

// 20 High-Fidelity Professional B2B Readers Mock Database
const READERS_DATABASE: ReaderCardType[] = [
  {
    id: "rdr-1",
    name: "Rajesh Sharma",
    role: "SME Executive",
    company: "Sharma Manufacturing",
    industry: "Manufacturing",
    countryCode: "IN",
    location: "Mumbai, India",
    bio: "Focused on industrial automation setups, bilateral supply chain exports, and factory floor telemetry.",
    interests: ["Global Trade", "AI", "Manufacturing"],
    isVerified: true,
    isFeatured: true,
    avatarInitials: "RS",
    bgGradient: "from-blue-600 to-indigo-700",
    activity: "Contributed to 'Tariff Exemptions' thread"
  },
  {
    id: "rdr-2",
    name: "Elena Petrova",
    role: "Compliance Manager",
    company: "EuroBotanics GmbH",
    industry: "Healthcare",
    countryCode: "DE",
    location: "Frankfurt, Germany",
    bio: "Specializing in heavy metal limit audits, botanical import regulatory files, and global ESG certifications.",
    interests: ["Compliance", "Logistics", "Sustainability"],
    isVerified: true,
    isFeatured: true,
    avatarInitials: "EP",
    bgGradient: "from-emerald-600 to-teal-700",
    activity: "Replied to 'Phytochemical Benchmarks' thread"
  },
  {
    id: "rdr-3",
    name: "Kamil Al-Mansoori",
    role: "Tech Founder",
    company: "Mansoori AI Solutions",
    industry: "Technology",
    countryCode: "AE",
    location: "Dubai, UAE",
    bio: "Developing sovereign datacenter structures, generative code engines, and smart logistics telemetry modules.",
    interests: ["Startups", "AI", "Innovation"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "KA",
    bgGradient: "from-amber-600 to-orange-700",
    activity: "Started: 'CEPA Tech Corridors' thread"
  },
  {
    id: "rdr-4",
    name: "Lin Xiao",
    role: "Finance Specialist",
    company: "Apex Wealth Advisors",
    industry: "Financial Services",
    countryCode: "SG",
    location: "Singapore City",
    bio: "Structuring digital cross-border trade settlements, escrow API rails, and bilateral compliance frameworks.",
    interests: ["Finance", "Trade Corridor", "Legal"],
    isVerified: true,
    isFeatured: true,
    avatarInitials: "LX",
    bgGradient: "from-red-600 to-rose-700",
    activity: "Participated in 'Escrow Settlements'"
  },
  {
    id: "rdr-5",
    name: "Sarah Jenkins",
    role: "Operations Manager",
    company: "LogiCargo Transit",
    industry: "Logistics",
    countryCode: "US",
    location: "Houston, USA",
    bio: "Steering maritime freight integrations, port yard telemetry systems, and cross-border corridor routes.",
    interests: ["Supply Chain", "Global Trade", "Logistics"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "SJ",
    bgGradient: "from-slate-600 to-slate-800",
    activity: "Contributed to 'IMEC Corridor Shipping'"
  },
  {
    id: "rdr-6",
    name: "Amit Patel",
    role: "IT Director",
    company: "Patel Tech Consultants",
    industry: "Technology",
    countryCode: "IN",
    location: "Bengaluru, India",
    bio: "Coordinating hybrid cloud architectures, enterprise API integrations, and developer sandbox setups.",
    interests: ["Software", "AI", "Cloud"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "AP",
    bgGradient: "from-indigo-600 to-purple-700",
    activity: "Active in 'Sovereign AI Training' boards"
  },
  {
    id: "rdr-7",
    name: "Fatima Al-Suwaidi",
    role: "Investment Officer",
    company: "Abu Dhabi Capital",
    industry: "Financial Services",
    countryCode: "AE",
    location: "Abu Dhabi, UAE",
    bio: "Managing commercial capital allocations, real estate portfolios, and sustainable bilateral ESG funds.",
    interests: ["ESG Compliance", "Capital", "Finance"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "FA",
    bgGradient: "from-purple-650 to-pink-750",
    activity: "Replied to 'ESG Lending Criteria'"
  },
  {
    id: "rdr-8",
    name: "Hans Meier",
    role: "Engineering Lead",
    company: "Bavaria Robotics",
    industry: "Manufacturing",
    countryCode: "DE",
    location: "Munich, Germany",
    bio: "Developing predictive controller hardware, factory automation engines, and assembly lines telemetry.",
    interests: ["Robotics", "Automotive", "Innovation"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "HM",
    bgGradient: "from-cyan-600 to-teal-800",
    activity: "Voted in 'Factory Automation Poll'"
  },
  {
    id: "rdr-9",
    name: "David Chen",
    role: "Product Owner",
    company: "Silicon Devices Inc",
    industry: "Consumer Electronics",
    countryCode: "US",
    location: "San Jose, USA",
    bio: "Overseeing device assembly operations, circular manufacturing lanes, and bilateral logic hardware tests.",
    interests: ["Hardware", "Innovation", "Strategy"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "DC",
    bgGradient: "from-rose-600 to-orange-700",
    activity: "Replied to 'Wafer Testing Assembly'"
  },
  {
    id: "rdr-10",
    name: "Tan Min Han",
    role: "Supply Chain Lead",
    company: "OceanFreight SG",
    industry: "Logistics",
    countryCode: "SG",
    location: "Singapore City",
    bio: "Steering maritime port telemetry setups, freight rate indexing, and custom brokerage integrations.",
    interests: ["Freight", "Telemetry", "Logistics"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "TM",
    bgGradient: "from-teal-600 to-emerald-805",
    activity: "Active in 'Bilateral Roaming Ro/Ro'"
  },
  {
    id: "rdr-11",
    name: "Priya Nair",
    role: "HR Consultant",
    company: "Nair & Associates",
    industry: "Services",
    countryCode: "IN",
    location: "Chennai, India",
    bio: "Advising on executive talent management, remote worker policies, and bilateral organizational strategies.",
    interests: ["Leadership", "Talent", "Strategy"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "PN",
    bgGradient: "from-blue-600 to-sky-700",
    activity: "Discussion: 'Remote Engineering Teams'"
  },
  {
    id: "rdr-12",
    name: "Marcus Schmidt",
    role: "Clean Tech Researcher",
    company: "Munich Energy Lab",
    industry: "Energy",
    countryCode: "DE",
    location: "Munich, Germany",
    bio: "Investigating green hydrogen electrolysis, electrolyzer test grids, and carbon capture telemetry panels.",
    interests: ["Clean Energy", "Sustainability", "Innovation"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "MS",
    bgGradient: "from-emerald-700 to-teal-850",
    activity: "Insight: 'Green Electrolyzer Tariffs'"
  },
  {
    id: "rdr-13",
    name: "Tariq Mahmood",
    role: "Procurement Manager",
    company: "Gulf Textile Mills",
    industry: "Manufacturing",
    countryCode: "AE",
    location: "Sharjah, UAE",
    bio: "Managing raw cotton yarn sourcing, supply agreements, and CEPA import duty compliance structures.",
    interests: ["Sourcing", "Global Trade", "Logistics"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "TM",
    bgGradient: "from-amber-600 to-yellow-700",
    activity: "Replied to 'Yarn Duty Exemptions'"
  },
  {
    id: "rdr-14",
    name: "Chloe Vance",
    role: "Marketing Director",
    company: "Vance Retail Group",
    industry: "Services",
    countryCode: "US",
    location: "New York, USA",
    bio: "Analyzing consumer transaction analytics, B2B digital storefront channels, and market research.",
    interests: ["Analytics", "Innovation", "Strategy"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "CV",
    bgGradient: "from-pink-600 to-purple-800",
    activity: "Voted in 'B2B Commerce Trends Poll'"
  },
  {
    id: "rdr-15",
    name: "Rachel Lim",
    role: "Legal Advisor",
    company: "Lim & Partners",
    industry: "Services",
    countryCode: "SG",
    location: "Singapore City",
    bio: "Drafting cross-border arbitration files, intellectual property agreements, and bilateral tariff compliance.",
    interests: ["Compliance", "Legal", "Global Trade"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "RL",
    bgGradient: "from-indigo-650 to-indigo-950",
    activity: "Started: 'IP Arbitration Forums' thread"
  },
  {
    id: "rdr-16",
    name: "Dr. Ananya Varma",
    role: "Research Director",
    company: "Verma Biotech",
    industry: "Healthcare",
    countryCode: "IN",
    location: "New Delhi, India",
    bio: "Conducting clinical trials, pharmaceutical formulations audits, and botanical raw material screening.",
    interests: ["Compliance", "Healthcare", "Innovation"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "AV",
    bgGradient: "from-blue-650 to-teal-700",
    activity: "Contributed to 'Phytochemical Screening'"
  },
  {
    id: "rdr-17",
    name: "Dieter Weber",
    role: "Production Manager",
    company: "Bavarian Motor Works",
    industry: "Manufacturing",
    countryCode: "DE",
    location: "Munich, Germany",
    bio: "Optimizing EV assembly workflows, high-performance battery packs testing, and raw component circularity.",
    interests: ["Automotive", "Logistics", "Manufacturing"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "DW",
    bgGradient: "from-slate-700 to-slate-900",
    activity: "Replied to 'EV Battery Supply Circularity'"
  },
  {
    id: "rdr-18",
    name: "Zayed Al-Neyadi",
    role: "Sovereign Fund Advisor",
    company: "Mubadala",
    industry: "Financial Services",
    countryCode: "AE",
    location: "Abu Dhabi, UAE",
    bio: "Evaluating venture capital pipelines, software startup accelerators, and bilateral tech investments.",
    interests: ["Startups", "Finance", "Innovation"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "ZN",
    bgGradient: "from-amber-600 to-purple-800",
    activity: "Replied to 'Middleseast Venture Capital'"
  },
  {
    id: "rdr-19",
    name: "Kenneth Tan",
    role: "B2B Sales VP",
    company: "Global Logistics SG",
    industry: "Logistics",
    countryCode: "SG",
    location: "Singapore City",
    bio: "Spearheading regional freight sales, bilateral cargo logistics, and container terminal corridors.",
    interests: ["Global Trade", "Logistics", "Strategy"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "KT",
    bgGradient: "from-red-650 to-indigo-850",
    activity: "Active in 'Bilateral Agreement Corridors'"
  },
  {
    id: "rdr-20",
    name: "Jennifer Adams",
    role: "Policy Analyst",
    company: "Global Trade Watch",
    industry: "Services",
    countryCode: "US",
    location: "Washington, USA",
    bio: "Drafting WTO policy briefs, tariff exemption files, and compliance guides for raw imports.",
    interests: ["Global Trade", "Compliance", "Legal"],
    isVerified: false,
    isFeatured: false,
    avatarInitials: "JA",
    bgGradient: "from-slate-600 to-blue-800",
    activity: "Contributed to 'WTO tariff files'"
  }
];

export default function ReaderAllCommunityView() {
  // --- STATE DECLARATIONS ---
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<"all" | "active">("all");
  const [sortOption, setSortOption] = useState<"relevance" | "joined" | "active" | "alpha">("relevance");
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Simulated followed & connected readers via LocalStorage
  const [followedReaders, setFollowedReaders] = useState<string[]>([]);
  const [connectedReaders, setConnectedReaders] = useState<string[]>([]);
  const [followedThreads, setFollowedThreads] = useState<string[]>([]);

  // UI Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileSubmitted, setProfileSubmitted] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Sourced taxonomies
  const sectorsList = mockData.sectors();
  const countriesList = mockData.countries();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Load local storage states
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFollows = localStorage.getItem("igen_v2_followed_readers");
      const storedConnections = localStorage.getItem("igen_v2_connected_readers");
      const storedThreads = localStorage.getItem("igen_v2_followed_threads");
      if (storedFollows) setFollowedReaders(JSON.parse(storedFollows));
      if (storedConnections) setConnectedReaders(JSON.parse(storedConnections));
      if (storedThreads) setFollowedThreads(JSON.parse(storedThreads));
    }
  }, []);

  // --- ACTIONS ---
  const handleFollowReader = (id: string) => {
    let updated: string[];
    if (followedReaders.includes(id)) {
      updated = followedReaders.filter(rId => rId !== id);
    } else {
      updated = [...followedReaders, id];
    }
    setFollowedReaders(updated);
    localStorage.setItem("igen_v2_followed_readers", JSON.stringify(updated));
  };

  const handleConnectReader = (id: string) => {
    let updated: string[];
    if (connectedReaders.includes(id)) {
      updated = connectedReaders.filter(rId => rId !== id);
    } else {
      updated = [...connectedReaders, id];
    }
    setConnectedReaders(updated);
    localStorage.setItem("igen_v2_connected_readers", JSON.stringify(updated));
  };

  const handleFollowThread = (id: string) => {
    let updated: string[];
    if (followedThreads.includes(id)) {
      updated = followedThreads.filter(tId => tId !== id);
    } else {
      updated = [...followedThreads, id];
    }
    setFollowedThreads(updated);
    localStorage.setItem("igen_v2_followed_threads", JSON.stringify(updated));
  };

  const handleClearFilters = () => {
    setSelectedIndustries([]);
    setSelectedCountries([]);
    setSelectedInterests([]);
    setSelectedActivity("all");
    setSearchQuery("");
    setSortOption("relevance");
    setPage(1);
  };

  const getCountryFlag = (code: string): string => {
    const match = countriesList.find(c => c.code === code);
    return match ? match.flagEmoji : "🌐";
  };

  // --- FILTER & SEARCH PIPELINE ---
  const filteredReaders = READERS_DATABASE.filter((rdr) => {
    // 1. Text Search matching name, company, role, industry, interests
    if (debouncedSearchQuery) {
      const q = debouncedSearchQuery.toLowerCase();
      const matchText =
        rdr.name.toLowerCase().includes(q) ||
        rdr.company.toLowerCase().includes(q) ||
        rdr.role.toLowerCase().includes(q) ||
        rdr.industry.toLowerCase().includes(q) ||
        rdr.interests.some(i => i.toLowerCase().includes(q));
      if (!matchText) return false;
    }

    // 2. Industry filter
    if (selectedIndustries.length > 0) {
      const matchIndustry = selectedIndustries.some(ind =>
        rdr.industry.toLowerCase().includes(ind.toLowerCase())
      );
      if (!matchIndustry) return false;
    }

    // 3. Country filter
    if (selectedCountries.length > 0) {
      if (!selectedCountries.includes(rdr.countryCode)) return false;
    }

    // 4. Interests filter
    if (selectedInterests.length > 0) {
      const matchInterest = selectedInterests.some(int => rdr.interests.includes(int));
      if (!matchInterest) return false;
    }

    // 5. Activity filter
    if (selectedActivity === "active") {
      if (rdr.activity.length === 0) return false;
    }

    return true;
  });

  // Sorting
  const sortedReaders = [...filteredReaders].sort((a, b) => {
    if (sortOption === "alpha") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "active") {
      return b.activity.length - a.activity.length;
    }
    // Default relevance: featured first, then verified, then alphabetical
    const scoreA = (a.isFeatured ? 2 : 0) + (a.isVerified ? 1 : 0);
    const scoreB = (b.isFeatured ? 2 : 0) + (b.isVerified ? 1 : 0);
    return scoreB - scoreA;
  });

  // Paginated slices
  const totalResults = sortedReaders.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const paginatedReaders = sortedReaders.slice((page - 1) * pageSize, page * pageSize);

  const isAnyFilterActive =
    selectedIndustries.length > 0 ||
    selectedCountries.length > 0 ||
    selectedInterests.length > 0 ||
    selectedActivity === "active" ||
    searchQuery !== "";

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-16">
      
      {/* 01. ALL READERS HERO */}
      <section className="bg-gradient-to-br from-[#0a0d17] via-[#101426] to-[#06080e] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold bg-emerald-650 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
                READER COMMUNITY
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Discover All Readers
              </h1>
              <p className="text-slate-330 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Explore readers across industries, countries and interests and connect with people participating in the Reader Community.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#directory-browser"
                  className="bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-emerald-700 transition-all cursor-pointer shadow-md hover:shadow-emerald-500/25 flex items-center gap-1.5"
                >
                  Explore Readers <ArrowRight className="h-4.5 w-4.5" />
                </a>
                <a
                  href="#interests-browser"
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Find Readers by Interest
                </a>
                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Join Reader Community
                </button>
              </div>
            </div>

            {/* Statistics (07) */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs shadow-xl">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Community Index Summary
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-2xl font-extrabold text-white">10,000+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Active Readers</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">50+</div>
                  <div className="text-[10px] text-slate-400 font-medium font-semibold">Industries</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">90+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">100+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Community Topics</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02. PRIMARY READER SEARCH BAR */}
      <section className="mx-auto max-w-7xl px-4 -mt-6 lg:px-6 relative z-20">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search readers, interests, industries or countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:outline-hidden dark:text-white font-medium"
            />
            <Search className="absolute left-4 top-4 h-4.5 w-4.5 text-gray-400" />
          </div>
          {isAnyFilterActive && (
            <button
              onClick={handleClearFilters}
              className="w-full md:w-auto shrink-0 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-650 dark:text-red-400 border border-red-250 dark:border-red-900/30 text-xs font-bold px-4 py-3.5 rounded-xl transition-all cursor-pointer text-center"
            >
              Clear Search
            </button>
          )}
        </div>
      </section>

      {/* MAIN WORKSPACE */}
      <main id="directory-browser" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* 04. BROWSE READERS BY INDUSTRY */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Readers by Industry</h2>
            <span className="text-[10px] text-gray-400">Filter reader list directly</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {sectorsList.slice(0, 10).map((sec) => {
              const isActive = selectedIndustries.includes(sec.name);
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedIndustries(selectedIndustries.filter(name => name !== sec.name));
                    } else {
                      setSelectedIndustries([...selectedIndustries, sec.name]);
                    }
                  }}
                  className={`px-4.5 py-2.5 text-[11px] font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-650"
                      : "bg-white dark:bg-[#0f172a] border-gray-205 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-emerald-500"
                  }`}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 05. BROWSE READERS BY COUNTRY / REGION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Readers by Country Corridor</h2>
            <span className="text-[10px] text-gray-400">Networking corridors mapped</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {countriesList.map((c) => {
              const isActive = selectedCountries.includes(c.code);
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    if (isActive) {
                      setSelectedCountries(selectedCountries.filter(code => code !== c.code));
                    } else {
                      setSelectedCountries([...selectedCountries, c.code]);
                    }
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-650"
                      : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-805 text-gray-700 dark:text-gray-300 hover:border-emerald-500"
                  }`}
                >
                  <span>{c.flagEmoji}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 06. BROWSE READERS BY INTEREST */}
        <section id="interests-browser" className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Readers by Interest Topics</h2>
            <span className="text-[10px] text-gray-400">Shared B2B capabilities</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Global Trade", "AI", "Manufacturing", "Compliance", "Logistics", "Sustainability", "Startups",
              "Innovation", "Finance", "Trade Corridor", "Legal", "Supply Chain", "Software", "Cloud",
              "ESG Compliance", "Capital", "Robotics", "Automotive", "Hardware", "Strategy", "Telemetry"
            ].map((interest) => {
              const isActive = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => {
                    if (isActive) {
                      setSelectedInterests(selectedInterests.filter(i => i !== interest));
                    } else {
                      setSelectedInterests([...selectedInterests, interest]);
                    }
                    setPage(1);
                  }}
                  className={`px-3 py-2 text-[10.5px] font-bold rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-650"
                      : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 text-gray-705 dark:text-gray-300 hover:border-emerald-500"
                  }`}
                >
                  #{interest}
                </button>
              );
            })}
          </div>
        </section>

        {/* 07. FEATURED / ACTIVE READERS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-205 dark:border-gray-850 pb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-emerald-600 animate-pulse" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Featured & Active Readers</h2>
            </div>
            <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-650 px-2.5 py-0.5 rounded border border-emerald-250/20">
              Community Contributors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {READERS_DATABASE.filter(r => r.isFeatured).map((rdr) => {
              const following = followedReaders.includes(rdr.id);
              const connected = connectedReaders.includes(rdr.id);

              return (
                <div
                  key={rdr.id}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-emerald-500 transition-all duration-300 relative group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${rdr.bgGradient} text-white font-extrabold flex items-center justify-center text-xs border border-white/10 shadow-3xs`}>
                        {rdr.avatarInitials}
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-tight flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
                          {rdr.name}
                          {rdr.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                        </h3>
                        <p className="text-[9px] text-gray-400 font-semibold leading-none mt-0.5">
                          {rdr.role} · {rdr.company}
                        </p>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-605 dark:text-gray-350 leading-relaxed font-normal">
                      {rdr.bio}
                    </p>

                    <div className="flex items-center gap-1 flex-wrap">
                      {rdr.interests.map(int => (
                        <span key={int} className="text-[8px] font-bold bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleFollowReader(rdr.id)}
                      className={`text-[9.5px] font-bold py-1.5 px-3 rounded-lg border transition-all cursor-pointer flex-1 text-center ${
                        following
                          ? "bg-emerald-600 text-white border-emerald-550 shadow-3xs"
                          : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-805 text-gray-500 hover:text-emerald-600"
                      }`}
                    >
                      {following ? "Following ✓" : "Follow"}
                    </button>
                    <button
                      onClick={() => handleConnectReader(rdr.id)}
                      className={`text-[9.5px] font-bold py-1.5 px-3 rounded-lg border transition-all cursor-pointer flex-1 text-center ${
                        connected
                          ? "bg-emerald-600 text-white border-emerald-555 shadow-3xs"
                          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-805 text-gray-606 dark:text-gray-300 hover:text-emerald-500"
                      }`}
                    >
                      {connected ? "Connected ✓" : "Connect"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 08. MAIN ALL READERS DIRECTORY */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="hidden lg:block lg:col-span-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-emerald-650" /> Directory Filters
              </span>
              {isAnyFilterActive && (
                <button onClick={handleClearFilters} className="text-[10px] font-bold text-red-655 hover:underline">Reset</button>
              )}
            </div>

            {/* Filter by Sector */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Industry Sector</label>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                {sectorsList.map((sec) => {
                  const isChecked = selectedIndustries.includes(sec.name);
                  return (
                    <label key={sec.id} className="flex items-center gap-2 cursor-pointer text-xs text-gray-655 dark:text-gray-300 hover:text-emerald-650">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedIndustries(selectedIndustries.filter(n => n !== sec.name));
                          } else {
                            setSelectedIndustries([...selectedIndustries, sec.name]);
                          }
                          setPage(1);
                        }}
                        className="rounded border-gray-305 dark:border-gray-800 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{sec.icon} {sec.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter by Country */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Country Corridor</label>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                {countriesList.map((cnt) => {
                  const isChecked = selectedCountries.includes(cnt.code);
                  return (
                    <label key={cnt.code} className="flex items-center gap-2 cursor-pointer text-xs text-gray-655 dark:text-gray-300 hover:text-emerald-650">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedCountries(selectedCountries.filter(code => code !== cnt.code));
                          } else {
                            setSelectedCountries([...selectedCountries, cnt.code]);
                          }
                          setPage(1);
                        }}
                        className="rounded border-gray-305 dark:border-gray-800 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{cnt.flagEmoji} {cnt.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter by Activity */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Community Status</label>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-655 dark:text-gray-300 hover:text-emerald-650">
                  <input
                    type="radio"
                    checked={selectedActivity === "all"}
                    onChange={() => {
                      setSelectedActivity("all");
                      setPage(1);
                    }}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>All Readers</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-655 dark:text-gray-300 hover:text-emerald-650">
                  <input
                    type="radio"
                    checked={selectedActivity === "active"}
                    onChange={() => {
                      setSelectedActivity("active");
                      setPage(1);
                    }}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Recently Active Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* DIRECTORY DISPLAY (9/12) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Header Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-xl p-4 shadow-3xs">
              <div className="space-y-0.5">
                <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">All Readers Directory</h3>
                <p className="text-[10px] text-gray-400">
                  {totalResults} Readers matching active parameters
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-xs w-full sm:w-auto">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Sort:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => {
                      setSortOption(e.target.value as any);
                      setPage(1);
                    }}
                    className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 px-3 py-1.5 text-xs text-gray-705 dark:text-gray-300 focus:outline-hidden focus:border-emerald-500 w-full sm:w-auto font-medium"
                  >
                    <option value="relevance">Featured & Verified</option>
                    <option value="active">Recently Active</option>
                    <option value="alpha">Alphabetical (A-Z)</option>
                  </select>
                </div>

                <div className="hidden sm:flex border border-gray-205 dark:border-gray-800 rounded-lg p-0.5 bg-gray-55 dark:bg-gray-900 shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1 rounded cursor-pointer ${viewMode === "grid" ? "bg-white dark:bg-gray-800 text-emerald-600 shadow-2xs" : "text-gray-405"}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 rounded cursor-pointer ${viewMode === "list" ? "bg-white dark:bg-gray-800 text-emerald-600 shadow-2xs" : "text-gray-405"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            {paginatedReaders.length === 0 ? (
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center space-y-3">
                <Search className="h-10 w-10 text-gray-400 mx-auto" />
                <h4 className="text-sm font-bold dark:text-white">No readers match your search or filters</h4>
                <p className="text-xs text-gray-500 font-medium">Try modifying your query or resetting active filter tags.</p>
                {isAnyFilterActive && (
                  <button onClick={handleClearFilters} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer">
                    Clear Active Filters
                  </button>
                )}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedReaders.map((rdr) => {
                  const following = followedReaders.includes(rdr.id);
                  const connected = connectedReaders.includes(rdr.id);

                  return (
                    <div
                      key={rdr.id}
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-3xs hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2.5">
                            <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${rdr.bgGradient} text-white font-extrabold flex items-center justify-center text-xs border border-white/10`}>
                              {rdr.avatarInitials}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5 group-hover:text-emerald-600 transition-colors">
                                {rdr.name}
                                {rdr.isVerified && (
                                  <span className="text-[8.5px] bg-emerald-500/10 text-emerald-650 border border-emerald-500/20 px-1 py-0.2 rounded font-bold">
                                    ✓ Verified
                                  </span>
                                )}
                              </h4>
                              <p className="text-[9px] text-gray-400 font-semibold leading-none mt-0.5">
                                {rdr.role} · {rdr.company} · {getCountryFlag(rdr.countryCode)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">
                          {rdr.bio}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {rdr.interests.map(int => (
                            <span key={int} className="text-[8px] font-bold bg-emerald-50/50 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                              {int}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between gap-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleFollowReader(rdr.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              following
                                ? "bg-emerald-600 text-white border-emerald-500"
                                : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-emerald-600"
                            }`}
                            title="Follow Reader"
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleConnectReader(rdr.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              connected
                                ? "bg-emerald-600 text-white border-emerald-500"
                                : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-emerald-500"
                            }`}
                            title="Connect with Reader"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/en/reader/username`}
                          className="text-[10px] font-extrabold text-emerald-600 hover:text-emerald-505 transition-colors flex items-center gap-0.5 bg-emerald-50/50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-105/50 cursor-pointer"
                        >
                          View Profile <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW MODE */
              <div className="space-y-3">
                {paginatedReaders.map((rdr) => {
                  const following = followedReaders.includes(rdr.id);
                  const connected = connectedReaders.includes(rdr.id);

                  return (
                    <div
                      key={rdr.id}
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-xl p-4 shadow-3xs hover:border-emerald-500 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3 max-w-xl">
                        <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${rdr.bgGradient} text-white font-extrabold flex items-center justify-center text-xs border border-white/10 shrink-0`}>
                          {rdr.avatarInitials}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5 flex-wrap">
                            {rdr.name}
                            {rdr.isVerified && (
                              <span className="text-[8.5px] bg-emerald-500/10 text-emerald-655 border border-emerald-500/20 px-1 py-0.2 rounded font-bold">
                                ✓ Verified
                              </span>
                            )}
                          </h4>
                          <p className="text-[9.5px] text-gray-405 font-medium leading-none">
                            {rdr.role} · {rdr.company} · {getCountryFlag(rdr.countryCode)}
                          </p>
                          <p className="text-[11px] text-gray-600 dark:text-gray-350 line-clamp-1">
                            {rdr.bio}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-gray-105 dark:border-gray-855 shrink-0">
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleFollowReader(rdr.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              following ? "bg-emerald-600 text-white border-emerald-500" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500"
                            }`}
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleConnectReader(rdr.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              connected ? "bg-emerald-600 text-white border-emerald-500" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500"
                            }`}
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/en/reader/username`}
                          className="text-[10px] font-extrabold text-emerald-650 hover:text-emerald-550 transition-colors flex items-center gap-0.5 bg-emerald-55/50 dark:bg-emerald-955/20 px-3.5 py-2 rounded-lg border border-emerald-105/50 cursor-pointer"
                        >
                          View Profile <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-205 dark:border-gray-850">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[11px] font-bold px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:border-emerald-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Previous
                </button>
                
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      className={`h-8 w-8 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                        page === pNum
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-655 dark:text-gray-400 hover:border-emerald-500"
                      }`}
                    >
                      {pNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[11px] font-bold px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:border-emerald-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

          </div>
        </section>

        {/* 09. READERS WITH SIMILAR INTERESTS (Logged-in personalization mockup) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-emerald-600 fill-emerald-500" /> Readers With Similar Interests
            </h2>
            <span className="text-[9px] text-gray-400 font-medium">Curated matchmaking</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "rdr-1", name: "Rajesh Sharma", reason: "Recommended because you track Manufacturing.", role: "SME Executive", flag: "🇮🇳", initials: "RS" },
              { id: "rdr-5", name: "Sarah Jenkins", reason: "Recommended because you track Supply Chain.", role: "Operations Manager", flag: "🇺🇸", initials: "SJ" },
              { id: "rdr-12", name: "Marcus Schmidt", reason: "Recommended because you track Clean Energy.", role: "Tech Researcher", flag: "🇩🇪", initials: "MS" }
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
                      <p className="text-[9.5px] text-gray-450 leading-none">{rec.role} · {rec.flag}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <button
                    onClick={() => handleConnectReader(rec.id)}
                    className="text-[9.5px] font-extrabold text-emerald-600 hover:text-emerald-500 transition-all cursor-pointer"
                  >
                    Send Callback Connection →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. ACTIVE COMMUNITY READERS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-4.5 w-4.5 text-emerald-600" /> Active in the Reader Community
            </h2>
            <span className="text-[9px] text-gray-400 font-semibold">Participating recently</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "rdr-1", name: "Rajesh Sharma", activeIn: "Should India accelerate semiconductor tariff exemptions?", insight: "Exemptions direct boost to local electronics packaging lines.", sector: "Manufacturing" },
              { id: "rdr-2", name: "Elena Petrova", activeIn: "Impact of GoI Phytochemical export benchmarks on SMEs", insight: "Heavy metal limits require strict laboratory accreditation setups.", sector: "Healthcare" },
              { id: "rdr-3", name: "Kamil Al-Mansoori", activeIn: "Navigating GCC CEPA Corridors: Opportunities", insight: "Direct zero-duty logic channels for software licensing operations.", sector: "Technology" }
            ].map((act) => (
              <div key={act.id} className="p-4 rounded-xl border border-gray-155 dark:border-gray-855 bg-gray-55/40 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-emerald-550 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-emerald-650 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded uppercase">
                    Discussion Thread: {act.activeIn}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    {act.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-semibold">{act.sector}</p>
                  <p className="text-[11px] text-gray-550 dark:text-slate-350 leading-relaxed font-normal">Recent Reply: "{act.insight}"</p>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <Link
                    href={`/en/poc-v2/communities/reader/top`}
                    className="text-[9.5px] font-bold text-emerald-600 hover:text-emerald-500 transition-all"
                  >
                    View Discussion →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. RECOMMENDED READERS (PERSONALIZATION BASED ON MATCHING INTERESTS) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-emerald-600 fill-emerald-500" /> Readers You May Want to Know
            </h2>
            <span className="text-[9px] text-gray-400 font-semibold">Recommended because you track Global Trade</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "rdr-15", name: "Rachel Lim", role: "Legal Advisor", flag: "🇸🇬", initials: "RL", bio: "Drafting cross-border arbitration files and IP tariff agreements." },
              { id: "rdr-19", name: "Kenneth Tan", role: "B2B Sales VP", flag: "🇸🇬", initials: "KT", bio: "Spearheading regional freight sales and bilateral logistics corridors." },
              { id: "rdr-20", name: "Jennifer Adams", role: "Policy Analyst", flag: "🇺🇸", initials: "JA", bio: "Drafting WTO policy briefs and raw imports tariff guides." }
            ].map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-gray-155 dark:border-gray-855 bg-gray-55/40 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-emerald-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-6 w-6 bg-purple-100 text-purple-650 font-bold flex items-center justify-center text-[9px] rounded-full">
                      {rec.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        {rec.name}
                      </h4>
                      <p className="text-[9.5px] text-gray-450 leading-none">{rec.role} · {rec.flag}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-slate-350 leading-relaxed font-normal">{rec.bio}</p>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <button
                    onClick={() => handleConnectReader(rec.id)}
                    className="text-[9.5px] font-extrabold text-emerald-600 hover:text-emerald-500 transition-all cursor-pointer"
                  >
                    Request callback connection →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12. COMMUNITY ACTIVITY PREVIEW */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 space-y-4">
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="h-4.5 w-4.5 text-emerald-650" /> What Readers Are Discussing
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "thr-1", title: "Bilateral Silicon Wafer Testing Tariffs", count: 245, sector: "Global Trade" },
              { id: "thr-2", title: "Phytochemical Heavy Metal Compliance Testing", count: 183, sector: "Compliance & Healthcare" },
              { id: "thr-3", title: "Sovereign AI Datacenter Setup Regulations", count: 132, sector: "AI & Innovation" }
            ].map((thr) => {
              const following = followedThreads.includes(thr.id);
              return (
                <div key={thr.id} className="p-3 rounded-xl border border-gray-150 dark:border-gray-850 flex flex-col justify-between hover:border-emerald-500/50 bg-gray-50/50 dark:bg-gray-900/10 min-h-[90px]">
                  <div>
                    <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded uppercase">
                      {thr.sector}
                    </span>
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight mt-1.5">{thr.title}</h4>
                    <p className="text-[9px] text-gray-400 mt-0.5">{thr.count} Readers participating</p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-100/50 dark:border-gray-850 flex justify-between items-center">
                    <button
                      onClick={() => handleFollowThread(thr.id)}
                      className="text-[9.5px] font-bold text-gray-400 hover:text-emerald-500"
                    >
                      {following ? "Following ✓" : "Follow Thread"}
                    </button>
                    <Link
                      href={`/en/poc-v2/communities/reader/top`}
                      className="text-[9.5px] font-bold text-emerald-650 hover:underline cursor-pointer"
                    >
                      Join Discussion →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 13 & 14. JOIN / COMPLETE PROFILE & READER COMMUNITY CTAs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Onboarding CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 md:col-span-2 bg-gradient-to-br from-white via-white to-emerald-500/5 dark:from-[#0f172a] dark:to-emerald-950/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-emerald-650 bg-emerald-50 dark:bg-emerald-950/45 px-2 py-0.5 rounded uppercase tracking-wider">Reader Onboarding</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Make Your Reader Profile Discoverable</h3>
              <p className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal">
                Help other readers discover your interests, experience and professional topic alignings. Build your verified professional profile to coordinate roundtable calls.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-emerald-650 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Complete Your Profile
              </button>
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 text-emerald-650 border border-emerald-200 dark:border-emerald-900/40 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Join Reader Community →
              </button>
            </div>
          </div>

          {/* Networking CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-amber-500/5 dark:from-[#0f172a] dark:to-amber-955/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-955/20 px-2 py-0.5 rounded uppercase tracking-wider">Connection Loop</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Don't Just Read. Connect.</h3>
              <p className="text-xs text-gray-605 dark:text-slate-350 leading-relaxed font-normal">
                Join active discussions, share your perspectives in article boards, and find readers who care about the same B2B topics.
              </p>
            </div>
            <Link
              href={`/en/poc-v2/communities/reader/top`}
              className="w-full bg-emerald-600 hover:bg-emerald-755 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center shadow-xs"
            >
              Explore Reader Community
            </Link>
          </div>

        </section>

        {/* 15. NEWSLETTER / COMMUNITY UPDATES */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-800 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">weekly briefed updates</span>
              <h3 className="font-display text-base md:text-xl font-bold text-white">Reader Community Updates</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-normal">
                Stay updated with new B2B discussions, community poll events and interesting reader conversations.
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

      {/* --- MODAL DIALOG: COMPLETE PROFILE --- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-4.5 w-4.5 text-emerald-650" /> Complete Reader Profile
              </h4>
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setProfileSubmitted(false);
                  setProfileName("");
                }}
                className="text-gray-400 hover:text-gray-650 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {profileSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Profile Setup Logged</h5>
                <p className="text-[10px] text-gray-500 px-4">
                  Welcome to IGEN reader index, <strong>{profileName}</strong>! Your profile setup request has been logged. We will contact you to verify industry sector preferences.
                </p>
                <button
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setProfileSubmitted(false);
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
                  if (profileName.trim()) setProfileSubmitted(true);
                }}
                className="space-y-4 text-xs font-medium text-gray-600 dark:text-slate-355"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Kumar"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-905 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-emerald-550"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Company / Corporate Affiliation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siemens AG"
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-emerald-550"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Leadership Role / Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Supply Chain Analyst"
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-emerald-550"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-350 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-emerald-650 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Submit Profile Setup
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL DIALOG: JOIN READER COMMUNITY --- */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="h-5 w-5 text-emerald-600" /> Join Reader Community
              </h4>
              <button
                onClick={() => {
                  setIsJoinModalOpen(false);
                  setJoinSubmitted(false);
                }}
                className="text-gray-400 hover:text-gray-605 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {joinSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Registration Received</h5>
                <p className="text-[10px] text-gray-500 px-4 leading-normal font-normal">
                  Thank you! We have successfully registered your reader community membership. We will send you notification briefs for active discussions matching your chosen sectors.
                </p>
                <button
                  onClick={() => {
                    setIsJoinModalOpen(false);
                    setJoinSubmitted(false);
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
                  setJoinSubmitted(true);
                }}
                className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355"
              >
                <p className="text-gray-505 text-[11px] leading-relaxed font-normal">
                  Joining the Reader Community allows you to follow active threads, save B2B articles, post comments, and connect with other readers.
                </p>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Corporate / Reader Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. reader@company.com"
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-850 p-2.5 focus:outline-hidden dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Primary Interest Area</label>
                  <select className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-850 p-2.5 focus:outline-hidden dark:text-white font-medium">
                    <option value="trade">Global Trade</option>
                    <option value="tech">AI & Innovation</option>
                    <option value="mfg">Manufacturing</option>
                    <option value="logistics">Logistics & Supply Chain</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsJoinModalOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Join Community
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

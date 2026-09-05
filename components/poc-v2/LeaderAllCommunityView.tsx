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

interface LeaderCardType {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  countryCode: string;
  location: string;
  bio: string;
  expertise: string[];
  isVerified: boolean;
  isFeatured: boolean;
  avatarInitials: string;
  bgGradient: string;
  activity: string;
}

// 20 Prominent Global Business Leaders Database
const LEADERS_DATABASE: LeaderCardType[] = [
  {
    id: "ldr-1",
    name: "Jensen Huang",
    role: "CEO",
    company: "NVIDIA",
    industry: "Semiconductors",
    countryCode: "US",
    location: "California, USA",
    bio: "Pioneering GPU-accelerated computing, sovereign AI infrastructure, and next-generation silicon fab supply networks.",
    expertise: ["AI Infrastructure", "Semiconductors", "Global Supply Chain"],
    isVerified: true,
    isFeatured: true,
    avatarInitials: "JH",
    bgGradient: "from-green-600 to-emerald-700",
    activity: "Keynote: sovereign compute networks"
  },
  {
    id: "ldr-2",
    name: "Nandan Nilekani",
    role: "Chairman",
    company: "Infosys",
    industry: "Electronics & IT",
    countryCode: "IN",
    location: "Bengaluru, India",
    bio: "Advocating for digital public infrastructure, open-source AI guardrails, and sovereign training datasets for developing nations.",
    expertise: ["Digital Infrastructure", "Sovereign AI", "IT Consulting"],
    isVerified: true,
    isFeatured: true,
    avatarInitials: "NN",
    bgGradient: "from-blue-600 to-indigo-700",
    activity: "Contributed to 'AI Public Goods'"
  },
  {
    id: "ldr-3",
    name: "Tim Cook",
    role: "CEO",
    company: "Apple",
    industry: "Consumer Electronics",
    countryCode: "US",
    location: "California, USA",
    bio: "Directing global manufacturing footprints, sustainable device circularity, and bilateral silicon testing facilities.",
    expertise: ["Consumer Hardware", "Operations Strategy", "Bilateral Trade"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "TC",
    bgGradient: "from-slate-700 to-slate-900",
    activity: "Attending CEO Roundtable"
  },
  {
    id: "ldr-4",
    name: "Sultan bin Sulayem",
    role: "Group Chairman & CEO",
    company: "DP World",
    industry: "Logistics & Maritime",
    countryCode: "AE",
    location: "Dubai, UAE",
    bio: "Pioneering smart port logistics, cross-border cargo telemetry systems, and bilateral corridor freight hubs.",
    expertise: ["Port Logistics", "Maritime Freight", "CEPA Corridors"],
    isVerified: true,
    isFeatured: true,
    avatarInitials: "SS",
    bgGradient: "from-amber-600 to-orange-700",
    activity: "Moderator: 'Bilateral Corridors'"
  },
  {
    id: "ldr-5",
    name: "Christian Bruch",
    role: "CEO",
    company: "Siemens Energy",
    industry: "Sustainable Energy",
    countryCode: "DE",
    location: "Munich, Germany",
    bio: "Spearheading clean energy grid integration, electrolyzer manufacturing, and green hydrogen supply systems.",
    expertise: ["Clean Energy", "Grid Engineering", "Green Hydrogen"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "CB",
    bgGradient: "from-cyan-600 to-teal-700",
    activity: "Insight: green hydrogen grids"
  },
  {
    id: "ldr-6",
    name: "Hana Al Rostamani",
    role: "Group CEO",
    company: "First Abu Dhabi Bank",
    industry: "Financial Services",
    countryCode: "AE",
    location: "Abu Dhabi, UAE",
    bio: "Advancing digital trade finance settlements, letters of credit automation, and bilateral currency liquidity hubs.",
    expertise: ["Trade Finance", "Banking Operations", "Bilateral Capital"],
    isVerified: true,
    isFeatured: true,
    avatarInitials: "HR",
    bgGradient: "from-indigo-600 to-purple-700",
    activity: "Speaker: 'Trade Settlements'"
  },
  {
    id: "ldr-7",
    name: "Piyush Gupta",
    role: "CEO",
    company: "DBS Group",
    industry: "Financial Services",
    countryCode: "SG",
    location: "Singapore City",
    bio: "Transforming digital banking APIs, regional cross-border payment rails, and green finance certifications.",
    expertise: ["Digital Banking", "Bilateral Payments", "ESG Investment"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "PG",
    bgGradient: "from-red-650 to-rose-750",
    activity: "Discussion: cross-border API rails"
  },
  {
    id: "ldr-8",
    name: "Lisa Su",
    role: "CEO",
    company: "AMD",
    industry: "Semiconductors",
    countryCode: "US",
    location: "California, USA",
    bio: "Designing high-performance compute architectures, heterogeneous server packaging, and bilateral supply resilience.",
    expertise: ["Semiconductors", "Server Hardware", "Supply Resilience"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "LS",
    bgGradient: "from-emerald-600 to-teal-800",
    activity: "Keynote: OSAT packaging growth"
  },
  {
    id: "ldr-9",
    name: "Mukesh Ambani",
    role: "Chairman",
    company: "Reliance Industries",
    industry: "Sustainable Energy",
    countryCode: "IN",
    location: "Mumbai, India",
    bio: "Deploying raw gigafactories for clean energy integration, PV modules, and regional zero-emission fuel chains.",
    expertise: ["Sustainable Energy", "Petrochemicals", "Industrial Expansion"],
    isVerified: true,
    isFeatured: true,
    avatarInitials: "MA",
    bgGradient: "from-blue-700 to-teal-700",
    activity: "Keynote: PV module capacity"
  },
  {
    id: "ldr-10",
    name: "Roland Busch",
    role: "CEO",
    company: "Siemens AG",
    industry: "Industrial Automation",
    countryCode: "DE",
    location: "Munich, Germany",
    bio: "Advancing industrial software engines, predictive telemetry controllers, and smart grid automation integrations.",
    expertise: ["Industrial Software", "Smart Grids", "Telemetry Controllers"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "RB",
    bgGradient: "from-sky-600 to-indigo-850",
    activity: "Joined: 'Factory Automation AMA'"
  },
  {
    id: "ldr-11",
    name: "Helen Wong",
    role: "Group CEO",
    company: "OCBC Bank",
    industry: "Financial Services",
    countryCode: "SG",
    location: "Singapore City",
    bio: "Directing commercial lending operations, regional currency liquidity, and sustainable ESG financing projects.",
    expertise: ["Commercial Lending", "Bilateral Wealth", "ESG Finance"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "HW",
    bgGradient: "from-red-600 to-rose-700",
    activity: "Insight: Bilateral Wealth Flows"
  },
  {
    id: "ldr-12",
    name: "Satya Nadella",
    role: "CEO",
    company: "Microsoft",
    industry: "Technology",
    countryCode: "US",
    location: "Washington, USA",
    bio: "Pioneering generative AI copilots, global cloud datacenter fabrics, and bilateral data protection consensus.",
    expertise: ["Generative AI", "Cloud Infrastructure", "Data Governance"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "SN",
    bgGradient: "from-blue-650 to-sky-750",
    activity: "Insight: generative AI guardrails"
  },
  {
    id: "ldr-13",
    name: "Oliver Zipse",
    role: "CEO",
    company: "BMW Group",
    industry: "Automotive & EV",
    countryCode: "DE",
    location: "Munich, Germany",
    bio: "Transforming electric vehicle powertrain platforms, high-performance battery packs, and circular supply chains.",
    expertise: ["Electric Vehicles", "Powertrain Design", "Circular Supply"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "OZ",
    bgGradient: "from-slate-600 to-slate-800",
    activity: "Attending Automotive Round"
  },
  {
    id: "ldr-14",
    name: "Sundar Pichai",
    role: "CEO",
    company: "Alphabet",
    industry: "Technology",
    countryCode: "US",
    location: "California, USA",
    bio: "Orchestrating search intelligence engines, multimodal generative models, and digital transformation services.",
    expertise: ["Search Tech", "Multimodal Models", "Digital Transformation"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "SP",
    bgGradient: "from-red-500 via-yellow-500 to-green-600",
    activity: "Discussion: AI Search Standards"
  },
  {
    id: "ldr-15",
    name: "Gautam Adani",
    role: "Chairman",
    company: "Adani Group",
    industry: "Logistics & Maritime",
    countryCode: "IN",
    location: "Ahmedabad, India",
    bio: "Expanding cross-border terminal infrastructures, logistics networks, and regional bilateral energy pipelines.",
    expertise: ["Terminal Infrastructure", "Logistics Networks", "Bilateral Energy"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "GA",
    bgGradient: "from-indigo-700 to-blue-900",
    activity: "Insight: Sri Lanka port terminals"
  },
  {
    id: "ldr-16",
    name: "Salil Parekh",
    role: "CEO",
    company: "Infosys",
    industry: "Electronics & IT",
    countryCode: "IN",
    location: "Bengaluru, India",
    bio: "Directing global enterprise application modernization, IT service architectures, and bilateral cloud migration lanes.",
    expertise: ["IT Services", "Application Modernization", "Cloud Migration"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "SP",
    bgGradient: "from-blue-600 to-sky-750",
    activity: "Insight: cloud migration margins"
  },
  {
    id: "ldr-17",
    name: "Arvind Krishna",
    role: "CEO",
    company: "IBM",
    industry: "Technology",
    countryCode: "US",
    location: "New York, USA",
    bio: "Pioneering hybrid cloud architectures, quantum compute interfaces, and enterprise cognitive software.",
    expertise: ["Hybrid Cloud", "Quantum Computing", "Cognitive Software"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "AK",
    bgGradient: "from-blue-800 to-indigo-950",
    activity: "Attended Quantum roundtable"
  },
  {
    id: "ldr-18",
    name: "Shaktikanta Das",
    role: "Governor",
    company: "Reserve Bank of India",
    industry: "Financial Services",
    countryCode: "IN",
    location: "Mumbai, India",
    bio: "Drafting cross-border bilateral settlement rails, API standardization, and sovereign digital currency frameworks.",
    expertise: ["Monetary Policy", "Bilateral Rails", "Digital Currency"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "SD",
    bgGradient: "from-amber-600 to-yellow-750",
    activity: "Keynote: UPI SAARC settlements"
  },
  {
    id: "ldr-19",
    name: "N. Chandrasekaran",
    role: "Chairman",
    company: "Tata Sons",
    industry: "Conglomerate",
    countryCode: "IN",
    location: "Mumbai, India",
    bio: "Leading raw semiconductor capital investments, wafer test expansion plans, and green power grids.",
    expertise: ["Semiconductor Capex", "Power Grids", "Conglomerate Strategy"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "NC",
    bgGradient: "from-blue-750 to-indigo-900",
    activity: "Discussion: India semiconductor spend"
  },
  {
    id: "ldr-20",
    name: "Timotheus Höttges",
    role: "CEO",
    company: "Deutsche Telekom",
    industry: "Telecom & Networks",
    countryCode: "DE",
    location: "Bonn, Germany",
    bio: "Advancing 5G telecom integrations, fiber infrastructure expansions, and international mobile roaming grids.",
    expertise: ["5G Integration", "Fiber Infrastructure", "Telecom Policy"],
    isVerified: true,
    isFeatured: false,
    avatarInitials: "TH",
    bgGradient: "from-pink-600 to-purple-800",
    activity: "Insight: 5G network speeds"
  }
];

export default function LeaderAllCommunityView() {
  // --- STATE DECLARATIONS ---
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedVerification, setSelectedVerification] = useState<"all" | "verified">("all");
  const [sortOption, setSortOption] = useState<"relevance" | "added" | "active" | "alpha">("relevance");
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Simulated followers & connections from LocalStorage
  const [followedLeaders, setFollowedLeaders] = useState<string[]>([]);
  const [connectedLeaders, setConnectedLeaders] = useState<string[]>([]);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

  // UI Dialog Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileSubmitted, setProfileSubmitted] = useState(false);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Static options derived from lists
  const sectorsList = mockData.sectors();
  const countriesList = mockData.countries();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1); // Reset page on new query
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Load local networking states
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFollows = localStorage.getItem("igen_v2_followed_leaders");
      const storedConnections = localStorage.getItem("igen_v2_connected_leaders");
      const storedEvents = localStorage.getItem("igen_v2_registered_events");
      if (storedFollows) setFollowedLeaders(JSON.parse(storedFollows));
      if (storedConnections) setConnectedLeaders(JSON.parse(storedConnections));
      if (storedEvents) setRegisteredEventIds(JSON.parse(storedEvents));
    }
  }, []);

  // --- ACTIONS ---
  const handleFollowLeader = (id: string) => {
    let updated: string[];
    if (followedLeaders.includes(id)) {
      updated = followedLeaders.filter(lId => lId !== id);
    } else {
      updated = [...followedLeaders, id];
    }
    setFollowedLeaders(updated);
    localStorage.setItem("igen_v2_followed_leaders", JSON.stringify(updated));
  };

  const handleConnectLeader = (id: string) => {
    let updated: string[];
    if (connectedLeaders.includes(id)) {
      updated = connectedLeaders.filter(lId => lId !== id);
    } else {
      updated = [...connectedLeaders, id];
    }
    setConnectedLeaders(updated);
    localStorage.setItem("igen_v2_connected_leaders", JSON.stringify(updated));
  };

  const handleRegisterEvent = (id: string) => {
    let updated: string[];
    if (registeredEventIds.includes(id)) {
      updated = registeredEventIds.filter(eId => eId !== id);
    } else {
      updated = [...registeredEventIds, id];
    }
    setRegisteredEventIds(updated);
    localStorage.setItem("igen_v2_registered_events", JSON.stringify(updated));
  };

  const handleClearFilters = () => {
    setSelectedIndustries([]);
    setSelectedCountries([]);
    setSelectedRoles([]);
    setSelectedExpertise([]);
    setSelectedVerification("all");
    setSearchQuery("");
    setSortOption("relevance");
    setPage(1);
  };

  const getCountryFlag = (code: string): string => {
    const match = countriesList.find(c => c.code === code);
    return match ? match.flagEmoji : "🌐";
  };

  // --- CLIENT-SIDE SEARCH & FILTER PIPELINE ---
  const filteredLeaders = LEADERS_DATABASE.filter((ldr) => {
    // 1. Text Search matching name, company, role, industry, expertise
    if (debouncedSearchQuery) {
      const q = debouncedSearchQuery.toLowerCase();
      const matchText =
        ldr.name.toLowerCase().includes(q) ||
        ldr.company.toLowerCase().includes(q) ||
        ldr.role.toLowerCase().includes(q) ||
        ldr.industry.toLowerCase().includes(q) ||
        ldr.expertise.some(e => e.toLowerCase().includes(q));
      if (!matchText) return false;
    }

    // 2. Industry filter
    if (selectedIndustries.length > 0) {
      const matchIndustry = selectedIndustries.some(ind =>
        ldr.industry.toLowerCase().includes(ind.toLowerCase())
      );
      if (!matchIndustry) return false;
    }

    // 3. Country filter
    if (selectedCountries.length > 0) {
      if (!selectedCountries.includes(ldr.countryCode)) return false;
    }

    // 4. Role filter
    if (selectedRoles.length > 0) {
      if (!selectedRoles.includes(ldr.role)) return false;
    }

    // 5. Verification status filter
    if (selectedVerification === "verified") {
      if (!ldr.isVerified) return false;
    }

    // 6. Expertise filter
    if (selectedExpertise.length > 0) {
      const matchExp = selectedExpertise.some(exp => ldr.expertise.includes(exp));
      if (!matchExp) return false;
    }

    return true;
  });

  // Sorting
  const sortedLeaders = [...filteredLeaders].sort((a, b) => {
    if (sortOption === "alpha") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "active") {
      return b.activity.length - a.activity.length; // activity detail complexity weighting
    }
    // Default or relevance: featured first, then name
    const scoreA = (a.isFeatured ? 2 : 0) + (a.isVerified ? 1 : 0);
    const scoreB = (b.isFeatured ? 2 : 0) + (b.isVerified ? 1 : 0);
    return scoreB - scoreA;
  });

  // Paginated slices
  const totalResults = sortedLeaders.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const paginatedLeaders = sortedLeaders.slice((page - 1) * pageSize, page * pageSize);

  const isAnyFilterActive =
    selectedIndustries.length > 0 ||
    selectedCountries.length > 0 ||
    selectedRoles.length > 0 ||
    selectedExpertise.length > 0 ||
    selectedVerification === "verified" ||
    searchQuery !== "";

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-16">
      
      {/* 01. LEADER DISCOVERY HERO */}
      <section className="bg-gradient-to-br from-[#0c0f1a] via-[#161a2b] to-[#070b13] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
            
            {/* Header Content */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold bg-purple-650 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
                LEADER COMMUNITY DIRECTORY
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Discover Leaders
              </h1>
              <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Explore executives, founders and business leaders across industries, countries and areas of expertise. Form meaningful bilateral networking connections built on verified profiles.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#directory-browser"
                  className="bg-purple-600 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-purple-700 transition-all cursor-pointer shadow-md hover:shadow-purple-500/25 flex items-center gap-1.5"
                >
                  Explore Leaders <ArrowRight className="h-4.5 w-4.5" />
                </a>
                <a
                  href="#industry-browser"
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Find Leaders by Industry
                </a>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Create / Complete Your Leader Profile
                </button>
              </div>
            </div>

            {/* 08. Directory Statistics Row */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs shadow-xl">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Global Executive Hub Stats
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-2xl font-extrabold text-white">10,000+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Verified Leaders</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">50+</div>
                  <div className="text-[10px] text-slate-400 font-medium font-semibold">Industries Mapped</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">90+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Bilateral Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">5,000+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Executive Badges</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02. PRIMARY LEADER SEARCH BAR */}
      <section className="mx-auto max-w-7xl px-4 -mt-6 lg:px-6 relative z-20">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search leaders, companies, industries or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-purple-500 focus:outline-hidden dark:text-white font-medium"
            />
            <Search className="absolute left-4 top-4 h-4.5 w-4.5 text-gray-400" />
          </div>
          {isAnyFilterActive && (
            <button
              onClick={handleClearFilters}
              className="w-full md:w-auto shrink-0 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-250 dark:border-red-900/30 text-xs font-bold px-4 py-3.5 rounded-xl transition-all cursor-pointer text-center"
            >
              Clear Search
            </button>
          )}
        </div>
      </section>

      {/* MAIN CONTENT DIRECTORY WORKSPACE */}
      <main id="directory-browser" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* 04. BROWSE LEADERS BY INDUSTRY */}
        <section id="industry-browser" className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Leaders by Industry</h2>
            <span className="text-[10px] text-gray-400">Jump directly to sector executives</span>
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
                      ? "bg-purple-600 text-white border-purple-650"
                      : "bg-white dark:bg-[#0f172a] border-gray-205 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-purple-500"
                  }`}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 05. BROWSE LEADERS BY COUNTRY / REGION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Leaders by Country Corridor</h2>
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
                      ? "bg-purple-600 text-white border-purple-650"
                      : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-805 text-gray-700 dark:text-gray-300 hover:border-purple-500"
                  }`}
                >
                  <span>{c.flagEmoji}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 06. FEATURED & VERIFIED LEADERS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-purple-600 animate-pulse" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Featured & Verified Executives</h2>
            </div>
            <span className="text-[9px] font-bold bg-purple-50 dark:bg-purple-950/20 text-purple-650 border border-purple-250 dark:border-purple-900/30 px-2.5 py-0.5 rounded-lg">
              Priority Networkers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS_DATABASE.filter(l => l.isFeatured).map((ldr) => {
              const following = followedLeaders.includes(ldr.id);
              const connected = connectedLeaders.includes(ldr.id);

              return (
                <div
                  key={ldr.id}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-purple-500 transition-all duration-300 relative group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${ldr.bgGradient} text-white font-extrabold flex items-center justify-center text-xs border border-white/10 shadow-3xs`}>
                        {ldr.avatarInitials}
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-tight flex items-center gap-1 group-hover:text-purple-600 transition-colors">
                          {ldr.name}
                          {ldr.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                        </h3>
                        <p className="text-[9px] text-gray-400 font-semibold leading-none mt-0.5">
                          {ldr.role} · {ldr.company}
                        </p>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">
                      {ldr.bio}
                    </p>

                    <div className="flex items-center gap-1 flex-wrap">
                      {ldr.expertise.map(exp => (
                        <span key={exp} className="text-[8px] font-bold bg-purple-50 dark:bg-purple-950/20 text-purple-650 dark:text-purple-400 border border-purple-105/30 px-1.5 py-0.5 rounded">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleFollowLeader(ldr.id)}
                      className={`text-[9.5px] font-bold py-1.5 px-3 rounded-lg border transition-all cursor-pointer flex-1 text-center ${
                        following
                          ? "bg-purple-600 text-white border-purple-550 shadow-3xs"
                          : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-805 text-gray-500 hover:text-purple-600"
                      }`}
                    >
                      {following ? "Following ✓" : "Follow"}
                    </button>
                    <button
                      onClick={() => handleConnectLeader(ldr.id)}
                      className={`text-[9.5px] font-bold py-1.5 px-3 rounded-lg border transition-all cursor-pointer flex-1 text-center ${
                        connected
                          ? "bg-emerald-600 text-white border-emerald-555 shadow-3xs"
                          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-805 text-gray-600 dark:text-gray-300 hover:text-emerald-500"
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

        {/* 07. MAIN LEADER DIRECTORY SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="hidden lg:block lg:col-span-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-purple-650" /> Smart Filters
              </span>
              {isAnyFilterActive && (
                <button onClick={handleClearFilters} className="text-[10px] font-bold text-red-650 hover:underline">Reset</button>
              )}
            </div>

            {/* Filter by Sector */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Industry Sector</label>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                {sectorsList.map((sec) => {
                  const isChecked = selectedIndustries.includes(sec.name);
                  return (
                    <label key={sec.id} className="flex items-center gap-2 cursor-pointer text-xs text-gray-655 dark:text-gray-300 hover:text-purple-650">
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
                        className="rounded border-gray-300 dark:border-gray-800 text-purple-600 focus:ring-purple-500"
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
                    <label key={cnt.code} className="flex items-center gap-2 cursor-pointer text-xs text-gray-655 dark:text-gray-300 hover:text-purple-650">
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
                        className="rounded border-gray-300 dark:border-gray-800 text-purple-600 focus:ring-purple-500"
                      />
                      <span>{cnt.flagEmoji} {cnt.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter by Leadership Role */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Executive Role</label>
              <div className="space-y-1.5">
                {["CEO", "Chairman", "Group CEO", "Governor"].map((role) => {
                  const isChecked = selectedRoles.includes(role);
                  return (
                    <label key={role} className="flex items-center gap-2 cursor-pointer text-xs text-gray-655 dark:text-gray-300 hover:text-purple-650">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedRoles(selectedRoles.filter(r => r !== role));
                          } else {
                            setSelectedRoles([...selectedRoles, role]);
                          }
                          setPage(1);
                        }}
                        className="rounded border-gray-300 dark:border-gray-800 text-purple-600 focus:ring-purple-500"
                      />
                      <span>{role}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Verification Status */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Verification Status</label>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-655 dark:text-gray-300 hover:text-purple-650">
                  <input
                    type="radio"
                    checked={selectedVerification === "all"}
                    onChange={() => {
                      setSelectedVerification("all");
                      setPage(1);
                    }}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span>All Leaders</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-655 dark:text-gray-300 hover:text-purple-650">
                  <input
                    type="radio"
                    checked={selectedVerification === "verified"}
                    onChange={() => {
                      setSelectedVerification("verified");
                      setPage(1);
                    }}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span>Verified Leaders Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* MAIN ALL LEADERS DIRECTORY LIST/GRID (9/12) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Header Directory Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-3xs">
              <div className="space-y-0.5">
                <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">All Executive Leaders</h3>
                <p className="text-[10px] text-gray-400">
                  {totalResults} Business leaders matching parameters
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {/* Sorting */}
                <div className="flex items-center gap-1.5 text-xs w-full sm:w-auto">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Sort:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => {
                      setSortOption(e.target.value as any);
                      setPage(1);
                    }}
                    className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 text-xs text-gray-705 dark:text-gray-300 focus:outline-hidden focus:border-purple-500 w-full sm:w-auto font-medium"
                  >
                    <option value="relevance">Featured & Verified</option>
                    <option value="active">Recently Active</option>
                    <option value="alpha">Alphabetical (A-Z)</option>
                  </select>
                </div>

                {/* Grid/List layout toggle */}
                <div className="hidden sm:flex border border-gray-205 dark:border-gray-800 rounded-lg p-0.5 bg-gray-55 dark:bg-gray-900 shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1 rounded cursor-pointer ${viewMode === "grid" ? "bg-white dark:bg-gray-800 text-purple-600 shadow-2xs" : "text-gray-405"}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 rounded cursor-pointer ${viewMode === "list" ? "bg-white dark:bg-gray-800 text-purple-600 shadow-2xs" : "text-gray-405"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Rendering */}
            {paginatedLeaders.length === 0 ? (
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center space-y-3">
                <Search className="h-10 w-10 text-gray-400 mx-auto" />
                <h4 className="text-sm font-bold dark:text-white">No leaders match your current search or filters</h4>
                <p className="text-xs text-gray-500 font-medium">Try modifying your query or resetting active filter chips.</p>
                {isAnyFilterActive && (
                  <button onClick={handleClearFilters} className="bg-purple-600 hover:bg-purple-750 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer">
                    Clear Active Filters
                  </button>
                )}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedLeaders.map((ldr) => {
                  const following = followedLeaders.includes(ldr.id);
                  const connected = connectedLeaders.includes(ldr.id);

                  return (
                    <div
                      key={ldr.id}
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-3xs hover:border-purple-500 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2.5">
                            <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${ldr.bgGradient} text-white font-extrabold flex items-center justify-center text-xs border border-white/10`}>
                              {ldr.avatarInitials}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5 group-hover:text-purple-600 transition-colors">
                                {ldr.name}
                                {ldr.isVerified && (
                                  <span className="text-[8.5px] bg-emerald-500/10 text-emerald-650 border border-emerald-500/20 px-1 py-0.2 rounded font-bold">
                                    ✓ Verified
                                  </span>
                                )}
                              </h4>
                              <p className="text-[9px] text-gray-400 font-semibold leading-none mt-0.5">
                                {ldr.role} · {ldr.company} · {getCountryFlag(ldr.countryCode)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">
                          {ldr.bio}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {ldr.expertise.map(exp => (
                            <span key={exp} className="text-[8px] font-bold bg-purple-50 dark:bg-purple-955/20 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between gap-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleFollowLeader(ldr.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              following
                                ? "bg-purple-600 text-white border-purple-500"
                                : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-purple-600"
                            }`}
                            title="Follow Leader"
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleConnectLeader(ldr.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              connected
                                ? "bg-emerald-600 text-white border-emerald-500"
                                : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-emerald-500"
                            }`}
                            title="Connect with Leader"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/en/poc-v2/leader-news/pages/featured`}
                          className="text-[10px] font-extrabold text-purple-600 hover:text-purple-505 transition-colors flex items-center gap-0.5 bg-purple-50/50 dark:bg-purple-950/20 px-3 py-1.5 rounded-lg border border-purple-105/50 cursor-pointer"
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
                {paginatedLeaders.map((ldr) => {
                  const following = followedLeaders.includes(ldr.id);
                  const connected = connectedLeaders.includes(ldr.id);

                  return (
                    <div
                      key={ldr.id}
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-xl p-4 shadow-3xs hover:border-purple-500 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3 max-w-xl">
                        <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${ldr.bgGradient} text-white font-extrabold flex items-center justify-center text-xs border border-white/10 shrink-0`}>
                          {ldr.avatarInitials}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5 flex-wrap">
                            {ldr.name}
                            {ldr.isVerified && (
                              <span className="text-[8.5px] bg-emerald-500/10 text-emerald-650 border border-emerald-500/20 px-1 py-0.2 rounded font-bold">
                                ✓ Verified
                              </span>
                            )}
                          </h4>
                          <p className="text-[9.5px] text-gray-405 font-medium leading-none">
                            {ldr.role} · {ldr.company} · {getCountryFlag(ldr.countryCode)}
                          </p>
                          <p className="text-[11px] text-gray-600 dark:text-gray-350 line-clamp-1">
                            {ldr.bio}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-855 shrink-0">
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleFollowLeader(ldr.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              following ? "bg-purple-600 text-white border-purple-500" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500"
                            }`}
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleConnectLeader(ldr.id)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              connected ? "bg-emerald-600 text-white border-emerald-500" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500"
                            }`}
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/en/poc-v2/leader-news/pages/featured`}
                          className="text-[10px] font-extrabold text-purple-650 hover:text-purple-550 transition-colors flex items-center gap-0.5 bg-purple-50/50 dark:bg-purple-955/20 px-3.5 py-2 rounded-lg border border-purple-105/50 cursor-pointer"
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
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[11px] font-bold px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:border-purple-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
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
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-purple-500"
                      }`}
                    >
                      {pNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[11px] font-bold px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:border-purple-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

          </div>
        </section>

        {/* 08. ACTIVE COMMUNITY LEADERS PREVIEW */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-4.5 w-4.5 text-purple-600" /> Active in the Executive Community
            </h2>
            <span className="text-[9px] text-gray-400 font-semibold">Participating recently</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "act-1", name: "Jensen Huang", activeIn: "Sovereign AI Networks Roundtable", insight: "Bilateral GPU allocation standards draft proposals.", sector: "Semiconductors" },
              { id: "act-2", name: "Sultan bin Sulayem", activeIn: "Smart Port Logistics Telemetry", insight: "IMEC trade corridor automated container forwarding.", sector: "Logistics" },
              { id: "act-3", name: "Nandan Nilekani", activeIn: "Open Source AI Guardrails", insight: "National sovereign compute shared public training data.", sector: "Electronics & IT" }
            ].map((act) => (
              <div key={act.id} className="p-4 rounded-xl border border-gray-155 dark:border-gray-855 bg-gray-55/40 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-purple-550 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-purple-650 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded uppercase">
                    Active In: {act.activeIn}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    {act.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-semibold">{act.sector}</p>
                  <p className="text-[11px] text-gray-500 dark:text-slate-300 leading-relaxed font-normal">Recent Insight: "{act.insight}"</p>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <Link
                    href={`/en/poc-v2/leader-news/pages/featured`}
                    className="text-[9.5px] font-bold text-purple-600 hover:text-purple-500 transition-all"
                  >
                    View Conversation →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 09. RECOMMENDED LEADERS (PERSONALIZATION BASED ONtracked sectors) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-purple-600 fill-purple-500" /> Leaders You May Want to Know
            </h2>
            <span className="text-[9px] text-gray-400 font-medium">Curated matchmaking</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "ldr-3", name: "Tim Cook", reason: "Recommended because you track Electronics & IT.", role: "CEO, Apple", flag: "🇺🇸", initials: "TC" },
              { id: "ldr-5", name: "Christian Bruch", reason: "Recommended because you track Clean Energy.", role: "CEO, Siemens Energy", flag: "🇩🇪", initials: "CB" },
              { id: "ldr-6", name: "Hana Al Rostamani", reason: "Recommended because you track Trade Finance.", role: "Group CEO, First Abu Dhabi Bank", flag: "🇦🇪", initials: "HR" }
            ].map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-gray-155 dark:border-gray-850 bg-gray-55/40 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-purple-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded uppercase">
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
                      <p className="text-[9.5px] text-gray-450 leading-none">{rec.role} · {rec.flag}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <button
                    onClick={() => handleConnectLeader(rec.id)}
                    className="text-[9.5px] font-extrabold text-purple-600 hover:text-purple-500 transition-all cursor-pointer"
                  >
                    Request Callback →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. LEADERSHIP EXPERTISE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Leaders by Expertise</h2>
            <span className="text-[10px] text-gray-400">Discover skills taxonomy</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "AI Infrastructure", "Sovereign AI", "Consumer Hardware", "Operations Strategy", "Bilateral Trade",
              "Port Logistics", "Maritime Freight", "CEPA Corridors", "Clean Energy", "Grid Engineering", "Green Hydrogen",
              "Trade Finance", "Banking Operations", "Bilateral Capital", "Digital Banking", "Bilateral Payments",
              "ESG Investment", "Semiconductors", "Server Hardware", "Supply Resilience", "Telecom Policy"
            ].map((exp) => (
              <button
                key={exp}
                onClick={() => {
                  setSearchQuery(exp);
                  document.getElementById("directory-browser")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3.5 py-2 text-[10.5px] font-bold bg-white hover:bg-purple-50 border border-gray-200 dark:bg-[#0f172a] dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:border-purple-500 text-gray-700 dark:text-slate-300 rounded-xl transition-all cursor-pointer hover:scale-102 shadow-3xs"
              >
                #{exp}
              </button>
            ))}
          </div>
        </section>

        {/* 11 & 12. DISCUSSIONS & EVENTS PREVIEWS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Discussions Preview */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="h-4.5 w-4.5 text-purple-650" /> What Leaders Are Discussing
            </h3>
            
            <div className="space-y-3">
              {[
                { title: "Bilateral Silicon Testing Corridor Regulations", count: 23, path: "/en/poc-v2/communities/leader/top" },
                { title: "Smart Port Container Freight Telemetry APIs", count: 17, path: "/en/poc-v2/communities/leader/top" },
                { title: "ESG Financing Standards & Unified Criteria", count: 12, path: "/en/poc-v2/communities/leader/top" }
              ].map((disc, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-gray-150 dark:border-gray-850 flex justify-between items-center hover:border-purple-500/50 bg-gray-50/50 dark:bg-gray-900/10">
                  <div className="max-w-xs sm:max-w-md">
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight line-clamp-1">{disc.title}</h4>
                    <p className="text-[9px] text-gray-400 mt-0.5">{disc.count} Leaders participating</p>
                  </div>
                  <Link
                    href={disc.path}
                    className="text-[9.5px] font-bold text-purple-605 hover:underline cursor-pointer shrink-0"
                  >
                    View Conversation →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Events Preview */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-purple-600" /> Upcoming Executive Events
            </h3>
            
            <div className="space-y-3">
              {[
                { id: "evt-1", title: "Executive Roundtable: Future of Global Leadership", date: "September 20", type: "Roundtable" },
                { id: "evt-2", title: "CEO AMA: Ask a Global Business Leader", date: "September 25", type: "AMA Session" }
              ].map((evt) => {
                const registered = registeredEventIds.includes(evt.id);
                return (
                  <div key={evt.id} className="p-3 rounded-lg border border-gray-150 dark:border-gray-850 flex justify-between items-center hover:border-purple-500/50 bg-gray-50/50 dark:bg-gray-900/10">
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">{evt.title}</h4>
                      <p className="text-[9px] text-gray-400 mt-0.5">{evt.type} · {evt.date}</p>
                    </div>
                    <button
                      onClick={() => handleRegisterEvent(evt.id)}
                      className={`text-[9px] font-extrabold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        registered
                          ? "bg-emerald-600 text-white border-emerald-555"
                          : "bg-purple-600 text-white border-purple-500 hover:bg-purple-750"
                      }`}
                    >
                      {registered ? "Registered" : "Register"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* 13 & 14. BUILD YOUR LEADER PROFILE & NETWORKING CTAs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Onboarding CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 md:col-span-2 bg-gradient-to-br from-white via-white to-purple-500/5 dark:from-[#0f172a] dark:to-purple-950/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-purple-650 bg-purple-50 dark:bg-purple-950/45 px-2 py-0.5 rounded uppercase tracking-wider">Executive Onboarding</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Make Your Leadership Profile Stand Out</h3>
              <p className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal">
                Help other professionals discover your expertise, experience and leadership perspective. Build your verified professional profile to coordinate roundtable calls.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Create Leader Profile
              </button>
              <button
                onClick={() => setIsVerificationModalOpen(true)}
                className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 text-purple-650 border border-purple-200 dark:border-purple-900/40 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Get Verified as a Leader →
              </button>
            </div>
          </div>

          {/* Visibility upgrades */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-amber-500/5 dark:from-[#0f172a] dark:to-amber-955/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded uppercase tracking-wider">Club Entitlements</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Build Your Executive Network</h3>
              <ul className="text-xs text-gray-600 dark:text-slate-400 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Verified executive badge</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Featured profile in directories</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Premium roundtable requests</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Joint sponsored insights publishing</li>
              </ul>
            </div>
            <button
              onClick={() => setIsVerificationModalOpen(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center shadow-xs"
            >
              Upgrade Leader Profile
            </button>
          </div>

        </section>

        {/* 15. NEWSLETTER / LEADERSHIP BRIEF SUBSCRIBERS */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-800 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest block">weekly BRIEF alerts</span>
              <h3 className="font-display text-base md:text-xl font-bold text-white">Subscribe to the Leadership Brief</h3>
              <p className="text-slate-300 text-xs leading-relaxed font-normal">
                Stay updated with leadership conversations, executive insights and upcoming event briefs delivered straight to your corporate inbox.
              </p>
            </div>

            <div className="lg:col-span-5 w-full">
              {newsletterSubscribed ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1.5 animate-pulse">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                  <h4 className="text-xs font-bold text-white">Subscription Succeeded!</h4>
                  <p className="text-[10px] text-slate-300">You will receive first briefings in your inbox next Monday.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) setNewsletterSubscribed(true);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your corporate email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder-slate-400 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-purple-500 font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
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
                <Crown className="h-4.5 w-4.5 text-purple-650" /> Complete Executive Profile
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
                <h5 className="text-xs font-bold dark:text-white">Profile Registration Received</h5>
                <p className="text-[10px] text-gray-500 px-4">
                  Welcome aboard, <strong>{profileName}</strong>! Your leadership profile setup wizard has been logged. We will contact you at your registration email to verify company affiliations.
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
                className="space-y-4 text-xs font-medium text-gray-600 dark:text-slate-350"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Kumar"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-905 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-purple-550"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Company / Corporate Affiliation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siemens AG"
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-purple-550"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Leadership Role / Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Director of Infrastructure"
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-purple-550"
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
                  <button type="submit" className="bg-purple-600 hover:bg-purple-750 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Submit Profile Setup
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL DIALOG: GET VERIFIED --- */}
      {isVerificationModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-600" /> Request Leadership Verification
              </h4>
              <button
                onClick={() => {
                  setIsVerificationModalOpen(false);
                  setVerificationSubmitted(false);
                }}
                className="text-gray-400 hover:text-gray-650 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {verificationSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Verification Request Logged</h5>
                <p className="text-[10px] text-gray-500 px-4">
                  We have successfully logged your executive verification audit inquiry. A verification manager from the IGEN secretariat will contact your press office in 1-2 business days.
                </p>
                <button
                  onClick={() => {
                    setIsVerificationModalOpen(false);
                    setVerificationSubmitted(false);
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-305 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setVerificationSubmitted(true);
                }}
                className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-350"
              >
                <p className="text-gray-505 text-[11px] leading-relaxed font-normal">
                  Verification verifies your corporate affiliation status, grants a verified checkmark badge, and enables hosting private executive AMA sessions.
                </p>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Corporate Registration Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. executive@company.com"
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Press Officer / Secretariat Contact</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. secretariat@company.com"
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-850 p-2.5 focus:outline-hidden dark:text-white"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsVerificationModalOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Apply for Verification
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

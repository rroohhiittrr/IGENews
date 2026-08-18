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
import { CompanyCard } from "@/types/company";

export default function SMETopCommunityView() {
  // --- STATE DECLARATIONS ---
  const [activeTab, setActiveTab] = useState<"all" | "industry" | "country" | "rising" | "featured" | "verified" | "recognized">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("Technology");
  const [selectedCountry, setSelectedCountry] = useState("IN");
  
  // Visibility Upgrade Modal States
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [upgradeSubmitted, setUpgradeSubmitted] = useState(false);
  const [upgradeBusinessName, setUpgradeBusinessName] = useState("");
  const [upgradeTier, setUpgradeTier] = useState("verified");

  // LocalStorage Simulated Systems
  const [savedSMEs, setSavedSMEs] = useState<string[]>([]);
  const [followedSMEs, setFollowedSMEs] = useState<string[]>([]);
  
  // Interactive Tooltip Badges State
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Raw mock database companies list
  const companies = mockData.companies(100);
  const sectorsList = mockData.sectors();
  const countriesList = mockData.countries();

  // Load follows & saves from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFollows = localStorage.getItem("igen_followed_smes");
      const storedSaves = localStorage.getItem("igen_saved_smes");
      if (storedFollows) setFollowedSMEs(JSON.parse(storedFollows));
      if (storedSaves) setSavedSMEs(JSON.parse(storedSaves));
    }
  }, []);

  const handleFollowSME = (id: string) => {
    let updated: string[];
    if (followedSMEs.includes(id)) {
      updated = followedSMEs.filter(fId => fId !== id);
    } else {
      updated = [...followedSMEs, id];
    }
    setFollowedSMEs(updated);
    localStorage.setItem("igen_followed_smes", JSON.stringify(updated));
  };

  const handleSaveSME = (id: string) => {
    let updated: string[];
    if (savedSMEs.includes(id)) {
      updated = savedSMEs.filter(sId => sId !== id);
    } else {
      updated = [...savedSMEs, id];
    }
    setSavedSMEs(updated);
    localStorage.setItem("igen_saved_smes", JSON.stringify(updated));
  };

  // Helper mapping country code to flag
  const getCountryFlag = (code: string): string => {
    const match = countriesList.find(c => c.code === code);
    return match ? match.flagEmoji : "🌐";
  };

  // --- FILTERED RANKINGS DATASETS ---
  // Organic Industry Leaders (Technology, Manufacturing, Energy, Healthcare)
  const getIndustryRankedList = (sectorName: string) => {
    return companies
      .filter(c => c.industry.toLowerCase().includes(sectorName.toLowerCase()))
      .slice(0, 3) // Top 3
      .map((c, idx) => ({ ...c, rank: idx + 1 }));
  };

  // Organic Country Leaders
  const getCountryRankedList = (countryCode: string) => {
    return companies
      .filter(c => c.countryCode.toUpperCase() === countryCode.toUpperCase())
      .slice(0, 3)
      .map((c, idx) => ({ ...c, rank: idx + 1 }));
  };

  // Rising SMEs (High viewCount30d growth)
  const risingSMEs = companies
    .filter(c => c.viewCount30d > 150)
    .slice(0, 4)
    .map(c => ({
      ...c,
      risingReason: c.viewCount30d > 350 ? "Growing community engagement" : "Rapid increase in profile interest"
    }));

  // Featured SMEs (editorial choices/top tier)
  const featuredSMEs = companies.filter(c => c.tier === "top").slice(0, 4);

  // Verified SMEs (verified tier)
  const verifiedSMEs = companies.filter(c => c.tier === "verified").slice(0, 4);

  // Sponsored Placeholders (Explicitly Labeled)
  const sponsoredSMEs = [
    {
      id: "spon-1",
      name: "Acme Industrial IoT Systems",
      industry: "Technology & IoT",
      location: "Bengaluru, India",
      tagline: "Leading B2B smart factory automation and telemetry hardware supply.",
      flag: "🇮🇳",
      link: "/en/news-poc/company-news/top/pages/featured"
    },
    {
      id: "spon-2",
      name: "Global Cargo Telemetry",
      industry: "Logistics & Maritime",
      location: "Rotterdam, Netherlands",
      tagline: "Freight container route tracking sensors and customs API sync.",
      flag: "🇳🇱",
      link: "/en/news-poc/company-news/top/pages/featured"
    }
  ];

  // Recognition Badges List
  const recognitionBadges = [
    { id: "top_sme", label: "Top SME", desc: "Recognized among the leading SMEs based on platform validation score." },
    { id: "ind_leader", label: "Industry Leader", desc: "Awarded to companies dominating their respective sector index." },
    { id: "reg_leader", label: "Regional Leader", desc: "Recognized for strong trade presence within geographical zones." },
    { id: "rising_sme", label: "Rising SME", desc: "Gaining outstanding momentum in profile views and networking queries." },
    { id: "verified_sme", label: "Verified SME", desc: "Successfully completed corporate registry audit and compliance checks." },
    { id: "community_contrib", label: "Community Contributor", desc: "Actively publishing news updates and B2B opportunities." },
    { id: "featured_sme", label: "Featured SME", desc: "Selected for highlight rank in premium search placements." }
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-16">
      
      {/* 01. HERO — TOP SMEs & ASMEs */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#070b13] text-white relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold bg-amber-500 text-gray-950 px-3 py-1 rounded-lg uppercase tracking-wider shadow-xs">
                SME & ASME RECOGNITION
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Top SMEs & ASMEs
              </h1>
              <p className="text-slate-350 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Discover leading, recognized and rising SMEs across industries, countries and business categories. Explore high-credibility corporate profiles built on transparent validation benchmarks.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#rankings-main"
                  className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-amber-500/25 flex items-center gap-1.5"
                >
                  Explore Top SMEs <ArrowRight className="h-4.5 w-4.5" />
                </a>
                <a
                  href="#industry-leaderboard"
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  View by Industry
                </a>
                <button
                  onClick={() => setIsUpgradeOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Get Your Business Recognized
                </button>
              </div>
            </div>

            {/* 08. Trust Stats Panel */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs shadow-xl space-y-4">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-white/5 pb-2">
                Platform Verification Data
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xl font-extrabold text-white">500+</div>
                  <div className="text-[9px] text-slate-400 font-medium">Recognized SMEs</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white">50+</div>
                  <div className="text-[9px] text-slate-400 font-medium">Industries Indexed</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white">40+</div>
                  <div className="text-[9px] text-slate-400 font-medium">Active Countries</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white">100+</div>
                  <div className="text-[9px] text-slate-400 font-medium font-semibold">Rising Businesses</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02. RANKING NAVIGATION / QUICK FILTER TABS */}
      <section className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-3xs">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 shrink-0 mr-2">Filter Rankings:</span>
            {[
              { id: "all", label: "All Standings" },
              { id: "industry", label: "By Industry" },
              { id: "country", label: "By Country Corridor" },
              { id: "rising", label: "Rising momentum" },
              { id: "featured", label: "Featured Profiles" },
              { id: "verified", label: "Top Verified" }
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    document.getElementById("rankings-main")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    active
                      ? "bg-amber-500 text-gray-950 shadow-xs"
                      : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-805 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main id="rankings-main" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-12">

        {/* 11. RANKING METHODOLOGY WIDGET */}
        <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/20 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
          <div className="flex gap-2.5 items-start">
            <Info className="h-5 w-5 text-blue-650 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-900 dark:text-white">Validation Methodology Statement</span>
              <p className="text-gray-500 text-[10px] mt-0.5">Top rankings are derived from profile completeness, corporate registry credentials, and bilateral trade engagement indicators.</p>
            </div>
          </div>
          <button
            onClick={() => setIsMethodologyOpen(true)}
            className="text-[10px] font-extrabold text-blue-600 hover:underline shrink-0 cursor-pointer"
          >
            How are rankings determined? →
          </button>
        </div>

        {/* 03. TOP SMEs BY INDUSTRY SECTION */}
        {(activeTab === "all" || activeTab === "industry") && (
          <section id="industry-leaderboard" className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" /> Top SMEs by Industry Sector
              </h2>
              
              {/* Category Picker */}
              <div className="flex gap-1">
                {["Technology", "Manufacturing", "Energy", "Services"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedIndustry(sec)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      selectedIndustry === sec
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-505"
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getIndustryRankedList(selectedIndustry).map((sme) => {
                const following = followedSMEs.includes(sme.id);
                const saved = savedSMEs.includes(sme.id);

                return (
                  <div
                    key={sme.id}
                    className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-blue-500 transition-all duration-350 relative group"
                  >
                    <span className="absolute top-4 right-4 text-3xl font-extrabold font-mono text-gray-100 dark:text-gray-800 pointer-events-none group-hover:text-blue-500/10 transition-colors">
                      #{sme.rank}
                    </span>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-605 dark:bg-blue-955/40 dark:text-blue-400 font-extrabold flex items-center justify-center text-xs border border-blue-100/50 shadow-3xs">
                          {sme.logoInitials}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                            {sme.name}
                          </h4>
                          <p className="text-[9px] text-gray-400 font-medium">
                            {sme.industry} · {sme.location} · {getCountryFlag(sme.countryCode)}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">
                        {sme.tagline || "Providing reliable engineering services and wholesale product supply for cross-border trade corridors."}
                      </p>

                      <div className="pt-2 flex items-center gap-1.5 text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10">
                        <Crown className="h-3 w-3 shrink-0" />
                        <span>Recognition: Industry leader #{sme.rank}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleFollowSME(sme.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            following
                              ? "bg-blue-600 text-white border-blue-500"
                              : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500"
                          }`}
                        >
                          <Heart className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleSaveSME(sme.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            saved
                              ? "bg-emerald-600 text-white border-emerald-500"
                              : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500"
                          }`}
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <Link
                        href={`/en/news-poc/company-news/${sme.tier}/pages/featured`}
                        className="text-[10px] font-extrabold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-0.5 bg-blue-50/50 dark:bg-blue-955/20 px-3.5 py-1.5 rounded-lg border border-blue-105/50 cursor-pointer"
                      >
                        View Profile <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 12. SECTION 04 — TOP SMEs BY COUNTRY / REGION */}
        {(activeTab === "all" || activeTab === "country") && (
          <section className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" /> Top SMEs by Country corridor & Region
              </h2>

              {/* Country select pills */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar max-w-sm sm:max-w-none">
                {[
                  { code: "IN", name: "India" },
                  { code: "AE", name: "UAE" },
                  { code: "DE", name: "Germany" },
                  { code: "SG", name: "Singapore" }
                ].map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCountry(c.code)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCountry === c.code
                        ? "bg-blue-650 text-white shadow-2xs"
                        : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-805 text-gray-505"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getCountryRankedList(selectedCountry).map((sme) => {
                const following = followedSMEs.includes(sme.id);
                
                return (
                  <div
                    key={sme.id}
                    className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-3xs flex flex-col justify-between relative group"
                  >
                    <span className="absolute top-4 right-4 text-3xl font-extrabold font-mono text-gray-100 dark:text-gray-800 pointer-events-none group-hover:text-blue-500/10 transition-colors">
                      #{sme.rank}
                    </span>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/40 dark:text-blue-400 font-bold flex items-center justify-center text-xs border border-blue-100/50">
                          {sme.logoInitials}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                            {sme.name}
                          </h4>
                          <p className="text-[9px] text-gray-400 font-medium">
                            {sme.industry} · {sme.location} · {getCountryFlag(sme.countryCode)}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">
                        {sme.tagline || "Providing reliable engineering services and wholesale product supply for cross-border trade corridors."}
                      </p>

                      <div className="pt-2 flex items-center gap-1.5 text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/5 px-2 py-1 rounded border border-blue-505/10">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span>Featured SME in {countriesList.find(c => c.code === selectedCountry)?.name}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex justify-end">
                      <Link
                        href={`/en/news-poc/company-news/${sme.tier}/pages/featured`}
                        className="text-[10px] font-extrabold text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-0.5 bg-blue-50/50 dark:bg-blue-955/20 px-3.5 py-1.5 rounded-lg border border-blue-105/50 cursor-pointer"
                      >
                        View Profile <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Regional Discovery Buttons */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-850 space-y-3">
              <span className="text-[10px] font-bold text-gray-450 uppercase tracking-wider block">Regional Leaders Index:</span>
              <div className="flex flex-wrap gap-2">
                {["Asia Pacific Corridor", "Europe Single Market", "Middle East GCC Trade", "North America Hub", "Africa Continent Corridor"].map((region) => (
                  <button
                    key={region}
                    onClick={() => alert(`Exploring regional rankings for ${region}...`)}
                    className="px-4 py-2 text-[10.5px] font-bold bg-white hover:bg-blue-50 border border-gray-200 dark:bg-[#0f172a] dark:border-gray-800 dark:hover:bg-gray-800 text-gray-700 dark:text-slate-300 rounded-xl transition-all cursor-pointer shadow-3xs"
                  >
                    Explore {region} →
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 13. SECTION 05 — RISING SMEs & ASMEs */}
        {(activeTab === "all" || activeTab === "rising") && (
          <section className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
              <div className="space-y-0.5">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500 animate-pulse" /> Rising SMEs & ASMEs
                </h2>
                <p className="text-[9.5px] text-gray-400">Businesses gaining momentum and visibility across the ecosystem</p>
              </div>
              <span className="text-[8.5px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-1 rounded-lg uppercase tracking-wide font-bold">
                Organic Momentum
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {risingSMEs.map((sme) => {
                const following = followedSMEs.includes(sme.id);

                return (
                  <div
                    key={sme.id}
                    className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-emerald-500 transition-all duration-300"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-0.5">
                          Rising ↑
                        </span>
                        <span className="text-[9px] text-slate-400">{getCountryFlag(sme.countryCode)} {sme.location}</span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                          {sme.name}
                        </h4>
                        <p className="text-[9px] text-gray-400 font-semibold">{sme.industry}</p>
                      </div>

                      <p className="text-[11px] text-gray-605 dark:text-gray-350 line-clamp-2">
                        {sme.tagline || "Providing reliable engineering services and wholesale product supply for cross-border trade corridors."}
                      </p>

                      <div className="pt-2 border-t border-gray-100 dark:border-gray-855 text-[9px] text-gray-500">
                        Reason: <strong className="text-gray-700 dark:text-gray-200">{sme.risingReason}</strong>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between">
                      <button
                        onClick={() => handleFollowSME(sme.id)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          following
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </button>

                      <Link
                        href={`/en/news-poc/company-news/${sme.tier}/pages/featured`}
                        className="text-[10px] font-extrabold text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 14. SECTION 06 — FEATURED & RECOGNIZED SMEs */}
        {(activeTab === "all" || activeTab === "featured") && (
          <section className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" /> Featured & Recognized SMEs
              </h2>
              <span className="text-[9px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-250 dark:border-amber-900/30 px-2.5 py-0.5 rounded-lg">
                Verified Achievements
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredSMEs.map((sme) => {
                const following = followedSMEs.includes(sme.id);

                return (
                  <div
                    key={sme.id}
                    className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-805 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:border-amber-500 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />

                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 font-extrabold flex items-center justify-center text-sm border border-amber-500/20 shadow-2xs">
                            {sme.logoInitials}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5">
                              {sme.name}
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                            </h4>
                            <p className="text-[9px] text-gray-400 font-medium">
                              {sme.industry} · {sme.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">
                        {sme.tagline || "Providing reliable engineering services and wholesale product supply for cross-border trade corridors."}
                      </p>

                      <div className="pt-2 flex items-center gap-1.5 text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/5 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
                        <Award className="h-3.5 w-3.5 shrink-0" />
                        <span>Recognition: Recognized for innovation in industrial automation and OSAT substrate manufacturing.</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between">
                      <button
                        onClick={() => handleFollowSME(sme.id)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          following
                            ? "bg-blue-600 text-white border-blue-500 shadow-2xs"
                            : "bg-gray-55 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blue-600"
                        }`}
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </button>

                      <Link
                        href={`/en/news-poc/company-news/${sme.tier}/pages/featured`}
                        className="text-[10px] font-extrabold text-blue-605 hover:text-blue-500 transition-colors flex items-center gap-0.5 bg-blue-50/50 dark:bg-blue-955/20 px-3 py-1.5 rounded-lg border border-blue-105/50 cursor-pointer"
                      >
                        View Profile <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 15 & 16. SECTION 07 & 08 — INDUSTRY & REGIONAL LEADERS COLUMNS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Industry Leaders Selection */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-blue-550 fill-blue-500" /> Leading SMEs by Industry Segment
            </h3>

            <div className="space-y-3">
              {[
                { sector: "Technology", name: "Apex Tech Labs", rank: 1, flag: "🇮🇳" },
                { sector: "Manufacturing", name: "GreenGrid Engineering", rank: 1, flag: "🇩🇪" },
                { sector: "Energy", name: "SunGrid Solutions", rank: 1, flag: "🇦🇪" }
              ].map((ldr) => (
                <div key={ldr.sector} className="p-3 rounded-lg border border-gray-150 dark:border-gray-850 flex justify-between items-center hover:border-blue-500/50 bg-gray-50/50 dark:bg-gray-900/10">
                  <div>
                    <h4 className="text-[10.5px] font-bold text-gray-900 dark:text-white leading-tight">{ldr.name}</h4>
                    <p className="text-[9px] text-gray-400 mt-0.5">{ldr.sector} · Rank #{ldr.rank} {ldr.flag}</p>
                  </div>
                  <a
                    href="#industry-leaderboard"
                    className="text-[9.5px] font-bold text-blue-600 hover:text-blue-500 transition-all"
                  >
                    View Class →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Leaders Selection */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-blue-600" /> Regional SME Leaders Index
            </h3>

            <div className="space-y-3">
              {[
                { region: "Asia Pacific", name: "Hosur Micro-Substrates Ltd", rank: 1, flag: "🇮🇳" },
                { region: "Europe Single Market", name: "München Solar Systems", rank: 1, flag: "🇩🇪" },
                { region: "Middle East GCC", name: "Dubai Logistics Hub", rank: 1, flag: "🇦🇪" }
              ].map((ldr) => (
                <div key={ldr.region} className="p-3 rounded-lg border border-gray-150 dark:border-gray-855 flex justify-between items-center hover:border-blue-500/50 bg-gray-50/50 dark:bg-gray-900/10">
                  <div>
                    <h4 className="text-[10.5px] font-bold text-gray-900 dark:text-white leading-tight">{ldr.name}</h4>
                    <p className="text-[9px] text-gray-400 mt-0.5">{ldr.region} · Rank #{ldr.rank} {ldr.flag}</p>
                  </div>
                  <a
                    href="#directory-browser"
                    onClick={() => alert(`Redirecting to regional list for ${ldr.region}...`)}
                    className="text-[9.5px] font-bold text-blue-600 hover:text-blue-505 transition-all"
                  >
                    Explore Hub →
                  </a>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 17. SECTION 09 — TOP VERIFIED SMEs */}
        {(activeTab === "all" || activeTab === "verified") && (
          <section className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" /> Top Verified SMEs
              </h2>
              <span className="text-[9px] text-gray-400">Authenticated registration files verified</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verifiedSMEs.map((sme) => {
                const following = followedSMEs.includes(sme.id);

                return (
                  <div
                    key={sme.id}
                    className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-3xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-bold text-emerald-650 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-0.5">
                          ✓ Verified SME
                        </span>
                        <span className="text-[9px] text-slate-450">{getCountryFlag(sme.countryCode)} {sme.location}</span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                          {sme.name}
                        </h4>
                        <p className="text-[9px] text-gray-450 font-semibold">{sme.industry}</p>
                      </div>

                      <p className="text-[11px] text-gray-605 dark:text-gray-350 line-clamp-2">
                        {sme.tagline || "Providing reliable engineering services and wholesale product supply for cross-border trade corridors."}
                      </p>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-gray-400 font-medium">
                          <span>Profile Completion</span>
                          <span>{sme.profileCompletion}%</span>
                        </div>
                        <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sme.profileCompletion}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between">
                      <button
                        onClick={() => handleFollowSME(sme.id)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          following
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blue-605"
                        }`}
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </button>

                      <Link
                        href={`/en/news-poc/company-news/${sme.tier}/pages/featured`}
                        className="text-[10px] font-extrabold text-blue-600 hover:text-blue-505 transition-colors cursor-pointer"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 18. SECTION 10 — WHY THESE SMEs ARE FEATURED / RANKED */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="h-4.5 w-4.5 text-blue-600" /> Why These SMEs Stand Out
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            {[
              { title: "Verified Business Status", desc: "Corporate registry IDs and legal entity operations undergo compliance validation before badge issuance." },
              { title: "Strong Community Engagement", desc: "Measures network query responses, RFQ feedback logs, and technical thread contributions." },
              { title: "Bilateral Corridor Contribution", desc: "Priority rankings support small firms delivering key supply chain integrations for international lanes." }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-150 dark:border-gray-855 bg-gray-55/30 dark:bg-gray-900/10 space-y-1.5">
                <div className="h-6 w-6 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/40 dark:text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-100">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 19. SECTION 11 — SME RECOGNITION & BADGES */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">SME Recognition & Badges</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {recognitionBadges.map((badge) => {
              const active = activeTooltip === badge.id;
              return (
                <div
                  key={badge.id}
                  className="relative"
                  onMouseEnter={() => setActiveTooltip(badge.id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-500 dark:bg-[#0f172a] dark:border-gray-805 text-center flex flex-col items-center justify-center gap-2 h-28 cursor-help transition-all shadow-3xs">
                    <span className="text-xl">🏆</span>
                    <h4 className="font-bold text-[10.5px] text-gray-905 dark:text-white leading-tight">{badge.label}</h4>
                  </div>
                  
                  {active && (
                    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-[9.5px] p-2.5 rounded-lg shadow-md border border-slate-800 animate-in fade-in zoom-in-95 duration-150 leading-relaxed font-medium">
                      {badge.desc}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 20. SECTION 12 — RECOMMENDED SMEs */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-blue-600 fill-blue-500" /> Personalized SME Recommendations
            </h2>
            <span className="text-[9px] text-gray-450 font-medium">Matching followed preferences</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "rec-1", name: "Hosur Micro-Substrates Ltd", reason: "Recommended because you follow Technology + India.", desc: "Advanced wafer testing and silicon interposers packaging.", location: "Hosur, India", flag: "🇮🇳" },
              { id: "rec-2", name: "München Solar Systems", reason: "Recommended because you follow Energy + Germany.", desc: "Turnkey solar PV grid controllers integrations.", location: "Munich, Germany", flag: "🇩🇪" },
              { id: "rec-3", name: "Dubai Cargo Telemetry", reason: "Recommended because you follow Logistics + UAE.", desc: "Customs API synchronization and route tracking.", location: "Dubai, GCC", flag: "🇦🇪" }
            ].map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-gray-150 dark:border-gray-855 bg-gray-55/40 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-blue-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded uppercase">
                    {rec.reason}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                    {rec.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-semibold">{rec.flag} {rec.location}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-300 leading-relaxed font-normal">{rec.desc}</p>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <Link
                    href="/en/news-poc/company-news/top/pages/featured"
                    className="text-[9.5px] font-bold text-blue-650 hover:text-blue-500 transition-all"
                  >
                    Request Consultation →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 21 & 22. SECTION 13 & 14 — BUSINESS RECOGNITION CTA & PREMIUM UPGRADES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Recognition CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 md:col-span-2 bg-gradient-to-br from-white via-white to-blue-500/5 dark:from-[#0f172a] dark:to-blue-955/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-955/45 px-2 py-0.5 rounded uppercase tracking-wider">Recognition Program</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Could Your Business Be One of the Top SMEs?</h3>
              <p className="text-xs text-gray-600 dark:text-slate-350 leading-relaxed font-normal">
                Build your visibility, strengthen your business profile and get discovered by professionals, buyers and decision-makers. Participate in our verified ranking audits.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setIsUpgradeOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Get Your Business Recognized
              </button>
              <button
                onClick={() => alert("Redirecting to business listing onboarding...")}
                className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 text-blue-605 border border-blue-200 dark:border-blue-900/40 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                List Your Business →
              </button>
            </div>
          </div>

          {/* Upgrades panel */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-amber-500/5 dark:from-[#0f172a] dark:to-amber-955/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded uppercase tracking-wider">Premium Verification</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Increase Business Visibility</h3>
              <ul className="text-xs text-gray-600 dark:text-slate-400 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Verified SME trust badge</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Featured SME priority placement</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Premium Profile with Analytics</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Sponsored placement access</li>
              </ul>
            </div>
            <button
              onClick={() => setIsUpgradeOpen(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center shadow-xs"
            >
              Upgrade Business Profile
            </button>
          </div>

        </section>

        {/* 23 & 24. SECTION 15 — SPONSORED RECOGNITION CONTENT */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sponsored Recognition</span>
            <span className="text-[8px] border border-gray-200 dark:border-gray-800 text-gray-400 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
              Paid Placement
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsoredSMEs.map((spon) => (
              <div
                key={spon.id}
                className="p-5 rounded-2xl border border-gray-200 bg-gray-50/20 dark:bg-gray-900/10 dark:border-gray-855 flex flex-col justify-between hover:border-blue-500/50 transition-all relative group"
              >
                <span className="absolute top-4 right-4 text-[8px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  Promoted
                </span>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300 font-extrabold flex items-center justify-center text-xs border border-gray-200 shadow-3xs">
                      {spon.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                        {spon.name}
                      </h4>
                      <p className="text-[9px] text-gray-400 font-medium">
                        {spon.industry} · {spon.location} · {spon.flag}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-550 dark:text-gray-400 leading-relaxed font-normal">
                    {spon.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <Link
                    href={spon.link}
                    className="text-[9.5px] font-extrabold text-blue-600 hover:text-blue-505 transition-colors flex items-center gap-0.5 cursor-pointer"
                  >
                    Learn More <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* --- DIALOG MODAL: RANKING METHODOLOGY --- */}
      {isMethodologyOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-blue-650" /> Ranking Methodology Statement
              </h4>
              <button
                onClick={() => setIsMethodologyOpen(false)}
                className="text-gray-400 hover:text-gray-650 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-slate-350 space-y-3 leading-relaxed font-medium">
              <p>
                Rankings are organic and determined algorithmically to protect directory trust and transparency. 
                Our compliance index parses three primary validation pools:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-gray-500">
                <li><strong>Verified Profile Status</strong>: Checks local commercial registries to authenticate business addresses, VAT/UEN status, and ownership files.</li>
                <li><strong>Community Engagement Logs</strong>: Tracks query callback responsiveness and B2B opportunities publishing frequency.</li>
                <li><strong>Bilateral Corridors Activity</strong>: Prioritizes SMEs supplying technical materials across registered bilateral corridors (e.g. India-Germany, UAE-Singapore).</li>
              </ul>
              <p className="text-[10px] text-gray-450 border-t border-gray-100 dark:border-gray-800 pt-3">
                *Note: Paid visibility listings (Sponsored or Featured badges) boost search query ranks but do NOT modify organic scorecard positions on leadership podiums.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsMethodologyOpen(false)}
                className="bg-gray-100 dark:bg-gray-855 text-gray-600 dark:text-slate-350 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DIALOG MODAL: GET BUSINESS RECOGNIZED / UPGRADE PROFILE --- */}
      {isUpgradeOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Building className="h-4.5 w-4.5 text-blue-600" /> Upgrade Business Visibility
              </h4>
              <button
                onClick={() => {
                  setIsUpgradeOpen(false);
                  setUpgradeSubmitted(false);
                  setUpgradeBusinessName("");
                }}
                className="text-gray-400 hover:text-gray-650 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {upgradeSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Upgrade Request Logged</h5>
                <p className="text-[10px] text-gray-500 px-4">
                  Thank you! Your visibility upgrade query for <strong>{upgradeBusinessName}</strong> has been logged. Our onboarding officer will contact you within 1 business day.
                </p>
                <button
                  onClick={() => {
                    setIsUpgradeOpen(false);
                    setUpgradeSubmitted(false);
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-slate-350 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (upgradeBusinessName.trim()) setUpgradeSubmitted(true);
                }}
                className="space-y-4 text-xs font-medium text-gray-600 dark:text-slate-355"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Entity / Business Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Tech Labs"
                    value={upgradeBusinessName}
                    onChange={(e) => setUpgradeBusinessName(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-2.5 focus:outline-hidden dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Requested Visibility Level</label>
                  <select
                    value={upgradeTier}
                    onChange={(e) => setUpgradeTier(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 focus:outline-hidden dark:text-white"
                  >
                    <option value="verified">Verified SME (Checkmark & Trust Boost)</option>
                    <option value="featured">Featured SME (Top Rank Boost)</option>
                    <option value="premium">Premium Profile (Advanced Analytics)</option>
                    <option value="sponsored">Sponsored Placements (Ad placement)</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsUpgradeOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-600 dark:text-slate-350 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Submit Onboarding Inquiry
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

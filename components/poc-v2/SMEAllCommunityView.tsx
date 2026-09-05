"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Briefcase
} from "lucide-react";
import { mockData } from "@/lib/mock/factory";
import { CompanyCard, Sector, Country } from "@/types/company";

export default function SMEAllCommunityView() {
  // --- STATE DECLARATIONS ---
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // API Data
  const [companies, setCompanies] = useState<CompanyCard[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });
  const [facets, setFacets] = useState<{
    industries: { id: string; name: string; count: number }[];
    countries: { code: string; name: string; count: number }[];
    tiers: { value: string; count: number }[];
  }>({ industries: [], countries: [], tiers: [] });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // LocalStorage Simulated Systems
  const [followedSMEs, setFollowedSMEs] = useState<string[]>([]);
  const [savedSMEs, setSavedSMEs] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<CompanyCard[]>([]);

  // UI Modal States
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isListBusinessOpen, setIsListBusinessOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [consultTarget, setConsultTarget] = useState("");
  const [consultMessage, setConsultMessage] = useState("");
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [listBusinessName, setListBusinessName] = useState("");
  const [listBusinessIndustry, setListBusinessIndustry] = useState("");
  const [listBusinessCountry, setListBusinessCountry] = useState("");
  const [listBusinessSubmitted, setListBusinessSubmitted] = useState(false);
  
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Static Data Reference
  const sectorsList = mockData.sectors();
  const countriesList = mockData.countries();
  const featuredSMEs = mockData.featured(6);

  // --- DEBOUNCE EFFECT FOR SEARCH ---
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1); // Reset page on new search query
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // --- LOAD LOCALSTORAGE STATES ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFollows = localStorage.getItem("igen_v2_followed_smes");
      const storedSaves = localStorage.getItem("igen_v2_saved_smes");
      const storedRecent = localStorage.getItem("igen_v2_recent_smes");

      if (storedFollows) setFollowedSMEs(JSON.parse(storedFollows));
      if (storedSaves) setSavedSMEs(JSON.parse(storedSaves));
      if (storedRecent) setRecentlyViewed(JSON.parse(storedRecent));
    }
  }, []);

  // --- FETCH SEARCH RESULTS FROM API ---
  const fetchCompanies = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const params = new URLSearchParams();
      if (debouncedSearchQuery) params.set("q", debouncedSearchQuery);
      if (selectedIndustries.length > 0) params.set("sector", selectedIndustries.join(","));
      if (selectedCountries.length > 0) params.set("country", selectedCountries.join(","));
      if (selectedTiers.length > 0) params.set("tier", selectedTiers.join(","));
      params.set("sort", sortOption);
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));

      const response = await fetch(`/api/companies/search?${params.toString()}`);
      if (!response.ok) throw new Error("Search failed");
      
      const resData = await response.json();
      setCompanies(resData.data || []);
      setPagination(resData.pagination || {
        page: 1,
        pageSize: 12,
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
      if (resData.facets) {
        setFacets(resData.facets);
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [debouncedSearchQuery, selectedIndustries, selectedCountries, selectedTiers, sortOption, page, pageSize]);

  // --- INTERACTIVE ACTIONS ---
  const handleFollowSME = (id: string) => {
    let updated: string[];
    if (followedSMEs.includes(id)) {
      updated = followedSMEs.filter(fId => fId !== id);
    } else {
      updated = [...followedSMEs, id];
    }
    setFollowedSMEs(updated);
    localStorage.setItem("igen_v2_followed_smes", JSON.stringify(updated));
  };

  const handleSaveSME = (id: string) => {
    let updated: string[];
    if (savedSMEs.includes(id)) {
      updated = savedSMEs.filter(sId => sId !== id);
    } else {
      updated = [...savedSMEs, id];
    }
    setSavedSMEs(updated);
    localStorage.setItem("igen_v2_saved_smes", JSON.stringify(updated));
  };

  const handleRecordVisit = (company: CompanyCard) => {
    let updated = [company, ...recentlyViewed.filter(c => c.id !== company.id)];
    updated = updated.slice(0, 5); // Max 5 items
    setRecentlyViewed(updated);
    localStorage.setItem("igen_v2_recent_smes", JSON.stringify(updated));
  };

  const handleClearFilters = () => {
    setSelectedIndustries([]);
    setSelectedCountries([]);
    setSelectedTiers([]);
    setSearchQuery("");
    setSortOption("relevance");
    setPage(1);
  };

  const removeIndustryFilter = (id: string) => {
    setSelectedIndustries(selectedIndustries.filter(i => i !== id));
  };

  const removeCountryFilter = (code: string) => {
    setSelectedCountries(selectedCountries.filter(c => c !== code));
  };

  const removeTierFilter = (tier: string) => {
    setSelectedTiers(selectedTiers.filter(t => t !== tier));
  };

  const isAnyFilterActive = selectedIndustries.length > 0 || selectedCountries.length > 0 || selectedTiers.length > 0 || searchQuery !== "";

  // Helper mapping country code to flag
  const getCountryFlag = (code: string): string => {
    const match = countriesList.find(c => c.code === code);
    return match ? match.flagEmoji : "🌐";
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 pb-16">
      
      {/* 01. HERO / SME DISCOVERY HEADER */}
      <section className="bg-gradient-to-br from-[#0b192e] via-[#101e3d] to-[#070b13] text-white relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
            
            {/* Header Content */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-mono font-bold bg-blue-600 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
                SME & ASME BUSINESS DIRECTORY
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Discover SMEs & ASMEs
              </h1>
              <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Explore businesses across industries, countries, products and services and find the right companies for your business needs. Connect with verified manufacturing, tech, and logistics entities.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#directory-browser"
                  className="bg-blue-600 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-md hover:shadow-blue-500/25 flex items-center gap-1.5"
                >
                  Explore SMEs <ArrowRight className="h-4.5 w-4.5" />
                </a>
                <button
                  onClick={() => setIsListBusinessOpen(true)}
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  List Your Business
                </button>
                <button
                  onClick={() => setIsVerifyOpen(true)}
                  className="bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Get Verified
                </button>
              </div>
            </div>

            {/* 07. Trust Stats Row */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs shadow-xl">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Global SME Platform Network
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-2xl font-extrabold text-white">50,000+</div>
                  <div className="text-[10px] text-slate-400 font-medium">SMEs & ASMEs</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">120+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Industries Listed</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">95+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Active Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">10,000+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Verified Profiles</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02. PRIMARY SME SEARCH BAR */}
      <section className="mx-auto max-w-7xl px-4 -mt-6 lg:px-6 relative z-20">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-4 md:p-5 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search SMEs, companies, industries, products or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-xs rounded-xl bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-blue-500 focus:outline-hidden dark:text-white font-medium"
            />
            <Search className="absolute left-4 top-4 h-4.5 w-4.5 text-gray-400" />
          </div>
          <div className="flex gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-805 text-xs font-bold px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            {isAnyFilterActive && (
              <button
                onClick={handleClearFilters}
                className="w-full md:w-auto shrink-0 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer text-center"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main id="directory-browser" className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">
        
        {/* Active Filters Bar */}
        {isAnyFilterActive && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50/20 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/20 rounded-xl text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Active Filters:</span>
            {searchQuery && (
              <span className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold shadow-2xs">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="hover:text-red-500 font-bold">&times;</button>
              </span>
            )}
            {selectedIndustries.map(ind => {
              const name = sectorsList.find(s => s.id === ind)?.name || ind;
              return (
                <span key={ind} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold shadow-2xs">
                  {name}
                  <button onClick={() => removeIndustryFilter(ind)} className="hover:text-red-500 font-bold">&times;</button>
                </span>
              );
            })}
            {selectedCountries.map(cCode => {
              const name = countriesList.find(c => c.code === cCode)?.name || cCode;
              return (
                <span key={cCode} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold shadow-2xs">
                  {getCountryFlag(cCode)} {name}
                  <button onClick={() => removeCountryFilter(cCode)} className="hover:text-red-500 font-bold">&times;</button>
                </span>
              );
            })}
            {selectedTiers.map(t => (
              <span key={t} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold shadow-2xs">
                {t.toUpperCase()}
                <button onClick={() => removeTierFilter(t)} className="hover:text-red-500 font-bold">&times;</button>
              </span>
            ))}
            <button onClick={handleClearFilters} className="text-[10px] font-bold text-red-650 hover:underline ml-auto shrink-0">Clear All</button>
          </div>
        )}

        {/* 04. BROWSE BY INDUSTRY QUICK DIRECTORIES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Browse SMEs by Industry</h2>
            <a href="#directory" className="text-[10px] font-bold text-blue-600 hover:underline">View All Industries →</a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {sectorsList.slice(0, 12).map((sec) => {
              const isActive = selectedIndustries.includes(sec.id);
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedIndustries(selectedIndustries.filter(i => i !== sec.id));
                    } else {
                      setSelectedIndustries([...selectedIndustries, sec.id]);
                    }
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all hover:scale-102 flex flex-col justify-between h-24 ${
                    isActive
                      ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/20"
                      : "border-gray-200 bg-white hover:border-blue-500 dark:bg-[#0f172a] dark:border-gray-805"
                  }`}
                >
                  <span className="text-xl">{sec.icon}</span>
                  <div>
                    <h3 className="font-bold text-[11px] text-gray-900 dark:text-white line-clamp-1">{sec.name}</h3>
                    <p className="text-[9px] text-gray-400 mt-0.5">{sec.companyCount} Companies</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 05. BROWSE BY COUNTRY / REGION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore SMEs by Country Corridor</h2>
            <span className="text-[10px] text-gray-400">Bilateral partnerships actively mapped</span>
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
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all hover:scale-102 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-650"
                      : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-500"
                  }`}
                >
                  <span>{c.flagEmoji}</span>
                  <span>{c.name}</span>
                  <span className="text-[9px] opacity-60 font-medium">({c.companyCount})</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 06. FEATURED & VERIFIED SMEs PREMIUM DISCOVERY */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Featured & Verified SMEs</h2>
            </div>
            <span className="text-[9px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-605 border border-amber-250 dark:border-amber-900/30 px-2.5 py-0.5 rounded-lg">
              Priority Partners
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSMEs.map((sme) => {
              const following = followedSMEs.includes(sme.id);
              const saved = savedSMEs.includes(sme.id);
              
              return (
                <div
                  key={sme.id}
                  onClick={() => handleRecordVisit(sme)}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-amber-500 transition-all duration-300 relative overflow-hidden group hover:shadow-lg dark:hover:shadow-amber-550/5 cursor-pointer"
                >
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 font-extrabold flex items-center justify-center text-sm border border-amber-500/20 shadow-2xs">
                          {sme.logoInitials}
                        </div>
                        <div>
                          <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-tight flex items-center gap-1 group-hover:text-amber-500 transition-colors">
                            {sme.name}
                          </h3>
                          <p className="text-[9px] text-gray-400 font-medium">
                            {sme.industry} · {sme.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-605 dark:text-gray-300 leading-relaxed font-normal">
                      {sme.tagline || "Providing reliable engineering services and wholesale product supply for cross-border trade corridors."}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[8px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <ShieldCheck className="h-2.5 w-2.5" /> Featured SME
                      </span>
                      <span className="text-[8px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Check className="h-2.5 w-2.5" /> Verified Profile
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollowSME(sme.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          following
                            ? "bg-blue-600 text-white border-blue-500 shadow-2xs"
                            : "bg-gray-55 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blue-550"
                        }`}
                        title="Follow Business"
                      >
                        <Heart className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveSME(sme.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          saved
                            ? "bg-emerald-600 text-white border-emerald-500 shadow-2xs"
                            : "bg-gray-55 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-emerald-500"
                        }`}
                        title="Save Business"
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConsultTarget(sme.name);
                        setIsConsultOpen(true);
                      }}
                      className="text-[10px] font-extrabold text-blue-600 hover:text-blue-505 transition-colors flex items-center gap-0.5 bg-blue-50/50 dark:bg-blue-950/20 px-3 py-1.5 rounded-lg border border-blue-100/50 dark:border-blue-900/30 cursor-pointer"
                    >
                      Connect <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 03 & 07. DIRECTORY SEARCH RESULTS SECTION */}
        <section id="directory" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="hidden lg:block lg:col-span-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-blue-650" /> Smart Filters
              </span>
              {isAnyFilterActive && (
                <button onClick={handleClearFilters} className="text-[10px] font-bold text-red-600 hover:underline">Reset</button>
              )}
            </div>

            {/* Filter by Industry (Sectors) */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Industry Segment</label>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                {sectorsList.map((sec) => {
                  const isChecked = selectedIndustries.includes(sec.id);
                  return (
                    <label key={sec.id} className="flex items-center gap-2 cursor-pointer text-xs text-gray-655 dark:text-gray-300 hover:text-blue-605">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedIndustries(selectedIndustries.filter(id => id !== sec.id));
                          } else {
                            setSelectedIndustries([...selectedIndustries, sec.id]);
                          }
                          setPage(1);
                        }}
                        className="rounded border-gray-300 dark:border-gray-800 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{sec.icon} {sec.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter by Country */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Bilateral Corridors</label>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                {countriesList.map((cnt) => {
                  const isChecked = selectedCountries.includes(cnt.code);
                  return (
                    <label key={cnt.code} className="flex items-center gap-2 cursor-pointer text-xs text-gray-655 dark:text-gray-300 hover:text-blue-600">
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
                        className="rounded border-gray-300 dark:border-gray-800 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{cnt.flagEmoji} {cnt.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter by Verification Status (Tiers) */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Verification Tier</label>
              <div className="space-y-1.5">
                {[
                  { value: "top", label: "Enterprise (Top)" },
                  { value: "verified", label: "Verified (Pro)" },
                  { value: "registered", label: "Registered (Free)" }
                ].map((tier) => {
                  const isChecked = selectedTiers.includes(tier.value);
                  return (
                    <label key={tier.value} className="flex items-center gap-2 cursor-pointer text-xs text-gray-655 dark:text-gray-300 hover:text-blue-600">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedTiers(selectedTiers.filter(t => t !== tier.value));
                          } else {
                            setSelectedTiers([...selectedTiers, tier.value]);
                          }
                          setPage(1);
                        }}
                        className="rounded border-gray-300 dark:border-gray-800 text-blue-600 focus:ring-blue-500"
                      />
                      <span>{tier.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR/DIRECTORY MAIN VIEW (9/12) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Header Control Row (Layout toggles, sorting, count) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-2xs">
              <div className="space-y-0.5">
                <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore All SMEs & ASMEs</h3>
                <p className="text-[10px] text-gray-400">
                  {isLoading ? "Searching catalog..." : `${pagination.total} Businesses matching parameters`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {/* Sorting */}
                <div className="flex items-center gap-1.5 text-xs w-full sm:w-auto">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Sort:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => {
                      setSortOption(e.target.value);
                      setPage(1);
                    }}
                    className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 text-xs text-gray-705 dark:text-gray-300 focus:outline-hidden focus:border-blue-500 w-full sm:w-auto font-medium"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="verified_first">Verified First</option>
                    <option value="most_viewed">Most Viewed</option>
                    <option value="most_followed">Most Followed</option>
                    <option value="newest">Recently Added</option>
                  </select>
                </div>

                {/* Grid/List Toggle */}
                <div className="hidden sm:flex border border-gray-205 dark:border-gray-800 rounded-lg p-0.5 bg-gray-50 dark:bg-gray-900 shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1 rounded cursor-pointer ${viewMode === "grid" ? "bg-white dark:bg-gray-800 text-blue-600 shadow-2xs" : "text-gray-405 hover:text-gray-600"}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 rounded cursor-pointer ${viewMode === "list" ? "bg-white dark:bg-gray-800 text-blue-600 shadow-2xs" : "text-gray-405 hover:text-gray-600"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Result Items Grid/List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0" />
                      <div className="space-y-1.5 w-full">
                        <div className="h-3.5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
                        <div className="h-2.5 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
                      </div>
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                      <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="bg-white dark:bg-[#0f172a] border border-red-200 dark:border-red-955/20 rounded-2xl p-8 text-center space-y-4">
                <HelpCircle className="h-10 w-10 text-red-505 mx-auto" />
                <h4 className="text-sm font-bold dark:text-white">We couldn't load the SME directory right now</h4>
                <p className="text-xs text-gray-500">There was a server communication issue. Please check your connection and try again.</p>
                <button onClick={fetchCompanies} className="bg-blue-600 hover:bg-blue-705 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer">
                  Retry Search
                </button>
              </div>
            ) : companies.length === 0 ? (
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center space-y-3">
                <Search className="h-10 w-10 text-gray-400 mx-auto" />
                <h4 className="text-sm font-bold dark:text-white">No SMEs match your current search or filters</h4>
                <p className="text-xs text-gray-500">Try modifying your text search query or clearing active segment parameters.</p>
                {isAnyFilterActive && (
                  <button onClick={handleClearFilters} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer">
                    Clear Active Filters
                  </button>
                )}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((sme) => {
                  const following = followedSMEs.includes(sme.id);
                  const saved = savedSMEs.includes(sme.id);
                  
                  return (
                    <div
                      key={sme.id}
                      onClick={() => handleRecordVisit(sme)}
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-2xs hover:border-blue-500 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/40 dark:text-blue-400 font-bold flex items-center justify-center text-xs border border-blue-100/50 dark:border-blue-900/30 shadow-3xs">
                              {sme.logoInitials}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5">
                                {sme.name}
                                {sme.tier !== "registered" && (
                                  <span className="text-[8px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-1 py-0.5 rounded flex items-center gap-0.5">
                                    ✓ Verified
                                  </span>
                                )}
                              </h4>
                              <p className="text-[9px] text-gray-400 font-medium font-semibold">
                                {sme.industry} · {sme.location} · {getCountryFlag(sme.countryCode)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-605 dark:text-gray-350 leading-relaxed font-normal">
                          {sme.tagline || "Providing reliable engineering services and wholesale product supply for cross-border trade corridors."}
                        </p>

                        {/* Profile Completion Bar (verified & top tiers) */}
                        {sme.tier !== "registered" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[9px] text-gray-450 font-medium">
                              <span>Profile Completion</span>
                              <span>{sme.profileCompletion}%</span>
                            </div>
                            <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sme.profileCompletion}%` }} />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFollowSME(sme.id);
                            }}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              following
                                ? "bg-blue-600 text-white border-blue-500"
                                : "bg-gray-55 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blue-550"
                            }`}
                            title="Follow Business"
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveSME(sme.id);
                            }}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              saved
                                ? "bg-emerald-600 text-white border-emerald-500"
                                : "bg-gray-55 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 hover:text-emerald-500"
                            }`}
                            title="Save Business"
                          >
                            <Bookmark className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/en/poc-v2/company-news/${sme.tier}/pages/featured`}
                          className="text-[10px] font-extrabold text-blue-605 hover:text-blue-500 transition-colors flex items-center gap-0.5 bg-blue-50/50 dark:bg-blue-950/20 px-3 py-1.5 rounded-lg border border-blue-100/50 dark:border-blue-900/30 cursor-pointer"
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
                {companies.map((sme) => {
                  const following = followedSMEs.includes(sme.id);
                  const saved = savedSMEs.includes(sme.id);
                  
                  return (
                    <div
                      key={sme.id}
                      onClick={() => handleRecordVisit(sme)}
                      className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-xl p-4 shadow-3xs hover:border-blue-500 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 max-w-xl">
                        <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-955/40 dark:text-blue-400 font-bold flex items-center justify-center text-sm border border-blue-100/50 dark:border-blue-900/30 shrink-0">
                          {sme.logoInitials}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5 flex-wrap">
                            {sme.name}
                            {sme.tier !== "registered" && (
                              <span className="text-[8.5px] bg-emerald-500/10 text-emerald-650 border border-emerald-500/20 px-1 py-0.2 rounded flex items-center gap-0.5 font-bold">
                                ✓ Verified
                              </span>
                            )}
                          </h4>
                          <p className="text-[10px] text-gray-400 font-medium">
                            {sme.industry} · {sme.location} · {getCountryFlag(sme.countryCode)}
                          </p>
                          <p className="text-[11px] text-gray-600 dark:text-gray-350 line-clamp-1">
                            {sme.tagline || "Providing reliable engineering services and wholesale product supply."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-gray-855 shrink-0">
                        <div className="flex gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFollowSME(sme.id);
                            }}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              following ? "bg-blue-600 text-white border-blue-500" : "bg-gray-55 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500"
                            }`}
                          >
                            <Heart className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveSME(sme.id);
                            }}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              saved ? "bg-emerald-600 text-white border-emerald-500" : "bg-gray-55 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500"
                            }`}
                          >
                            <Bookmark className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/en/poc-v2/company-news/${sme.tier}/pages/featured`}
                          className="text-[10px] font-extrabold text-blue-600 hover:text-blue-505 transition-colors flex items-center gap-0.5 bg-blue-50/50 dark:bg-blue-955/20 px-3.5 py-2 rounded-lg border border-blue-100/50 dark:border-blue-900/30 cursor-pointer"
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
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-250 dark:border-gray-850">
                <button
                  disabled={!pagination.hasPrev}
                  onClick={() => setPage(page - 1)}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[11px] font-bold px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Previous
                </button>
                
                <div className="flex gap-1.5">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pNum) => (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      className={`h-8 w-8 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                        page === pNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-500"
                      }`}
                    >
                      {pNum}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!pagination.hasNext}
                  onClick={() => setPage(page + 1)}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[11px] font-bold px-3 py-2 rounded-xl text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

          </div>
        </section>

        {/* 08. RECOMMENDED SMEs FOR YOU */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-blue-600 fill-blue-500" /> Recommended SMEs For You
            </h2>
            <span className="text-[9px] text-gray-450 font-medium">Based on your activity</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { id: "rec-1", name: "Hosur Micro-Substrates Ltd", tag: "Semiconductors", reason: "Recommended because you track Electronics & IT.", desc: "Advanced wafer testing and silicon interposers packaging.", location: "Hosur, Tamil Nadu", flag: "🇮🇳" },
              { id: "rec-2", name: "Apex BioPharma Supplies", tag: "Pharmaceuticals", reason: "Recommended because you track Healthcare & Pharma.", desc: "Supplier of pure phytochemical herbal botanical extracts.", location: "Singapore City", flag: "🇸🇬" },
              { id: "rec-3", name: "Dubai Solar Utilities", tag: "Renewable Energy", reason: "Recommended because you track Sustainable Energy.", desc: "Turnkey solar PV systems grid integration solutions.", location: "Dubai, GCC", flag: "🇦🇪" }
            ].map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-gray-150 dark:border-gray-855 bg-gray-55/40 dark:bg-gray-900/10 space-y-2 flex flex-col justify-between hover:border-blue-500 transition-all duration-300">
                <div className="space-y-1.5">
                  <span className="text-[8.5px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-955/40 px-2 py-0.5 rounded uppercase">
                    {rec.reason}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    {rec.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium">{rec.flag} {rec.location}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-300 leading-relaxed font-normal">{rec.desc}</p>
                </div>
                <div className="pt-3 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
                  <button
                    onClick={() => {
                      setConsultTarget(rec.name);
                      setIsConsultOpen(true);
                    }}
                    className="text-[9.5px] font-bold text-blue-650 hover:text-blue-500 transition-all cursor-pointer"
                  >
                    Request Callback →
                  </button>
                </div>
              </div>
            ))}
               </div>

        </section>

        {/* 11 & 12. LIST YOUR BUSINESS & PREMIUM MONETIZATION CTA */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* List Your Business CTA */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 md:col-span-2 bg-gradient-to-br from-white via-white to-blue-500/5 dark:from-[#0f172a] dark:to-blue-950/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-955/45 px-2 py-0.5 rounded uppercase tracking-wider">Business Listing Funnel</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Is Your Business Listed?</h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed font-normal">
                Get discovered by buyers, professionals and businesses searching across the iGEN SME network. List your products and services, highlight export capacity, and connect to bilateral corridors.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setIsListBusinessOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                List Your Business Now
              </button>
              <button
                onClick={() => setIsVerifyOpen(true)}
                className="bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900 text-blue-600 border border-blue-200 dark:border-blue-900/40 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Verify Entity →
              </button>
            </div>
          </div>

          {/* Monetization Upgrade benefits card */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-amber-500/5 dark:from-[#0f172a] dark:to-amber-955/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[8.5px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded uppercase tracking-wider">Premium Visibility</span>
              <h3 className="font-display text-base font-extrabold text-gray-900 dark:text-white">Grow Business Visibility</h3>
              <ul className="text-xs text-gray-605 dark:text-slate-400 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Verified Business Identity</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Priority Rank Boost in Search</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Featured Homepage Placement</li>
                <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Access Premium Lead routing</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setConsultTarget("Premium Subscription Desk");
                setIsConsultOpen(true);
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center shadow-xs"
            >
              Upgrade Business Profile
            </button>
          </div>

        </section>

        {/* 13. NEWSLETTER / BUSINESS DISCOVERY CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-800 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest block">weekly trade matchmaker</span>
              <h3 className="font-display text-base md:text-xl font-bold text-white">Subscribe to Business Discovery Alerts</h3>
              <p className="text-slate-305 text-xs leading-relaxed font-normal">
                Receive weekly curated lists of newly registered SMEs, verified buying requirements, and trade corridors opportunities matching your profile preferences.
              </p>
            </div>

            <div className="lg:col-span-5 w-full">
              {newsletterSubscribed ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1.5 animate-pulse">
                  <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto" />
                  <h4 className="text-xs font-bold text-white">Successfully Subscribed!</h4>
                  <p className="text-[10px] text-slate-300">You will receive first matching alerts in your inbox next Monday.</p>
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
                    className="w-full bg-white/10 text-white placeholder-slate-400 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-blue-500 font-medium"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* --- FILTER SHEET DRAWER (MOBILE ONLY) --- */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end justify-center z-50 lg:hidden">
          <div className="bg-white dark:bg-[#0f172a] rounded-t-2xl max-w-md w-full p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="h-4 w-4 text-blue-600" /> Filter Options
              </span>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>

            {/* Filter by Industry (Sectors) */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Industry Segment</label>
              <div className="grid grid-cols-2 gap-2">
                {sectorsList.map((sec) => {
                  const isChecked = selectedIndustries.includes(sec.id);
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedIndustries(selectedIndustries.filter(id => id !== sec.id));
                        } else {
                          setSelectedIndustries([...selectedIndustries, sec.id]);
                        }
                      }}
                      className={`p-2 rounded-lg border text-left text-[10.5px] font-medium transition-all cursor-pointer ${
                        isChecked ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600" : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {sec.icon} {sec.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter by Country */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Bilateral Country</label>
              <div className="flex flex-wrap gap-1.5">
                {countriesList.map((cnt) => {
                  const isChecked = selectedCountries.includes(cnt.code);
                  return (
                    <button
                      key={cnt.code}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedCountries(selectedCountries.filter(code => code !== cnt.code));
                        } else {
                          setSelectedCountries([...selectedCountries, cnt.code]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                        isChecked ? "bg-blue-600 text-white border-blue-650" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-605 dark:text-gray-400"
                      }`}
                    >
                      {cnt.flagEmoji} {cnt.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter by Verification Status (Tiers) */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Verification Tier</label>
              <div className="flex gap-2">
                {[
                  { value: "top", label: "Enterprise" },
                  { value: "verified", label: "Verified" },
                  { value: "registered", label: "Free" }
                ].map((tier) => {
                  const isChecked = selectedTiers.includes(tier.value);
                  return (
                    <button
                      key={tier.value}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedTiers(selectedTiers.filter(t => t !== tier.value));
                        } else {
                          setSelectedTiers([...selectedTiers, tier.value]);
                        }
                      }}
                      className={`flex-1 py-2 text-center rounded-lg border text-[10.5px] font-bold transition-all cursor-pointer ${
                        isChecked ? "bg-blue-650 text-white border-blue-500" : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => {
                  handleClearFilters();
                  setIsFilterDrawerOpen(false);
                }}
                className="flex-1 py-2.5 border border-gray-200 text-gray-655 font-bold text-xs rounded-xl dark:border-gray-800 dark:text-gray-300 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DIALOG: LIST YOUR BUSINESS --- */}
      {isListBusinessOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Building className="h-4.5 w-4.5 text-blue-600" /> Add Your Business Listing
              </h4>
              <button
                onClick={() => {
                  setIsListBusinessOpen(false);
                  setListBusinessSubmitted(false);
                  setListBusinessName("");
                  setListBusinessIndustry("");
                  setListBusinessCountry("");
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {listBusinessSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Business Listing Request Submitted</h5>
                <p className="text-[10px] text-gray-500 px-4">
                  Thank you! Your request for listing <strong>{listBusinessName}</strong> has been received and is routed to our onboarding queue. We will contact you at your registration email to finalize verification.
                </p>
                <button
                  onClick={() => {
                    setIsListBusinessOpen(false);
                    setListBusinessSubmitted(false);
                    setListBusinessName("");
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-605 dark:text-slate-300 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (listBusinessName.trim()) setListBusinessSubmitted(true);
                }}
                className="space-y-4 text-xs font-medium text-gray-600 dark:text-slate-350"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Company / Legal Entity Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Manufacturing Group"
                    value={listBusinessName}
                    onChange={(e) => setListBusinessName(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Industry Segment</label>
                  <select
                    required
                    value={listBusinessIndustry}
                    onChange={(e) => setListBusinessIndustry(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-905 border border-gray-200 dark:border-gray-800 p-2.5 focus:outline-hidden dark:text-white"
                  >
                    <option value="">Select industry...</option>
                    {sectorsList.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">HQ Country</label>
                  <select
                    required
                    value={listBusinessCountry}
                    onChange={(e) => setListBusinessCountry(e.target.value)}
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-800 p-2.5 focus:outline-hidden dark:text-white"
                  >
                    <option value="">Select country...</option>
                    {countriesList.map(c => (
                      <option key={c.code} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsListBusinessOpen(false)}
                    className="bg-gray-100 dark:bg-gray-850 text-gray-655 dark:text-slate-350 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Submit Onboarding Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL DIALOG: GET VERIFIED --- */}
      {isVerifyOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-600" /> Request Business Verification
              </h4>
              <button
                onClick={() => {
                  setIsVerifyOpen(false);
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
                <h5 className="text-xs font-bold dark:text-white">Verification Inquiry Logged</h5>
                <p className="text-[10px] text-gray-500 px-4">
                  We have received your verification request. A program director from the iGEN verification team will contact your registry officers in 1-2 business days.
                </p>
                <button
                  onClick={() => {
                    setIsVerifyOpen(false);
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
                className="space-y-4 text-xs font-medium text-gray-605 dark:text-slate-350"
              >
                <p className="text-gray-500 text-[11px] leading-relaxed font-normal">
                  Verification increases trust score by 45%, grants a verified checkmark badge, and enables lead generation tools.
                </p>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Corporate Registration ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CIN / UEN / VAT Reg Number"
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Registry Office Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="officer@company.com"
                    className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-805 p-2.5 focus:outline-hidden dark:text-white"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsVerifyOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-350 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-705 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Apply for Verification
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL DIALOG: REQUEST CONSULTATION --- */}
      {isConsultOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="h-4.5 w-4.5 text-blue-600" /> Connect with Business
              </h4>
              <button
                onClick={() => {
                  setIsConsultOpen(false);
                  setConsultSubmitted(false);
                  setConsultMessage("");
                }}
                className="text-gray-400 hover:text-gray-650 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {consultSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Consultation Request Logged</h5>
                <p className="text-[10px] text-gray-500 px-4">
                  Your B2B connection request has been routed to <strong>{consultTarget}</strong>. You will receive an intro email at your registration address once they accept.
                </p>
                <button
                  onClick={() => {
                    setIsConsultOpen(false);
                    setConsultSubmitted(false);
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-655 dark:text-slate-350 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (consultMessage.trim()) setConsultSubmitted(true);
                }}
                className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-350"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Target SME</label>
                  <input
                    type="text"
                    disabled
                    value={consultTarget}
                    className="w-full text-xs rounded-xl bg-gray-100 dark:bg-gray-900/40 border border-gray-205 dark:border-gray-805 p-2.5 text-gray-500 cursor-not-allowed dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Describe your trade requirement or inquiry goals</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. We require custom silicon substrates or packaging services for our upcoming hardware release..."
                    value={consultMessage}
                    onChange={(e) => setConsultMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-gray-800 focus:outline-hidden dark:text-white focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsConsultOpen(false)}
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-350 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Send Connection Request
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

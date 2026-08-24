"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Share2, Lock, ChevronRight, Search, AlertTriangle, 
  CheckCircle, ThumbsUp, Bookmark, MessageCircle, ArrowLeft, X, HelpCircle, 
  TrendingUp, Globe, Filter, Star, Briefcase, Eye, ChevronDown, Check,
  Play, Radio, ArrowUpRight, Flame, ShieldAlert, Cpu, Activity, Info, FileText
} from "lucide-react";
import { IGEN_50_SECTORS } from "./igenTaxonomyData";

interface PolicyUpdate {
  id: string;
  title: string;
  ministry: string;
  sectorCode: string;
  sectorName: string;
  type: string;
  status: "Draft" | "Consultation" | "Announced" | "Approved" | "Implemented";
  date: string;
  whatChanged: string;
  whoAffected: string;
  whenApplies: string;
  whyMatters: string;
  source: string;
}

interface GovernmentScheme {
  id: string;
  name: string;
  ministry: string;
  sectorName: string;
  eligibility: string;
  benefit: string;
  deadline: string;
}

const MOCK_GLOBAL_POLICIES: PolicyUpdate[] = [
  {
    id: "pol-all-1",
    title: "Draft Sovereign Database Hosting & Storage Guidelines 2026",
    ministry: "Ministry of Electronics & Information Technology (MeitY)",
    sectorCode: "S02",
    sectorName: "AI & Cyber Security",
    type: "Regulatory Policy",
    status: "Draft",
    date: "Aug 18, 2026",
    whatChanged: "Mandatory local caching of training metadata and secure regional keys for multi-regional hosting models.",
    whoAffected: "Global cloud operators, AI startups training multi-billion parameter models locally.",
    whenApplies: "Consultation open until Oct 2026; enforcement planned by Q2 2027.",
    whyMatters: "Compliance failures carry structured penalties of up to 4% of regional capital buffers.",
    source: "MeitY Notification G.S.R 482(E)",
  },
  {
    id: "pol-all-2",
    title: "National Sodium-Ion Battery Cell Sourcing Subsidies (PLI V2)",
    ministry: "Ministry of Heavy Industries",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    type: "Incentive Scheme",
    status: "Announced",
    date: "Aug 12, 2026",
    whatChanged: "Allocates $1.2B in capital subsidies for cell geometry manufacturing setups utilizing local sodium feedstock.",
    whoAffected: "EV cell builders, sodium chemical refiners, and battery grid procurement managers.",
    whenApplies: "Applications close Nov 30, 2026.",
    whyMatters: "Lowers raw sourcing capital costs by up to 12% for qualifying manufacturing setups.",
    source: "MHI Circular No. 12/2026-PLI",
  },
  {
    id: "pol-all-3",
    title: "Bilateral Silicon Fab Export Equipment Tax Clearances",
    ministry: "Ministry of Commerce and Industry",
    sectorCode: "S02",
    sectorName: "Semiconductors & AI",
    type: "Trade Policy",
    status: "Approved",
    date: "Aug 05, 2026",
    whatChanged: "Zero-rated customs duties on wafer packaging logistics machinery from compliant bilateral treaty partners.",
    whoAffected: "Semiconductor OSAT assembly centers and silicon shipping importers.",
    whenApplies: "Takes effect immediately from next custom cycle.",
    whyMatters: "Relieves wafer shipping port logistics backlogs by automating compliance clearance certificates.",
    source: "MoC Tariff Order 89/2026",
  }
];

const MOCK_SCHEMES: GovernmentScheme[] = [
  { id: "sch-all-1", name: "Sovereign AI Compute Infrastructure Subsidy", ministry: "MeitY", sectorName: "AI & Cyber Security", eligibility: "Startups using sovereign hosting", benefit: "Up to 35% reimbursement on GPU hosting costs", deadline: "Oct 15, 2026" },
  { id: "sch-all-2", name: "Advanced Cell Chemistry Manufacturing Incentive", ministry: "MHI", sectorName: "Automotive & Electric Vehicles", eligibility: "Sodium grid battery builders", benefit: "9% cash-back on sodium raw sourcing CapEx", deadline: "Nov 30, 2026" }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCHeadlinesViksitBharatPanelEditorAllSectors({ onBack }: Props) {
  // Filter states
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedPolicyType, setSelectedPolicyType] = useState<string>("all");
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive UI states
  const [trackedPolicies, setTrackedPolicies] = useState<string[]>([]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Policy AI Assistant
  const [aiChatQuery, setAiChatQuery] = useState("");
  const [aiChatResponse, setAiChatResponse] = useState<string | null>(null);
  const [isAiAnswering, setIsAiAnswering] = useState(false);

  // Policy Alert Configurator
  const [alertConfigured, setAlertConfigured] = useState(false);

  // Loading skeleton state
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Active dashboard tab
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>("Sector View");

  // Trigger loading skeleton on filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedSectorFilter, selectedPolicyType, selectedStateFilter]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleToggleTrackPolicy = (id: string) => {
    if (trackedPolicies.includes(id)) {
      setTrackedPolicies(prev => prev.filter(x => x !== id));
      showToast("Stopped tracking policy");
    } else {
      setTrackedPolicies(prev => [...prev, id]);
      showToast("Policy added to global tracking dashboard ✓");
    }
  };

  const handleSaveArticle = (id: string) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed from Saved Policies");
    } else {
      setSavedArticles(prev => [...prev, id]);
      showToast("Saved policy report locally ✓");
    }
  };

  const handleAskAi = (q: string) => {
    setAiChatQuery(q);
    setIsAiAnswering(true);
    setTimeout(() => {
      setIsAiAnswering(false);
      if (q.toLowerCase().includes("risk") || q.toLowerCase().includes("compliance")) {
        setAiChatResponse("AI Policy Impact Assessment: Compliance updates in sovereign database storage mandate local nodes, introducing up to 4% capital reserve penalty risks.");
      } else if (q.toLowerCase().includes("scheme") || q.toLowerCase().includes("incentive")) {
        setAiChatResponse("AI Policy Opportunity Signal: Sodium cell chemistry (PLI V2) scheme details $1.2B allocation for 12% manufacturing setup CapEx cash-backs.");
      } else {
        setAiChatResponse("AI Policy Summary: Commerce ministry zero-rates customs duty on bilateral OSAT packaging equipment transit corridors.");
      }
    }, 550);
  };

  const handleCreatePolicyAlert = () => {
    setAlertConfigured(true);
    showToast(`Global Policy alert created: Notify when new MeitY/MHI rules affect All Sectors ✓`);
  };

  const filteredPolicies = MOCK_GLOBAL_POLICIES.filter(pol => {
    // Search query filter
    const matchesSearch = pol.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pol.whatChanged.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pol.ministry.toLowerCase().includes(searchQuery.toLowerCase());

    // Dropdown filters
    const matchesSector = selectedSectorFilter === "all" || pol.sectorName.toLowerCase().includes(selectedSectorFilter.toLowerCase());
    const matchesType = selectedPolicyType === "all" || pol.type.toLowerCase().includes(selectedPolicyType.toLowerCase());

    return matchesSearch && matchesSector && matchesType;
  });

  const featuredPolicy = MOCK_GLOBAL_POLICIES[0];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* ─── Breadcrumb ─── */}
      <nav className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 text-xs text-gray-400 font-semibold flex items-center gap-1.5">
        {onBack && (
          <button onClick={onBack} className="mr-2 hover:text-blue-505 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        )}
        <span>Headlines</span>
        <ChevronRight className="h-3 w-3" />
        <span>Viksit Bharat Panel Editor</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-blue-505 font-bold">All Sector</span>
      </nav>

      {/* ─── Premium Policy Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-605 dark:text-blue-405 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" /> VIKSIT BHARAT PANEL EDITOR
              </span>
              <span className="bg-emerald-600/10 text-emerald-650 dark:text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono flex items-center gap-0.5">
                <Globe className="h-3 w-3" /> Global Policy Network Active
              </span>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Global Policy & Business Intelligence
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              Explore government policies, reforms, schemes and development initiatives shaping industries, markets and businesses across India and the global business ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link 
              href="/en/news-poc/headlines/viksit-bharat-panel/my"
              className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-850 hover:bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
            >
              <Briefcase className="h-4 w-4 text-blue-505" /> Track My Sectors →
            </Link>
            <button 
              onClick={handleCreatePolicyAlert}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Create Policy Alert
            </button>
          </div>
        </div>

        {/* Global Search & Filters Bar */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search global policies, schemes or ministries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            {/* Sector Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">All Sectors</option>
                <option value="AI">AI & Cyber Security</option>
                <option value="Automotive">Automotive & EV</option>
                <option value="Semiconductors">Semiconductors & AI</option>
              </select>
            </div>

            {/* Policy Type Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedPolicyType}
                onChange={(e) => setSelectedPolicyType(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">Policy Type</option>
                <option value="Regulatory">Regulatory Policy</option>
                <option value="Incentive">Incentive Schemes</option>
                <option value="Trade">Trade Clearance</option>
              </select>
            </div>

            {/* State Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">Indian States</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Loading Skeleton States */}
      {isLoading ? (
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-3xl p-8 min-h-[300px] animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          </div>
        </section>
      ) : (
        <>
          {/* ─── Global Policy Intelligence Snapshot ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs text-center text-xs font-semibold">
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-blue-500 text-sm md:text-base block">186</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Active Policies</span>
              </div>
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-amber-500 text-sm md:text-base block">42</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Recent Updates</span>
              </div>
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-purple-500 text-sm md:text-base block">64</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Govt Schemes</span>
              </div>
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-red-500 text-sm md:text-base block">50</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Sectors Impacted</span>
              </div>
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-emerald-500 text-sm md:text-base block">28</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">States Covered</span>
              </div>
            </div>
          </section>

          {/* ─── Featured Policy Story ─── */}
          {featuredPolicy && (
            <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                  Featured Policy Story
                </h3>
              </div>

              <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 items-start font-sans">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center shrink-0 border border-blue-200/50">
                  <FileText className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-amber-100 text-amber-800 text-[8px] font-extrabold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                        GLOBAL HIGH IMPACT POLICY
                      </span>
                      <span className="text-gray-400 text-xs font-mono">{featuredPolicy.date}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-gray-905 dark:text-white leading-snug">
                      {featuredPolicy.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold block">
                      Issued by {featuredPolicy.ministry} • Sector: {featuredPolicy.sectorName}
                    </span>
                  </div>

                  <p className="text-xs text-gray-650 dark:text-gray-300 font-normal leading-relaxed">
                    <strong>Official notification details:</strong> {featuredPolicy.whatChanged}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-gray-150 dark:border-gray-855 text-xs">
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">BUSINESS RELEVANCE</span>
                      <p className="text-gray-650 dark:text-gray-400 font-normal mt-0.5">{featuredPolicy.whyMatters}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">TIMELINE & ENFORCEMENT</span>
                      <p className="text-gray-650 dark:text-gray-400 font-normal mt-0.5">{featuredPolicy.whenApplies}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button 
                      onClick={() => showToast("Opening policy full text document...")}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-all uppercase tracking-wider"
                    >
                      Read Policy Intelligence
                    </button>
                    <button 
                      onClick={() => handleToggleTrackPolicy(featuredPolicy.id)}
                      className={`text-[10px] font-bold px-4 py-2 rounded-xl border transition-colors ${
                        trackedPolicies.includes(featuredPolicy.id)
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-955/20"
                          : "text-gray-655 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                      }`}
                    >
                      {trackedPolicies.includes(featuredPolicy.id) ? "Tracking ✓" : "Track Policy"}
                    </button>
                  </div>

                </div>
              </div>
            </section>
          )}

          {/* ─── Main Two-Column Layout ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* ── LEFT COLUMN: Latest Updates & Trackers ── */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Latest Policy Updates */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Latest Policy Updates
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {filteredPolicies.map(pol => (
                      <div key={pol.id} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3 group hover:border-blue-500/25 transition-all">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-blue-500 uppercase">{pol.type}</span>
                          <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-650 dark:text-gray-400 font-mono">Status: {pol.status}</span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-xs md:text-sm font-bold text-gray-905 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                            {pol.title}
                          </h4>
                          <span className="text-[9px] text-gray-400 block font-normal">{pol.ministry} • {pol.date}</span>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/60 p-3 rounded-lg border border-gray-150 dark:border-gray-855 space-y-2 text-[11px] font-sans">
                          <p className="text-gray-650 dark:text-gray-400 font-normal leading-relaxed">
                            <strong className="text-gray-900 dark:text-white font-bold block text-[10.5px]">What Changed?</strong>
                            {pol.whatChanged}
                          </p>
                          <p className="text-gray-650 dark:text-gray-400 font-normal leading-relaxed">
                            <strong className="text-gray-900 dark:text-white font-bold block text-[10.5px]">Who is Affected?</strong>
                            {pol.whoAffected}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-2 text-[10px] border-t border-gray-55 dark:border-gray-800/40">
                          <span className="text-gray-450 font-semibold font-mono">Source: {pol.source}</span>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleSaveArticle(pol.id)}
                              className={`text-[9px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                                savedArticles.includes(pol.id)
                                  ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-955/20"
                                  : "text-gray-550 border-gray-300 dark:border-gray-800"
                              }`}
                            >
                              {savedArticles.includes(pol.id) ? "Saved ✓" : "Save"}
                            </button>
                            <button 
                              onClick={() => showToast("Opening official document panel...")}
                              className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
                            >
                              View Policy
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Global Policy Tracker */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Global Policy Tracker Lifecycle
                    </h3>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-4">
                    {filteredPolicies.map(pol => (
                      <div key={pol.id} className="space-y-2 border-b border-gray-100 dark:border-gray-855/50 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-gray-900 dark:text-white">{pol.title}</span>
                          <span className="text-[10px] text-blue-500 font-mono">Current: {pol.status}</span>
                        </div>
                        
                        <div className="grid grid-cols-5 gap-1 text-[8px] font-extrabold uppercase text-center font-mono">
                          {["Draft", "Consultation", "Announced", "Approved", "Implemented"].map((step, idx) => {
                            const isCurrent = pol.status === step;
                            return (
                              <div 
                                key={idx} 
                                className={`py-1 rounded ${
                                  isCurrent 
                                    ? "bg-blue-600 text-white shadow-3xs" 
                                    : "bg-gray-100 dark:bg-gray-850 text-gray-400"
                                }`}
                              >
                                {step}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policy Impact Dashboard */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Policy Impact Dashboard
                    </h3>
                    
                    <div className="flex gap-1 overflow-x-auto text-[9px] font-bold">
                      {["Sector View", "Industry View", "State View"].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveDashboardTab(tab)}
                          className={`px-2 py-0.5 rounded transition-colors ${
                            activeDashboardTab === tab 
                              ? "bg-blue-600 text-white" 
                              : "bg-gray-150 text-gray-500 dark:bg-gray-900"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="space-y-2 border-r border-gray-100 dark:border-gray-800/40 pr-2">
                      <span className="text-[9px] font-bold text-emerald-500 uppercase">Potential Opportunities ({activeDashboardTab})</span>
                      <ul className="space-y-1.5 text-gray-650 dark:text-gray-400 font-normal leading-relaxed">
                        <li>• Capital cell PLI incentives drop sodium batteries CapEx costs by 12%</li>
                        <li>• Sovereign storagecompute subsidies offer up to 35% reimbursements</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-red-505 uppercase">Potential Challenges ({activeDashboardTab})</span>
                      <ul className="space-y-1.5 text-gray-655 dark:text-gray-400 font-normal leading-relaxed">
                        <li>• Caching metadata locally carry audit warnings and 4% capital limits</li>
                        <li>• Wafer exporting fab custom restrictions shifts packaging logistic setups</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Government Schemes & Programs */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Government Schemes & Programs
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_SCHEMES.map(sch => (
                      <div key={sch.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2 text-xs font-semibold">
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="text-blue-505">{sch.ministry}</span>
                          <span className="text-gray-405">{sch.sectorName}</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{sch.name}</h4>
                        <p className="text-gray-655 dark:text-gray-400 font-normal">
                          <strong className="text-[10px] text-gray-900 dark:text-white block font-bold">Benefit:</strong> {sch.benefit}
                        </p>
                        <div className="flex justify-between text-[9px] text-gray-450 pt-1.5 border-t border-gray-50 dark:border-gray-855">
                          <span>Deadline: {sch.deadline}</span>
                          <button 
                            onClick={() => showToast(`Redirecting to scheme application portal...`)}
                            className="text-blue-505 hover:underline font-bold uppercase"
                          >
                            Apply Scheme →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: Sidebar Widgets ── */}
              <div className="space-y-6">
                
                {/* Industry Impact Indicators */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Industry Impact Summary
                  </span>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    {[
                      { sector: "AI & Cyber Security", updates: 24, highImpact: 6 },
                      { sector: "EV Battery Geometries", updates: 18, highImpact: 4 },
                      { sector: "Semiconductors & OSAT", updates: 15, highImpact: 3 }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[10.5px]">
                          <span className="font-bold text-gray-900 dark:text-white">{row.sector}</span>
                          <span className="text-blue-505 font-mono text-[9px]">{row.updates} updates</span>
                        </div>
                        <span className="text-[8px] text-gray-450 block font-normal">{row.highImpact} high-impact policies active</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ask Policy AI */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-850 p-5 rounded-2xl shadow-3xs space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Ask Policy AI
                    </span>
                    <span className="bg-amber-500 text-slate-950 text-[7px] font-extrabold px-1 rounded font-mono">PRO</span>
                  </div>

                  <div className="space-y-3 text-xs font-semibold font-sans">
                    <p className="text-gray-500 font-normal leading-normal">
                      Submit policy questions and query incentive eligibility guidelines across MeitY and MHI databases.
                    </p>

                    <div className="flex gap-1.5 flex-wrap">
                      {["What recent policies affect AI in India?", "Are there battery factory incentives?"].map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAskAi(q)}
                          className="text-[9.5px] font-bold border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 px-2 py-1 rounded-lg text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-1.5 pt-1">
                      <input 
                        type="text" 
                        placeholder="Ask about active compliance rules..."
                        value={aiChatQuery}
                        onChange={(e) => setAiChatQuery(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[10px] outline-none"
                      />
                      <button 
                        onClick={() => handleAskAi(aiChatQuery)}
                        disabled={isAiAnswering}
                        className="bg-blue-605 hover:bg-blue-700 text-white font-bold text-[9px] px-3 rounded-lg"
                      >
                        Ask
                      </button>
                    </div>

                    {aiChatResponse && (
                      <div className="bg-blue-50/50 dark:bg-blue-955/15 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 text-[10.5px] leading-relaxed text-gray-655 dark:text-gray-300 font-normal">
                        <strong>AI Recommended Match Response:</strong> {aiChatResponse}
                      </div>
                    )}
                  </div>
                </div>

                {/* Policy & Compliance Watch */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Policy & Compliance Watch
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {[
                      { title: "Local Datacenter compliance locks", action: "Deploy localized database cache", date: "Jan 2027" },
                      { title: "Bilateral OSAT Wafer documentation", action: "File customs certificates", date: "Immediate" }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1.5 border-b border-gray-50 dark:border-gray-850/50 pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-gray-900 dark:text-white block leading-tight">{row.title}</span>
                          <span className="text-[9px] text-red-500 font-mono">{row.date}</span>
                        </div>
                        <span className="text-[8px] text-gray-450 block font-normal">Required Action: {row.action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policy Knowledge Library */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Policy Knowledge Library
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {[
                      { title: "MeitY sovereign databases compliance guidelines", type: "Circular Notification", date: "Aug 2026" },
                      { title: "National Advanced Chemistry PLI guidelines", type: "Government Manual", date: "July 2026" }
                    ].map((doc, idx) => (
                      <div key={idx} className="space-y-1 border-b border-gray-55 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0 font-semibold">
                        <span className="text-gray-900 dark:text-white line-clamp-1 block leading-tight">{doc.title}</span>
                        <div className="flex justify-between text-[8px] text-gray-400">
                          <span>{doc.type}</span>
                          <span>{doc.date}</span>
                        </div>
                        <button 
                          onClick={() => showToast(`Downloading PDF document ${doc.title}...`)}
                          className="text-[9px] font-bold text-blue-505 hover:underline uppercase block"
                        >
                          Download Document
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Premium Policy Intelligence Upgrade */}
                <div className="bg-gradient-to-br from-[#0c1424] to-[#162136] border border-slate-800 text-white p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Unlock Premium Policy Intelligence
                  </h4>
                  <p className="text-[10px] text-slate-350 leading-relaxed font-normal">
                    Secure institutional licenses to track compliance amendment alerts, and download full regulatory guides.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-350 font-semibold">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Local database custom compliance alerts
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Full access to state policy databases
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Policy-driven growth indexes
                    </li>
                  </ul>

                  <button 
                    onClick={() => showToast("Opening premium policy checkout flow...")}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Unlock Policy Intelligence
                  </button>
                </div>

                {/* Sponsored Policy Awareness Initiative */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-900/5 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-605 dark:text-blue-400 uppercase tracking-widest">Sponsored Awareness Campaign</span>
                    <span className="bg-amber-500 text-gray-950 text-[7px] font-extrabold px-1.5 py-0.5 rounded font-mono">SPONSORED</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-blue-500 uppercase">Semiconductor safety</span>
                    <h5 className="text-xs font-bold text-gray-905 dark:text-white leading-tight">Implementing green hydrogen standards for wafer logistics</h5>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-normal">
                      Learn how new API registry structures drop transit delays.
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Opening sponsored initiative briefing...")}
                    className="w-full text-center border border-blue-200 dark:border-blue-800 text-blue-605 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
                  >
                    Read Briefing
                  </button>
                </div>

                {/* Newsletter signup */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Global Policy Intelligence Brief
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Receive the most important policy updates, government schemes, reforms and business-impact intelligence.
                  </p>
                  
                  {!subscribedNewsletter ? (
                    <div className="space-y-2">
                      <input 
                        type="email" 
                        placeholder="work@corporation.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
                      />
                      <button 
                        onClick={() => { if (emailInput.trim()) { setSubscribedNewsletter(true); showToast("Subscribed successfully!"); } }}
                        className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Subscribe
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-300 dark:border-emerald-900 text-emerald-850 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Subscribed to Global Policy Briefing!
                    </div>
                  )}
                </div>

              </div>

            </div>
          </section>
        </>
      )}

      {/* ─── Toast Notifications ─── */}
      {toastMsg && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900/95 dark:bg-slate-900/95 text-white border border-slate-800 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 max-w-sm backdrop-blur-xs">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-[11px] font-bold">{toastMsg}</span>
        </div>
      )}

    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Share2, Lock, ChevronRight, Search, AlertTriangle, 
  CheckCircle, ThumbsUp, Bookmark, MessageCircle, ArrowLeft, X, HelpCircle, 
  TrendingUp, Globe, Filter, Star, Briefcase, Eye, ChevronDown, Check,
  Play, Radio, ArrowUpRight, Flame, ShieldAlert, Cpu, Activity, Info, Users
} from "lucide-react";
import { IGEN_50_SECTORS } from "./igenTaxonomyData";

interface Expert {
  id: string;
  name: string;
  avatar: string;
  designation: string;
  organization: string;
  sectorCode: string;
  sectorName: string;
  country: string;
  expertiseList: string[];
  introduction: string;
  latestOpinionTitle: string;
  latestOpinionExcerpt: string;
  publishedCount: number;
  verified: boolean;
  featured: boolean;
  label?: "Rising Expert" | "Top Contributor" | "Industry Specialist" | "Most Followed";
}

interface VideoInsight {
  id: string;
  title: string;
  expertName: string;
  expertAvatar: string;
  sectorName: string;
  duration: string;
  date: string;
  thumbnail: string;
}

interface KnowledgeDocument {
  title: string;
  author: string;
  type: "Expert Report" | "Whitepaper" | "Industry Guide" | "Research" | "Case Study";
  sector: string;
  date: string;
  premium: boolean;
}

interface ExpertQuestion {
  question: string;
  expertName: string;
  expertDesignation: string;
  sector: string;
  answerPreview: string;
  date: string;
}

const MOCK_GLOBAL_EXPERTS: Expert[] = [
  {
    id: "sme-all-1",
    name: "Dr. Aris Thorne",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    designation: "AI Governance Director",
    organization: "Sovereign AI Alliance",
    sectorCode: "S02",
    sectorName: "AI & Cyber Security",
    country: "Global",
    expertiseList: ["Sovereign Databases", "GPU Audits", "Model Relocations"],
    introduction: "Dr. Thorne advises enterprise boards on database sovereignty compliance and GPU cluster migrations across APAC.",
    latestOpinionTitle: "The CapEx Reality of Sovereign AI Datacenter Audits",
    latestOpinionExcerpt: "Migrating training logs to national networks will inflate infrastructure capital budgets by 14% for multi-regional hosting models.",
    publishedCount: 32,
    verified: true,
    featured: true,
    label: "Top Contributor"
  },
  {
    id: "sme-all-2",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    designation: "Procurement Advisor",
    organization: "Automotive Grid Council",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    country: "Germany",
    expertiseList: ["Cell Geometries", "Sodium Raw Sourcing", "Sourcing Logistics"],
    introduction: "Elena Rostova specializes in battery raw material procurement planning and cell geometry supply hedging grids.",
    latestOpinionTitle: "Hedging Spot Sodium Price Volatilities in EV Grids",
    latestOpinionExcerpt: "EV cell builders must lift sodium chemistry buffer targets by 4% to protect capital margins from active spot variations.",
    publishedCount: 19,
    verified: true,
    featured: true,
    label: "Rising Expert"
  },
  {
    id: "sme-all-3",
    name: "Satoshi Yamamoto",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    designation: "Senior Policy Advisor",
    organization: "Wafer Logistics Consortium",
    sectorCode: "S46",
    sectorName: "Semiconductors & OSAT",
    country: "Japan",
    expertiseList: ["Equipment Logistics", "Wafer Assembly", "Bilateral Clearances"],
    introduction: "Satoshi research centers on bilateral equipment export treaties and legacy silicon packaging corridors.",
    latestOpinionTitle: "Legacy Equipment export restrictions shift SEA Assembly Fabs",
    latestOpinionExcerpt: "Equipment builders must route logistics schedules to compliant ports or face verification holds.",
    publishedCount: 26,
    verified: true,
    featured: false,
    label: "Industry Specialist"
  }
];

const MOCK_VIDEOS: VideoInsight[] = [
  { id: "vid-all-1", title: "Sovereign AI GPU Datacenter Auditing blueprint", expertName: "Dr. Aris Thorne", expertAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80", sectorName: "AI & Cyber Security", duration: "12:45", date: "3 days ago", thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80" },
  { id: "vid-all-2", title: "Hedging Spot Sodium cell pricing guides", expertName: "Elena Rostova", expertAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80", sectorName: "EV Battery Geometries", duration: "15:20", date: "1 week ago", thumbnail: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=500&auto=format&fit=crop&q=80" }
];

const MOCK_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  { title: "Bilateral Trade Carbon Tax Compliance Manual", author: "Dr. Aris Thorne", type: "Expert Report", sector: "BFSI & Finance", date: "Aug 2026", premium: true },
  { title: "Standardized Generic API Integration Playbook", author: "Satoshi Yamamoto", type: "Industry Guide", sector: "Healthcare & Pharma", date: "July 2026", premium: false }
];

const MOCK_QUESTIONS: ExpertQuestion[] = [
  { question: "What will AI sovereign hosting mandates mean for SaaS software developers?", expertName: "Dr. Aris Thorne", expertDesignation: "AI Governance Lead", sector: "AI & Cyber Security", answerPreview: "Multi-regional groups must deploy sovereign server cells, increasing database relocation CapEx by 14% to prevent audit fines.", date: "2 days ago" }
];

const MOCK_POLL = {
  question: "What will be the primary battery feedstock geometry target for EV grids in the next 12 months?",
  options: [
    { label: "Sodium-Ion Chemistry", votes: 48 },
    { label: "Lithium-Iron Phosphate (LFP)", votes: 32 },
    { label: "Solid-State Graphene", votes: 20 }
  ],
  totalVotes: 184
};

const MOCK_REGIONS = [
  { name: "Asia-Pacific", experts: 84, topSector: "Semiconductors & AI" },
  { name: "Europe", experts: 62, topSector: "Energy & sustainability" },
  { name: "North America", experts: 78, topSector: "BFSI & Tech Fabs" }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCHeadlinesSMEEditorAllSectors({ onBack }: Props) {
  // Filter states
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedGeographyFilter, setSelectedGeographyFilter] = useState<string>("all");
  const [selectedExpertiseFilter, setSelectedExpertiseFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive UI states
  const [followedExperts, setFollowedExperts] = useState<string[]>([]);
  const [savedOpinions, setSavedOpinions] = useState<string[]>([]);
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // CRM consultation request
  const [consultingExpert, setConsultingExpert] = useState<string | null>(null);
  const [consultingNote, setConsultingNote] = useState("");

  // Expert Alerts Config
  const [alertConfigured, setAlertConfigured] = useState(false);
  const [alertTopicInput, setAlertTopicInput] = useState("AI in manufacturing");

  // AI Chat Assistant
  const [aiChatQuery, setAiChatQuery] = useState("");
  const [aiChatResponse, setAiChatResponse] = useState<string | null>(null);
  const [isAiAnswering, setIsAiAnswering] = useState(false);

  // Guided expert matching wizard
  const [wizardSector, setWizardSector] = useState("AI & Cyber Security");
  const [wizardRequirement, setWizardRequirement] = useState("Compliance Auditing");
  const [matchedExperts, setMatchedExperts] = useState<Expert[]>([]);

  // Loading skeleton simulator
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Active ranking filter
  const [activeRankingFilter, setActiveRankingFilter] = useState<string>("Most Followed");

  // Trigger loading skeleton on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedSectorFilter, selectedExpertiseFilter, selectedGeographyFilter]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleFollowExpert = (id: string) => {
    if (followedExperts.includes(id)) {
      setFollowedExperts(prev => prev.filter(x => x !== id));
      showToast("Unfollowed expert");
    } else {
      setFollowedExperts(prev => [...prev, id]);
      showToast("Following expert! Notification alerts active ✓");
    }
  };

  const handleSaveOpinion = (id: string) => {
    if (savedOpinions.includes(id)) {
      setSavedOpinions(prev => prev.filter(x => x !== id));
      showToast("Removed from Saved Opinions");
    } else {
      setSavedOpinions(prev => [...prev, id]);
      showToast("Saved expert opinion globally ✓");
    }
  };

  const handleAskAi = (q: string) => {
    setAiChatQuery(q);
    setIsAiAnswering(true);
    setTimeout(() => {
      setIsAiAnswering(false);
      if (q.toLowerCase().includes("risk") || q.toLowerCase().includes("trade")) {
        setAiChatResponse("AI analysis of expert logs shows major regulatory compliance risks in sovereign GPU datacenter training workloads relocation, and semiconductor legacy equipment trade blocks.");
      } else if (q.toLowerCase().includes("opportunity") || q.toLowerCase().includes("growth")) {
        setAiChatResponse("Opportunities highlighted by experts include sovereign database compliance audit consulting and API-driven generic pharma customs integrations.");
      } else {
        setAiChatResponse("Subject matter experts predict critical structural shifts in silicon equipment sourcing guidelines and clean energy port linkages CapEx grids.");
      }
    }, 550);
  };

  const handleSearchExpertsWizard = () => {
    // Filter matching experts based on wizard options
    const matches = MOCK_GLOBAL_EXPERTS.filter(exp => 
      exp.sectorName.toLowerCase().includes(wizardSector.toLowerCase()) ||
      exp.expertiseList.some(ex => ex.toLowerCase().includes(wizardRequirement.toLowerCase()))
    );
    setMatchedExperts(matches);
    showToast(`Found ${matches.length} matching experts globally ✓`);
  };

  const handleSendConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultingNote.trim()) return;

    showToast(`Consultation request registered in CRM for ${consultingExpert} ✓ (ID: IGEN-SME-CON-ALL-${Math.floor(1000 + Math.random() * 9000)})`);
    setConsultingExpert(null);
    setConsultingNote("");
  };

  const filteredExperts = MOCK_GLOBAL_EXPERTS.filter(exp => {
    // Search query filter
    const matchesSearch = exp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exp.introduction.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exp.expertiseList.some(ex => ex.toLowerCase().includes(searchQuery.toLowerCase()));

    // Dropdown filters
    const matchesSector = selectedSectorFilter === "all" || exp.sectorName.toLowerCase().includes(selectedSectorFilter.toLowerCase());
    const matchesGeography = selectedGeographyFilter === "all" || exp.country.toLowerCase().includes(selectedGeographyFilter.toLowerCase());
    const matchesExpertise = selectedExpertiseFilter === "all" || exp.expertiseList.some(ex => ex.toLowerCase().includes(selectedExpertiseFilter.toLowerCase()));

    return matchesSearch && matchesSector && matchesGeography && matchesExpertise;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* ─── Breadcrumb ─── */}
      <nav className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 text-xs text-gray-400 font-semibold flex items-center gap-1.5">
        {onBack && (
          <button onClick={onBack} className="mr-2 hover:text-blue-500 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        )}
        <span>Headlines</span>
        <ChevronRight className="h-3 w-3" />
        <span>Subject Matter Expert Editor</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-blue-505 font-bold">All Sector</span>
      </nav>

      {/* ─── Premium SME Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-405 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> SUBJECT MATTER EXPERT EDITOR
              </span>
              <span className="bg-emerald-600/10 text-emerald-600 dark:text-emerald-450 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono flex items-center gap-0.5">
                <Globe className="h-3 w-3" /> Global Expert Network Active
              </span>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Global Subject Matter Expert Intelligence
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              Discover verified experts, specialist opinions, expert knowledge, research, videos and professional perspectives across industries and markets worldwide.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link 
              href="/en/news-poc/headlines/sme-editor/my"
              className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-850 hover:bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
            >
              <Briefcase className="h-4 w-4 text-blue-500" /> Explore My Sectors →
            </Link>
            <button 
              onClick={() => {
                const snapshotSec = document.getElementById("snapshot-anchor");
                if (snapshotSec) snapshotSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Explore Experts
            </button>
          </div>
        </div>

        {/* Global Search & Filters Bar */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search global expert network..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            {/* Sector filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">All Sectors</option>
                <option value="Semiconductors">Semiconductors & OSAT</option>
                <option value="AI">AI & Cyber Security</option>
                <option value="Energy">Energy & Sustainability</option>
                <option value="Pharma">Health & Pharma</option>
              </select>
            </div>

            {/* Geography filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedGeographyFilter}
                onChange={(e) => setSelectedGeographyFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">Global Geography</option>
                <option value="Global">Global/Multilateral</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
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
          {/* ─── Global Expert Snapshot ─── */}
          <section id="snapshot-anchor" className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs text-center text-xs font-semibold">
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-blue-500 text-sm md:text-base block">142</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Verified Experts</span>
              </div>
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-amber-500 text-sm md:text-base block">38</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Active SMEs</span>
              </div>
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-purple-500 text-sm md:text-base block">284</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Expert Insights</span>
              </div>
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-red-500 text-sm md:text-base block">12</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Countries Covered</span>
              </div>
              <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-xl">
                <span className="font-extrabold text-emerald-500 text-sm md:text-base block">50</span>
                <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">Sectors Covered</span>
              </div>
            </div>
          </section>

          {/* ─── Featured Experts ─── */}
          {filteredExperts.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                  Featured Experts
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredExperts.slice(0, 2).map(exp => (
                  <div key={exp.id} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-5 rounded-2xl shadow-sm flex gap-4 items-start font-sans hover:border-blue-500/25 transition-all">
                    <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-150 shrink-0 relative">
                      <img src={exp.avatar} alt={exp.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-extrabold text-gray-900 dark:text-white text-xs">{exp.name}</span>
                          {exp.verified && <span className="text-blue-500 text-[10px]">✓</span>}
                          <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 text-[7px] font-extrabold px-1.5 py-0.2 rounded font-mono uppercase tracking-wider">FEATURED</span>
                        </div>
                        <span className="text-[9px] text-gray-400 block font-normal">
                          {exp.designation} at {exp.organization} • {exp.country}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-normal leading-normal line-clamp-2">"{exp.introduction}"</p>
                      
                      <div className="flex items-center gap-2 pt-1">
                        <Link 
                          href={`/en/news-poc/expert/${exp.id}`}
                          className="bg-blue-605 text-white hover:bg-blue-700 text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider"
                        >
                          View Insights
                        </Link>
                        <button 
                          onClick={() => handleFollowExpert(exp.id)}
                          className="text-[9.5px] font-bold text-gray-500 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 px-2 py-1.5 rounded-lg"
                        >
                          {followedExperts.includes(exp.id) ? "Following ✓" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── Main Two-Column Layout ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* ── LEFT COLUMN: Expert Opinions & insights ── */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Expert Opinions */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Global Expert Opinions
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {filteredExperts.map(exp => (
                      <div key={exp.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3 hover:border-blue-500/20 transition-all group">
                        <div className="flex gap-3 items-center">
                          <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-150 shrink-0">
                            <img src={exp.avatar} alt={exp.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-extrabold text-gray-900 dark:text-white text-xs">{exp.name}</span>
                              {exp.verified && <span className="text-blue-500 text-xs">✓</span>}
                              <span className="text-[9px] text-gray-400">@{exp.organization}</span>
                            </div>
                            <span className="text-[8px] text-gray-400 block font-normal">{exp.sectorName} • {exp.country}</span>
                          </div>
                        </div>

                        <div className="space-y-1 pt-1.5">
                          <h4 className="text-xs md:text-sm font-bold text-gray-905 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                            {exp.latestOpinionTitle}
                          </h4>
                          <p className="text-gray-550 dark:text-gray-400 text-[11px] leading-relaxed font-normal">
                            "{exp.latestOpinionExcerpt}"
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-2 text-[10px] border-t border-gray-50 dark:border-gray-800/40">
                          <span className="text-gray-400 font-semibold">Published {exp.publishedCount} insights</span>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleSaveOpinion(exp.id)}
                              className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                                savedOpinions.includes(exp.id)
                                  ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-955/20"
                                  : "text-gray-550 border-gray-300 dark:border-gray-800"
                              }`}
                            >
                              {savedOpinions.includes(exp.id) ? "Saved ✓" : "Save"}
                            </button>
                            <Link 
                              href={`/en/news-poc/expert/${exp.id}`}
                              className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
                            >
                              Read Opinion →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Expert Insights */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Latest Expert Insights
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                    {[
                      { title: "Sovereign AI datacenter regulatory timelines audit", expert: "Dr. Aris Thorne", type: "Regulatory Insight", sector: "AI & Cyber Security" },
                      { title: "Legacy Wafer packaging logistics alliances SEA", expert: "Satoshi Yamamoto", type: "Trade observation", sector: "Semiconductors" }
                    ].map((row, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="text-blue-500">{row.type}</span>
                          <span className="text-gray-400">{row.sector}</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{row.title}</h4>
                        <span className="text-[9px] text-gray-450 block font-normal">Expert: {row.expert}</span>
                        <button 
                          onClick={() => showToast("Opening latest expert insight panel...")}
                          className="text-[9px] font-bold text-blue-505 hover:underline uppercase block pt-1 border-t border-gray-50 dark:border-gray-800"
                        >
                          Read Insight
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ask an Expert */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-850 p-6 rounded-2xl shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Ask an Expert
                    </h3>
                    <span className="bg-amber-500 text-slate-950 text-[7px] font-extrabold px-1 rounded font-mono">PRO</span>
                  </div>

                  <div className="space-y-3 text-xs font-semibold">
                    <p className="text-gray-500 font-normal leading-relaxed">
                      Submit questions directly to verified subject matter experts across all sectors globally. Receive matching analytics reports.
                    </p>

                    <div className="flex gap-1.5 flex-wrap">
                      {["What will bilateral solar PV grids funding do for rural markets?", "Explain legacys packaging fab equipment export rules."].map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAskAi(q)}
                          className="text-[9.5px] font-bold border border-gray-200 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-900 px-2 py-1 rounded-lg text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-1.5 pt-1">
                      <input 
                        type="text" 
                        placeholder="Ask about active trade clearings..."
                        value={aiChatQuery}
                        onChange={(e) => setAiChatQuery(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[10px] outline-none"
                      />
                      <button 
                        onClick={() => handleAskAi(aiChatQuery)}
                        disabled={isAiAnswering}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3 rounded-lg"
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

                {/* Expert Video Insights */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Expert Video Insights
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_VIDEOS.map(vid => (
                      <div key={vid.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs group">
                        <div className="aspect-video bg-gray-150 relative">
                          <img src={vid.thumbnail} alt={vid.title} className="h-full w-full object-cover" />
                          <button 
                            onClick={() => showToast(`Playing video interview with ${vid.expertName}...`)}
                            className="absolute inset-0 m-auto h-10 w-10 bg-blue-600/90 text-white rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg"
                          >
                            <Play className="h-4.5 w-4.5 fill-white" />
                          </button>
                          <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[8px] px-1 rounded font-mono">
                            {vid.duration}
                          </span>
                        </div>
                        <div className="p-3.5 space-y-1.5 text-xs font-semibold">
                          <div className="flex justify-between items-center text-[9px] text-gray-400">
                            <span>{vid.sectorName}</span>
                            <span>{vid.date}</span>
                          </div>
                          <h4 className="text-gray-900 dark:text-white font-bold leading-snug line-clamp-1">{vid.title}</h4>
                          <span className="text-[9px] text-gray-450 block font-normal font-sans">Expert: {vid.expertName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: Sidebar Widgets ── */}
              <div className="space-y-6">
                
                {/* What Experts Are Talking About */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What Experts Are Talking About
                  </span>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    {[
                      { topic: "Bilateral wafer export treaties", opinions: 28, experts: 14 },
                      { topic: "Sovereign AI GPU datacenter CapEx", opinions: 22, experts: 9 },
                      { topic: "Standardized API generic registries", opinions: 19, experts: 6 }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[10.5px]">
                          <span className="font-bold text-gray-900 dark:text-white">{row.topic}</span>
                          <span className="text-blue-505 font-mono text-[9px]">{row.opinions} opinions</span>
                        </div>
                        <span className="text-[8px] text-gray-400 block font-normal">Active across {row.experts} experts</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experts by Region */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Regional Expert Network
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {MOCK_REGIONS.map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px]">
                        <div>
                          <span className="text-gray-905 dark:text-white block">{row.name}</span>
                          <span className="text-[8px] text-gray-400 block font-normal">Top sector: {row.topSector}</span>
                        </div>
                        <span className="text-blue-500">{row.experts} experts</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Experts & Rising Experts */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Top Experts Across Industries
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_GLOBAL_EXPERTS.map(exp => (
                      <div key={exp.id} className="space-y-1.5 border-b border-gray-50 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center font-semibold">
                          <span className="font-bold text-gray-905 dark:text-white">{exp.name}</span>
                          <span className="text-[8px] bg-blue-50 text-blue-605 dark:bg-blue-955/20 px-1.5 py-0.2 rounded font-mono uppercase">{exp.label}</span>
                        </div>
                        <span className="text-[8px] text-gray-450 block font-normal">
                          {exp.designation} at {exp.organization}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert Rankings */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Expert Rankings
                  </span>
                  
                  <div className="space-y-3">
                    <div className="flex gap-1.5 border-b border-gray-50 dark:border-gray-800 pb-2 overflow-x-auto no-scrollbar text-[9px] font-bold">
                      {["Most Followed", "Most Viewed", "Most Published"].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveRankingFilter(tab)}
                          className={`px-2 py-0.5 rounded transition-colors ${
                            activeRankingFilter === tab 
                              ? "bg-blue-600 text-white" 
                              : "bg-gray-50 text-gray-500 dark:bg-gray-900"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2 text-xs font-semibold">
                      {MOCK_GLOBAL_EXPERTS.map((exp, idx) => (
                        <div key={exp.id} className="flex justify-between text-[10px] items-center">
                          <span className="text-gray-900 dark:text-white">{idx+1}. {exp.name}</span>
                          <span className="text-gray-400 font-mono text-[9px]">{exp.publishedCount} insights</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Featured SMEs */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Featured SMEs
                  </span>
                  
                  <div className="space-y-3.5">
                    {[
                      { name: "Sovereign AI Alliance", logo: "SA", sector: "AI & Cyber Security", location: "Global" },
                      { name: "Automotive Grid Council", logo: "AG", sector: "EV Battery Geometries", location: "Germany" }
                    ].map((sme, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs font-semibold">
                        <div className="flex gap-2 items-center">
                          <div className="h-6 w-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-955/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-blue-600 rounded text-[10px] shrink-0 font-mono">
                            {sme.logo}
                          </div>
                          <div>
                            <span className="font-extrabold text-gray-900 dark:text-white text-xs block">{sme.name}</span>
                            <span className="text-[8px] text-gray-450 block font-normal">{sme.sector} • {sme.location}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => showToast("Opening SME profile panel...")}
                          className="w-full text-center border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 text-[9px] font-bold py-1 rounded transition-colors uppercase"
                        >
                          Explore SME →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert Knowledge Library */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Expert Knowledge Library
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_KNOWLEDGE_DOCS.map((doc, idx) => (
                      <div key={idx} className="space-y-1 border-b border-gray-55 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center font-semibold">
                          <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{doc.title}</span>
                          {doc.premium && <span className="bg-amber-500 text-gray-950 text-[7px] font-extrabold px-1 py-0.2 rounded font-mono">PRO</span>}
                        </div>
                        <div className="flex justify-between text-[8px] text-gray-405">
                          <span>{doc.type} • {doc.sector}</span>
                          <span>{doc.date}</span>
                        </div>
                        <button 
                          onClick={() => showToast(`Opening resource ${doc.title}...`)}
                          className="text-[9px] font-bold text-blue-500 hover:underline uppercase block"
                        >
                          Read Document
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert Q&A */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Expert Q&A
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {MOCK_QUESTIONS.map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <span className="text-gray-900 dark:text-white block line-clamp-2">Q: "{item.question}"</span>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-2.5 rounded-lg border border-gray-100 dark:border-gray-850 text-[10px] font-normal leading-relaxed text-gray-655 dark:text-gray-400">
                          <span className="font-extrabold text-blue-500 block text-[8px] uppercase tracking-wider">Answered by {item.expertName}</span>
                          <p>"{item.answerPreview}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert Polls */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What Experts Think
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    <span className="text-gray-900 dark:text-white block leading-snug">{MOCK_POLL.question}</span>
                    
                    <div className="space-y-2">
                      {MOCK_POLL.options.map((opt, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span>{opt.label}</span>
                            <span className="font-mono">{opt.votes}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: `${opt.votes}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <span className="text-[8px] text-gray-400 block font-normal font-sans">Total participation: {MOCK_POLL.totalVotes} verified experts</span>
                  </div>
                </div>

                {/* Find the Right Expert Guided Match Tool */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 p-5 rounded-2xl shadow-sm space-y-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Find the Right Expert
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    <p className="text-gray-550 font-normal leading-normal">
                      Use our wizard tool to match with verified subject matter experts globally for your specific requirements.
                    </p>

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <span className="text-[8px] text-gray-400 uppercase font-bold">Requirement Target</span>
                        <select 
                          value={wizardRequirement}
                          onChange={(e) => setWizardRequirement(e.target.value)}
                          className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-gray-800 rounded-lg text-xs outline-none"
                        >
                          <option value="Compliance Auditing">Compliance Auditing</option>
                          <option value="Sourcing Logistics">Sourcing Logistics</option>
                          <option value="Model Relocations">Model Relocations</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={handleSearchExpertsWizard}
                      className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                    >
                      Find Expert Matches
                    </button>

                    {matchedExperts.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-[8.5px] text-gray-400 block uppercase">Matched Experts:</span>
                        {matchedExperts.map(exp => (
                          <div key={exp.id} className="flex justify-between items-center text-[10px] font-bold">
                            <span>{exp.name} ({exp.organization})</span>
                            <button 
                              onClick={() => setConsultingExpert(exp.name)}
                              className="text-blue-500 hover:underline text-[9.5px] uppercase"
                            >
                              Connect →
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Premium Expert Intelligence upsell */}
                <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white border border-indigo-900/60 p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Unlock Premium Expert Intelligence
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    Secure institutional clearance to submit custom consultation questions and download playbooks.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-350 font-semibold">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Submit questions to verified specialists
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Full access to playbooks and guides
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Dials tracking expert activity momentum
                    </li>
                  </ul>

                  <button 
                    onClick={() => showToast("Opening premium checkout flow...")}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Unlock Expert Intelligence
                  </button>
                </div>

                {/* Become a Featured SME */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <h4 className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider">
                    Showcase Your Expertise
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal font-sans">
                    Build visibility, establish authority and connect with businesses looking for trusted specialist knowledge.
                  </p>
                  <button 
                    onClick={() => showToast("Opening SME onboarding registry...")}
                    className="w-full text-center bg-[#1D1D46] hover:bg-[#152e4f] text-white text-xs font-bold py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Become a Featured SME
                  </button>
                </div>

                {/* Sponsored Expert Content */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-900/5 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Sponsored Expert Insight</span>
                    <span className="bg-amber-500 text-gray-950 text-[7px] font-extrabold px-1.5 py-0.5 rounded font-mono">SPONSORED</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-blue-500 uppercase">Sourcing webinars</span>
                    <h5 className="text-xs font-bold text-gray-905 dark:text-white leading-tight">Managing bilateral semiconductor custom clearances</h5>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-normal">
                      Learn how new API registry structures drop transit delays.
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Opening sponsored webinar panel...")}
                    className="w-full text-center border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
                  >
                    Watch Webinar
                  </button>
                </div>

                {/* Expert Newsletter brief */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Expert Intelligence Brief
                  </h4>
                  <p className="text-[10px] text-gray-555 dark:text-gray-400 leading-relaxed font-normal">
                    Receive the most relevant expert opinions, insights and knowledge from the sectors you follow.
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
                    <div className="bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Subscribed to Expert Briefing!
                    </div>
                  )}
                </div>

              </div>

            </div>
          </section>
        </>
      )}

      {/* ─── CRM Connect Expert Modal ─── */}
      {consultingExpert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold font-bold">
                  Expert Consultation Request
                </h3>
                <span className="text-[10px] text-gray-400 block font-normal font-sans">Request direct meeting/opinion from {consultingExpert}</span>
              </div>
              <button 
                onClick={() => setConsultingExpert(null)}
                className="p-1.5 rounded-lg hover:bg-gray-150 dark:hover:bg-gray-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSendConsultation} className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[8px] text-gray-400 uppercase font-bold">Consultation details / Notes</span>
                <textarea 
                  required
                  rows={4}
                  value={consultingNote}
                  onChange={(e) => setConsultingNote(e.target.value)}
                  placeholder={`Describe your request or business query for ${consultingExpert}...`}
                  className="w-full p-3 rounded-xl border border-gray-250 dark:border-gray-850 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500 text-gray-955 dark:text-white"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2.5 rounded-xl transition-colors uppercase text-xs shadow-md shadow-blue-900/10"
              >
                Submit Consultation Request
              </button>
            </form>
          </div>
        </div>
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

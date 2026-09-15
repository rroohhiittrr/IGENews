"use client";

import React, { useState } from "react";
import { 
  BarChart3, TrendingUp, TrendingDown, Info, Calendar, Download, 
  ChevronRight, Check, X, Users, Lock, Sparkles, Filter, Eye, 
  Search, ExternalLink, ShieldCheck, Award, Crown, Zap, FileSpreadsheet,
  Building2, Globe, MapPin, Briefcase, Plus, ArrowUpRight, ChevronDown,
  Layers, MessageSquare, ThumbsUp, Repeat, UserPlus, SlidersHorizontal
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface SmeAnalyticsHubProps {
  currentTier: "free" | "pro" | "elite" | "sovereign";
  role?: "sme" | "associate-sme" | "leader";
  userName?: string;
}

export default function SmeAnalyticsHub({
  currentTier = "free",
  role = "sme",
  userName = "Specialist",
}: SmeAnalyticsHubProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const isFree = currentTier === "free";
  const isPro = currentTier === "pro";
  const isElite = currentTier === "elite";
  const isSovereign = currentTier === "sovereign";

  // Sub-Tab Tier Gating Helper
  const isSubTabUnlocked = (tabId: string) => {
    if (isFree) return false;
    if (isPro) return tabId === "content" || tabId === "visitors" || tabId === "followers";
    if (isElite) return tabId !== "leads";
    return true; // Sovereign unlocks all 6
  };

  const renderLockedSubTabTeaser = (tabName: string, requiredTier: "Elite" | "Sovereign") => (
    <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-xl p-8 text-center my-6">
      <div className="max-w-md bg-white dark:bg-[#122238] rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white space-y-5 mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <span className="text-[10px] font-black tracking-widest uppercase text-amber-500">
            TIER LOCK · REQUIRES {requiredTier.toUpperCase()}
          </span>
          <h3 className="text-xl font-bold tracking-tight">
            {tabName} is Locked on {currentTier.toUpperCase()} Plan
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Upgrade your {role === "sme" ? "SME" : role === "leader" ? "Leader" : "Associate SME"} profile to {requiredTier} tier to unlock real-time {tabName.toLowerCase()} and comprehensive intelligence insights.
          </p>
        </div>
        <Link
          href={`/${locale}/profile/plans/${role}`}
          className="w-full py-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-amber-500 hover:from-violet-700 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Upgrade to {requiredTier} to Unlock</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );

  // Active Sub-Tab: "content" | "visitors" | "followers" | "search" | "competitors" | "leads"
  const [activeSubTab, setActiveSubTab] = useState<
    "content" | "visitors" | "followers" | "search" | "competitors" | "leads"
  >("content");

  // Date Range Dropdown State
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [customCalendarModal, setCustomCalendarModal] = useState(false);

  // Compare Plans Modal State
  const [comparePlansModalOpen, setComparePlansModalOpen] = useState(false);

  // Content Analytics State
  const [contentMetric, setContentMetric] = useState<
    "impressions" | "unique_views" | "clicks" | "reactions" | "comments" | "reposts"
  >("impressions");
  const [contentMetricOpen, setContentMetricOpen] = useState(false);
  const [contentTabFilter, setContentTabFilter] = useState<"all" | "articles" | "media" | "documents">("all");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  // Visitor Analytics State
  const [visitorDesktopChecked, setVisitorDesktopChecked] = useState(true);
  const [visitorMobileChecked, setVisitorMobileChecked] = useState(true);
  const [visitorPageFilter, setVisitorPageFilter] = useState<"all" | "overview" | "vision" | "updates" | "offerings" | "team">("all");
  const [visitorPageModalOpen, setVisitorPageModalOpen] = useState(false);
  const [visitorDemographicTab, setVisitorDemographicTab] = useState<"size" | "industry" | "location" | "seniority">("size");
  const [dismissVisitorBanner, setDismissVisitorBanner] = useState(false);

  // Followers Analytics State
  const [followerSponsoredChecked, setFollowerSponsoredChecked] = useState(true);
  const [followerOrganicChecked, setFollowerOrganicChecked] = useState(true);
  const [followerAutoInvitedChecked, setFollowerAutoInvitedChecked] = useState(true);
  const [followerDemographicsShowAll, setFollowerDemographicsShowAll] = useState(false);
  const [allFollowersModalOpen, setAllFollowersModalOpen] = useState(false);
  const [followerRosterTab, setFollowerRosterTab] = useState<"people" | "pages">("people");
  const [followerHoverPoint, setFollowerHoverPoint] = useState<any | null>(null);

  // Search Appearances State
  const [searchDemographicTab, setSearchDemographicTab] = useState<"company" | "industry">("company");

  // Competitor Analytics State
  const [editCompetitorsModalOpen, setEditCompetitorsModalOpen] = useState(false);
  const [trackedCompetitors, setTrackedCompetitors] = useState([
    { id: 1, name: "Gartner", followers: "2.25M", newFollowers: "+1,420", posts: 18, comments: 24, reactions: 380, logo: "📊" },
    { id: 2, name: "World Economic Forum", followers: "5.61M", newFollowers: "+3,180", posts: 42, comments: 110, reactions: 1250, logo: "🌐" },
    { id: 3, name: "CXO Lanes", followers: "508K", newFollowers: "+620", posts: 12, comments: 14, reactions: 190, logo: "💎" },
    { id: 4, name: "FICCI", followers: "243K", newFollowers: "+310", posts: 8, comments: 9, reactions: 115, logo: "🏛️" },
    { id: 5, name: "ASSOCHAM", followers: "113K", newFollowers: "+180", posts: 6, comments: 5, reactions: 84, logo: "🇮🇳" },
  ]);
  const maxCompetitors = isSovereign ? 25 : isElite ? 10 : isPro ? 3 : 0;

  // Leads Analytics State
  const [leadsPreviewEmpty, setLeadsPreviewEmpty] = useState(false);
  const [leadsExportToast, setLeadsExportToast] = useState(false);

  // Mock Posts Data
  const samplePosts = [
    {
      id: "p1",
      title: "Macro Tariff Adjustments & API Manufacturing Competitiveness in India (2026)",
      type: "articles",
      timestamp: "Aug 28, 2026",
      impressions: 4820,
      clicks: 340,
      ctr: "7.05%",
      likes: 184,
      comments: 32,
      reposts: 14,
      engagementRate: "11.8%",
      excerpt: "Deep policy dive into how domestic PLI schemes are reducing active pharmaceutical ingredient reliance on imported foreign intermediaries."
    },
    {
      id: "p2",
      title: "Infographic: Bilateral GCC-India Supply Chain Trade Corridors",
      type: "media",
      timestamp: "Aug 22, 2026",
      impressions: 2950,
      clicks: 195,
      ctr: "6.61%",
      likes: 112,
      comments: 18,
      reposts: 9,
      engagementRate: "10.4%",
      excerpt: "Visual mapping of container logistics throughput from Jebel Ali Port to JNPT Mumbai."
    },
    {
      id: "p3",
      title: "Quarterly SME Trade Index & Reserve Bank Policy Outlook Report",
      type: "documents",
      timestamp: "Aug 15, 2026",
      impressions: 1840,
      clicks: 142,
      ctr: "7.71%",
      likes: 89,
      comments: 14,
      reposts: 6,
      engagementRate: "11.3%",
      excerpt: "Official 24-page analytical whitepaper on interest rate trajectories and credit lines for manufacturing MSMEs."
    }
  ];

  // Mock Leads Data
  const sampleLeads = [
    { id: 1, name: "Karan Johar", title: "VP Supply Chain", org: "Reliance Trade Logistics", email: "karan.j@reliancetrade.com", date: "Sep 01, 2026", status: "New", topic: "Cross-border Tariff Advisory" },
    { id: 2, name: "Shreya Venkat", title: "Chief Investment Officer", org: "Apex Capital India", email: "shreya.v@apexcap.in", date: "Aug 29, 2026", status: "Contacted", topic: "Cross-Border Trade Briefing" },
    { id: 3, name: "Rohan Singhania", title: "Managing Director", org: "Singhania Pharma Exports", email: "r.singhania@singhaniapharma.com", date: "Aug 24, 2026", status: "Qualified", topic: "Executive Board Advisory" }
  ];

  // CSV Lead Export Function
  const handleExportLeadsCSV = () => {
    const headers = "Lead Name,Title,Organization,Email,Submission Date,Status,Topic\n";
    const rows = sampleLeads.map(l => `"${l.name}","${l.title}","${l.org}","${l.email}","${l.date}","${l.status}","${l.topic}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sme-analytics-leads-${role}-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    setLeadsExportToast(true);
    setTimeout(() => setLeadsExportToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* EXECUTIVE TIER HEADER BANNER                                              */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10 backdrop-blur-md">
                ANALYTICS & READERSHIP HUB
              </span>

              {/* Tier Badge Indicator */}
              {isFree && (
                <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" /> FREE TIER (LOCKED)
                </span>
              )}
              {isPro && (
                <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" /> {role.toUpperCase()} PRO ACTIVE
                </span>
              )}
              {isElite && (
                <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 flex items-center gap-1">
                  <Crown className="w-3 h-3 text-violet-400 fill-violet-400" /> {role.toUpperCase()} ELITE ACTIVE
                </span>
              )}
              {isSovereign && (
                <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400 fill-amber-400" /> {role.toUpperCase()} SOVEREIGN LEGEND
                </span>
              )}
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              {userName}'s Intelligence Performance
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Track content impression reach, visitor profiles, verified connection followers, search term index, competitor growth metrics, and high-intent inquiry leads.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setComparePlansModalOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold transition-all border border-white/10 flex items-center gap-2 backdrop-blur-md"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-300" />
              <span>Compare Plan Differences</span>
            </button>

            {!isFree && (
              <button
                onClick={handleExportLeadsCSV}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data (.CSV)</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: "content", label: "Content Analytics", icon: BarChart3 },
            { id: "visitors", label: "Visitors Analytics", icon: Users },
            { id: "followers", label: "Followers Analytics", icon: UserPlus },
            { id: "search", label: "Search Appearances", icon: Search },
            { id: "competitors", label: "Competitors Analytics", icon: Building2 },
            { id: "leads", label: "Leads Analytics", icon: FileSpreadsheet },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            const isUnlocked = isSubTabUnlocked(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {!isUnlocked && (
                  <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Export Toast Notification */}
      {leadsExportToast && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center justify-between text-xs font-bold animate-bounce">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>CSV analytics data successfully exported to your downloads folder!</span>
          </div>
          <button onClick={() => setLeadsExportToast(false)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FREE TIER ZERO-ACCESS CANVAS (WHEN IN FREE TIER)                          */}
      {/* ========================================================================= */}
      {isFree ? (
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-xl p-8 text-center">
          
          {/* Blurred Background Teaser */}
          <div className="filter blur-md opacity-30 select-none pointer-events-none space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
            <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          </div>

          {/* Central Glassmorphic Overlay Hero Card */}
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md z-20">
            <div className="max-w-lg bg-white dark:bg-[#122238] rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white space-y-6">
              
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-500">
                  FREE TIER LIMITATION
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  Analytics Hub is Locked on Free Tier
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Upgrade your {role === "sme" ? "SME" : role === "leader" ? "Leader" : "Associate SME"} profile to access real-time readership insights, visitor traffic metrics, 3-series follower charts, competitor benchmarking, and 1-click lead downloads.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 text-left pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>30d to 365d Trend Charts</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Desktop vs Mobile Traffic</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Competitor Benchmarking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>1-Click CSV Leads Export</span>
                </div>
              </div>

              {/* Upgrade Action CTA */}
              <Link
                href={`/${locale}/profile/plans/${role}`}
                className="w-full py-4 bg-gradient-to-r from-[#0642BA] via-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Upgrade to {role === "sme" ? "SME Pro" : role === "leader" ? "Pioneer" : "ASME Pro"} to Unlock</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* SHARED GLOBAL FILTER & DATE RANGE BAR                                    */}
          {/* ========================================================================= */}
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Reporting Date Window:</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setDateRangeOpen(!dateRangeOpen)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-all border border-slate-200 dark:border-slate-700"
              >
                <span>{dateRange}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dateRangeOpen ? "rotate-180" : ""}`} />
              </button>

              {dateRangeOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#122238] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2 z-30 space-y-1 text-xs font-medium">
                  {[
                    { label: "Last 7 days", range: "Aug 26 - Sep 02, 2026", allowed: true },
                    { label: "Last 30 days (Recommended)", range: "Aug 04 - Sep 02, 2026", allowed: true },
                    { label: "Last 90 days", range: "Jun 04 - Sep 02, 2026", allowed: isElite || isSovereign },
                    { label: "Last 365 days (1 Year)", range: "Sep 02, 2025 - Sep 02, 2026", allowed: isElite || isSovereign },
                    { label: "Custom Range...", range: "Custom Calendar Window", allowed: isSovereign },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!item.allowed) return;
                        if (item.label.includes("Custom")) {
                          setCustomCalendarModal(true);
                        } else {
                          setDateRange(item.label);
                        }
                        setDateRangeOpen(false);
                      }}
                      disabled={!item.allowed}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                        dateRange === item.label
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold"
                          : item.allowed
                          ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                          : "text-slate-400 dark:text-slate-600 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div>
                        <span className="block font-bold">{item.label}</span>
                        <span className="text-[10px] text-slate-400 block">{item.range}</span>
                      </div>
                      {!item.allowed && <Lock className="w-3 h-3 text-amber-500" />}
                      {dateRange === item.label && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SUB-TAB 1: CONTENT ANALYTICS                                              */}
          {/* ========================================================================= */}
          {activeSubTab === "content" && (
            <div className="space-y-6">
              
              {/* Post KPI Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Impressions", val: "14,820", change: "+28.4%", icon: Eye, color: "emerald" },
                  { label: "Engagements", val: "1,940", change: "+16.2%", icon: ThumbsUp, color: "blue" },
                  { label: "Click CTR", val: "7.05%", change: "+1.8%", icon: ArrowUpRight, color: "indigo" },
                  { label: "Reactions", val: "680", change: "+12.0%", icon: Sparkles, color: "amber" },
                  { label: "Comments", val: "142", change: "+8.5%", icon: MessageSquare, color: "violet" },
                  { label: "Reposts", val: "48", change: "+24.0%", icon: Repeat, color: "sky" },
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{kpi.label}</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{kpi.val}</div>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> {kpi.change}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Line Trend Chart */}
              <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Content Performance Trend</h3>
                    <p className="text-xs text-slate-400">Visualizing real-time readership metrics over selected date window.</p>
                  </div>

                  {/* Metric Switcher */}
                  <div className="relative">
                    <button
                      onClick={() => setContentMetricOpen(!contentMetricOpen)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                    >
                      <span className="capitalize">{contentMetric.replace("_", " ")}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${contentMetricOpen ? "rotate-180" : ""}`} />
                    </button>

                    {contentMetricOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#122238] border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-1.5 z-30 space-y-1 text-xs">
                        {["impressions", "unique_views", "clicks", "reactions", "comments", "reposts"].map((m) => (
                          <button
                            key={m}
                            onClick={() => {
                              setContentMetric(m as any);
                              setContentMetricOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg font-semibold capitalize ${
                              contentMetric === m
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            {m.replace("_", " ")}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* SVG Spline Graph */}
                <div className="h-64 w-full relative pt-4">
                  <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="contentGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,160 Q 100,60 200,120 T 400,40 T 600,100 T 700,20 L 700,200 L 0,200 Z"
                      fill="url(#contentGrad)"
                    />
                    <path
                      d="M 0,160 Q 100,60 200,120 T 400,40 T 600,100 T 700,20"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mt-2">
                    <span>Aug 04</span>
                    <span>Aug 11</span>
                    <span>Aug 18</span>
                    <span>Aug 25</span>
                    <span>Sep 02</span>
                  </div>
                </div>
              </div>

              {/* Content Engagement Table */}
              <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Individual Content Engagement</h3>
                  
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                    {["all", "articles", "media", "documents"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setContentTabFilter(tab as any)}
                        className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                          contentTabFilter === tab
                            ? "bg-white dark:bg-[#122238] text-slate-900 dark:text-white shadow-xs"
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                        <th className="p-3.5">Title</th>
                        <th className="p-3.5">Format</th>
                        <th className="p-3.5">Date</th>
                        <th className="p-3.5 text-right">Impressions</th>
                        <th className="p-3.5 text-right">CTR</th>
                        <th className="p-3.5 text-right">Reactions</th>
                        <th className="p-3.5 text-right">Engagement</th>
                        <th className="p-3.5 text-center">Drilldown</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {samplePosts
                        .filter(p => contentTabFilter === "all" || p.type === contentTabFilter)
                        .map(post => (
                          <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all">
                            <td className="p-3.5 font-bold text-slate-900 dark:text-white max-w-sm truncate">{post.title}</td>
                            <td className="p-3.5"><span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold capitalize">{post.type}</span></td>
                            <td className="p-3.5 text-slate-400 text-[11px]">{post.timestamp}</td>
                            <td className="p-3.5 text-right font-mono font-bold text-slate-900 dark:text-white">{post.impressions}</td>
                            <td className="p-3.5 text-right font-mono text-emerald-600 font-bold">{post.ctr}</td>
                            <td className="p-3.5 text-right font-mono font-bold text-blue-600">{post.likes}</td>
                            <td className="p-3.5 text-right font-mono text-indigo-600 font-bold">{post.engagementRate}</td>
                            <td className="p-3.5 text-center">
                              <button
                                onClick={() => setSelectedPost(post)}
                                className="px-3 py-1 bg-slate-100 hover:bg-blue-50 text-blue-600 dark:bg-slate-800 dark:hover:bg-blue-950/40 rounded-lg text-[11px] font-bold transition-all"
                              >
                                Performance →
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 2: VISITORS ANALYTICS                                             */}
          {/* ========================================================================= */}
          {activeSubTab === "visitors" && (
            <div className="space-y-6">
              
              {/* Visitor Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Page Views</span>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">4,820</div>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +18.4% vs prior 30 days</span>
                </div>
                <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Unique Visitors</span>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">2,140</div>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +14.2% vs prior 30 days</span>
                </div>
                <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Custom Button Clicks</span>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">184</div>
                  <span className="text-xs text-indigo-600 font-bold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> High Advisory Intent</span>
                </div>
              </div>

              {/* Dual-Line Desktop vs Mobile Chart */}
              <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Traffic Breakdown (Desktop vs Mobile)</h3>
                  
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <label className="flex items-center gap-2 cursor-pointer text-blue-600">
                      <input
                        type="checkbox"
                        checked={visitorDesktopChecked}
                        onChange={(e) => setVisitorDesktopChecked(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Desktop Traffic</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-emerald-600">
                      <input
                        type="checkbox"
                        checked={visitorMobileChecked}
                        onChange={(e) => setVisitorMobileChecked(e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>Mobile Traffic</span>
                    </label>
                  </div>
                </div>

                <div className="h-56 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                    {visitorDesktopChecked && (
                      <path
                        d="M 0,140 Q 150,40 300,90 T 600,30 T 700,60"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    )}
                    {visitorMobileChecked && (
                      <path
                        d="M 0,170 Q 150,110 300,140 T 600,80 T 700,100"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                      />
                    )}
                  </svg>
                </div>
              </div>

              {/* Visitor Demographics */}
              <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Visitor Demographics Breakdown</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-3">
                    <span className="font-bold text-slate-400 uppercase">Industry Sector</span>
                    {[
                      { name: "Pharmaceuticals & APIs", pct: "44%" },
                      { name: "Banking & Financial Services", pct: "26%" },
                      { name: "Supply Chain & Logistics", pct: "18%" },
                    ].map((row, i) => (
                      <div key={i}>
                        <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                          <span>{row.name}</span>
                          <span>{row.pct}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: row.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-3">
                    <span className="font-bold text-slate-400 uppercase">Organization Size</span>
                    {[
                      { name: "10,001+ Employees", pct: "52%" },
                      { name: "1,001 - 5,000 Employees", pct: "30%" },
                      { name: "201 - 1,000 Employees", pct: "18%" },
                    ].map((row, i) => (
                      <div key={i}>
                        <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                          <span>{row.name}</span>
                          <span>{row.pct}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: row.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-3">
                    <span className="font-bold text-slate-400 uppercase">Seniority Level</span>
                    {[
                      { name: "C-Suite & Board Members", pct: "38%" },
                      { name: "VP & Managing Directors", pct: "34%" },
                      { name: "Senior Strategy Leads", pct: "28%" },
                    ].map((row, i) => (
                      <div key={i}>
                        <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                          <span>{row.name}</span>
                          <span>{row.pct}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: row.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 3: FOLLOWERS ANALYTICS                                            */}
          {/* ========================================================================= */}
          {activeSubTab === "followers" && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Total Profile Followers</span>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">12,480</div>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +840 new this month</span>
                </div>
                <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">30-Day Net Growth Rate</span>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">+7.2%</div>
                  <span className="text-xs text-blue-600 font-bold flex items-center gap-1"><UserPlus className="w-3.5 h-3.5" /> 82% Organic Leaders</span>
                </div>
              </div>

              {/* 3-Series SVG Line Chart */}
              <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Follower Acquisition Series</h3>
                  
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <label className="flex items-center gap-1.5 cursor-pointer text-emerald-600">
                      <input type="checkbox" checked={followerOrganicChecked} onChange={e => setFollowerOrganicChecked(e.target.checked)} className="rounded" />
                      <span>Organic</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-blue-600">
                      <input type="checkbox" checked={followerAutoInvitedChecked} onChange={e => setFollowerAutoInvitedChecked(e.target.checked)} className="rounded" />
                      <span>Auto-Invited</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-violet-600">
                      <input type="checkbox" checked={followerSponsoredChecked} onChange={e => setFollowerSponsoredChecked(e.target.checked)} className="rounded" />
                      <span>Sponsored</span>
                    </label>
                  </div>
                </div>

                <div className="h-56 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                    {followerOrganicChecked && (
                      <path d="M 0,160 Q 200,80 400,100 T 700,30" fill="none" stroke="#10b981" strokeWidth="3" />
                    )}
                    {followerAutoInvitedChecked && (
                      <path d="M 0,180 Q 200,120 400,140 T 700,70" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="4 4" />
                    )}
                    {followerSponsoredChecked && (
                      <path d="M 0,190 Q 200,170 400,160 T 700,120" fill="none" stroke="#8b5cf6" strokeWidth="3" />
                    )}
                  </svg>
                </div>
              </div>

              {/* Followers Directory Modal Trigger */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 flex items-center justify-between flex-wrap gap-4 shadow-xl">
                <div>
                  <h4 className="text-base font-bold">All Followers Directory Roster</h4>
                  <p className="text-xs text-slate-400">Inspect verified individuals and organizations following your intelligence page.</p>
                </div>
                <button
                  onClick={() => setAllFollowersModalOpen(true)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Open Followers Roster Directory →
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 4: SEARCH APPEARANCES                                             */}
          {/* ========================================================================= */}
          {activeSubTab === "search" && (
            !isSubTabUnlocked("search") ? (
              renderLockedSubTabTeaser("Search Appearances", "Elite")
            ) : (
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#0f172a] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Search Frequency</span>
                      <div className="text-3xl font-black text-slate-900 dark:text-white">1,420 Searches</div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-200">
                      ▲ 34.2% Search Frequency Growth
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase">Top Search Query Keywords</h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {[
                        { tag: "SME Trade Policy India", pct: "38%" },
                        { tag: "API Manufacturing PLI", pct: "26%" },
                        { tag: "GCC Export Corridors", pct: "19%" },
                        { tag: "Tariff Rates 2026", pct: "12%" },
                        { tag: "Bi-lateral Trade Briefings", pct: "5%" },
                      ].map((kw, i) => (
                        <span key={i} className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                          <span>{kw.tag}</span>
                          <span className="text-[10px] text-emerald-600 font-mono">{kw.pct}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 5: COMPETITORS ANALYTICS                                         */}
          {/* ========================================================================= */}
          {activeSubTab === "competitors" && (
            !isSubTabUnlocked("competitors") ? (
              renderLockedSubTabTeaser("Competitors Analytics", "Elite")
            ) : (
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#0f172a] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Learn From Other Pages (Benchmarking)</h3>
                      <p className="text-xs text-slate-400">Tracking {trackedCompetitors.length} of {maxCompetitors} allowed peer organizations.</p>
                    </div>
                    <button
                      onClick={() => setEditCompetitorsModalOpen(true)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Edit Tracked Competitors ({trackedCompetitors.length}/{maxCompetitors})
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                          <th className="p-3.5">Organization</th>
                          <th className="p-3.5 text-right">Total Followers</th>
                          <th className="p-3.5 text-right">New Followers</th>
                          <th className="p-3.5 text-right">Posts</th>
                          <th className="p-3.5 text-right">Comments</th>
                          <th className="p-3.5 text-right">Reactions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {trackedCompetitors.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all">
                            <td className="p-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <span className="text-base">{c.logo}</span>
                              <span>{c.name}</span>
                            </td>
                            <td className="p-3.5 text-right font-mono font-bold">{c.followers}</td>
                            <td className="p-3.5 text-right font-mono text-emerald-600 font-bold">{c.newFollowers}</td>
                            <td className="p-3.5 text-right font-mono">{c.posts}</td>
                            <td className="p-3.5 text-right font-mono">{c.comments}</td>
                            <td className="p-3.5 text-right font-mono text-blue-600 font-bold">{c.reactions}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 6: LEADS ANALYTICS                                                */}
          {/* ========================================================================= */}
          {activeSubTab === "leads" && (
            !isSubTabUnlocked("leads") ? (
              renderLockedSubTabTeaser("Leads Analytics", "Sovereign")
            ) : (
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#0f172a] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Download Inquiry Leads</h3>
                      <p className="text-xs text-slate-400">Direct commercial and strategic inquiries submitted through your SME profile.</p>
                    </div>

                    <button
                      onClick={handleExportLeadsCSV}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download All (.CSV)</span>
                    </button>
                  </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                        <th className="p-3.5">Lead Name</th>
                        <th className="p-3.5">Title & Org</th>
                        <th className="p-3.5">Topic</th>
                        <th className="p-3.5">Submission Date</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-center">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {sampleLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all">
                          <td className="p-3.5 font-bold text-slate-900 dark:text-white">{lead.name}</td>
                          <td className="p-3.5 text-slate-500"><div>{lead.title}</div><div className="font-bold text-slate-700 dark:text-slate-300">{lead.org}</div></td>
                          <td className="p-3.5 font-medium">{lead.topic}</td>
                          <td className="p-3.5 text-slate-400">{lead.date}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              lead.status === "New" ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40" :
                              lead.status === "Contacted" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40" :
                              "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40"
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-center">
                            <a href={`mailto:${lead.email}`} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg text-[11px] font-bold text-slate-800 dark:text-slate-200">
                              Email Lead
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        )}
      </>
    )}

      {/* ========================================================================= */}
      {/* COMPARE PLAN DIFFERENCES MODAL                                           */}
      {/* ========================================================================= */}
      {comparePlansModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-white dark:bg-[#122238] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase block">VISUAL TIER MATRIX</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Compare Analytics Plan Capabilities</h3>
              </div>
              <button
                onClick={() => setComparePlansModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3 font-bold text-slate-500">Analytics Feature</th>
                    <th className="p-3 font-bold text-slate-400 text-center">Free Profile (₹0)</th>
                    <th className="p-3 font-bold text-emerald-600 text-center">Pro Plan</th>
                    <th className="p-3 font-bold text-violet-600 text-center">Elite Plan</th>
                    <th className="p-3 font-bold text-amber-600 text-center">Sovereign Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold">Sub-Tab Access Scope</td>
                    <td className="p-3 text-center text-slate-400">❌ 0 Sub-Tabs (Locked Teaser)</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">🟢 3 Sub-Tabs Unlocked</td>
                    <td className="p-3 text-center text-violet-600 font-bold">🟣 5 Sub-Tabs Unlocked</td>
                    <td className="p-3 text-center text-amber-600 font-bold">👑 6 Sub-Tabs (Full Access)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Content, Visitors & Followers Analytics</td>
                    <td className="p-3 text-center text-slate-400">🔒 Teaser Canvas</td>
                    <td className="p-3 text-center text-emerald-600 font-bold">✅ Unlocked (30-Day Range)</td>
                    <td className="p-3 text-center text-violet-600 font-bold">✅ Unlocked (90d / 365d)</td>
                    <td className="p-3 text-center text-amber-600 font-bold">✅ Unlocked (All-Time & Custom)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Search Appearances & Keyword Index</td>
                    <td className="p-3 text-center text-slate-400">🔒 Teaser Canvas</td>
                    <td className="p-3 text-center text-slate-400">🔒 Locked (Requires Elite)</td>
                    <td className="p-3 text-center font-bold text-violet-600">✅ Unlocked</td>
                    <td className="p-3 text-center font-bold text-amber-600">✅ Unlocked</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Competitor Analytics & Benchmarking</td>
                    <td className="p-3 text-center text-slate-400">🔒 Teaser Canvas</td>
                    <td className="p-3 text-center text-slate-400">🔒 Locked (Requires Elite)</td>
                    <td className="p-3 text-center text-violet-600 font-bold">✅ Benchmarking (Up to 10 Org)</td>
                    <td className="p-3 text-center text-amber-600 font-bold">✅ Benchmarking (Up to 25 Org)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Leads Analytics & 1-Click .CSV Export</td>
                    <td className="p-3 text-center text-slate-400">🔒 Teaser Canvas</td>
                    <td className="p-3 text-center text-slate-400">🔒 Locked (Requires Sovereign)</td>
                    <td className="p-3 text-center text-slate-400">🔒 Locked (Requires Sovereign)</td>
                    <td className="p-3 text-center text-amber-600 font-bold">👑 Unlocked + .CSV Export</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setComparePlansModalOpen(false)}
                className="px-6 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl text-xs font-bold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POST PERFORMANCE DRILLDOWN MODAL                                         */}
      {/* ========================================================================= */}
      {selectedPost && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-[#122238] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase block">INDIVIDUAL POST DRILLDOWN</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{selectedPost.title}</h3>
              </div>
              <button onClick={() => setSelectedPost(null)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Impressions</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">{selectedPost.impressions}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Click CTR</span>
                <span className="text-lg font-black text-emerald-600">{selectedPost.ctr}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Reactions</span>
                <span className="text-lg font-black text-blue-600">{selectedPost.likes}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Engagement Rate</span>
                <span className="text-lg font-black text-indigo-600">{selectedPost.engagementRate}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              "{selectedPost.excerpt}"
            </p>

            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedPost(null)} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ALL FOLLOWERS ROSTER MODAL                                                */}
      {/* ========================================================================= */}
      {allFollowersModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-[#122238] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black tracking-widest text-emerald-600 uppercase block">ALL FOLLOWERS DIRECTORY</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Verified Followers Roster</h3>
              </div>
              <button onClick={() => setAllFollowersModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFollowerRosterTab("people")}
                className={`flex-1 py-2 rounded-lg transition-all ${followerRosterTab === "people" ? "bg-white dark:bg-[#122238] text-slate-900 dark:text-white shadow-xs" : "text-slate-500"}`}
              >
                People (Individuals)
              </button>
              <button
                onClick={() => setFollowerRosterTab("pages")}
                className={`flex-1 py-2 rounded-lg transition-all ${followerRosterTab === "pages" ? "bg-white dark:bg-[#122238] text-slate-900 dark:text-white shadow-xs" : "text-slate-500"}`}
              >
                Pages (Organizations)
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: "Dr. Vikram Sethi", role: "Director of Trade & Policy", org: "NITI Aayog Partner", date: "Followed 2 days ago" },
                { name: "Ananya Deshmukh", role: "Chief Operating Officer", org: "Sun Pharma Logistics", date: "Followed 5 days ago" },
                { name: "Priyanshu Mani Tripathi", role: "Senior Analyst", org: "ICICI Securities", date: "Followed 1 week ago" }
              ].map((f, i) => (
                <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-between gap-3 text-xs">
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{f.name}</h5>
                    <p className="text-slate-500 text-[11px]">{f.role} · <span className="font-bold text-slate-700 dark:text-slate-300">{f.org}</span></p>
                  </div>
                  <span className="text-[10px] text-slate-400">{f.date}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setAllFollowersModalOpen(false)} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, Globe, ExternalLink, Share2, Check, 
  Building2, Users, FileText, Plus, ArrowUpRight, Zap,
  Crown, Award, ShieldCheck, Mail, Calendar, Download,
  MessageSquare, ThumbsUp, Repeat, Sparkles, Star, BookOpen,
  X, ChevronRight, Lock, Eye, FileSpreadsheet, UserPlus, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface SmePublicProfileProps {
  profileData?: any;
  tier?: "free" | "pro" | "elite" | "sovereign";
  role?: "sme" | "associate-sme";
  isOwner?: boolean;
  onSwitchToAdmin?: () => void;
}

export default function SmePublicProfile({
  profileData = {},
  tier: initialTier = "pro",
  role = "sme",
  isOwner = false,
  onSwitchToAdmin,
}: SmePublicProfileProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // Tier Preview Switcher for Owner
  const [activeTier, setActiveTier] = useState<"free" | "pro" | "elite" | "sovereign">(initialTier);

  useEffect(() => {
    setActiveTier(initialTier);
  }, [initialTier]);

  const isFree = activeTier === "free";
  const isPro = activeTier === "pro";
  const isElite = activeTier === "elite";
  const isSovereign = activeTier === "sovereign";

  // Active Tab: "overview" | "articles" | "coauthors" | "whitepapers"
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "coauthors" | "whitepapers">("overview");

  // Interaction States
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Profile Information
  const name = profileData.name || (role === "sme" ? "Dr. Rajesh Kumar" : "Ananya Sharma");
  const designation = profileData.designation || (
    role === "sme" 
      ? "Senior Trade Policy Specialist & Economic Research Chair" 
      : "Associate Specialist — Supply Chain & API Manufacturing Corridors"
  );
  const organization = profileData.organization || "Apex Trade Advisory Council & NITI Partner";
  const sector = profileData.sector || "International Trade & Pharmaceutical Logistics";
  const city = profileData.city || "Bengaluru";
  const country = profileData.country || "India";
  const bio = profileData.bio || (
    isSovereign 
      ? "24+ years of strategic government and multilateral trade policy expertise. Leading cross-border export corridor development, PLI manufacturing frameworks, and international trade governance across 34+ countries."
      : isElite
      ? "18+ years in global trade research and API manufacturing supply chains. Author of 12 landmark macroeconomic whitepapers on GCC-India trade corridors."
      : isPro
      ? "Specialized trade analyst focusing on MSME credit frameworks, export tariffs, and bilateral regulatory compliance."
      : "Subject Matter Expert contributor covering domestic trade updates and MSME policy insights."
  );

  const followersCount = isSovereign ? "18,420" : isElite ? "8,950" : isPro ? "3,210" : "480";
  const articlesCount = isSovereign ? 48 : isElite ? 24 : isPro ? 12 : 4;
  const coauthorsCount = isSovereign ? 16 : isElite ? 9 : isPro ? 4 : 1;

  // Publications List
  const articlesList = profileData.articlesList || [
    {
      id: "a1",
      title: "Macro Tariff Adjustments & API Manufacturing Competitiveness in India (2026)",
      readTime: "8 min read",
      date: "Aug 28, 2026",
      impressions: "4,820",
      likes: 184,
      comments: 32,
      pdf: isElite || isSovereign ? "Trade_Policy_API_2026.pdf" : null,
      excerpt: "Deep policy dive into how domestic PLI schemes are reducing active pharmaceutical ingredient reliance on imported foreign intermediaries."
    },
    {
      id: "a2",
      title: "Bilateral GCC-India Trade Corridors: Container Logistics Throughput Analysis",
      readTime: "6 min read",
      date: "Aug 22, 2026",
      impressions: "2,950",
      likes: 112,
      comments: 18,
      pdf: isElite || isSovereign ? "GCC_India_Corridor_Briefing.pdf" : null,
      excerpt: "Visual mapping of container logistics throughput from Jebel Ali Port to JNPT Mumbai."
    },
    {
      id: "a3",
      title: "Quarterly SME Trade Index & Reserve Bank Credit Line Trajectory",
      readTime: "12 min read",
      date: "Aug 15, 2026",
      impressions: "1,840",
      likes: 89,
      comments: 14,
      pdf: isSovereign ? "Reserve_Bank_MSME_Report.pdf" : null,
      excerpt: "Official analytical whitepaper on interest rate trajectories and credit lines for manufacturing MSMEs."
    }
  ];

  // Co-authors
  const coauthorsList = [
    { name: "Dr. Vikram Sethi", role: "Director of Trade Policy", org: "NITI Aayog Partner", verified: true, avatar: "V" },
    { name: "Shreya Venkat", role: "Chief Investment Officer", org: "Apex Capital India", verified: true, avatar: "S" },
    { name: "Karan Johar", role: "VP Supply Chain", org: "Reliance Trade Logistics", verified: true, avatar: "K" }
  ];

  // Handle Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* OWNER ADMIN TOGGLE BAR                                                    */}
      {/* ========================================================================= */}
      {isOwner && (
        <div className="bg-slate-900 text-white rounded-3xl p-4 md:p-5 shadow-2xl border border-slate-800 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-widest uppercase text-emerald-400">
                  PUBLIC PROFILE PREVIEW MODE
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10 uppercase">
                  {role.toUpperCase()} {activeTier.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                This is how verified industry members, buyers, and partners see your public profile.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Tier Switcher for Testing Preview Aesthetics */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/10 text-xs font-bold">
              {(["free", "pro", "elite", "sovereign"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTier(t)}
                  className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                    activeTier === t
                      ? "bg-white text-slate-900 shadow-md font-extrabold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {onSwitchToAdmin && (
              <button
                onClick={onSwitchToAdmin}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Switch to Admin View</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TIER-SPECIFIC PUBLIC PROFILE HERO BANNER                                  */}
      {/* ========================================================================= */}
      <div className={`rounded-3xl border overflow-hidden shadow-2xl transition-all relative ${
        isSovereign 
          ? "bg-gradient-to-r from-[#111827] via-[#1e1b4b] to-[#111827] border-amber-500/40 text-white" 
          : isElite 
          ? "bg-gradient-to-r from-[#0f172a] via-[#2e1065] to-[#0f172a] border-violet-500/30 text-white" 
          : isPro 
          ? "bg-gradient-to-r from-[#0f172a] via-[#064e3b] to-[#0f172a] border-emerald-500/30 text-white" 
          : "bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
      }`}>
        
        {/* Tier Cover Accent Header */}
        <div className={`h-40 md:h-52 w-full relative ${
          isSovereign 
            ? "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700" 
            : isElite 
            ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-800" 
            : isPro 
            ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700" 
            : "bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 dark:from-slate-800 dark:to-slate-700"
        }`}>
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          
          {/* Tier Label Badge on Cover */}
          <div className="absolute top-4 right-4 z-10">
            {isSovereign && (
              <div className="px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-400/50 text-xs font-black tracking-widest uppercase flex items-center gap-1.5 shadow-xl">
                <Award className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                <span>SOVEREIGN LEGEND MEMBER</span>
              </div>
            )}
            {isElite && (
              <div className="px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-violet-300 border border-violet-400/50 text-xs font-black tracking-widest uppercase flex items-center gap-1.5 shadow-xl">
                <Crown className="w-4 h-4 text-violet-400 fill-violet-400" />
                <span>VERIFIED ELITE SPECIALIST</span>
              </div>
            )}
            {isPro && (
              <div className="px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-emerald-400/50 text-xs font-black tracking-widest uppercase flex items-center gap-1.5 shadow-xl">
                <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>VERIFIED PRO SPECIALIST</span>
              </div>
            )}
            {isFree && (
              <div className="px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-slate-300 border border-slate-700 text-xs font-bold uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>SME MEMBER</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Card Header Info */}
        <div className="p-6 md:p-8 pt-0 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 md:-mt-20">
            
            {/* Avatar & Title Block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl p-1 shadow-2xl shrink-0 bg-white dark:bg-[#0f172a] ${
                isSovereign ? "ring-4 ring-amber-400" : isElite ? "ring-4 ring-violet-500" : isPro ? "ring-4 ring-emerald-500" : "ring-2 ring-slate-300"
              }`}>
                <div className={`w-full h-full rounded-2xl flex items-center justify-center font-black text-3xl md:text-5xl uppercase shadow-inner ${
                  isSovereign ? "bg-gradient-to-br from-amber-400 to-amber-700 text-slate-950" :
                  isElite ? "bg-gradient-to-br from-violet-500 to-indigo-700 text-white" :
                  isPro ? "bg-gradient-to-br from-emerald-500 to-teal-700 text-white" :
                  "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}>
                  {name.charAt(0)}
                </div>
              </div>

              <div className="space-y-1.5 pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {name}
                  </h1>

                  {/* Verification Shield Icon */}
                  {isSovereign && <Award className="w-6 h-6 text-amber-400 fill-amber-400" />}
                  {isElite && <Crown className="w-6 h-6 text-violet-400 fill-violet-400" />}
                  {isPro && <Zap className="w-6 h-6 text-emerald-400 fill-emerald-400" />}
                </div>

                <p className={`text-sm font-bold ${isFree ? "text-slate-600 dark:text-slate-300" : "text-slate-200"}`}>
                  {designation}
                </p>

                <div className="flex items-center gap-3 text-xs opacity-80 flex-wrap">
                  <span className="flex items-center gap-1 font-semibold">
                    <Building2 className="w-3.5 h-3.5 shrink-0" /> {organization}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" /> {city}, {country}
                  </span>
                </div>
              </div>
            </div>

            {/* Public Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                  isFollowing
                    ? "bg-white/20 text-white hover:bg-white/30 border border-white/20"
                    : isSovereign
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black"
                    : isElite
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold"
                    : isPro
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold"
                    : "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                }`}
              >
                {isFollowing ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                <span>{isFollowing ? "Following Page" : "Follow Specialist"}</span>
              </button>



              <button
                onClick={handleCopyLink}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold transition-all border border-white/10 relative"
                title="Share Profile"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Bio Overview Paragraph */}
          <p className={`text-xs md:text-sm leading-relaxed max-w-4xl pt-2 ${
            isFree ? "text-slate-600 dark:text-slate-300" : "text-slate-300"
          }`}>
            {bio}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 border-t border-white/10 text-xs">
            {isFree ? (
              <div className="max-w-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Followers</span>
                <span className="text-xl font-black">{followersCount}</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Followers</span>
                  <span className="text-lg font-black">{followersCount}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Published Articles</span>
                  <span className="text-lg font-black">{articlesCount}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Peer Co-Authors</span>
                  <span className="text-lg font-black">{coauthorsCount}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Sector</span>
                  <span className="text-xs font-bold text-emerald-400 truncate block">{sector}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Public Tab Navigation Bar (Paid Tiers Only) */}
        {!isFree && (
          <div className="bg-black/20 backdrop-blur-md px-6 py-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: "overview", label: "Overview & Expertise", icon: BookOpen },
              { id: "articles", label: "Articles & Publications", icon: FileText },
              { id: "coauthors", label: "Co-Authors & Peer Network", icon: Users },
              { id: "whitepapers", label: "Whitepapers & Media", icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? "bg-white text-slate-900 shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-slate-300"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* PUBLIC TAB CONTENT AREAS                                                 */}
      {/* ========================================================================= */}

      {/* FREE TIER FULLY BASIC VIEW */}
      {isFree ? (
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xs text-center space-y-4 max-w-xl mx-auto my-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Basic {role === "sme" ? "SME" : "Associate SME"} Member Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
              This member is registered on the basic tier with <strong className="text-slate-700 dark:text-slate-200">{followersCount} followers</strong>. Article publishing, research whitepapers, and verified peer networking are unlocked on Pro, Elite, and Sovereign tiers.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isFollowing
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isFollowing ? "Following Member" : "+ Follow Member"}
            </button>
          </div>
        </div>
      ) : (
        <>
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            
            {/* Core Expertise Tags */}
            <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Core Trade & Advisory Expertise</span>
              </h3>

              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  "Active Pharmaceutical Ingredients (API)", "PLI Scheme Tariffs", 
                  "GCC-India Export Corridors", "Reserve Bank MSME Credit Lines", 
                  "Bilateral Trade Policy", "Customs Compliance Auditing",
                  "Cross-border Supply Chain Optimization"
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3.5 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 ${
                      isSovereign ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800" :
                      isElite ? "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800" :
                      isPro ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" :
                      "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Publication Highlight */}
            <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
              <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                FEATURED RESEARCH PUBLICATION
              </span>

              <h4 className="text-lg font-bold">
                {articlesList[0].title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {articlesList[0].excerpt}
              </p>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-400">{articlesList[0].date} · {articlesList[0].readTime}</span>
                <button
                  onClick={() => setActiveTab("articles")}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar Widget */}
          <div className="space-y-6">
            


            {/* Verified Credentials */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400">Verified Credentials</h4>
              <div className="space-y-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Verified iGEN Trade Specialist</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Apex Advisory Board Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ARTICLES & PUBLICATIONS TAB */}
      {activeTab === "articles" && (
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Published Thought Leadership Articles ({articlesList.length})</h3>
            <span className="text-xs text-slate-400 font-medium">Sorted by Latest</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-4">
            {articlesList.map((art: any) => (
              <div key={art.id} className="pt-4 first:pt-0 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>{art.date} · {art.readTime}</span>
                  <span className="text-emerald-600 font-bold">{art.impressions} Views</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer">
                  {art.title}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {art.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5 text-blue-500" /> {art.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> {art.comments}</span>
                  </div>

                  {art.pdf && (
                    <button
                      onClick={() => alert(`Downloading Whitepaper: ${art.pdf}`)}
                      className="px-3.5 py-1.5 bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-violet-200 dark:border-violet-800"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Whitepaper</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CO-AUTHORS TAB */}
      {activeTab === "coauthors" && (
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Verified Peer Network & Co-Authors ({coauthorsList.length})</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coauthorsList.map((c, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg">
                  {c.avatar}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{c.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </h5>
                  <p className="text-[11px] text-slate-500">{c.role}</p>
                  <span className="text-[10px] font-bold text-slate-400">{c.org}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. WHITEPAPERS TAB */}
      {activeTab === "whitepapers" && (
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Research Whitepapers & Official Briefings</h3>

          <div className="space-y-4">
            {[
              { title: "2026 India-GCC Supply Chain Tariff Briefing", pages: "24 pages", format: "PDF", size: "4.2 MB" },
              { title: "Active Pharmaceutical Ingredients PLI Impact Assessment", pages: "18 pages", format: "PDF", size: "3.1 MB" },
            ].map((wp, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="text-slate-900 dark:text-white">{wp.title}</h5>
                    <span className="text-[10px] text-slate-400">{wp.pages} · {wp.format} ({wp.size})</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading Whitepaper: ${wp.title}`)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}

    </div>
  );
}

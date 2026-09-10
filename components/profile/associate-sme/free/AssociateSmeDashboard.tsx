"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  FileText,
  BarChart3,
  Settings,
  TrendingUp,
  Eye,
  Lock,
  Plus,
  ArrowUpRight,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Globe,
  Share2,
  Copy,
  Check,
  Building2,
  MapPin,
  Briefcase,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Tag,
  Paperclip,
  ArrowRight,
  MessageSquare,
  Mail,
} from "lucide-react";
import RichArticleEditor, { ArticleDraft } from "@/components/profile/common/RichArticleEditor";
import SmeAnalyticsHub from "@/components/profile/common/SmeAnalyticsHub";
import SmePublicProfile from "@/components/profile/common/SmePublicProfile";

export default function AssociateSmeDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  // Tier switcher state
  const initialTier = ((user as any)?.associateSmePlan as "free" | "pro" | "elite" | "sovereign") || "free";
  const [currentTier, setCurrentTier] = useState<"free" | "pro" | "elite" | "sovereign">(initialTier);

  // View Mode State: "private" (Admin Dashboard) | "public" (Public Profile View)
  const [viewMode, setViewMode] = useState<"private" | "public">("private");

  // Main navigation tab
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "insights" | "settings">("overview");

  // Reset activeTab if not allowed in current tier
  useEffect(() => {
    if (currentTier === "free" && activeTab === "articles") {
      setActiveTab("overview");
    }
  }, [currentTier, activeTab]);

  // Rich Article Studio
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleDraft | undefined>(undefined);

  // Articles state
  const [articles, setArticles] = useState<ArticleDraft[]>([
    {
      id: "asme_1",
      title: "ASEAN-India EV Supply Chain Convergence: Battery Chemistry & Critical Minerals",
      subtitle: "Strategic logistics pathways connecting Tamil Nadu manufacturing corridors with Indonesian nickel hubs.",
      coverImage: "https://images.unsplash.com/photo-1558441719-aa34455441cb?w=1200&auto=format&fit=crop",
      fontFamily: "serif",
      tags: ["Clean Energy & ESG", "Cross-Border Trade", "Supply Chain & Logistics"],
      blocks: [
        {
          id: "b1",
          type: "paragraph",
          content: "As EV adoption accelerates across Southeast Asia and the Indian subcontinent, securing regional critical mineral corridors has become an imperative of industrial policy.",
        },
      ],
      pdfAttachment: { name: "ASEAN_EV_Supply_Chain_2026.pdf", size: "3.2 MB" },
    },
  ]);

  // Articles state

  const TIER_CONFIG = {
    free: {
      name: "Free ASME",
      badgeClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700",
      hasTick: false,
      tickColor: "",
      monthlyQuota: 0,
      weeklyQuota: 0,
      tagLimit: 2,
      allowPdf: false,
    },
    pro: {
      name: "ASME Pro",
      badgeClass: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-700",
      hasTick: true,
      tickColor: "text-blue-600 dark:text-blue-400 fill-blue-100 dark:fill-blue-900",
      monthlyQuota: 4,
      weeklyQuota: 1,
      tagLimit: 10,
      allowPdf: false,
    },
    elite: {
      name: "ASME Elite",
      badgeClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
      hasTick: true,
      tickColor: "text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-900",
      monthlyQuota: 6,
      weeklyQuota: 2,
      tagLimit: 999,
      allowPdf: true,
    },
    sovereign: {
      name: "ASME Sovereign",
      badgeClass: "bg-purple-950 text-amber-300 border-amber-400/80 shadow-xs",
      hasTick: true,
      tickColor: "text-amber-400 fill-purple-900",
      monthlyQuota: 8,
      weeklyQuota: 2,
      tagLimit: 999,
      allowPdf: true,
    },
  };

  const currentConfig = TIER_CONFIG[currentTier];

  const profile = user?.onboardingForm || {};
  const displayName = profile.fullName || user?.name || "Ananya Deshmukh";
  const displayDesignation = profile.currentDesignation || "Associate Trade Analyst";
  const displayOrg = profile.organisation || "Global Commerce Network";
  const displayCity = profile.city || "Mumbai";
  const displayCountry = profile.country || "India";

  // Visible tabs dynamically based on tier
  const getVisibleTabs = () => {
    if (currentTier === "free") {
      return [
        { id: "overview", label: "Overview", icon: TrendingUp },
        { id: "insights", label: "Readership Insights", icon: BarChart3 },
        { id: "settings", label: "Profile & Settings", icon: Settings },
      ];
    }
    return [
      { id: "overview", label: "Overview", icon: TrendingUp },
      { id: "articles", label: "Articles & Co-authorship", icon: FileText, count: articles.length },
      { id: "insights", label: "Readership Analytics", icon: BarChart3 },
      { id: "settings", label: "Profile & Settings", icon: Settings },
    ];
  };

  const visibleTabs = getVisibleTabs();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 pb-20">
      
      {/* Top Bar */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-base flex items-center justify-center shadow-md">
              {displayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{displayName}</h1>
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${currentConfig.badgeClass}`}>
                  {currentConfig.hasTick && (
                    <CheckCircle2 className={`w-3.5 h-3.5 ${currentConfig.tickColor}`} />
                  )}
                  <span>{currentConfig.name}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {displayDesignation} • {displayOrg}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* View Mode Toggle Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
              <button
                onClick={() => setViewMode("private")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === "private"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                🛠️ Admin View
              </button>
              <button
                onClick={() => setViewMode("public")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === "public"
                    ? "bg-blue-600 text-white shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                👁️ View Public Profile ↗
              </button>
            </div>

            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Tier:</span>
              {(["free", "pro", "elite", "sovereign"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setCurrentTier(tier)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    currentTier === tier
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tier.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/${locale}/profile/plans/associate-sme`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade Associate Tier</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher (Only in Admin View) */}
        {viewMode === "private" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 text-sm border-t border-slate-100 dark:border-slate-800/60 overflow-x-auto">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 border-b-2 font-medium text-xs md:text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-blue-600 text-blue-600 dark:text-blue-400 font-semibold"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {(tab as any).count !== undefined && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {(tab as any).count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* PUBLIC VIEW MODE */}
        {viewMode === "public" ? (
          <SmePublicProfile
            profileData={{
              name: displayName,
              designation: displayDesignation,
              organization: displayOrg,
              city: displayCity,
              country: displayCountry,
              articlesList: articles,
            }}
            tier={currentTier}
            role="associate-sme"
            isOwner={true}
            onSwitchToAdmin={() => setViewMode("private")}
          />
        ) : (
          <>
        
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            
            {/* Free Tier Overview */}
            {currentTier === "free" ? (
              <div className="space-y-6">
                {/* Associate Free Status Card */}
                <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-bold text-slate-900 dark:text-white">
                            Free Associate SME Profile Status
                          </h2>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            Active Associate
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                          Your associate credentials are active in the iGEN Research Network with up to 2 domain tags. Upgrade to publish co-authored intelligence reports.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/${locale}/profile/plans/associate-sme`)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all shrink-0"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Upgrade to Associate Plus</span>
                    </button>
                  </div>
                </div>

                {/* Free vs Plus Benefit Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>Associate Free Entitlements</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Basic Associate SME directory listing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Up to 2 Domain Expertise Tags</span>
                      </li>
                      <li className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>0 Articles/Month (Writing locked)</span>
                      </li>
                      <li className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>No Readership Analytics</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 rounded-2xl border border-blue-200/80 dark:border-blue-900/40 p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 fill-blue-100" />
                          ASSOCIATE PLUS
                        </span>
                        <span className="text-xs font-bold text-blue-900 dark:text-blue-300">₹1,999 / mo</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Publish Co-Authored Trade Research</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        Upgrade to Associate Plus to submit up to 4 articles/month, co-author with Senior SMEs, and receive verified blue badge styling.
                      </p>
                    </div>

                    <button
                      onClick={() => router.push(`/${locale}/profile/plans/associate-sme`)}
                      className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all"
                    >
                      <span>View Associate Plans & Upgrade</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Paid Tier Overview */
              <>
                {/* Quota Banner */}
                <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Associate Monthly Publishing Quota</span>
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold border ${currentConfig.badgeClass}`}>
                          {currentConfig.hasTick && (
                            <CheckCircle2 className={`w-3.5 h-3.5 ${currentConfig.tickColor}`} />
                          )}
                          <span>{currentConfig.name}</span>
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Published {articles.length} of {currentConfig.monthlyQuota} analytical reports this calendar month.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingArticle(undefined);
                        setIsEditorOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Draft Co-author Article</span>
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                      <span>Usage Cycle: September 2026</span>
                      <span>
                        {articles.length} / {currentConfig.monthlyQuota} articles ({currentConfig.weeklyQuota > 0 ? `Max ${currentConfig.weeklyQuota}/wk` : ""})
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{
                          width: `${(articles.length / currentConfig.monthlyQuota) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <span className="text-xs font-medium text-slate-500">Associate Reads</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">8,420</p>
                    <span className="text-[11px] text-blue-600 font-semibold mt-1 block">↑ +19.4% this month</span>
                  </div>
                  <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <span className="text-xs font-medium text-slate-500">Senior SME Endorsements</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">16 Verified</p>
                    <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Top 5% Contributor</span>
                  </div>
                  <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <span className="text-xs font-medium text-slate-500">Read Duration</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">3m 48s</p>
                    <span className="text-[11px] text-purple-600 font-semibold mt-1 block">84% completion rate</span>
                  </div>
                  <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <span className="text-xs font-medium text-slate-500">Policy Downloads</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">310 PDFs</p>
                    <span className="text-[11px] text-amber-600 font-semibold mt-1 block">Trade reports accessed</span>
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Co-Authored Articles</h3>
                    <button
                      onClick={() => setActiveTab("articles")}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>View all</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {articles.map((art) => (
                      <div
                        key={art.id}
                        className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 bg-white dark:bg-slate-900/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            {art.tags.map((t) => (
                              <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                                {t}
                              </span>
                            ))}
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{art.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">{art.subtitle}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingArticle(art);
                              setIsEditorOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ARTICLES */}
        {activeTab === "articles" && currentTier !== "free" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Authored & Co-authored Reports</h3>
              <button
                onClick={() => {
                  setEditingArticle(undefined);
                  setIsEditorOpen(true);
                }}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700"
              >
                + New Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <div key={art.id} className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {art.tags.map((t) => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{art.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{art.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INSIGHTS */}
        {activeTab === "insights" && (
          <SmeAnalyticsHub currentTier={currentTier} role="associate-sme" userName={displayName} />
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs max-w-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Associate SME Profile Metadata</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={displayName}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Professional Designation</label>
                <input
                  type="text"
                  defaultValue={displayDesignation}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Organisation / Advisory</label>
                <input
                  type="text"
                  defaultValue={displayOrg}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    defaultValue={displayCity}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Country</label>
                  <input
                    type="text"
                    defaultValue={displayCountry}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => alert("Associate SME profile settings saved successfully!")}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
              >
                Save Profile Settings
              </button>
            </div>
          </div>
        )}
        </>
      )}
      </div>

      {/* Editor Modal */}
      <RichArticleEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onPublish={(draft) => {
          setArticles([draft, ...articles]);
          setIsEditorOpen(false);
        }}
        initialData={editingArticle}
        userTier={currentTier}
        publishedCountThisMonth={articles.length}
        publishedCountThisWeek={1}
      />
    </div>
  );
}

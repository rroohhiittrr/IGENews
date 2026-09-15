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
  Search,
  Filter,
  Trash2,
  Edit3,
  Download,
  AlertCircle,
  Users,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Tag,
  Paperclip,
  MessageSquare,
  ArrowRight,
  CheckCheck,
} from "lucide-react";
import RichArticleEditor, { ArticleDraft } from "@/components/profile/common/RichArticleEditor";
import SmeAnalyticsHub from "@/components/profile/common/SmeAnalyticsHub";
import SmePublicProfile from "@/components/profile/common/SmePublicProfile";

export default function SmeDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  // Tier switcher state (allows user to test/preview different tiers)
  const initialTier = ((user as any)?.smePlan as "free" | "pro" | "elite" | "sovereign") || "free";
  const [currentTier, setCurrentTier] = useState<"free" | "pro" | "elite" | "sovereign">(initialTier);

  // View Mode State: "private" (Admin Dashboard) | "public" (Public Profile View)
  const [viewMode, setViewMode] = useState<"private" | "public">("private");

  // Active Main Navigation Tab
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "insights" | "settings">("overview");

  // Reset tab to overview if activeTab is not available in new tier
  useEffect(() => {
    if (currentTier === "free" && activeTab === "articles") {
      setActiveTab("overview");
    }
  }, [currentTier, activeTab]);

  // Article Filter
  const [articleFilter, setArticleFilter] = useState<"all" | "published" | "drafts" | "reports">("all");

  // Rich Article Studio Modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleDraft | undefined>(undefined);

  // Copy Profile Link Toast
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Local articles state
  const [articles, setArticles] = useState<ArticleDraft[]>([
    {
      id: "art_1",
      title: "India-UAE CEPA: Supply Chain Reconfiguration & Tariff Arbitrage in 2026",
      subtitle: "How bilateral zero-duty corridors are driving high-value manufacturing clusters across Gujarat and Western India.",
      coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop",
      fontFamily: "serif",
      tags: ["Macroeconomics", "Cross-Border Trade", "Supply Chain & Logistics"],
      blocks: [
        {
          id: "b1",
          type: "paragraph",
          content: "The expansion of the Comprehensive Economic Partnership Agreement (CEPA) between India and the UAE marks a decisive inflection point for non-oil bilateral commerce. With tariff lines reduced on over 90% of industrial goods, Indian exporters in engineering, textiles, and specialty chemicals are experiencing unprecedented logistics velocity.",
        },
      ],
      pdfAttachment: { name: "CEPA_Trade_Analysis_2026.pdf", size: "4.8 MB" },
    },
    {
      id: "art_2",
      title: "Semiconductor Fab Infrastructure: Capital Allocation & Cleanroom Economics",
      subtitle: "An engineering-first audit of Gujarat Dholera and Sanand chip corridors.",
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop",
      fontFamily: "sans",
      tags: ["Semiconductors", "AI & Enterprise Tech"],
      blocks: [
        {
          id: "b1",
          type: "paragraph",
          content: "Building domestic semiconductor assembly and testing (OSAT) ecosystems demands sub-micron quality control, continuous ultra-pure water pipelines, and resilient power architectures.",
        },
      ],
    },
  ]);

  // Tier configuration matrix
  const TIER_CONFIG = {
    free: {
      name: "SME Member",
      badgeClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700",
      hasTick: false,
      tickColor: "",
      monthlyQuota: 0,
      weeklyQuota: 0,
      tagLimit: 2,
      allowPdf: false,
      allowConsulting: false,
      ctaText: "Upgrade to SME Pro",
    },
    pro: {
      name: "SME Pro",
      badgeClass: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-700",
      hasTick: true,
      tickColor: "text-blue-600 dark:text-blue-400 fill-blue-100 dark:fill-blue-900",
      monthlyQuota: 4,
      weeklyQuota: 1,
      tagLimit: 10,
      allowPdf: false,
      allowConsulting: false,
      ctaText: "Upgrade to SME Elite",
    },
    elite: {
      name: "SME Elite",
      badgeClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
      hasTick: true,
      tickColor: "text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-900",
      monthlyQuota: 6,
      weeklyQuota: 2,
      tagLimit: 999,
      allowPdf: true,
      allowConsulting: false,
      ctaText: "Upgrade to SME Sovereign",
    },
    sovereign: {
      name: "SME Sovereign",
      badgeClass: "bg-purple-950 text-amber-300 border-amber-400/80 shadow-xs",
      hasTick: true,
      tickColor: "text-amber-400 fill-purple-900",
      monthlyQuota: 8,
      weeklyQuota: 2,
      tagLimit: 999,
      allowPdf: true,
      allowConsulting: true,
      ctaText: "Manage Sovereign Tier",
    },
  };

  const currentConfig = TIER_CONFIG[currentTier];
  const publishedCountThisMonth = articles.length;
  const publishedCountThisWeek = 1;

  // Handlers for Publishing Studio
  const handleOpenNewArticle = () => {
    setEditingArticle(undefined);
    setIsEditorOpen(true);
  };

  const handlePublishArticle = (newDraft: ArticleDraft) => {
    if (editingArticle?.id) {
      setArticles(articles.map((a) => (a.id === editingArticle.id ? { ...newDraft, id: editingArticle.id } : a)));
    } else {
      setArticles([{ ...newDraft, id: "art_" + Date.now() }, ...articles]);
    }
    setIsEditorOpen(false);
  };

  const handleSaveDraft = (draft: ArticleDraft) => {
    if (editingArticle?.id) {
      setArticles(articles.map((a) => (a.id === editingArticle.id ? { ...draft, id: editingArticle.id } : a)));
    } else {
      setArticles([{ ...draft, id: "draft_" + Date.now() }, ...articles]);
    }
    setIsEditorOpen(false);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  // Reverse-IP Institutional Traffic mock data
  const INSTITUTIONAL_VISITORS = [
    { name: "Ministry of Commerce & Industry", sector: "Government & Policy", visits: 18, location: "New Delhi, India", logo: "🇮🇳" },
    { name: "McKinsey & Company", sector: "Strategic Advisory", visits: 34, location: "London, UK", logo: "🏛️" },
    { name: "Goldman Sachs Asset Management", sector: "Investment Banking", visits: 27, location: "Singapore", logo: "📊" },
    { name: "Temasek Holdings", sector: "Sovereign Wealth", visits: 12, location: "Singapore", logo: "🇸🇬" },
  ];

  const profile = user?.onboardingForm || {};
  const displayName = profile.fullName || user?.name || "Dr. Rajesh Sharma";
  const displayDesignation = profile.currentDesignation || "Senior Trade & Supply Chain Strategist";
  const displayOrg = profile.organisation || "Independent Advisory";
  const displayCity = profile.city || "Mumbai";
  const displayCountry = profile.country || "India";

  // Build tabs dynamically based on tier
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
      { id: "articles", label: "Articles & Reports", icon: FileText, count: articles.length },
      { id: "insights", label: "Readership Insights", icon: BarChart3 },
      { id: "settings", label: "Profile & Settings", icon: Settings },
    ];
  };

  const visibleTabs = getVisibleTabs();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-[#0b1120] text-slate-800 dark:text-slate-100 pb-20">
      
      {/* Top Banner & Tier Switcher Bar */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* SME Identity Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-base flex items-center justify-center shadow-md">
              {displayName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{displayName}</h1>
                
                {/* SVG Verified Tick Mark Badge (Zero Emojis) */}
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

          {/* Dynamic Tier Switcher & Public View Toggle */}
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
                    ? "bg-emerald-600 text-white shadow-xs font-bold"
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
                      ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tier.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/${locale}/profile/plans/sme`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade Tier</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs (Only in Admin View) */}
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
                      ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 font-semibold"
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

      {/* Main Content Area */}
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
            role="sme"
            isOwner={true}
            onSwitchToAdmin={() => setViewMode("private")}
          />
        ) : (
          <>
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            
            {/* FREE TIER OVERVIEW (Clean identity & upgrade prompt) */}
            {currentTier === "free" ? (
              <div className="space-y-6">
                {/* Free SME Profile Status Card */}
                <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                        <Award className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-bold text-slate-900 dark:text-white">
                            Free SME Profile Status
                          </h2>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            Active Identity
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                          Your SME verification is active. Your basic profile is listed in the iGEN Directory with up to 2 sector tags.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/${locale}/profile/plans/sme`)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all shrink-0"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Upgrade to SME Pro</span>
                    </button>
                  </div>

                  {/* Profile Health Progress Bar */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                      <span>Profile Completeness</span>
                      <span className="font-bold text-emerald-600">80% Complete</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-4/5 transition-all duration-500" />
                    </div>
                  </div>
                </div>

                {/* Free SME Feature Limits vs Pro Upgrade Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Your Free SME Entitlements</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Basic iGEN SME Profile listing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Up to 2 Sector Expertise Tags</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Direct contact via iGEN Messaging</span>
                      </li>
                      <li className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>0 Articles/Month (Writing locked)</span>
                      </li>
                      <li className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>No Readership Analytics or Demographics</span>
                      </li>
                    </ul>
                  </div>

                  {/* Why Upgrade to Pro Card */}
                  <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 rounded-2xl border border-blue-200/80 dark:border-blue-900/40 p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 fill-blue-100" />
                          SME PRO
                        </span>
                        <span className="text-xs font-bold text-blue-900 dark:text-blue-300">₹3,499 / mo</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Publish Thought Leadership & Gain Global Reach</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        Upgrade to SME Pro to publish up to 4 articles/month, receive verified blue badge styling, and get detailed readership telemetry.
                      </p>
                    </div>

                    <button
                      onClick={() => router.push(`/${locale}/profile/plans/sme`)}
                      className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all"
                    >
                      <span>View All SME Plans & Upgrade</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* PAID TIERS OVERVIEW (Pro, Elite, Sovereign) */
              <>
                {/* Top Quota Visualizer Card */}
                <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Monthly Publishing Quota</span>
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold border ${currentConfig.badgeClass}`}>
                          {currentConfig.hasTick && (
                            <CheckCircle2 className={`w-3.5 h-3.5 ${currentConfig.tickColor}`} />
                          )}
                          <span>{currentConfig.name}</span>
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        You have published {publishedCountThisMonth} of {currentConfig.monthlyQuota} analytical reports this calendar month.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenNewArticle}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Write Article</span>
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                      <span>Usage Cycle: September 2026</span>
                      <span>
                        {publishedCountThisMonth} / {currentConfig.monthlyQuota} articles ({currentConfig.weeklyQuota > 0 ? `Max ${currentConfig.weeklyQuota}/wk` : ""})
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{
                          width: `${(publishedCountThisMonth / currentConfig.monthlyQuota) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4 KPI Telemetry Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                      <span className="text-xs font-medium">Total Article Reads</span>
                      <Eye className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">14,820</p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <span>↑ +24.8%</span>
                      <span className="text-slate-400 font-normal">vs last month</span>
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                      <span className="text-xs font-medium">Profile Impressions</span>
                      <Globe className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">3,240</p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <span>↑ +18.2%</span>
                      <span className="text-slate-400 font-normal">Google & Platform</span>
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                      <span className="text-xs font-medium">Avg Read Duration</span>
                      <Clock className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">4m 12s</p>
                    <p className="text-[11px] text-purple-600 font-semibold mt-1 flex items-center gap-1">
                      <span>88% read completion</span>
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                      <span className="text-xs font-medium">Institutional Signals</span>
                      <Building2 className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">42 Org Visits</p>
                    <p className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
                      <span>Reverse-IP verified</span>
                    </p>
                  </div>
                </div>

                {/* Reverse-IP Institutional Traffic Roster (Elite & Sovereign) */}
                {(currentTier === "elite" || currentTier === "sovereign") && (
                  <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-emerald-600" />
                          <span>Reverse-IP Institutional Intelligence</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Enterprises and policy institutions actively reading your trade essays.
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        Live Feed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {INSTITUTIONAL_VISITORS.map((inst, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between hover:border-emerald-500/30 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-lg shadow-xs">
                              {inst.logo}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900 dark:text-white">{inst.name}</p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {inst.sector} • {inst.location}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 py-1 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                            {inst.visits} reads
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Articles preview */}
                <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Your Published Insights</h3>
                    <button
                      onClick={() => setActiveTab("articles")}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <span>View all articles</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {articles.slice(0, 3).map((art) => (
                      <div
                        key={art.id}
                        className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 bg-white dark:bg-slate-900/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            {art.tags.map((t) => (
                              <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                                {t}
                              </span>
                            ))}
                            {art.pdfAttachment && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 flex items-center gap-1">
                                <Paperclip className="w-2.5 h-2.5" />
                                <span>PDF Report</span>
                              </span>
                            )}
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
                          <button
                            onClick={() => handleDeleteArticle(art.id!)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 className="w-4 h-4" />
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

        {/* TAB 2: ARTICLES (Paid Tiers Only) */}
        {activeTab === "articles" && currentTier !== "free" && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                {[
                  { id: "all", label: "All Insights" },
                  { id: "published", label: "Published" },
                  { id: "drafts", label: "Drafts" },
                  { id: "reports", label: "PDF Reports" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setArticleFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      articleFilter === f.id
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Write Article Button */}
              <button
                onClick={handleOpenNewArticle}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Write Analytical Article</span>
              </button>
            </div>

            {/* Article Cards Roster */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:border-emerald-500/40 transition-all flex flex-col"
                >
                  {art.coverImage && (
                    <div className="h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                      <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
                      {art.pdfAttachment && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-purple-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow">
                          <Paperclip className="w-3 h-3" />
                          <span>PDF Report</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                        {art.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {art.subtitle}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Published Sept 2026</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingArticle(art);
                            setIsEditorOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.id!)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: READERSHIP & ANALYTICS HUB (Tier-Wise) */}
        {activeTab === "insights" && (
          <SmeAnalyticsHub currentTier={currentTier} role="sme" userName={user?.name || "Specialist"} />
        )}



        {/* TAB: SETTINGS (Available on all tiers) */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">SME Profile Metadata</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={displayName}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Professional Designation</label>
                  <input
                    type="text"
                    defaultValue={displayDesignation}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Organisation / Advisory</label>
                  <input
                    type="text"
                    defaultValue={displayOrg}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">City</label>
                    <input
                      type="text"
                      defaultValue={displayCity}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Country</label>
                    <input
                      type="text"
                      defaultValue={displayCountry}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
                >
                  Save Profile Settings
                </button>
              </div>
            </div>
          </div>
        )}
        </>
      )}
      </div>

      {/* Rich Article Authoring Studio Modal */}
      <RichArticleEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onPublish={handlePublishArticle}
        onSaveDraft={handleSaveDraft}
        initialData={editingArticle}
        userTier={currentTier}
        publishedCountThisMonth={publishedCountThisMonth}
        publishedCountThisWeek={publishedCountThisWeek}
      />
    </div>
  );
}

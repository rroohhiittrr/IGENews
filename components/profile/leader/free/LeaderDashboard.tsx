"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import {
  Lock,
  Eye,
  Award,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  FileText,
  Calendar,
  Globe,
  ArrowUpRight,
  Share2,
  Sparkles,
  TrendingUp,
  Briefcase,
  Star,
  Settings,
  Trash2,
  Check,
  MapPin,
  Plus,
  Users,
  Building2,
  Crown,
  ChevronRight,
  ExternalLink,
  Flame,
  Download,
  Play,
  ArrowRight,
  Upload,
  Paperclip,
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import LeaderPublicProfile from "@/components/profile/leader/LeaderPublicProfile";
import SmeAnalyticsHub from "@/components/profile/common/SmeAnalyticsHub";
import ExecutiveExperienceTimeline, {
  WorkExperienceItem,
  EducationItem,
  BoardAppointmentItem,
} from "@/components/profile/leader/common/ExecutiveExperienceTimeline";
import RichArticleEditor, { ArticleDraft } from "@/components/profile/common/RichArticleEditor";

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  coverImage?: string;
  sector: string;
  date: string;
  reads: number;
  authorType?: "Self-Authored" | "iGEN AI Editor" | "SME Co-author" | "ASME Co-author";
  hasBackcover?: boolean;
  pdfAttachment?: { name: string; size: string };
  wordAttachment?: { name: string; size: string };
  fontFamily?: string;
  blocks?: any[];
}

export default function LeaderDashboard() {
  const { user, updateOnboarding } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // Dynamic Tier switcher state
  const initialTier =
    (user?.leaderPlan as "free" | "pioneer" | "luminary" | "sovereign") || "free";
  const [currentTier, setCurrentTier] = useState<"free" | "pioneer" | "luminary" | "sovereign">(initialTier);

  // Tab control states
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [adminTab, setAdminTab] = useState<"overview" | "experience" | "articles" | "insights" | "settings">("overview");

  // Feedback states
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [articleSuccess, setArticleSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Profile reference
  const profile = user?.onboardingForm || {};

  // Form edit states
  const [editFullName, setEditFullName] = useState(profile.fullName || user?.name || "Dr. Vikramaditya Singhania");
  const [editDesignation, setEditDesignation] = useState(profile.currentDesignation || "Chairman & Group Managing Director");
  const [editRoleLevel, setEditRoleLevel] = useState(profile.roleLevel || "C-Suite (CEO/CFO/CTO/COO)");
  const [editCompanyName, setEditCompanyName] = useState(profile.leaderCompany || "Singhania Global Conglomerate Ltd");
  const [editCompanyWebsite, setEditCompanyWebsite] = useState(profile.companyWebsite || "https://singhaniaglobal.com");
  const [editLinkedinUrl, setEditLinkedinUrl] = useState(profile.linkedinUrl || "https://linkedin.com/in/singhania");
  const [editCity, setEditCity] = useState(profile.city || "Mumbai");
  const [editCountry, setEditCountry] = useState(profile.country || "India");

  const [editPrimarySector, setEditPrimarySector] = useState(profile.sector || "manufacturing");
  const [editSecondarySectors, setEditSecondarySectors] = useState<string[]>(
    profile.secondarySectors || ["Cross-Border Bilateral Corridors", "Renewable Energy & ESG"]
  );
  const [editExperienceYears, setEditExperienceYears] = useState<number>(profile.experienceYears || 28);
  const [editBio, setEditBio] = useState(
    profile.aboutText ||
      "Over 28 years shaping India's high-tech industrial export landscape. Architect of bilateral trade corridors across Europe, UAE, and Southeast Asia, overseeing $1.4B in cross-border infrastructure and precision aerospace deployments."
  );
  const [editPhilosophy, setEditPhilosophy] = useState(
    profile.philosophy ||
      "True sovereignty in global trade is not merely about volume; it is about building irreproducible precision, ethical governance, and institutional trust that endures for generations."
  );

  // Article publisher states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleDraft | undefined>(undefined);
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleContent, setNewArticleContent] = useState("");
  const [newArticleSector, setNewArticleSector] = useState(editPrimarySector);
  const [newAuthorType, setNewAuthorType] = useState<Article["authorType"]>("Self-Authored");

  const [articles, setArticles] = useState<Article[]>([
    {
      id: "art_1",
      title: "The 2026 Shift in Indo-European Aerospace Supply Corridors",
      subtitle: "Structural titanium & carbon-composite supplier realignment across Western Europe and South Asia",
      content: "European aerospace primes are restructuring titanium and structural tooling sourcing...",
      coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&auto=format&fit=crop",
      sector: "Aerospace & Defense",
      date: "Aug 24, 2026",
      reads: 4820,
      authorType: "Self-Authored",
      hasBackcover: true,
      pdfAttachment: { name: "Indo-EU-Aerospace-Bilateral-2026.pdf", size: "3.4 MB" },
      wordAttachment: { name: "Executive-Summary-Brief.docx", size: "1.2 MB" },
      fontFamily: "serif",
    },
    {
      id: "art_2",
      title: "Bilateral Tariff Arbitrage: Precision Export Structuring Under CEPA",
      subtitle: "Capital equipment duty optimization across UAE & Gulf industrial corridors",
      content: "Evaluating duty differentials for high-value precision tooling across UAE free zones...",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop",
      sector: "Bilateral Trade",
      date: "Aug 12, 2026",
      reads: 3100,
      authorType: "iGEN AI Editor",
      hasBackcover: true,
      pdfAttachment: { name: "CEPA-Tariff-Schedules-2026.pdf", size: "2.8 MB" },
      fontFamily: "display",
    },
  ]);

  // Content Engine Quotas based on official matrix
  const TIER_MATRIX = {
    free: {
      name: "Free Leader",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-300",
      totalQuota: 0,
      selfQuota: 0,
      aiQuota: 0,
      smeQuota: 0,
      asmeQuota: 0,
      sectorTagLimit: 1,
      tabsCount: 1,
      hasBlueTick: false,
    },
    pioneer: {
      name: "Leader Pioneer",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      totalQuota: 4,
      selfQuota: 4,
      aiQuota: 0,
      smeQuota: 0,
      asmeQuota: 0,
      sectorTagLimit: 1,
      tabsCount: 2,
      hasBlueTick: true,
    },
    luminary: {
      name: "Leader Luminary",
      badgeClass: "bg-violet-50 text-violet-700 border-violet-200",
      totalQuota: 6,
      selfQuota: 6,
      aiQuota: 0,
      smeQuota: 0,
      asmeQuota: 0,
      sectorTagLimit: 3,
      tabsCount: 4,
      hasBlueTick: true,
    },
    sovereign: {
      name: "Leader Sovereign",
      badgeClass: "bg-amber-50 text-amber-900 border-amber-300",
      totalQuota: 8,
      selfQuota: 8,
      aiQuota: 0,
      smeQuota: 0,
      asmeQuota: 0,
      sectorTagLimit: 5,
      tabsCount: 5,
      hasBlueTick: true,
    },
  };

  const currentConfig = TIER_MATRIX[currentTier];

  // Handlers
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedForm = {
      ...profile,
      fullName: editFullName,
      currentDesignation: editDesignation,
      roleLevel: editRoleLevel,
      leaderCompany: editCompanyName,
      companyWebsite: editCompanyWebsite,
      linkedinUrl: editLinkedinUrl,
      city: editCity,
      country: editCountry,
      sector: editPrimarySector,
      secondarySectors: editSecondarySectors,
      experienceYears: editExperienceYears,
      aboutText: editBio,
      philosophy: editPhilosophy,
    };

    if (updateOnboarding) {
      await updateOnboarding({
        name: editFullName,
        onboardingForm: updatedForm,
      });
    }

    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 3000);
  };

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTier === "free") {
      alert("Article publishing is available on Pioneer, Luminary, and Sovereign tiers. Upgrade to submit thought leadership columns.");
      return;
    }
    if (!newArticleTitle.trim() || !newArticleContent.trim()) {
      alert("Please provide both article headline and content.");
      return;
    }

    const newArt: Article = {
      id: "art_" + Date.now(),
      title: newArticleTitle.trim(),
      content: newArticleContent.trim(),
      sector: newArticleSector,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      reads: 0,
      authorType: newAuthorType,
    };

    setArticles([newArt, ...articles]);
    setNewArticleTitle("");
    setNewArticleContent("");
    setArticleSuccess(true);
    setTimeout(() => setArticleSuccess(false), 3000);
  };

  const handleStudioPublish = (draft: ArticleDraft) => {
    const newArt: Article = {
      id: draft.id || `art_${Date.now()}`,
      title: draft.title,
      subtitle: draft.subtitle,
      content: draft.blocks?.find((b) => b.type === "paragraph")?.content || draft.subtitle || "Executive column published via Publishing Studio.",
      coverImage: draft.coverImage,
      sector: draft.tags?.[0] || editPrimarySector,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      reads: 0,
      authorType: (draft.authorType as any) || "Self-Authored",
      hasBackcover: draft.hasBackcover,
      pdfAttachment: draft.pdfAttachment,
      wordAttachment: draft.wordAttachment,
      fontFamily: draft.fontFamily,
      blocks: draft.blocks,
    };

    setArticles([newArt, ...articles.filter((a) => a.id !== newArt.id)]);
    setIsEditorOpen(false);
    setEditingArticle(undefined);
    setArticleSuccess(true);
    setTimeout(() => setArticleSuccess(false), 4000);
  };

  const handleEditInStudio = (art: Article) => {
    const draft: ArticleDraft = {
      id: art.id,
      title: art.title,
      subtitle: art.subtitle || "",
      coverImage: art.coverImage,
      fontFamily: (art.fontFamily as any) || "serif",
      hasBackcover: art.hasBackcover,
      blocks: art.blocks || [
        { id: "b1", type: "paragraph", content: art.content },
      ],
      tags: [art.sector],
      pdfAttachment: art.pdfAttachment,
      wordAttachment: art.wordAttachment,
      authorType: art.authorType,
    };
    setEditingArticle(draft);
    setIsEditorOpen(true);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  // =========================================================================
  // PUBLIC VIEW MODE
  // =========================================================================
  if (viewMode === "public") {
    return (
      <div className="space-y-4">
        {/* Return to Admin Switcher Banner */}
        <div className="max-w-6xl mx-auto px-4 pt-4 flex items-center justify-between">
          <button
            onClick={() => setViewMode("private")}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Lock className="w-3.5 h-3.5" /> Return to Admin Dashboard
          </button>
          <span className="text-xs text-slate-500 font-medium">
            Live Preview Mode · Viewing as Visitor ({currentConfig.name})
          </span>
        </div>

        <LeaderPublicProfile
          leaderData={{
            fullName: editFullName,
            currentDesignation: editDesignation,
            roleLevel: editRoleLevel,
            leaderCompany: editCompanyName,
            companyWebsite: editCompanyWebsite,
            linkedinUrl: editLinkedinUrl,
            sector: editPrimarySector,
            secondarySectors: editSecondarySectors,
            experienceYears: editExperienceYears,
            aboutText: editBio,
            philosophy: editPhilosophy,
            city: editCity,
            country: editCountry,
            articles: articles,
          }}
          tier={currentTier}
          onUpgradeClick={() => {
            setViewMode("private");
            router.push(`/${locale}/profile/plans/leader`);
          }}
          isOwner={true}
        />
      </div>
    );
  }

  // =========================================================================
  // PRIVATE VIEW (ADMIN LEADER DASHBOARD)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 pb-24">
      {/* Top Bar with Live Tier & View Mode Switchers */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-blue-900 text-white font-black text-base flex items-center justify-center shadow-xs">
              {editFullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-slate-900">{editFullName}</h1>
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${currentConfig.badgeClass}`}>
                  {currentConfig.hasBlueTick && <CheckCircle2 className="w-3 h-3 text-blue-600 fill-blue-100" />}
                  <span>{currentConfig.name}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {editDesignation} · {editCompanyName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* View Mode Toggle Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setViewMode("private")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === "private"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                🛠️ Admin View
              </button>
              <button
                onClick={() => setViewMode("public")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === "public"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                👁️ View Public Profile ↗
              </button>
            </div>

            {/* Tier Switcher for Testing Live Matrix */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Tier:</span>
              {(["free", "pioneer", "luminary", "sovereign"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setCurrentTier(t);
                    if (t === "free" && (adminTab === "experience" || adminTab === "articles" || adminTab === "insights")) {
                      setAdminTab("overview");
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-all ${
                    currentTier === t
                      ? "bg-white text-blue-600 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Main Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto border-t border-slate-100 no-scrollbar">
          {(currentTier === "free"
            ? [
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "settings", label: "Profile Settings", icon: Settings },
              ]
            : [
                { id: "overview", label: "Overview", icon: TrendingUp },
                { id: "experience", label: "Career & Experience", icon: Briefcase },
                { id: "articles", label: `Articles (${articles.length})`, icon: FileText },
                { id: "insights", label: "Analytics & Radar", icon: BarChart3 },
                { id: "settings", label: "Profile Settings", icon: Settings },
              ]
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`py-3 px-3.5 border-b-2 text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 text-blue-600 bg-blue-50/30"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* ========================================================================= */}
        {/* 1. OVERVIEW TAB                                                           */}
        {/* ========================================================================= */}
        {adminTab === "overview" && (
          <div className="space-y-6">
            {/* Free Tier Overview Banner */}
            {currentTier === "free" ? (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900">Basic Leader Directory Account</h2>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          Active Unverified
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                        Your profile is active in the iGEN sector directory with 1 unverified sector tag. Upgrade to Pioneer, Luminary, or Sovereign to activate KYC Blue Tick verification, LinkedIn career history, and thought leadership publishing.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/${locale}/profile/plans/leader`)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all shrink-0"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>View Leader Plans & Upgrade</span>
                  </button>
                </div>

                {/* Free vs Paid Capabilities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 block">PIONEER (PRO)</span>
                    <p className="text-xs text-slate-500">4 self-authored articles/mo, KYC Blue Tick, LinkedIn career timeline, Google-indexed URL.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200 space-y-2">
                    <span className="text-[11px] font-bold text-violet-800 block">LUMINARY (ELITE)</span>
                    <p className="text-xs text-slate-600">6 self-authored articles/mo, Top 10 directory ranking, Video Intro, Public Influence Score.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                    <span className="text-[11px] font-bold text-amber-900 block">SOVEREIGN</span>
                    <p className="text-xs text-slate-600">8 self-authored articles/mo, Guaranteed Sector #1 pinned ranking, downloadable Press Kit, due diligence dossier.</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Paid Tier Overview Banner */
              <>
                {/* Content Engine Quota Banner */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900">Monthly Content Engine Quota</h2>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentConfig.badgeClass}`}>
                          {currentConfig.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Active quota: <strong>{currentConfig.totalQuota} articles/month</strong> across your executive editorial team.
                      </p>
                    </div>

                    <button
                      onClick={() => setAdminTab("articles")}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all self-start md:self-auto flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Draft Thought Article</span>
                    </button>
                  </div>

                  {/* Content Engine Allocation Breakdown Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Self-Authored Quota</span>
                      <p className="text-base font-black text-slate-900 mt-0.5">{currentConfig.selfQuota} / month</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
                      <span className="text-[10px] font-bold text-blue-600 uppercase">Published This Month</span>
                      <p className="text-base font-black text-blue-900 mt-0.5">{articles.length} / {currentConfig.totalQuota}</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">Remaining Quota</span>
                      <p className="text-base font-black text-emerald-900 mt-0.5">{Math.max(0, currentConfig.totalQuota - articles.length)} Left</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
                      <span className="text-[10px] font-bold text-purple-600 uppercase">Publishing Format</span>
                      <p className="text-xs font-black text-purple-900 mt-1">Rich Studio + PDF/DOCX</p>
                    </div>
                  </div>
                </div>

                {/* Executive KPI Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-xs font-bold text-slate-400">Total Readership</span>
                    <p className="text-2xl font-black text-slate-900">18,420</p>
                    <span className="text-[11px] text-emerald-600 font-semibold block">↑ +24% institutional reads</span>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-xs font-bold text-slate-400">Followers</span>
                    <p className="text-2xl font-black text-slate-900">
                      {currentTier === "sovereign" ? "24,850" : currentTier === "luminary" ? "12,400" : "4,820"}
                    </p>
                    <span className="text-[11px] text-blue-600 font-semibold block">Top 5% sector following</span>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-xs font-bold text-slate-400">Influence Score</span>
                    <p className="text-2xl font-black text-slate-900">
                      {currentTier === "sovereign" ? "98" : currentTier === "luminary" ? "92" : "84"}/100
                    </p>
                    <span className="text-[11px] text-purple-600 font-semibold block">
                      {currentTier === "pioneer" ? "Private (Owner only)" : "Publicly Visible"}
                    </span>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                    <span className="text-xs font-bold text-slate-400">Sector Status</span>
                    <p className="text-lg font-black text-slate-900 truncate">
                      {currentTier === "sovereign" ? "Pinned #1 Icon" : currentTier === "luminary" ? "Top 10 Featured" : "General Placement"}
                    </p>
                    <span className="text-[11px] text-amber-600 font-semibold block">
                      {currentConfig.sectorTagLimit} Verified Sector Tag{currentConfig.sectorTagLimit > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Recent Thought Columns</h3>
                    <button
                      onClick={() => setAdminTab("articles")}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Manage All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {articles.map((art) => (
                      <div key={art.id} className="py-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {art.authorType}
                            </span>
                            <span className="text-xs text-slate-400">{art.date}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900">{art.title}</h4>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 text-xs">
                          <span className="text-slate-500 font-semibold">{art.reads} reads</span>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                            title="Delete"
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

        {/* ========================================================================= */}
        {/* 2. CAREER & EXPERIENCE TAB (LINKEDIN-STYLE MANAGER)                       */}
        {/* ========================================================================= */}
        {adminTab === "experience" && currentTier !== "free" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>Executive Experience & Career History</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                List your corporate trajectory, board directorships, and academic honors just like LinkedIn. These will be formatted into your executive timeline on your public profile.
              </p>
            </div>

            {/* Timeline Component in Editable Mode */}
            <ExecutiveExperienceTimeline isEditable={true} tier={currentTier} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. ARTICLES / THOUGHT LEADERSHIP TAB                                      */}
        {/* ========================================================================= */}
        {adminTab === "articles" && currentTier !== "free" && (
          <div className="space-y-6">
            {/* Executive Publishing Studio Banner Launcher */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Editorial Studio • {currentConfig.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      Quota: {articles.length}/{currentConfig.totalQuota} articles this month
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                    <span>Executive Publishing & Thought Studio</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Craft institutional market intelligence with photo and video uploads, editorial fonts, Word (.docx) imports, PDF whitepapers, and verifiable closing backcover endsheets.
                  </p>

                  {/* Feature Highlights */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Photos & Videos</span>
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>Word (.docx) & PDF Whitepaper</span>
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Executive Backcover & Endsheet</span>
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                      🔤 Serif • Sans • Display • Mono
                    </span>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingArticle(undefined);
                      setIsEditorOpen(true);
                    }}
                    className="w-full md:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 tracking-wide uppercase"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Launch Publishing Studio</span>
                  </button>
                </div>
              </div>
            </div>

            {articleSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Article saved and published to executive network feed!</span>
              </div>
            )}

            {/* Published Articles List */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Your Published Columns & Analyses ({articles.length})</h4>
                  <p className="text-xs text-slate-500">Live on your public executive profile and sector radar.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingArticle(undefined);
                    setIsEditorOpen(true);
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>+ New Column</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {articles.map((art) => (
                  <div key={art.id} className="py-5 first:pt-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
                    <div className="flex items-start gap-4">
                      {art.coverImage ? (
                        <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                          <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      ) : (
                        <div className="w-24 h-16 rounded-xl bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center text-slate-400">
                          <FileText className="w-6 h-6 text-slate-300" />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {art.authorType}
                          </span>
                          <span className="text-xs text-slate-400">{art.date}</span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs font-semibold text-slate-600">{art.sector}</span>

                          {/* Media & Attachment Badges */}
                          {art.pdfAttachment && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                              <Paperclip className="w-2.5 h-2.5" />
                              <span>PDF Report</span>
                            </span>
                          )}
                          {art.wordAttachment && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                              <FileText className="w-2.5 h-2.5" />
                              <span>DOCX</span>
                            </span>
                          )}
                          {art.hasBackcover && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              Endsheet Active
                            </span>
                          )}
                        </div>

                        <h5 className="text-sm font-bold text-slate-900 leading-snug">{art.title}</h5>
                        {art.subtitle && (
                          <p className="text-xs text-slate-500 line-clamp-1">{art.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <span className="text-xs font-bold text-slate-500">{art.reads} reads</span>
                      <button
                        type="button"
                        onClick={() => handleEditInStudio(art)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Edit in Studio
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. ANALYTICS TAB (60% SME PARITY + REVERSE-IP RADAR)                      */}
        {/* ========================================================================= */}
        {adminTab === "insights" && currentTier !== "free" && (
          <div className="space-y-6">
            <SmeAnalyticsHub
              currentTier={currentTier === "pioneer" ? "pro" : currentTier === "luminary" ? "elite" : currentTier === "sovereign" ? "sovereign" : "free"}
              role="leader"
              userName={editFullName}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. SETTINGS TAB                                                           */}
        {/* ========================================================================= */}
        {adminTab === "settings" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs max-w-2xl space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Leader Profile Metadata & Settings</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your executive title, company affiliation, and sector representation.
              </p>
            </div>

            {editSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Profile metadata saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal / Professional Name *</label>
                <input
                  type="text"
                  required
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Professional Designation *</label>
                  <input
                    type="text"
                    required
                    value={editDesignation}
                    onChange={(e) => setEditDesignation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Organisation / Company *</label>
                  <input
                    type="text"
                    required
                    value={editCompanyName}
                    onChange={(e) => setEditCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={editCountry}
                    onChange={(e) => setEditCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Website</label>
                  <input
                    type="url"
                    value={editCompanyWebsite}
                    onChange={(e) => setEditCompanyWebsite(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={editLinkedinUrl}
                    onChange={(e) => setEditLinkedinUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Executive Summary / Biography</label>
                <textarea
                  rows={4}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Leadership Philosophy Quote</label>
                <textarea
                  rows={2}
                  value={editPhilosophy}
                  onChange={(e) => setEditPhilosophy(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Save Profile Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Rich Article Editor Modal */}
      <RichArticleEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingArticle(undefined);
        }}
        onPublish={handleStudioPublish}
        initialData={editingArticle}
        userTier={currentTier}
        publishedCountThisMonth={articles.length}
        publishedCountThisWeek={1}
      />
    </div>
  );
}

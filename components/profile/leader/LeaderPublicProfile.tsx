"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  MapPin,
  ExternalLink,
  Share2,
  Check,
  Star,
  AlertCircle,
  Crown,
  Sparkles,
  Award,
  BookOpen,
  FileText,
  Video,
  Download,
  Building2,
  TrendingUp,
  BarChart3,
  Calendar,
  Globe2,
  Mic2,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Quote,
  UserCheck,
  ArrowRight,
  Eye,
  Shield,
  Layers,
  Flame,
  Users,
  ChevronRight,
  Play,
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import ExecutiveExperienceTimeline, {
  WorkExperienceItem,
  EducationItem,
  BoardAppointmentItem,
} from "@/components/profile/leader/common/ExecutiveExperienceTimeline";

export interface LeaderPublicProfileProps {
  leaderData?: any;
  tier?: "free" | "pioneer" | "luminary" | "sovereign";
  onUpgradeClick?: () => void;
  isOwner?: boolean;
}

export default function LeaderPublicProfile({
  leaderData = {},
  tier = "free",
  onUpgradeClick,
  isOwner = false,
}: LeaderPublicProfileProps) {
  const [activeTier, setActiveTier] = useState<"free" | "pioneer" | "luminary" | "sovereign">(tier);

  useEffect(() => {
    setActiveTier(tier);
  }, [tier]);

  const isFree = activeTier === "free";
  const isPioneer = activeTier === "pioneer";
  const isLuminary = activeTier === "luminary";
  const isSovereign = activeTier === "sovereign";

  // Tab State
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Profile data extraction with rich fallbacks
  const fullName =
    leaderData.fullName ||
    leaderData.name ||
    (isSovereign
      ? "Dr. Vikramaditya Singhania"
      : isLuminary
      ? "Rajeshwari Nambiar"
      : isPioneer
      ? "Arjun V. Kulkarni"
      : "Rohan Verma");

  const designation =
    leaderData.currentDesignation ||
    leaderData.designation ||
    (isSovereign
      ? "Chairman & Group Managing Director"
      : isLuminary
      ? "Chief Executive Officer & Board Member"
      : isPioneer
      ? "Founder & Executive Vice President"
      : "Director of Strategic Operations");

  const companyName =
    leaderData.leaderCompany ||
    leaderData.company ||
    (isSovereign
      ? "Singhania Global Conglomerate Ltd"
      : isLuminary
      ? "AeroDynamics India Holdings"
      : isPioneer
      ? "Kulkarni Precision Systems"
      : "Apex Industrial Solutions");

  const secondaryCompany =
    leaderData.secondaryCompany ||
    (isSovereign
      ? "Indo-Gulf Trade Advisory Board"
      : isLuminary
      ? "CleanTech India Consortium"
      : "");

  const primarySectorId = leaderData.sector || "manufacturing";
  const primarySectorName =
    SECTORS.find((s) => s.id === primarySectorId)?.name || "Advanced Manufacturing & Engineering";

  const secondarySectors: string[] =
    leaderData.secondarySectors && leaderData.secondarySectors.length > 0
      ? leaderData.secondarySectors.map((sId: string) => SECTORS.find((s) => s.id === sId)?.name || sId)
      : isSovereign
      ? ["Cross-Border Bilateral Corridors", "Renewable Energy & ESG", "Defence & Aerospace", "Industrial Robotics"]
      : isLuminary
      ? ["Supply Chain Logistics", "Clean Energy & Carbon Markets"]
      : [];

  const experienceYears =
    leaderData.experienceYears || (isSovereign ? 28 : isLuminary ? 22 : isPioneer ? 16 : 12);
  const followersCount = isSovereign ? "24,850" : isLuminary ? "12,400" : isPioneer ? "4,820" : "142";
  const influenceScore = isSovereign ? 98 : isLuminary ? 92 : 84;

  const bio =
    leaderData.aboutText ||
    leaderData.bio ||
    (isSovereign
      ? "Over 28 years shaping India's high-tech industrial export landscape. Architect of bilateral trade corridors across Europe, UAE, and Southeast Asia, overseeing $1.4B in cross-border infrastructure and precision aerospace deployments."
      : isLuminary
      ? "A 22-year visionary leader transforming aerospace precision manufacturing and clean-tech supply chains. Former recipient of the National Manufacturing Excellence Award and active advisor on national bilateral trade strategy."
      : isPioneer
      ? "16+ years pioneering modular industrial automation and smart factory robotics. Driving SME modernization across high-precision Indian automotive and engineering clusters."
      : "Executive with 12+ years of experience in strategic operations and supply chain management across industrial manufacturing sectors.");

  const philosophy =
    leaderData.philosophy ||
    (isSovereign
      ? "True sovereignty in global trade is not merely about volume; it is about building irreproducible precision, ethical governance, and institutional trust that endures for generations."
      : isLuminary
      ? "Leadership is the relentless pursuit of elevating industry benchmarks through collaborative innovation, disciplined execution, and empowering the next generation of specialists."
      : isPioneer
      ? "Innovation must solve physical floor-level problems before it scales to global boardrooms."
      : "Driving operational excellence and building collaborative teams to achieve sustainable business growth.");

  const headshot = leaderData.headshotBase64 || leaderData.headshot || "";
  const website = leaderData.companyWebsite || leaderData.website || "https://example.com";
  const linkedinUrl = leaderData.linkedinUrl || "https://linkedin.com";

  // Sample Articles
  const sampleArticles = [
    {
      id: "art-1",
      title: `The 2026 Shift in Indo-European Aerospace Supply Corridors`,
      authorType: "Self-Authored",
      date: "August 2026",
      reads: "4.8K Reads",
      readTime: "6 min read",
      sector: primarySectorName,
      pdf: isSovereign || isLuminary ? "Indo_European_Aerospace_2026.pdf" : null,
      excerpt: "Deep analysis into how European tier-1 aerospace conglomerates are redirecting titanium machining and composite parts sourcing to Tamil Nadu and Karnataka clusters.",
    },
    {
      id: "art-2",
      title: `De-Risking Critical Raw Material Dependencies in Heavy Metallurgy`,
      authorType: "Self-Authored",
      date: "July 2026",
      reads: "3.2K Reads",
      readTime: "5 min read",
      sector: primarySectorName,
      pdf: isSovereign ? "Raw_Material_Security_Metallurgy.pdf" : null,
      excerpt: "Strategic stockpiling and bilateral supply pacts: examining domestic alternative sourcing frameworks amidst global mineral cartel volatility.",
    },
    {
      id: "art-3",
      title: `Bilateral Tariff Arbitrage: Why Precision Exporters Must Restructure Desks in 2026`,
      authorType: "iGEN AI Research Editor",
      date: "August 2026",
      reads: "3.1K Reads",
      readTime: "4 min read",
      sector: "Trade Policy",
      excerpt: "Comprehensive evaluation of zero-duty tariff mechanisms under the India-UAE CEPA and its practical arbitrage opportunities for precision manufacturing.",
    },
    {
      id: "art-4",
      title: `Executive Deep-Dive: Building Resilient Cross-Border Supply Corridors`,
      authorType: "SME Co-Authored",
      date: "June 2026",
      reads: "4.2K Reads",
      readTime: "7 min read",
      sector: "Supply Chain",
      excerpt: "Joint advisory framework exploring multi-modal transit corridors connecting JNPT with Jebel Ali and European distribution gateways.",
    },
    {
      id: "art-5",
      title: `Comparative Analysis: High-Tech Export Margins Under CEPA Trade Pacts`,
      authorType: "ASME Research Fellow",
      date: "May 2026",
      reads: "2.1K Reads",
      readTime: "5 min read",
      sector: "Bilateral Trade",
      excerpt: "Empirical margin differentials observed among Indian specialized export MSMEs utilizing preferential tariff certificates.",
    },
    {
      id: "art-6",
      title: `Next-Generation ESG Mandates and Industrial Clean-Energy Transitions`,
      authorType: "iGEN AI Research Editor",
      date: "April 2026",
      reads: "2.8K Reads",
      readTime: "5 min read",
      sector: "ESG & Compliance",
      excerpt: "Practical guide for industrial manufacturing leadership transitioning energy baselines to qualify for EU CBAM carbon tariff exemptions.",
    },
  ];

  const parsedArticles = Array.isArray(leaderData.articles) && leaderData.articles.length > 0
    ? leaderData.articles.map((a: any) => ({
        id: a.id,
        title: a.title,
        authorType: a.authorType || "Self-Authored",
        date: a.date || "2026",
        reads: typeof a.reads === "number" ? `${a.reads.toLocaleString()} Reads` : a.reads || "1.2K Reads",
        readTime: a.readTime || "5 min read",
        sector: a.sector || primarySectorName,
        pdf: a.pdfAttachment?.name || a.pdf || null,
        word: a.wordAttachment?.name || a.word || null,
        coverImage: a.coverImage,
        hasBackcover: a.hasBackcover,
        excerpt: a.subtitle || (a.content ? a.content.slice(0, 150) + "..." : "Strategic insights and executive analysis."),
      }))
    : sampleArticles;

  const articlesToShow = isSovereign
    ? parsedArticles.slice(0, 8)
    : isLuminary
    ? parsedArticles.slice(0, 6)
    : isPioneer
    ? parsedArticles.slice(0, 4)
    : [];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // =========================================================================
  // 1. FREE LEADER PROFILE VIEW (Clean, Light, Followers Count ONLY)
  // =========================================================================
  if (isFree) {
    return (
      <div className="bg-[#fafaf9] text-slate-800 min-h-screen p-4 md:p-10 font-sans">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Status Alert for Unverified */}
          <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-center justify-between flex-wrap gap-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Basic Executive Profile · Self-Declared · Upgrade to Pioneer for KYC Blue Tick Verification</span>
            </div>
            {isOwner && onUpgradeClick && (
              <button
                onClick={onUpgradeClick}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                Explore Plans
              </button>
            )}
          </div>

          {/* Basic Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {headshot ? (
                  <img
                    src={headshot}
                    alt={fullName}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 text-slate-700 font-black text-2xl flex items-center justify-center border border-slate-200 shadow-xs">
                    {fullName.charAt(0)}
                  </div>
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{fullName}</h1>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md border border-slate-200">
                      Basic Member
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    {designation} · {companyName}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/80 font-medium text-[11px]">
                      {primarySectorName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                    isFollowing
                      ? "bg-slate-100 text-slate-800 border border-slate-200"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isFollowing ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Users className="w-3.5 h-3.5" />}
                  <span>{isFollowing ? "Following" : "Follow"}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all border border-slate-200"
                  title="Share Profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Followers Metric ONLY */}
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 max-w-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Verified Followers
              </span>
              <span className="text-2xl font-black text-slate-900">{followersCount}</span>
            </div>

            {/* Bio Paragraph */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Executive Summary</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{bio}</p>
            </div>
          </div>

          {/* Clean Light Notice */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 text-center space-y-2 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900">Official Leader Directory Presence</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              This executive profile is active in the iGEN Sector Directory. Verified thought leadership columns, career timeline milestones, and media keynotes are enabled on Pioneer, Luminary, and Sovereign tiers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. PIONEER, LUMINARY, SOVEREIGN THEMES (LIGHT, SERENE, AESTHETIC)
  // =========================================================================

  const tierStyles = {
    pioneer: {
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      badgeIcon: ShieldCheck,
      badgeLabel: "Pioneer Executive",
      accentText: "text-blue-600",
      pillBg: "bg-blue-50/80 text-blue-700 border-blue-200/80",
      buttonBg: "bg-blue-600 hover:bg-blue-700 text-white",
      activeTabClass: "bg-blue-600 text-white shadow-sm",
    },
    luminary: {
      badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
      badgeIcon: Crown,
      badgeLabel: "Luminary Leader · Top 10",
      accentText: "text-violet-600",
      pillBg: "bg-violet-50/80 text-violet-700 border-violet-200/80",
      buttonBg: "bg-violet-600 hover:bg-violet-700 text-white",
      activeTabClass: "bg-violet-600 text-white shadow-sm",
    },
    sovereign: {
      badgeBg: "bg-amber-50 text-amber-900 border-amber-300/80",
      badgeIcon: Award,
      badgeLabel: "👑 Sovereign · Guaranteed Sector #1",
      accentText: "text-amber-700",
      pillBg: "bg-amber-50/80 text-amber-900 border-amber-300/60",
      buttonBg: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold",
      activeTabClass: "bg-slate-900 text-white shadow-sm",
    },
  }[activeTier as "pioneer" | "luminary" | "sovereign"];

  // Available Tabs per Tier (Exact Matrix Specification)
  // Pioneer: 2 Tabs (Overview, Leadership Story)
  // Luminary: 4 Tabs (Overview, Leadership Story, Thought Leadership, Speaking & Media)
  // Sovereign: 5 Tabs (Overview, Leadership Story, Thought Leadership, Speaking & Media, Sector Authority)
  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "story", label: "Leadership Story & Experience", icon: BookOpen },
    ...((isPioneer || isLuminary || isSovereign)
      ? [
          { id: "articles", label: "Thought Leadership", icon: FileText, count: articlesToShow.length },
        ]
      : []),
    ...((isLuminary || isSovereign)
      ? [
          { id: "speaking", label: "Speaking & Media", icon: Mic2 },
        ]
      : []),
    ...(isSovereign
      ? [{ id: "authority", label: "Sector Authority (#1)", icon: Crown }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-800 p-4 md:p-8 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ========================================================================= */}
        {/* VERIFICATION & CANONICAL STRIP                                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>KYC Blue Tick Verified · Curated by iGEN</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <span>/topleader/{fullName.toLowerCase().replace(/[^a-z0-9]/g, "")}</span>
            </div>
            {isSovereign && (
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-amber-600" /> Guaranteed Sector #1
              </span>
            )}
            {isLuminary && (
              <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-800 border border-violet-200 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" /> Top 10 Sector Pinned
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                isFollowing
                  ? "bg-slate-100 text-slate-800 border border-slate-200"
                  : tierStyles.buttonBg
              }`}
            >
              {isFollowing ? <Check className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
              <span>{isFollowing ? "Following Leader" : "Follow"}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-all border border-slate-200 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" /> {copiedLink ? "Copied!" : "Share"}
            </button>
            {(isLuminary || isSovereign) && (
              <button
                onClick={() => alert(`Downloading Digital Bio Card for ${fullName}`)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all border border-slate-200 shadow-xs flex items-center gap-1.5"
                title="Download Digital Bio Card"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Bio Card</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXECUTIVE HERO CARD (LIGHT & AESTHETIC)                                   */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative shrink-0">
                {headshot ? (
                  <img
                    src={headshot}
                    alt={fullName}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover border-2 border-slate-200 shadow-sm"
                  />
                ) : (
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-4xl font-black text-slate-700 bg-slate-100 border-2 border-slate-200 shadow-sm">
                    {fullName.charAt(0)}
                  </div>
                )}
                {/* Blue Tick Badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md border-2 border-white">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {fullName}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tierStyles.badgeBg}`}>
                    {tierStyles.badgeLabel}
                  </span>
                </div>

                <p className="text-sm md:text-base font-bold text-slate-700 flex items-center gap-2 flex-wrap">
                  <span>{designation}</span>
                  <span className="text-slate-400">·</span>
                  <span className={tierStyles.accentText}>{companyName}</span>
                </p>

                {secondaryCompany && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Board / Advisory: {secondaryCompany}</span>
                  </p>
                )}

                {/* Verified Sector Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${tierStyles.pillBg}`}>
                    {primarySectorName}
                  </span>
                  {secondarySectors.map((sec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Metrics & Influence Dial */}
            <div className="flex items-center gap-4 flex-wrap self-stretch lg:self-center bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 justify-around">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Followers
                </span>
                <span className="text-lg font-black text-slate-900">{followersCount}</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Experience
                </span>
                <span className="text-lg font-black text-slate-900">{experienceYears}+ Yrs</span>
              </div>

              {/* Public Influence Score (Luminary & Sovereign only) */}
              {(isLuminary || isSovereign) && (
                <>
                  <div className="w-px h-8 bg-slate-200" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500" /> Influence
                    </span>
                    <span className="text-lg font-black text-blue-600">{influenceScore}/100</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Video Intro Callout (Luminary & Sovereign) */}
          {(isLuminary || isSovereign) && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border border-blue-200/80 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Executive Video Introduction (60s)</h4>
                  <p className="text-[11px] text-slate-600">
                    Watch {fullName}'s recorded perspective on bilateral trade and industrial growth.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-3 py-1.5 bg-white text-blue-700 text-xs font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-all shadow-xs"
              >
                Watch Video
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* PUBLIC NAVIGATION TABS                                                    */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW                                                           */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Executive Biography */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Executive Overview & Bio</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{bio}</p>
              </div>

              {/* Leadership Philosophy Quote */}
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
                <Quote className="w-6 h-6 text-blue-600 opacity-60" />
                <p className="text-sm font-serif italic text-slate-800 leading-relaxed">
                  "{philosophy}"
                </p>
                <span className="text-xs font-bold text-slate-400 block">— {fullName}, {designation}</span>
              </div>

              {/* Featured Articles Quick Preview */}
              {articlesToShow.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Featured Thought Leadership</h3>
                    <button
                      onClick={() => setActiveTab("articles")}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>View All ({articlesToShow.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {articlesToShow.slice(0, 2).map((art) => (
                      <div key={art.id} className="py-3 first:pt-0 space-y-1.5">
                        <span className="text-[10px] font-bold text-blue-600">{art.authorType} · {art.date}</span>
                        <h4 className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{art.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Corporate Affiliation Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Corporate Affiliation</h4>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 shrink-0">
                    {companyName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{companyName}</h5>
                    <p className="text-[11px] text-slate-500">{designation}</p>
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 mt-1 font-semibold"
                    >
                      <span>Corporate Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Verified Credentials Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executive Accreditations</h4>
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>iGEN Verified Top Leader</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Apex Corporate Council Member</span>
                  </div>
                  {isSovereign && (
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Sovereign Industrial Fellowship</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LEADERSHIP STORY & LINKEDIN-STYLE EXPERIENCE TIMELINE              */}
        {/* ========================================================================= */}
        {activeTab === "story" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Career Trajectory & Executive Experience</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified work history, board directorships, and academic credentials.
              </p>
            </div>

            {/* LinkedIn Timeline Renderer */}
            <ExecutiveExperienceTimeline isEditable={false} tier={activeTier} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: THOUGHT LEADERSHIP ARTICLES (Pioneer, Luminary, Sovereign)        */}
        {/* ========================================================================= */}
        {activeTab === "articles" && (isPioneer || isLuminary || isSovereign) && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Thought Leadership Columns ({articlesToShow.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Authored strategic commentary and collaborative industrial briefings.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 space-y-4">
              {articlesToShow.map((art: any) => (
                <div key={art.id} className="pt-5 first:pt-0 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">{art.authorType}</span>
                      <span>·</span>
                      <span>{art.date}</span>
                      {art.hasBackcover && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          Endsheet
                        </span>
                      )}
                    </div>
                    <span>{art.reads}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {art.coverImage && (
                      <div className="w-full sm:w-36 h-24 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                        <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="space-y-1.5 flex-1">
                      <h4 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{art.excerpt}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium">{art.readTime} · {art.sector}</span>
                    <div className="flex items-center gap-2">
                      {art.word && (
                        <button
                          onClick={() => alert(`Downloading Word Brief: ${art.word}`)}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all border border-blue-200 flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span>Download Word (.docx)</span>
                        </button>
                      )}
                      {art.pdf && (
                        <button
                          onClick={() => alert(`Downloading Whitepaper: ${art.pdf}`)}
                          className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-all border border-emerald-200 flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Download PDF Report</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SPEAKING & MEDIA APPEARANCES (Luminary & Sovereign)                */}
        {/* ========================================================================= */}
        {activeTab === "speaking" && (isLuminary || isSovereign) && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Conference Keynotes & Media Appearances</h3>
                  <p className="text-xs text-slate-500">
                    Official summit addresses, panel moderations, and international press coverage.
                  </p>
                </div>
                {isSovereign && (
                  <button
                    onClick={() => alert(`Downloading Official Press Kit for ${fullName}`)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Media Press Kit (PDF)</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    summit: "Indo-Global Advanced Manufacturing Summit 2026",
                    topic: "Reshoring Critical Metallurgy & Bilateral Free Trade Zones",
                    location: "Geneva, Switzerland",
                    type: "Plenary Keynote",
                    date: "May 2026",
                  },
                  {
                    summit: "ASEAN-India Economic Ministers Council",
                    topic: "Next-Gen Cross-Border Trade Finance & Digital Rupee Settlements",
                    location: "Singapore",
                    type: "Panel Chair",
                    date: "March 2026",
                  },
                  {
                    summit: "CII National Manufacturing Conclave",
                    topic: "Accelerating India's PLI Corridors for Global Competitiveness",
                    location: "New Delhi, India",
                    type: "Keynote Address",
                    date: "Jan 2026",
                  },
                  {
                    summit: "World Economic Forum Regional Executive Briefing",
                    topic: "Supply Chain Decoupling & Supply Risk Mitigation",
                    location: "Virtual Executive Round",
                    type: "Panelist",
                    date: "Nov 2025",
                  },
                ].map((conf, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {conf.type}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{conf.date}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{conf.summit}</h4>
                    <p className="text-xs text-slate-600">"{conf.topic}"</p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{conf.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SECTOR AUTHORITY (#1 PINNED) (Sovereign Only)                      */}
        {/* ========================================================================= */}
        {activeTab === "authority" && isSovereign && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">Sector Authority & Dominance Dossier</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                    Guaranteed #1 Rank
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Institutional Investor Due Diligence and verified sector standing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-800">Sector Ranking</span>
                <p className="text-2xl font-black text-amber-950">#1 of 482 Leaders</p>
                <span className="text-[11px] text-amber-700 font-semibold">Pinned Top Authority in {primarySectorName}</span>
              </div>
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-800">Institutional Reads</span>
                <p className="text-2xl font-black text-blue-950">18,400 Views</p>
                <span className="text-[11px] text-blue-700 font-semibold">Ministries, Sovereign Funds, Board Members</span>
              </div>
              <div className="p-5 rounded-2xl bg-violet-50/60 border border-violet-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-violet-800">Cross-Sector Reach</span>
                <p className="text-2xl font-black text-violet-950">5 Verified Tags</p>
                <span className="text-[11px] text-violet-700 font-semibold">International due diligence unlocked</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-600 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">Institutional Due Diligence Summary</h4>
              <p>
                Dr. Singhania's profile maintains an active corporate standing verified against public stock exchange disclosures and institutional certifications. All policy briefings and economic citations are reviewed under iGEN sovereign editorial standards.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal Preview */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Executive Video Introduction</h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="w-full aspect-video bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-500 gap-2 border border-slate-200">
              <Play className="w-12 h-12 text-blue-600 opacity-80" />
              <span className="text-xs font-semibold">60-Second Executive Bio: {fullName}</span>
            </div>
            <p className="text-xs text-slate-500">
              Recorded address discussing bilateral supply corridors, industrial robotics, and ESG governance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

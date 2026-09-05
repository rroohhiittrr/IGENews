"use client";

import { useState } from "react";
import {
  ShieldCheck,
  MapPin,
  Mail,
  ExternalLink,
  Lock,
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
  Bot,
  PenLine,
  Handshake,
  UserCheck,
  ArrowRight,
  Eye,
  Shield,
  Layers,
  Flame,
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

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
  const isFree = tier === "free";
  const isPioneer = tier === "pioneer";
  const isLuminary = tier === "luminary";
  const isSovereign = tier === "sovereign";

  // Tab State
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [copiedLink, setCopiedLink] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryType, setInquiryType] = useState<"speaking" | "media" | "consulting" | "general">("speaking");
  const [inquiryForm, setInquiryForm] = useState({ name: "", email: "", organization: "", message: "" });

  // Profile data extraction with rich fallbacks
  const fullName = leaderData.fullName || leaderData.name || (isSovereign ? "Dr. Vikramaditya Singhania" : isLuminary ? "Rajeshwari Nambiar" : isPioneer ? "Arjun V. Kulkarni" : "Rohan Verma");
  const designation = leaderData.currentDesignation || leaderData.designation || (isSovereign ? "Chairman & Group Managing Director" : isLuminary ? "Chief Executive Officer & Board Member" : isPioneer ? "Founder & Executive Vice President" : "Director of Strategic Operations");
  const companyName = leaderData.leaderCompany || leaderData.company || (isSovereign ? "Singhania Global Conglomerate Ltd" : isLuminary ? "AeroDynamics India Holdings" : isPioneer ? "Kulkarni Precision Systems" : "Apex Industrial Solutions");
  const secondaryCompany = leaderData.secondaryCompany || (isSovereign ? "Indo-Gulf Trade Advisory Board" : isLuminary ? "CleanTech India Consortium" : "");
  const primarySectorId = leaderData.sector || "manufacturing";
  const primarySectorName = SECTORS.find((s) => s.id === primarySectorId)?.name || "Advanced Manufacturing & Engineering";
  
  const secondarySectors = leaderData.secondarySectors && leaderData.secondarySectors.length > 0
    ? leaderData.secondarySectors.map((sId: string) => SECTORS.find(s => s.id === sId)?.name || sId)
    : (isSovereign ? ["Cross-Border Bilateral Corridors", "Renewable Energy & ESG", "Defence & Aerospace", "Industrial Robotics"] : isLuminary ? ["Supply Chain Logistics", "Clean Energy"] : []);

  const experienceYears = leaderData.experienceYears || (isSovereign ? 28 : isLuminary ? 22 : isPioneer ? 16 : 12);
  const roleLevel = leaderData.roleLevel || (isSovereign ? "Group Chairman / Apex Executive" : isLuminary ? "C-Suite (CEO / MD)" : isPioneer ? "Founder / Executive VP" : "Senior Director");
  const bio = leaderData.aboutText || leaderData.bio || (isSovereign 
    ? "Over 28 years shaping India's high-tech industrial export landscape. Architect of bilateral trade corridors across Europe, UAE, and Southeast Asia, overseeing $1.4B in cross-border infrastructure and precision aerospace deployments."
    : isLuminary
    ? "A 22-year visionary leader transforming aerospace precision manufacturing and clean-tech supply chains. Former recipient of the National Manufacturing Excellence Award and active advisor on national bilateral trade strategy."
    : isPioneer
    ? "16+ years pioneering modular industrial automation and smart factory robotics. Driving SME modernization across high-precision Indian automotive and engineering clusters."
    : "Executive with 12+ years of experience in strategic operations and supply chain management across industrial manufacturing sectors.");

  const philosophy = leaderData.philosophy || (isSovereign
    ? "True sovereignty in global trade is not merely about volume; it is about building irreproducible precision, ethical governance, and institutional trust that endures for generations."
    : isLuminary
    ? "Leadership is the relentless pursuit of elevating industry benchmarks through collaborative innovation, disciplined execution, and empowering the next generation of specialists."
    : isPioneer
    ? "Innovation must solve physical floor-level problems before it scales to global boardrooms."
    : "Driving operational excellence and building collaborative teams to achieve sustainable business growth.");

  const headshot = leaderData.headshotBase64 || leaderData.headshot || "";
  const website = leaderData.companyWebsite || leaderData.website || "https://example.com";
  const linkedinUrl = leaderData.linkedinUrl || "https://linkedin.com";

  // Career Timeline
  const timeline = leaderData.timeline && leaderData.timeline.length > 0 ? leaderData.timeline : [
    { company: companyName, role: designation, years: "2018 — Present" },
    { company: "Tata Strategic Enterprise Group", role: "Vice President — Global Supply & Strategy", years: "2012 — 2018" },
    { company: "Bharat Precision Forgings Ltd", role: "General Manager — Operations & Export Desks", years: "2006 — 2012" },
  ];

  // Education
  const education = leaderData.education && leaderData.education.length > 0 ? leaderData.education : [
    { institution: "Indian Institute of Technology (IIT) Bombay", degree: "B.Tech in Mechanical & Industrial Engineering", year: "1998" },
    { institution: "Indian Institute of Management (IIM) Ahmedabad", degree: "Post Graduate Diploma in Management (Executive)", year: "2004" },
  ];

  // Achievements & Awards
  const achievements = leaderData.achievements && leaderData.achievements.length > 0 ? leaderData.achievements : [
    "Conferred 'National Sector Icon in Bilateral Trade' by India Chamber of Exports (2024)",
    "Engineered 300% export growth corridor connecting Indian precision engineering to GCC markets",
    "Keynote Speaker at Indo-Global Manufacturing Summit (Geneva, 2025)",
    "Published 24+ industry policy whitepapers cited by commerce federations",
  ];

  // Sample Articles per tier
  const sampleArticles = [
    {
      id: "art-1",
      title: `The 2026 Shift in Indo-European Aerospace Supply Corridors`,
      authorType: "leader",
      authorName: fullName,
      authorRole: "Self-Authored",
      date: "August 2026",
      reads: "2.4K Reads",
      readTime: "6 min read",
      sector: primarySectorName,
    },
    {
      id: "art-2",
      title: `De-Risking Critical Raw Material Dependencies in Heavy Metallurgy`,
      authorType: "leader",
      authorName: fullName,
      authorRole: "Self-Authored",
      date: "July 2026",
      reads: "1.9K Reads",
      readTime: "5 min read",
      sector: primarySectorName,
    },
    {
      id: "art-3",
      title: `Bilateral Tariff Arbitrage: Why Precision Exporters Must Restructure Desks in 2026`,
      authorType: "ai",
      authorName: "iGEN AI Research Editor",
      authorRole: "Reviewed & Approved by Leader",
      date: "August 2026",
      reads: "3.1K Reads",
      readTime: "4 min read",
      sector: "Trade Policy",
    },
    {
      id: "art-4",
      title: `Executive Deep-Dive: How Dr. Singhania Built a Resilient Global Supply Chain`,
      authorType: "sme",
      authorName: "SME Editorial Desk",
      authorRole: "Sector SME Contributor",
      date: "June 2026",
      reads: "4.2K Reads",
      readTime: "7 min read",
      sector: "Supply Chain",
    },
    {
      id: "art-5",
      title: `Comparative Analysis: High-Tech Export Margins Under CEPA Trade Pacts`,
      authorType: "asme",
      authorName: "Associate SME Contributor",
      authorRole: "ASME Research Fellow",
      date: "May 2026",
      reads: "1.6K Reads",
      readTime: "5 min read",
      sector: "Bilateral Trade",
    },
    {
      id: "art-6",
      title: `Next-Generation ESG Mandates and Industrial Clean-Energy Transits`,
      authorType: "ai",
      authorName: "iGEN AI Research Editor",
      authorRole: "Leader-Approved Synthesis",
      date: "April 2026",
      reads: "2.8K Reads",
      readTime: "5 min read",
      sector: "ESG & Compliance",
    },
  ];

  const articlesToShow = isSovereign ? sampleArticles : isLuminary ? sampleArticles.slice(0, 5) : isPioneer ? sampleArticles.slice(0, 2) : [];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryModalOpen(false);
      setInquiryForm({ name: "", email: "", organization: "", message: "" });
    }, 2000);
  };

  // =========================================================================
  // 1. FREE LEADER PROFILE VIEW (Slate Dark, Unverified, Locked Teasers)
  // =========================================================================
  if (isFree) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen p-4 md:p-10 font-sans">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Unverified Top Warning */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Unverified Basic Leader Profile · Self-Declared Presence · Not Google-Indexed</span>
            </div>
            {isOwner && onUpgradeClick && (
              <button
                onClick={onUpgradeClick}
                className="px-3.5 py-1.5 bg-[#F0652E] hover:bg-[#d85522] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Upgrade to Pioneer / Luminary
              </button>
            )}
          </div>

          {/* Basic Header Card */}
          <div className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {headshot ? (
                  <img src={headshot} alt={fullName} className="w-16 h-16 rounded-2xl object-cover border border-slate-700" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 text-white font-black text-2xl flex items-center justify-center border border-slate-700">
                    {fullName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black text-white">{fullName}</h1>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-md">
                      ⚠️ Unverified
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">{designation} · {companyName}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{primarySectorName}</p>
                </div>
              </div>
              <button
                onClick={handleShare}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" /> {copiedLink ? "Link Copied!" : "Share Profile"}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              {bio}
            </p>
          </div>

          {/* Locked Tab Teasers */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Public Profile Architecture</span>
              <span className="text-[10px] text-slate-500">1 of 5 Tabs Unlocked</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Leadership Story & Principles", desc: "Full executive trajectory and philosophy quote", unlock: "Pioneer" },
                { title: "Thought Leadership Columns", desc: "Monthly verified articles & bylined trade analysis", unlock: "Luminary" },
                { title: "Awards & Official Accolades", desc: "Verified institutional awards and certifications", unlock: "Luminary" },
                { title: "Public Leader Influence Score", desc: "Composite trust rating (Page views + Sector rank)", unlock: "Luminary" },
                { title: "Sector Authority & Due Diligence", desc: "Guaranteed Sector #1 ranking and investor profile", unlock: "Sovereign" },
                { title: "Press Kit & Speaking Engine", desc: "Direct media inquiry routing and downloadable PDF kit", unlock: "Sovereign" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-300">{item.title}</h4>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-orange-500/10 text-orange-400">
                        {item.unlock}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Inquiry Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F0652E]" /> Contact / Standard Inquiries
            </h3>
            <p className="text-xs text-slate-400">Inquiries sent to unverified profiles receive standard queue routing.</p>
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all"
            >
              Send Inquiry to {fullName}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. PIONEER, LUMINARY, SOVEREIGN THEMES
  // =========================================================================
  
  // Theme Color Configurations
  const theme = {
    pioneer: {
      bg: "bg-gradient-to-b from-[#050d1e] via-[#071428] to-[#050d1e]",
      cardBg: "bg-[#091830]/80 border-blue-500/20 backdrop-blur-md",
      accentText: "text-blue-400",
      accentBg: "bg-blue-500/10",
      accentBorder: "border-blue-500/30",
      badgeGradient: "from-blue-600 to-indigo-600",
      badgeText: "🔷 Pioneer Executive Authority",
      scoreColor: "text-blue-400",
      pillBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      tabActive: "bg-blue-600 text-white shadow-lg shadow-blue-900/30",
      tabInactive: "text-slate-400 hover:text-white hover:bg-white/5",
    },
    luminary: {
      bg: "bg-gradient-to-b from-[#0d1014] via-[#1a1200] to-[#0d1014]",
      cardBg: "bg-[#14151a]/90 border-amber-500/30 backdrop-blur-md",
      accentText: "text-amber-400",
      accentBg: "bg-amber-500/10",
      accentBorder: "border-amber-500/40",
      badgeGradient: "from-amber-500 to-yellow-600",
      badgeText: "🌟 Top Leader · Luminary",
      scoreColor: "text-amber-400",
      pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      tabActive: "bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-900/40",
      tabInactive: "text-slate-400 hover:text-amber-300 hover:bg-amber-500/5",
    },
    sovereign: {
      bg: "bg-gradient-to-b from-[#060308] via-[#0e0515] to-[#060308]",
      cardBg: "bg-[#12081c]/90 border-purple-500/40 backdrop-blur-md shadow-2xl shadow-purple-950/40",
      accentText: "text-purple-400",
      accentBg: "bg-purple-500/10",
      accentBorder: "border-purple-500/40",
      badgeGradient: "from-purple-600 via-fuchsia-600 to-amber-500",
      badgeText: "👑 Sector Sovereign · Guaranteed Sector #1 Icon",
      scoreColor: "text-purple-400",
      pillBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      tabActive: "bg-gradient-to-r from-purple-700 to-violet-600 text-white shadow-lg shadow-purple-900/50",
      tabInactive: "text-slate-400 hover:text-purple-300 hover:bg-purple-500/5",
    },
  }[tier as "pioneer" | "luminary" | "sovereign"];

  // Available Tabs per Tier
  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "story", label: "Leadership Story", icon: BookOpen },
    ...((isLuminary || isSovereign) ? [
      { id: "articles", label: "Thought Leadership", icon: FileText, count: articlesToShow.length },
      { id: "awards", label: "Awards & Accolades", icon: Award },
      { id: "speaking", label: "Speaking & Media", icon: Mic2 },
    ] : []),
    ...(isSovereign ? [
      { id: "authority", label: "Sector Authority (#1)", icon: Crown },
    ] : []),
  ];

  return (
    <div className={`min-h-screen ${theme.bg} text-slate-100 p-4 md:p-8 lg:p-12 font-sans selection:bg-purple-500 selection:text-white`}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* TOP BAR / VERIFICATION SEAL STRIP                                         */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>KYC Blue Tick Verified · Curated by iGEN</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              <span>/topleader/{fullName.toLowerCase().replace(/[^a-z0-9]/g, "")}</span>
            </div>
            {isSovereign && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Crown className="w-3.5 h-3.5" /> Pinned Sector #1
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" /> {copiedLink ? "Copied!" : "Share"}
            </button>
            <button
              onClick={() => setInquiryModalOpen(true)}
              className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-white transition-all shadow-md ${
                isSovereign
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:opacity-90"
                  : isLuminary
                  ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:opacity-90"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Connect / Inquire
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO EXECUTIVE CARD                                                       */}
        {/* ========================================================================= */}
        <div className={`rounded-3xl border p-6 md:p-10 ${theme.cardBg} space-y-6 relative overflow-hidden`}>
          {/* Subtle Ambient Glow */}
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none ${
            isSovereign ? "bg-purple-500" : isLuminary ? "bg-amber-500" : "bg-blue-500"
          }`} />

          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 relative z-10">
            {/* Left: Avatar + Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative shrink-0">
                {headshot ? (
                  <img
                    src={headshot}
                    alt={fullName}
                    className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover border-2 shadow-xl ${
                      isSovereign ? "border-purple-500/60" : isLuminary ? "border-amber-500/60" : "border-blue-500/60"
                    }`}
                  />
                ) : (
                  <div className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-xl border-2 ${
                    isSovereign ? "bg-gradient-to-br from-purple-900 to-slate-900 border-purple-500/40" : isLuminary ? "bg-gradient-to-br from-amber-900 to-slate-900 border-amber-500/40" : "bg-gradient-to-br from-blue-900 to-slate-900 border-blue-500/40"
                  }`}>
                    {fullName.charAt(0)}
                  </div>
                )}
                {/* Blue Tick Absolute Badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-[#091830]">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    {fullName}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r ${theme.badgeGradient}`}>
                    {isSovereign ? "👑 Sovereign" : isLuminary ? "🌟 Luminary" : "🔷 Pioneer"}
                  </span>
                </div>

                <p className="text-sm md:text-base font-bold text-slate-200 flex items-center gap-2 flex-wrap">
                  <span>{designation}</span>
                  <span className="text-slate-500">·</span>
                  <span className={theme.accentText}>{companyName}</span>
                </p>

                {secondaryCompany && (
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Board / Advisory: {secondaryCompany}</span>
                  </p>
                )}

                {/* Sector Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${theme.pillBg}`}>
                    {primarySectorName}
                  </span>
                  {secondarySectors.map((sec: any, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Key Metrics / Influence Score Widget */}
            <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0">
              {(isLuminary || isSovereign) ? (
                <div className="text-left lg:text-right space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                    Leader Influence Score
                  </span>
                  <div className="flex items-baseline gap-1 lg:justify-end">
                    <span className={`text-3xl font-black ${theme.scoreColor}`}>
                      {isSovereign ? "96" : "88"}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">/ 100</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    Top {isSovereign ? "1%" : "5%"} in {primarySectorName.split(" ")[0]}
                  </span>
                </div>
              ) : (
                <div className="text-left lg:text-right space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                    Executive Authority
                  </span>
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Verified Pioneer
                  </span>
                  <span className="text-[10px] text-slate-400 block">{experienceYears} Years Track Record</span>
                </div>
              )}

              <div className="text-right space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  Identity Portability
                </span>
                <span className="text-xs font-bold text-slate-200">Independently Owned</span>
              </div>
            </div>
          </div>

          {/* Philosophy / Vision Quote Strip */}
          <div className="p-4 md:p-5 rounded-2xl bg-white/3 border border-white/5 flex items-start gap-3">
            <Quote className={`w-5 h-5 shrink-0 mt-0.5 ${theme.accentText}`} />
            <p className="text-xs md:text-sm text-slate-300 italic leading-relaxed">
              &ldquo;{philosophy}&rdquo;
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB NAVIGATION BAR                                                        */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive ? theme.tabActive : theme.tabInactive
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-white/20 text-white">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB CONTENT: 1. OVERVIEW                                                  */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 cols: Executive Bio & Career Trajectory */}
            <div className="lg:col-span-8 space-y-6">
              {/* Executive Bio */}
              <div className={`rounded-3xl border p-6 md:p-8 ${theme.cardBg} space-y-4`}>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className={`w-4 h-4 ${theme.accentText}`} /> Executive Background
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {bio}
                </p>
              </div>

              {/* Career Timeline */}
              <div className={`rounded-3xl border p-6 md:p-8 ${theme.cardBg} space-y-5`}>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${theme.accentText}`} /> Leadership Milestones & Track Record
                </h3>
                <div className="space-y-4">
                  {timeline.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 font-bold text-xs text-slate-300">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-xs font-bold text-white">{item.role}</h4>
                          <span className="text-[10px] font-mono text-slate-400">{item.years}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Credentials */}
              <div className={`rounded-3xl border p-6 md:p-8 ${theme.cardBg} space-y-4`}>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className={`w-4 h-4 ${theme.accentText}`} /> Academic & Institutional Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {education.map((edu: any, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-1">
                      <h4 className="text-xs font-bold text-white">{edu.degree}</h4>
                      <p className="text-[11px] text-slate-400">{edu.institution}</p>
                      <span className="text-[10px] font-mono text-slate-500 block">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 cols: Authority Assets, Downloads, Video Bio */}
            <div className="lg:col-span-4 space-y-6">
              {/* Video Introduction (Luminary & Sovereign) */}
              {(isLuminary || isSovereign) && (
                <div className={`rounded-3xl border p-5 ${theme.cardBg} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-rose-400" /> Executive Video Bio
                    </span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-400">
                      90s Preview
                    </span>
                  </div>
                  <div className="aspect-video rounded-2xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 mt-2">
                      &ldquo;Leading Industrial Transformation in 2026&rdquo;
                    </span>
                  </div>
                </div>
              )}

              {/* Digital Bio Card & Press Kit Downloads */}
              <div className={`rounded-3xl border p-5 ${theme.cardBg} space-y-3`}>
                <span className="text-xs font-bold text-white block">Official Executive Assets</span>
                <div className="space-y-2">
                  <button
                    onClick={() => alert(`Downloading verified Digital Bio Card for ${fullName}...`)}
                    className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left flex items-center justify-between text-xs font-bold text-slate-200 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5 text-blue-400" /> Digital Bio Card (PDF)
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">Auto-Generated</span>
                  </button>

                  {isSovereign && (
                    <button
                      onClick={() => alert(`Downloading Comprehensive Press Kit for ${fullName}...`)}
                      className="w-full p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-left flex items-center justify-between text-xs font-bold text-purple-300 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Crown className="w-3.5 h-3.5 text-purple-400" /> Full Press & Media Kit (PDF)
                      </span>
                      <span className="text-[9px] font-mono text-purple-400">Media Ready</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Company Affiliation Card */}
              <div className={`rounded-3xl border p-5 ${theme.cardBg} space-y-3`}>
                <span className="text-xs font-bold text-white block">Corporate Affiliation</span>
                <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 font-black text-sm flex items-center justify-center text-white">
                      {companyName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{companyName}</h4>
                      <p className="text-[10px] text-slate-400">{primarySectorName}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug pt-1">
                    Verified C-Suite profile linked to corporate iGEN directory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB CONTENT: 2. LEADERSHIP STORY                                          */}
        {/* ========================================================================= */}
        {activeTab === "story" && (
          <div className={`rounded-3xl border p-6 md:p-10 ${theme.cardBg} space-y-8`}>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${theme.accentText} block mb-1`}>
                Narrative of Impact
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white">
                The Leadership Trajectory of {fullName}
              </h2>
            </div>

            <div className="prose prose-invert max-w-none text-xs md:text-sm text-slate-300 leading-relaxed space-y-4">
              <p>
                Over more than two decades in executive management, {fullName} has championed industrial self-reliance,
                advanced bilateral export mechanisms, and institutional governance across key manufacturing corridors.
              </p>
              <p>
                Having navigated shifting global tariffs, geopolitical trade realignments, and rapid factory automation,
                the leadership philosophy centers on three core tenets: disciplined technical precision, strategic capital deployment,
                and cultivating indigenous intellectual property.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {[
                { title: "Strategic Tenet I", desc: "Build irreplaceable industrial depth before expanding commercial breadth." },
                { title: "Strategic Tenet II", desc: "Align bilateral export agreements with long-term domestic value addition." },
                { title: "Strategic Tenet III", desc: "Institutional integrity and KYC verification outlive transient market hype." },
              ].map((pillar, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/3 border border-white/5 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500">{pillar.title}</span>
                  <h4 className="text-xs font-bold text-white">{pillar.desc}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB CONTENT: 3. THOUGHT LEADERSHIP & ARTICLES                             */}
        {/* ========================================================================= */}
        {activeTab === "articles" && (isLuminary || isSovereign) && (
          <div className="space-y-6">
            {/* Content Publishing Engine Breakdown Header */}
            <div className={`rounded-3xl border p-6 md:p-8 ${theme.cardBg} space-y-4`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${theme.accentText} block mb-1`}>
                    Content Publishing Engine
                  </span>
                  <h2 className="text-xl font-black text-white">
                    Verified Executive Thought Columns
                  </h2>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-slate-200">
                    Monthly Quota: {isSovereign ? "8 Columns" : "6 Columns"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    4× Profile Engagement
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                Multi-author authority publishing ecosystem. Columns are authored by the leader, co-researched with the iGEN AI Editor,
                and complemented by peer reviews from verified sector SMEs & ASMEs.
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articlesToShow.map((art: any) => (
                <div key={art.id} className={`rounded-3xl border p-6 ${theme.cardBg} space-y-4 flex flex-col justify-between hover:border-white/20 transition-all`}>
                  <div className="space-y-3">
                    {/* Byline Author Badge */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${
                        art.authorType === "leader"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : art.authorType === "ai"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}>
                        {art.authorType === "leader" && <PenLine className="w-2.5 h-2.5" />}
                        {art.authorType === "ai" && <Bot className="w-2.5 h-2.5" />}
                        {(art.authorType === "sme" || art.authorType === "asme") && <Handshake className="w-2.5 h-2.5" />}
                        {art.authorRole}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{art.date}</span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-white leading-snug hover:text-blue-400 cursor-pointer transition-colors">
                      {art.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400">
                    <span className="text-slate-500">{art.readTime} · {art.reads}</span>
                    <span className="text-blue-400 font-bold flex items-center gap-1 cursor-pointer">
                      Read Column <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB CONTENT: 4. AWARDS & ACCOLADES                                        */}
        {/* ========================================================================= */}
        {activeTab === "awards" && (isLuminary || isSovereign) && (
          <div className={`rounded-3xl border p-6 md:p-10 ${theme.cardBg} space-y-6`}>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${theme.accentText} block mb-1`}>
                Verified Industry Honors
              </span>
              <h2 className="text-xl font-black text-white">
                Awards, Citations & Recognitions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach: any, i: number) => (
                <div key={i} className="p-5 rounded-2xl bg-white/3 border border-white/5 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">{ach}</h4>
                    <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                      ✓ Institutional Verification Confirmed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB CONTENT: 5. SPEAKING & MEDIA                                          */}
        {/* ========================================================================= */}
        {activeTab === "speaking" && (isLuminary || isSovereign) && (
          <div className={`rounded-3xl border p-6 md:p-10 ${theme.cardBg} space-y-6`}>
            <div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${theme.accentText} block mb-1`}>
                Media & Speaking Engagements
              </span>
              <h2 className="text-xl font-black text-white">
                Keynotes, Panels & Press Appearances
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Indo-GCC Bilateral Trade Conclave (Dubai)", role: "Keynote Speaker", year: "2025" },
                { title: "National Advanced Engineering Summit (New Delhi)", role: "Session Chair", year: "2025" },
                { title: "Global Supply Resilience Podcast (Singapore)", role: "Guest Leader", year: "2024" },
              ].map((sp, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/3 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">{sp.year}</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                      {sp.role}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{sp.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB CONTENT: 6. SECTOR AUTHORITY (SOVEREIGN ONLY)                         */}
        {/* ========================================================================= */}
        {activeTab === "authority" && isSovereign && (
          <div className="space-y-6">
            <div className={`rounded-3xl border p-6 md:p-10 ${theme.cardBg} space-y-6`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-1">
                    Finite Sector Scarcity Enforced
                  </span>
                  <h2 className="text-2xl font-black text-white flex items-center gap-2">
                    <Crown className="w-6 h-6 text-amber-400" /> Guaranteed Sector #1 Authority
                  </h2>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black">
                  Sector Rank: #1 of 50 Leaders
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Quarterly Profile Views", value: "48,200", change: "+34% vs Peers" },
                  { label: "Institutional Inquiries", value: "114 Inquiries", change: "92% C-Suite / VC" },
                  { label: "Global Readership Index", value: "98.4 / 100", change: "Top Bilateral Reach" },
                ].map((stat, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/3 border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400">{stat.label}</span>
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <span className="text-[10px] font-bold text-emerald-400 block">{stat.change}</span>
                  </div>
                ))}
              </div>

              {/* Investor Due Diligence Profile Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-950/40 border border-purple-500/30 space-y-3">
                <h3 className="text-sm font-bold text-purple-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" /> Institutional Investor Due Diligence Portal
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  As a verified Sovereign Leader, institutional funds, private equity analysts, and sovereign wealth desks can request
                  authenticated governance records, trade compliance summaries, and verified board history directly through iGEN.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* INQUIRY MODAL                                                             */}
        {/* ========================================================================= */}
        {inquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Direct Executive Inquiry</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Connecting with {fullName}</p>
                </div>
                <button
                  onClick={() => setInquiryModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {inquirySent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-white">Inquiry Dispatched</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Your communication has been routed securely to {fullName}&apos;s verified executive desk.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Inquiry Intent
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "speaking", label: "Speaking" },
                        { id: "media", label: "Press / Media" },
                        { id: "consulting", label: "Board / Advisory" },
                        { id: "general", label: "General" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setInquiryType(t.id as any)}
                          className={`p-2 rounded-xl text-[11px] font-bold border transition-all ${
                            inquiryType === t.id
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="Rajiv Sen"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Work Email</label>
                      <input
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        placeholder="rajiv@company.com"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Organization</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.organization}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, organization: e.target.value })}
                      placeholder="Indo-European Chamber of Commerce"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Executive Message</label>
                    <textarea
                      required
                      rows={3}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="Outline speaking dates, topic brief, or institutional advisory requirements..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg"
                  >
                    Dispatch Executive Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

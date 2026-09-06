"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Eye, Award, CheckCircle2, ShieldCheck, 
  BarChart3, FileText, Send, Calendar, Globe, 
  ArrowUpRight, Share2, Sparkles, TrendingUp, Briefcase, 
  ShieldAlert, Star, Edit, Settings, Trash2, Check, 
  Mail, Phone, MapPin, Copy, Plus, MessageSquare, 
  User, Shield, ShieldX, HelpCircle, ChevronRight, Info, Upload, Users, GraduationCap, Building2,
  Crown, Bot, PenLine, Handshake, Mic2, Download, ExternalLink, Zap, ArrowRight
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import LeaderPublicProfile from "@/components/profile/leader/LeaderPublicProfile";
import CheckoutModal from "@/components/profile/CheckoutModal";

interface Article {
  id: string;
  title: string;
  content: string;
  sector: string;
  date: string;
  reads: number;
  authorType?: "leader" | "ai" | "sme" | "asme";
}

export default function LeaderDashboard() {
  const { user, updateOnboarding } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // Tier detection
  const activeTier: "free" | "pioneer" | "luminary" | "sovereign" = 
    (user?.leaderPlan as "free" | "pioneer" | "luminary" | "sovereign") || "free";
  
  // Tab control states
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [adminTab, setAdminTab] = useState<string>("overview");

  // Feedback states
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [articleSuccess, setArticleSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Upgrade / Checkout state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState<{ id: string; name: string; price: string } | null>(null);

  // Profile Form reference
  const profile = user?.onboardingForm || {};

  // Form edit states (initialized from profile)
  const [editFullName, setEditFullName] = useState("");
  const [editDesignation, setEditDesignation] = useState("");
  const [editRoleLevel, setEditRoleLevel] = useState("C-Suite");
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editCompanyWebsite, setEditCompanyWebsite] = useState("");
  const [editLinkedinUrl, setEditLinkedinUrl] = useState("");
  
  const [editPrimarySector, setEditPrimarySector] = useState("manufacturing");
  const [editSecondarySectors, setEditSecondarySectors] = useState<string[]>([]);
  const [tempSecondary, setTempSecondary] = useState("");
  const [editExperienceYears, setEditExperienceYears] = useState<number>(15);
  const [editFunctionalExpertise, setEditFunctionalExpertise] = useState<string[]>([]);
  const [newExpertise, setNewExpertise] = useState("");

  const [editBio, setEditBio] = useState("");
  const [editTimeline, setEditTimeline] = useState<{ company: string; role: string; years: string }[]>([]);
  const [editEducation, setEditEducation] = useState<{ institution: string; degree: string; year: string }[]>([]);
  const [editAchievements, setEditAchievements] = useState<string[]>([]);
  const [editPhilosophy, setEditPhilosophy] = useState("");
  const [editHeadshotBase64, setEditHeadshotBase64] = useState("");

  const [linkedCompanyId, setLinkedCompanyId] = useState("");
  const [interestInWriting, setInterestInWriting] = useState(false);

  // Article publisher states
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleContent, setNewArticleContent] = useState("");
  const [newArticleSector, setNewArticleSector] = useState("manufacturing");
  const [articles, setArticles] = useState<Article[]>([]);

  // Settings states
  const [visibility, setVisibility] = useState<"Public" | "Private">("Public");
  const [companyPrivacy, setCompanyPrivacy] = useState(true);
  const [notifComments, setNotifComments] = useState(true);
  const [notifFollowers, setNotifFollowers] = useState(true);
  const [notifLinkRequest, setNotifLinkRequest] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Followers simulator
  const [followerCount, setFollowerCount] = useState(142);

  // Uploader reference
  const headshotInputRef = useRef<HTMLInputElement>(null);

  // Quota configuration per tier
  const tierQuotas = {
    free: { total: 0, self: 0, ai: 0, sme: 0, asme: 0, maxAllowed: 0 },
    pioneer: { total: 4, self: 4, ai: 0, sme: 0, asme: 0, maxAllowed: 4 },
    luminary: { total: 6, self: 2, ai: 2, sme: 1, asme: 1, maxAllowed: 2 },
    sovereign: { total: 8, self: 4, ai: 2, sme: 1, asme: 1, maxAllowed: 4 },
  }[activeTier];

  // Load profile data on mount / update
  useEffect(() => {
    if (user && user.onboardingForm) {
      const f = user.onboardingForm;
      setEditFullName(f.fullName || user.name || "");
      setEditDesignation(f.currentDesignation || "");
      setEditRoleLevel(f.roleLevel || "C-Suite (CEO/CFO/CTO/COO)");
      setEditCompanyName(f.leaderCompany || "");
      setEditCompanyWebsite(f.companyWebsite || "");
      setEditLinkedinUrl(f.linkedinUrl || "");
      setEditPrimarySector(f.sector || "manufacturing");
      setEditSecondarySectors(f.secondarySectors || []);
      setEditExperienceYears(f.experienceYears || 15);
      setEditFunctionalExpertise(f.functionalExpertise || []);
      setEditBio(f.aboutText || "");
      setEditTimeline(f.timeline || []);
      setEditEducation(f.education || []);
      setEditAchievements(f.achievements || []);
      setEditPhilosophy(f.philosophy || "");
      setEditHeadshotBase64(f.headshotBase64 || "");
      setLinkedCompanyId(f.linkedCompanyId || "");
      setInterestInWriting(f.articleWritingInterest || false);

      // Load articles from cache
      const storageKey = `ign_leader_articles_${user.email}`;
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setArticles(JSON.parse(cached));
      } else {
        const initialArticles: Article[] = activeTier !== "free" ? [
          {
            id: "art-1",
            title: `Navigating Tariff Adjustments & Trade Policy in the ${SECTORS.find(s => s.id === (f.sector || "manufacturing"))?.name || "Bilateral"} Industry`,
            content: "As bilateral trade lanes shift, key executive stakeholders must adjust operational compliance models to align with new regulations. Leaders must build adaptive trade desks to manage tariffs effectively.",
            sector: f.sector || "manufacturing",
            date: "Aug 28, 2026",
            reads: 214,
            authorType: "leader"
          }
        ] : [];
        setArticles(initialArticles);
        if (initialArticles.length > 0) {
          localStorage.setItem(storageKey, JSON.stringify(initialArticles));
        }
      }
    }
  }, [user, activeTier]);

  if (!user) return null;

  const currentSectorName = SECTORS.find(s => s.id === editPrimarySector)?.name || "Bilateral Trade";
  const username = user.email ? user.email.split("@")[0] : "leader";
  const publicUrl = `www.indiaglobalnews.com/topleader/${username}`;

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(publicUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Profile completeness calculator
  const calculateCompleteness = () => {
    let score = 0;
    if (editFullName) score += 15;
    if (editHeadshotBase64) score += 15;
    if (editDesignation) score += 15;
    if (editCompanyName) score += 10;
    if (editBio) score += 20;
    if (editTimeline.length > 0) score += 10;
    if (editPhilosophy) score += 10;
    if (editLinkedinUrl) score += 5;
    return score;
  };

  const completeness = calculateCompleteness();

  const handleSaveProfile = async () => {
    setValidationError(null);
    setEditSuccess(false);

    if (!editFullName.trim()) { setValidationError("Full Name is required."); return; }
    if (!editDesignation.trim()) { setValidationError("Designation is required."); return; }
    if (!editCompanyName.trim()) { setValidationError("Company Name is required."); return; }
    if (!editBio.trim()) { setValidationError("Biography is required."); return; }
    
    const bioWords = getWordCount(editBio);
    if (bioWords < 10 || bioWords > 500) {
      setValidationError("Biography must be between 10 and 500 words.");
      return;
    }
    if (editPhilosophy && getWordCount(editPhilosophy) > 80) {
      setValidationError("Philosophy Quote must be under 80 words.");
      return;
    }

    const updatedForm = {
      ...profile,
      fullName: editFullName,
      currentDesignation: editDesignation,
      roleLevel: editRoleLevel,
      leaderCompany: editCompanyName,
      companyWebsite: editCompanyWebsite,
      linkedinUrl: editLinkedinUrl,
      sector: editPrimarySector,
      secondarySectors: editSecondarySectors,
      experienceYears: editExperienceYears,
      functionalExpertise: editFunctionalExpertise,
      aboutText: editBio,
      timeline: editTimeline,
      education: editEducation,
      achievements: editAchievements,
      philosophy: editPhilosophy,
      headshotBase64: editHeadshotBase64,
      linkedCompanyId,
      articleWritingInterest: interestInWriting
    };

    await updateOnboarding({
      name: editFullName,
      sectors: [editPrimarySector, ...editSecondarySectors].slice(0, 10),
      onboardingForm: updatedForm
    });

    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 3000);
  };

  const handleHeadshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Headshot file exceeds 2MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setEditHeadshotBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const addTimelineEntry = () => {
    if (editTimeline.length >= 5) return;
    setEditTimeline(prev => [...prev, { company: "", role: "", years: "" }]);
  };

  const addEducationEntry = () => {
    if (editEducation.length >= 3) return;
    setEditEducation(prev => [...prev, { institution: "", degree: "", year: "" }]);
  };

  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setArticleSuccess(false);

    if (activeTier === "free") {
      setValidationError("Free Leader plan does not include article publishing. Upgrade to Pioneer, Luminary, or Sovereign to publish thought columns.");
      return;
    }

    if (!newArticleTitle.trim() || !newArticleContent.trim()) {
      setValidationError("Headline and column content are required.");
      return;
    }

    const selfAuthoredCount = articles.filter(a => a.authorType === "leader" || !a.authorType).length;
    if (selfAuthoredCount >= tierQuotas.maxAllowed) {
      setValidationError(`You have reached your monthly self-authored quota of ${tierQuotas.maxAllowed} articles for the ${activeTier.toUpperCase()} tier.`);
      return;
    }

    const newArt: Article = {
      id: Date.now().toString(),
      title: newArticleTitle.trim(),
      content: newArticleContent.trim(),
      sector: newArticleSector,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      reads: 0,
      authorType: "leader"
    };

    const newList = [newArt, ...articles];
    setArticles(newList);
    localStorage.setItem(`ign_leader_articles_${user.email}`, JSON.stringify(newList));
    
    setNewArticleTitle("");
    setNewArticleContent("");
    setArticleSuccess(true);
    setTimeout(() => setArticleSuccess(false), 3000);
  };

  const handleDeleteArticle = (id: string) => {
    const newList = articles.filter(a => a.id !== id);
    setArticles(newList);
    localStorage.setItem(`ign_leader_articles_${user.email}`, JSON.stringify(newList));
  };

  const handleGDPRDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `igen_leader_profile_${username}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteLeader = async () => {
    if (deleteConfirmText.toLowerCase() === editFullName.toLowerCase()) {
      await updateOnboarding({
        onboardingStatus: "none",
        onboardingRole: "none",
        leaderPlan: "none",
        onboardingForm: {}
      });
      router.push(`/${locale}/profile/plans/leader`);
    } else {
      alert("Confirmation name does not match.");
    }
  };

  const handleUpgradeSelect = (planId: string, name: string, price: string) => {
    setSelectedPlanForUpgrade({ id: planId, name, price });
    setCheckoutOpen(true);
  };

  // Tier Badge & Color System
  const tierBadgeConfig = {
    free: { label: "FREE MEMBER", icon: Star, color: "bg-amber-600", text: "text-amber-500", border: "border-amber-500/20" },
    pioneer: { label: "PIONEER", icon: ShieldCheck, color: "bg-blue-600", text: "text-blue-500", border: "border-blue-500/20" },
    luminary: { label: "LUMINARY", icon: Sparkles, color: "bg-amber-500 text-slate-950 font-black", text: "text-amber-500", border: "border-amber-500/20" },
    sovereign: { label: "SOVEREIGN", icon: Crown, color: "bg-gradient-to-r from-purple-600 to-amber-500 text-white font-black", text: "text-purple-500", border: "border-purple-500/20" },
  }[activeTier];

  // =========================================================================
  // PUBLIC VIEW MODE
  // =========================================================================
  if (viewMode === "public") {
    return (
      <div className="space-y-4">
        {/* Quick Back to Admin Switcher Bar */}
        <div className="max-w-6xl mx-auto px-4 pt-4 flex items-center justify-between">
          <button
            onClick={() => setViewMode("private")}
            className="px-4 py-2 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all"
          >
            <Lock className="w-3.5 h-3.5" /> Return to Leader Dashboard
          </button>
          <span className="text-xs text-slate-400 font-medium">
            Live Preview Mode · Viewing as Visitor ({activeTier.toUpperCase()} Tier)
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
            functionalExpertise: editFunctionalExpertise,
            aboutText: editBio,
            timeline: editTimeline,
            education: editEducation,
            achievements: editAchievements,
            philosophy: editPhilosophy,
            headshotBase64: editHeadshotBase64,
            linkedCompanyId,
          }}
          tier={activeTier}
          onUpgradeClick={() => {
            setViewMode("private");
            setAdminTab("upgrade");
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
    <div className="max-w-6xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Top Switcher Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#122238] rounded-3xl p-4 border border-gray-100 dark:border-white/5 mb-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-600 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Executive Command Desk</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-sm font-bold text-[#1D1D46] dark:text-white leading-tight flex items-center gap-2">
              <span>{editFullName || "Leader Profile"}</span>
              <span 
                className={`px-2.5 py-0.5 text-white text-[9px] font-black rounded uppercase tracking-wider cursor-pointer shadow-sm ${tierBadgeConfig.color}`}
                onClick={() => setAdminTab("upgrade")}
              >
                {activeTier === "sovereign" ? "👑 SOVEREIGN" : activeTier === "luminary" ? "🌟 LUMINARY" : activeTier === "pioneer" ? "🔷 PIONEER" : "⭐ FREE MEMBER"}
              </span>
            </h2>
          </div>
        </div>

        <div className="bg-[#f4f7fb] dark:bg-white/5 p-1 rounded-2xl flex items-center shrink-0">
          <button
            onClick={() => setViewMode("private")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "private"
                ? "bg-[#1D1D46] text-white shadow-md"
                : "text-gray-500 hover:text-[#1D1D46] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Dashboard
          </button>
          <button
            onClick={() => setViewMode("public")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              (viewMode as string) === "public"
                ? "bg-[#1D1D46] text-white shadow-md"
                : "text-gray-500 hover:text-[#1D1D46] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Public Page Preview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2.5">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "edit", label: "Edit Credentials", icon: Edit },
            { 
              id: "articles", 
              label: "Thought Columns", 
              icon: FileText, 
              badge: activeTier === "free" ? "Locked" : `${articles.length}/${tierQuotas.total}` 
            },
            { id: "linkage", label: "Company Linkage", icon: Building2 },
            ...((activeTier === "luminary" || activeTier === "sovereign") ? [
              { id: "awards", label: "Awards & Honors", icon: Award },
              { id: "speaking", label: "Speaking & Media", icon: Mic2 },
            ] : []),
            ...(activeTier === "sovereign" ? [
              { id: "authority", label: "Sector Authority (#1)", icon: Crown },
              { id: "presskit", label: "Press Kit Portal", icon: Download },
            ] : []),
            { id: "upgrade", label: "Plans & Subscription", icon: Zap },
            { id: "settings", label: "Leader Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                  isActive 
                    ? "bg-[#1D1D46] text-white shadow"
                    : "bg-white hover:bg-[#f4f7fb] text-gray-600 border border-gray-100 dark:bg-[#122238] dark:hover:bg-white/5 dark:border-white/5 dark:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#F0652E]" : "text-gray-400"}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                    tab.badge === "Locked"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : isActive 
                      ? "bg-white/20 text-white" 
                      : "bg-gray-100 dark:bg-white/10 text-gray-500"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Sidebar Upgrade Callout for Non-Sovereign */}
          {activeTier !== "sovereign" && (
            <div className="bg-gradient-to-br from-[#050d1e] to-[#0a1628] rounded-3xl p-5 text-white border border-blue-900/30 space-y-3.5 mt-6 shadow-md relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Crown className="w-4 h-4" /> Sovereign Leadership
              </div>
              <p className="text-[10px] leading-relaxed text-slate-300">
                Guarantee Sector #1 ranking, unlock 8 monthly thought columns, and get media-ready press kits.
              </p>
              <button 
                onClick={() => router.push(`/${locale}/profile/plans/leader`)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 text-[10px] font-black rounded-xl transition-all shadow-sm uppercase tracking-wider flex items-center justify-center gap-1"
              >
                Explore 4 Tiers <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Admin Content Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Header info card */}
          <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 text-left">
                {editHeadshotBase64 ? (
                  <img src={editHeadshotBase64} alt="Headshot" className="w-20 h-20 rounded-2xl object-cover border border-gray-100 dark:border-white/10 shadow-sm shrink-0" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-250 dark:border-white/15 flex flex-col items-center justify-center text-center shrink-0 cursor-pointer" onClick={() => setAdminTab("edit")}>
                    <User className="w-8 h-8 text-gray-300 dark:text-white/15" />
                    <span className="text-[8px] text-gray-400 mt-1 font-bold">Photo</span>
                  </div>
                )}
                <div className="space-y-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white leading-tight">{editFullName}</h1>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-lg border ${
                      activeTier === "free"
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        : activeTier === "pioneer"
                        ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                        : activeTier === "luminary"
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        : "bg-purple-500/10 text-purple-600 border-purple-500/20"
                    }`}>
                      {activeTier === "free" ? "Unverified Leader Profile" : "✓ KYC Verified Authority"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">{editDesignation} {editCompanyName && `at ${editCompanyName}`}</p>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400 pt-0.5">
                    <span>Experience: <strong>{editExperienceYears} Years</strong></span>
                    <span>Level: <strong>{editRoleLevel}</strong></span>
                    <span>Sector: <strong className="text-blue-500">{currentSectorName}</strong></span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-150 dark:border-transparent space-y-2 text-left shrink-0 md:max-w-xs">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Public Authority URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={publicUrl}
                    className="bg-white dark:bg-[#122238] px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-gray-500 border-none focus:outline-none w-44 truncate"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-[9px] font-bold rounded-lg flex items-center gap-1 shrink-0"
                  >
                    {copiedUrl ? "Copied!" : <><Copy className="w-2.5 h-2.5" /> Copy</>}
                  </button>
                </div>
              </div>
            </div>

            {/* Portability Strip */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3.5 text-xs text-blue-700 dark:text-blue-400 flex items-center gap-2.5">
              <Info className="w-4 h-4 shrink-0" />
              <span className="font-semibold">
                Portability Principle: This Leader Page belongs directly to you — not your company. Your authority and verification follow your career trajectory everywhere.
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* OVERVIEW TAB                                                              */}
          {/* ========================================================================= */}
          {adminTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Completeness */}
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Profile Completeness</span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#1D1D46] dark:text-white">{completeness}%</span>
                      <span className="text-xs text-gray-400 font-semibold">{completeness === 100 ? "Complete!" : "Needs Setup"}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${completeness}%` }} />
                    </div>
                  </div>
                  <button onClick={() => setAdminTab("edit")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">Edit credentials <ChevronRight className="w-3.5 h-3.5" /></button>
                </div>

                {/* Article Publishing Engine Quota */}
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Publishing Engine Quota</span>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#1D1D46]/5 dark:bg-white/5 flex items-center justify-center text-[#1D1D46] dark:text-white">
                      <FileText className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-[#1D1D46] dark:text-white">
                        {articles.length} <span className="text-xs text-gray-400">/ {tierQuotas.total} mo</span>
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {activeTier === "free" ? "Article writing locked" : `${activeTier.toUpperCase()} tier quota`}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setAdminTab("articles")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">
                    {activeTier === "free" ? "Unlock Publishing" : "Manage columns"} <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Influence Score or Linkage */}
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Influence Score</span>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      {activeTier === "free" ? (
                        <>
                          <h4 className="text-lg font-black text-gray-400">Locked</h4>
                          <p className="text-[10px] text-amber-500 font-bold">Requires Pioneer+</p>
                        </>
                      ) : (
                        <>
                          <h4 className="text-2xl font-black text-[#1D1D46] dark:text-white">
                            {activeTier === "sovereign" ? "96" : activeTier === "luminary" ? "88" : "78"} <span className="text-xs text-gray-400">/ 100</span>
                          </h4>
                          <p className="text-[10px] text-emerald-500 font-bold">
                            {activeTier === "pioneer" ? "Private Score (Owner Only)" : "Public Rating Active"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setViewMode("public")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">
                    Preview public view <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Impact Tracker */}
              <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm text-left space-y-4">
                <div className="flex items-center justify-between border-b border-gray-150 dark:border-white/5 pb-3">
                  <h3 className="font-bold text-[#1D1D46] dark:text-white">Executive Profile Analytics</h3>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-[10px] font-extrabold rounded-lg">
                    {activeTier === "sovereign" ? "👑 Top Bilateral Reach" : activeTier === "luminary" ? "🌟 High Visibility" : "Standard Placement"}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">Followers</span>
                    <span className="text-xl font-bold text-[#1D1D46] dark:text-white">{followerCount}</span>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">Total Column Reads</span>
                    <span className="text-xl font-bold text-[#1D1D46] dark:text-white">4,820</span>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">Profile Clicks</span>
                    <span className="text-xl font-bold text-[#1D1D46] dark:text-white">1,140</span>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">Sector Rank</span>
                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      {activeTier === "sovereign" ? "#1 Pinned" : activeTier === "luminary" ? "Top 10" : "Directory"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* EDIT PROFILE TAB                                                          */}
          {/* ========================================================================= */}
          {adminTab === "edit" && (
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                <div>
                  <h3 className="font-bold text-[#1D1D46] dark:text-white">Edit Executive Credentials</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">Update bio details, achievements, timelines, and career focus.</p>
                </div>
                <button onClick={handleSaveProfile} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all">
                  Save Changes
                </button>
              </div>

              {validationError && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {editSuccess && (
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Executive profile details saved successfully!</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Photo Edit */}
                <div className="p-4 border border-dashed border-gray-250 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-gray-400 block mb-2 uppercase">Headshot Image</span>
                  {editHeadshotBase64 ? (
                    <div className="relative">
                      <img src={editHeadshotBase64} alt="Avatar" className="w-16 h-16 object-cover rounded-full border border-gray-200" />
                      <button type="button" onClick={() => setEditHeadshotBase64("")} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">×</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => headshotInputRef.current?.click()} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 text-[9px] font-bold rounded-lg text-gray-700 dark:text-white flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Select Photo
                    </button>
                  )}
                  <input type="file" ref={headshotInputRef} onChange={handleHeadshotUpload} className="hidden" accept="image/*" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Current Designation</label>
                    <input 
                      type="text" 
                      value={editDesignation}
                      onChange={(e) => setEditDesignation(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Role Level</label>
                    <select
                      value={editRoleLevel}
                      onChange={(e) => setEditRoleLevel(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                    >
                      {["Founder/Owner", "C-Suite (CEO/CFO/CTO/COO)", "Director", "VP / SVP", "Senior Manager"].map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Company Name</label>
                    <input 
                      type="text" 
                      value={editCompanyName}
                      onChange={(e) => setEditCompanyName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Experience (Years)</label>
                    <input 
                      type="number" 
                      value={editExperienceYears}
                      onChange={(e) => setEditExperienceYears(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Executive Biography (10–500 words)</label>
                  <textarea
                    rows={4}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Describe career achievements, strategic impact, and areas of specialization..."
                    className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none leading-relaxed"
                  />
                  <span className="text-[10px] text-gray-400">{getWordCount(editBio)} / 500 words</span>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Leadership Philosophy Quote (max 80 words)</label>
                  <input
                    type="text"
                    value={editPhilosophy}
                    onChange={(e) => setEditPhilosophy(e.target.value)}
                    placeholder="e.g. True leadership is not about managing people, but inspiring innovation and excellence."
                    className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* THOUGHT COLUMNS PUBLISHER TAB                                             */}
          {/* ========================================================================= */}
          {adminTab === "articles" && (
            <div className="space-y-6">
              {activeTier === "free" ? (
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-8 border border-amber-500/30 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white">
                    Article Publishing Engine Locked
                  </h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Free Leader profiles do not include article publishing rights. Upgrade to Pioneer (4/mo),
                    Luminary (6/mo), or Sovereign (8/mo) to unlock the bylined executive content engine.
                  </p>
                  <button
                    onClick={() => router.push(`/${locale}/profile/plans/leader`)}
                    className="px-6 py-3 bg-[#F0652E] hover:bg-[#d85522] text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    View Paid Leader Plans
                  </button>
                </div>
              ) : (
                <>
                  {/* Publisher Form */}
                  <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-5 text-left">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                      <div>
                        <h3 className="font-bold text-[#1D1D46] dark:text-white">Publish Thought Leadership Column</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {activeTier.toUpperCase()} Plan Quota: {articles.filter(a => a.authorType === "leader" || !a.authorType).length} of {tierQuotas.maxAllowed} self-authored columns used this month.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-blue-500">
                        {tierQuotas.total} Total Monthly Slots
                      </span>
                    </div>

                    {articleSuccess && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Thought leadership column published successfully to your public profile!</span>
                      </div>
                    )}

                    <form onSubmit={handlePublishArticle} className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Column Headline</label>
                        <input
                          type="text"
                          value={newArticleTitle}
                          onChange={(e) => setNewArticleTitle(e.target.value)}
                          placeholder="e.g. Navigating Tariff Realignment in Indo-European Manufacturing Corridors"
                          className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Industry Sector</label>
                        <select
                          value={newArticleSector}
                          onChange={(e) => setNewArticleSector(e.target.value)}
                          className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        >
                          {SECTORS.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Column Content & Analysis</label>
                        <textarea
                          rows={6}
                          value={newArticleContent}
                          onChange={(e) => setNewArticleContent(e.target.value)}
                          placeholder="Detail policy insights, operational benchmarks, market trends, or export strategies..."
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5 text-[#F0652E]" /> Publish to Public Feed
                      </button>
                    </form>
                  </div>

                  {/* Published Articles List */}
                  <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                    <h3 className="font-bold text-[#1D1D46] dark:text-white">Active Published Columns ({articles.length})</h3>
                    <div className="space-y-3">
                      {articles.map((art) => (
                        <div key={art.id} className="p-4 bg-gray-50 dark:bg-white/3 rounded-2xl border border-gray-100 dark:border-white/5 flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-blue-500 uppercase">{art.sector} · {art.date}</span>
                            <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">{art.title}</h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">{art.content}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* PLANS & UPGRADE TAB                                                       */}
          {/* ========================================================================= */}
          {adminTab === "upgrade" && (
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white">Executive Subscription & Tiers</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Your current active subscription: <strong className="text-blue-500 uppercase">{activeTier}</strong></p>
                </div>
                <button
                  onClick={() => router.push(`/${locale}/profile/plans/leader`)}
                  className="px-4 py-2 bg-[#F0652E] hover:bg-[#d85522] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  Full 4-Tier Comparison <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: "pioneer",
                    name: "PIONEER",
                    price: "₹4,999",
                    period: "/month",
                    articles: "4 Articles / mo (Self)",
                    tabs: "2 Tabs (Overview + Story)",
                    highlight: "KYC Blue Tick + Google Authority URL",
                    active: activeTier === "pioneer",
                  },
                  {
                    id: "luminary",
                    name: "LUMINARY",
                    price: "₹9,999",
                    period: "/month",
                    articles: "6 Articles / mo (2 Self + 2 AI + 2 SME)",
                    tabs: "4 Tabs + Public Influence Score",
                    highlight: "Top 10 Directory Placement + Video Bio",
                    active: activeTier === "luminary",
                  },
                  {
                    id: "sovereign",
                    name: "SOVEREIGN",
                    price: "₹16,999",
                    period: "/month",
                    articles: "8 Articles / mo (4 Self + 2 AI + 2 SME)",
                    tabs: "5 Tabs + Guaranteed Sector #1",
                    highlight: "Media Press Kit + Due Diligence Profile",
                    active: activeTier === "sovereign",
                  },
                ].map((plan) => (
                  <div key={plan.id} className={`p-5 rounded-2xl border-2 flex flex-col justify-between ${
                    plan.active ? "border-emerald-500 bg-emerald-50/10" : "border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/3"
                  }`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-[#1D1D46] dark:text-white">{plan.name}</h4>
                        {plan.active && <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">ACTIVE</span>}
                      </div>
                      <div className="text-xl font-black text-[#1D1D46] dark:text-white">
                        {plan.price} <span className="text-xs text-gray-400 font-normal">{plan.period}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium">{plan.highlight}</p>
                      <div className="text-[10px] text-slate-400 space-y-1 pt-2 border-t border-gray-200 dark:border-white/5">
                        <p>✓ {plan.articles}</p>
                        <p>✓ {plan.tabs}</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      {plan.active ? (
                        <div className="w-full py-2 bg-emerald-500/20 text-emerald-600 text-center text-xs font-bold rounded-xl">
                          Current Plan
                        </div>
                      ) : (
                        <button
                          onClick={() => handleUpgradeSelect(plan.id, plan.name, `${plan.price}/month`)}
                          className="w-full py-2.5 bg-[#1D1D46] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                        >
                          Upgrade to {plan.name}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SETTINGS TAB                                                              */}
          {/* ========================================================================= */}
          {adminTab === "settings" && (
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-6 text-left">
              <h3 className="font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-3">Leader Governance & Privacy Settings</h3>

              {/* Profile Visibility */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Public Profile Visibility</h4>
                  <p className="text-[10px] text-gray-400">Toggle whether your public authority page is indexable to other readers.</p>
                </div>
                <button 
                  onClick={() => setVisibility(visibility === "Public" ? "Private" : "Public")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    visibility === "Public"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-gray-100 text-gray-500 dark:bg-white/5"
                  }`}
                >
                  {visibility} Page
                </button>
              </div>

              {/* GDPR Data Download */}
              <div className="border-t border-gray-100 dark:border-white/5 pt-4">
                <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-1">GDPR Compliance Data Export</h4>
                <p className="text-[10px] text-gray-400 mb-3 leading-normal">Download a structured JSON copy of all data indexed under your profile.</p>
                <button 
                  onClick={handleGDPRDownload}
                  className="px-4 py-2 bg-gray-150 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-white text-xs font-bold rounded-xl border border-gray-200 dark:border-transparent flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" /> Download Profile Data
                </button>
              </div>

              {/* Danger Zone */}
              <div className="border-t border-red-500/10 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-red-500">Danger Zone</h4>
                {!deleteConfirmOpen ? (
                  <button onClick={() => setDeleteConfirmOpen(true)} className="px-4 py-2 border border-red-500/20 text-red-500 hover:bg-red-500/5 text-xs font-bold rounded-xl transition-all">
                    Delete Leader Profile
                  </button>
                ) : (
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3.5 max-w-md">
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      This action permanently removes your leader profile registry, career timeline, and thought columns history.
                      To confirm, type <strong className="text-[#1D1D46] dark:text-white">{editFullName}</strong> below:
                    </p>
                    <input 
                      type="text" 
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 rounded-xl text-xs border border-red-500/20"
                      placeholder="Type your full name"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleDeleteLeader} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm">Delete Profile</button>
                      <button onClick={() => { setDeleteConfirmOpen(false); setDeleteConfirmText(""); }} className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal for In-Dashboard Upgrades */}
      {selectedPlanForUpgrade && (
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          planName={selectedPlanForUpgrade.name}
          price={selectedPlanForUpgrade.price}
          category="leader"
          planId={selectedPlanForUpgrade.id}
          onSuccess={async (updatedFields) => {
            await updateOnboarding(updatedFields);
          }}
        />
      )}
    </div>
  );
}

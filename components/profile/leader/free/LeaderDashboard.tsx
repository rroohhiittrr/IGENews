"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Eye, Award, CheckCircle2, ShieldCheck, 
  BarChart3, FileText, Send, Calendar, Globe, 
  ArrowUpRight, Share2, Sparkles, TrendingUp, Briefcase, 
  ShieldAlert, Star, Edit, Settings, Trash2, Check, 
  Mail, Phone, MapPin, Copy, Plus, MessageSquare, 
  User, Shield, ShieldX, HelpCircle, ChevronRight, Info, Upload, Users, GraduationCap, Building2
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

interface Article {
  id: string;
  title: string;
  content: string;
  sector: string;
  date: string;
  reads: number;
}

export default function LeaderDashboard() {
  const { user, updateOnboarding } = useAuth();
  
  // Tab control states
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [adminTab, setAdminTab] = useState<"overview" | "edit" | "articles" | "linkage" | "upgrade" | "settings">("overview");
  const [publicTab, setPublicTab] = useState<"bio" | "articles" | "sectors">("bio");

  // Feedback states
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [articleSuccess, setArticleSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

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
  const [companyPrivacy, setCompanyPrivacy] = useState(true); // true = show, false = hide current company
  const [notifComments, setNotifComments] = useState(true);
  const [notifFollowers, setNotifFollowers] = useState(true);
  const [notifLinkRequest, setNotifLinkRequest] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Followers simulator
  const [followerCount, setFollowerCount] = useState(84);
  const [isFollowing, setIsFollowing] = useState(false);

  // Uploader reference
  const headshotInputRef = useRef<HTMLInputElement>(null);

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
        const initialArticles: Article[] = [
          {
            id: "art-1",
            title: `Navigating Tariff Adjustments & Trade Policy in the ${SECTORS.find(s => s.id === (f.sector || "manufacturing"))?.name || "Bilateral"} Industry`,
            content: "As bilateral trade lanes shift, key executive stakeholders must adjust operational compliance models to align with new regulations. Leaders must build adaptive trade desks to manage tariffs effectively.",
            sector: f.sector || "manufacturing",
            date: "May 25, 2026",
            reads: 142
          }
        ];
        setArticles(initialArticles);
        localStorage.setItem(storageKey, JSON.stringify(initialArticles));
      }
    }
  }, [user]);

  if (!user) return null;

  const currentSectorName = SECTORS.find(s => s.id === editPrimarySector)?.name || "Bilateral Trade";
  const username = user.email.split("@")[0];
  const publicUrl = `www.indiaglobalnews.com/leader/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
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

  const addExpertise = () => {
    if (newExpertise.trim()) {
      if (editFunctionalExpertise.length >= 5) return;
      if (editFunctionalExpertise.includes(newExpertise.trim())) return;
      setEditFunctionalExpertise(prev => [...prev, newExpertise.trim()]);
      setNewExpertise("");
    }
  };

  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setArticleSuccess(false);

    if (!newArticleTitle.trim() || !newArticleContent.trim()) {
      setValidationError("Headline and column content are required.");
      return;
    }

    // Limit to 1 article per month for free plan
    // In this simulation, if they already have 1 article in their list, block it.
    if (articles.length >= 1) {
      setValidationError("You have reached your Free Leader Plan limit of 1 published article per month. Upgrade to publish unlimited thought columns.");
      return;
    }

    const newArt: Article = {
      id: Date.now().toString(),
      title: newArticleTitle.trim(),
      content: newArticleContent.trim(),
      sector: newArticleSector,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      reads: 0
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

  // Simulating GDPR Export
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
      window.location.href = `./leader`;
    } else {
      alert("Confirmation name does not match.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Top Switcher Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#122238] rounded-3xl p-4 border border-gray-100 dark:border-white/5 mb-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-orange-500/10 text-orange-600 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dashboard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-sm font-bold text-[#1E3A5F] dark:text-white leading-tight flex items-center gap-2">
              <span>{editFullName || "Leader Profile"}</span>
              <span 
                className="px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider cursor-pointer"
                title="Free Member — This leader profile is self-declared and has not been verified by iGEN."
                onClick={() => setAdminTab("upgrade")}
              >
                <Star className="w-2.5 h-2.5 inline mr-0.5 fill-white text-white" /> FREE MEMBER
              </span>
            </h2>
          </div>
        </div>

        <div className="bg-[#f4f7fb] dark:bg-white/5 p-1 rounded-2xl flex items-center shrink-0">
          <button
            onClick={() => setViewMode("private")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "private"
                ? "bg-[#1E3A5F] text-white shadow-md"
                : "text-gray-500 hover:text-[#1E3A5F] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Dashboard
          </button>
          <button
            onClick={() => setViewMode("public")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "public"
                ? "bg-[#1E3A5F] text-white shadow-md"
                : "text-gray-500 hover:text-[#1E3A5F] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Public Page View
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRIVATE VIEW (ADMIN LEADER DASHBOARD)                                     */}
      {/* ========================================================================= */}
      {viewMode === "private" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2.5">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "edit", label: "Edit Profile Details", icon: Edit },
              { id: "articles", label: "Thought Columns", icon: FileText, badge: `${articles.length}/1` },
              { id: "linkage", label: "Company Linkage", icon: Building2 },
              { id: "upgrade", label: "Upgrade Plan", icon: Award },
              { id: "settings", label: "Leader Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    isActive 
                      ? "bg-[#1E3A5F] text-white shadow"
                      : "bg-white hover:bg-[#f4f7fb] text-gray-600 border border-gray-100 dark:bg-[#122238] dark:hover:bg-white/5 dark:border-white/5 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#F4A024]" : "text-gray-400"}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${isActive ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-white/10 text-gray-500"}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Sidebar Upgrade Callout */}
            <div className="bg-gradient-to-br from-[#C55A11] to-[#F4A024] rounded-3xl p-5 text-white border border-white/5 space-y-3.5 mt-6 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 fill-white text-[#C55A11]" /> Verified Leader Status
              </h4>
              <p className="text-[10px] leading-relaxed text-gray-100">
                Unlock the Blue Tick, publish unlimited thought columns, access the Pro Reader tier, and get featured on bilateral news feeds.
              </p>
              <button 
                onClick={() => setAdminTab("upgrade")}
                className="w-full py-2 bg-white text-[#C55A11] hover:bg-gray-50 text-[10px] font-black rounded-xl transition-all shadow-sm uppercase tracking-wider"
              >
                Upgrade Details
              </button>
            </div>
          </div>

          {/* Admin Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Header info card */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 text-left">
                  {editHeadshotBase64 ? (
                    <img src={editHeadshotBase64} alt="Headshot" className="w-20 h-20 rounded-full object-cover border border-gray-100 dark:border-white/10 shadow-sm shrink-0" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/5 border border-dashed border-gray-250 dark:border-white/15 flex flex-col items-center justify-center text-center shrink-0 cursor-pointer" onClick={() => setAdminTab("edit")}>
                      <User className="w-8 h-8 text-gray-300 dark:text-white/15" />
                      <span className="text-[8px] text-gray-400 mt-1 font-bold">Photo</span>
                    </div>
                  )}
                  <div className="space-y-1 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-xl font-bold text-[#1E3A5F] dark:text-white leading-tight">{editFullName}</h1>
                      <span className="px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-lg border border-orange-500/20">
                        Unverified Leader Profile
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
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Public Shareable Link</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly
                      value={publicUrl}
                      className="bg-white dark:bg-[#122238] px-2.5 py-1.5 rounded-lg text-[9px] font-mono text-gray-500 border-none focus:outline-none"
                    />
                    <button 
                      onClick={copyToClipboard}
                      className="px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white text-[9px] font-bold rounded-lg flex items-center gap-1 shrink-0"
                    >
                      {copiedUrl ? "Copied!" : <><Copy className="w-2.5 h-2.5" /> Copy</>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Light Blue Portability Info Strip */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3.5 text-xs text-blue-700 dark:text-blue-400 flex items-center gap-2.5">
                <Info className="w-4 h-4 shrink-0" />
                <span className="font-semibold">
                  Portability Principle: This Leader Page belongs to you — it stays with you regardless of company. Update your current company at any time.
                </span>
              </div>
            </div>

            {/* OVERVIEW TAB */}
            {adminTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Profile Completeness</span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-[#1E3A5F] dark:text-white">{completeness}%</span>
                        <span className="text-xs text-gray-400 font-semibold">{completeness === 100 ? "Complete!" : "Needs Setup"}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${completeness}%` }} />
                      </div>
                    </div>
                    <button onClick={() => setAdminTab("edit")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">Edit credentials <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Thought Columns Quota</span>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1E3A5F]/5 dark:bg-white/5 flex items-center justify-center text-[#1E3A5F] dark:text-white">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-[#1E3A5F] dark:text-white">{articles.length} <span className="text-xs text-gray-400">/ 1 month</span></h4>
                        <p className="text-[10px] text-gray-400 font-medium">Free plan limit active</p>
                      </div>
                    </div>
                    <button onClick={() => setAdminTab("articles")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">Go to publisher <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Linked Company</span>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white truncate max-w-[130px]">{editCompanyName || "Unlinked"}</h4>
                        <p className="text-[10px] text-orange-500 font-extrabold uppercase">Unverified Link</p>
                      </div>
                    </div>
                    <button onClick={() => setAdminTab("linkage")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">Manage linkage <ChevronRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Followers & Views details */}
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-150 dark:border-white/5 pb-3">
                    <h3 className="font-bold text-[#1E3A5F] dark:text-white">Profile Impact Tracker</h3>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-[10px] font-extrabold rounded-lg">Standard Discovery</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">Followers</span>
                      <span className="text-xl font-bold text-[#1E3A5F] dark:text-white">{followerCount}</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">Total reads</span>
                      <span className="text-xl font-bold text-[#1E3A5F] dark:text-white">128</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">Profile Clicks</span>
                      <span className="text-xl font-bold text-[#1E3A5F] dark:text-white">41</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-orange-500/20 flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-orange-500 block mb-0.5">AI Recommendations</span>
                      <button onClick={() => setAdminTab("upgrade")} className="text-[10px] font-bold text-blue-500 hover:underline text-left">Upgrade to view</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EDIT PROFILE TAB */}
            {adminTab === "edit" && (
              <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                  <div>
                    <h3 className="font-bold text-[#1E3A5F] dark:text-white">Edit Executive Credentials</h3>
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
                      <button type="button" onClick={() => headshotInputRef.current?.click()} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 text-[9px] font-bold rounded-lg text-gray-700 dark:text-white flex items-center gap-1"><Upload className="w-3 h-3" /> Select Photo</button>
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
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Company Website</label>
                      <input 
                        type="text" 
                        value={editCompanyWebsite}
                        onChange={(e) => setEditCompanyWebsite(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">LinkedIn Profile URL</label>
                    <input 
                      type="url" 
                      value={editLinkedinUrl}
                      onChange={(e) => setEditLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Primary & Secondary sectors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Primary Sector</label>
                      <select 
                        value={editPrimarySector}
                        onChange={(e) => setEditPrimarySector(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none"
                      >
                        {SECTORS.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Years of Experience</label>
                      <input 
                        type="number" 
                        value={editExperienceYears}
                        onChange={(e) => setEditExperienceYears(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Biography</label>
                      <span className="text-[10px] font-bold text-gray-400">Words: {getWordCount(editBio)} / 500</span>
                    </div>
                    <textarea 
                      rows={4}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none resize-none"
                    />
                  </div>

                  {/* Career Timeline */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Career Timeline (Max 5)</label>
                      <button type="button" onClick={addTimelineEntry} className="text-[#F4A024] text-[10px] font-bold">+ Add Row</button>
                    </div>
                    <div className="space-y-2">
                      {editTimeline.map((t, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input type="text" placeholder="Company" value={t.company} onChange={(e) => { const next = [...editTimeline]; next[idx].company = e.target.value; setEditTimeline(next); }} className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs flex-1" />
                          <input type="text" placeholder="Role" value={t.role} onChange={(e) => { const next = [...editTimeline]; next[idx].role = e.target.value; setEditTimeline(next); }} className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs flex-1" />
                          <input type="text" placeholder="Years" value={t.years} onChange={(e) => { const next = [...editTimeline]; next[idx].years = e.target.value; setEditTimeline(next); }} className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs flex-1" />
                          <button type="button" onClick={() => setEditTimeline(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 font-bold hover:text-red-700">×</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Education Timeline (Max 3)</label>
                      <button type="button" onClick={addEducationEntry} className="text-[#F4A024] text-[10px] font-bold">+ Add Row</button>
                    </div>
                    <div className="space-y-2">
                      {editEducation.map((e, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input type="text" placeholder="Institution" value={e.institution} onChange={(el) => { const next = [...editEducation]; next[idx].institution = el.target.value; setEditEducation(next); }} className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs flex-1" />
                          <input type="text" placeholder="Degree" value={e.degree} onChange={(el) => { const next = [...editEducation]; next[idx].degree = el.target.value; setEditEducation(next); }} className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs flex-1" />
                          <input type="text" placeholder="Year" value={e.year} onChange={(el) => { const next = [...editEducation]; next[idx].year = el.target.value; setEditEducation(next); }} className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs flex-1" />
                          <button type="button" onClick={() => setEditEducation(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 font-bold hover:text-red-700">×</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Functional Expertise */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Functional Expertise (Max 5)</label>
                      <span className="text-[10px] font-bold text-gray-400">Chips: {editFunctionalExpertise.length} / 5</span>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <input type="text" value={newExpertise} onChange={(e) => setNewExpertise(e.target.value)} className="flex-1 px-4 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" placeholder="Add skill" />
                      <button type="button" onClick={addExpertise} className="px-4 py-2 bg-[#1E3A5F] text-white text-xs font-bold rounded-xl">Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {editFunctionalExpertise.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-150 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded flex items-center gap-1">
                          {tag}
                          <button type="button" onClick={() => setEditFunctionalExpertise(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 font-bold hover:text-red-700 ml-1">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Philosophy Quote */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Industry Philosophy Quote</label>
                    <input 
                      type="text" 
                      value={editPhilosophy}
                      onChange={(e) => setEditPhilosophy(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    />
                  </div>

                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-white/5">
                  <button onClick={handleSaveProfile} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all">
                    Save Modifications
                  </button>
                </div>
              </div>
            )}

            {/* MY ARTICLES TAB */}
            {adminTab === "articles" && (
              <div className="space-y-6 text-left">
                
                {/* publisher form */}
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-[#1E3A5F] dark:text-white">Thought Column Publisher</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Publish thought leadership articles to frontpage sector feeds.</p>
                  </div>

                  {validationError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-700 text-xs rounded-xl font-medium">
                      {validationError}
                    </div>
                  )}

                  {articleSuccess && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/50 text-emerald-700 text-xs rounded-xl font-medium">
                      Article published successfully!
                    </div>
                  )}

                  <form onSubmit={handlePublishArticle} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Headline Title" 
                        value={newArticleTitle} 
                        onChange={(e) => setNewArticleTitle(e.target.value)} 
                        className="px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs border-none font-bold text-gray-700 dark:text-white" 
                      />
                      <select 
                        value={newArticleSector}
                        onChange={(e) => setNewArticleSector(e.target.value)}
                        className="px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs border-none font-semibold text-gray-700 dark:text-white"
                      >
                        {SECTORS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <textarea 
                      rows={6} 
                      placeholder="Write your analysis, recommendations, or industry quotes..." 
                      value={newArticleContent} 
                      onChange={(e) => setNewArticleContent(e.target.value)} 
                      className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs border-none text-gray-700 dark:text-white resize-none" 
                    />
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-gray-400 font-bold">Quota: {articles.length} / 1 published this month</span>
                      <button 
                        type="submit" 
                        disabled={articles.length >= 1}
                        className={`px-6 py-2.5 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md ${
                          articles.length >= 1 ? "bg-gray-300 dark:bg-white/5 text-gray-500 cursor-not-allowed" : "bg-[#1E3A5F] hover:bg-[#2F6FA3]"
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" /> Publish Column
                      </button>
                    </div>
                  </form>
                </div>

                {/* Published articles list */}
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Your Published Columns</span>
                  <div className="space-y-4">
                    {articles.map((art) => (
                      <div key={art.id} className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-250 dark:border-white/5 rounded-2xl flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white">{art.title}</h4>
                          <div className="flex items-center gap-3 text-[10px] text-gray-400">
                            <span>{art.date}</span>
                            <span>•</span>
                            <span className="text-blue-500">{SECTORS.find(s => s.id === art.sector)?.name || art.sector}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[10px] text-gray-400">Reads: {art.reads}</span>
                          <button 
                            onClick={() => handleDeleteArticle(art.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {articles.length === 0 && (
                      <p className="text-xs text-gray-400 italic text-center py-4">No published thought leadership articles found.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* COMPANY LINKAGE TAB */}
            {adminTab === "linkage" && (
              <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-6 text-left">
                <div>
                  <h3 className="font-bold text-[#1E3A5F] dark:text-white">Company Profile Linkage</h3>
                  <p className="text-xs text-gray-400 mt-0.5 leading-normal">Connect or change your organizational ties on IGENews.</p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-xs text-blue-700 dark:text-blue-400 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Info className="w-4 h-4" />
                    Bilateral Portability Active
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Under the portability guideline, you own your Leader profile. If you switch organizations, you can update this linkage at any time without losing your articles, settings, or credentials history.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Current Company Linkage</label>
                  <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-150 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white">{editCompanyName || "Unlinked"}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{editCompanyWebsite || "No website URL provided"}</p>
                    </div>
                    {editCompanyName && (
                      <button 
                        type="button" 
                        onClick={() => {
                          setEditCompanyName("");
                          setEditCompanyWebsite("");
                          updateOnboarding({
                            onboardingForm: {
                              ...profile,
                              leaderCompany: "",
                              companyWebsite: ""
                            }
                          });
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-bold"
                      >
                        Remove Link
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3.5 border-t border-gray-100 dark:border-white/5 pt-4">
                  <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white">Connect to another Company</h4>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Enter new company name" 
                      value={linkedCompanyId} 
                      onChange={(e) => setLinkedCompanyId(e.target.value)} 
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" 
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (linkedCompanyId.trim()) {
                          setEditCompanyName(linkedCompanyId.trim());
                          updateOnboarding({
                            onboardingForm: {
                              ...profile,
                              leaderCompany: linkedCompanyId.trim(),
                              linkedCompanyId: linkedCompanyId.trim()
                            }
                          });
                          setLinkedCompanyId("");
                          alert("Link request sent informally (simulated). Company updated.");
                        }
                      }}
                      className="px-5 py-2 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white text-xs font-bold rounded-xl shadow"
                    >
                      Request Connection Link
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* UPGRADE TAB */}
            {adminTab === "upgrade" && (
              <div className="space-y-6 text-left">
                <div className="bg-gradient-to-br from-[#1E3A5F] to-[#122238] rounded-3xl p-6 md:p-8 border border-white/10 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <Award className="w-64 h-64 text-white -mr-16 -mb-16" />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <span className="text-[10px] font-bold tracking-widest text-[#F4A024] uppercase bg-[#F4A024]/15 px-3 py-1 rounded-full">Upgrade Pricing Grid</span>
                    <h3 className="text-xl md:text-2xl font-bold font-display leading-tight">Secure Your Verified Blue Tick</h3>
                    <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                      Verify your coordinates with a work email review, unlock unlimited thought column drafting, access premium event invitations, and get the Leader Blue Tick.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  
                  {/* FREE LEADER */}
                  <div className="bg-white dark:bg-[#122238] border-2 border-gray-150 dark:border-white/5 rounded-[32px] p-6 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">Self-declared listing</span>
                        <h4 className="text-base font-bold text-[#1E3A5F] dark:text-white">FREE PROFILE</h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-black text-[#1E3A5F] dark:text-white">₹0</span>
                          <span className="text-[10px] text-gray-400">/ forever</span>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-white/5 w-full" />
                      <ul className="space-y-2 text-[11px] text-gray-500 leading-normal">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Basic public profile</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> 1 article published / mo</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Informal company linkage</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Profile Portability</li>
                        <li className="flex items-center gap-1.5 text-red-500"><ShieldAlert className="w-3.5 h-3.5" /> No Blue Tick</li>
                        <li className="flex items-center gap-1.5 text-red-500"><ShieldAlert className="w-3.5 h-3.5" /> No event speaking cards</li>
                      </ul>
                    </div>
                    <div className="pt-6">
                      <span className="w-full block py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-500 text-center font-bold text-xs rounded-xl uppercase tracking-wider">Active Free</span>
                    </div>
                  </div>

                  {/* VERIFIED LEADER */}
                  <div className="bg-gradient-to-b from-[#1E3A5F]/5 to-transparent dark:from-[#1E3A5F]/20 dark:to-[#122238]/20 border-2 border-[#1E3A5F] dark:border-[#F4A024] rounded-[32px] p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-[#F4A024] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Recommended</div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-[#F4A024] block uppercase">Verified leadership</span>
                        <h4 className="text-base font-bold text-[#1E3A5F] dark:text-white">VERIFIED LEADER</h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-black text-[#1E3A5F] dark:text-white">₹39,000</span>
                          <span className="text-[10px] text-gray-400">/ year</span>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-white/5 w-full" />
                      <ul className="space-y-2 text-[11px] text-gray-600 dark:text-gray-300 leading-normal">
                        <li className="flex items-center gap-1.5 text-blue-500 font-bold"><Check className="w-3.5 h-3.5 text-blue-500" /> Verified Blue Tick</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Unlimited articles</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Verified company link</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> AI recommendations visibility</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Speaking panel opportunities</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Premium SEO metadata</li>
                      </ul>
                    </div>
                    <div className="pt-6">
                      <button 
                        onClick={() => window.location.href = `leader`}
                        className="w-full py-2.5 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white dark:bg-[#F4A024] dark:hover:bg-[#f6b453] text-center font-bold text-xs rounded-xl shadow uppercase tracking-wider transition-all"
                      >
                        Buy Verified Plan
                      </button>
                    </div>
                  </div>

                  {/* LEADER ELITE */}
                  <div className="bg-white dark:bg-[#122238] border-2 border-gray-150 dark:border-white/5 rounded-[32px] p-6 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">Sector authority branding</span>
                        <h4 className="text-base font-bold text-[#1E3A5F] dark:text-white">LEADER ELITE</h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-black text-[#1E3A5F] dark:text-white">₹1L - 5L</span>
                          <span className="text-[10px] text-gray-400">/ year</span>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-white/5 w-full" />
                      <ul className="space-y-2 text-[11px] text-gray-500 leading-normal">
                        <li className="flex items-center gap-1.5 text-blue-500 font-bold"><Check className="w-3.5 h-3.5 text-blue-500" /> Elite verification check</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Homepage top visibility placement</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Video interviews & podcast production</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Awards jury selection</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Dedicated branding manager</li>
                      </ul>
                    </div>
                    <div className="pt-6">
                      <button 
                        onClick={() => window.location.href = `leader`}
                        className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1E3A5F] dark:text-white text-center font-bold text-xs rounded-xl uppercase tracking-wider transition-all border border-gray-200 dark:border-transparent"
                      >
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {adminTab === "settings" && (
              <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-6 text-left">
                <div>
                  <h3 className="font-bold text-[#1E3A5F] dark:text-white">Leader Settings</h3>
                  <p className="text-xs text-gray-400 mt-0.5 leading-normal">Adjust profile visibility limits, link privacy, and notification settings.</p>
                </div>

                {/* Company Link Privacy */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white">Current Company Privacy Toggle</h4>
                    <p className="text-[10px] text-gray-400">Decide if your current company link is visible to visitors. (Useful for transition periods).</p>
                  </div>
                  <button 
                    onClick={() => setCompanyPrivacy(!companyPrivacy)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      companyPrivacy 
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-orange-500/10 text-orange-600"
                    }`}
                  >
                    {companyPrivacy ? "Current Company Shown" : "Current Company Hidden"}
                  </button>
                </div>

                {/* Profile Visibility */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white">Public Profile Visibility</h4>
                    <p className="text-[10px] text-gray-400">Toggle whether your public page is indexable to other readers.</p>
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

                {/* GDPR compliance data download */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4">
                  <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white mb-1">GDPR Compliance Data Export</h4>
                  <p className="text-[10px] text-gray-400 mb-3 leading-normal">Download a structured JSON copy of all data indexed under your profile.</p>
                  <button 
                    onClick={handleGDPRDownload}
                    className="px-4 py-2 bg-gray-150 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-white text-xs font-bold rounded-xl border border-gray-200 dark:border-transparent flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" /> Download Profile Data
                  </button>
                </div>

                {/* Notifications */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white">Email Notification Toggles</h4>
                  <div className="space-y-2">
                    {[
                      { checked: notifComments, set: setNotifComments, label: "Article comments alerts", desc: "Notify when readers post comments on your thought columns" },
                      { checked: notifFollowers, set: setNotifFollowers, label: "New followers milestones", desc: "Get notifications when trade professionals follow you" },
                      { checked: notifLinkRequest, set: setNotifLinkRequest, label: "Company connection updates", desc: "Alerts when company admins request to verify your link" },
                      { checked: notifUpdates, set: setNotifUpdates, label: "iGEN platform newsletters", desc: "Receive monthly executive thought bulletins" },
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-start gap-3 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer p-1">
                        <input type="checkbox" checked={item.checked} onChange={(e) => item.set(e.target.checked)} className="rounded text-[#1E3A5F] focus:ring-[#1E3A5F] mt-0.5" />
                        <div>
                          <span>{item.label}</span>
                          <span className="block text-[9px] text-gray-400 font-normal leading-tight mt-0.5">{item.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Suspends/Deletions */}
                <div className="border-t border-red-500/10 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-red-500">Danger Zone</h4>
                  {!deleteConfirmOpen ? (
                    <button onClick={() => setDeleteConfirmOpen(true)} className="px-4 py-2 border border-red-500/20 text-red-500 hover:bg-red-500/5 text-xs font-bold rounded-xl transition-all">Delete Leader Profile</button>
                  ) : (
                    <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3.5 max-w-md">
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        This action completely deletes your leader profile registry, career timeline, and thought columns history.
                        To confirm, type <strong className="text-[#1E3A5F] dark:text-white">{editFullName}</strong> below:
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
      )}

      {/* ========================================================================= */}
      {/* PUBLIC VIEW (VISITOR PUBLIC LEADER PROFILE VIEW)                         */}
      {/* ========================================================================= */}
      {viewMode === "public" && (
        <div className="space-y-8">
          
          {/* Public Header Card */}
          <div className="bg-white dark:bg-[#122238] rounded-[32px] border border-gray-150 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="h-40 bg-gradient-to-r from-[#1E3A5F] to-[#2F6FA3] dark:from-[#112238] dark:to-[#172c47] relative overflow-hidden" />

            <div className="p-6 md:p-8 space-y-6 relative text-left">
              {/* Profile headshot and info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 -mt-16 sm:-mt-20">
                {editHeadshotBase64 ? (
                  <img src={editHeadshotBase64} alt="Headshot" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-[#122238] object-cover bg-white shadow-lg shrink-0" />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-[#122238] bg-gray-50 dark:bg-white/5 flex items-center justify-center shadow-lg shrink-0">
                    <User className="w-10 h-10 text-gray-300 dark:text-white/10" />
                  </div>
                )}
                
                <div className="flex-1 text-center sm:text-left space-y-2 pt-1.5">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] dark:text-white leading-tight font-display">{editFullName}</h1>
                    <div 
                      className="flex items-center gap-1 px-2.5 py-0.5 bg-[#C55A11] text-white text-[10px] font-black rounded-lg uppercase tracking-wider cursor-pointer"
                      title="Free Member — This leader profile is self-declared and has not been verified by iGEN."
                    >
                      <Star className="w-3 h-3 fill-white text-white" /> FREE MEMBER
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-gray-500 font-medium">
                    <span>{editDesignation}</span>
                    {editCompanyName && companyPrivacy && (
                      <span className="flex items-center gap-1">
                        At <span className="font-bold text-[#1E3A5F] dark:text-white">{editCompanyName}</span> 
                        <span className="px-1.5 py-0.2 bg-gray-100 text-gray-500 text-[8px] font-extrabold rounded">Unverified Link</span>
                      </span>
                    )}
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-[9px] rounded font-bold uppercase">{editRoleLevel}</span>
                  </div>
                  
                  {editPhilosophy && (
                    <p className="text-xs text-gray-500 italic font-semibold max-w-2xl">
                      "{editPhilosophy}"
                    </p>
                  )}
                </div>

                <div className="flex gap-2.5 shrink-0 pt-2 sm:pt-0">
                  <button 
                    onClick={() => {
                      setIsFollowing(!isFollowing);
                      setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
                    }}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
                      isFollowing 
                        ? "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-300"
                        : "bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white shadow-md"
                    }`}
                  >
                    {isFollowing ? "Following" : "+ Follow"}
                  </button>
                  {editLinkedinUrl && (
                    <a 
                      href={editLinkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gray-50 hover:bg-gray-150 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl text-[#1E3A5F] dark:text-white flex items-center justify-center"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Columns Tabs/Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content Area (Tabs) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Tab Headers */}
              <div className="flex border-b border-gray-100 dark:border-white/5">
                {[
                  { id: "bio", label: "Executive Biography" },
                  { id: "articles", label: "Thought Columns" },
                  { id: "sectors", label: "Sectors Taxonomy" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPublicTab(t.id as any)}
                    className={`px-5 py-3 text-xs font-bold border-b-2 transition-all -mb-px text-left ${
                      publicTab === t.id
                        ? "border-[#1E3A5F] text-[#1E3A5F] dark:border-[#F4A024] dark:text-[#F4A024]"
                        : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* BIOGRAPHY TAB */}
              {publicTab === "bio" && (
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-150 dark:border-white/5 text-left space-y-6 shadow-sm">
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#1E3A5F] dark:text-white border-l-4 border-[#F4A024] pl-2.5">Biography Overview</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                      {editBio || "No biography provided."}
                    </p>
                  </div>

                  {/* Career Timeline visual */}
                  {editTimeline.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> Career Timeline</h3>
                      <div className="relative border-l border-gray-100 dark:border-white/5 pl-4 ml-2.5 space-y-4">
                        {editTimeline.map((item, idx) => (
                          <div key={idx} className="relative space-y-1">
                            <span className="absolute -left-[21.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white dark:border-[#122238]" />
                            <span className="text-[10px] font-bold text-[#F4A024]">{item.years}</span>
                            <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white">{item.role}</h4>
                            <p className="text-[10px] text-gray-400 font-medium">{item.company}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education entries */}
                  {editEducation.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> Education</h3>
                      <div className="space-y-3 pl-2">
                        {editEducation.map((edu, idx) => (
                          <div key={idx} className="text-left text-xs">
                            <h4 className="font-bold text-[#1E3A5F] dark:text-white">{edu.institution}</h4>
                            <p className="text-[10px] text-gray-400 font-semibold">{edu.degree} — Class of {edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {editAchievements.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Key Accomplishments</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {editAchievements.map((ach, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-transparent text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                            {ach}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Functional expertise chips */}
                  {editFunctionalExpertise.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-2">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Core Capabilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {editFunctionalExpertise.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-650 dark:text-gray-350 text-xs font-semibold rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* THOUGHT COLUMNS TAB */}
              {publicTab === "articles" && (
                <div className="space-y-4 text-left">
                  {articles.map((art) => (
                    <div key={art.id} className="bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-3xl p-6 space-y-2.5 shadow-sm hover:shadow transition-all">
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>IGENews Thought Column</span>
                        <span>{art.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1E3A5F] dark:text-white leading-normal hover:text-[#F4A024] cursor-pointer">{art.title}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                        {art.content}
                      </p>
                      <div className="flex items-center justify-between pt-2 text-[10px] text-gray-400 font-bold border-t border-gray-50 dark:border-white/5">
                        <span>Reads: {art.reads}</span>
                        <span className="text-blue-500 hover:underline flex items-center gap-0.5 cursor-pointer">View Analysis <ArrowUpRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </div>
                  ))}
                  {articles.length === 0 && (
                    <div className="bg-white dark:bg-[#122238] rounded-3xl p-8 border border-gray-150 dark:border-white/5 text-center text-gray-400 italic">
                      No thought leadership columns published yet.
                    </div>
                  )}
                </div>
              )}

              {/* SECTORS TAB */}
              {publicTab === "sectors" && (
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-150 dark:border-white/5 text-left space-y-4 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Indexed Industry Sectors</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Primary Bilateral Sector</span>
                      <span className="px-3 py-1.5 bg-[#1E3A5F] text-white text-xs font-bold rounded-lg inline-block">
                        {currentSectorName}
                      </span>
                    </div>

                    {editSecondarySectors.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Secondary Industry Sectors</span>
                        <div className="flex flex-wrap gap-2">
                          {editSecondarySectors.map((sectorId) => (
                            <span key={sectorId} className="px-3 py-1.5 bg-gray-50 border border-gray-250 dark:bg-white/5 dark:border-white/5 text-gray-650 dark:text-gray-350 text-xs font-semibold rounded-lg">
                              {SECTORS.find(s => s.id === sectorId)?.name || sectorId}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6 text-left">
              
              {/* Leader Stats Card */}
              <div className="bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest block">Executive Profile Metrics</h3>
                
                <div className="space-y-3 font-medium text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between border-b border-gray-50 dark:border-white/5 pb-2">
                    <span className="text-gray-400">Total Experience:</span>
                    <span className="font-bold text-[#1E3A5F] dark:text-white">{editExperienceYears} Years</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 dark:border-white/5 pb-2">
                    <span className="text-gray-400">Executive Level:</span>
                    <span className="font-bold text-[#1E3A5F] dark:text-white">{editRoleLevel.split(" ")[0]}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 dark:border-white/5 pb-2">
                    <span className="text-gray-400">Thought Columns:</span>
                    <span className="font-bold text-[#1E3A5F] dark:text-white">{articles.length} Published</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-400">Profile Status:</span>
                    <span className="font-bold text-orange-600">Self-Declared</span>
                  </div>
                </div>
              </div>

              {/* Related Leaders Card */}
              <div className="bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest block">Similar Leaders</h3>
                
                <div className="space-y-3.5">
                  {[
                    { name: "Vikram Malhotra", level: "CEO", loc: "Mumbai, India" },
                    { name: "Sarah Jenkins", level: "Managing Director", loc: "London, UK" },
                    { name: "Rashed Al-Mansoori", level: "Director", loc: "Dubai, UAE" }
                  ].map((lead, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs border-b border-gray-50 dark:border-white/5 pb-2.5 last:border-none last:pb-0">
                      <div>
                        <h4 className="font-bold text-[#1E3A5F] dark:text-white hover:underline cursor-pointer">{lead.name}</h4>
                        <span className="text-[10px] text-gray-400">{lead.loc}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-[9px] font-black rounded uppercase text-gray-500">{lead.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Sector News Feed */}
              <div className="bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest block">Sector News Updates</h3>
                
                <div className="space-y-3.5 text-xs">
                  {[
                    "New Export Standard Directives Drafted for Global Shipping Protocols",
                    "How C-Suite Executives Capitalize on Regulatory Trade Shocks"
                  ].map((news, idx) => (
                    <div key={idx} className="space-y-1 border-b border-gray-50 dark:border-white/5 pb-2.5 last:border-none last:pb-0">
                      <h4 className="font-bold text-[#1E3A5F] dark:text-white hover:text-[#F4A024] cursor-pointer leading-snug">{news}</h4>
                      <span className="text-[9px] text-gray-400">Global Trade Review</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Eye, Award, CheckCircle2, ShieldCheck, 
  FileText, Send, Calendar, Globe, ArrowUpRight, 
  Copy, Share2, Sparkles, TrendingUp, Briefcase, 
  ShieldAlert, Star, Edit, Settings, Trash2, Check, 
  Mail, Phone, MapPin, Plus, MessageSquare, User, 
  Shield, ShieldX, HelpCircle, ChevronRight, ChevronDown, Info, BarChart3
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

interface Article {
  id: string;
  title: string;
  content: string;
  sector: string;
  date: string;
  status: "Published" | "Draft" | "Under Review";
  reads: number;
}

// 10 Products for Affiliate Program
const AFFILIATE_PRODUCTS = [
  { name: "iGEN Reader Pro Plan (Annual)", price: "₹4,999", rate: "25%", commission: "₹1,250" },
  { name: "iGEN Reader Enterprise Plan", price: "₹24,999", rate: "20%", commission: "₹5,000" },
  { name: "Associate SME Plus Plan", price: "₹25,000", rate: "25%", commission: "₹6,250" },
  { name: "Associate SME Premium Plan", price: "₹75,000", rate: "25%", commission: "₹18,750" },
  { name: "SME Pro Authority Plan", price: "₹49,000", rate: "20%", commission: "₹9,800" },
  { name: "SME Elite Plan (Annual)", price: "₹1,50,000", rate: "15%", commission: "₹22,500" },
  { name: "Company Silver Page Listing", price: "₹99,000", rate: "20%", commission: "₹19,800" },
  { name: "Company Gold Page Listing", price: "₹1,99,000", rate: "15%", commission: "₹29,850" },
  { name: "Leader Thought Column Page", price: "₹59,000", rate: "20%", commission: "₹11,800" },
  { name: "iGEN Global Trade Report (PDF)", price: "₹14,999", rate: "25%", commission: "₹3,750" }
];

export default function AssociateSmeDashboard() {
  const { user, updateOnboarding } = useAuth();
  
  // View switcher: "private" (Admin) or "public" (Visitor View)
  const [viewMode, setViewMode] = useState<"private" | "public">("private");

  // Admin Tabs: "overview", "edit", "articles", "affiliate", "upgrade", "settings"
  const [adminTab, setAdminTab] = useState<"overview" | "edit" | "articles" | "affiliate" | "upgrade" | "settings">("overview");

  // Public View Tabs: "about", "articles", "sectors"
  const [publicTab, setPublicTab] = useState<"about" | "articles" | "sectors">("about");

  // Copied clipboard states
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedAffiliate, setCopiedAffiliate] = useState(false);

  // Profile data shorthand
  const profile = user?.onboardingForm || {};

  // Follower State simulation
  const [followerCount, setFollowerCount] = useState(89);
  const [isFollowing, setIsFollowing] = useState(false);

  // --- Article Publisher States ---
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState(profile.sector || "manufacturing");
  const [newContent, setNewContent] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleFeedback, setArticleFeedback] = useState<string | null>(null);

  // --- Edit Profile States ---
  const [editName, setEditName] = useState(profile.fullName || user?.name || "");
  const [editDesignation, setEditDesignation] = useState(profile.currentDesignation || "");
  const [editOrganisation, setEditOrganisation] = useState(profile.organisation || "");
  const [editCountry, setEditCountry] = useState(profile.country || "India");
  const [editState, setEditState] = useState(profile.state || "Maharashtra");
  const [editCity, setEditCity] = useState(profile.city || "Mumbai");
  const [editLinkedin, setEditLinkedin] = useState(profile.linkedinUrl || "");
  const [editExperience, setEditExperience] = useState<number>(profile.experienceYears || 12);
  const [editPrimarySector, setEditPrimarySector] = useState(profile.sector || "manufacturing");
  const [editSecondarySector, setEditSecondarySector] = useState(profile.secondarySector || "");
  const [editBio, setEditBio] = useState(profile.aboutText || "");
  const [editMilestones, setEditMilestones] = useState<string[]>(profile.milestones || ["", ""]);
  const [editRoleFocus, setEditRoleFocus] = useState(profile.roleFocus || "");
  const [editFollowSectors, setEditFollowSectors] = useState<string[]>(profile.followSectors || []);
  const [editCountriesInterest, setEditCountriesInterest] = useState<string[]>(profile.countriesInterest || ["India"]);
  const [editPhoto, setEditPhoto] = useState(profile.profilePic || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Settings States ---
  const [profileVisibility, setProfileVisibility] = useState<"Public" | "Private">("Public");
  const [emailComments, setEmailComments] = useState(true);
  const [emailFollowers, setEmailFollowers] = useState(true);
  const [emailReferrals, setEmailReferrals] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);

  // Load articles from localStorage or default
  useEffect(() => {
    if (user) {
      const storageKey = `ign_articles_associate_${user.email}`;
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setArticles(JSON.parse(cached));
      } else {
        const initialArticles: Article[] = [
          {
            id: "art-1",
            title: `Bilateral Supply Chain Logistics in the ${SECTORS.find(s => s.id === (profile.sector || "manufacturing"))?.name || "Manufacturing"} Sector`,
            content: "As emerging trade sectors adjust to new digital corridors, operations managers are seeking to audit logistics compliance. In this paper, we explore bilateral clearance routes and how MSME operators can reduce duty cycles by up to 14%...",
            sector: profile.sector || "manufacturing",
            date: "May 24, 2026",
            status: "Published",
            reads: 112
          }
        ];
        setArticles(initialArticles);
        localStorage.setItem(storageKey, JSON.stringify(initialArticles));
      }
    }
  }, [user, profile.sector]);

  // Sync articles helper
  const saveArticlesToCache = (updatedList: Article[]) => {
    setArticles(updatedList);
    if (user) {
      localStorage.setItem(`ign_articles_associate_${user.email}`, JSON.stringify(updatedList));
    }
  };

  if (!user) return null;

  const username = user.email.split("@")[0];
  const publicUrl = `www.indiaglobalnews.com/associate-sme/${username}`;
  const affiliateLink = `https://igenews.com/ref?code=associate_${user.id || "007"}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const copyAffiliate = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopiedAffiliate(true);
    setTimeout(() => setCopiedAffiliate(false), 2000);
  };

  // Word count utility
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const calculateCompleteness = () => {
    let score = 0;
    if (profile.fullName || user.name) score += 15;
    if (profile.profilePic || editPhoto) score += 15;
    if (profile.currentDesignation) score += 15;
    if (profile.location) score += 15;
    if (profile.aboutText) score += 20;
    if (profile.milestones && profile.milestones.length > 0) score += 10;
    if (profile.sector) score += 10;
    return score;
  };

  const profileCompleteness = calculateCompleteness();

  // --- Article Publisher Submit ---
  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    setArticleFeedback(null);

    // Limit check for Free tier (max 1 article per month)
    const publishedCount = articles.filter(a => a.status === "Published").length;
    if (publishedCount >= 1) {
      setArticleFeedback("Monthly publishing limit of 1 article reached for the Free Plan. Please upgrade to write unlimited articles.");
      return;
    }

    if (!newTitle.trim() || !newContent.trim()) {
      setArticleFeedback("Headline and Body Content are required.");
      return;
    }

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      sector: newSector,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Published",
      reads: 0
    };

    const updated = [newArticle, ...articles];
    saveArticlesToCache(updated);
    
    // Reset Form
    setNewTitle("");
    setNewContent("");
    setArticleFeedback("Article published successfully! Check it out in the Public View.");
    setTimeout(() => setArticleFeedback(null), 4000);
  };

  const handleDeleteArticle = (id: string) => {
    const updated = articles.filter(art => art.id !== id);
    saveArticlesToCache(updated);
  };

  // Save profile changes (Edit Profile Tab)
  const handleSaveProfile = async () => {
    setArticleFeedback(null);
    if (!editName.trim()) {
      setArticleFeedback("Full Name cannot be empty.");
      return;
    }
    if (!editDesignation.trim()) {
      setArticleFeedback("Current Designation cannot be empty.");
      return;
    }
    if (editExperience < 10 || editExperience > 20) {
      setArticleFeedback("Associate SME status requires 10 to 20 years of experience.");
      return;
    }

    const locationString = `${editCity}, ${editState}, ${editCountry}`;
    const updatedForm = {
      ...profile,
      fullName: editName,
      profilePic: editPhoto,
      currentDesignation: editDesignation,
      organisation: editOrganisation,
      location: locationString,
      city: editCity,
      state: editState,
      country: editCountry,
      linkedinUrl: editLinkedin,
      experienceYears: editExperience,
      sector: editPrimarySector,
      secondarySector: editSecondarySector,
      aboutText: editBio,
      milestones: editMilestones.filter(m => m.trim() !== ""),
      roleFocus: editRoleFocus,
      followSectors: editFollowSectors,
      countriesInterest: editCountriesInterest
    };

    await updateOnboarding({
      name: editName,
      sectors: [editPrimarySector, ...editFollowSectors].slice(0, 10),
      countries: editCountriesInterest,
      onboardingForm: updatedForm
    });

    setArticleFeedback("Profile settings saved successfully.");
    setAdminTab("overview");
    setTimeout(() => setArticleFeedback(null), 4000);
  };

  const handleEditPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setArticleFeedback("Profile picture exceeds the maximum 2MB size limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setEditPhoto(event.target.result as string);
        setArticleFeedback(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleEditFollowSector = (sectorId: string) => {
    if (editFollowSectors.includes(sectorId)) {
      setEditFollowSectors(prev => prev.filter(id => id !== sectorId));
    } else {
      setEditFollowSectors(prev => [...prev, sectorId]);
    }
  };

  const currentSectorName = SECTORS.find(s => s.id === (profile.sector || "manufacturing"))?.name || "Manufacturing";
  const userPhoto = profile.profilePic || editPhoto || "";

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Top Bar Switcher between Private Admin and Public Profile */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#122238] rounded-3xl p-4 border border-gray-100 dark:border-white/5 mb-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#C55A11]/15 text-[#C55A11]">
            <Star className="w-5 h-5 fill-[#C55A11]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dashboard Portal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
            </div>
            <h2 className="text-sm font-bold text-[#1E3A5F] dark:text-white leading-tight flex items-center gap-1.5">
              <span>Free Associate SME Profile</span>
              <span className="px-2 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider">
                Unverified
              </span>
            </h2>
          </div>
        </div>

        {/* Mode switcher buttons */}
        <div className="bg-[#f4f7fb] dark:bg-white/5 p-1 rounded-2xl flex items-center shrink-0 border border-gray-200/50 dark:border-transparent">
          <button
            onClick={() => setViewMode("private")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "private"
                ? "bg-[#1E3A5F] text-white shadow-md dark:bg-[#C55A11]"
                : "text-gray-500 hover:text-[#1E3A5F] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Private Dashboard
          </button>
          <button
            onClick={() => setViewMode("public")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "public"
                ? "bg-[#1E3A5F] text-white shadow-md dark:bg-[#C55A11]"
                : "text-gray-500 hover:text-[#1E3A5F] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Public View
          </button>
        </div>
      </div>

      {/* Notification feedback */}
      {articleFeedback && (
        <div className="mb-6 p-4 bg-[#1E3A5F] text-white text-xs rounded-2xl flex items-center gap-2 font-medium shadow-md">
          <Info className="w-4 h-4 text-[#F4A024] shrink-0" />
          <span>{articleFeedback}</span>
        </div>
      )}

      {/* PRIVATE ADMIN VIEW */}
      {viewMode === "private" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Header Profile Card */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 relative overflow-hidden">
              
              {/* FREE MEMBER Badge */}
              <button 
                onClick={() => setAdminTab("upgrade")}
                className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 bg-[#C55A11] hover:bg-[#a0460a] text-white text-[9px] font-black rounded uppercase tracking-wider shadow transition-colors"
                title="Free Member — Click to Upgrade"
              >
                <Star className="w-2.5 h-2.5 fill-white text-white" /> FREE MEMBER
              </button>

              <div className="flex flex-col items-center pt-2 text-center space-y-3">
                {/* 80px circular avatar */}
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-inner relative group">
                  {userPhoto ? (
                    <img src={userPhoto} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                  <button 
                    onClick={() => setAdminTab("edit")}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="space-y-1">
                  {/* Name in 28px bold (simulated as text-lg font-bold / leading) */}
                  <h3 className="text-lg font-bold text-[#1E3A5F] dark:text-white leading-snug">
                    {profile.fullName || user.name}
                  </h3>
                  
                  {/* 'Associate SME' designation tag */}
                  <span className="px-2 py-0.5 bg-[#1E3A5F]/5 text-[#1E3A5F] dark:bg-white/5 dark:text-gray-300 text-[10px] font-black rounded uppercase tracking-wider inline-block">
                    Associate SME
                  </span>
                  
                  {/* Profile Status orange chip */}
                  <div className="pt-1.5">
                    <span className="px-2 py-0.5 border border-[#C55A11] text-[#C55A11] text-[9px] font-bold rounded-full inline-block uppercase tracking-wider">
                      Free & Unverified
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-white/5 w-full my-4" />

              <div className="space-y-2.5 text-xs text-gray-500">
                {/* Experience Display */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 uppercase">Experience</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {profile.experienceYears || 12} Years Exp
                  </span>
                </div>

                {/* Primary Sector Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 uppercase">Sector</span>
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-white/5 text-blue-700 dark:text-blue-400 font-bold rounded text-[10px] truncate max-w-[120px]">
                    {currentSectorName}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs List */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-3 border border-gray-100 dark:border-white/5 shadow-sm space-y-1">
              {[
                { id: "overview", label: "Overview Tab", icon: BarChart3 },
                { id: "edit", label: "Edit Profile Tab", icon: Edit },
                { id: "articles", label: "My Articles Tab", icon: FileText },
                { id: "affiliate", label: "Affiliate Portal Tab", icon: Award },
                { id: "upgrade", label: "Upgrade Tab", icon: Sparkles },
                { id: "settings", label: "Dashboard Settings", icon: Settings }
              ].map(t => {
                const Icon = t.icon;
                const active = adminTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setAdminTab(t.id as any)}
                    className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-bold transition-all text-left ${
                      active
                        ? "bg-[#1E3A5F]/10 text-[#1E3A5F] dark:bg-[#C55A11]/10 dark:text-[#C55A11]"
                        : "text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Admin Content Right Column */}
          <div className="lg:col-span-9 bg-white dark:bg-[#122238] rounded-[32px] p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm">
            <AnimatePresence mode="wait">
              
              {/* OVERVIEW TAB */}
              {adminTab === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white font-display">Associate SME Overview</h3>
                    <p className="text-xs text-gray-400 mt-1">Summary of your self-declared credentials, article limits, and referral metrics.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Completeness gauge */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent space-y-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Completeness %</span>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="24" cy="24" r="20" fill="transparent" stroke="rgba(0,0,0,0.05)" strokeWidth="4" />
                            <circle cx="24" cy="24" r="20" fill="transparent" stroke="#C55A11" strokeWidth="4" 
                                    strokeDasharray={`${2 * Math.PI * 20}`} 
                                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - profileCompleteness / 100)}`} />
                          </svg>
                          <span className="absolute text-[10px] font-bold text-[#1E3A5F] dark:text-white">{profileCompleteness}%</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Profile Index</span>
                          <span className="text-[10px] text-gray-400 block">{profileCompleteness === 100 ? "Ready for search mapping" : "Provide bio/photo to optimize search"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Article count (limit 1/mo) */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Published Columns</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#1E3A5F] dark:text-white">{articles.length}</span>
                        <span className="text-xs text-gray-400">/ 1 monthly limit</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${(articles.length / 1) * 100}%` }} />
                      </div>
                    </div>

                    {/* Referral Clicks */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Referral Traffic Clicks</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#1E3A5F] dark:text-white">48</span>
                        <span className="text-xs text-gray-400">clicks</span>
                      </div>
                      <span className="text-[9px] text-[#C55A11] font-bold block uppercase">Earned: ₹3,500 Credits</span>
                    </div>
                  </div>

                  {/* Earning banner */}
                  <div className="p-5 bg-gradient-to-r from-emerald-600/10 to-teal-600/5 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">Affiliate Referral Earnings</span>
                      <p className="text-[11px] text-gray-500 leading-normal max-w-lg">
                        You can earn up to **25% commission** on all 10 iGEN products by sharing your link. Currently accumulated ₹3,500 will be converted to discount credits on plan upgrade.
                      </p>
                    </div>
                    <button 
                      onClick={() => setAdminTab("affiliate")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow shrink-0"
                    >
                      Open Affiliate Portal
                    </button>
                  </div>
                </motion.div>
              )}

              {/* EDIT PROFILE TAB */}
              {adminTab === "edit" && (
                <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white">Edit Profile Details</h3>
                    <p className="text-xs text-gray-400 mt-1">Update your biography, milestones, and directory tags.</p>
                  </div>

                  <div className="space-y-5">
                    {/* Basic Form fields */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-2 border-b border-gray-100 dark:border-white/5">
                      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner">
                          {editPhoto ? (
                            <img src={editPhoto} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleEditPhotoChange} 
                          accept="image/*" 
                          className="hidden" 
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Profile Picture</span>
                        <button 
                          type="button" 
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-1 px-3 py-1.5 bg-gray-50 dark:bg-white/5 rounded border border-gray-200 dark:border-white/5 text-[10px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100"
                        >
                          Change Avatar
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Full Name</label>
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Current Designation / Title</label>
                        <input 
                          type="text" 
                          value={editDesignation}
                          onChange={(e) => setEditDesignation(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Current Organisation</label>
                        <input 
                          type="text" 
                          value={editOrganisation}
                          onChange={(e) => setEditOrganisation(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">LinkedIn Profile URL</label>
                        <input 
                          type="url" 
                          value={editLinkedin}
                          onChange={(e) => setEditLinkedin(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Location fields */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Location Coordinates</label>
                      <div className="grid grid-cols-3 gap-4">
                        <input 
                          type="text" 
                          value={editCity} 
                          onChange={(e) => setEditCity(e.target.value)}
                          placeholder="City"
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        />
                        <input 
                          type="text" 
                          value={editState} 
                          onChange={(e) => setEditState(e.target.value)}
                          placeholder="State"
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        />
                        <input 
                          type="text" 
                          value={editCountry} 
                          onChange={(e) => setEditCountry(e.target.value)}
                          placeholder="Country"
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Primary sector & secondary sectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Primary Sector</label>
                        <select 
                          value={editPrimarySector}
                          onChange={(e) => setEditPrimarySector(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        >
                          {SECTORS.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Secondary Sector</label>
                        <select 
                          value={editSecondarySector}
                          onChange={(e) => setEditSecondarySector(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        >
                          <option value="">None</option>
                          {SECTORS.filter(s => s.id !== editPrimarySector).map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Biography Summary (Max 400 words)</label>
                        <span className="text-[9px] font-bold text-gray-400">{getWordCount(editBio)} / 400 words</span>
                      </div>
                      <textarea 
                        rows={4}
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none resize-none"
                      />
                    </div>

                    {/* Current Role Focus */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Role Focus Statement (Max 100 words)</label>
                        <span className="text-[9px] font-bold text-gray-400">{getWordCount(editRoleFocus)} / 100 words</span>
                      </div>
                      <input 
                        type="text" 
                        value={editRoleFocus}
                        onChange={(e) => setEditRoleFocus(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                      />
                    </div>

                    {/* Milestones */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Career Highlights (Milestone Statements, max 80 words each)</label>
                      {editMilestones.map((m, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <span className="text-[10px] font-bold text-gray-400 shrink-0">#{idx + 1}</span>
                          <input 
                            type="text" 
                            value={m}
                            onChange={(e) => {
                              const next = [...editMilestones];
                              next[idx] = e.target.value;
                              setEditMilestones(next);
                            }}
                            className="flex-1 px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 flex justify-end">
                      <button 
                        type="button" 
                        onClick={handleSaveProfile}
                        className="px-6 py-2.5 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* MY ARTICLES TAB */}
              {adminTab === "articles" && (
                <motion.div key="articles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white font-display">My Published Articles</h3>
                      <p className="text-xs text-gray-400 mt-1">Publish columns to the global feed. Limit: 1 article/month.</p>
                    </div>
                    
                    <span className="px-3 py-1.5 bg-[#C55A11]/15 text-[#C55A11] text-[10px] font-black rounded-lg uppercase tracking-wider">
                      {articles.filter(a => a.status === "Published").length} / 1 Articles Published This Month
                    </span>
                  </div>

                  {/* Write New Article Block */}
                  <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" /> Write New Article
                    </h4>

                    {articles.filter(a => a.status === "Published").length >= 1 ? (
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-400 text-xs rounded-xl flex items-start gap-2.5 font-semibold">
                        <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span>Monthly publishing limit of 1 article reached for the Free Plan.</span>
                          <p className="text-[10px] font-medium text-gray-500 mt-1">Upgrade to a Paid Plan to unlock unlimited article submissions, Priority Indexing, and editorial review boosts.</p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handlePublishArticle} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <input 
                            type="text" 
                            placeholder="Headline Title (e.g. Supply Chain Logistics)"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required
                            className="sm:col-span-2 px-3 py-2.5 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                          />
                          <select 
                            value={newSector} 
                            onChange={(e) => setNewSector(e.target.value)}
                            className="px-3 py-2.5 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold focus:outline-none"
                          >
                            {SECTORS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                        </div>

                        <textarea 
                          rows={4}
                          placeholder="Draft your trade analysis. Free articles undergo standard platform editorial review before featured indexing."
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          required
                          className="w-full px-3.5 py-3 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-xl text-xs text-gray-700 dark:text-white resize-none focus:outline-none"
                        />

                        <div className="flex justify-end">
                          <button 
                            type="submit" 
                            className="px-5 py-2.5 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                          >
                            <Send className="w-3.5 h-3.5" /> Submit Column
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Published articles list */}
                  <div className="space-y-4 pt-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Article Index ({articles.length})</h4>
                    <div className="space-y-3.5">
                      {articles.map((art) => (
                        <div key={art.id} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent flex justify-between items-start gap-4">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2 text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
                              <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-white/5 rounded text-gray-500">
                                {SECTORS.find(s => s.id === art.sector)?.name || art.sector}
                              </span>
                              <span>•</span>
                              <span>{art.date}</span>
                            </div>
                            <h5 className="text-sm font-bold text-[#1E3A5F] dark:text-white leading-snug">{art.title}</h5>
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{art.content}</p>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 pt-1">
                              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {art.reads} views</span>
                              <span>•</span>
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 text-[9px] rounded font-black">
                                {art.status}
                              </span>
                            </div>
                          </div>

                          <button 
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {articles.length === 0 && (
                        <p className="text-xs text-gray-500 text-center py-6">No articles published yet.</p>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* AFFILIATE PORTAL TAB */}
              {adminTab === "affiliate" && (
                <motion.div key="affiliate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white font-display flex items-center gap-2">
                        <Award className="w-6 h-6 text-emerald-600" />
                        Affiliate & Referral Portal
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">Earning model dashboard, compliance rules, and product commission metrics.</p>
                    </div>

                    <div className="flex gap-3 shrink-0 flex-wrap">
                      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl px-4 py-2.5 text-center border border-gray-100 dark:border-transparent">
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Referrals Clicks</div>
                        <div className="text-base font-black text-[#1E3A5F] dark:text-white">48</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl px-4 py-2.5 text-center border border-gray-100 dark:border-transparent">
                        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Pending Credits</div>
                        <div className="text-base font-black text-amber-600">₹3,500</div>
                      </div>
                    </div>
                  </div>

                  {/* Referral link copier */}
                  <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Your Unique Referral Link
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly
                        value={affiliateLink}
                        className="flex-1 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 px-3.5 py-2.5 rounded-xl text-xs text-gray-500 font-mono focus:outline-none"
                      />
                      <button
                        onClick={copyAffiliate}
                        className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                          copiedAffiliate ? "bg-emerald-600 text-white" : "bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white"
                        }`}
                      >
                        {copiedAffiliate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedAffiliate ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Earning Opportunity Callout */}
                  <div className="p-5 bg-emerald-50 dark:bg-emerald-950/15 border border-emerald-500/20 rounded-2xl space-y-3">
                    <h4 className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" /> Earning Model Details
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      Earn **up to 25% product commission** from all **10 iGEN products** listed below! Accumulate platform credits to unlock paid SME plan benefits, or upgrade to a Paid plan to directly unlock cash commissions payouts.
                    </p>

                    {/* Product grid table */}
                    <div className="border border-emerald-500/10 rounded-xl overflow-hidden mt-3 bg-white dark:bg-[#122238]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="bg-emerald-500/5 text-emerald-800 dark:text-emerald-400 border-b border-emerald-500/10 font-bold">
                              <th className="p-2.5">Product Name</th>
                              <th className="p-2.5 text-right">Price</th>
                              <th className="p-2.5 text-center">Comm. %</th>
                              <th className="p-2.5 text-right">Earn Potential</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-emerald-500/5 text-gray-600 dark:text-gray-300">
                            {AFFILIATE_PRODUCTS.map((prod, i) => (
                              <tr key={i} className="hover:bg-emerald-600/5">
                                <td className="p-2 font-semibold">{prod.name}</td>
                                <td className="p-2 text-right">{prod.price}</td>
                                <td className="p-2 text-center text-emerald-600 font-bold">{prod.rate}</td>
                                <td className="p-2 text-right font-black text-emerald-600">{prod.commission}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Info */}
                  <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" /> Compliance & Referral Instructions
                    </h4>
                    <ul className="text-xs text-amber-700 dark:text-amber-500/90 space-y-2 leading-relaxed font-medium">
                      <li>1. **Explicit Disclosure**: State affiliate relationship when sharing links.</li>
                      <li>2. **No Spam Policy**: Automated drops will suspend account privileges.</li>
                      <li>3. **Quality Traffic**: Audited for organic integrity. Self-referrals prohibited.</li>
                    </ul>
                  </div>

                </motion.div>
              )}

              {/* UPGRADE TAB */}
              {adminTab === "upgrade" && (
                <motion.div key="upgrade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white">Compare Associate SME Membership Plans</h3>
                    <p className="text-xs text-gray-400 mt-1">Upgrade to unlock cash payouts, unlimited articles, and top search ranking positioning.</p>
                  </div>

                  <div className="overflow-x-auto border border-gray-100 dark:border-white/5 rounded-2xl">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                          <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Feature</th>
                          <th className="p-4 font-bold text-[#C55A11]">FREE ASSOCIATE SME</th>
                          <th className="p-4 font-bold text-[#1E3A5F] dark:text-white">PAID PLUS PLAN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        <tr>
                          <td className="p-4 font-semibold">Verification Checkmark</td>
                          <td className="p-4 text-gray-500 flex items-center gap-1.5"><ShieldX className="w-4 h-4 text-red-500" /> Self-Declared Only</td>
                          <td className="p-4 font-semibold text-emerald-600 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Badge</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Article Publishing</td>
                          <td className="p-4 text-gray-500">1 article / month</td>
                          <td className="p-4 font-semibold">Unlimited submissions</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Affiliate Commissions</td>
                          <td className="p-4 text-gray-500">Accumulate credits only</td>
                          <td className="p-4 font-semibold text-emerald-600">Full cash commission payouts</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Consulting Visibility</td>
                          <td className="p-4 text-gray-500">No consulting tag</td>
                          <td className="p-4 font-semibold">Consulting enablement tag active</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Annual Pricing</td>
                          <td className="p-4 text-gray-500 font-bold">₹0 Free</td>
                          <td className="p-4 font-bold text-[#1E3A5F] dark:text-white">₹25,000 / year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button 
                      onClick={() => window.location.href = `./associate-sme`}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#1E3A5F] to-[#2F6FA3] hover:from-[#2F6FA3] hover:to-[#1E3A5F] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                    >
                      Upgrade Associate SME Plan
                    </button>
                  </div>

                </motion.div>
              )}

              {/* SETTINGS TAB */}
              {adminTab === "settings" && (
                <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white">Dashboard Settings</h3>
                    <p className="text-xs text-gray-400 mt-1">Configure profile visibility, email alerts, security, and account status.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#1E3A5F] dark:text-white block">Profile Visibility</span>
                        <span className="text-[10px] text-gray-400 leading-normal block">Make your profile searchable in iGEN directories (Public by default).</span>
                      </div>
                      <select 
                        value={profileVisibility} 
                        onChange={(e) => setProfileVisibility(e.target.value as any)}
                        className="px-3 py-2 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-lg text-xs font-bold focus:outline-none"
                      >
                        <option value="Public">Public Profile</option>
                        <option value="Private">Private Listing</option>
                      </select>
                    </div>

                    {/* Notification Preferences */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white uppercase tracking-wider">Email Notification Preferences</h4>
                      
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailComments} 
                            onChange={(e) => setEmailComments(e.target.checked)}
                            className="rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] w-4 h-4"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Notify me about comments on my published articles</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailFollowers} 
                            onChange={(e) => setEmailFollowers(e.target.checked)}
                            className="rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] w-4 h-4"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Notify me when other members follow my profile</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailReferrals} 
                            onChange={(e) => setEmailReferrals(e.target.checked)}
                            className="rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] w-4 h-4"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Notify me about referral clicks and commission balance milestones</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailUpdates} 
                            onChange={(e) => setEmailUpdates(e.target.checked)}
                            className="rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] w-4 h-4"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Receive general platform updates and digests</span>
                        </label>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white uppercase tracking-wider">Security Preferences</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input 
                          type="password" 
                          placeholder="Current Password" 
                          value={currentPassword} 
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="px-3 py-2 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-lg text-xs"
                        />
                        <input 
                          type="password" 
                          placeholder="New Password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="px-3 py-2 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* Delete zone */}
                    <div className="p-5 bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-950/20 rounded-2xl space-y-3">
                      <h4 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4" /> Danger Zone
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-normal">
                        Deactivating your account will permanently delete your public profile and remove accumulated credits balance.
                      </p>
                      <button 
                        type="button" 
                        className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white text-[10px] font-bold rounded-lg shadow-sm transition-colors"
                      >
                        Delete Associate SME Listing
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      )}

      {/* PUBLIC PROFILE SIMULATOR VIEW (Section 3.4 Specs) */}
      {viewMode === "public" && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#122238] rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm"
        >
          {/* Header Banner */}
          <div className="h-40 bg-gradient-to-r from-[#1E3A5F] to-[#2F6FA3] dark:from-[#112238] dark:to-[#172c47] relative p-6 flex items-end">
            <span className="absolute top-4 right-4 bg-white/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border border-white/10">
              Visitor View Simulator
            </span>
          </div>

          <div className="p-6 md:p-8 relative">
            
            {/* Header info panel */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-20 md:-mt-24 pb-8 border-b border-gray-100 dark:border-white/5">
              
              {/* Profile Avatar (Circular 160x160px display) */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-[#122238] bg-gray-200 dark:bg-white/5 flex items-center justify-center overflow-hidden shadow-md shrink-0">
                {userPhoto ? (
                  <img src={userPhoto} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-14 h-14 text-gray-400" />
                )}
              </div>

              {/* Text metadata */}
              <div className="flex-1 text-center md:text-left space-y-3 pt-4 md:pt-12">
                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2.5">
                  {/* Name (32px bold display) */}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E3A5F] dark:text-white tracking-tight">
                    {profile.fullName || user.name}
                  </h2>
                  
                  {/* FREE MEMBER Badge (Orange star badge below name, hover tooltip) */}
                  <div className="flex justify-center md:justify-start pt-1 md:pt-0">
                    <span 
                      className="px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider flex items-center gap-1 cursor-help"
                      title="Free Member — This profile is self-declared and has not undergone iGEN verification."
                    >
                      <Star className="w-3 h-3 fill-white text-white" /> FREE MEMBER
                    </span>
                  </div>
                </div>

                {/* Designation / Title (Current designation - 18px grey text) */}
                <p className="text-base md:text-lg font-semibold text-gray-500 leading-normal">
                  {profile.currentDesignation || "Associate SME"}
                </p>

                {/* Tags row */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    {profile.location || "Delhi, India"}
                  </span>
                  <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-white/10 rounded-full" />
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-white/5 text-blue-700 dark:text-blue-400 font-bold rounded text-[10px]">
                    Associate SME Tag
                  </span>
                  <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-white/10 rounded-full" />
                  <span className="font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                    {profile.experienceYears || 12} Years Experience Statement
                  </span>
                </div>

                {/* Interactive buttons row */}
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  {/* Follow Button */}
                  <button 
                    onClick={() => {
                      const following = !isFollowing;
                      setIsFollowing(following);
                      setFollowerCount(prev => following ? prev + 1 : prev - 1);
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                      isFollowing 
                        ? "bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300"
                        : "bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white"
                    }`}
                  >
                    {isFollowing ? "Following" : `+ Follow ${profile.fullName || user.name}`}
                  </button>

                  {profile.linkedinUrl && (
                    <a 
                      href={profile.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center border border-gray-200 dark:border-white/5 text-[#1E3A5F] dark:text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            </div>

            {/* Main view area layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
              
              {/* Public View Tabs Content (Left / Center) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Public Tabs Switcher bar */}
                <div className="flex border-b border-gray-100 dark:border-white/5 gap-6 text-sm font-bold pb-1 bg-white dark:bg-transparent">
                  {[
                    { id: "about", label: "About Tab" },
                    { id: "articles", label: "Articles Tab" },
                    { id: "sectors", label: "Sectors Covered" }
                  ].map(tab => {
                    const active = publicTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setPublicTab(tab.id as any)}
                        className={`pb-3 relative transition-all ${active ? "text-[#1E3A5F] dark:text-[#C55A11]" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        {tab.label}
                        {active && (
                          <motion.div layoutId="pubActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A5F] dark:bg-[#C55A11]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    
                    {/* ABOUT TAB */}
                    {publicTab === "about" && (
                      <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                        
                        {/* Bio Text */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Biography</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {profile.aboutText || "No biography summary has been written yet."}
                          </p>
                        </div>

                        {/* Current Role Focus */}
                        {profile.roleFocus && (
                          <div className="p-4 bg-[#1E3A5F]/5 dark:bg-white/5 border border-[#1E3A5F]/10 dark:border-transparent rounded-2xl space-y-1">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">Current Role Focus Statement</span>
                            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">{profile.roleFocus}</p>
                          </div>
                        )}

                        {/* Career Highlights (Max 2 milestone cards) */}
                        {profile.milestones && profile.milestones.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Career Highlights & Milestones</h4>
                            <div className="grid grid-cols-1 gap-3">
                              {profile.milestones.map((milestone: string, i: number) => (
                                <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent flex gap-3">
                                  <div className="w-6 h-6 rounded-lg bg-[#C55A11]/15 text-[#C55A11] flex items-center justify-center shrink-0 font-black text-xs">
                                    {i + 1}
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{milestone}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Expertise tags */}
                        {profile.expertise && profile.expertise.length > 0 && (
                          <div className="space-y-2.5">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expertise Chips</h4>
                            <div className="flex flex-wrap gap-2">
                              {profile.expertise.map((tag: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-semibold">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      </motion.div>
                    )}

                    {/* ARTICLES TAB */}
                    {publicTab === "articles" && (
                      <motion.div key="articles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Published columns index</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {articles.map((art) => (
                            <div key={art.id} className="p-5 bg-gray-50 dark:bg-white/5 rounded-[24px] border border-gray-100 dark:border-transparent flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <span className="px-2 py-0.5 bg-[#1E3A5F]/15 dark:bg-white/5 text-[#1E3A5F] dark:text-gray-300 rounded text-[9px] font-bold uppercase tracking-wide">
                                  {SECTORS.find(s => s.id === art.sector)?.name || art.sector}
                                </span>
                                <h5 className="text-sm font-bold text-[#1E3A5F] dark:text-white leading-snug">{art.title}</h5>
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{art.content}</p>
                              </div>

                              <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-100 dark:border-white/5 pt-3">
                                <span>{art.date}</span>
                                <button className="text-xs font-bold text-[#C55A11] flex items-center gap-1.5 hover:underline">
                                  Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                          {articles.length === 0 && (
                            <p className="text-xs text-gray-500 text-center py-6">No articles published by this expert yet.</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* SECTORS TAB */}
                    {publicTab === "sectors" && (
                      <motion.div key="sectors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sectors Focus</h4>
                        
                        <div className="space-y-4">
                          {/* Primary */}
                          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                              P
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 block uppercase">Primary Authority Sector</span>
                              <span className="text-sm font-bold text-[#1E3A5F] dark:text-white">{currentSectorName}</span>
                            </div>
                          </div>

                          {/* Secondary */}
                          {profile.secondarySector && (
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent flex items-start gap-3">
                              <div className="w-7 h-7 rounded-lg bg-[#2F6FA3] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                S
                              </div>
                              <div>
                                <span className="text-[10px] text-gray-400 block uppercase">Secondary Sector Focus</span>
                                <span className="text-sm font-bold text-[#1E3A5F] dark:text-white">
                                  {SECTORS.find(sec => sec.id === profile.secondarySector)?.name || profile.secondarySector}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar Column (Right Sidebar Specs) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Experience Stats Card */}
                <div className="bg-gray-50 dark:bg-white/5 p-5 border border-gray-100 dark:border-transparent rounded-3xl space-y-3.5">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider block">Experience Stats Card</h4>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Years Experience</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">{profile.experienceYears || 12} Years</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Primary Sector</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{currentSectorName}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Article Count</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">{articles.length} Published</span>
                    </div>
                  </div>
                </div>

                {/* Related Associate SMEs */}
                <div className="bg-gray-50 dark:bg-white/5 p-5 border border-gray-100 dark:border-transparent rounded-3xl space-y-3.5">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider block">Related Associate SMEs</h4>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Priya Sharma", desc: "MSME Trade Advisor", exp: "14 yrs" },
                      { name: "Vikram Malhotra", desc: "Customs Compliance Associate", exp: "11 yrs" }
                    ].map((sme, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center font-bold text-xs shrink-0">
                          {sme.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block truncate">{sme.name}</span>
                          <span className="text-[10px] text-gray-400 block truncate">{sme.desc}</span>
                        </div>
                        <span className="text-[9px] bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded shrink-0">
                          {sme.exp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related News */}
                <div className="bg-gray-50 dark:bg-white/5 p-5 border border-gray-100 dark:border-transparent rounded-3xl space-y-3.5">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider block">Related News in Sector</h4>
                  
                  <div className="space-y-3 text-xs">
                    {[
                      "Bilateral Customs Tariffs Restructured for Trade Simplification",
                      "New PLI Incentives Approved for Domestic Manufacturing Hubs",
                      "Exporter Council Identifies Logistics Corridors for Viksit Bharat 2047"
                    ].map((title, i) => (
                      <div key={i} className="space-y-1 block hover:opacity-85 cursor-pointer">
                        <span className="text-[9px] text-[#C55A11] font-bold uppercase tracking-wider block">News Update</span>
                        <h6 className="font-bold text-gray-700 dark:text-gray-300 leading-snug line-clamp-2">{title}</h6>
                        <span className="text-[9px] text-gray-400 block">2 hours ago</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}

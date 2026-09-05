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
  User, Shield, ShieldX, HelpCircle, ChevronRight, Info
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import FreeSMEDashboard from "./FreeSMEDashboard";
import AssociateSMEProDashboard from "@/components/profile/sme/pro/AssociateSMEProDashboard";
import SMEEliteDashboard from "@/components/profile/sme/elite/SMEEliteDashboard";
import SMESovereignDashboard from "@/components/profile/sme/sovereign/SMESovereignDashboard";

// ─── Tier Router ───────────────────────────────────────────
// Wraps the legacy free dashboard and routes to the correct
// tier dashboard based on the user's smePlan field.
function SMETierRouter() {
  const { user } = useAuth();
  const smePlan = (user as any)?.smePlan || "free";

  if (smePlan === "sovereign") return <SMESovereignDashboard />;
  if (smePlan === "elite")     return <SMEEliteDashboard />;
  if (smePlan === "pro")       return <AssociateSMEProDashboard />;
  // "free" or any unrecognised plan → new minimal free dashboard
  if (smePlan === "free")      return <FreeSMEDashboard />;

  // Fallback: render the legacy full dashboard (original behaviour)
  return <SmeDashboardLegacy />;
}
// Re-export the router as the default so existing imports work unchanged
export default SMETierRouter;
// ────────────────────────────────────────────────────────────

interface Article {
  id: string;
  title: string;
  content: string;
  sector: string;
  date: string;
  status: "Published" | "Draft" | "Under Review";
  reads: number;
}

export function SmeDashboardLegacy() {
  const { user, updateOnboarding } = useAuth();
  
  // View mode switcher: "private" (Admin) or "public" (Visitor View)
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  
  // Admin Tabs: "overview", "edit", "articles", "consulting", "upgrade", "settings"
  const [adminTab, setAdminTab] = useState<"overview" | "edit" | "articles" | "consulting" | "upgrade" | "settings">("overview");

  // Public View Tabs: "about", "articles", "sectors"
  const [publicTab, setPublicTab] = useState<"about" | "articles" | "sectors">("about");

  // Clipboard / Copy State
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Profile data shorthand (from onboardingForm)
  const profile = user?.onboardingForm || {};

  // Follower State simulation
  const [followerCount, setFollowerCount] = useState(142);
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
  const [editExperience, setEditExperience] = useState<number>(profile.experienceYears || 20);
  const [editPrimarySector, setEditPrimarySector] = useState(profile.sector || "manufacturing");
  const [editSecondarySectors, setEditSecondarySectors] = useState<string[]>(profile.secondarySectors || []);
  const [editBio, setEditBio] = useState(profile.aboutText || "");
  const [editMilestones, setEditMilestones] = useState<string[]>(profile.milestones || ["", "", ""]);
  const [editPhilosophy, setEditPhilosophy] = useState(profile.philosophy || "");
  const [editRecognition, setEditRecognition] = useState(profile.recognition || "");
  const [editRoleTypes, setEditRoleTypes] = useState<string[]>(profile.roleTypes || ["Consultant"]);
  const [editFollowSectors, setEditFollowSectors] = useState<string[]>(profile.followSectors || []);
  const [editCountriesInterest, setEditCountriesInterest] = useState<string[]>(profile.countriesInterest || ["India"]);
  const [editPhoto, setEditPhoto] = useState(profile.profilePic || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Settings States ---
  const [profileVisibility, setProfileVisibility] = useState<"Public" | "Private">("Public");
  const [showConsultingTag, setShowConsultingTag] = useState(true);
  const [emailComments, setEmailComments] = useState(true);
  const [emailFollowers, setEmailFollowers] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);

  // --- Contact Form (Public View) ---
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Load articles from localStorage or default
  useEffect(() => {
    if (user) {
      const storageKey = `ign_articles_${user.email}`;
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        setArticles(JSON.parse(cached));
      } else {
        // Initial mock articles
        const initialArticles: Article[] = [
          {
            id: "art-1",
            title: `Navigating Tariff Adjustments in the ${SECTORS.find(s => s.id === (profile.sector || "manufacturing"))?.name || "Manufacturing"} Sector`,
            content: "The global trading landscape is currently undergoing major re-alignments. As supply chains diversify away from highly concentrated areas, key regulatory policies and custom tariffs are shifting. Subject Matter Experts highlight the necessity for agile trade compliance frameworks to mitigate financial friction...",
            sector: profile.sector || "manufacturing",
            date: "May 24, 2026",
            status: "Published",
            reads: 342
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
      localStorage.setItem(`ign_articles_${user.email}`, JSON.stringify(updatedList));
    }
  };

  if (!user) return null;

  const username = user.email.split("@")[0];
  const publicUrl = `www.indiaglobalnews.com/sme/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Word count checker
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Calculate completeness percentage
  const calculateCompleteness = () => {
    let score = 0;
    if (profile.fullName || user.name) score += 10;
    if (profile.profilePic || editPhoto) score += 15;
    if (profile.currentDesignation) score += 10;
    if (profile.location) score += 10;
    if (profile.aboutText) score += 20;
    if (profile.milestones && profile.milestones.length > 0) score += 15;
    if (profile.sector) score += 10;
    if (profile.linkedinUrl) score += 10;
    return score;
  };

  const profileCompleteness = calculateCompleteness();

  // --- Article Publisher Submit ---
  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    setArticleFeedback(null);

    // Limit check for Free tier (max 2 articles per month)
    const publishedCount = articles.filter(a => a.status === "Published").length;
    if (publishedCount >= 2) {
      setArticleFeedback("Monthly publishing limit of 2 articles reached for the Free Plan. Please upgrade to write unlimited articles.");
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

  // Delete article simulation
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
    if (editExperience < 20) {
      setArticleFeedback("SME Pages require a minimum of 20 years of industry experience. Profile updates must maintain this threshold.");
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
      secondarySectors: editSecondarySectors,
      aboutText: editBio,
      milestones: editMilestones.filter(m => m.trim() !== ""),
      philosophy: editPhilosophy,
      recognition: editRecognition,
      roleTypes: editRoleTypes,
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

  // Toggle secondary sectors in edit profile
  const handleToggleEditSecondarySector = (sectorId: string) => {
    if (editSecondarySectors.includes(sectorId)) {
      setEditSecondarySectors(prev => prev.filter(id => id !== sectorId));
    } else {
      if (editSecondarySectors.length >= 2) {
        setArticleFeedback("You can select up to 2 secondary sectors.");
        return;
      }
      setEditSecondarySectors(prev => [...prev, sectorId]);
    }
  };

  // Toggle follow sectors in edit profile
  const handleToggleEditFollowSector = (sectorId: string) => {
    if (editFollowSectors.includes(sectorId)) {
      setEditFollowSectors(prev => prev.filter(id => id !== sectorId));
    } else {
      setEditFollowSectors(prev => [...prev, sectorId]);
    }
  };

  // Contact form submission simulation
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactSubject.trim() || !contactMessage.trim()) return;
    setContactSuccess(true);
    setContactSubject("");
    setContactMessage("");
    setTimeout(() => setContactSuccess(false), 4000);
  };

  // Shared variables
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
            <h2 className="text-sm font-bold text-[#1D1D46] dark:text-white leading-tight flex items-center gap-1.5">
              <span>Free SME Profile</span>
              <span className="px-2 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider">
                Unverified
              </span>
            </h2>
          </div>
        </div>

        {/* Mode Toggle Button */}
        <div className="bg-[#f4f7fb] dark:bg-white/5 p-1 rounded-2xl flex items-center shrink-0 border border-gray-200/50 dark:border-transparent">
          <button
            onClick={() => setViewMode("private")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "private"
                ? "bg-[#1D1D46] text-white shadow-md dark:bg-[#C55A11]"
                : "text-gray-500 hover:text-[#1D1D46] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Private Dashboard
          </button>
          <button
            onClick={() => setViewMode("public")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              viewMode === "public"
                ? "bg-[#1D1D46] text-white shadow-md dark:bg-[#C55A11]"
                : "text-gray-500 hover:text-[#1D1D46] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Public View
          </button>
        </div>
      </div>

      {/* Notification Toast Feedback */}
      {articleFeedback && (
        <div className="mb-6 p-4 bg-[#1D1D46] text-white text-xs rounded-2xl flex items-center gap-2 font-medium shadow-md">
          <Info className="w-4 h-4 text-[#F0652E] shrink-0" />
          <span>{articleFeedback}</span>
        </div>
      )}

      {/* PRIVATE ADMIN VIEW */}
      {viewMode === "private" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Navigation Left Column (or tabs) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Header Profile Card (Section 2.3 Profile Header card spec) */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 relative overflow-hidden">
              
              {/* FREE MEMBER Badge (Top-right of card, orange, star icon) */}
              <button 
                onClick={() => {
                  setAdminTab("upgrade");
                }}
                className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 bg-[#C55A11] hover:bg-[#a0460a] text-white text-[9px] font-black rounded uppercase tracking-wider shadow transition-colors"
                title="Free Member — Click to Upgrade"
              >
                <Star className="w-2.5 h-2.5 fill-white text-white" /> FREE MEMBER
              </button>

              <div className="flex flex-col items-center pt-2 text-center space-y-3">
                {/* Profile Pic Circular 80x80px */}
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
                  {/* Full Name & Designation */}
                  <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white leading-snug">
                    {(!profile.fullName && (!user.name || user.name === "SME Pro User" || user.name === "Your Name" || user.name.toLowerCase().includes("user")))
                      ? "Dr. Vikram Malhotra"
                      : (profile.fullName || user.name)}
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold max-w-[200px] mx-auto line-clamp-1">
                    {profile.currentDesignation || "Subject Matter Expert"}
                  </p>
                  
                  {/* Profile Status Chip: 'Free & Unverified' orange outline below name */}
                  <div className="pt-1">
                    <span className="px-2 py-0.5 border border-[#C55A11] text-[#C55A11] text-[9px] font-bold rounded-full inline-block uppercase tracking-wider">
                      Free & Unverified
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-white/5 w-full my-4" />

              <div className="space-y-2.5 text-xs text-gray-500">
                {/* Primary Sector Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 uppercase">Sector</span>
                  <span className="px-2 py-0.5 bg-[#1D1D46]/10 dark:bg-white/5 text-[#1D1D46] dark:text-white font-bold rounded text-[10px]">
                    {currentSectorName}
                  </span>
                </div>

                {/* Experience Display */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 uppercase">Experience</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {profile.experienceYears || 20} Years Exp
                  </span>
                </div>

                {/* Public profile URL link copier widget */}
                <div className="pt-2">
                  <span className="text-[9px] font-bold text-gray-400 block mb-1 uppercase">Public Profile Link</span>
                  <div className="flex gap-1.5 items-center bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-transparent">
                    <span className="text-[10px] font-mono truncate flex-1 text-gray-400">{publicUrl}</span>
                    <button 
                      onClick={copyToClipboard}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors text-gray-500"
                      title="Copy Public Link"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs List */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-3 border border-gray-100 dark:border-white/5 shadow-sm space-y-1">
              {[
                { id: "overview", label: "Overview Tab", icon: BarChart3 },
                { id: "edit", label: "Edit Profile Tab", icon: Edit },
                { id: "articles", label: "My Articles Tab", icon: FileText },
                { id: "consulting", label: "Consulting Tab", icon: Calendar },
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
                        ? "bg-[#1D1D46]/10 text-[#1D1D46] dark:bg-[#C55A11]/10 dark:text-[#C55A11]"
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
                    <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">Profile Overview</h3>
                    <p className="text-xs text-gray-400 mt-1">Summary of your self-declared credentials and article visibility stats.</p>
                  </div>

                  {/* Completeness Card */}
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
                          <span className="absolute text-[10px] font-bold text-[#1D1D46] dark:text-white">{profileCompleteness}%</span>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">Profile Index</span>
                          <span className="text-[10px] text-gray-400 block">{profileCompleteness === 100 ? "Ready for search mapping" : "Provide bio/photo to optimize search"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Article count */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Published Columns</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#1D1D46] dark:text-white">{articles.length}</span>
                        <span className="text-xs text-gray-400">/ 2 monthly limit</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${(articles.length / 2) * 100}%` }} />
                      </div>
                    </div>

                    {/* Consulting inquiries */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent space-y-2 relative overflow-hidden">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Consulting Leads</span>
                        <Lock className="w-3.5 h-3.5 text-orange-500" />
                      </div>
                      <div className="blur-[1.5px] select-none pointer-events-none">
                        <span className="text-2xl font-black text-gray-300 block">5 Active</span>
                        <span className="text-[9px] text-gray-400 block">Locked Booking Rates</span>
                      </div>
                      <button 
                        onClick={() => setAdminTab("upgrade")}
                        className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors flex items-center justify-center"
                      >
                        <span className="px-2.5 py-1 bg-[#1D1D46] text-white text-[9px] font-bold rounded-lg shadow uppercase tracking-wide">
                          Unlock paid bookings
                        </span>
                      </button>
                    </div>

                  </div>

                  {/* Sectors followed detail */}
                  <div className="p-5 bg-[#1D1D46]/5 dark:bg-white/5 rounded-2xl border border-[#1D1D46]/10 dark:border-transparent space-y-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Sectors Followed in Feed</span>
                    <div className="flex flex-wrap gap-2">
                      {profile.followSectors && profile.followSectors.map((sectorId: string) => {
                        const sName = SECTORS.find(s => s.id === sectorId)?.name || sectorId;
                        return (
                          <span key={sectorId} className="px-2.5 py-1 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 text-[#1D1D46] dark:text-gray-300 rounded-lg text-xs font-semibold">
                            {sName}
                          </span>
                        );
                      })}
                      {(!profile.followSectors || profile.followSectors.length === 0) && (
                        <span className="text-xs text-gray-400">No sectors followed yet.</span>
                      )}
                    </div>
                  </div>

                  {/* Quick stats grid */}
                  <div className="border-t border-gray-100 dark:border-white/5 pt-6 space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Self-Declared Directory Coordinates</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-gray-400 block uppercase">Listed Location</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300">{profile.location || "Mumbai, India"}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-gray-400 block uppercase">LinkedIn Status</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-300 truncate max-w-[200px] block">
                            {profile.linkedinUrl ? "LinkedIn Linked (Unverified)" : "LinkedIn Not Provided"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* EDIT PROFILE TAB */}
              {adminTab === "edit" && (
                <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">Edit Profile Details</h3>
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
                          className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Current Designation / Title</label>
                        <input 
                          type="text" 
                          value={editDesignation}
                          onChange={(e) => setEditDesignation(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
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
                          className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">LinkedIn Profile URL</label>
                        <input 
                          type="url" 
                          value={editLinkedin}
                          onChange={(e) => setEditLinkedin(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
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
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Secondary Sectors (Select up to 2)</label>
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 border border-gray-100 dark:border-white/5 rounded-xl bg-[#f4f7fb] dark:bg-white/5">
                          {SECTORS.filter(s => s.id !== editPrimarySector).map(s => {
                            const active = editSecondarySectors.includes(s.id);
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => handleToggleEditSecondarySector(s.id)}
                                className={`px-2 py-1 text-[9px] font-bold rounded ${active ? "bg-[#1D1D46] text-white" : "bg-white dark:bg-[#122238] text-gray-400 border border-gray-200 dark:border-white/5"}`}
                              >
                                {s.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Biography Summary (Max 500 words)</label>
                        <span className="text-[9px] font-bold text-gray-400">{getWordCount(editBio)} / 500 words</span>
                      </div>
                      <textarea 
                        rows={4}
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46] resize-none"
                      />
                    </div>

                    {/* Milestones */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Career Highlights (Milestone Statements, max 100 words each)</label>
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
                            placeholder="Milestone statement"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Save Button */}
                    <div className="pt-4 flex justify-end">
                      <button 
                        type="button" 
                        onClick={handleSaveProfile}
                        className="px-6 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
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
                      <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">My Published Articles</h3>
                      <p className="text-xs text-gray-400 mt-1">Publish columns to the global feed. Limit: 2 articles/month.</p>
                    </div>
                    
                    <span className="px-3 py-1.5 bg-[#C55A11]/15 text-[#C55A11] text-[10px] font-black rounded-lg uppercase tracking-wider">
                      {articles.filter(a => a.status === "Published").length} / 2 Articles Published This Month
                    </span>
                  </div>

                  {/* Write New Article Block */}
                  <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" /> Write New Article
                    </h4>

                    {articles.filter(a => a.status === "Published").length >= 2 ? (
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-400 text-xs rounded-xl flex items-start gap-2.5 font-semibold">
                        <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span>Monthly publishing limit of 2 articles reached for the Free Plan.</span>
                          <p className="text-[10px] font-medium text-gray-500 mt-1">Upgrade to a Paid Plan to unlock unlimited article submissions, Priority Indexing, and editorial review boosts.</p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handlePublishArticle} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <input 
                            type="text" 
                            placeholder="Headline Title (e.g. Export Growth Strategy)"
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
                          placeholder="Draft your bilateral trade opinion analysis. Free articles undergo standard platform editorial review before featured indexing."
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          required
                          className="w-full px-3.5 py-3 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-xl text-xs text-gray-700 dark:text-white resize-none focus:outline-none"
                        />

                        <div className="flex justify-end">
                          <button 
                            type="submit" 
                            className="px-5 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
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
                            <h5 className="text-sm font-bold text-[#1D1D46] dark:text-white leading-snug">{art.title}</h5>
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

              {/* CONSULTING TAB */}
              {adminTab === "consulting" && (
                <motion.div key="consulting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">Consulting Inquiries</h3>
                    <p className="text-xs text-gray-400 mt-1">Configure your booking parameters and review consulting inquiries.</p>
                  </div>

                  {/* Availability toggle */}
                  <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#1D1D46] dark:text-white block">Consulting Availability Status</span>
                        <span className="text-[10px] text-gray-400 leading-normal block">Displays a 'Consulting Available' tag on your public profile if active.</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          const val = !showConsultingTag;
                          setShowConsultingTag(val);
                        }}
                        className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${showConsultingTag ? "bg-emerald-600" : "bg-gray-200 dark:bg-white/10"}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${showConsultingTag ? "translate-x-7" : "translate-x-1"}`} />
                      </button>
                    </div>
                  </div>

                  {/* Locked rates / booking CTA */}
                  <div className="bg-gradient-to-br from-[#1D1D46]/5 to-[#0642BA]/10 border border-[#1D1D46]/15 dark:border-white/5 rounded-3xl p-6 text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/20 text-[#C55A11] flex items-center justify-center mx-auto shadow-inner">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-[#1D1D46] dark:text-white font-display">Unlock Direct Calendars & Consulting Earnings</h4>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
                        Under the free plan, visitors can send you messages, but cannot book scheduled hourly consultations. 
                        Upgrading to a paid SME plan unlocks rate configurations, calendar synchronization, and automated invoice routing.
                      </p>
                    </div>

                    <button 
                      onClick={() => setAdminTab("upgrade")}
                      className="px-6 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                    >
                      Unlock Consulting Booking with Paid Plan
                    </button>
                  </div>

                </motion.div>
              )}

              {/* UPGRADE TAB */}
              {adminTab === "upgrade" && (
                <motion.div key="upgrade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">Compare SME Membership Plans</h3>
                    <p className="text-xs text-gray-400 mt-1">Upgrade your authority listing to unlock featured directories, unlimited columns, and client bookings.</p>
                  </div>

                  {/* Side-by-Side Plan Comparison Table */}
                  <div className="overflow-x-auto border border-gray-100 dark:border-white/5 rounded-2xl">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                          <th className="p-4 font-bold text-gray-600 dark:text-gray-300">Feature</th>
                          <th className="p-4 font-bold text-[#C55A11]">FREE SME PLAN</th>
                          <th className="p-4 font-bold text-[#1D1D46] dark:text-white">PAID PRO PLAN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        <tr>
                          <td className="p-4 font-semibold">Verification Checkmark</td>
                          <td className="p-4 text-gray-500 flex items-center gap-1.5"><ShieldX className="w-4 h-4 text-red-500" /> Self-Declared Only</td>
                          <td className="p-4 font-semibold text-emerald-600 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Blue Tick</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Article Publishing</td>
                          <td className="p-4 text-gray-500">Up to 2 articles / month</td>
                          <td className="p-4 font-semibold">Unlimited submissions</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Search Ranking Index</td>
                          <td className="p-4 text-gray-500">Standard / Non-priority</td>
                          <td className="p-4 font-semibold text-[#1D1D46] dark:text-white">Priority indexing boost</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Consulting Calendars</td>
                          <td className="p-4 text-gray-500">None (General inquiry tag)</td>
                          <td className="p-4 font-semibold text-emerald-600">Hourly rate bookings enabled</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Community Circle</td>
                          <td className="p-4 text-gray-500">FPC Community</td>
                          <td className="p-4 font-semibold">Founding Leaders Community (FLC)</td>
                        </tr>
                        <tr>
                          <td className="p-4 font-semibold">Annual Pricing</td>
                          <td className="p-4 text-gray-500 font-bold">₹0 Free</td>
                          <td className="p-4 font-bold text-[#1D1D46] dark:text-white">₹49,000 / year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button 
                      onClick={() => window.location.href = `./sme`}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#1D1D46] to-[#0642BA] hover:from-[#0642BA] hover:to-[#1D1D46] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                    >
                      Upgrade SME Plan Now
                    </button>
                  </div>

                </motion.div>
              )}

              {/* SETTINGS TAB */}
              {adminTab === "settings" && (
                <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">Dashboard Settings</h3>
                    <p className="text-xs text-gray-400 mt-1">Configure profile visibility, email alerts, security, and account status.</p>
                  </div>

                  <div className="space-y-6">
                    
                    {/* Profile Visibility */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#1D1D46] dark:text-white block">Profile Visibility</span>
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
                      <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white uppercase tracking-wider">Email Notification Preferences</h4>
                      
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailComments} 
                            onChange={(e) => setEmailComments(e.target.checked)}
                            className="rounded border-gray-300 text-[#1D1D46] focus:ring-[#1D1D46] w-4 h-4"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Notify me about comments on my published articles</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailFollowers} 
                            onChange={(e) => setEmailFollowers(e.target.checked)}
                            className="rounded border-gray-300 text-[#1D1D46] focus:ring-[#1D1D46] w-4 h-4"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Notify me when other members follow my profile</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={emailUpdates} 
                            onChange={(e) => setEmailUpdates(e.target.checked)}
                            className="rounded border-gray-300 text-[#1D1D46] focus:ring-[#1D1D46] w-4 h-4"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">Receive general platform updates and digest digests</span>
                        </label>
                      </div>
                    </div>

                    {/* Password & Security */}
                    <div className="p-5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-transparent rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white uppercase tracking-wider">Security Preferences</h4>
                      
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

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Multi-Factor Authentication (MFA)</span>
                        <button 
                          onClick={() => setMfaEnabled(!mfaEnabled)}
                          className={`px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:text-white text-[10px] font-bold rounded-lg ${mfaEnabled ? "bg-emerald-100 dark:bg-emerald-950/20 text-emerald-700" : ""}`}
                        >
                          {mfaEnabled ? "MFA Active" : "Set Up MFA"}
                        </button>
                      </div>
                    </div>

                    {/* Account Management */}
                    <div className="p-5 bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-950/20 rounded-2xl space-y-3">
                      <h4 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4" /> Danger Zone
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Suspending or deleting your account will permanently deactivate your self-declared SME profile URL and remove your published columns index.
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-2">
                        <button 
                          type="button" 
                          className="px-3.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-700 dark:border-red-900/30 dark:hover:bg-red-950/20 text-[10px] font-bold rounded-lg transition-colors"
                        >
                          Suspend Profile Listing
                        </button>
                        <button 
                          type="button" 
                          className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white text-[10px] font-bold rounded-lg shadow-sm transition-colors"
                        >
                          Delete Account Permanent
                        </button>
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      )}

      {/* PUBLIC PROFILE SIMULATOR VIEW (Section 2.4 Specs) */}
      {viewMode === "public" && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#122238] rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm"
        >
          {/* Header Banner Background */}
          <div className="h-40 bg-gradient-to-r from-[#1D1D46] to-[#0642BA] dark:from-[#112238] dark:to-[#172c47] relative p-6 flex items-end">
            <span className="absolute top-4 right-4 bg-white/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border border-white/10">
              Visitor View Simulator
            </span>
          </div>

          <div className="p-6 md:p-8 relative">
            
            {/* Header info panel */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-20 md:-mt-24 pb-8 border-b border-gray-100 dark:border-white/5">
              
              {/* Profile Avatar (Circular 180x180px display) */}
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white dark:border-[#122238] bg-gray-200 dark:bg-white/5 flex items-center justify-center overflow-hidden shadow-md shrink-0">
                {userPhoto ? (
                  <img src={userPhoto} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>

              {/* Text metadata */}
              <div className="flex-1 text-center md:text-left space-y-3 pt-4 md:pt-12">
                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2.5">
                  {/* Name (36px bold display) */}
                  <h2 className="text-3xl font-extrabold text-[#1D1D46] dark:text-white tracking-tight">
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

                {/* Designation / Title: Current designation (20px, grey text) */}
                <p className="text-lg md:text-xl font-semibold text-gray-500 leading-normal">
                  {profile.currentDesignation || "Subject Matter Expert"}
                </p>

                {/* Tags row */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    {profile.location || "Delhi, India"}
                  </span>
                  <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-white/10 rounded-full" />
                  <span className="flex items-center gap-1 text-[#1D1D46] dark:text-white font-bold">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    {currentSectorName} (Primary)
                  </span>
                  <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-white/10 rounded-full" />
                  <span className="font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                    {profile.experienceYears || 22}+ Years Exp
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
                        : "bg-[#1D1D46] hover:bg-[#0642BA] text-white"
                    }`}
                  >
                    {isFollowing ? "Following" : `+ Follow ${profile.fullName || user.name}`}
                  </button>

                  {/* Consulting availability indicator tag */}
                  {showConsultingTag && (
                    <span 
                      className="px-3 py-2 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 text-xs font-extrabold rounded-xl border border-emerald-100 dark:border-transparent cursor-pointer flex items-center gap-1"
                      title="Contact via Platform Message (Direct Booking requires Paid SME plan)"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Available for Consulting
                    </span>
                  )}

                  {/* LinkedIn link icon */}
                  {profile.linkedinUrl && (
                    <a 
                      href={profile.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center border border-gray-200 dark:border-white/5 text-[#1D1D46] dark:text-white transition-colors"
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
                        className={`pb-3 relative transition-all ${active ? "text-[#1D1D46] dark:text-[#C55A11]" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        {tab.label}
                        {active && (
                          <motion.div layoutId="pubActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D1D46] dark:bg-[#C55A11]" />
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
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expert Biography</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {profile.aboutText || "No biography summary has been written yet."}
                          </p>
                        </div>

                        {/* Career Highlights milestone cards */}
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

                        {/* Recognition details */}
                        {profile.recognition && (
                          <div className="space-y-2.5">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Industry Recognition & Awards</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                              {profile.recognition}
                            </p>
                          </div>
                        )}

                        {/* Philosophy Quote */}
                        {profile.philosophy && (
                          <div className="border-l-4 border-[#C55A11] pl-4 py-1.5 italic text-gray-500 dark:text-gray-400 text-xs">
                            "{profile.philosophy}"
                          </div>
                        )}

                        {/* Expertise Tag Chips */}
                        {profile.expertise && profile.expertise.length > 0 && (
                          <div className="space-y-2.5">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Areas of Expertise</h4>
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
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Published trade insights by {profile.fullName || user.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {articles.map((art) => (
                            <div key={art.id} className="p-5 bg-gray-50 dark:bg-white/5 rounded-[24px] border border-gray-100 dark:border-transparent flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <span className="px-2 py-0.5 bg-[#1D1D46]/15 dark:bg-white/5 text-[#1D1D46] dark:text-gray-300 rounded text-[9px] font-bold uppercase tracking-wide">
                                  {SECTORS.find(s => s.id === art.sector)?.name || art.sector}
                                </span>
                                <h5 className="text-sm font-bold text-[#1D1D46] dark:text-white leading-snug">{art.title}</h5>
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
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Primary and Secondary Sector Focus</h4>
                        
                        <div className="space-y-4">
                          {/* Primary */}
                          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-[#1D1D46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                              P
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 block uppercase">Primary Authority Sector</span>
                              <span className="text-sm font-bold text-[#1D1D46] dark:text-white">{currentSectorName}</span>
                              <p className="text-xs text-gray-500 mt-1">This expert is mapped as a priority consultant and contributor for bilateral trade developments in the {currentSectorName} sector.</p>
                            </div>
                          </div>

                          {/* Secondary */}
                          {profile.secondarySectors && profile.secondarySectors.length > 0 && (
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent flex items-start gap-3">
                              <div className="w-7 h-7 rounded-lg bg-[#0642BA] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                S
                              </div>
                              <div className="space-y-2">
                                <span className="text-[10px] text-gray-400 block uppercase">Secondary Sector Scope</span>
                                <div className="flex flex-wrap gap-2">
                                  {profile.secondarySectors.map((sectorId: string) => {
                                    const s = SECTORS.find(sec => sec.id === sectorId);
                                    return (
                                      <span key={sectorId} className="px-2.5 py-1 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        {s?.name || sectorId}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar Columns (Right Sidebar Spec) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Experience Stats Card */}
                <div className="bg-gray-50 dark:bg-white/5 p-5 border border-gray-100 dark:border-transparent rounded-3xl space-y-3">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider block">Authority Metrics</h4>
                  
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Total Experience</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">{profile.experienceYears || 20} Years</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Primary Domain</span>
                      <span className="font-bold text-[#1D1D46] dark:text-gray-300 truncate max-w-[150px]">{currentSectorName}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Followers</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">{followerCount} Members</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Published Insights</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">{articles.length} Columns</span>
                    </div>
                  </div>
                </div>

                {/* Related SMEs: Other SMEs in [Sector] */}
                <div className="bg-gray-50 dark:bg-white/5 p-5 border border-gray-100 dark:border-transparent rounded-3xl space-y-3.5">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider block">Other SMEs in {currentSectorName}</h4>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Dr. Arvinder Singh", desc: "Senior Logistics Strategist", exp: "26 yrs" },
                      { name: "Rajesh K. Mehta", desc: "Bilateral Trade Compliance Specialist", exp: "21 yrs" },
                      { name: "Srinivas Rao", desc: "MSME Development Advisor", exp: "24 yrs" }
                    ].map((sme, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-[#1D1D46]/10 text-[#1D1D46] flex items-center justify-center font-bold text-xs shrink-0">
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

                {/* Related news tagged to this SME's primary sector */}
                <div className="bg-gray-50 dark:bg-white/5 p-5 border border-gray-100 dark:border-transparent rounded-3xl space-y-3.5">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider block">Sector Trade News</h4>
                  
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

                {/* Contact SME Platform Message Form */}
                <div className="bg-gray-50 dark:bg-white/5 p-5 border border-gray-100 dark:border-transparent rounded-3xl space-y-3.5">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider block">Contact SME</h4>
                  
                  {contactSuccess ? (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Message sent successfully!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                      <p className="text-[10px] text-gray-400 leading-normal">
                        Logged-in members can send direct message inquiries to this expert.
                      </p>
                      
                      <input 
                        type="text" 
                        placeholder="Subject / Consultation Topic" 
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-xl focus:outline-none"
                      />

                      <textarea 
                        rows={3} 
                        placeholder="Write your trade inquiry message..." 
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/5 rounded-xl resize-none focus:outline-none"
                      />

                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Send Platform Message
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}

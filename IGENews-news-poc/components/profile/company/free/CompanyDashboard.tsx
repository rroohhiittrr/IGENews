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
  User, Shield, ShieldX, HelpCircle, ChevronRight, Info, Upload, Building2, Users
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

// Location Options for editing
const COUNTRIES = ["India", "United States", "United Kingdom", "United Arab Emirates", "Singapore", "Germany", "Japan", "Australia"];
const STATES: Record<string, string[]> = {
  "India": ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "Uttar Pradesh", "Haryana"],
  "United States": ["California", "New York", "Texas", "Florida", "Illinois"],
  "United Kingdom": ["England", "Scotland", "Wales"],
  "United Arab Emirates": ["Abu Dhabi", "Dubai", "Sharjah"],
  "Singapore": ["Central Region", "East Region", "North Region"],
  "Germany": ["Bavaria", "Berlin", "Hamburg", "Hesse"],
  "Japan": ["Tokyo", "Osaka", "Kyoto"],
  "Australia": ["New South Wales", "Victoria", "Queensland"]
};
const CITIES: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane"],
  "Delhi": ["New Delhi", "Noida", "Gurugram"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
  "Haryana": ["Gurugram", "Faridabad"],
  "California": ["San Francisco", "Los Angeles", "San Diego", "San Jose"],
  "New York": ["New York City", "Buffalo", "Albany"],
  "Texas": ["Austin", "Houston", "Dallas"],
  "Florida": ["Miami", "Orlando", "Tampa"],
  "England": ["London", "Manchester", "Birmingham"],
  "Dubai": ["Dubai City", "Deira", "Jumeirah"]
};

const REGIONS = ["South Asia", "Southeast Asia", "East Asia", "Middle East", "Europe", "North America", "South America", "Africa", "Australia & Oceania"];

export default function CompanyDashboard() {
  const { user, updateOnboarding } = useAuth();
  
  // Tab control states
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [adminTab, setAdminTab] = useState<"overview" | "edit" | "leaders" | "pr" | "analytics" | "upgrade" | "settings">("overview");
  const [publicTab, setPublicTab] = useState<"about" | "leaders" | "news" | "sectors">("about");

  // Clipboard copying feedback
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedUpgradeCode, setCopiedUpgradeCode] = useState(false);

  // Form profile reference from state
  const profile = user?.onboardingForm || {};

  // Form edit states (initialized from profile)
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editCompanyType, setEditCompanyType] = useState("Startup");
  const [editIncorporationYear, setEditIncorporationYear] = useState("");
  const [editCountry, setEditCountry] = useState("India");
  const [editState, setEditState] = useState("Maharashtra");
  const [editCity, setEditCity] = useState("Mumbai");
  const [editWebsiteUrl, setEditWebsiteUrl] = useState("");
  const [editCompanyEmail, setEditCompanyEmail] = useState("");
  const [editCompanyPhone, setEditCompanyPhone] = useState("");
  
  const [editPrimarySector, setEditPrimarySector] = useState("manufacturing");
  const [editSecondarySectors, setEditSecondarySectors] = useState<string[]>([]);
  const [tempSecondary, setTempSecondary] = useState("");
  const [editCompanyDesc, setEditCompanyDesc] = useState("");
  const [editKeyProducts, setEditKeyProducts] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState("");
  const [editMarketsServed, setEditMarketsServed] = useState<string[]>([]);
  const [editMarketRegions, setEditMarketRegions] = useState<string[]>([]);
  const [editBusinessType, setEditBusinessType] = useState("Manufacturer");

  const [editLogoBase64, setEditLogoBase64] = useState("");
  const [editCoverBase64, setEditCoverBase64] = useState("");
  const [editTagline, setEditTagline] = useState("");
  const [editLinkedinUrl, setEditLinkedinUrl] = useState("");
  const [editTwitterUrl, setEditTwitterUrl] = useState("");
  const [editInstagramUrl, setEditInstagramUrl] = useState("");

  const [editLeaderEmails, setEditLeaderEmails] = useState<string[]>([]);
  const [newLeaderEmail, setNewLeaderEmail] = useState("");
  const [editSignatoryName, setEditSignatoryName] = useState("");
  const [editSignatoryRole, setEditSignatoryRole] = useState("");
  
  const [validationError, setValidationError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState(false);

  // Simulated OTP Transfer states
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferStep, setTransferStep] = useState(1); // 1 = Input, 2 = OTP, 3 = Success
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminDesignation, setNewAdminDesignation] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [transferError, setTransferError] = useState<string | null>(null);

  // Settings states
  const [visibility, setVisibility] = useState<"Public" | "Private">("Public");
  const [notifMilestones, setNotifMilestones] = useState(true);
  const [notifLeaderAccepted, setNotifLeaderAccepted] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Follower simulator
  const [followerCount, setFollowerCount] = useState(27);
  const [isFollowing, setIsFollowing] = useState(false);

  // Image references for dashboard editing
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Pre-populate fields on mount/user update
  useEffect(() => {
    if (user && user.onboardingForm) {
      const f = user.onboardingForm;
      setEditCompanyName(f.companyName || "");
      setEditCompanyType(f.companyType || "Startup");
      setEditIncorporationYear(f.incorporationYear || "");
      setEditCountry(f.country || "India");
      setEditState(f.state || "Maharashtra");
      setEditCity(f.city || "Mumbai");
      setEditWebsiteUrl(f.websiteUrl || "");
      setEditCompanyEmail(f.companyEmail || "");
      setEditCompanyPhone(f.companyPhone || "");
      setEditPrimarySector(f.sector || "manufacturing");
      setEditSecondarySectors(f.secondarySectors || []);
      setEditCompanyDesc(f.companyDesc || "");
      setEditKeyProducts(f.keyProducts || []);
      setEditMarketsServed(f.marketsServed || ["Domestic"]);
      setEditMarketRegions(f.marketRegions || []);
      setEditBusinessType(f.businessType || "Manufacturer");
      setEditLogoBase64(f.logoBase64 || "");
      setEditCoverBase64(f.coverBase64 || "");
      setEditTagline(f.tagline || "");
      setEditLinkedinUrl(f.linkedinUrl || "");
      setEditTwitterUrl(f.twitterUrl || "");
      setEditInstagramUrl(f.instagramUrl || "");
      setEditLeaderEmails(f.leaderEmails || []);
      setEditSignatoryName(f.signatoryName || user.name || "");
      setEditSignatoryRole(f.signatoryRole || "");
    }
  }, [user]);

  // Adjust State & City lists on Country edit changes
  useEffect(() => {
    const stateList = STATES[editCountry] || [];
    if (stateList.length > 0 && !stateList.includes(editState)) {
      setEditState(stateList[0]);
    }
  }, [editCountry]);

  useEffect(() => {
    if (editState) {
      const cityList = CITIES[editState] || [];
      if (cityList.length > 0 && !cityList.includes(editCity)) {
        setEditCity(cityList[0]);
      }
    }
  }, [editState]);

  if (!user) return null;

  const currentSectorName = SECTORS.find(s => s.id === editPrimarySector)?.name || "Bilateral Trade";
  const companySlug = editCompanyName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const publicUrl = `indiaglobalnews.com/company/${companySlug || "slug"}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Profile Completeness Score
  const calculateCompleteness = () => {
    let score = 0;
    if (editCompanyName) score += 15;
    if (editLogoBase64) score += 15;
    if (editCoverBase64) score += 10;
    if (editTagline) score += 10;
    if (editCompanyDesc) score += 20;
    if (editKeyProducts.length > 0) score += 15;
    if (editLinkedinUrl || editTwitterUrl) score += 10;
    if (editSignatoryRole) score += 5;
    return score;
  };

  const completeness = calculateCompleteness();

  const handleSaveProfile = async () => {
    setValidationError(null);
    setEditSuccess(false);

    if (!editCompanyName.trim()) { setValidationError("Company Name is required."); return; }
    if (!editIncorporationYear) { setValidationError("Incorporation Year is required."); return; }
    if (!editSignatoryRole.trim()) { setValidationError("Signatory Designation is required."); return; }
    if (!editCompanyDesc.trim()) { setValidationError("Company Description is required."); return; }
    
    const descWords = getWordCount(editCompanyDesc);
    if (descWords < 10 || descWords > 400) {
      setValidationError("Company description must be between 10 and 400 words.");
      return;
    }
    if (editKeyProducts.length === 0) {
      setValidationError("Please list at least 1 key product or service.");
      return;
    }
    if (editKeyProducts.length > 5) {
      setValidationError("Free plan only supports up to 5 products or services.");
      return;
    }
    if (editLeaderEmails.length > 2) {
      setValidationError("Free plan only supports linking up to 2 leaders.");
      return;
    }

    const updatedForm = {
      ...profile,
      companyName: editCompanyName,
      companyType: editCompanyType,
      incorporationYear: editIncorporationYear,
      country: editCountry,
      state: editState,
      city: editCity,
      hqLocation: `${editCity}, ${editState}, ${editCountry}`,
      websiteUrl: editWebsiteUrl,
      companyEmail: editCompanyEmail,
      companyPhone: editCompanyPhone,
      sector: editPrimarySector,
      secondarySectors: editSecondarySectors,
      companyDesc: editCompanyDesc,
      keyProducts: editKeyProducts,
      marketsServed: editMarketsServed,
      marketRegions: editMarketsServed.includes("International") ? editMarketRegions : [],
      businessType: editBusinessType,
      logoBase64: editLogoBase64,
      coverBase64: editCoverBase64,
      tagline: editTagline,
      linkedinUrl: editLinkedinUrl,
      twitterUrl: editTwitterUrl,
      instagramUrl: editInstagramUrl,
      leaderEmails: editLeaderEmails,
      signatoryName: editSignatoryName,
      signatoryRole: editSignatoryRole
    };

    await updateOnboarding({
      name: editCompanyName,
      sectors: [editPrimarySector, ...editSecondarySectors].slice(0, 10),
      onboardingForm: updatedForm
    });

    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 3000);
  };

  // Image encoders
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Logo image size exceeds 2MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setEditLogoBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Banner image size exceeds 2MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setEditCoverBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Sector News generator
  const getSectorNews = () => {
    const defaultNews = [
      { title: `Global Bilateral Directives Reshaping the ${currentSectorName} Sector`, source: "IGEN News Feed", date: "May 25, 2026", reads: 198 },
      { title: `How Small and Mid-Sized Businesses Scale Operations in ${currentSectorName} Trade`, source: "Bilateral Trade Review", date: "May 22, 2026", reads: 310 },
      { title: `Capital Inflow Guidelines and Custom Duty Fluctuations across Regional Segments`, source: "Global Trade Desk", date: "May 20, 2026", reads: 420 }
    ];
    return defaultNews;
  };

  // OTP Simulated Handlers
  const handleStartTransfer = () => {
    setTransferError(null);
    if (!newAdminEmail.trim() || !newAdminEmail.includes("@")) {
      setTransferError("Please enter a valid recipient email.");
      return;
    }
    if (!newAdminName.trim()) {
      setTransferError("Please enter the recipient's name.");
      return;
    }
    if (!newAdminDesignation.trim()) {
      setTransferError("Please enter the recipient's designation.");
      return;
    }
    setTransferStep(2);
  };

  const handleVerifyOTP = () => {
    setTransferError(null);
    if (otpCode !== "123456") {
      setTransferError("Invalid verification code. Please use 123456 for simulator validation.");
      return;
    }
    setTransferStep(3);
  };

  const handleConfirmTransferSubmit = async () => {
    const updatedForm = {
      ...profile,
      signatoryName: newAdminName,
      signatoryEmail: newAdminEmail,
      signatoryRole: newAdminDesignation
    };
    await updateOnboarding({
      name: editCompanyName,
      onboardingForm: updatedForm
    });
    setTransferModalOpen(false);
    setTransferStep(1);
    setNewAdminEmail("");
    setNewAdminName("");
    setNewAdminDesignation("");
    setOtpCode("");
    window.location.reload();
  };

  const handleDeleteCompany = async () => {
    if (deleteConfirmText.toLowerCase() === editCompanyName.toLowerCase()) {
      await updateOnboarding({
        onboardingStatus: "none",
        onboardingRole: "none",
        companyPlan: "none",
        onboardingForm: {}
      });
      window.location.href = `./company`;
    } else {
      alert("Verification text does not match the company name.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Top Header Panel - View Mode Switcher */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-[#122238] rounded-3xl p-4 border border-gray-100 dark:border-white/5 mb-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-orange-500/10 text-orange-600 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dashboard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-sm font-bold text-[#1D1D46] dark:text-white leading-tight flex items-center gap-2">
              <span>{editCompanyName || "Unregistered Company"}</span>
              <span 
                className="px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider cursor-pointer"
                title="Free Member — This company listing is self-declared and has not been verified by iGEN."
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
              viewMode === "public"
                ? "bg-[#1D1D46] text-white shadow-md"
                : "text-gray-500 hover:text-[#1D1D46] dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Public Page View
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRIVATE VIEW (ADMIN DASHBOARD)                                            */}
      {/* ========================================================================= */}
      {viewMode === "private" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2.5">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "edit", label: "Edit Company Profile", icon: Edit },
              { id: "leaders", label: "Leadership Links", icon: Users, badge: `${editLeaderEmails.length}/2` },
              { id: "pr", label: "Press Releases (PR)", icon: FileText, locked: true },
              { id: "analytics", label: "B2B Analytics", icon: TrendingUp, locked: true },
              { id: "upgrade", label: "Upgrade Plan", icon: Award },
              { id: "settings", label: "Company Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
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
                  {tab.locked && (
                    <Lock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  )}
                  {tab.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${isActive ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-white/10 text-gray-500"}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Orange Upgrade Box in Sidebar */}
            <div className="bg-gradient-to-br from-[#C55A11] to-[#F0652E] rounded-3xl p-5 text-white border border-white/5 space-y-3.5 mt-6 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 fill-white text-[#C55A11]" /> Upgrade Corporate Listing
              </h4>
              <p className="text-[10px] leading-relaxed text-gray-100">
                Unlock B2B buyer leads, professional press release publishing, and get verified with the IGEN Blue Tick verification.
              </p>
              <button 
                onClick={() => setAdminTab("upgrade")}
                className="w-full py-2 bg-white text-[#C55A11] hover:bg-gray-50 text-[10px] font-black rounded-xl transition-all shadow-sm uppercase tracking-wider"
              >
                View Premium Plans
              </button>
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Private View Header Info Card */}
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  {editLogoBase64 ? (
                    <img src={editLogoBase64} alt="Logo" className="w-20 h-20 rounded-2xl object-cover border border-gray-100 dark:border-white/10 shadow-sm shrink-0" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-white/5 border border-dashed border-gray-250 dark:border-white/15 flex flex-col items-center justify-center text-center shrink-0 cursor-pointer" onClick={() => setAdminTab("edit")}>
                      <Building2 className="w-8 h-8 text-gray-300 dark:text-white/15" />
                      <span className="text-[8px] text-gray-400 mt-1 font-bold">Upload Logo</span>
                    </div>
                  )}
                  <div className="space-y-1.5 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white leading-tight">{editCompanyName}</h1>
                      <span className="px-2 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-lg border border-orange-500/20">
                        Unverified Company Listing
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <span>HQ: <strong>{editCity}, {editCountry}</strong></span>
                      <span>Type: <strong>{editCompanyType}</strong></span>
                      <span>Sector: <strong className="text-blue-500">{currentSectorName}</strong></span>
                    </div>
                    <p className="text-[10px] text-gray-400 italic">Managed by: {editSignatoryName} ({editSignatoryRole || "Authorised Signatory"})</p>
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
                      className="px-3 py-1.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-[9px] font-bold rounded-lg flex items-center gap-1 shrink-0"
                    >
                      {copiedUrl ? "Copied!" : <><Copy className="w-2.5 h-2.5" /> Copy</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB CONTENTS */}
            
            {/* OVERVIEW TAB */}
            {adminTab === "overview" && (
              <div className="space-y-6">
                {/* Stats row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Profile Completeness</span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-[#1D1D46] dark:text-white">{completeness}%</span>
                        <span className="text-xs text-gray-400 font-semibold">{completeness === 100 ? "Complete!" : "Action Required"}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${completeness}%` }} />
                      </div>
                    </div>
                    {completeness < 100 && (
                      <button onClick={() => setAdminTab("edit")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">
                        Add missing details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Linked Leaders</span>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#1D1D46]/5 dark:bg-white/5 flex items-center justify-center text-[#1D1D46] dark:text-white">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-[#1D1D46] dark:text-white">{editLeaderEmails.length} <span className="text-xs text-gray-400">/ 2 max</span></h4>
                        <p className="text-[10px] text-gray-400 font-medium">Informal links</p>
                      </div>
                    </div>
                    <button onClick={() => setAdminTab("leaders")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">
                      Manage invitations <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 text-left">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Listing Visibility</span>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#1D1D46] dark:text-white uppercase">{visibility} Page</h4>
                        <p className="text-[10px] text-gray-400 font-medium">Basic sector index active</p>
                      </div>
                    </div>
                    <button onClick={() => setAdminTab("settings")} className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">
                      Change visibility <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Page view analytics card */}
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                    <div>
                      <h3 className="font-bold text-[#1D1D46] dark:text-white">Profile Views Analytics</h3>
                      <p className="text-[11px] text-gray-400 leading-normal">Basic directory clicks tracker for the past 7 days</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-[10px] font-extrabold rounded-lg">Free Tracker</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">Today</span>
                      <span className="text-xl font-bold text-[#1D1D46] dark:text-white">4</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">This Week</span>
                      <span className="text-xl font-bold text-[#1D1D46] dark:text-white">29</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">Followers</span>
                      <span className="text-xl font-bold text-[#1D1D46] dark:text-white">{followerCount}</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-orange-500/20 flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-orange-500 block mb-0.5">Demographics</span>
                      <button onClick={() => setAdminTab("upgrade")} className="text-[10px] font-bold text-blue-500 hover:underline text-left">Upgrade to view</button>
                    </div>
                  </div>
                </div>

                {/* Locked feature warning in Overview */}
                <div className="bg-orange-500/5 border border-orange-500/15 rounded-3xl p-5 md:p-6 text-left flex gap-4">
                  <ShieldAlert className="w-8 h-8 text-orange-500 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Unverified Listing Notice</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                      Your company is currently listing as <strong>"Unverified"</strong>. We do not require documents (GST/COI/PAN) for the free plan. If you wish to acquire the verified blue check, publish official news, and enable leads contact channels, please review our paid tiers.
                    </p>
                    <button onClick={() => setAdminTab("upgrade")} className="text-[10px] font-bold text-[#C55A11] hover:underline uppercase tracking-wider block pt-1">Compare Plans & Verify Now</button>
                  </div>
                </div>
              </div>
            )}

            {/* EDIT PROFILE TAB */}
            {adminTab === "edit" && (
              <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                  <div>
                    <h3 className="font-bold text-[#1D1D46] dark:text-white">Edit Company Directory Details</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">Modify your public facing metadata. Save to sync directory.</p>
                  </div>
                  <button onClick={handleSaveProfile} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all">
                    Save Profile
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
                    <span>Company profile details updated successfully!</span>
                  </div>
                )}

                {/* Form fields */}
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Company Type</label>
                      <select
                        value={editCompanyType}
                        onChange={(e) => setEditCompanyType(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none"
                      >
                        {["Startup", "MSME", "Large Company", "MNC", "Government Entity", "NGO / Trust"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Incorporation Year</label>
                      <input 
                        type="number" 
                        value={editIncorporationYear}
                        onChange={(e) => setEditIncorporationYear(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Designation</label>
                      <input 
                        type="text" 
                        value={editSignatoryRole}
                        onChange={(e) => setEditSignatoryRole(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Headquarters selectors */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Headquarters Location</label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <div>
                        <select
                          value={editCountry}
                          onChange={(e) => setEditCountry(e.target.value)}
                          className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select
                          value={editState}
                          onChange={(e) => setEditState(e.target.value)}
                          className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none"
                          disabled={!STATES[editCountry]}
                        >
                          {(STATES[editCountry] || []).map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none"
                          disabled={!CITIES[editState]}
                        >
                          {(CITIES[editState] || []).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Sector editing */}
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
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Business Classification</label>
                      <select 
                        value={editBusinessType}
                        onChange={(e) => setEditBusinessType(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none"
                      >
                        {["Exporter", "Importer", "Manufacturer", "Service Provider", "Trader", "Investor", "Multi-business"].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Secondary sectors */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Secondary Sectors (Max 2)</label>
                    <div className="flex gap-2 mb-2">
                      <select 
                        value={tempSecondary}
                        onChange={(e) => setTempSecondary(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-medium border-none focus:outline-none"
                      >
                        <option value="">-- Choose sector --</option>
                        {SECTORS.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      <button 
                        type="button" 
                        onClick={() => {
                          if (tempSecondary) {
                            if (editSecondarySectors.length >= 2) {
                              setValidationError("Max 2 secondary sectors allowed.");
                              return;
                            }
                            if (tempSecondary === editPrimarySector || editSecondarySectors.includes(tempSecondary)) return;
                            setEditSecondarySectors(prev => [...prev, tempSecondary]);
                            setTempSecondary("");
                          }
                        }} 
                        className="px-4 py-2.5 bg-[#1D1D46] text-white text-xs font-bold rounded-xl"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {editSecondarySectors.map((sectorId) => (
                        <span key={sectorId} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded flex items-center gap-1 border border-gray-250 dark:border-white/5">
                          {SECTORS.find(s => s.id === sectorId)?.name || sectorId}
                          <button type="button" onClick={() => setEditSecondarySectors(prev => prev.filter(x => x !== sectorId))} className="text-red-500 font-bold hover:text-red-700 ml-1">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description textarea */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Company Description</label>
                      <span className="text-[10px] font-bold text-gray-400">Words: {getWordCount(editCompanyDesc)} / 400</span>
                    </div>
                    <textarea 
                      rows={4}
                      value={editCompanyDesc}
                      onChange={(e) => setEditCompanyDesc(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none resize-none"
                    />
                  </div>

                  {/* Products chips (Max 5) */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Products / Services Chips</label>
                      <span className="text-[10px] font-bold text-gray-400">Chips: {editKeyProducts.length} / 5</span>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        value={newProduct}
                        onChange={(e) => setNewProduct(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        placeholder="e.g. Export Packaging"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (newProduct.trim()) {
                            if (editKeyProducts.length >= 5) {
                              setValidationError("Max 5 products/services allowed on Free Plan.");
                              return;
                            }
                            if (editKeyProducts.includes(newProduct.trim())) return;
                            setEditKeyProducts(prev => [...prev, newProduct.trim()]);
                            setNewProduct("");
                          }
                        }} 
                        className="px-4 py-2.5 bg-[#1D1D46] text-white text-xs font-bold rounded-xl"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {editKeyProducts.map((p, i) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded flex items-center gap-1 border border-gray-250 dark:border-white/5">
                          {p}
                          <button type="button" onClick={() => setEditKeyProducts(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500 font-bold hover:text-red-700 ml-1">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Brand Tagline */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Brand Tagline</label>
                    <input 
                      type="text" 
                      value={editTagline}
                      onChange={(e) => setEditTagline(e.target.value)}
                      maxLength={80}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="tagline under 80 chars"
                    />
                  </div>

                  {/* Logo and banner cover image editing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 border border-dashed border-gray-250 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-gray-400 block mb-2 uppercase">Logo Image</span>
                      {editLogoBase64 ? (
                        <div className="relative">
                          <img src={editLogoBase64} alt="Logo" className="w-16 h-16 object-cover rounded-xl border border-gray-200" />
                          <button type="button" onClick={() => setEditLogoBase64("")} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">×</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => logoInputRef.current?.click()} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 text-[9px] font-bold rounded-lg text-gray-700 dark:text-white flex items-center gap-1"><Upload className="w-3 h-3" /> Select Logo</button>
                      )}
                      <input type="file" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    </div>

                    <div className="p-4 border border-dashed border-gray-250 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-gray-400 block mb-2 uppercase">Cover Banner Image</span>
                      {editCoverBase64 ? (
                        <div className="relative w-full">
                          <img src={editCoverBase64} alt="Cover" className="w-full h-12 object-cover rounded-lg border border-gray-200" />
                          <button type="button" onClick={() => setEditCoverBase64("")} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">×</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => coverInputRef.current?.click()} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 text-[9px] font-bold rounded-lg text-gray-700 dark:text-white flex items-center gap-1"><Upload className="w-3 h-3" /> Select Cover</button>
                      )}
                      <input type="file" ref={coverInputRef} onChange={handleCoverUpload} className="hidden" accept="image/*" />
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="border-t border-gray-100 dark:border-white/5 pt-4 space-y-3">
                    <span className="text-[10px] font-bold text-gray-400 block uppercase">Social Handles URLs</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input type="url" value={editLinkedinUrl} onChange={(e) => setEditLinkedinUrl(e.target.value)} placeholder="LinkedIn" className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" />
                      <input type="url" value={editTwitterUrl} onChange={(e) => setEditTwitterUrl(e.target.value)} placeholder="Twitter" className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" />
                      <input type="url" value={editInstagramUrl} onChange={(e) => setEditInstagramUrl(e.target.value)} placeholder="Instagram" className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-white/5">
                  <button onClick={handleSaveProfile} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all">
                    Save Modifications
                  </button>
                </div>
              </div>
            )}

            {/* LEADERS TAB */}
            {adminTab === "leaders" && (
              <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm space-y-6 text-left">
                <div>
                  <h3 className="font-bold text-[#1D1D46] dark:text-white">Linked Leadership Team</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">Invite founders and C-Suite officials to associate their public listings with this brand page.</p>
                </div>

                <div className="bg-orange-500/10 rounded-2xl p-4 border border-orange-500/20 text-orange-700 dark:text-orange-400 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldAlert className="w-4 h-4" />
                    Free Plan Seat Limitation
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    You can link up to <strong>2 leaders</strong> under this company page at the <strong>Free tier</strong>. These linking ties are self-declared. Upgrade your company page plan to Silver or Gold to verify your leadership dashboard.
                  </p>
                </div>

                {/* Email invitation builder */}
                {editLeaderEmails.length < 2 ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Send Invitation by Professional Email</label>
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        value={newLeaderEmail}
                        onChange={(e) => setNewLeaderEmail(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        placeholder="CEO.leader@company.com"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (newLeaderEmail.trim() && newLeaderEmail.includes("@")) {
                            if (editLeaderEmails.includes(newLeaderEmail.trim())) return;
                            const newList = [...editLeaderEmails, newLeaderEmail.trim()];
                            setEditLeaderEmails(newList);
                            setNewLeaderEmail("");
                            // Sync changes to context
                            updateOnboarding({
                              onboardingForm: {
                                ...profile,
                                leaderEmails: newList
                              }
                            });
                          }
                        }}
                        className="px-5 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl"
                      >
                        Send Invite
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-orange-500 font-bold italic">You have linked the maximum of 2 leaders allowed on the free plan.</p>
                )}

                {/* List of current invitations */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase">Current Invitations</span>
                  {editLeaderEmails.map((email, idx) => {
                    const isAccepted = idx === 0; // Simulate first invitation as accepted
                    return (
                      <div key={email} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-150 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#1D1D46]/5 dark:bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">{email.split("@")[0].replace(".", " ")}</h4>
                            <p className="text-[9px] text-gray-400 mt-0.5">{email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            isAccepted 
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400"
                          }`}>
                            {isAccepted ? "Accepted" : "Invitation Sent"}
                          </span>
                          <button 
                            type="button" 
                            onClick={() => {
                              const newList = editLeaderEmails.filter(x => x !== email);
                              setEditLeaderEmails(newList);
                              updateOnboarding({
                                onboardingForm: {
                                  ...profile,
                                  leaderEmails: newList
                                }
                              });
                            }}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {editLeaderEmails.length === 0 && (
                    <p className="text-xs text-gray-400 italic">No leadership profile attachments found.</p>
                  )}
                </div>
              </div>
            )}

            {/* PRESS RELEASES TAB (LOCKED) */}
            {adminTab === "pr" && (
              <div className="relative bg-white dark:bg-[#122238] rounded-3xl p-8 border border-gray-100 dark:border-white/5 shadow-sm text-center overflow-hidden min-h-[350px] flex flex-col items-center justify-center space-y-5">
                <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
                  <FileText className="w-96 h-96 text-gray-500" />
                </div>

                <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-600">
                  <Lock className="w-6 h-6" />
                </div>
                
                <div className="space-y-2 max-w-md">
                  <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white">Press Releases Tab Locked</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Corporate PR distributing and press release publication is exclusively active for **Silver** and **Gold** Company Page listings.
                  </p>
                </div>

                <div className="bg-[#f4f7fb] dark:bg-white/5 p-4 rounded-2xl max-w-sm text-left text-[11px] text-gray-500 space-y-1.5 border border-gray-200 dark:border-transparent">
                  <h4 className="font-bold text-gray-600 dark:text-white">Premium PR Features:</h4>
                  <div>• Directly publish official announcements to IGEN streams.</div>
                  <div>• AI sector-tagging maps your PR to 50 billing trade channels.</div>
                  <div>• Backlink indexing boosts search engine results rankings.</div>
                </div>

                <button onClick={() => setAdminTab("upgrade")} className="px-6 py-3 bg-gradient-to-r from-[#1D1D46] to-[#0642BA] text-white text-xs font-bold rounded-xl shadow-md uppercase tracking-wider">
                  Upgrade Plan to Publish
                </button>
              </div>
            )}

            {/* B2B ANALYTICS (LOCKED) */}
            {adminTab === "analytics" && (
              <div className="relative bg-white dark:bg-[#122238] rounded-3xl p-8 border border-gray-100 dark:border-white/5 shadow-sm text-center overflow-hidden min-h-[350px] flex flex-col items-center justify-center space-y-5">
                <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
                  <BarChart3 className="w-96 h-96 text-gray-500" />
                </div>

                <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-600">
                  <Lock className="w-6 h-6" />
                </div>
                
                <div className="space-y-2 max-w-md">
                  <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white">B2B Analytics Locked</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Full traffic stats, geographical visitor mappings, lead conversion dashboards, and sector competitive analysis require a paid tier.
                  </p>
                </div>

                <div className="bg-[#f4f7fb] dark:bg-white/5 p-4 rounded-2xl text-left text-[11px] text-gray-500 space-y-1.5 border border-gray-200 dark:border-transparent max-w-sm">
                  <h4 className="font-bold text-gray-600 dark:text-white">Basic metrics for Free plan:</h4>
                  <div className="flex justify-between font-mono">
                    <span>Profile Views (7 Days):</span>
                    <span className="text-[#1D1D46] dark:text-white font-bold">29 views</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Enquiries Received:</span>
                    <span className="text-red-500 font-bold">Locked (Upgrade)</span>
                  </div>
                </div>

                <button onClick={() => setAdminTab("upgrade")} className="px-6 py-3 bg-gradient-to-r from-[#1D1D46] to-[#0642BA] text-white text-xs font-bold rounded-xl shadow-md uppercase tracking-wider">
                  Unlock Full B2B Analytics
                </button>
              </div>
            )}

            {/* UPGRADE PLAN COMPARISON */}
            {adminTab === "upgrade" && (
              <div className="space-y-6 text-left">
                <div className="bg-gradient-to-br from-[#1D1D46] to-[#122238] rounded-3xl p-6 md:p-8 border border-white/10 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <Award className="w-64 h-64 text-white -mr-16 -mb-16" />
                  </div>
                  
                  <div className="relative z-10 space-y-4">
                    <span className="text-[10px] font-bold tracking-widest text-[#F0652E] uppercase bg-[#F0652E]/15 px-3 py-1 rounded-full">Upgrade Pricing Grid</span>
                    <h3 className="text-xl md:text-2xl font-bold font-display leading-tight">Scale Your Global Footprint</h3>
                    <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
                      Select the appropriate plan to activate direct B2B customer contact forms, obtain the Blue Tick verification check, and publish press releases (PR) to international news feeds.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  {/* FREE PLAN */}
                  <div className="bg-white dark:bg-[#122238] border-2 border-gray-150 dark:border-white/5 rounded-[32px] p-6 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">Self-declared listing</span>
                        <h4 className="text-base font-bold text-[#1D1D46] dark:text-white">FREE MEMBER</h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-black text-[#1D1D46] dark:text-white">₹0</span>
                          <span className="text-[10px] text-gray-400">/ forever</span>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-white/5 w-full" />
                      <ul className="space-y-2 text-[11px] text-gray-500 leading-normal">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Basic company template</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Upload logo & cover</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Max 5 products listed</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Max 2 linked leaders</li>
                        <li className="flex items-center gap-1.5 text-red-500"><ShieldAlert className="w-3.5 h-3.5" /> No Blue Tick (Unverified)</li>
                        <li className="flex items-center gap-1.5 text-red-500"><ShieldAlert className="w-3.5 h-3.5" /> No press releases publisher</li>
                      </ul>
                    </div>
                    <div className="pt-6">
                      <span className="w-full block py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-500 text-center font-bold text-xs rounded-xl uppercase tracking-wider">Active Free</span>
                    </div>
                  </div>

                  {/* SILVER PLAN */}
                  <div className="bg-gradient-to-b from-[#1D1D46]/5 to-transparent dark:from-[#1D1D46]/20 dark:to-[#122238]/20 border-2 border-[#1D1D46] dark:border-[#F0652E] rounded-[32px] p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-[#F0652E] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Best Value</div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-[#F0652E] block uppercase">Verified brand page</span>
                        <h4 className="text-base font-bold text-[#1D1D46] dark:text-white">SILVER PLAN</h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-black text-[#1D1D46] dark:text-white">₹99,000</span>
                          <span className="text-[10px] text-gray-400">/ year</span>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-white/5 w-full" />
                      <ul className="space-y-2 text-[11px] text-gray-600 dark:text-gray-300 leading-normal">
                        <li className="flex items-center gap-1.5 text-blue-500 font-bold"><Check className="w-3.5 h-3.5 text-blue-500" /> Verified Blue Tick</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Max 10 products listed</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Max 5 verified leaders</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Press releases publisher</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> B2B Leads Inquiry Form</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Full analytics dashboard</li>
                      </ul>
                    </div>
                    <div className="pt-6">
                      <button 
                        onClick={() => window.location.href = `company`}
                        className="w-full py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white dark:bg-[#F0652E] dark:hover:bg-[#f6b453] text-center font-bold text-xs rounded-xl shadow uppercase tracking-wider transition-all"
                      >
                        Buy Silver Plan
                      </button>
                    </div>
                  </div>

                  {/* GOLD PLAN */}
                  <div className="bg-white dark:bg-[#122238] border-2 border-gray-150 dark:border-white/5 rounded-[32px] p-6 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">Enterprise dominance</span>
                        <h4 className="text-base font-bold text-[#1D1D46] dark:text-white">GOLD PLAN</h4>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-black text-[#1D1D46] dark:text-white">₹3L - 10L</span>
                          <span className="text-[10px] text-gray-400">/ year</span>
                        </div>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-white/5 w-full" />
                      <ul className="space-y-2 text-[11px] text-gray-500 leading-normal">
                        <li className="flex items-center gap-1.5 text-blue-500 font-bold"><Check className="w-3.5 h-3.5 text-blue-500" /> Premium Blue Tick</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Unlimited products & leaders</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Homepage placement boosts</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Enterprise PR priority feeds</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Trade intelligence access</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Dedicated account manager</li>
                      </ul>
                    </div>
                    <div className="pt-6">
                      <button 
                        onClick={() => window.location.href = `company`}
                        className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1D1D46] dark:text-white text-center font-bold text-xs rounded-xl uppercase tracking-wider transition-all border border-gray-200 dark:border-transparent"
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
                  <h3 className="font-bold text-[#1D1D46] dark:text-white">Company Administration Settings</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">Configure internal visibility preferences, signatory transfers, and dashboard settings.</p>
                </div>

                {/* Signatory details & admin transfer */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4">
                  <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-3">Signatory Management</h4>
                  <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-150 dark:border-transparent flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h5 className="text-xs font-bold text-gray-700 dark:text-white">{editSignatoryName}</h5>
                      <p className="text-[10px] text-gray-400">{editSignatoryRole || "Authorised Signatory"} | {user.email}</p>
                    </div>
                    <button 
                      onClick={() => { setTransferStep(1); setTransferModalOpen(true); }}
                      className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/15 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-xl transition-all"
                    >
                      Transfer Admin Rights
                    </button>
                  </div>
                </div>

                {/* OTP Transfer Modal simulation */}
                {transferModalOpen && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/10 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
                      <button onClick={() => setTransferModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg">×</button>
                      
                      {transferStep === 1 && (
                        <div className="space-y-3.5 text-left">
                          <h4 className="font-bold text-[#1D1D46] dark:text-white">Transfer Representative Admin Rights</h4>
                          <p className="text-[11px] text-gray-400 leading-normal">Provide the credentials of the new authorized representative. An OTP verification check is required.</p>
                          {transferError && <p className="text-xs text-red-500 font-bold">{transferError}</p>}
                          <div>
                            <label className="text-[9px] font-bold text-gray-400 block mb-1">New Representative Full Name</label>
                            <input type="text" value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} className="w-full px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" placeholder="e.g. Jane CEO" />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-gray-400 block mb-1">New Representative designation</label>
                            <input type="text" value={newAdminDesignation} onChange={(e) => setNewAdminDesignation(e.target.value)} className="w-full px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" placeholder="e.g. Chief Executive Officer" />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-gray-400 block mb-1">New Work Email Address</label>
                            <input type="email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="w-full px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" placeholder="new.representative@company.com" />
                          </div>
                          <button onClick={handleStartTransfer} className="w-full py-2.5 bg-[#1D1D46] text-white hover:bg-[#0642BA] text-xs font-bold rounded-xl shadow">Send Verification Code</button>
                        </div>
                      )}

                      {transferStep === 2 && (
                        <div className="space-y-3.5 text-left">
                          <h4 className="font-bold text-[#1D1D46] dark:text-white">OTP Verification Check</h4>
                          <p className="text-[11px] text-gray-400 leading-normal">
                            Enter the 6-digit confirmation code. (Use code <strong className="text-orange-500">123456</strong> for simulator bypass).
                          </p>
                          {transferError && <p className="text-xs text-red-500 font-bold">{transferError}</p>}
                          <input 
                            type="text" 
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="------"
                            className="w-full py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-center font-mono text-xl tracking-widest text-[#1D1D46] dark:text-white focus:outline-none"
                          />
                          <button onClick={handleVerifyOTP} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow">Verify OTP and Confirm</button>
                        </div>
                      )}

                      {transferStep === 3 && (
                        <div className="space-y-3.5 text-center">
                          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"><Check className="w-6 h-6" /></div>
                          <h4 className="font-bold text-[#1D1D46] dark:text-white">OTP Confirmed!</h4>
                          <p className="text-[11px] text-gray-400">
                            Ownership transferred to <strong>{newAdminName}</strong> ({newAdminEmail}).
                          </p>
                          <button onClick={handleConfirmTransferSubmit} className="w-full py-2.5 bg-[#1D1D46] text-white text-xs font-bold rounded-xl">Complete and Refresh</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Company Visibility */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Public Directory Visibility</h4>
                    <p className="text-[10px] text-gray-400">Decide if your company profile listing is visible to visitors.</p>
                  </div>
                  <button 
                    onClick={() => setVisibility(visibility === "Public" ? "Private" : "Public")}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      visibility === "Public"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-gray-100 text-gray-500 dark:bg-white/5"
                    }`}
                  >
                    {visibility} Page Status
                  </button>
                </div>

                {/* Notifications */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Email Notification Preferences</h4>
                  <div className="space-y-2">
                    {[
                      { checked: notifMilestones, set: setNotifMilestones, label: "Profile views milestones", desc: "Get email reports when company views cross milestones (50, 100, 500 views)" },
                      { checked: notifLeaderAccepted, set: setNotifLeaderAccepted, label: "Leadership invitation accepted", desc: "Notify when invited leaders accept connection links" },
                      { checked: notifUpdates, set: setNotifUpdates, label: "iGEN platform updates", desc: "Receive monthly corporate trade features bulletins" },
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-start gap-3 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer p-1">
                        <input type="checkbox" checked={item.checked} onChange={(e) => item.set(e.target.checked)} className="rounded text-[#1D1D46] focus:ring-[#1D1D46] mt-0.5" />
                        <div>
                          <span>{item.label}</span>
                          <span className="block text-[9px] text-gray-400 font-normal leading-tight mt-0.5">{item.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Password reset */}
                <div className="border-t border-gray-100 dark:border-white/5 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Update Signatory Account Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password" 
                      className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" 
                    />
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password" 
                      className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs" 
                    />
                  </div>
                  {newPassword && newPassword === confirmPassword && (
                    <button 
                      onClick={() => { alert("Password updated successfully (simulation)."); setNewPassword(""); setConfirmPassword(""); }}
                      className="px-4 py-1.5 bg-[#1D1D46] text-white text-[10px] font-bold rounded-lg shadow-sm"
                    >
                      Update Password
                    </button>
                  )}
                </div>

                {/* Deletion controls */}
                <div className="border-t border-red-500/10 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-red-500">Danger Zone</h4>
                  {!deleteConfirmOpen ? (
                    <button onClick={() => setDeleteConfirmOpen(true)} className="px-4 py-2 border border-red-500/20 text-red-500 hover:bg-red-500/5 text-xs font-bold rounded-xl transition-all">Delete Company Page Listing</button>
                  ) : (
                    <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3.5 max-w-md">
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                        This action deletes the company registry, public listings page, and all leader invitation ties. This is irreversible.
                        To confirm, type <strong className="text-[#1D1D46] dark:text-white">{editCompanyName}</strong> below:
                      </p>
                      <input 
                        type="text" 
                        value={deleteConfirmText}
                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 rounded-xl text-xs border border-red-500/20"
                        placeholder="Type company name exactly"
                      />
                      <div className="flex gap-2">
                        <button onClick={handleDeleteCompany} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm">Confirm Deletion</button>
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
      {/* PUBLIC VIEW (VISITOR PUBLIC DIRECTORY VIEW)                               */}
      {/* ========================================================================= */}
      {viewMode === "public" && (
        <div className="space-y-8">
          
          {/* Public Header Card */}
          <div className="bg-white dark:bg-[#122238] rounded-[32px] border border-gray-150 dark:border-white/5 overflow-hidden shadow-sm">
            {/* Banner Cover picture */}
            <div className="h-44 bg-gradient-to-r from-[#1D1D46] to-[#0642BA] dark:from-[#112238] dark:to-[#172c47] relative overflow-hidden">
              {editCoverBase64 && (
                <img src={editCoverBase64} alt="Company Cover Banner" className="w-full h-full object-cover" />
              )}
              <span className="absolute top-4 right-4 bg-white/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                Public Company Page
              </span>
            </div>

            <div className="p-6 md:p-8 space-y-6 relative text-left">
              {/* Profile Image & coordinates container */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 -mt-16 sm:-mt-20">
                {editLogoBase64 ? (
                  <img src={editLogoBase64} alt="Logo" className="w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] border-4 border-white dark:border-[#122238] object-cover bg-white shadow-lg shrink-0" />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] border-4 border-white dark:border-[#122238] bg-gray-50 dark:bg-white/5 flex items-center justify-center shadow-lg shrink-0">
                    <Building2 className="w-10 h-10 text-gray-300 dark:text-white/10" />
                  </div>
                )}
                
                <div className="flex-1 text-center sm:text-left space-y-2 pt-1.5">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1D46] dark:text-white leading-tight font-display">{editCompanyName}</h1>
                    <div 
                      className="flex items-center gap-1 px-2.5 py-0.5 bg-[#C55A11] text-white text-[10px] font-black rounded-lg uppercase tracking-wider cursor-pointer"
                      title="Free Member — This company listing is self-declared and has not been verified by iGEN."
                    >
                      <Star className="w-3 h-3 fill-white text-white" /> FREE MEMBER
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {editCity}, {editCountry}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-gray-400" /> {currentSectorName}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#F0652E]" /> {editCompanyType}</span>
                  </div>
                  
                  {editTagline && (
                    <p className="text-xs text-gray-500 italic font-medium">"{editTagline}"</p>
                  )}
                </div>

                {/* Follow & Action buttons */}
                <div className="flex gap-2.5 shrink-0 pt-2 sm:pt-0">
                  <button 
                    onClick={() => {
                      setIsFollowing(!isFollowing);
                      setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
                    }}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
                      isFollowing 
                        ? "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-300"
                        : "bg-[#1D1D46] hover:bg-[#0642BA] text-white shadow-md"
                    }`}
                  >
                    {isFollowing ? "Following" : "+ Follow"}
                  </button>
                  {editWebsiteUrl && (
                    <a 
                      href={editWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gray-50 hover:bg-gray-150 border border-gray-200 dark:bg-white/5 dark:border-white/5 rounded-xl text-[#1D1D46] dark:text-white flex items-center justify-center"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Public Columns - Tab switcher & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content Area (Tabs) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Public Tab Headers */}
              <div className="flex border-b border-gray-100 dark:border-white/5">
                {[
                  { id: "about", label: "About Business" },
                  { id: "leaders", label: "Leadership Directory" },
                  { id: "news", label: "Sector Trade News" },
                  { id: "sectors", label: "Sectors Taxonomy" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPublicTab(t.id as any)}
                    className={`px-5 py-3 text-xs font-bold border-b-2 transition-all -mb-px text-left ${
                      publicTab === t.id
                        ? "border-[#1D1D46] text-[#1D1D46] dark:border-[#F0652E] dark:text-[#F0652E]"
                        : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ABOUT TAB */}
              {publicTab === "about" && (
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-150 dark:border-white/5 text-left space-y-6 shadow-sm">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#1D1D46] dark:text-white border-l-4 border-[#F0652E] pl-2.5">Business Overview</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                      {editCompanyDesc || "No description provided."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-white/5">
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Key Products / Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {editKeyProducts.map((p, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg border border-gray-200 dark:border-white/5">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Markets Served</h4>
                      <div className="flex flex-wrap gap-2">
                        {editMarketsServed.map((m) => (
                          <span key={m} className="px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-lg">
                            {m} Market
                          </span>
                        ))}
                        {editMarketsServed.includes("International") && editMarketRegions.map((r) => (
                          <span key={r} className="px-2.5 py-1 bg-[#C55A11]/10 text-[#C55A11] text-xs font-semibold rounded-lg">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Handles in footer of About */}
                  {(editLinkedinUrl || editTwitterUrl || editInstagramUrl) && (
                    <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Connect Globally</h4>
                      <div className="flex gap-3">
                        {editLinkedinUrl && (
                          <a href={editLinkedinUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 text-xs font-bold rounded-xl text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent flex items-center gap-1.5">
                            LinkedIn
                          </a>
                        )}
                        {editTwitterUrl && (
                          <a href={editTwitterUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 text-xs font-bold rounded-xl text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent flex items-center gap-1.5">
                            Twitter / X
                          </a>
                        )}
                        {editInstagramUrl && (
                          <a href={editInstagramUrl} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 text-xs font-bold rounded-xl text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent flex items-center gap-1.5">
                            Instagram
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* LEADERS TAB */}
              {publicTab === "leaders" && (
                <div className="space-y-4 text-left">
                  {editLeaderEmails.map((email, idx) => {
                    const name = email.split("@")[0].replace(".", " ");
                    const isAccepted = idx === 0; // Simulated accept state
                    return (
                      <div key={email} className="bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#1D1D46]/5 dark:bg-white/5 flex items-center justify-center text-gray-400 font-bold shrink-0">
                            {name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#1D1D46] dark:text-white capitalize">{name}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">{isAccepted ? "Executive Board Member" : "Invitation Pending Acceptance"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isAccepted ? (
                            <span 
                              className="px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider"
                              title="This leader is self-declared on a Free Account."
                            >
                              <Star className="w-2.5 h-2.5 inline mr-0.5 fill-white text-white" /> FREE MEMBER
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-black rounded uppercase">Informal Link</span>
                          )}
                          <button onClick={() => alert("Leader profile mock click")} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 text-[10px] font-bold rounded-xl border border-gray-250 dark:border-transparent text-gray-600 dark:text-gray-300">
                            Visit Profile
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {editLeaderEmails.length === 0 && (
                    <div className="bg-white dark:bg-[#122238] rounded-3xl p-8 border border-gray-150 dark:border-white/5 text-center text-gray-400 italic">
                      No leadership coordinates linked under this company directory page.
                    </div>
                  )}
                </div>
              )}

              {/* SECTOR NEWS TAB */}
              {publicTab === "news" && (
                <div className="space-y-4 text-left">
                  {getSectorNews().map((news, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-3xl p-6 space-y-2.5 shadow-sm hover:shadow transition-all">
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>{news.source}</span>
                        <span>{news.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1D1D46] dark:text-white leading-normal hover:text-[#F0652E] cursor-pointer">{news.title}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                        Latest developments impacting the regional supply structures and trade flow parameters for the bilateral {currentSectorName} taxonomy.
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[10px] text-gray-400 font-bold border-t border-gray-50 dark:border-white/5">
                        <span>Reads: {news.reads}</span>
                        <span className="text-blue-500 hover:underline flex items-center gap-0.5 cursor-pointer">Read Full Article <ArrowUpRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAXONOMY SECTORS TAB */}
              {publicTab === "sectors" && (
                <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-150 dark:border-white/5 text-left space-y-4 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Indexed Bilateral Trade Taxonomy</h3>
                  
                  <div className="space-y-2.5">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Primary Trade Sector</span>
                      <span className="px-3 py-1.5 bg-[#1D1D46] text-white text-xs font-bold rounded-lg inline-block">
                        {currentSectorName}
                      </span>
                    </div>

                    {editSecondarySectors.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Secondary Trade Sectors</span>
                        <div className="flex flex-wrap gap-2">
                          {editSecondarySectors.map((sectorId) => (
                            <span key={sectorId} className="px-3 py-1.5 bg-gray-50 border border-gray-250 dark:bg-white/5 dark:border-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg">
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

            {/* Right Sidebar Columns */}
            <div className="lg:col-span-4 space-y-6 text-left">
              
              {/* Stats Card */}
              <div className="bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest block">Company Credentials</h3>
                
                <div className="space-y-3 font-medium text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between border-b border-gray-50 dark:border-white/5 pb-2">
                    <span className="text-gray-400">Incorporated:</span>
                    <span className="font-bold text-[#1D1D46] dark:text-white">Est. {editIncorporationYear || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 dark:border-white/5 pb-2">
                    <span className="text-gray-400">Classification:</span>
                    <span className="font-bold text-[#1D1D46] dark:text-white">{editBusinessType}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 dark:border-white/5 pb-2">
                    <span className="text-gray-400">Primary Sector:</span>
                    <span className="font-bold text-blue-500">{currentSectorName}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-bold text-orange-600">Unverified</span>
                  </div>
                </div>
              </div>

              {/* Related Companies Card */}
              <div className="bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-3xl p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest block">Similar Businesses</h3>
                
                <div className="space-y-3.5">
                  {[
                    { name: "Sovereign Trade Corp", type: "MNC", loc: "Delhi, India" },
                    { name: "Viksit Logistics Ltd", type: "MSME", loc: "Mumbai, India" },
                    { name: "Indo-Global Ventures", type: "Startup", loc: "Bangalore, India" }
                  ].map((comp, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs border-b border-gray-50 dark:border-white/5 pb-2.5 last:border-none last:pb-0">
                      <div>
                        <h4 className="font-bold text-[#1D1D46] dark:text-white hover:underline cursor-pointer">{comp.name}</h4>
                        <span className="text-[10px] text-gray-400">{comp.loc}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-[9px] font-black rounded uppercase text-gray-500">{comp.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Seller Widget Notice */}
              <div className="bg-gradient-to-br from-orange-500/10 to-[#F0652E]/10 border border-orange-500/20 rounded-3xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-[#C55A11] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> B2B Contact Blocked
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                  Direct lead communication channels and customer inquiry contact forms are currently locked on this self-declared profile.
                </p>
                <button 
                  onClick={() => setViewMode("private")} 
                  className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[10px] rounded-xl transition-all shadow-sm uppercase tracking-wider text-center"
                >
                  Manage Page Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Check, Copy, Star, Sparkles, 
  User, Mail, Phone, Briefcase, Globe, CheckCircle2, Building2, Upload,
  AlertTriangle, Info, ShieldAlert, ShieldCheck
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

export default function LeaderOnboarding() {
  const { user, updateOnboarding } = useAuth();
  
  // Start immediately at Step 2 because Step 1 (Account Creation) is completed during initial signup.
  const [step, setStep] = useState(2);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Profile Headshot Reference
  const headshotInputRef = useRef<HTMLInputElement>(null);

  // Step 1 states (pre-populated and hidden in onboarding wizard)
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.mobile || "");

  // Step 2 states: Executive Identity
  const [headshotBase64, setHeadshotBase64] = useState<string>("");
  const [designation, setDesignation] = useState("");
  const [roleLevel, setRoleLevel] = useState("C-Suite (CEO/CFO/CTO/COO)");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // Step 3 states: Industry & Sector Alignment
  const [primarySector, setPrimarySector] = useState(SECTORS[0]?.id || "manufacturing");
  const [secondarySectors, setSecondarySectors] = useState<string[]>([]);
  const [tempSecondary, setTempSecondary] = useState("");
  const [experienceYears, setExperienceYears] = useState<number>(15);
  const [functionalExpertise, setFunctionalExpertise] = useState<string[]>([]);
  const [newExpertise, setNewExpertise] = useState("");

  // Step 4 states: Professional Biography
  const [bio, setBio] = useState("");
  const [timeline, setTimeline] = useState<{ company: string; role: string; years: string }[]>([
    { company: "", role: "", years: "" }
  ]);
  const [education, setEducation] = useState<{ institution: string; degree: string; year: string }[]>([
    { institution: "", degree: "", year: "" }
  ]);
  const [achievements, setAchievements] = useState<string[]>([""]);
  const [philosophy, setPhilosophy] = useState("");

  // Step 5 states: Company Page Linkage
  const [companyExistsChoice, setCompanyExistsChoice] = useState("YES"); // YES, NO, I_DONT_KNOW
  const [linkedCompanyId, setLinkedCompanyId] = useState("");
  const [interestInWriting, setInterestInWriting] = useState(false);

  // Sync user details on mount
  useEffect(() => {
    if (user) {
      if (user.name && !fullName) setFullName(user.name);
      if (user.email && !email) setEmail(user.email);
      if (user.mobile && !mobile) setMobile(user.mobile);
    }
  }, [user]);

  if (!user) return null;

  const username = user.email.split("@")[0];
  const publicUrl = `www.indiaglobalnews.com/leader/${username}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleHeadshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setValidationError("Headshot image exceeds the maximum 2MB size limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setHeadshotBase64(event.target.result as string);
        setValidationError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    setValidationError(null);

    if (step === 2) {
      if (!fullName.trim()) { setValidationError("Full Name is required."); return; }
      if (!designation.trim()) { setValidationError("Current Designation / Title is required."); return; }
      if (!companyName.trim()) { setValidationError("Current Company Name is mandatory."); return; }
    } else if (step === 3) {
      if (!primarySector) { setValidationError("Primary Industry Sector is required."); return; }
    } else if (step === 4) {
      if (!bio.trim()) { setValidationError("Executive biography is required."); return; }
      const bioWords = getWordCount(bio);
      if (bioWords < 10) {
        setValidationError("Biography should be at least 10 words.");
        return;
      }
      if (bioWords > 500) {
        setValidationError("Biography exceeds the maximum 500-word limit.");
        return;
      }
      // Timeline validation
      const filledTimeline = timeline.filter(t => t.company.trim() || t.role.trim());
      if (filledTimeline.length > 0) {
        for (const t of filledTimeline) {
          if (!t.company.trim() || !t.role.trim() || !t.years.trim()) {
            setValidationError("Please fill out all fields in active Career Timeline rows, or delete incomplete rows.");
            return;
          }
        }
      }
      // Achievements validation
      const filledAchievements = achievements.filter(a => a.trim().length > 0);
      for (const a of filledAchievements) {
        if (getWordCount(a) > 80) {
          setValidationError("Each Achievement statement must be under 80 words.");
          return;
        }
      }
      if (philosophy && getWordCount(philosophy) > 80) {
        setValidationError("Your Philosophy Quote must be under 80 words.");
        return;
      }
    } else if (step === 5) {
      if (companyExistsChoice === "YES" && !linkedCompanyId.trim()) {
        setValidationError("Please search or enter the company name to connect your profile.");
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setValidationError(null);
    setStep(prev => Math.max(2, prev - 1));
  };

  const handleOnboardingSubmit = async () => {
    const formData = {
      fullName,
      email,
      mobile,
      headshotBase64,
      currentDesignation: designation,
      roleLevel,
      leaderCompany: companyName,
      companyWebsite,
      linkedinUrl,
      sector: primarySector,
      secondarySectors,
      experienceYears,
      functionalExpertise,
      aboutText: bio,
      timeline: timeline.filter(t => t.company.trim() !== ""),
      education: education.filter(e => e.institution.trim() !== ""),
      achievements: achievements.filter(a => a.trim() !== ""),
      philosophy,
      companyExistsChoice,
      linkedCompanyId: companyExistsChoice === "YES" ? linkedCompanyId : "",
      articleWritingInterest: interestInWriting
    };

    // Save details in context
    await updateOnboarding({
      name: fullName,
      sectors: [primarySector, ...secondarySectors].slice(0, 10),
      onboardingForm: formData,
      onboardingStatus: "Draft" // remains draft until final redirect confirmation
    });

    setStep(6);
  };

  const handleComplete = async () => {
    // Complete onboarding by setting status to Approved
    await updateOnboarding({
      onboardingStatus: "Approved",
      accountType: "leader",
      onboardingRole: "leader",
      leaderPlan: "free"
    });
  };

  const addSecondarySector = () => {
    if (tempSecondary) {
      if (secondarySectors.length >= 2) {
        setValidationError("Free listings support up to 2 secondary sectors max.");
        return;
      }
      if (tempSecondary === primarySector) {
        setValidationError("Secondary sector cannot be identical to the primary sector.");
        return;
      }
      if (secondarySectors.includes(tempSecondary)) {
        setValidationError("Sector already added.");
        return;
      }
      setSecondarySectors(prev => [...prev, tempSecondary]);
      setTempSecondary("");
      setValidationError(null);
    }
  };

  const addExpertise = () => {
    if (newExpertise.trim()) {
      if (functionalExpertise.length >= 5) {
        setValidationError("Functional expertise chips are limited to a maximum of 5 entries.");
        return;
      }
      if (functionalExpertise.includes(newExpertise.trim())) return;
      setFunctionalExpertise(prev => [...prev, newExpertise.trim()]);
      setNewExpertise("");
      setValidationError(null);
    }
  };

  const addTimelineEntry = () => {
    if (timeline.length >= 5) {
      setValidationError("Career timeline is limited to a maximum of 5 entries on the Free Plan.");
      return;
    }
    setTimeline(prev => [...prev, { company: "", role: "", years: "" }]);
    setValidationError(null);
  };

  const addEducationEntry = () => {
    if (education.length >= 3) {
      setValidationError("Education timeline is limited to a maximum of 3 entries on the Free Plan.");
      return;
    }
    setEducation(prev => [...prev, { institution: "", degree: "", year: "" }]);
    setValidationError(null);
  };

  const addAchievement = () => {
    if (achievements.length >= 3) {
      setValidationError("Key achievements lists are limited to a maximum of 3 entries on the Free Plan.");
      return;
    }
    setAchievements(prev => [...prev, ""]);
    setValidationError(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Criteria Rationale Header - Portability Alert & Plan details */}
      {step < 6 && (
        <div className="bg-gradient-to-br from-[#1D1D46] to-[#122238] rounded-3xl p-6 md:p-8 mb-8 border border-white/10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <User className="w-64 h-64 text-white -mr-16 -mb-16" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F0652E] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-[#F0652E] uppercase">
                Executive Thought Registry
              </span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold font-display leading-tight">
              Create Your Executive Leader Profile
            </h1>
            
            <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
              An IGEN Leader Profile represents your portable executive dashboard. Under the portability principle, this profile stays with you regardless of company transitions, helping you publish opinion pieces, index your sectors, and showcase accomplishments.
            </p>
            
            {/* Split free limits and upgrade benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/10 mt-2">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-orange-400" /> Free Plan Coordinates
                </h4>
                <ul className="text-[11px] text-gray-300 space-y-1">
                  <li>• Listed as <strong className="text-orange-400">"Unverified Profile"</strong></li>
                  <li>• Quota: Publish 1 thought article / month</li>
                  <li>• Link 1 company page informally</li>
                  <li>• Profile Portability active: belongs to you</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#C55A11]/15 to-[#F0652E]/15 rounded-xl p-3 border border-[#C55A11]/20">
                <h4 className="text-[10px] font-bold text-[#F0652E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Why Upgrade to Paid?
                </h4>
                <ul className="text-[11px] text-gray-200 space-y-1">
                  <li>• Get the premium <strong className="text-blue-400">Verified Blue Tick</strong></li>
                  <li>• Unlimited thought leadership article publishing</li>
                  <li>• Verified company linkage verification check</li>
                  <li>• Priority ranking lists & speaking appearance cards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Progress Bar */}
      {step < 6 && (
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-3">
            <span>STEP {step - 1} OF 4</span>
            <span className="text-[#F0652E] uppercase tracking-wider">
              {step === 2 && "Executive Identity"}
              {step === 3 && "Sector Alignment"}
              {step === 4 && "Biography"}
              {step === 5 && "Company Linkage"}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden flex gap-1">
            {[2, 3, 4, 5].map((s) => (
              <div 
                key={s} 
                className={`h-full flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-gradient-to-r from-[#1D1D46] to-[#0642BA]" : "bg-gray-200 dark:bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {validationError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs rounded-xl flex items-center gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* STEP 2: Executive Identity */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-1">Executive Identity</h2>
            <p className="text-xs text-gray-500 mb-6">Enter your professional coordinates and credentials.</p>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-gray-100 dark:border-white/5 pb-6">
                {/* Profile Pic Upload */}
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Professional Headshot</span>
                  {headshotBase64 ? (
                    <div className="relative group">
                      <img src={headshotBase64} alt="Headshot Preview" className="w-20 h-20 object-cover rounded-full border-2 border-gray-250 dark:border-white/10" />
                      <button 
                        type="button" 
                        onClick={() => setHeadshotBase64("")} 
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/5 border border-dashed border-gray-250 dark:border-white/10 flex items-center justify-center mb-2">
                        <User className="w-8 h-8 text-gray-300 dark:text-white/15" />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => headshotInputRef.current?.click()} 
                        className="px-3 py-1.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-[9px] font-bold rounded-xl flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" /> Upload Photo
                      </button>
                    </div>
                  )}
                  <input type="file" ref={headshotInputRef} onChange={handleHeadshotUpload} accept="image/*" className="hidden" />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="Your professional name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Work Email Address (Private)</label>
                    <input 
                      type="email" 
                      readOnly
                      value={email}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-xs text-gray-400 cursor-not-allowed focus:outline-none border-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Current Designation / Title <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="e.g. Managing Director, Chief Executive Officer"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Executive Role Level</label>
                  <select
                    value={roleLevel}
                    onChange={(e) => setRoleLevel(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none"
                  >
                    {["Founder/Owner", "C-Suite (CEO/CFO/CTO/COO)", "Director", "VP / SVP", "Senior Manager"].map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Current Company Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="Associated company name"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Company Website URL (Optional)</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="url" 
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">LinkedIn Profile URL (Optional)</label>
                <input 
                  type="url" 
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <span className="text-[10px] text-orange-600 bg-orange-500/10 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
                Free Leader Registry — Unverified
              </span>
              <button 
                onClick={handleNext}
                className="px-6 py-3 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Industry & Sector Alignment */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-1">Industry & Sector Alignment</h2>
            <p className="text-xs text-gray-500 mb-6">Index your profile to specific trade sectors and functional skills.</p>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Primary Sector <span className="text-red-500">*</span></label>
                <select 
                  value={primarySector}
                  onChange={(e) => setPrimarySector(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none"
                >
                  {SECTORS.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Secondary Sectors (Max 2) */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Secondary Industry Sectors (Optional, Max 2)</label>
                <div className="flex gap-2 mb-3">
                  <select 
                    value={tempSecondary}
                    onChange={(e) => setTempSecondary(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-medium border-none focus:outline-none"
                  >
                    <option value="">-- Select Sector --</option>
                    {SECTORS.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    onClick={addSecondarySector} 
                    className="px-4 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {secondarySectors.map((sectorId) => (
                    <span key={sectorId} className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-gray-250 dark:border-white/5">
                      {SECTORS.find(s => s.id === sectorId)?.name || sectorId}
                      <button type="button" onClick={() => setSecondarySectors(prev => prev.filter(x => x !== sectorId))} className="text-red-500 font-bold hover:text-red-700 ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience slider (no block, leaders can have any experience level) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Years of Professional Experience</span>
                  <span className="text-base font-black text-[#1D1D46] dark:text-white px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg">
                    {experienceYears} Years
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#1D1D46] dark:accent-[#F0652E]"
                />
              </div>

              {/* Functional Expertise (Max 5) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Functional Expertise (Max 5)</label>
                  <span className="text-[10px] font-bold text-gray-400">Chips: {functionalExpertise.length} / 5</span>
                </div>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addExpertise(); } }}
                    className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border border-transparent"
                    placeholder="e.g. International Logistics, P&L Management (Press Enter)"
                  />
                  <button 
                    type="button" 
                    onClick={addExpertise} 
                    className="px-4 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {functionalExpertise.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-gray-200 dark:border-white/5">
                      {tag}
                      <button type="button" onClick={() => setFunctionalExpertise(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 font-bold hover:text-red-700 ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={handleBack}
                className="px-4 py-2 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button 
                onClick={handleNext}
                className="px-6 py-3 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Biography */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-1">Professional Biography & Timeline</h2>
            <p className="text-xs text-gray-500 mb-6">Describe your leadership background and index chronological history.</p>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Executive Bio <span className="text-red-500">*</span></label>
                  <span className={`text-[10px] font-bold ${getWordCount(bio) > 500 ? "text-red-500" : "text-gray-400"}`}>
                    Words: {getWordCount(bio)} / 500 max
                  </span>
                </div>
                <textarea 
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none resize-none border border-transparent focus:border-gray-250"
                  placeholder="Describe your leadership journey, sector expertise, key achievements, and your vision for your industry."
                />
              </div>

              {/* Career Timeline */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Career Timeline (Up to 5 entries)</label>
                  <button type="button" onClick={addTimelineEntry} className="text-[#F0652E] text-[10px] font-bold">+ Add Entry</button>
                </div>
                <div className="space-y-3">
                  {timeline.map((entry, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        <input 
                          type="text" 
                          placeholder="Company Name"
                          value={entry.company}
                          onChange={(e) => {
                            const next = [...timeline];
                            next[idx].company = e.target.value;
                            setTimeline(next);
                          }}
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Executive Role"
                          value={entry.role}
                          onChange={(e) => {
                            const next = [...timeline];
                            next[idx].role = e.target.value;
                            setTimeline(next);
                          }}
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="e.g. 2018–Present"
                          value={entry.years}
                          onChange={(e) => {
                            const next = [...timeline];
                            next[idx].years = e.target.value;
                            setTimeline(next);
                          }}
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setTimeline(prev => prev.filter((_, i) => i !== idx))}
                        className="text-red-500 font-bold hover:text-red-700 text-xs shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {timeline.length === 0 && (
                    <p className="text-[10px] text-gray-400 italic">No timeline entries added.</p>
                  )}
                </div>
              </div>

              {/* Education (Max 3) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Education Timeline (Optional, Max 3)</label>
                  <button type="button" onClick={addEducationEntry} className="text-[#F0652E] text-[10px] font-bold">+ Add Institution</button>
                </div>
                <div className="space-y-3">
                  {education.map((entry, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="grid grid-cols-3 gap-2 flex-1">
                        <input 
                          type="text" 
                          placeholder="Institution Name"
                          value={entry.institution}
                          onChange={(e) => {
                            const next = [...education];
                            next[idx].institution = e.target.value;
                            setEducation(next);
                          }}
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Degree Obtained"
                          value={entry.degree}
                          onChange={(e) => {
                            const next = [...education];
                            next[idx].degree = e.target.value;
                            setEducation(next);
                          }}
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        />
                        <input 
                          type="text" 
                          placeholder="Graduation Year"
                          value={entry.year}
                          onChange={(e) => {
                            const next = [...education];
                            next[idx].year = e.target.value;
                            setEducation(next);
                          }}
                          className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setEducation(prev => prev.filter((_, i) => i !== idx))}
                        className="text-red-500 font-bold hover:text-red-700 text-xs shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {education.length === 0 && (
                    <p className="text-[10px] text-gray-400 italic">No education details added.</p>
                  )}
                </div>
              </div>

              {/* Key Achievements (Max 3) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Key Achievements (Optional, Max 3)</label>
                  <button type="button" onClick={addAchievement} className="text-[#F0652E] text-[10px] font-bold">+ Add Achievement</button>
                </div>
                <div className="space-y-3.5">
                  {achievements.map((ach, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input 
                        type="text"
                        value={ach}
                        onChange={(e) => {
                          const next = [...achievements];
                          next[idx] = e.target.value;
                          setAchievements(next);
                        }}
                        className="flex-1 px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        placeholder={`Key Achievement statement #${idx + 1} (max 80 words)`}
                      />
                      <button 
                        type="button" 
                        onClick={() => setAchievements(prev => prev.filter((_, i) => i !== idx))}
                        className="text-red-500 font-bold hover:text-red-700 text-xs shrink-0"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Industry Philosophy / Pull Quote (Max 80 words)</label>
                <input 
                  type="text" 
                  value={philosophy}
                  onChange={(e) => setPhilosophy(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                  placeholder="e.g. Leadership is not about authority; it is about building sustainable ecosystems."
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={handleBack}
                className="px-4 py-2 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button 
                onClick={handleNext}
                className="px-6 py-3 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Company Page Linkage */}
        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-1">Company Linkage & Opinion Column</h2>
            <p className="text-xs text-gray-500 mb-6">Associate your credentials with indexed organizations and set editor preferences.</p>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Is your current company already on iGEN News?</label>
                <div className="flex gap-4 mb-4">
                  {["YES", "NO", "I don't know"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                      <input 
                        type="radio"
                        name="companyChoice"
                        checked={companyExistsChoice === opt}
                        onChange={() => setCompanyExistsChoice(opt)}
                        className="text-[#1D1D46] focus:ring-[#1D1D46]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>

                {companyExistsChoice === "YES" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2 border-t border-gray-105 dark:border-white/5 pt-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Search Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={linkedCompanyId}
                        onChange={(e) => setLinkedCompanyId(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        placeholder="Search for matching registered corporate names"
                      />
                    </div>
                  </motion.div>
                )}

                {companyExistsChoice === "NO" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-xs text-orange-700 dark:text-orange-400 space-y-2 mt-3">
                    <p className="font-bold flex items-center gap-1.5">
                      <Info className="w-4 h-4" />
                      Create a Free Company Page simultaneously
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      You can register and launch your company page simultaneously. This will automatically route you to complete the Company Registry profile after launching your personal page.
                    </p>
                  </motion.div>
                )}

                <p className="text-[10px] text-gray-400 italic mt-3 block">
                  Note: Linking to a company page on the free plan is informal — no verification tick is assigned until the company page upgrades.
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-white/5">
                <div>
                  <span className="text-xs font-bold text-[#1D1D46] dark:text-white block">Opinion Column Publishing Interest</span>
                  <span className="text-[10px] text-gray-400 leading-normal block">Opt-in to write executive thought leadership columns for IGENews.</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setInterestInWriting(!interestInWriting)}
                  className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${interestInWriting ? "bg-emerald-600" : "bg-gray-200 dark:bg-white/10"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${interestInWriting ? "translate-x-7" : "translate-x-1"}`} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={handleBack}
                className="px-4 py-2 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button 
                onClick={handleOnboardingSubmit}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg"
              >
                Launch Leader Page <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 6: Onboarding Completion Screen */}
        {step === 6 && (
          <motion.div 
            key="step6" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#122238] rounded-[32px] p-8 border border-gray-100 dark:border-white/5 shadow-2xl text-center space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D46] dark:text-white">Your Free Leader Profile is Live!</h2>
              <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
                Your portable leadership credentials and professional milestones are now cataloged on IGEN.
              </p>
            </div>

            {/* Profile Info Details Panel */}
            <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl max-w-lg mx-auto border border-gray-100 dark:border-transparent text-left space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Badge status</span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider">
                  <Star className="w-2.5 h-2.5 fill-white text-white" /> FREE MEMBER
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal mt-1 block">
                Your profile carries the orange <strong>FREE MEMBER</strong> badge. Upgrade to unlock the verified leader Blue Tick.
              </p>
              
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Portability Principle</span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  This page belongs to you — it stays with you regardless of company. Update company details any time.
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Profile listing status</span>
                <span className="text-[10px] font-extrabold text-[#F0652E] bg-orange-500/10 px-2 py-0.5 rounded uppercase">
                  Free & Unverified Profile
                </span>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Public Profile URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={publicUrl}
                    className="flex-1 bg-white dark:bg-[#122238] px-3 py-2 rounded-lg text-[10px] font-mono text-gray-500 border border-gray-150 dark:border-white/5 focus:outline-none"
                  />
                  <button 
                    onClick={copyUrl}
                    className="px-3 py-2 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm shrink-0"
                  >
                    {copiedUrl ? "Copied!" : <><Copy className="w-3 h-3" /> Copy</>}
                  </button>
                </div>
              </div>
            </div>

            {/* CTA controls */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto pt-3">
              <button 
                onClick={handleComplete}
                className="flex-1 py-3.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl shadow-lg transition-all text-center"
              >
                Go to Leader Dashboard
              </button>
              <button 
                onClick={async () => {
                  await handleComplete();
                  // Force redirect to dashboard in upgrade view
                  window.location.reload();
                }}
                className="px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-[#1D1D46] dark:bg-white/5 dark:text-white dark:hover:bg-white/10 text-xs font-bold rounded-xl transition-all text-center"
              >
                See Paid Leader Benefits
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

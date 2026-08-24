"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Check, Copy, Star, Sparkles, 
  User, Mail, Phone, Briefcase, MapPin, Globe, CheckCircle2,
  Camera, Info, Upload, AlertTriangle
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

// Predefined expertise areas per sector
const PREDEFINED_EXPERTISE: Record<string, string[]> = {
  "agriculture": ["Food Processing", "Organic Farming", "Supply Chain Logistics", "Export Subsidies", "Crop Protection"],
  "ai-cyber-security": ["Cloud Security", "AI Ethics", "Threat Detection", "Penetration Testing", "Security Architecture"],
  "biotechnology": ["Genomics", "Bioprocess Engineering", "Clinical Trials", "Regulatory Compliance", "Immunology"],
  "manufacturing": ["Supply Chain", "Export Compliance", "Quality Management", "PLI Schemes", "MSME Development"],
  "pharmaceutical": ["FDA Approvals", "API Sourcing", "Drug Safety", "Pharma Logistics", "Patent Law"],
  "banking-financial": ["Risk Management", "Investment Banking", "Trade Finance", "Forex Strategy", "Wealth Management"],
  "logistics-supply": ["Cold Chain", "Customs Clearance", "Last-Mile Delivery", "Freight Forwarding", "Warehouse Automation"],
  "technology": ["SaaS Architecture", "AI/ML Integration", "Enterprise Software", "Digital Transformation", "IT Governance"],
};

const DEFAULT_EXPERTISE = ["Trade Operations", "Market Entry Strategy", "Regulatory Compliance", "Business Development", "Capacity Building"];

// Location Options
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

export default function SmeOnboarding() {
  const { user, updateOnboarding } = useAuth();
  
  // Set initial step to 2 because step 1 (Account Creation) is completed at basic registration.
  const [step, setStep] = useState(2);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Profile Image reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Step 2 States (Personal & Professional Identity) ---
  const [fullName, setFullName] = useState(user?.name || "");
  const [profilePic, setProfilePic] = useState<string>("");
  const [designation, setDesignation] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("Mumbai");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // --- Step 3 States (Experience & Expertise Declaration) ---
  const [experienceYears, setExperienceYears] = useState<number>(20);
  const [primarySector, setPrimarySector] = useState("manufacturing");
  const [secondarySectors, setSecondarySectors] = useState<string[]>([]);
  const [expertiseTags, setExpertiseTags] = useState<string[]>([]);
  const [roleTypes, setRoleTypes] = useState<string[]>(["Consultant"]);

  // --- Step 4 States (Professional Biography) ---
  const [bio, setBio] = useState("");
  const [milestones, setMilestones] = useState<string[]>(["", "", ""]);
  const [philosophy, setPhilosophy] = useState("");
  const [recognition, setRecognition] = useState("");

  // --- Step 5 States (Content & Consulting Preferences) ---
  const [followSectors, setFollowSectors] = useState<string[]>([]);
  const [countriesInterest, setCountriesInterest] = useState<string[]>(["India"]);
  const [newCountry, setNewCountry] = useState("");
  const [consultingAvailable, setConsultingAvailable] = useState(false);
  const [consultingAreas, setConsultingAreas] = useState<string[]>([]);
  const [newConsultingArea, setNewConsultingArea] = useState("");
  const [consultingMode, setConsultingMode] = useState<"Online" | "In-Person" | "Both">("Online");
  const [articleWritingInterest, setArticleWritingInterest] = useState(false);
  const [articleTopics, setArticleTopics] = useState<string[]>([]);
  const [newArticleTopic, setNewArticleTopic] = useState("");

  // Load existing user details on mount
  useEffect(() => {
    if (user) {
      if (user.name && !fullName) setFullName(user.name);
      if (user.sectors && user.sectors.length > 0 && followSectors.length === 0) {
        setFollowSectors(user.sectors);
      }
      if (user.countries && user.countries.length > 0 && countriesInterest.length <= 1) {
        setCountriesInterest(user.countries);
      }
    }
  }, [user]);

  // Adjust State & City lists when Country changes
  useEffect(() => {
    const stateList = STATES[country] || [];
    if (stateList.length > 0) {
      setState(stateList[0]);
    } else {
      setState("");
      setCity("");
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      const cityList = CITIES[state] || [];
      if (cityList.length > 0) {
        setCity(cityList[0]);
      } else {
        setCity("");
      }
    } else {
      setCity("");
    }
  }, [state]);

  if (!user) return null;

  const username = user.email.split("@")[0];
  const publicUrl = `www.indiaglobalnews.com/sme/${username}`;

  // Image Upload helper
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setValidationError("Profile picture exceeds the maximum 2MB size limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfilePic(event.target.result as string);
        setValidationError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Word count utility
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleNext = () => {
    setValidationError(null);

    if (step === 2) {
      if (!fullName.trim()) {
        setValidationError("Full Name is required.");
        return;
      }
      if (!designation.trim()) {
        setValidationError("Current Designation / Title is required.");
        return;
      }
      if (!country || !state || !city) {
        setValidationError("Please complete your location details (Country, State, City).");
        return;
      }
    } else if (step === 3) {
      if (experienceYears < 20) {
        setValidationError("SME Pages require a minimum of 20 years of industry experience. If you have 10–19 years, please explore Associate SME.");
        return;
      }
      if (!primarySector) {
        setValidationError("Primary Sector is mandatory.");
        return;
      }
      if (roleTypes.length === 0) {
        setValidationError("Please select at least one role classification.");
        return;
      }
    } else if (step === 4) {
      if (!bio.trim()) {
        setValidationError("Biography is required.");
        return;
      }
      const bioWords = getWordCount(bio);
      if (bioWords < 10) {
        setValidationError("Your Biography should be at least 10 words.");
        return;
      }
      if (bioWords > 500) {
        setValidationError("Your Biography exceeds the maximum 500-word limit.");
        return;
      }
      
      // Career highlights validation
      const filledMilestones = milestones.filter(m => m.trim().length > 0);
      for (const m of filledMilestones) {
        if (getWordCount(m) > 100) {
          setValidationError("Each Career Highlight milestone statement must be under 100 words.");
          return;
        }
      }
      if (philosophy && getWordCount(philosophy) > 80) {
        setValidationError("Your Philosophy Quote must be under 80 words.");
        return;
      }
    } else if (step === 5) {
      if (followSectors.length < 3) {
        setValidationError("Sectors to Follow drives your personalized news feed. Please select at least 3 sectors.");
        return;
      }
      if (countriesInterest.length < 1) {
        setValidationError("Please select or add at least 1 country of interest.");
        return;
      }
      if (consultingAvailable && consultingAreas.length === 0) {
        setValidationError("Please add at least 1 Consulting Area or disable consulting availability.");
        return;
      }
      if (articleWritingInterest && articleTopics.length === 0) {
        setValidationError("Please add at least 1 Article Topic of interest or disable trade article writing.");
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setValidationError(null);
    // Min step is 2, since step 1 is bypassed.
    setStep(prev => Math.max(2, prev - 1));
  };

  const handleOnboardingSubmit = async () => {
    const locationString = `${city}, ${state}, ${country}`;
    const formData = {
      fullName,
      profilePic,
      currentDesignation: designation,
      organisation,
      location: locationString,
      city,
      state,
      country,
      linkedinUrl,
      experienceYears,
      sector: primarySector,
      secondarySectors,
      expertise: expertiseTags,
      roleTypes,
      aboutText: bio,
      milestones: milestones.filter(m => m.trim() !== ""),
      philosophy,
      recognition,
      followSectors,
      countriesInterest,
      consultingAvailable,
      consultingAreas,
      consultingMode,
      articleWritingInterest,
      articleTopics
    };

    // Save details in context
    await updateOnboarding({
      name: fullName,
      sectors: [primarySector, ...followSectors].slice(0, 10),
      countries: countriesInterest,
      onboardingForm: formData,
      onboardingStatus: "Draft" // remains draft until final submission
    });

    setStep(6);
  };

  const handleComplete = async () => {
    await updateOnboarding({
      onboardingStatus: "Approved",
      accountType: "sme",
      onboardingRole: "sme",
      smePlan: "free"
    });
  };

  // Chips manipulation helpers
  const handleToggleSecondarySector = (sectorId: string) => {
    if (secondarySectors.includes(sectorId)) {
      setSecondarySectors(prev => prev.filter(id => id !== sectorId));
    } else {
      if (secondarySectors.length >= 2) {
        setValidationError("You can select up to 2 secondary sectors only.");
        return;
      }
      setSecondarySectors(prev => [...prev, sectorId]);
    }
  };

  const handleToggleExpertiseTag = (tag: string) => {
    if (expertiseTags.includes(tag)) {
      setExpertiseTags(prev => prev.filter(t => t !== tag));
    } else {
      if (expertiseTags.length >= 5) {
        setValidationError("You can select up to 5 expertise areas.");
        return;
      }
      setExpertiseTags(prev => [...prev, tag]);
    }
  };

  const handleToggleRoleType = (role: string) => {
    if (roleTypes.includes(role)) {
      setRoleTypes(prev => prev.filter(r => r !== role));
    } else {
      setRoleTypes(prev => [...prev, role]);
    }
  };

  const handleAddConsultingArea = () => {
    if (newConsultingArea.trim()) {
      if (consultingAreas.length >= 3) {
        setValidationError("You can add up to 3 consulting areas.");
        return;
      }
      if (!consultingAreas.includes(newConsultingArea.trim())) {
        setConsultingAreas(prev => [...prev, newConsultingArea.trim()]);
      }
      setNewConsultingArea("");
    }
  };

  const handleAddArticleTopic = () => {
    if (newArticleTopic.trim()) {
      if (articleTopics.length >= 3) {
        setValidationError("You can add up to 3 article topics.");
        return;
      }
      if (!articleTopics.includes(newArticleTopic.trim())) {
        setArticleTopics(prev => [...prev, newArticleTopic.trim()]);
      }
      setNewArticleTopic("");
    }
  };

  const handleAddCountry = () => {
    if (newCountry.trim()) {
      if (!countriesInterest.includes(newCountry.trim())) {
        setCountriesInterest(prev => [...prev, newCountry.trim()]);
      }
      setNewCountry("");
    }
  };

  const toggleFollowSector = (sectorId: string) => {
    if (followSectors.includes(sectorId)) {
      setFollowSectors(prev => prev.filter(s => s !== sectorId));
    } else {
      setFollowSectors(prev => [...prev, sectorId]);
    }
  };

  // Grab predefined expertise list based on primary sector
  const currentPredefinedExpertise = PREDEFINED_EXPERTISE[primarySector] || DEFAULT_EXPERTISE;

  // Header progress description mapping
  const stepProgressText = (s: number) => {
    switch(s) {
      case 2: return "Identity Setup";
      case 3: return "Experience & Expertise";
      case 4: return "Professional Biography";
      case 5: return "Preferences";
      default: return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Title & Criteria Header (Always show details of criteria on onboarding process) */}
      {step < 6 && (
        <div className="mb-8 p-6 bg-gradient-to-br from-[#1D1D46]/5 to-[#0642BA]/10 border border-[#1D1D46]/15 dark:border-white/5 rounded-3xl flex items-start gap-4">
          <Info className="w-6 h-6 text-[#C55A11] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#1D1D46] dark:text-white uppercase tracking-wide">
              iGEN Subject Matter Expert (SME) - Criteria & Information
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Subject Matter Experts are vetted trade leaders, advisors, or researchers with a **minimum of 20 years** of documented industry experience. 
              On the **FREE Plan**, you create a self-declared expert profile. Your profile will display the orange **FREE MEMBER** badge. 
              No document verification is required for the free plan, but verification checks are enforced upon upgrading.
            </p>
          </div>
        </div>
      )}

      {/* Step Progress Bar */}
      {step < 6 && (
        <div className="mb-10">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400 mb-3">
            <span>STEP {step - 1} OF 4</span>
            <span className="text-[#C55A11] uppercase tracking-widest font-black">
              {stepProgressText(step)}
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

      {/* Inline Errors */}
      {validationError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs rounded-2xl flex items-start gap-2.5 font-semibold">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Wizard Step Render */}
      <div className="relative">
        
        {/* STEP 2: Personal & Professional Identity */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white font-display">Personal & Professional Identity</h2>
              <p className="text-xs text-gray-400 mt-1">Please provide your professional record details to display on your expert profile.</p>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              {/* Photo Upload Widget */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-2 border-b border-gray-100 dark:border-white/5">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner">
                    {profilePic ? (
                      <img src={profilePic} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
                <div className="text-center sm:text-left space-y-1.5">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300 block">Profile Avatar Image</span>
                  <p className="text-[10px] text-gray-400 leading-normal max-w-xs">
                    Upload a high-quality JPG/PNG format photo. Maximum 2MB. Image will be formatted to standard 200x200px web display.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5 rounded-lg text-[10px] font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5"
                  >
                    <Upload className="w-3 h-3" /> Select File
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Full Name (as per professional records)</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                    placeholder="Your legal/professional name"
                  />
                </div>
              </div>

              {/* Designation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Current Designation / Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                      placeholder="e.g. Chief Trade Advisor, Export Consultant"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Current Organisation / Company (Optional)</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      value={organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                      placeholder="e.g. Global Advisory Group, Self-Employed"
                    />
                  </div>
                </div>
              </div>

              {/* Location Selectors (City, State, Country dropdowns) */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Location Coordinates</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-gray-400 block mb-1">Country</span>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                    >
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-gray-400 block mb-1">State / Province</span>
                    {STATES[country] ? (
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                      >
                        {STATES[country].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        value={state} 
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        placeholder="State"
                      />
                    )}
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-gray-400 block mb-1">City</span>
                    {CITIES[state] ? (
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                      >
                        {CITIES[state].map(ci => <option key={ci} value={ci}>{ci}</option>)}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        placeholder="City"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* LinkedIn Link */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">LinkedIn Profile URL (Optional)</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="url" 
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                    placeholder="e.g. https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center mt-8">
              <button 
                onClick={handleNext}
                className="px-8 py-3.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Experience & Expertise Declaration */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white">Experience & Expertise Declaration</h2>
              <p className="text-xs text-gray-400 mt-1">IGEN policies enforce experience thresholds to maintain professional commentary authority.</p>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              {/* Experience slider */}
              <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Years of Industry Experience</span>
                    <span className="text-[10px] text-red-500 font-bold">Mandatory: 20+ Years</span>
                  </div>
                  <span className={`text-base font-black px-4 py-1.5 rounded-xl ${experienceYears >= 20 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400"}`}>
                    {experienceYears} Years
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="45" 
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1D1D46] dark:accent-[#C55A11]"
                />
                {experienceYears < 20 && (
                  <p className="text-[11px] text-red-500 font-bold mt-3 leading-relaxed flex items-start gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span>SME Pages require a minimum of 20 years of industry experience. If you have 10–19 years, please explore Associate SME.</span>
                  </p>
                )}
              </div>

              {/* Sectors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Primary Sector</label>
                  <select 
                    value={primarySector}
                    onChange={(e) => {
                      setPrimarySector(e.target.value);
                      setExpertiseTags([]); // Reset expertise when sector changes
                    }}
                    className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                  >
                    {SECTORS.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Secondary Sectors (Optional - Select up to 2)</label>
                  <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 border border-gray-100 dark:border-white/5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl">
                    {SECTORS.filter(s => s.id !== primarySector).map((s) => {
                      const selected = secondarySectors.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => handleToggleSecondarySector(s.id)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                            selected 
                              ? "bg-[#1D1D46] text-white border-[#1D1D46]" 
                              : "bg-white dark:bg-[#122238] text-gray-500 border-gray-200 dark:border-white/5 hover:border-gray-300"
                          }`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Areas of Expertise Predefined List */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Areas of Expertise (Select up to 5)
                  </label>
                  <span className="text-[10px] font-bold text-gray-400">
                    {expertiseTags.length} / 5 selected
                  </span>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent space-y-3">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">Suggested from {SECTORS.find(s => s.id === primarySector)?.name}:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentPredefinedExpertise.map((tag) => {
                      const active = expertiseTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleToggleExpertiseTag(tag)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                            active
                              ? "bg-[#C55A11] border-[#C55A11] text-white shadow-sm"
                              : "bg-white dark:bg-[#122238] border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300 hover:border-gray-300"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Current Role Classification Checkboxes */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Current Role Type (Check all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {["Consultant", "Advisor", "Practitioner", "Retired Expert", "Academic"].map((r) => {
                    const checked = roleTypes.includes(r);
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleToggleRoleType(r)}
                        className={`px-3 py-3 text-xs font-bold rounded-xl border text-center transition-all ${
                          checked
                            ? "border-[#1D1D46] dark:border-[#0642BA] bg-[#1D1D46]/5 dark:bg-[#0642BA]/15 text-[#1D1D46] dark:text-white"
                            : "border-gray-200 dark:border-white/5 bg-[#f4f7fb] dark:bg-white/5 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${checked ? "bg-[#1D1D46] dark:bg-[#0642BA] border-transparent" : "border-gray-400 bg-white"}`}>
                            {checked && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <span>{r}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={handleBack}
                className="px-5 py-3 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button 
                onClick={handleNext}
                disabled={experienceYears < 20}
                className={`px-8 py-3.5 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors ${experienceYears >= 20 ? "bg-[#1D1D46] hover:bg-[#0642BA]" : "bg-gray-300 dark:bg-white/10 text-gray-400 cursor-not-allowed"}`}
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Professional Biography */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white">Professional Biography</h2>
              <p className="text-xs text-gray-400 mt-1">Introduce your expertise, career highlights, and philosophy to readers and companies.</p>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              {/* About Bio Text Area */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Biography Summary (Max 500 words)
                  </label>
                  <span className={`text-[10px] font-bold ${getWordCount(bio) > 500 ? "text-red-500" : "text-gray-400"}`}>
                    {getWordCount(bio)} / 500 words
                  </span>
                </div>
                <textarea 
                  rows={6}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none resize-none border-none focus:ring-1 focus:ring-[#1D1D46]"
                  placeholder="Describe your industry journey, key achievements, sectors you have worked in, and the expertise you bring to iGEN."
                />
              </div>

              {/* Career Highlights (3 Milestone Statements, max 100 words each) */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Career Highlights (Provide up to 3 milestone statements, max 100 words each)
                </label>
                <div className="space-y-4">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-gray-400">
                        <span>Milestone #{idx + 1}</span>
                        <span className={getWordCount(m) > 100 ? "text-red-500 font-bold" : ""}>
                          {getWordCount(m)} / 100 words
                        </span>
                      </div>
                      <input 
                        type="text"
                        value={m}
                        onChange={(e) => {
                          const next = [...milestones];
                          next[idx] = e.target.value;
                          setMilestones(next);
                        }}
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                        placeholder={`e.g. Led export strategy for [Company] — grew EXIM revenue from INR 50 Cr to INR 300 Cr in 5 years`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Recognition */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Industry Recognition (Awards, government recognition, or notable memberships)</label>
                <textarea 
                  rows={3}
                  value={recognition}
                  onChange={(e) => setRecognition(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none resize-none border-none focus:ring-1 focus:ring-[#1D1D46]"
                  placeholder="e.g. Recipient of Export Excellence Award 2022, Member of Federation of Indian Export Organisations (FIEO)..."
                />
              </div>

              {/* Philosophy / Quote */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Philosophy / Quote (Max 80 words)
                  </label>
                  <span className={`text-[10px] font-bold ${getWordCount(philosophy) > 80 ? "text-red-500" : "text-gray-400"}`}>
                    {getWordCount(philosophy)} / 80 words
                  </span>
                </div>
                <input 
                  type="text" 
                  value={philosophy}
                  onChange={(e) => setPhilosophy(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                  placeholder="e.g. 'Integrity in trade logistics yields sustainability over rapid gains.'"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={handleBack}
                className="px-5 py-3 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button 
                onClick={handleNext}
                className="px-8 py-3.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Content & Consulting Preferences */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white font-display">Content & Consulting Preferences</h2>
              <p className="text-xs text-gray-400 mt-1">Configure your reading feed, countries of focus, and consulting inquiries setup.</p>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              {/* Sectors to Follow (min 3) */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Sectors to Follow for Feed (Select at least 3)
                  </label>
                  <span className="text-[10px] font-bold text-gray-400">{followSectors.length} selected</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 border border-gray-100 dark:border-white/5 rounded-xl bg-[#f4f7fb]/50 dark:bg-white/5">
                  {SECTORS.map((s) => {
                    const followed = followSectors.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleFollowSector(s.id)}
                        className={`px-3 py-2.5 text-[10px] font-bold rounded-lg border transition-all text-left truncate flex items-center justify-between ${
                          followed 
                            ? "border-[#1D1D46] bg-[#1D1D46] text-white" 
                            : "border-gray-200 bg-white dark:bg-[#122238] text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        <span>{s.name}</span>
                        {followed && <Check className="w-3 h-3 text-white shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Countries of Interest (min 1) */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Countries of Interest (At least 1 mandatory)</label>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                    placeholder="Type country name and press Add (e.g. Germany, UAE)"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddCountry} 
                    className="px-5 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl shadow transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {countriesInterest.map((c) => (
                    <span key={c} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-gray-200 dark:border-transparent">
                      {c}
                      <button 
                        type="button" 
                        onClick={() => setCountriesInterest(prev => prev.filter(x => x !== c))} 
                        className="text-red-500 hover:text-red-700 font-bold text-sm ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Consulting availability */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#1D1D46] dark:text-white block">Open to Consulting Inquiries</span>
                    <span className="text-[10px] text-gray-400 leading-normal block">Displays a 'Consulting Available' status indicator badge on your profile.</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setConsultingAvailable(!consultingAvailable)}
                    className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${consultingAvailable ? "bg-emerald-600" : "bg-gray-200 dark:bg-white/10"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${consultingAvailable ? "translate-x-7" : "translate-x-1"}`} />
                  </button>
                </div>

                {consultingAvailable && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    className="pl-4 border-l-2 border-emerald-500/30 space-y-4 pt-1"
                  >
                    <div className="p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl flex items-start gap-2 text-[10px] text-amber-700 dark:text-amber-400 leading-normal font-semibold">
                      <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-[#F0652E]" />
                      <span>Note: Consulting rate setting, calendars, and payment bookings require a Paid SME Plan. Free members show the availability status indicator only.</span>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Consulting Expertise Areas (Up to 3)</span>
                      <div className="flex gap-2 mb-2">
                        <input 
                          type="text" 
                          value={newConsultingArea}
                          onChange={(e) => setNewConsultingArea(e.target.value)}
                          className="flex-1 px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                          placeholder="e.g. Customs Audits, Tariff Compliance"
                        />
                        <button type="button" onClick={handleAddConsultingArea} className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-lg">Add</button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {consultingAreas.map((area, idx) => (
                          <span key={idx} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded border border-emerald-100 dark:border-transparent flex items-center gap-1">
                            {area}
                            <button type="button" onClick={() => setConsultingAreas(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 font-bold hover:text-red-700 text-xs font-mono ml-0.5">×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Preferred Mode</span>
                      <div className="flex gap-2">
                        {(["Online", "In-Person", "Both"] as const).map(mode => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setConsultingMode(mode)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${consultingMode === mode ? "bg-[#1D1D46] border-[#1D1D46] text-white" : "bg-white dark:bg-[#122238] border-gray-200 dark:border-white/5 text-gray-500"}`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Article writing interest */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#1D1D46] dark:text-white block">Interested in Article Publishing</span>
                    <span className="text-[10px] text-gray-400 leading-normal block">Publish thought leadership articles to the iGEN community directory.</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setArticleWritingInterest(!articleWritingInterest)}
                    className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${articleWritingInterest ? "bg-emerald-600" : "bg-gray-200 dark:bg-white/10"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${articleWritingInterest ? "translate-x-7" : "translate-x-1"}`} />
                  </button>
                </div>

                {articleWritingInterest && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    className="pl-4 border-l-2 border-emerald-500/30 space-y-3 pt-1"
                  >
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Target Topics (Up to 3)</span>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newArticleTopic}
                        onChange={(e) => setNewArticleTopic(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        placeholder="e.g. Export incentives, Indo-EU FTA"
                      />
                      <button type="button" onClick={handleAddArticleTopic} className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-lg">Add</button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {articleTopics.map((topic, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#1D1D46]/5 dark:bg-white/5 text-[#1D1D46] dark:text-gray-300 text-xs font-medium rounded border border-[#1D1D46]/10 dark:border-transparent flex items-center gap-1">
                          {topic}
                          <button type="button" onClick={() => setArticleTopics(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 font-bold hover:text-red-700 text-xs font-mono ml-0.5">×</button>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={handleBack}
                className="px-5 py-3 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button 
                onClick={handleOnboardingSubmit}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                Finish & Go Live <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Onboarding Completion Screen */}
        {step === 6 && (
          <div className="bg-white dark:bg-[#122238] rounded-[32px] p-8 border border-gray-100 dark:border-white/5 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D46] dark:text-white font-display">Your Free SME Profile is Live!</h2>
              <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
                Congratulations! Your expert biography, primary sectors, and credentials have been indexed in iGEN directories.
              </p>
            </div>

            {/* Profile Info Details Panel */}
            <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl max-w-md mx-auto border border-gray-100 dark:border-transparent text-left space-y-3.5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Badge Status</span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider">
                  <Star className="w-2.5 h-2.5 fill-white text-white" /> FREE MEMBER
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal">
                Your profile carries the **FREE MEMBER** badge. Upgrade to get the Verified SME Blue Tick — which requires document verification.
              </p>
              
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Profile status</span>
                <span className="text-[10px] font-extrabold text-[#C55A11] bg-[#C55A11]/10 px-2 py-0.5 rounded">
                  Free & Unverified — Self-Declared Profile
                </span>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Public Profile Link</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={publicUrl}
                    className="flex-1 bg-white dark:bg-[#122238] px-3 py-2 rounded-lg text-[10px] font-mono text-gray-500 border border-gray-200 dark:border-white/5 focus:outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    {copiedUrl ? "Copied!" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </div>
            </div>

            {/* Plan comparison card */}
            <div className="bg-gradient-to-br from-[#1D1D46]/5 to-[#0642BA]/10 border border-[#1D1D46]/15 dark:border-white/5 rounded-2xl max-w-md mx-auto p-5 text-left space-y-3.5">
              <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F0652E]" /> Compare Benefits & Unlock Blue Tick
              </h4>
              <ul className="text-[10px] text-gray-600 dark:text-gray-400 space-y-2 leading-normal">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span><strong>Free Member:</strong> 2 published articles/mo, standard search ranking, basic directories.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span><strong>Paid SME Pro/Elite:</strong> Unlimited articles, priority index ranking, bookable consulting inquiries, blue verified checkmark.</span>
                </li>
              </ul>
            </div>

            {/* CTA controls */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto pt-2.5">
              <button 
                onClick={handleComplete}
                className="flex-1 py-3 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl shadow-lg transition-colors text-center"
              >
                Go to My SME Dashboard
              </button>
              <button 
                onClick={async () => {
                  await handleComplete();
                  // Redirect to upgrade page
                  window.location.href = `./sme?tab=upgrade`; 
                }}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-[#1D1D46] dark:bg-white/5 dark:text-white text-xs font-bold rounded-xl transition-colors text-center"
              >
                See Paid SME Benefits
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

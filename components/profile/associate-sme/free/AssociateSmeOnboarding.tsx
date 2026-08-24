"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Check, Copy, Star, Sparkles, 
  User, Mail, Phone, Briefcase, MapPin, Globe, CheckCircle2,
  Camera, Info, Upload, AlertTriangle, ChevronDown, Award
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

export default function AssociateSmeOnboarding() {
  const { user, updateOnboarding } = useAuth();
  
  // Start directly at Step 2 (Account creation step 1 bypassed)
  const [step, setStep] = useState(2);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedAffiliate, setCopiedAffiliate] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showProductsGrid, setShowProductsGrid] = useState(false);

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

  // --- Step 3 States (Experience Declaration) ---
  const [experienceYears, setExperienceYears] = useState<number>(12);
  const [primarySector, setPrimarySector] = useState("manufacturing");
  const [secondarySector, setSecondarySector] = useState("");
  const [expertiseTags, setExpertiseTags] = useState<string[]>([]);
  const [newExpertise, setNewExpertise] = useState("");

  // --- Step 4 States (Professional Biography) ---
  const [bio, setBio] = useState("");
  const [milestones, setMilestones] = useState<string[]>(["", ""]);
  const [roleFocus, setRoleFocus] = useState("");

  // --- Step 5 States (Content & Affiliate Preferences) ---
  const [followSectors, setFollowSectors] = useState<string[]>([]);
  const [countriesInterest, setCountriesInterest] = useState<string[]>(["India"]);
  const [newCountry, setNewCountry] = useState("");
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

  // Adjust Location dropdown lists
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
  const publicUrl = `www.indiaglobalnews.com/associate-sme/${username}`;
  const affiliateLink = `https://igenews.com/ref?code=associate_${user.id || "007"}`;

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

  // Word count helper
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
        setValidationError("Current Designation is required.");
        return;
      }
      if (!country || !state || !city) {
        setValidationError("Please complete your location details (Country, State, City).");
        return;
      }
    } else if (step === 3) {
      if (experienceYears < 10) {
        setValidationError("Associate SME requires minimum 10 years of experience. Please explore Reader plans.");
        return;
      }
      if (experienceYears > 20) {
        setValidationError("You have 20+ years. You qualify for full SME. Would you like to register as SME instead? Please redirect or adjust your experience.");
        return;
      }
      if (!primarySector) {
        setValidationError("Primary Sector is mandatory.");
        return;
      }
    } else if (step === 4) {
      if (!bio.trim()) {
        setValidationError("Biography summary is required.");
        return;
      }
      const bioWords = getWordCount(bio);
      if (bioWords < 10) {
        setValidationError("Your Biography should be at least 10 words.");
        return;
      }
      if (bioWords > 400) {
        setValidationError("Your Biography exceeds the maximum 400-word limit.");
        return;
      }
      
      const filledMilestones = milestones.filter(m => m.trim().length > 0);
      for (const m of filledMilestones) {
        if (getWordCount(m) > 80) {
          setValidationError("Each Career Highlight statement must be under 80 words.");
          return;
        }
      }
      if (roleFocus && getWordCount(roleFocus) > 100) {
        setValidationError("Your Current Role Focus statement must be under 100 words.");
        return;
      }
    } else if (step === 5) {
      if (followSectors.length < 3) {
        setValidationError("Sectors to Follow drives your feed. Please select at least 3 sectors.");
        return;
      }
      if (countriesInterest.length < 1) {
        setValidationError("Please select or add at least 1 country of interest.");
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
      secondarySector,
      expertise: expertiseTags,
      aboutText: bio,
      milestones: milestones.filter(m => m.trim() !== ""),
      roleFocus,
      followSectors,
      countriesInterest,
      articleWritingInterest,
      articleTopics,
      affiliateLink
    };

    // Save details in context
    await updateOnboarding({
      name: fullName,
      sectors: [primarySector, ...followSectors].slice(0, 10),
      countries: countriesInterest,
      onboardingForm: formData,
      onboardingStatus: "Draft"
    });

    setStep(6);
  };

  const handleComplete = async () => {
    await updateOnboarding({
      onboardingStatus: "Approved",
      accountType: "associate-sme",
      onboardingRole: "associate-sme",
      associateSmePlan: "free"
    });
  };

  const handleToggleExpertiseTag = (tag: string) => {
    if (expertiseTags.includes(tag)) {
      setExpertiseTags(prev => prev.filter(t => t !== tag));
    } else {
      if (expertiseTags.length >= 3) {
        setValidationError("You can select up to 3 expertise areas (Free Plan Limit).");
        return;
      }
      setExpertiseTags(prev => [...prev, tag]);
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

  const handleAddArticleTopic = () => {
    if (newArticleTopic.trim()) {
      if (articleTopics.length >= 2) {
        setValidationError("You can add up to 2 article topics (Free Plan Limit).");
        return;
      }
      if (!articleTopics.includes(newArticleTopic.trim())) {
        setArticleTopics(prev => [...prev, newArticleTopic.trim()]);
      }
      setNewArticleTopic("");
    }
  };

  const toggleFollowSector = (sectorId: string) => {
    if (followSectors.includes(sectorId)) {
      setFollowSectors(prev => prev.filter(s => s !== sectorId));
    } else {
      setFollowSectors(prev => [...prev, sectorId]);
    }
  };

  const currentPredefinedExpertise = PREDEFINED_EXPERTISE[primarySector] || DEFAULT_EXPERTISE;

  const stepProgressText = (s: number) => {
    switch(s) {
      case 2: return "Identity Setup";
      case 3: return "Experience & Sector";
      case 4: return "Professional Biography";
      case 5: return "Preferences & Affiliate";
      default: return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Title & Criteria Header (Mandatory Details & Earning info) */}
      {step < 6 && (
        <div className="mb-8 p-6 bg-gradient-to-br from-[#1D1D46]/5 to-[#0642BA]/10 border border-[#1D1D46]/15 dark:border-white/5 rounded-3xl space-y-4">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#C55A11] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#1D1D46] dark:text-white uppercase tracking-wide">
                iGEN Associate Subject Matter Expert (Associate SME) - Eligibility & Earnings
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Associate Subject Matter Experts represent emerging experts with **10 to 20 years** of industry experience. 
                Creating your free, self-declared profile displays the orange **FREE MEMBER** badge. 
                **Earning Opportunity**: Bypassing paid barriers, free Associate SMEs are instantly integrated into the iGEN Affiliate Program. Share your unique link to earn **up to 25% commission** on subscriptions, listings, and trade pass products.
              </p>
            </div>
          </div>
          
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/15 border border-emerald-100 dark:border-transparent rounded-2xl flex items-center gap-2 text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Earn up to 25% product commission from 10 iGEN products! See details in Step 4.</span>
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

      {/* Steps Render */}
      <div className="relative">
        
        {/* STEP 2: Personal & Professional Identity */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white font-display">Personal & Professional Identity</h2>
              <p className="text-xs text-gray-400 mt-1">Provide your professional credentials to build your initial expert page.</p>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              {/* Photo uploader */}
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
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300 block">Associate SME Profile Picture</span>
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
                      placeholder="e.g. Procurement Specialist, Import Manager"
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
                      placeholder="e.g. India Exporters Ltd, Self-Employed"
                    />
                  </div>
                </div>
              </div>

              {/* Location Selectors */}
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

              {/* LinkedIn */}
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

            <div className="flex justify-end mt-8">
              <button 
                onClick={handleNext}
                className="px-8 py-3.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Experience Declaration */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white font-display">Experience & Sector Declaration</h2>
              <p className="text-xs text-gray-400 mt-1">Associate Subject Matter Experts must possess 10 to 20 years of active experience.</p>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              {/* Slider experience */}
              <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-transparent">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Years of Industry Experience</span>
                    <span className="text-[10px] text-amber-500 font-bold block">Required Range: 10–20 Years</span>
                  </div>
                  <span className={`text-base font-black px-4 py-1.5 rounded-xl ${experienceYears >= 10 && experienceYears <= 20 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400"}`}>
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

                {experienceYears < 10 && (
                  <p className="text-[11px] text-red-500 font-bold mt-3 leading-relaxed flex items-start gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span>Associate SME requires minimum 10 years. Explore Reader plans.</span>
                  </p>
                )}

                {experienceYears > 20 && (
                  <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-4 mt-4 space-y-2">
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 font-bold leading-relaxed flex items-start gap-1">
                      <Sparkles className="w-4 h-4 text-[#F0652E] shrink-0 mt-0.5 animate-pulse" />
                      <span>You have declared 20+ years of experience! You qualify for full SME. Would you like to register as SME instead?</span>
                    </p>
                    <button 
                      type="button" 
                      onClick={() => window.location.href = `./sme`}
                      className="px-4 py-2 bg-[#C55A11] hover:bg-[#a0460a] text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow"
                    >
                      Redirect to Subject Matter Expert Plans <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Sectors selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Primary Sector</label>
                  <select 
                    value={primarySector}
                    onChange={(e) => {
                      setPrimarySector(e.target.value);
                      setExpertiseTags([]); // Reset expertise when primary sector changes
                    }}
                    className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                  >
                    {SECTORS.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Secondary Sector (Optional - Select 1)</label>
                  <select 
                    value={secondarySector}
                    onChange={(e) => setSecondarySector(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                  >
                    <option value="">None</option>
                    {SECTORS.filter(s => s.id !== primarySector).map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expertise tags (limit 3) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Areas of Expertise (Select up to 3)
                  </label>
                  <span className="text-[10px] font-bold text-gray-400">
                    {expertiseTags.length} / 3 selected
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
                disabled={experienceYears < 10 || experienceYears > 20}
                className={`px-8 py-3.5 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors ${experienceYears >= 10 && experienceYears <= 20 ? "bg-[#1D1D46] hover:bg-[#0642BA]" : "bg-gray-300 dark:bg-white/10 text-gray-400 cursor-not-allowed"}`}
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
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white font-display">Professional Biography</h2>
              <p className="text-xs text-gray-400 mt-1">Introduce your professional journey, roles, and expertise to readers.</p>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              {/* Bio summary */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Biography Summary (Max 400 words)
                  </label>
                  <span className={`text-[10px] font-bold ${getWordCount(bio) > 400 ? "text-red-500" : "text-gray-400"}`}>
                    {getWordCount(bio)} / 400 words
                  </span>
                </div>
                <textarea 
                  rows={6}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none resize-none border-none focus:ring-1 focus:ring-[#1D1D46]"
                  placeholder="Describe your professional journey, sectors you work in, and your key expertise areas."
                />
              </div>

              {/* Milestones (Max 2 for Associate SME, max 80 words each) */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Career Highlights (Provide up to 2 milestone statements, max 80 words each)
                </label>
                <div className="space-y-4">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-gray-400">
                        <span>Milestone #{idx + 1}</span>
                        <span className={getWordCount(m) > 80 ? "text-red-500 font-bold" : ""}>
                          {getWordCount(m)} / 80 words
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
                        placeholder={`e.g. Managed procurement strategy for [Company] across 15 Asian markets for 8 years`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Role Focus (Max 100 words) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Current Role Focus (Max 100 words)
                  </label>
                  <span className={`text-[10px] font-bold ${getWordCount(roleFocus) > 100 ? "text-red-500" : "text-gray-400"}`}>
                    {getWordCount(roleFocus)} / 100 words
                  </span>
                </div>
                <input 
                  type="text" 
                  value={roleFocus}
                  onChange={(e) => setRoleFocus(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                  placeholder="What work are you currently executing? (e.g. Overseeing supply chains for pharmaceutical exports)"
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

        {/* STEP 5: Content & Affiliate Preferences */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white font-display">Content & Affiliate Settings</h2>
              <p className="text-xs text-gray-400 mt-1">Configure sector follows and check your referral earning program link.</p>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              
              {/* Sectors to follow */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Sectors to Follow for Feed (Select at least 3)
                  </label>
                  <span className="text-[10px] font-bold text-gray-400">{followSectors.length} selected</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-3 border border-gray-100 dark:border-white/5 rounded-xl bg-[#f4f7fb]/50 dark:bg-white/5">
                  {SECTORS.map((s) => {
                    const followed = followSectors.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleFollowSector(s.id)}
                        className={`px-3 py-2 text-[10px] font-bold rounded-lg border transition-all text-left truncate flex items-center justify-between ${
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

              {/* Countries */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Countries of Interest (At least 1 mandatory)</label>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white border-none focus:outline-none focus:ring-1 focus:ring-[#1D1D46]"
                    placeholder="e.g. Germany, Singapore"
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
                      <button type="button" onClick={() => setCountriesInterest(prev => prev.filter(x => x !== c))} className="text-red-500 hover:text-red-700 font-bold text-sm ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Article publishing interest */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#1D1D46] dark:text-white block">Interested in Article Publishing</span>
                    <span className="text-[10px] text-gray-400 leading-normal block">Publish thought leadership articles to the iGEN community directory. (1 article/mo on Free tier).</span>
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
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Target Topics (Up to 2)</span>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newArticleTopic}
                        onChange={(e) => setNewArticleTopic(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-lg text-xs text-gray-700 dark:text-white border-none focus:outline-none"
                        placeholder="e.g. Export controls, supply chains"
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

              {/* Affiliate Program details */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-4">
                <div className="bg-gradient-to-r from-emerald-600/10 to-teal-600/5 rounded-2xl p-5 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm">
                    <Award className="w-5 h-5" />
                    <span>Become an Affiliate & Earn up to 25% Commission!</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By sharing your unique Associate SME referral code, you can earn up to **25% cash commission** (redeemed as platform credits on the free tier, and cash on paid tiers) from **all 10 iGEN products** listed below.
                  </p>

                  {/* Expandable Product Grid Drawer */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowProductsGrid(!showProductsGrid)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
                    >
                      {showProductsGrid ? "Hide 10 Affiliate Products" : "View 10 Affiliate Products & Rates"}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showProductsGrid ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {showProductsGrid && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: "auto" }} 
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden border border-emerald-500/10 rounded-xl"
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-[10px] bg-white dark:bg-[#122238]">
                              <thead>
                                <tr className="bg-emerald-600/5 text-emerald-800 dark:text-emerald-400 border-b border-emerald-500/10 font-bold">
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-2 items-center bg-white dark:bg-[#122238] p-3.5 rounded-xl border border-gray-100 dark:border-white/5">
                    <span className="text-[10px] font-mono truncate flex-1 text-gray-400">{affiliateLink}</span>
                    <button 
                      type="button"
                      onClick={copyAffiliate}
                      className="px-3.5 py-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg shadow-sm transition-colors shrink-0"
                    >
                      {copiedAffiliate ? "Copied!" : "Copy Affiliate Link"}
                    </button>
                  </div>
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
                onClick={handleOnboardingSubmit}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg"
              >
                Submit Profile Details <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Onboarding Completion Screen */}
        {step === 6 && (
          <div className="bg-white dark:bg-[#122238] rounded-[32px] p-8 border border-gray-100 dark:border-white/5 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-in fade-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D46] dark:text-white font-display">Your Free Associate SME Profile is Live!</h2>
              <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
                Congratulations! Your profile has been successfully indexed in the emerging expert registry.
              </p>
            </div>

            {/* Profile Info Details Panel */}
            <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl max-w-md mx-auto border border-gray-100 dark:border-transparent text-left space-y-3.5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Badge status</span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider">
                  <Star className="w-2.5 h-2.5 fill-white text-white" /> FREE MEMBER
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal block">
                Your profile carries the **FREE MEMBER** badge. Upgrade to get the Verified Associate SME Blue Tick.
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
                    onClick={copyUrl}
                    className="px-4 py-2 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    {copiedUrl ? "Copied!" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </div>

              {/* Affiliate Link Panel */}
              <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                <label className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block mb-1.5">Your Active Affiliate Link</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={affiliateLink}
                    className="flex-1 bg-white dark:bg-[#122238] px-3 py-2 rounded-lg text-[10px] font-mono text-gray-500 border border-gray-200 dark:border-white/5 focus:outline-none"
                  />
                  <button 
                    onClick={copyAffiliate}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    {copiedAffiliate ? "Copied!" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
                <span className="text-[9px] text-gray-400 block mt-1.5 leading-normal">
                  Your affiliate link is active. Share it. Track referral clicks, commission statistics, and balances in your dashboard.
                </span>
              </div>
            </div>

            {/* CTA controls */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto pt-2.5">
              <button 
                onClick={handleComplete}
                className="flex-1 py-3 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl shadow-lg transition-colors text-center"
              >
                Go to My Dashboard
              </button>
              <button 
                onClick={async () => {
                  await handleComplete();
                  window.location.href = `./associate-sme?tab=upgrade`; 
                }}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-[#1D1D46] dark:bg-white/5 dark:text-white text-xs font-bold rounded-xl transition-colors text-center"
              >
                See Paid Associate SME Benefits
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

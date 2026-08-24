"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Check, Copy, Star, Sparkles, 
  User, Mail, Phone, Briefcase, MapPin, Globe, CheckCircle2, Building2, Upload,
  AlertTriangle, Info, ShieldAlert, ShieldCheck
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

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

const REGIONS = ["South Asia", "Southeast Asia", "East Asia", "Middle East", "Europe", "North America", "South America", "Africa", "Australia & Oceania"];

export default function CompanyOnboarding() {
  const { user, updateOnboarding } = useAuth();
  
  // Set initial step to 2 because step 1 (Account Creation) is completed at basic registration.
  const [step, setStep] = useState(2);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Profile Assets references
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Prefilled Signatory details from logged-in user context
  const [signatoryName, setSignatoryName] = useState(user?.name || "");
  const [signatoryRole, setSignatoryRole] = useState("");
  const [signatoryEmail, setSignatoryEmail] = useState(user?.email || "");
  const [signatoryMobile, setSignatoryMobile] = useState(user?.mobile || "");

  // Step 2 states: Company Identity
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("Startup");
  const [incorporationYear, setIncorporationYear] = useState("");
  
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("Mumbai");

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  // Step 3 states: Sector & Business Profile
  const [primarySector, setPrimarySector] = useState(SECTORS[0]?.id || "manufacturing");
  const [secondarySectors, setSecondarySectors] = useState<string[]>([]);
  const [tempSecondary, setTempSecondary] = useState("");
  
  const [companyDesc, setCompanyDesc] = useState("");
  const [keyProducts, setKeyProducts] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState("");
  const [marketsServed, setMarketsServed] = useState<string[]>(["Domestic"]);
  const [marketRegions, setMarketRegions] = useState<string[]>(["South Asia"]);
  const [businessType, setBusinessType] = useState("Manufacturer");

  // Step 4 states: Assets & Socials
  const [logoBase64, setLogoBase64] = useState<string>("");
  const [coverBase64, setCoverBase64] = useState<string>("");
  const [tagline, setTagline] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  // Step 5 states: Team & Leaders
  const [linkLeadersChoice, setLinkLeadersChoice] = useState(false);
  const [leaderEmails, setLeaderEmails] = useState<string[]>([]);
  const [newLeaderEmail, setNewLeaderEmail] = useState("");

  // Prefill user coordinates if context updates
  useEffect(() => {
    if (user) {
      if (user.name && !signatoryName) setSignatoryName(user.name);
      if (user.email && !signatoryEmail) setSignatoryEmail(user.email);
      if (user.mobile && !signatoryMobile) setSignatoryMobile(user.mobile);
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

  const companySlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const publicUrl = `www.indiaglobalnews.com/company/${companySlug || "slug"}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Image upload helpers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setValidationError("Company logo file size exceeds the 2MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoBase64(event.target.result as string);
        setValidationError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setValidationError("Cover banner file size exceeds the 2MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverBase64(event.target.result as string);
        setValidationError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    setValidationError(null);

    if (step === 2) {
      if (!companyName.trim()) { setValidationError("Company Name is required."); return; }
      if (!incorporationYear.trim()) { setValidationError("Incorporation Year is required."); return; }
      const year = parseInt(incorporationYear);
      if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
        setValidationError(`Please enter a valid Incorporation Year between 1800 and ${new Date().getFullYear()}.`);
        return;
      }
      if (!signatoryRole.trim()) { setValidationError("Authorized Representative Designation is required."); return; }
      if (!country || !state || !city) { setValidationError("Headquarters location fields are required."); return; }
    } else if (step === 3) {
      if (!primarySector) { setValidationError("Primary Sector is required."); return; }
      if (!companyDesc.trim()) { setValidationError("Company Description is required."); return; }
      const words = getWordCount(companyDesc);
      if (words < 10) {
        setValidationError("Please write a company description of at least 10 words.");
        return;
      }
      if (words > 400) {
        setValidationError("Company description exceeds the maximum 400-word limit.");
        return;
      }
      if (keyProducts.length === 0) {
        setValidationError("Please specify at least 1 Key Product or Service.");
        return;
      }
      if (marketsServed.length === 0) {
        setValidationError("Please check at least one market served (Domestic and/or International).");
        return;
      }
      if (marketsServed.includes("International") && marketRegions.length === 0) {
        setValidationError("Please select at least 1 regional trade cluster for international markets.");
        return;
      }
    } else if (step === 4) {
      if (tagline && tagline.length > 80) {
        setValidationError("Brand tagline must be under 80 characters.");
        return;
      }
    } else if (step === 5) {
      if (linkLeadersChoice && leaderEmails.length === 0) {
        setValidationError("Please add at least 1 leader email invitation or toggle off linking.");
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
      signatoryName,
      signatoryRole,
      signatoryEmail,
      signatoryMobile,
      companyName,
      companyType,
      incorporationYear,
      country,
      state,
      city,
      hqLocation: `${city}, ${state}, ${country}`,
      websiteUrl,
      companyEmail,
      companyPhone,
      sector: primarySector,
      secondarySectors,
      companyDesc,
      keyProducts,
      marketsServed,
      marketRegions: marketsServed.includes("International") ? marketRegions : [],
      businessType,
      logoBase64,
      coverBase64,
      tagline,
      linkedinUrl,
      twitterUrl,
      instagramUrl,
      linkLeadersChoice,
      leaderEmails
    };

    // Save details in context
    await updateOnboarding({
      name: companyName,
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
      accountType: "company",
      onboardingRole: "company",
      companyPlan: "free"
    });
  };

  const addProduct = () => {
    if (newProduct.trim()) {
      if (keyProducts.length >= 5) {
        setValidationError("Free company plan limits listings to a maximum of 5 products or services.");
        return;
      }
      if (keyProducts.includes(newProduct.trim())) {
        setValidationError("This product/service chip has already been added.");
        return;
      }
      setKeyProducts(prev => [...prev, newProduct.trim()]);
      setNewProduct("");
      setValidationError(null);
    }
  };

  const addSecondarySector = () => {
    if (tempSecondary) {
      if (secondarySectors.length >= 2) {
        setValidationError("Free company listings support up to 2 secondary sectors max.");
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

  const addLeaderEmail = () => {
    if (newLeaderEmail.trim()) {
      if (!newLeaderEmail.includes("@")) {
        setValidationError("Please enter a valid email address.");
        return;
      }
      if (leaderEmails.length >= 2) {
        setValidationError("Free company pages support linking up to 2 leaders maximum. Upgrade for more.");
        return;
      }
      if (leaderEmails.includes(newLeaderEmail.trim())) {
        setValidationError("This leader has already been added.");
        return;
      }
      setLeaderEmails(prev => [...prev, newLeaderEmail.trim()]);
      setNewLeaderEmail("");
      setValidationError(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Criteria Rationale Header - What is the Company Page and why do they need it / upgrade */}
      {step < 6 && (
        <div className="bg-gradient-to-br from-[#1D1D46] to-[#122238] rounded-3xl p-6 md:p-8 mb-8 border border-white/10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Building2 className="w-64 h-64 text-white -mr-16 -mb-16" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F0652E] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-[#F0652E] uppercase">
                Corporate Directory Registry
              </span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold font-display leading-tight">
              Create Your Company Profile
            </h1>
            
            <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
              An IGEN Company Page serves as your official corporate footprint on the India Global News platform. It enables trade discovery, sector-level indexing, and networks your brand with bilateral trading desks, industry leaders, and global partners.
            </p>
            
            {/* Split free limitations and upgrade benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/10 mt-2">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-orange-400" /> Free Plan Coordinates
                </h4>
                <ul className="text-[11px] text-gray-300 space-y-1">
                  <li>• Listed as <strong className="text-orange-400">"Unverified Company Listing"</strong></li>
                  <li>• Limits: Up to 5 product listings & 2 informal leaders</li>
                  <li>• Basic sector search discoverability only</li>
                  <li>• No document upload required (GST, COI, PAN)</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#C55A11]/15 to-[#F0652E]/15 rounded-xl p-3 border border-[#C55A11]/20">
                <h4 className="text-[10px] font-bold text-[#F0652E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Why Upgrade to Paid?
                </h4>
                <ul className="text-[11px] text-gray-200 space-y-1">
                  <li>• Get the premium <strong className="text-blue-400">Blue Verification Tick</strong></li>
                  <li>• Publish corporate press releases (PR) to IGEN feeds</li>
                  <li>• Receive direct customer enquiries (B2B leads form)</li>
                  <li>• Access full traffic/geographical analytics & link verified leaders</li>
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
              {step === 2 && "Company Identity"}
              {step === 3 && "Sector & Business"}
              {step === 4 && "Brand Assets"}
              {step === 5 && "Leadership Links"}
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
        
        {/* STEP 2: Company Identity */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-1">Company Identity</h2>
            <p className="text-xs text-gray-500 mb-6">Enter official registration metrics and signatory credentials.</p>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              <div className="border-b border-gray-100 dark:border-white/5 pb-4 mb-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Signatory Admin Profile (Logged In)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Representative Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        readOnly
                        value={signatoryName}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-xs text-gray-500 dark:text-gray-400 cursor-not-allowed border-none focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Representative Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        readOnly
                        value={signatoryEmail}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-xs text-gray-500 dark:text-gray-400 cursor-not-allowed border-none focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Your Signatory Designation <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={signatoryRole}
                        onChange={(e) => setSignatoryRole(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border border-transparent focus:border-gray-200 dark:focus:border-white/10"
                        placeholder="e.g. Founder, CEO, Director, Authorized Admin"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Official Company Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border border-transparent focus:border-gray-200 dark:focus:border-white/10"
                    placeholder="e.g. Acme Global Logistics Pvt Ltd"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Company Type</label>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold focus:outline-none border-none cursor-pointer"
                  >
                    {["Startup", "MSME", "Large Company", "MNC", "Government Entity", "NGO / Trust"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Incorporation Year <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    value={incorporationYear}
                    onChange={(e) => setIncorporationYear(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border border-transparent focus:border-gray-200"
                    placeholder="e.g. 2018"
                  />
                </div>
              </div>

              {/* Headquarters Dropdowns */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Headquarters Location <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none"
                      disabled={!STATES[country]}
                    >
                      {(STATES[country] || []).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none"
                      disabled={!CITIES[state]}
                    >
                      {(CITIES[state] || []).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Company Website URL (Optional)</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="url" 
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border border-transparent"
                    placeholder="https://acmeglobal.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Company Official Email (Optional)</label>
                  <input 
                    type="email" 
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    placeholder="info@acmeglobal.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Company Office Phone (Optional)</label>
                  <input 
                    type="text" 
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    placeholder="+91 22 2345 6789"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <span className="text-[10px] text-orange-600 bg-orange-500/10 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
                Free Listing Registry — Unverified
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

        {/* STEP 3: Sector & Business Profile */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-1">Sector & Business Profile</h2>
            <p className="text-xs text-gray-500 mb-6">Categorize your industry focus, core products, and market reach.</p>

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
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Secondary Sectors (Optional, Max 2)</label>
                <div className="flex gap-2 mb-3">
                  <select 
                    value={tempSecondary}
                    onChange={(e) => setTempSecondary(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-medium border-none focus:outline-none"
                  >
                    <option value="">-- Choose a Sector to Add --</option>
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
                    <span 
                      key={sectorId} 
                      className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-gray-200 dark:border-white/5"
                    >
                      {SECTORS.find(s => s.id === sectorId)?.name || sectorId}
                      <button 
                        type="button" 
                        onClick={() => setSecondarySectors(prev => prev.filter(x => x !== sectorId))} 
                        className="text-red-500 font-bold hover:text-red-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Business Classification</label>
                <select 
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white font-semibold border-none focus:outline-none"
                >
                  {["Exporter", "Importer", "Manufacturer", "Service Provider", "Trader", "Investor", "Multi-business"].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Company Description <span className="text-red-500">*</span></label>
                  <span className={`text-[10px] font-bold ${getWordCount(companyDesc) > 400 ? "text-red-500" : "text-gray-400"}`}>
                    Words: {getWordCount(companyDesc)} / 400 max
                  </span>
                </div>
                <textarea 
                  rows={4}
                  value={companyDesc}
                  onChange={(e) => setCompanyDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none resize-none border border-transparent focus:border-gray-200"
                  placeholder="Summarize your company's core operations, products/services, and global markets."
                />
              </div>

              {/* Key Products / Services (Max 5) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Key Products / Services <span className="text-red-500">*</span></label>
                  <span className="text-[10px] font-bold text-gray-400">
                    Chips: {keyProducts.length} / 5 max
                  </span>
                </div>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addProduct(); } }}
                    className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border border-transparent"
                    placeholder="e.g. Export Packaging, Cold Chain Logistics (Press Enter)"
                  />
                  <button 
                    type="button" 
                    onClick={addProduct} 
                    className="px-4 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keyProducts.map((p, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-gray-200 dark:border-white/5"
                    >
                      {p}
                      <button 
                        type="button" 
                        onClick={() => setKeyProducts(prev => prev.filter((_, idx) => idx !== i))} 
                        className="text-red-500 font-bold hover:text-red-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {keyProducts.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No products added. Minimum 1 is required.</span>
                  )}
                </div>
              </div>

              {/* Markets Served */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Markets Served <span className="text-red-500">*</span></label>
                <div className="flex gap-6 mb-4">
                  {["Domestic", "International"].map((m) => (
                    <label key={m} className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={marketsServed.includes(m)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMarketsServed(prev => [...prev, m]);
                          } else {
                            setMarketsServed(prev => prev.filter(x => x !== m));
                          }
                        }}
                        className="rounded border-gray-300 text-[#1D1D46] focus:ring-[#1D1D46]"
                      />
                      {m}
                    </label>
                  ))}
                </div>

                {marketsServed.includes("International") && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2 border-t border-gray-100 dark:border-white/5 pt-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Trade Regions Served</label>
                    <div className="flex flex-wrap gap-2">
                      {REGIONS.map((r) => {
                        const isSelected = marketRegions.includes(r);
                        return (
                          <button
                            type="button"
                            key={r}
                            onClick={() => {
                              if (isSelected) {
                                setMarketRegions(prev => prev.filter(x => x !== r));
                              } else {
                                setMarketRegions(prev => [...prev, r]);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              isSelected 
                                ? "bg-[#1D1D46] text-white border-transparent"
                                : "bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/5 text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
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

        {/* STEP 4: Brand Assets */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-1">Corporate Brand Assets</h2>
            <p className="text-xs text-gray-500 mb-6">Upload public brand assets and supply key social media handles.</p>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Logo Upload */}
                <div className="p-5 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-white/5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Company Logo (Optional)</span>
                  {logoBase64 ? (
                    <div className="relative group">
                      <img src={logoBase64} alt="Company Logo Preview" className="w-20 h-20 object-cover rounded-xl border border-gray-200 dark:border-white/10" />
                      <button 
                        type="button" 
                        onClick={() => setLogoBase64("")} 
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Building2 className="w-10 h-10 text-gray-300 dark:text-white/10 mb-2" />
                      <button 
                        type="button" 
                        onClick={() => logoInputRef.current?.click()} 
                        className="px-4 py-2 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-[10px] font-bold rounded-xl flex items-center gap-1"
                      >
                        <Upload className="w-3.5 h-3.5" /> Select File
                      </button>
                      <span className="text-[9px] text-gray-400 mt-2">PNG/JPG up to 2MB. Min 200x200px.</span>
                    </div>
                  )}
                  <input type="file" ref={logoInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                </div>

                {/* Cover Banner Upload */}
                <div className="p-5 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-white/5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Cover Banner Image (Optional)</span>
                  {coverBase64 ? (
                    <div className="relative w-full">
                      <img src={coverBase64} alt="Cover Preview" className="w-full h-20 object-cover rounded-xl border border-gray-200" />
                      <button 
                        type="button" 
                        onClick={() => setCoverBase64("")} 
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Globe className="w-10 h-10 text-gray-300 dark:text-white/10 mb-2" />
                      <button 
                        type="button" 
                        onClick={() => coverInputRef.current?.click()} 
                        className="px-4 py-2 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-[10px] font-bold rounded-xl flex items-center gap-1"
                      >
                        <Upload className="w-3.5 h-3.5" /> Select File
                      </button>
                      <span className="text-[9px] text-gray-400 mt-2">Recommended: 1200x300px. Fallback to generic template.</span>
                    </div>
                  )}
                  <input type="file" ref={coverInputRef} onChange={handleCoverUpload} accept="image/*" className="hidden" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Brand Tagline (Optional)</label>
                  <span className={`text-[10px] font-bold ${tagline.length > 80 ? "text-red-500" : "text-gray-400"}`}>
                    Chars: {tagline.length} / 80 max
                  </span>
                </div>
                <input 
                  type="text" 
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                  placeholder="e.g. Empowering Global Trade with Sustainable Logistics"
                />
              </div>

              <div className="border-t border-gray-100 dark:border-white/5 pt-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Company Social Media Handles</h3>
                <div className="space-y-3.5">
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="https://linkedin.com/company/acmeglobal"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Twitter / X URL</label>
                    <input 
                      type="url" 
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="https://x.com/acmeglobal"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Instagram URL</label>
                    <input 
                      type="url" 
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="https://instagram.com/acmeglobal"
                    />
                  </div>
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

        {/* STEP 5: Team & Leaders */}
        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-1">Team & Leadership (Optional)</h2>
            <p className="text-xs text-gray-500 mb-6">Invite executive leaders or founders to connect their personal profiles to this corporate page.</p>

            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1D1D46] dark:text-white block">Do you have leaders you want to link?</span>
                  <span className="text-[10px] text-gray-400 leading-normal block">Send informal invitations to link personal Leader profiles under your Company profile.</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setLinkLeadersChoice(!linkLeadersChoice)}
                  className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${linkLeadersChoice ? "bg-emerald-600" : "bg-gray-200 dark:bg-white/10"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${linkLeadersChoice ? "translate-x-7" : "translate-x-1"}`} />
                </button>
              </div>

              {linkLeadersChoice && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                  <div className="bg-orange-500/10 rounded-2xl p-4 border border-orange-500/20 text-orange-700 dark:text-orange-400 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-4 h-4" />
                      Leader Linking Limit
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      On the <strong>Free Company Page</strong>, you can link up to <strong>2 leaders</strong>. Leader linking on the free plan is informal and does not include paid verification seals unless the company upgrades.
                    </p>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Leader Official/Work Email</label>
                    <div className="flex gap-2">
                      <input 
                        type="email" 
                        value={newLeaderEmail}
                        onChange={(e) => setNewLeaderEmail(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLeaderEmail(); } }}
                        className="flex-1 px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                        placeholder="e.g. CEO.leader@company.com"
                      />
                      <button 
                        type="button" 
                        onClick={addLeaderEmail} 
                        className="px-4 py-2.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl"
                      >
                        Invite
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {leaderEmails.map((email) => (
                      <div key={email} className="flex justify-between items-center bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 px-4 py-2.5 rounded-xl text-xs text-gray-500 font-medium">
                        <span className="text-gray-700 dark:text-gray-300">{email}</span>
                        <button 
                          type="button" 
                          onClick={() => setLeaderEmails(prev => prev.filter(x => x !== email))} 
                          className="text-red-500 font-bold hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {leaderEmails.length === 0 && (
                      <p className="text-[11px] text-gray-400 italic">No leader emails added yet.</p>
                    )}
                  </div>
                </motion.div>
              )}
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
                Launch Brand Page <Check className="w-3.5 h-3.5" />
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D46] dark:text-white">Your Free Company Profile is Live!</h2>
              <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
                Your business details, sector index, and representative credentials have been registered successfully.
              </p>
            </div>

            {/* Profile Info Details Panel */}
            <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl max-w-lg mx-auto border border-gray-100 dark:border-transparent text-left space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Badge status</span>
                <div 
                  className="flex items-center gap-1 px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded uppercase tracking-wider cursor-pointer"
                  title="Free Member — This company listing is self-declared and has not been verified by iGEN."
                >
                  <Star className="w-2.5 h-2.5 fill-white text-white" /> FREE MEMBER
                </div>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal mt-1 block">
                Your company carries the orange <strong>FREE MEMBER</strong> badge. Upgrade to get the Verified Company Blue Tick badge.
              </p>
              
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Profile Listing Status</span>
                <span className="text-[10px] font-extrabold text-[#F0652E] bg-orange-500/10 px-2 py-0.5 rounded uppercase">
                  Unverified Company Listing
                </span>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Public Company URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={publicUrl}
                    className="flex-1 bg-white dark:bg-[#122238] px-3 py-2 rounded-lg text-[10px] font-mono text-gray-500 dark:text-gray-400 border border-gray-150 dark:border-white/5 focus:outline-none"
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
                Go to Company Dashboard
              </button>
              <button 
                onClick={async () => {
                  await handleComplete();
                  // Force routing to upgrade comparison
                  window.location.reload();
                }}
                className="px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-[#1D1D46] dark:bg-white/5 dark:text-white dark:hover:bg-white/10 text-xs font-bold rounded-xl transition-all text-center"
              >
                See Paid Company Page Benefits
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

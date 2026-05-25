"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Check, Copy, Star, Sparkles, 
  User, Mail, MapPin, CheckCircle2, Upload,
  AlertTriangle, Eye, ShieldAlert, Award
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Location data
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

export default function ReaderOnboarding() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const [step, setStep] = useState(2); // Starts at Step 2 (Step 1 is already done)
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Step 2 Form States
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [avatarBase64, setAvatarBase64] = useState<string>("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("Mumbai");
  const [profession, setProfession] = useState("");
  const [organisation, setOrganisation] = useState("");

  // Location selector sync
  useEffect(() => {
    const statesList = STATES[country] || [];
    if (statesList.length > 0 && !statesList.includes(state)) {
      setState(statesList[0]);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      const citiesList = CITIES[state] || [];
      if (citiesList.length > 0 && !citiesList.includes(city)) {
        setCity(citiesList[0]);
      }
    }
  }, [state]);

  if (!user) return null;

  const username = user.email.split("@")[0];
  const publicUrl = `www.indiaglobalnews.com/reader/${username}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setValidationError("Profile picture exceeds the maximum 2MB size limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Base64 simulation representing compressed image
        setAvatarBase64(event.target.result as string);
        setValidationError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    setValidationError(null);
    if (!displayName.trim()) {
      setValidationError("Display Name is required.");
      return;
    }
    if (!profession.trim()) {
      setValidationError("Profession / Role is required.");
      return;
    }

    setStep(5); // Go to completion screen (Step 5)
  };

  const handleCompleteOnboarding = async () => {
    const formData = {
      displayName,
      avatarBase64,
      country,
      state,
      city,
      profession,
      organisation,
      readerOnboardingComplete: true
    };

    await updateOnboarding({
      name: displayName,
      countries: [country],
      onboardingForm: formData,
      onboardingRole: "none", // Reader stays on "none" or let's use it as reader
      onboardingStatus: "Approved" // Immediately approved
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 text-left">
      
      {/* Welcome Banner */}
      {step === 2 && (
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#122238] rounded-3xl p-6 md:p-8 mb-8 border border-white/10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Eye className="w-64 h-64 text-white -mr-16 -mb-16" />
          </div>
          
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F4A024] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-[#F4A024] uppercase bg-[#F4A024]/10 px-2 py-1 rounded-md">
                Step 2: Profile Setup
              </span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold font-display leading-tight">
              Complete Your Reader Profile
            </h1>
            
            <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
              You are signing up as a Free Reader — no payment required. Personalise your trade intelligence workspace, select your default display variables, and setup your reader public profile page.
            </p>
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
        {step === 2 && (
          <motion.div 
            key="step2" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-gray-100 dark:border-white/5 pb-6">
                
                {/* Profile Pic Upload */}
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Profile Picture</span>
                  {avatarBase64 ? (
                    <div className="relative group">
                      <img src={avatarBase64} alt="Avatar Preview" className="w-20 h-20 object-cover rounded-full border-2 border-gray-250 dark:border-white/10 shadow-md" />
                      <button 
                        type="button" 
                        onClick={() => setAvatarBase64("")} 
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
                        onClick={() => avatarInputRef.current?.click()} 
                        className="px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white text-[9px] font-bold rounded-xl flex items-center gap-1 shadow-sm transition-all"
                      >
                        <Upload className="w-3 h-3" /> Upload Photo
                      </button>
                    </div>
                  )}
                  <input type="file" ref={avatarInputRef} onChange={handleAvatarUpload} accept="image/png, image/jpeg" className="hidden" />
                  <span className="text-[8px] text-gray-400 mt-2 block">JPG/PNG up to 2MB (Compressed to 30KB)</span>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Display Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                      placeholder="Your Display Name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Work Email (Read Only)</label>
                    <input 
                      type="email" 
                      readOnly
                      value={user.email}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 rounded-xl text-xs text-gray-400 cursor-not-allowed border-none focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location Selectors */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Your Location <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none font-semibold"
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
                      className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none font-semibold"
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
                      className="w-full px-3 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none border-none font-semibold"
                      disabled={!CITIES[state]}
                    >
                      {(CITIES[state] || []).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Profession / Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Profession / Role <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    placeholder="e.g. Import Manager, Startup Founder, Student"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Organisation / Company (Optional)</label>
                  <input 
                    type="text" 
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none"
                    placeholder="e.g. Acme Corp, India Trade Ltd"
                  />
                </div>
              </div>

            </div>

            <div className="flex justify-end items-center mt-6">
              <button 
                onClick={handleSaveProfile}
                className="px-6 py-3 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
              >
                Continue Setup <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Onboarding Completion Screen */}
        {step === 5 && (
          <motion.div 
            key="step5" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="space-y-6 text-center max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-white/5 space-y-6 shadow-xl relative overflow-hidden">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] dark:text-white">
                  Welcome to iGEN News Platform
                </h2>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Your Free Reader Account is Active
                </p>
              </div>

              {/* Free Member badge display */}
              <div className="flex justify-center">
                <div 
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#C55A11] text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm cursor-help relative group"
                  title="Free Member — Profile Unverified. This member has not yet completed identity verification."
                >
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                  <span>FREE MEMBER</span>
                </div>
              </div>

              {/* Public URL Widget */}
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-150 dark:border-transparent space-y-2 text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Your Public Profile Link</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value={publicUrl}
                    className="flex-1 bg-white dark:bg-[#122238] px-3 py-2 rounded-xl text-xs font-mono text-gray-500 border-none focus:outline-none select-all truncate"
                  />
                  <button 
                    onClick={handleCopyUrl}
                    className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white text-xs font-bold rounded-xl flex items-center gap-1 shrink-0"
                  >
                    {copiedUrl ? "Copied!" : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </div>

              {/* Free vs Pro comparison card shown (non-blocking) */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl p-5 text-left space-y-4">
                <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#F4A024]" /> Free Plan vs Pro Plan Preview
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px] border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 uppercase text-left font-black">
                        <th className="pb-2">Feature</th>
                        <th className="pb-2 text-center">FREE</th>
                        <th className="pb-2 text-center text-[#F4A024]">PRO (Upgrade)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-white/5 text-gray-600 dark:text-gray-300">
                      <tr>
                        <td className="py-2 font-medium">Public Sector Pages</td>
                        <td className="py-2 text-center text-emerald-600 font-bold">YES</td>
                        <td className="py-2 text-center text-emerald-600 font-bold">YES</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Basic Trade Articles</td>
                        <td className="py-2 text-center text-emerald-600 font-bold">YES</td>
                        <td className="py-2 text-center text-[#F4A024] font-bold">Unlimited + Exclusive</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">SME Expert Columns</td>
                        <td className="py-2 text-center">5/month</td>
                        <td className="py-2 text-center text-[#F4A024] font-bold">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Saved / Bookmarked Articles</td>
                        <td className="py-2 text-center">Max 20</td>
                        <td className="py-2 text-center text-[#F4A024] font-bold">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Sector Reports (PDF)</td>
                        <td className="py-2 text-center text-red-500 font-bold">NO</td>
                        <td className="py-2 text-center text-emerald-600 font-bold">YES</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleCompleteOnboarding}
                  className="flex-1 py-3.5 bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white font-bold rounded-2xl shadow-md transition-colors text-xs"
                >
                  Go to My Dashboard
                </button>
                <button
                  onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                  className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-250 dark:bg-white/5 dark:hover:bg-white/10 text-[#1E3A5F] dark:text-white font-bold rounded-2xl transition-colors text-xs"
                >
                  See Pro Plan Benefits
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

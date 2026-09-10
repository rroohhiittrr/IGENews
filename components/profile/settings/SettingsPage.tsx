"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  User, Bell, Shield, Globe, Eye, EyeOff, Save, ChevronRight,
  Moon, Sun, Building2, Lock, Zap, ArrowRight, Clock, Star,
  Briefcase, FileText, Key, Share2, Clipboard,
  Mail, Phone, ShieldAlert, Check, HelpCircle, Plus, Trash2, Download
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

type SettingsTab = "account" | "interests" | "notifications" | "privacy" | "preferences" | "security" | "role" | "upgrade";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      type="button"
      className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${on ? "bg-emerald-600" : "bg-gray-200 dark:bg-white/10"}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  );
}

function Row({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-white/5 last:border-0 gap-4 text-left">
      <div>
        <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{label}</p>
        {desc && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { user, updateOnboarding } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states matching user profile
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.onboardingForm?.bio || user?.onboardingForm?.aboutText || "");
  const [designation, setDesignation] = useState(user?.onboardingForm?.currentDesignation || user?.onboardingForm?.profession || "");
  const [organisation, setOrganisation] = useState(user?.onboardingForm?.organisation || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.mobile || user?.onboardingForm?.mobile || "");
  const [linkedin, setLinkedin] = useState(user?.onboardingForm?.linkedinUrl || "");
  const [city, setCity] = useState(user?.onboardingForm?.city || "Mumbai");
  const [country, setCountry] = useState(user?.onboardingForm?.country || "India");

  // Sectors and countries
  const [userSectors, setUserSectors] = useState<string[]>(user?.sectors || ["logistics", "pharma", "manufacturing"]);
  const [userCountries, setUserCountries] = useState<string[]>(user?.countries || ["India", "UAE", "Germany"]);
  const [newSectorInput, setNewSectorInput] = useState("");
  const [newCountryInput, setNewCountryInput] = useState("");
  const [showAddSector, setShowAddSector] = useState(false);
  const [showAddCountry, setShowAddCountry] = useState(false);

  // Toggles & Preferences State
  const [notifs, setNotifs] = useState({
    digest: true,
    breaking: true,
    weekly: true,
    sectorReports: true,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showSectors: true,
    showCountries: false,
    readingHistoryPublic: false,
  });

  const [prefs, setPrefs] = useState({
    darkMode: false,
    emailDigest: true,
    language: "English",
    commentModeration: "auto",
  });

  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [smeCategory, setSmeCategory] = useState("Trade Analysis");
  const [companyLinkPrivacy, setCompanyLinkPrivacy] = useState(true);
  const [signatoryEmailInput, setSignatoryEmailInput] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.name || "");
      setEmail(user.email || "");
      if (user.onboardingForm) {
        const f = user.onboardingForm;
        setBio(f.bio || f.aboutText || "");
        setDesignation(f.currentDesignation || f.profession || "");
        setOrganisation(f.organisation || "");
        setLinkedin(f.linkedinUrl || "");
        setCity(f.city || "Mumbai");
        setCountry(f.country || "India");
      }
      if (user.sectors && user.sectors.length > 0) {
        setUserSectors(user.sectors);
      }
      if (user.countries && user.countries.length > 0) {
        setUserCountries(user.countries);
      }
    }
  }, [user]);

  // Sync dark theme with document root
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setPrefs(p => ({ ...p, darkMode: isDark }));
    }
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !prefs.darkMode;
    setPrefs(p => ({ ...p, darkMode: nextDark }));
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    triggerSuccess(`Theme changed to ${nextDark ? "Dark" : "Light"} mode`);
  };

  if (!user) return null;

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedForm = {
      ...user.onboardingForm,
      bio,
      aboutText: bio,
      currentDesignation: designation,
      profession: designation,
      organisation,
      linkedinUrl: linkedin,
      city,
      country,
      mobile,
    };

    await updateOnboarding({
      name: displayName,
      email,
      mobile,
      sectors: userSectors,
      countries: userCountries,
      onboardingForm: updatedForm,
    });
    triggerSuccess("Profile & account settings saved successfully!");
  };

  const handleAddSector = () => {
    if (!newSectorInput.trim()) return;
    const clean = newSectorInput.trim().toLowerCase();
    if (!userSectors.includes(clean)) {
      const updated = [...userSectors, clean];
      setUserSectors(updated);
      updateOnboarding({ sectors: updated });
      triggerSuccess(`Added sector: ${clean}`);
    }
    setNewSectorInput("");
    setShowAddSector(false);
  };

  const handleRemoveSector = (sec: string) => {
    const updated = userSectors.filter(s => s !== sec);
    setUserSectors(updated);
    updateOnboarding({ sectors: updated });
    triggerSuccess(`Removed sector: ${sec}`);
  };

  const handleAddCountry = () => {
    if (!newCountryInput.trim()) return;
    const clean = newCountryInput.trim();
    if (!userCountries.includes(clean)) {
      const updated = [...userCountries, clean];
      setUserCountries(updated);
      updateOnboarding({ countries: updated });
      triggerSuccess(`Added country: ${clean}`);
    }
    setNewCountryInput("");
    setShowAddCountry(false);
  };

  const handleRemoveCountry = (c: string) => {
    const updated = userCountries.filter(item => item !== c);
    setUserCountries(updated);
    updateOnboarding({ countries: updated });
    triggerSuccess(`Removed country: ${c}`);
  };

  const handleDownloadGDPR = () => {
    const data = {
      name: displayName,
      email,
      mobile,
      role: user.onboardingRole || "reader",
      sectors: userSectors,
      countries: userCountries,
      profileDetails: user.onboardingForm,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `igenews_profile_${user.id || "user"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerSuccess("GDPR Profile dump downloaded successfully!");
  };

  const handleSendOTP = () => {
    triggerSuccess(`Security password verification OTP sent to ${email}`);
  };

  const userRole = user.onboardingRole || user.accountType || "reader";

  const tabsConfig: { id: SettingsTab; icon: any; label: string }[] = [
    { id: "account", icon: User, label: "Account Customiser" },
    { id: "interests", icon: Globe, label: "Interests & Sectors" },
    { id: "notifications", icon: Bell, label: "Digests & Alerts" },
    { id: "privacy", icon: Shield, label: "Privacy Controls" },
    { id: "preferences", icon: Globe, label: "Language & Theme" },
    { id: "security", icon: Key, label: "Security & MFA" },
    { id: "role", icon: Star, label: "Role Options" },
    { id: "upgrade", icon: Zap, label: "Upgrade Plans" },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-6xl mx-auto pb-24 text-left">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <span className="px-3 py-1 bg-[#1D1D46] text-white text-[10px] font-black rounded-lg uppercase tracking-wider inline-flex items-center gap-1.5 mb-2.5">
            <Star className="w-3.5 h-3.5 fill-white text-white" /> Settings Center
          </span>
          <h1 className="text-3xl font-bold text-[#1D1D46] dark:text-white">
            Profile & Account Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your credentials, followed sectors, notification alerts, and security.
          </p>
        </div>

        <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
          <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Account Role</span>
          <span className="text-xs font-bold text-emerald-600 capitalize">
            {userRole.replace("-", " ")} Member
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#122238] rounded-3xl p-3 shadow-sm border border-gray-100 dark:border-white/5 space-y-1">
            {tabsConfig.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t.id
                    ? "bg-[#1D1D46] text-white shadow-sm dark:bg-[#F0652E]"
                    : "text-gray-500 hover:bg-[#f4f7fb] hover:text-[#1D1D46] dark:text-gray-400 dark:hover:bg-white/5"
                }`}
              >
                <t.icon className="w-4 h-4 shrink-0" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#122238] rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 dark:border-white/5 min-h-[500px]">
            
            {/* ── 1. ACCOUNT TAB ── */}
            {activeTab === "account" && (
              <form onSubmit={handleSaveAccount} className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    1. Profile Details
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Full Name</label>
                        <input 
                          type="text" 
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Designation / Role</label>
                        <input 
                          type="text" 
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="e.g. Senior Trade Analyst"
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Organisation</label>
                        <input 
                          type="text" 
                          value={organisation}
                          onChange={(e) => setOrganisation(e.target.value)}
                          placeholder="Company or Institution"
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">City</label>
                        <input 
                          type="text" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Country</label>
                        <input 
                          type="text" 
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Bio / Summary</label>
                      <textarea 
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write a brief professional summary..."
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    2. Contact Details & Social
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Mobile Number</label>
                      <input 
                        type="text" 
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">LinkedIn Profile URL</label>
                    <input 
                      type="url" 
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border border-transparent focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="px-6 py-3 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md">
                    <Save className="w-4 h-4" /> Save Account Changes
                  </button>
                </div>
              </form>
            )}

            {/* ── 2. INTERESTS TAB ── */}
            {activeTab === "interests" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Sector & Interest Manager
                  </h3>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Personalize your daily intelligence stream by adding or removing trade sectors and target countries.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3">
                    Followed Sectors ({userSectors.length})
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {userSectors.map((s) => (
                      <span key={s} className="px-3 py-1.5 bg-[#1D1D46] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 capitalize">
                        <span>{s.replace("-", " ")}</span>
                        <button type="button" onClick={() => handleRemoveSector(s)} className="hover:text-red-300 font-bold ml-1">×</button>
                      </span>
                    ))}
                    {!showAddSector && (
                      <button
                        type="button"
                        onClick={() => setShowAddSector(true)}
                        className="px-3 py-1.5 border-2 border-dashed border-[#1D1D46] text-[#1D1D46] dark:border-white/20 dark:text-white text-xs font-bold rounded-xl hover:bg-[#f4f7fb] dark:hover:bg-white/5 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Sector
                      </button>
                    )}
                  </div>

                  {showAddSector && (
                    <div className="flex gap-2 max-w-md mt-2">
                      <select
                        value={newSectorInput}
                        onChange={(e) => setNewSectorInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-[#1D1D46] dark:text-white focus:outline-hidden"
                      >
                        <option value="">Select a sector to add...</option>
                        {SECTORS.map(sec => (
                          <option key={sec.id} value={sec.id}>{sec.label}</option>
                        ))}
                      </select>
                      <button type="button" onClick={handleAddSector} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700">Add</button>
                      <button type="button" onClick={() => setShowAddSector(false)} className="px-3 py-2 bg-gray-200 dark:bg-white/10 text-xs font-bold rounded-xl">Cancel</button>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3">
                    Target Countries ({userCountries.length})
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {userCountries.map((c) => (
                      <span key={c} className="px-3 py-1.5 bg-[#F0652E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5">
                        <span>{c}</span>
                        <button type="button" onClick={() => handleRemoveCountry(c)} className="hover:text-red-100 font-bold ml-1">×</button>
                      </span>
                    ))}
                    {!showAddCountry && (
                      <button
                        type="button"
                        onClick={() => setShowAddCountry(true)}
                        className="px-3 py-1.5 border-2 border-dashed border-[#F0652E] text-[#F0652E] text-xs font-bold rounded-xl hover:bg-orange-50 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Country
                      </button>
                    )}
                  </div>

                  {showAddCountry && (
                    <div className="flex gap-2 max-w-md mt-2">
                      <input
                        type="text"
                        placeholder="e.g. United Kingdom, Singapore..."
                        value={newCountryInput}
                        onChange={(e) => setNewCountryInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-[#1D1D46] dark:text-white focus:outline-hidden"
                      />
                      <button type="button" onClick={handleAddCountry} className="px-4 py-2 bg-[#F0652E] text-white text-xs font-bold rounded-xl hover:bg-orange-600">Add</button>
                      <button type="button" onClick={() => setShowAddCountry(false)} className="px-3 py-2 bg-gray-200 dark:bg-white/10 text-xs font-bold rounded-xl">Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── 3. NOTIFICATIONS TAB ── */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Newsletter Preferences & Email Digests
                  </h3>
                  <p className="text-xs text-gray-400 mb-6">
                    Control which notifications and email reports reach your registered inbox.
                  </p>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  <Row label="Daily Morning Trade Brief" desc="Curated summary of policy changes, CEPA tariff revisions, and bilateral market news.">
                    <Toggle on={notifs.digest} onToggle={() => {
                      setNotifs(p => ({ ...p, digest: !p.digest }));
                      triggerSuccess(`Daily digest ${!notifs.digest ? "enabled" : "disabled"}`);
                    }} />
                  </Row>
                  <Row label="Breaking Trade Alerts" desc="Immediate push updates for major trade treaty ratifications and export updates.">
                    <Toggle on={notifs.breaking} onToggle={() => {
                      setNotifs(p => ({ ...p, breaking: !p.breaking }));
                      triggerSuccess(`Breaking alerts ${!notifs.breaking ? "enabled" : "disabled"}`);
                    }} />
                  </Row>
                  <Row label="Weekly Intelligence Overview" desc="Comprehensive Friday breakdown of shipping rates, port clearances, and sector indices.">
                    <Toggle on={notifs.weekly} onToggle={() => {
                      setNotifs(p => ({ ...p, weekly: !p.weekly }));
                      triggerSuccess(`Weekly report ${!notifs.weekly ? "enabled" : "disabled"}`);
                    }} />
                  </Row>
                </div>
              </div>
            )}

            {/* ── 4. PRIVACY TAB ── */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Privacy Controls & Data Portability
                  </h3>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  <Row label="Public Profile Visibility" desc="Allow guest visitors and search engines to discover your public profile page.">
                    <Toggle on={privacy.publicProfile} onToggle={() => {
                      setPrivacy(p => ({ ...p, publicProfile: !p.publicProfile }));
                      triggerSuccess(`Public profile visibility ${!privacy.publicProfile ? "enabled" : "disabled"}`);
                    }} />
                  </Row>
                  <Row label="Show Followed Sectors" desc="Display sector tags publicly on your landing profile.">
                    <Toggle on={privacy.showSectors} onToggle={() => {
                      setPrivacy(p => ({ ...p, showSectors: !p.showSectors }));
                      triggerSuccess(`Followed sectors display ${!privacy.showSectors ? "enabled" : "disabled"}`);
                    }} />
                  </Row>
                  <Row label="Reading History Visibility" desc="Make your bookmarked articles visible to peer readers on the network.">
                    <Toggle on={privacy.readingHistoryPublic} onToggle={() => {
                      setPrivacy(p => ({ ...p, readingHistoryPublic: !p.readingHistoryPublic }));
                      triggerSuccess(`Reading history ${!privacy.readingHistoryPublic ? "made public" : "made private"}`);
                    }} />
                  </Row>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                  <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-1">GDPR & Data Portability</h4>
                  <p className="text-[11px] text-gray-400 mb-4 leading-normal">
                    Download an archived copy of your account profile, preferences, and saved indices in standard JSON format.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadGDPR}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold text-[#1D1D46] dark:text-white rounded-xl flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Profile Data (JSON)
                  </button>
                </div>
              </div>
            )}

            {/* ── 5. PREFERENCES TAB ── */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Language & Theme Preferences
                  </h3>
                </div>

                <div className="space-y-5">
                  <Row label="Interface Language" desc="Choose your primary portal display language.">
                    <select 
                      value={prefs.language} 
                      onChange={(e) => {
                        setPrefs(p => ({ ...p, language: e.target.value }));
                        triggerSuccess(`Language updated to ${e.target.value}`);
                      }}
                      className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs font-bold text-[#1D1D46] dark:text-white border-none focus:outline-hidden"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (हिंदी)</option>
                    </select>
                  </Row>

                  <Row label="Dark Theme Interface" desc="Switch between sleek dark mode and high-contrast light theme.">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#F0652E]" />
                      <Toggle on={prefs.darkMode} onToggle={handleToggleTheme} />
                      <Moon className="w-4 h-4 text-[#1D1D46]" />
                    </div>
                  </Row>

                  <Row label="Comment Moderation Mode" desc="Choose how community comments on your articles or profile are handled.">
                    <select 
                      value={prefs.commentModeration} 
                      onChange={(e) => {
                        setPrefs(p => ({ ...p, commentModeration: e.target.value }));
                        triggerSuccess("Comment moderation updated");
                      }}
                      className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs border-none font-bold text-[#1D1D46] dark:text-white"
                    >
                      <option value="auto">Auto-publish immediately</option>
                      <option value="review">Hold for self-review approval</option>
                    </select>
                  </Row>
                </div>
              </div>
            )}

            {/* ── 6. SECURITY TAB ── */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Security & Authentication
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl">
                    <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-1">Password Update & OTP Verification</h4>
                    <p className="text-[10px] text-gray-400 mb-4 leading-normal">
                      Update your login credential. Triggering will send a 6-digit security OTP code to registered email <strong>{email}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="px-4 py-2.5 bg-[#1D1D46] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Send Password Reset OTP
                    </button>
                  </div>

                  <Row label="Google Authenticator 2FA (TOTP)" desc="Require 2-factor authentication codes during account login.">
                    <Toggle on={mfaEnabled} onToggle={() => {
                      setMfaEnabled(!mfaEnabled);
                      triggerSuccess(mfaEnabled ? "Two-factor authentication disabled." : "2FA enabled successfully.");
                    }} />
                  </Row>
                </div>
              </div>
            )}

            {/* ── 7. ROLE OPTIONS TAB ── */}
            {activeTab === "role" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    {userRole.replace("-", " ").toUpperCase()} Specific Options
                  </h3>
                </div>

                {userRole === "reader" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl space-y-2">
                      <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Export Saved Articles</h4>
                      <p className="text-[10px] text-gray-400">Download your saved articles and intelligence list formatted as CSV.</p>
                      <button
                        type="button"
                        onClick={() => triggerSuccess("Saved articles list exported (CSV)!")}
                        className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-xl"
                      >
                        Export Saved Articles (CSV)
                      </button>
                    </div>
                  </div>
                )}

                {userRole === "sme" && (
                  <div className="space-y-4">
                    <Row label="Default Article Category" desc="Default classification when drafting new trade articles.">
                      <select 
                        value={smeCategory}
                        onChange={(e) => {
                          setSmeCategory(e.target.value);
                          triggerSuccess(`Default article category set to ${e.target.value}`);
                        }}
                        className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs border-none font-bold text-[#1D1D46] dark:text-white"
                      >
                        <option value="Trade Analysis">Trade Analysis</option>
                        <option value="Policy Briefings">Policy Briefings</option>
                        <option value="Bilateral Focus">Bilateral Focus</option>
                      </select>
                    </Row>
                  </div>
                )}

                {userRole === "company" && (
                  <div className="space-y-4">
                    <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl space-y-3">
                      <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Signatory Rights Delegation</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        Add an additional corporate admin signatory to manage company updates and offerings.
                      </p>
                      <div className="flex gap-2">
                        <input 
                          type="email" 
                          placeholder="colleague@company.com" 
                          value={signatoryEmailInput}
                          onChange={(e) => setSignatoryEmailInput(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white dark:bg-[#122238] rounded-xl text-xs border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (signatoryEmailInput.includes("@")) {
                              triggerSuccess(`Invitation sent to ${signatoryEmailInput}`);
                              setSignatoryEmailInput("");
                            }
                          }}
                          className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-xl"
                        >
                          Send Invite
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {userRole === "leader" && (
                  <div className="space-y-4">
                    <Row label="Display Associated Company on Profile" desc="Show or hide company linkage on public leader biography banner.">
                      <Toggle on={companyLinkPrivacy} onToggle={() => {
                        setCompanyLinkPrivacy(!companyLinkPrivacy);
                        triggerSuccess("Company linkage visibility updated");
                      }} />
                    </Row>
                  </div>
                )}
              </div>
            )}

            {/* ── 8. UPGRADE TAB ── */}
            {activeTab === "upgrade" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#F0652E]" />
                    Upgrade Your Plan Tier
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Compare features and unlock advanced publication privileges, deep readership metrics, and directory listings.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-100 dark:border-white/5 p-6 rounded-2xl space-y-3 bg-gray-50/50 dark:bg-white/5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Membership</h4>
                    <p className="text-lg font-black text-[#1D1D46] dark:text-white capitalize">{userRole.replace("-", " ")} Free</p>
                    <ul className="text-xs space-y-2 text-gray-500 pt-2">
                      <li>• Standard self-declared profile</li>
                      <li>• Access to free intelligence articles</li>
                      <li>• Follow up to 10 trade sectors</li>
                    </ul>
                  </div>

                  <div className="border-2 border-emerald-500/40 p-6 rounded-2xl space-y-3 bg-emerald-50/10 dark:bg-emerald-950/10 relative">
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 rounded-full">
                      Verified Upgrades
                    </span>
                    <h4 className="text-lg font-black text-[#1D1D46] dark:text-white">Pro & Elite Plans</h4>
                    <p className="text-xs text-gray-500">Unlock official blue ticks, article publishing quotas, and live analytics dashboards.</p>
                    <button 
                      type="button" 
                      onClick={() => window.location.href = `./profile/plans/${userRole}`}
                      className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      Compare & Upgrade Plans <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

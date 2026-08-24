"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  User, Bell, Shield, Globe, Eye, EyeOff, Save, ChevronRight,
  Moon, Sun, Building2, Lock, Zap, ArrowRight, Clock, Crown,
  BookOpen, Star, Users, Briefcase, FileText, Key, Share2, Clipboard,
  Mail, Phone, ShieldAlert, Check, HelpCircle
} from "lucide-react";

type SettingsTab = "account" | "interests" | "notifications" | "privacy" | "preferences" | "security" | "role" | "upgrade";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} type="button" className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${on ? "bg-emerald-600" : "bg-gray-200 dark:bg-white/10"}`}>
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
  const { user, updateOnboarding, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [showPass, setShowPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states matching user
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.onboardingForm?.aboutText || "");
  const [designation, setDesignation] = useState(user?.onboardingForm?.currentDesignation || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [linkedin, setLinkedin] = useState(user?.onboardingForm?.linkedinUrl || "");
  
  // Toggles & Preferences State
  const [notifs, setNotifs] = useState({ breaking: true, digest: true, sme: true, events: true, messages: true });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showSectors: true, showCountries: false, readingHistoryPublic: false });
  const [prefs, setPrefs] = useState({ darkMode: false, emailDigest: true, language: "English", commentModeration: "auto" });
  const [mfaEnabled, setMfaEnabled] = useState(false);

  // SME specifics
  const [consultingOpen, setConsultingOpen] = useState(user?.onboardingForm?.consultingAvailable || false);
  const [smeCategory, setSmeCategory] = useState("Trade Analysis");

  // Leader specifics
  const [companyLinkPrivacy, setCompanyLinkPrivacy] = useState(true);

  // Associate SME specifics
  const [copiedLink, setCopiedLink] = useState(false);

  // Company Signatory
  const [signatoryEmailInput, setSignatoryEmailInput] = useState("");

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedForm = {
      ...user.onboardingForm,
      aboutText: bio,
      currentDesignation: designation,
      linkedinUrl: linkedin,
      consultingAvailable: consultingOpen,
    };
    await updateOnboarding({
      name: displayName,
      email,
      mobile,
      onboardingForm: updatedForm,
    });
    triggerSuccess("Settings updated successfully!");
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const copyAffiliate = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(`https://igenews.com/ref?code=associate_${user.id}`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const userRole = user.onboardingRole || "reader";

  const tabsConfig: { id: SettingsTab; icon: any; label: string; badge?: string }[] = [
    { id: "account", icon: User, label: "Account Customiser" },
    { id: "interests", icon: Globe, label: "Interests & Sectors" },
    { id: "notifications", icon: Bell, label: "Digests & Alerts" },
    { id: "privacy", icon: Shield, label: "Privacy Controls" },
    { id: "preferences", icon: Globe, label: "Language & Theme" },
    { id: "security", icon: Key, label: "Security & MFA" },
    { id: "role", icon: Star, label: "Role Extensions" },
    { id: "upgrade", icon: Zap, label: "Upgrade Plan", badge: "FREE" },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-6xl mx-auto pb-24 text-left">
      
      {/* Header */}
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <span className="px-3 py-1 bg-[#C55A11] text-white text-[10px] font-black rounded-lg uppercase tracking-wider inline-flex items-center gap-1.5 mb-2.5">
            <Star className="w-3.5 h-3.5 fill-white text-white" /> FREE MEMBER
          </span>
          <h1 className="text-3xl font-bold text-[#1D1D46] dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure preferences, contact details, and role-specific customizers.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="px-4 py-2 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
          <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Profile Status</span>
          <span className="text-xs font-bold text-amber-600">
            {userRole === "reader" ? "Free Reader" : "Free & Unverified — Self-Declared"}
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
                    ? "bg-[#1D1D46] text-white shadow dark:bg-[#F0652E]"
                    : "text-gray-500 hover:bg-[#f4f7fb] hover:text-[#1D1D46] dark:text-gray-400 dark:hover:bg-white/5"
                }`}
              >
                <t.icon className="w-4 h-4 shrink-0" />
                <span>{t.label}</span>
                {t.badge && (
                  <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-md ${
                    activeTab === t.id ? "bg-white text-[#1D1D46]" : "bg-[#C55A11] text-white"
                  }`}>
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#122238] rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 dark:border-white/5 min-h-[500px]">
            
            {/* ── ACCOUNT TAB ── */}
            {activeTab === "account" && (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    1. Profile Customiser
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Display Name</label>
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border-none focus:outline-none"
                      />
                    </div>
                    {userRole !== "reader" && (
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Designation</label>
                        <input 
                          type="text" 
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="e.g. Chief Director"
                          className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border-none focus:outline-none"
                        />
                      </div>
                    )}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Bio Update</label>
                      <textarea 
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write your professional bio..."
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border-none focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    2. Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border-none focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">Mobile Number</label>
                      <input 
                        type="text" 
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border-none focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs text-[#1D1D46] dark:text-white font-semibold border-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-red-500">Account Management</h4>
                    <p className="text-[10px] text-gray-400">Temporarily suspend or permanently delete your account profile.</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => triggerSuccess("Account temporarily deactivated.")} className="px-3.5 py-2 text-[10px] font-bold bg-amber-500/10 text-amber-600 rounded-xl hover:bg-amber-500/20">Deactivate</button>
                    <button type="button" onClick={() => triggerSuccess("Profile deleted.")} className="px-3.5 py-2 text-[10px] font-bold bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20">Delete Profile</button>
                  </div>
                </div>

                <button type="submit" className="px-6 py-3 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md">
                  <Save className="w-4 h-4" /> Save Account Changes
                </button>
              </form>
            )}

            {/* ── INTERESTS TAB ── */}
            {activeTab === "interests" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Sector & Interest Manager
                  </h3>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Update followed sectors, countries of interest, and news alignment to direct your personalized intelligence feed. (Free Reader plan: follow up to 10 sectors maximum).
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3">Sectors Followed</label>
                  <div className="flex flex-wrap gap-2">
                    {(user.sectors || []).map((s) => (
                      <span key={s} className="px-3 py-1.5 bg-[#1D1D46] text-white text-xs font-bold rounded-xl flex items-center gap-1.5">
                        <span>{s.replace("-", " ")}</span>
                        <button onClick={() => triggerSuccess("Sector removed.")} className="hover:text-red-300 font-bold">×</button>
                      </span>
                    ))}
                    <button onClick={() => triggerSuccess("Add Sector modal loaded.")} className="px-3 py-1.5 border-2 border-dashed border-[#1D1D46] text-[#1D1D46] dark:border-white/20 dark:text-white text-xs font-bold rounded-xl hover:bg-[#f4f7fb] dark:hover:bg-white/5">
                      + Add Sector (Limit 10)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3">Countries of Interest</label>
                  <div className="flex flex-wrap gap-2">
                    {(user.countries || []).map((c) => (
                      <span key={c} className="px-3 py-1.5 bg-[#F0652E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5">
                        <span>{c}</span>
                        <button onClick={() => triggerSuccess("Country removed.")} className="hover:text-red-100 font-bold">×</button>
                      </span>
                    ))}
                    <button onClick={() => triggerSuccess("Add Country modal loaded.")} className="px-3 py-1.5 border-2 border-dashed border-[#F0652E] text-[#F0652E] text-xs font-bold rounded-xl hover:bg-orange-50">
                      + Add Country
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS TAB ── */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Newsletter Preferences & Alerts
                  </h3>
                  <p className="text-xs text-gray-400 mb-6">
                    Manage digest frequencies and breaking news push alerts.
                  </p>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  <Row label="Daily Trade Digest" desc="Summary email digest sent morning calendar hours (Free: summary version only).">
                    <Toggle on={notifs.digest} onToggle={() => setNotifs(prev => ({ ...prev, digest: !prev.digest }))} />
                  </Row>
                  <Row label="Breaking News Alerts" desc="Instant alerts for critical updates across followed sectors.">
                    <Toggle on={notifs.breaking} onToggle={() => setNotifs(prev => ({ ...prev, breaking: !prev.breaking }))} />
                  </Row>
                  <Row label="Weekly Intelligence Reports" desc="Bilateral sector intelligence updates.">
                    <Toggle on={notifs.events} onToggle={() => setNotifs(prev => ({ ...prev, events: !prev.events }))} />
                  </Row>
                </div>
              </div>
            )}

            {/* ── PRIVACY TAB ── */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Privacy Controls
                  </h3>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  <Row label="Public Profile Visibility" desc="Controls whether your profile URL can be viewed publicly by guests.">
                    <Toggle on={privacy.publicProfile} onToggle={() => setPrivacy(prev => ({ ...prev, publicProfile: !prev.publicProfile }))} />
                  </Row>
                  <Row label="Display Followed Sectors" desc="Toggle sector interest chips visibility on your public landing page.">
                    <Toggle on={privacy.showSectors} onToggle={() => setPrivacy(prev => ({ ...prev, showSectors: !prev.showSectors }))} />
                  </Row>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                  <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-2">GDPR Data Portability</h4>
                  <p className="text-[11px] text-gray-400 mb-4 leading-normal">
                    Download a full dump of your self-declared metadata and activity stats index in a standard JSON format.
                  </p>
                  <button type="button" onClick={() => triggerSuccess("Profile dump downloaded.")} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold text-[#1D1D46] dark:text-white rounded-xl">
                    Download My Profile Data (JSON)
                  </button>
                </div>
              </div>
            )}

            {/* ── PREFERENCES TAB ── */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Preferences & Theme
                  </h3>
                </div>

                <div className="space-y-5">
                  <Row label="Language Settings" desc="Choose primary localization interface language.">
                    <select 
                      value={prefs.language} 
                      onChange={(e) => setPrefs(prev => ({ ...prev, language: e.target.value }))}
                      className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs font-bold text-[#1D1D46] dark:text-white border-none focus:outline-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (हिंदी)</option>
                    </select>
                  </Row>

                  <Row label="Dark Theme Interface" desc="Switch app layout contrast themes.">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#F0652E]" />
                      <Toggle on={prefs.darkMode} onToggle={() => setPrefs(prev => ({ ...prev, darkMode: !prev.darkMode }))} />
                      <Moon className="w-4 h-4 text-[#1D1D46]" />
                    </div>
                  </Row>
                </div>
              </div>
            )}

            {/* ── SECURITY TAB ── */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    Security & Account Protection
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl">
                    <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-2">Password Update (Email OTP Verification)</h4>
                    <p className="text-[10px] text-gray-400 mb-4 leading-normal">
                      Update your login credential. Triggering will send an security OTP code to your registered email {user.email}.
                    </p>
                    <button type="button" onClick={() => triggerSuccess("Verification OTP code sent to your registered email.")} className="px-4 py-2.5 bg-[#1D1D46] text-white text-xs font-bold rounded-xl">
                      Send Password Reset OTP
                    </button>
                  </div>

                  <Row label="Google Authenticator MFA (TOTP)" desc="Add multi-factor device authentication overrides to login screens.">
                    <Toggle on={mfaEnabled} onToggle={() => {
                      setMfaEnabled(!mfaEnabled);
                      triggerSuccess(mfaEnabled ? "MFA disabled." : "MFA setup initialized. Scan key dynamically.");
                    }} />
                  </Row>
                </div>
              </div>
            )}

            {/* ── ROLE EXTENSIONS TAB ── */}
            {activeTab === "role" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5">
                    {userRole.replace("-", " ").toUpperCase()} Specific Configurations
                  </h3>
                </div>

                {/* Reader Role Settings */}
                {userRole === "reader" && (
                  <div className="divide-y divide-gray-100 dark:divide-white/5">
                    <Row label="Reading History Visibility" desc="Make your article read list history visible on public dashboard landing tabs.">
                      <Toggle on={privacy.readingHistoryPublic} onToggle={() => setPrivacy(prev => ({ ...prev, readingHistoryPublic: !prev.readingHistoryPublic }))} />
                    </Row>
                    <Row label="Comment Moderation Mode" desc="Choose comment validation rules.">
                      <select 
                        value={prefs.commentModeration} 
                        onChange={(e) => setPrefs(prev => ({ ...prev, commentModeration: e.target.value }))}
                        className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs border-none font-bold text-[#1D1D46] dark:text-white"
                      >
                        <option value="auto">Auto-publish immediately</option>
                        <option value="review">Hold for self-review approval</option>
                      </select>
                    </Row>
                    <div className="py-4">
                      <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-2">Export Saved Articles</h4>
                      <p className="text-[11px] text-gray-400 mb-3">Download list of your saved books/articles index in csv formatting.</p>
                      <button type="button" onClick={() => triggerSuccess("Exported CSV index download started.")} className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-xl">
                        Export Articles List (CSV)
                      </button>
                    </div>
                  </div>
                )}

                {/* SME Specific Settings */}
                {userRole === "sme" && (
                  <div className="space-y-5">
                    <Row label="Consulting Availability Tag" desc="Toggle 'Consulting Available' indicator chip visibility on your public directory listing profile.">
                      <Toggle on={consultingOpen} onToggle={() => setConsultingOpen(!consultingOpen)} />
                    </Row>

                    <Row label="Default Article Sector Category" desc="Index categories when publishing columns.">
                      <select 
                        value={smeCategory}
                        onChange={(e) => setSmeCategory(e.target.value)}
                        className="px-3 py-2 bg-[#f4f7fb] dark:bg-white/5 rounded-xl text-xs border-none font-bold text-[#1D1D46] dark:text-white"
                      >
                        <option value="Trade Analysis">Trade Analysis</option>
                        <option value="Policy Briefings">Policy Briefings</option>
                        <option value="Bilateral Focus">Bilateral Focus</option>
                      </select>
                    </Row>

                    <div className="pt-4 border-t border-dashed border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Professional Profile PDF Export</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Generate a styled executive profile resume page sheet. (Requires Upgrade).</p>
                      </div>
                      <button type="button" onClick={() => setActiveTab("upgrade")} className="px-3.5 py-2 text-[10px] font-bold bg-[#F0652E] text-white rounded-xl">Unlock Tool</button>
                    </div>
                  </div>
                )}

                {/* Associate SME Settings */}
                {userRole === "associate-sme" && (
                  <div className="space-y-5">
                    <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Affiliate Links & Credit Registry</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        Copy link referral, and redeem credits accumulated to unlock verified Pro plans discounts.
                      </p>
                      <div className="flex gap-2">
                        <button type="button" onClick={copyAffiliate} className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-xl">
                          {copiedLink ? "Link Copied!" : "Copy Referral Link"}
                        </button>
                        <button type="button" onClick={() => triggerSuccess("Balance details updated.")} className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-xs text-gray-600 dark:text-white font-bold rounded-xl">
                          View Referrals tracking
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-dashed border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Consulting Rate Configurator</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Settings for booking appointments and setting fees. (Requires Upgrade).</p>
                      </div>
                      <button type="button" onClick={() => setActiveTab("upgrade")} className="px-3.5 py-2 text-[10px] font-bold bg-[#F0652E] text-white rounded-xl">Unlock Tool</button>
                    </div>
                  </div>
                )}

                {/* Company Settings */}
                {userRole === "company" && (
                  <div className="space-y-5">
                    <div className="bg-[#f4f7fb] dark:bg-white/5 p-5 rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Signatory Rights Delegation</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        Add or transfer administrative page ownership rights to another signatory. Requires registered OTP verification from both emails.
                      </p>
                      <div className="flex gap-2">
                        <input 
                          type="email" 
                          placeholder="new-signatory@company.com" 
                          value={signatoryEmailInput}
                          onChange={(e) => setSignatoryEmailInput(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white dark:bg-[#122238] rounded-xl text-xs border-none"
                        />
                        <button type="button" onClick={() => {
                          if (signatoryEmailInput.includes("@")) {
                            triggerSuccess("Delegation verification request sent to target email.");
                            setSignatoryEmailInput("");
                          }
                        }} className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-xl">Send Invite</button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-dashed border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Multiple Signatories & Admins Access</h4>
                        <p className="text-[10px] text-gray-400 mt-1">Grant simultaneous administrative access keys to team members. (Requires Upgrade).</p>
                      </div>
                      <button type="button" onClick={() => setActiveTab("upgrade")} className="px-3.5 py-2 text-[10px] font-bold bg-[#F0652E] text-white rounded-xl">Unlock Tool</button>
                    </div>
                  </div>
                )}

                {/* Leader Settings */}
                {userRole === "leader" && (
                  <div className="space-y-5">
                    <Row label="Display Associated Company on Profile" desc="Show or hide company linkage name from public biography banner layouts.">
                      <Toggle on={companyLinkPrivacy} onToggle={() => setCompanyLinkPrivacy(!companyLinkPrivacy)} />
                    </Row>

                    <div className="p-5 bg-[#f4f7fb] dark:bg-white/5 rounded-2xl">
                      <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-2">Company Portability Setup</h4>
                      <p className="text-[10px] text-gray-400 mb-4 leading-normal">
                        This leader profile belongs to you. Change company linkage association at any time to clear history display.
                      </p>
                      <button type="button" onClick={() => triggerSuccess("Redirection to company linkage tab triggered.")} className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-xl">
                        Manage Company Linkage
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── UPGRADE TAB ── */}
            {activeTab === "upgrade" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-base font-bold text-[#1D1D46] dark:text-white border-b border-gray-100 dark:border-white/5 pb-2.5 mb-5 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#F0652E]" />
                    Upgrade to Premium Authority Tier
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    View features limits on your active free membership tier and choose package levels to unlock verified badges.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Free Plan specs */}
                  <div className="border border-gray-100 dark:border-white/5 p-6 rounded-2xl space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase">Active Free Tier</h4>
                    <ul className="text-xs space-y-2.5 text-gray-600 dark:text-gray-400">
                      <li>• Self-declared information listings</li>
                      <li>• Persistent Orange FREE MEMBER badges</li>
                      <li>• Basic keyword directory searches</li>
                      <li>• Locked analytics charts logs</li>
                    </ul>
                  </div>

                  {/* Paid Plan specs */}
                  <div className="border-2 border-[#1D1D46] dark:border-[#F0652E] p-6 rounded-2xl bg-gradient-to-br from-[#1D1D46]/5 to-[#0642BA]/10 space-y-4 relative overflow-hidden">
                    <span className="absolute top-3 right-3 text-[10px] bg-[#F0652E] text-white px-2 py-0.5 font-bold rounded uppercase">Recommended</span>
                    <h4 className="text-sm font-bold text-[#1D1D46] dark:text-white uppercase">Premium Verified Tier</h4>
                    <ul className="text-xs space-y-2.5 text-gray-700 dark:text-gray-300">
                      <li>• Official Blue Tick verification badges</li>
                      <li>• Unlimited articles/PR publication</li>
                      <li>• Live B2B analytics dashboards</li>
                      <li>• Sector ranking priority listings</li>
                    </ul>
                    <button 
                      type="button" 
                      onClick={() => window.location.href = `./plans/${userRole}`}
                      className="w-full mt-4 py-3 bg-[#1D1D46] dark:bg-[#F0652E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow"
                    >
                      Compare Plans & Upgrade <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Empty billing logs */}
                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Billing History</h4>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-center">
                    <p className="text-xs text-gray-400 italic">No payments found. (You are on a Free membership plan).</p>
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

"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Check, Upload, MapPin, FileText, Eye, EyeOff,
  BarChart3, ShieldCheck, Globe, Send, ArrowRight,
  TrendingUp, Calendar, Settings as SettingsIcon, Edit3, User, Award
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import SmeAnalyticsHub from "@/components/profile/common/SmeAnalyticsHub";
import SmePublicProfile from "@/components/profile/common/SmePublicProfile";

// ─── Public Profile Card (SME Pro Blue) ──────────────────
function SMEProPublicProfile({
  profile, displayName, displayDesignation, displayOrg,
  displayCity, displayCountry, avatarBase64, articles,
  onBack,
}: any) {
  return (
    <SmePublicProfile
      profileData={{
        name: displayName,
        designation: displayDesignation,
        organization: displayOrg,
        city: displayCity,
        country: displayCountry,
        articlesList: articles,
      }}
      tier="pro"
      role="sme"
      isOwner={true}
      onSwitchToAdmin={onBack}
    />
  );
}

// ─── Main Dashboard ──────────────────────────────────────
export default function SMEProDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "insights" | "settings">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [articles, setArticles] = useState<{ title: string; sector: string; date: string; reads: number }[]>([
    { title: "How India-UAE CEPA is reshaping chemical exports", sector: "chemicals", date: "Aug 10, 2026", reads: 1240 },
    { title: "Steel procurement under FTA: A buyer's guide", sector: "steel", date: "Jul 22, 2026", reads: 890 },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState(profile.sector || "manufacturing");
  const [showPublishForm, setShowPublishForm] = useState(false);

  // Settings State
  const sampleName = "Dr. Vikram Malhotra";
  const rawName = profile.fullName || user?.name;
  const isGeneric = !rawName || rawName === "SME Pro User" || rawName === "Your Name" || rawName.toLowerCase().includes("user");
  const displayName = isGeneric ? sampleName : rawName;

  const displayDesignation = profile.currentDesignation || "Senior Tariff & Supply Chain Strategist";
  const displayOrg = profile.organisation || "Chemical Exporters Association";
  const displayCity = profile.city || "Mumbai";
  const displayCountry = profile.country || "India";

  const [editName, setEditName] = useState(displayName);
  const [editDesignation, setEditDesignation] = useState(displayDesignation);
  const [editOrg, setEditOrg] = useState(displayOrg);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const profileSlug = (user?.username || displayName.toLowerCase().replace(/\s+/g, "-")).replace(/[^a-z0-9-]/g, "");
  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/${locale}/expert/${profileSlug}` : `https://indiaglobalnews.com/${locale}/expert/${profileSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (articles.length >= 4) {
      alert("Pro Tier limit reached (4 articles/month max). Upgrade to SME Elite for unlimited publishing.");
      return;
    }
    setArticles([{ title: newTitle, sector: newSector, date: "Just now", reads: 0 }, ...articles]);
    setNewTitle("");
    setShowPublishForm(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("File size must be under 2MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarBase64(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  if (viewMode === "public") {
    return (
      <SMEProPublicProfile
        profile={profile}
        displayName={displayName}
        displayDesignation={displayDesignation}
        displayOrg={displayOrg}
        displayCity={displayCity}
        displayCountry={displayCountry}
        avatarBase64={avatarBase64}
        articles={articles}
        onBack={() => setViewMode("private")}
      />
    );
  }

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto space-y-6 pb-24">
      {/* ── TOP NAV BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#122238] rounded-3xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shrink-0 bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center font-bold text-blue-600 text-lg">
              {avatarBase64 ? (
                <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                displayName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <input type="file" ref={avatarInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-[#1D1D46] dark:text-white">{displayName}</h1>
              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> SME Pro
              </span>
            </div>
            <p className="text-xs text-gray-400">{displayDesignation} • {displayOrg}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setViewMode("public")} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-white transition-all">
            <Eye className="w-3.5 h-3.5" /> Public Card Preview
          </button>
          <button onClick={handleCopyLink} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 transition-all border border-blue-200 dark:border-blue-800">
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedUrl ? "Copied!" : "Share Link"}</span>
          </button>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-white/5 pb-2">
        {[
          { id: "overview", label: "Overview" },
          { id: "articles", label: `Articles (${articles.length}/4)` },
          { id: "insights", label: "Readership Analytics" },
          { id: "settings", label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? "bg-[#1D1D46] text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 1. OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs">
              <span className="text-xs text-gray-400 font-bold uppercase">Monthly Reads</span>
              <p className="text-2xl font-black text-[#1D1D46] dark:text-white mt-1">2,130</p>
              <span className="text-[10px] text-emerald-600 font-bold">↑ +14% vs last month</span>
            </div>
            <div className="p-4 bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs">
              <span className="text-xs text-gray-400 font-bold uppercase">Articles Limit</span>
              <p className="text-2xl font-black text-blue-600 mt-1">{articles.length} / 4</p>
              <span className="text-[10px] text-gray-400 font-bold">Pro quota (4 max)</span>
            </div>
            <div className="p-4 bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs">
              <span className="text-xs text-gray-400 font-bold uppercase">Expert Rank</span>
              <p className="text-2xl font-black text-[#1D1D46] dark:text-white mt-1">#12</p>
              <span className="text-[10px] text-blue-600 font-bold">Verified Chemical Sector</span>
            </div>
          </div>

          {/* Quick Publish Entry */}
          <div className="p-6 bg-gradient-to-r from-blue-900 to-[#1D1D46] rounded-3xl text-white shadow-lg flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-base font-bold">Publish your next trade analysis</h3>
              <p className="text-xs text-blue-200/80 mt-1">Share insights on supply chain trends or tariff policy</p>
            </div>
            <button
              onClick={() => { setActiveTab("articles"); setShowPublishForm(true); }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              + Create Article
            </button>
          </div>
        </div>
      )}

      {/* ── 2. ARTICLES TAB ── */}
      {activeTab === "articles" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm">Published Reports ({articles.length}/4)</h2>
            <button
              onClick={() => setShowPublishForm(!showPublishForm)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              {showPublishForm ? "Cancel" : "+ New Article"}
            </button>
          </div>

          {showPublishForm && (
            <form onSubmit={handlePublish} className="p-5 bg-white dark:bg-[#122238] rounded-2xl border border-blue-100 dark:border-blue-900/30 space-y-4 shadow-sm">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., India-GCC Trade Agreement: Key Opportunities"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Industry Sector</label>
                <select
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 capitalize"
                >
                  {SECTORS.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
                Publish Report
              </button>
            </form>
          )}

          <div className="bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm divide-y divide-gray-50 dark:divide-white/5">
            {articles.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{a.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{a.sector} • {a.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-blue-600">{a.reads.toLocaleString()} reads</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. INSIGHTS TAB ── */}
      {activeTab === "insights" && (
        <SmeAnalyticsHub currentTier="pro" role="sme" userName={displayName} />
      )}

      {/* ── 4. SETTINGS TAB ── */}
      {activeTab === "settings" && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
          <div>
            <h2 className="font-bold text-[#1D1D46] dark:text-white text-base flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-blue-600" /> SME Pro Settings
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage your profile details and expert credentials</p>
          </div>

          {settingsSaved && (
            <div className="p-3 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" /> Settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Current Designation</label>
              <input
                type="text"
                value={editDesignation}
                onChange={(e) => setEditDesignation(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Organization</label>
              <input
                type="text"
                value={editOrg}
                onChange={(e) => setEditOrg(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="px-5 py-2 bg-[#1D1D46] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm">
              Save Settings
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

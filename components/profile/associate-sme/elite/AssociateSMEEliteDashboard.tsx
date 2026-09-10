"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Check, Upload, MapPin, FileText, Eye, EyeOff,
  BarChart3, Star, Globe, TrendingUp, Award,
  Send, ArrowRight, Settings as SettingsIcon, Edit3, User
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import SmeAnalyticsHub from "@/components/profile/common/SmeAnalyticsHub";
import SmePublicProfile from "@/components/profile/common/SmePublicProfile";

// ─── Public Profile Card (ASME Elite Emerald) ──────────────
function ASMEElitePublicProfile({
  profile, displayName, displayDesignation, displayOrg,
  displayCity, displayCountry, avatarBase64, bannerBase64, articles,
  onBack
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
      tier="elite"
      role="associate-sme"
      isOwner={true}
      onSwitchToAdmin={onBack}
    />
  );
}

// ─── Main ASME Elite Dashboard ───────────────────────────
export default function AssociateSMEEliteDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [copiedUrl, setCopiedUrl] = useState(false);

  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "insights" | "settings">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const [bannerBase64, setBannerBase64] = useState(profile.bannerBase64 || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [articles, setArticles] = useState([
    { title: "Specialist steel sourcing alternatives for MSMEs", sector: "steel", date: "Aug 11, 2026", reads: 1450, revenue: 72 },
    { title: "Logistics tracking structures in bilateral corridors", sector: "logistics", date: "Jul 15, 2026", reads: 890, revenue: 44 },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState(profile.sector || "steel");
  const [showPublishForm, setShowPublishForm] = useState(false);

  // Settings State
  const sampleName = "Ananya Krishnan";
  const rawName = profile.fullName || user?.name;
  const isGeneric = !rawName || rawName === "SME Pro User" || rawName === "Your Name" || rawName.toLowerCase().includes("user");
  const [editName, setEditName] = useState(isGeneric ? sampleName : rawName);
  const [editDesignation, setEditDesignation] = useState(profile.currentDesignation || "Associate Trade Consultant");
  const [editOrg, setEditOrg] = useState(profile.organisation || "Logistics & Sourcing Specialist");
  const [editCity, setEditCity] = useState(profile.city || "Mumbai");
  const [editCountry, setEditCountry] = useState(profile.country || "India");
  const [editBio, setEditBio] = useState(profile.bio || "Associate trade consultant focusing on supply chain security, customs clearance optimization, and SME exports.");
  const [settingsSaved, setSettingsSaved] = useState(false);

  const displayName = editName;
  const displayDesignation = editDesignation;
  const displayOrg = editOrg;
  const displayCity = editCity;
  const displayCountry = editCountry;

  const profileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${locale}/associate-sme/${user?.uid || user?.id || "profile"}`
    : "";

  const totalRevenue = articles.reduce((a, b) => a + b.revenue, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setBannerBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    if (!newTitle.trim()) return;
    if (articles.length >= 6) {
      alert("Monthly quota reached (6/6 articles).");
      return;
    }
    setArticles(prev => [{ title: newTitle, sector: newSector, date: new Date().toLocaleDateString("en-IN"), reads: 0, revenue: 0 }, ...prev]);
    setNewTitle("");
    setShowPublishForm(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // ── PUBLIC VIEW ─────────────────────────────────────────
  if (viewMode === "public") {
    return (
      <ASMEElitePublicProfile
        profile={{ ...profile, bio: editBio }}
        displayName={displayName}
        displayDesignation={displayDesignation}
        displayOrg={displayOrg}
        displayCity={displayCity}
        displayCountry={displayCountry}
        avatarBase64={avatarBase64}
        bannerBase64={bannerBase64}
        articles={articles}
        onBack={() => setViewMode("private")}
      />
    );
  }

  // ── PRIVATE / DASHBOARD VIEW (4 Tabs: Overview, Articles, Insights, Settings) ──
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "articles", label: `Articles (${articles.length}/6)` },
    { id: "insights", label: "Insights" },
    { id: "settings", label: "Settings" },
  ] as const;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* View toggle bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-xs text-gray-400">
          <span className="font-bold text-gray-600 dark:text-gray-300">ASME Elite Dashboard</span> — private view
        </div>
        <button
          onClick={() => setViewMode("public")}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition-all hover:border-gray-400"
        >
          <Eye className="w-3.5 h-3.5" /> Preview Public Profile
        </button>
      </div>

      {/* Profile header */}
      <div className="relative bg-white dark:bg-[#122238] rounded-3xl border-2 border-emerald-300/40 dark:border-emerald-900/30 shadow-xl overflow-hidden mb-8">
        {/* Cinematic banner */}
        <div className="relative h-36 overflow-hidden group cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
          {bannerBase64 ? (
            <img src={bannerBase64} alt="banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] via-emerald-700 to-teal-600" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(52,211,153,0.3),transparent_60%)]" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-xs text-white font-bold flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <Upload className="w-3.5 h-3.5" /> Change Banner
            </span>
          </div>
          <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-200 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/20 px-3 py-1.5 rounded-full">
              ★ ASME Elite Member
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-14 mb-5">
            <div className="relative group">
              <div className="w-28 h-28 rounded-2xl border-4 border-white dark:border-[#122238] overflow-hidden shadow-xl ring-4 ring-emerald-400/40 relative z-10">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-black text-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/30 dark:to-teal-900/20">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-5 h-5 text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1 pt-14">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-emerald-600 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <Star className="w-3 h-3 fill-white" /> ASME Elite
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
            <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="flex-1 truncate text-[10px] text-gray-500">{profileUrl}</span>
            <button onClick={handleCopy} className="text-[10px] font-bold text-emerald-600 hover:text-[#F0652E] transition-colors flex items-center gap-1">
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copiedUrl ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation: Exactly 4 Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 w-fit overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white dark:bg-[#1D1D46] text-[#1D1D46] dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 1. OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Elite Quota", value: `${articles.length}/6`, icon: FileText, color: "from-emerald-600 to-teal-500" },
              { label: "Total Reads", value: articles.reduce((a, b) => a + b.reads, 0).toLocaleString(), icon: Eye, color: "from-blue-600 to-indigo-500" },
              { label: "Profile Views", value: "1,890", icon: User, color: "from-purple-600 to-violet-500" },
              { label: "Article Revenue", value: `₹${totalRevenue.toFixed(0)}`, icon: TrendingUp, color: "from-amber-500 to-yellow-500" },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl p-4 bg-gradient-to-br ${s.color} text-white shadow-md`}>
                <s.icon className="w-5 h-5 mb-2 opacity-80" />
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[9px] opacity-80 mt-0.5 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-[#1D1D46] dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" /> Published Articles
                  </h3>
                  <button onClick={() => setActiveTab("articles")} className="text-xs text-emerald-600 font-bold hover:underline">
                    View all ({articles.length})
                  </button>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-white/5">
                  {articles.map((a, i) => (
                    <div key={i} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{a.title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-emerald-600 block">{a.reads.toLocaleString()} reads</span>
                        <span className="text-[10px] font-bold text-gray-400">+₹{a.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-[#1D1D46] dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-500" /> Elite Standing
                </h3>
                <div className="text-xs text-gray-500 space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-50 dark:border-white/5">
                    <span>Directory Position</span>
                    <span className="font-bold text-[#1D1D46] dark:text-white">Featured Associate</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50 dark:border-white/5">
                    <span>Google Indexing</span>
                    <span className="font-bold text-emerald-600">Active</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Plan Tier</span>
                    <span className="font-bold text-emerald-600">ASME Elite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. ARTICLES TAB ── */}
      {activeTab === "articles" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#1D1D46] dark:text-white">Published Articles ({articles.length}/6 this month)</h2>
              <p className="text-xs text-gray-400 mt-0.5">Publish in-depth trade reports and sourcing intelligence</p>
            </div>
            {articles.length < 6 && (
              <button onClick={() => setShowPublishForm(v => !v)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs">
                <FileText className="w-3.5 h-3.5" /> New Article
              </button>
            )}
          </div>

          {showPublishForm && (
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-emerald-100 dark:border-emerald-900/20 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#1D1D46] dark:text-white">Publish New Article</h3>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Article title…"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-[#1D1D46] dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              />
              <select
                value={newSector}
                onChange={e => setNewSector(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-[#1D1D46] dark:text-white focus:outline-hidden"
              >
                {SECTORS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={handlePublish} className="flex-1 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 flex items-center justify-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Submit for Editorial Review
                </button>
                <button onClick={() => setShowPublishForm(false)} className="px-4 py-2.5 text-xs font-bold text-gray-500 bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm divide-y divide-gray-50 dark:divide-white/5">
            {articles.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{a.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-emerald-600">{a.reads.toLocaleString()} reads</p>
                  <p className="text-[10px] font-bold text-gray-500">+₹{a.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. INSIGHTS TAB ── */}
      {activeTab === "insights" && (
        <SmeAnalyticsHub currentTier="elite" role="associate-sme" userName={displayName} />
      )}

      {/* ── 4. SETTINGS TAB ── */}
      {activeTab === "settings" && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
          <div>
            <h2 className="font-bold text-[#1D1D46] dark:text-white text-base flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-emerald-600" /> Elite Profile Settings
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage your verified Associate credentials and profile details</p>
          </div>

          {settingsSaved && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" /> Profile settings saved successfully!
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Designation</label>
                <input
                  type="text"
                  value={editDesignation}
                  onChange={e => setEditDesignation(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Organisation</label>
                <input
                  type="text"
                  value={editOrg}
                  onChange={e => setEditOrg(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">City</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={e => setEditCity(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Country</label>
                <input
                  type="text"
                  value={editCountry}
                  onChange={e => setEditCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Summary / Editorial Bio</label>
              <textarea
                rows={3}
                value={editBio}
                onChange={e => setEditBio(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

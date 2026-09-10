"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Edit, Check, Upload, MapPin,
  FileText, Eye, EyeOff, Sparkles, Send,
  BarChart3, ShieldCheck, Globe, TrendingUp, Award,
  Crown, Newspaper, Users, Settings as SettingsIcon
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";
import SmeAnalyticsHub from "@/components/profile/common/SmeAnalyticsHub";
import SmePublicProfile from "@/components/profile/common/SmePublicProfile";

// ─── Public Profile Card (Ultra-Premium Purple & Gold) ───
function SMESovereignPublicProfile({
  profile, displayName, displayDesignation, displayOrg,
  displayCity, displayCountry, avatarBase64, bannerBase64, onBack
}: any) {
  return (
    <SmePublicProfile
      profileData={{
        name: displayName,
        designation: displayDesignation,
        organization: displayOrg,
        city: displayCity,
        country: displayCountry,
      }}
      tier="sovereign"
      role="sme"
      isOwner={true}
      onSwitchToAdmin={onBack}
    />
  );
}

// ─── Main Sovereign Dashboard ───
export default function SMESovereignDashboard() {
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

  // Settings State
  const sampleName = "Dr. Vikram Malhotra";
  const rawName = profile.fullName || user?.name;
  const isGeneric = !rawName || rawName === "SME Pro User" || rawName === "Your Name" || rawName.toLowerCase().includes("user");
  const [editName, setEditName] = useState(isGeneric ? sampleName : rawName);
  const [editDesignation, setEditDesignation] = useState(profile.currentDesignation || "Senior Trade Policy Advisor & Board Fellow");
  const [editOrg, setEditOrg] = useState(profile.organisation || "Independent Sovereign Specialist");
  const [editCity, setEditCity] = useState(profile.city || "New Delhi");
  const [editCountry, setEditCountry] = useState(profile.country || "India");
  const [editBio, setEditBio] = useState(profile.bio || "Ex-policy advisor & sector legend with 25+ years experience directing national tariff frameworks.");
  const [settingsSaved, setSettingsSaved] = useState(false);

  const displayName = editName;
  const displayDesignation = editDesignation;
  const displayOrg = editOrg;
  const displayCity = editCity;
  const displayCountry = editCountry;

  const profileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${locale}/sme/${user?.id || "profile"}`
    : "";

  const [articlesList, setArticlesList] = useState([
    { title: "India-UAE CEPA: 18 Months of Impact on Chemical Exports", sector: "Chemicals", reads: 3842, revenue: 192, date: "Aug 12, 2026" },
    { title: "Alloy Steel Import Substitution Strategy for Indian MSMEs", sector: "Steel", reads: 2190, revenue: 109, date: "Jul 28, 2026" },
    { title: "Digital Logistics: Port Clearance Innovation in GIFT City", sector: "Logistics", reads: 1840, revenue: 92, date: "Jul 14, 2026" },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState(profile.sector || "Chemicals");
  const [showPublishForm, setShowPublishForm] = useState(false);

  // Mock sovereign-tier stats
  const stats = {
    totalRevenue: 34500,
    totalReads: 128400,
    articles: articlesList.length,
    profileViews: 18200,
    newsletterColumn: true,
    seoDomainRank: 4,
  };

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
    if (articlesList.length >= 8) {
      alert("Sovereign Tier limit reached (8 articles/month max).");
      return;
    }
    setArticlesList(prev => [{ title: newTitle, sector: newSector, reads: 0, revenue: 0, date: new Date().toLocaleDateString("en-IN") }, ...prev]);
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
      <SMESovereignPublicProfile
        profile={{ ...profile, bio: editBio }}
        displayName={displayName}
        displayDesignation={displayDesignation}
        displayOrg={displayOrg}
        displayCity={displayCity}
        displayCountry={displayCountry}
        avatarBase64={avatarBase64}
        bannerBase64={bannerBase64}
        onBack={() => setViewMode("private")}
      />
    );
  }

  // ── PRIVATE / DASHBOARD VIEW (4 Tabs: Overview, Articles, Insights, Settings) ──
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "articles", label: `Articles (${articlesList.length})` },
    { id: "insights", label: "Insights" },
    { id: "settings", label: "Settings" },
  ] as const;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* View toggle bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-xs text-gray-400">
          <span className="font-bold text-gray-600 dark:text-gray-300">SME Sovereign Dashboard</span> — private view
        </div>
        <button
          onClick={() => setViewMode("public")}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition-all hover:border-gray-400"
        >
          <Eye className="w-3.5 h-3.5" /> Preview Public Profile
        </button>
      </div>

      {/* Profile header */}
      <div className="relative bg-white dark:bg-[#122238] rounded-3xl border-2 border-purple-500/30 shadow-2xl overflow-hidden mb-8">
        {/* Cinematic banner with click to change */}
        <div className="relative h-44 overflow-hidden group cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
          {bannerBase64 ? (
            <img src={bannerBase64} alt="banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a113b] via-purple-800 to-violet-900" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(167,139,250,0.3),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(245,158,11,0.15),transparent_60%)]" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-xs text-white font-bold flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <Upload className="w-3.5 h-3.5" /> Change Banner
            </span>
          </div>
          <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase text-amber-200 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-3 py-1.5 rounded-full tracking-widest">
              <Crown className="w-3 h-3 text-amber-400" /> SME Sovereign Member
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-16 mb-6 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[18px] border-4 border-white dark:border-[#122238] overflow-hidden shadow-2xl relative z-10 ring-4 ring-purple-500/40">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-purple-600 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-900/20">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 z-20 flex items-center justify-center rounded-[18px] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-6 h-6 text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1 pt-16">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-full tracking-widest shadow-lg">
                  <Crown className="w-3 h-3 fill-white" /> SME Sovereign
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-purple-700 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> Sovereign Verified
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-purple-50/40 dark:bg-purple-950/10 rounded-xl border border-purple-100 dark:border-purple-900/20">
            <Globe className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="flex-1 truncate text-[10px] text-gray-500">{profileUrl}</span>
            <button onClick={handleCopy} className="text-[10px] font-bold text-purple-600 hover:text-[#F0652E] transition-colors flex items-center gap-1">
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
              { label: "Sovereign Articles", value: stats.articles, icon: FileText, color: "from-purple-600 to-indigo-600" },
              { label: "Total Reads", value: stats.totalReads.toLocaleString(), icon: Eye, color: "from-blue-600 to-cyan-600" },
              { label: "Profile Impressions", value: stats.profileViews.toLocaleString(), icon: Users, color: "from-emerald-600 to-teal-600" },
              { label: "Article Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "from-amber-500 to-yellow-500" },
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
                    <Newspaper className="w-4 h-4 text-purple-600" /> Sovereign Column Highlights
                  </h3>
                  <button onClick={() => setActiveTab("articles")} className="text-xs text-purple-600 font-bold hover:underline">
                    View all ({articlesList.length})
                  </button>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-white/5">
                  {articlesList.map((a, i) => (
                    <div key={i} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{a.title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-purple-600 block">{a.reads.toLocaleString()} reads</span>
                        <span className="text-[10px] font-bold text-emerald-600">+₹{a.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-purple-500/20 shadow-sm space-y-3 bg-gradient-to-br from-purple-500/5 to-amber-500/5">
                <h3 className="font-bold text-sm text-[#1D1D46] dark:text-white flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" /> Sovereign Honors
                </h3>
                <div className="text-xs text-gray-500 space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-white/5">
                    <span>Editorial Board</span>
                    <span className="font-bold text-purple-600">Active Contributor</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100 dark:border-white/5">
                    <span>Domain SEO Authority</span>
                    <span className="font-bold text-emerald-600">Rank #{stats.seoDomainRank}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Newsletter Syndication</span>
                    <span className="font-bold text-amber-600">Enabled (Weekly)</span>
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
              <h2 className="font-bold text-[#1D1D46] dark:text-white">Sovereign Column Articles</h2>
              <p className="text-xs text-gray-400 mt-0.5">High-impact trade and policy commentary syndicated across iGEN network</p>
            </div>
            <button onClick={() => setShowPublishForm(v => !v)} className="px-4 py-2 bg-gradient-to-r from-purple-700 to-violet-600 text-white text-xs font-bold rounded-xl hover:opacity-90 flex items-center gap-1.5 shadow-sm">
              <FileText className="w-3.5 h-3.5" /> New Article
            </button>
          </div>

          {showPublishForm && (
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-purple-100 dark:border-purple-900/20 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#1D1D46] dark:text-white">Publish Sovereign Column Article</h3>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Article title…"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-[#1D1D46] dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              />
              <select
                value={newSector}
                onChange={e => setNewSector(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-[#1D1D46] dark:text-white focus:outline-hidden"
              >
                {SECTORS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={handlePublish} className="flex-1 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Publish Instantly (Sovereign Priority)
                </button>
                <button onClick={() => setShowPublishForm(false)} className="px-4 py-2.5 text-xs font-bold text-gray-500 bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm space-y-3">
            {articlesList.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50 dark:border-white/5 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#1D1D46] dark:text-white hover:text-[#F0652E] cursor-pointer">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.sector} · {a.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-purple-600">{a.reads.toLocaleString()} reads</p>
                  <p className="text-[10px] font-bold text-emerald-600">+₹{a.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. INSIGHTS TAB ── */}
      {activeTab === "insights" && (
        <SmeAnalyticsHub currentTier="sovereign" role="sme" userName={displayName} />
      )}

      {/* ── 4. SETTINGS TAB ── */}
      {activeTab === "settings" && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
          <div>
            <h2 className="font-bold text-[#1D1D46] dark:text-white text-base flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-purple-600" /> Sovereign Profile Settings
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage your verified executive identity and sovereign editorial profile</p>
          </div>

          {settingsSaved && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" /> Sovereign profile details updated!
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
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Designation</label>
                <input
                  type="text"
                  value={editDesignation}
                  onChange={e => setEditDesignation(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
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
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">City</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={e => setEditCity(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Country</label>
                <input
                  type="text"
                  value={editCountry}
                  onChange={e => setEditCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 font-bold mb-1">Executive Tagline & Bio</label>
              <textarea
                rows={3}
                value={editBio}
                onChange={e => setEditBio(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-700 to-violet-600 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-xs transition-opacity"
              >
                Save Sovereign Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

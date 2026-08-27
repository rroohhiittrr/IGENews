"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Edit, Check, Upload, MapPin, Briefcase,
  FileText, Lock, ArrowRight, ShieldAlert, Eye
} from "lucide-react";

export default function AssociateSMEFreeDashboard() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "articles">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Article state (3 max cap)
  const [articles, setArticles] = useState<{ title: string; sector: string; date: string }[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState("manufacturing");
  const [showPublishForm, setShowPublishForm] = useState(false);

  const profileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${locale}/sme/${user?.id || "profile"}`
    : "";

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

  const handlePublish = () => {
    if (!newTitle.trim()) return;
    if (articles.length >= 3) return;
    setArticles(prev => [{ title: newTitle, sector: newSector, date: new Date().toLocaleDateString("en-IN") }, ...prev]);
    setNewTitle("");
    setShowPublishForm(false);
  };

  const displayName = profile.fullName || user?.name || "Your Name";
  const displayDesignation = profile.currentDesignation || "Trade & Industry Professional";
  const displayOrg = profile.organisation || "Independent Specialist";
  const displayCity = profile.city || "Mumbai";
  const displayCountry = profile.country || "India";

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* ── PROFILE HEADER CARD ── */}
      <div className="bg-white dark:bg-[#122238] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden mb-8">

        {/* Gray header band (no banner) */}
        <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/5 dark:to-white/3 relative">
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-gray-200 dark:bg-white/10 px-2.5 py-1 rounded-full">
              Free Tier
            </span>
          </div>
        </div>

        {/* Avatar + Name row */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-5">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl border-4 border-white dark:border-[#122238] bg-gray-100 dark:bg-white/5 overflow-hidden shadow-sm">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-black text-gray-400 dark:text-gray-500">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="w-5 h-5 text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            {/* Name area */}
            <div className="flex-1 pt-10">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                {/* Basic badge — gray, no blue tick */}
                <span className="text-[9px] font-black uppercase bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full tracking-widest">
                  Associate SME
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}
              </p>
            </div>
          </div>

          {/* Profile URL bar */}
          <div className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 text-xs text-gray-500 mb-5">
            <span className="flex-1 truncate text-[10px] text-gray-400">{profileUrl}</span>
            <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-[#F0652E] transition-colors">
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copiedUrl ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Upgrade CTA */}
          <button
            onClick={() => router.push(`/${locale}/profile/plans/sme`)}
            className="w-full py-2.5 flex items-center justify-center gap-2 bg-[#1D1D46] hover:bg-[#F0652E] text-white text-xs font-bold rounded-xl transition-all"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            Upgrade to Associate SME Pro to unlock more
          </button>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 w-fit">
        {(["overview", "articles"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all capitalize ${
              activeTab === tab
                ? "bg-white dark:bg-[#1D1D46] text-[#1D1D46] dark:text-white shadow-sm"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Basic Info */}
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
              <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" /> Professional Profile
              </h2>
              <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex gap-2">
                  <span className="font-bold text-gray-400 w-28 shrink-0">Designation</span>
                  <span>{displayDesignation}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-gray-400 w-28 shrink-0">Organisation</span>
                  <span>{displayOrg}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-gray-400 w-28 shrink-0">Location</span>
                  <span>{displayCity}, {displayCountry}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-gray-400 w-28 shrink-0">Primary Sector</span>
                  <span className="capitalize">{profile.sector || "Manufacturing"}</span>
                </div>
              </div>
            </div>

            {/* Locked features preview */}
            <div className="space-y-3">
              {[
                { icon: Eye, label: "Consulting Inquiry Form", desc: "Let readers request consulting sessions" },
                { icon: FileText, label: "Revenue Dashboard", desc: "Track earnings from articles and bookings" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-dashed border-gray-200 dark:border-white/10 flex items-center gap-3 opacity-60">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500">{item.label}</p>
                    <p className="text-[10px] text-gray-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => router.push(`/${locale}/profile/plans/sme`)}
                    className="text-[10px] font-bold text-[#F0652E] hover:underline whitespace-nowrap"
                  >
                    Upgrade →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Plan summary */}
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm space-y-3">
              <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm">Your Plan</h3>
              <div className="text-xs text-gray-500 space-y-2">
                <div className="flex justify-between">
                  <span>Articles published</span>
                  <span className="font-bold text-[#1D1D46] dark:text-white">{articles.length} / 3</span>
                </div>
                <div className="flex justify-between">
                  <span>Sector tags</span>
                  <span className="font-bold text-[#1D1D46] dark:text-white">2 max</span>
                </div>
                <div className="flex justify-between">
                  <span>Consulting</span>
                  <span className="font-bold text-red-400">Locked</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue share</span>
                  <span className="font-bold text-red-400">Locked</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-white/10">
                <button
                  onClick={() => router.push(`/${locale}/profile/plans/sme`)}
                  className="w-full py-2.5 bg-[#1D1D46] text-white text-xs font-bold rounded-xl hover:bg-[#F0652E] transition-all"
                >
                  View Upgrade Plans
                </button>
              </div>
            </div>

            {/* Visibility notice */}
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 text-xs text-gray-400 space-y-1">
              <p className="font-bold text-gray-500 dark:text-gray-300">Profile Visibility</p>
              <p>Your profile is <span className="font-bold text-gray-600 dark:text-gray-200">private</span>. Upgrade to Associate Pro to make it discoverable on the platform.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── ARTICLES TAB ── */}
      {activeTab === "articles" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#1D1D46] dark:text-white">My Articles</h2>
              <p className="text-xs text-gray-400 mt-0.5">{articles.length} / 3 published (Free tier limit)</p>
            </div>
            {articles.length < 3 && (
              <button
                onClick={() => setShowPublishForm(true)}
                className="px-4 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-xl hover:bg-[#F0652E] transition-all"
              >
                + Publish Article
              </button>
            )}
          </div>

          {/* Publish form */}
          {showPublishForm && (
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-[#1D1D46] dark:text-white">New Article</h3>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Article title..."
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#F0652E]"
              />
              <select
                value={newSector}
                onChange={e => setNewSector(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#F0652E]"
              >
                {["manufacturing", "chemicals", "textiles", "logistics", "steel", "pharmaceuticals"].map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button onClick={handlePublish} className="px-5 py-2 bg-[#1D1D46] text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-all">
                  Publish
                </button>
                <button onClick={() => setShowPublishForm(false)} className="px-4 py-2 text-xs text-gray-500 hover:text-gray-700">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Article list */}
          {articles.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold">No articles yet</p>
              <p className="text-xs mt-1">Publish your first trade intelligence article to build authority.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((a, i) => (
                <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-4 border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
                  </div>
                  <span className="text-[9px] font-black bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase">
                    Published
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Locked cap warning */}
          {articles.length >= 3 && (
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 rounded-2xl p-4 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-orange-500 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-orange-700 dark:text-orange-400">Free tier limit reached</p>
                <p className="text-xs text-orange-500 mt-0.5">Upgrade to Associate SME Pro for unlimited article publishing.</p>
              </div>
              <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="text-xs font-bold text-[#F0652E] hover:underline whitespace-nowrap">
                Upgrade →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

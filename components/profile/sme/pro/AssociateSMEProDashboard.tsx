"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Check, Upload, MapPin, FileText, Eye, EyeOff,
  BarChart3, MessageSquare, ShieldCheck, Lock, Globe,
  Send, ArrowRight, TrendingUp, Calendar
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

// ─── Public Profile Card ─────────────────────────────────
function SMEProPublicProfile({
  profile, displayName, displayDesignation, displayOrg,
  displayCity, displayCountry, avatarBase64, openToConsulting, articles,
  onBack,
}: any) {
  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-3xl mx-auto pb-24">
      <div className="flex justify-end mb-5">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition-all">
          <EyeOff className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-white dark:bg-[#122238] rounded-3xl border-2 border-blue-200 dark:border-blue-900/30 shadow-lg overflow-hidden mb-6">
        {/* Blue banner */}
        <div className="h-28 bg-gradient-to-r from-[#1E3A5F] via-blue-700 to-blue-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(96,165,250,0.25),transparent_60%)]" />
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-200 bg-blue-500/20 backdrop-blur-sm border border-blue-400/20 px-2.5 py-1 rounded-full">
              ✦ SME Pro
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12 mb-5">
            <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#122238] overflow-hidden shadow-lg ring-4 ring-blue-400/30 shrink-0">
              {avatarBase64 ? (
                <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-black text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 pt-12">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-blue-600 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> SME Pro
                </span>
                {openToConsulting && (
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 px-2 py-0.5 rounded-full">
                    Open to Consulting
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}
              </p>
            </div>
          </div>

          {/* Sector tags */}
          {profile.sectors?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.sectors.slice(0, 6).map((s: string, i: number) => (
                <span key={i} className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30 px-2.5 py-1 rounded-full capitalize">{s}</span>
              ))}
            </div>
          )}

          {/* Affiliate Promotion Coupon Card */}
          {(() => {
            const firstPart = displayName.split(" ")[0].toUpperCase();
            const couponCode = `SME-${firstPart}-10`;
            return (
              <div className="mb-4 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold shrink-0">🏷️</div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#1D1D46] dark:text-white">IGE Affiliate Invitation</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Get 10% off premium reader plans using my code.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#122238] border border-amber-500/30 px-3 py-1.5 rounded-xl shrink-0">
                  <span className="text-xs font-black text-amber-600 font-mono tracking-wide">{couponCode}</span>
                  <button onClick={() => {
                    navigator.clipboard.writeText(couponCode);
                    alert("Coupon code copied to clipboard!");
                  }} className="text-[10px] font-bold text-gray-500 hover:text-amber-600 ml-1">Copy</button>
                </div>
              </div>
            );
          })()}

          {/* Consulting CTA */}
          {openToConsulting ? (
            <button className="w-full py-3 bg-[#1E3A5F] hover:bg-blue-800 text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Consulting Inquiry
            </button>
          ) : (
            <div className="w-full py-3 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 text-center text-xs text-gray-400 rounded-2xl">
              Currently not accepting new inquiries
            </div>
          )}
        </div>
      </div>

      {/* Published articles */}
      {articles.length > 0 && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-5">
          <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-blue-500" /> Published Articles
          </h2>
          <div className="space-y-3">
            {articles.map((a: any, i: number) => (
              <div key={i} className="flex items-start justify-between gap-3 py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                <div>
                  <p className="text-xs font-bold text-[#1D1D46] dark:text-white hover:text-[#F0652E] cursor-pointer">{a.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
                </div>
                <span className="text-[10px] font-bold text-blue-500 whitespace-nowrap">{a.reads.toLocaleString()} reads</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────
export default function AssociateSMEProDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "consulting" | "insights" | "affiliate">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [openToConsulting, setOpenToConsulting] = useState(true);
  const [articles, setArticles] = useState<{ title: string; sector: string; date: string; reads: number }[]>([
    { title: "How India-UAE CEPA is reshaping chemical exports", sector: "chemicals", date: "Aug 10, 2026", reads: 1240 },
    { title: "Steel procurement under FTA: A buyer's guide", sector: "steel", date: "Jul 22, 2026", reads: 890 },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState(profile.sector || "manufacturing");
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [inquiries] = useState([
    { name: "Rajiv Menon", company: "Chem Exports Ltd", topic: "CEPA duty advisory", date: "2 days ago" },
    { name: "Priya Shah", company: "Textile Hub India", topic: "FTA negotiation guidance", date: "5 days ago" },
  ]);

  const sampleName = "Dr. Vikram Malhotra";
  const rawName = profile.fullName || user?.name;
  const isGeneric = !rawName || rawName === "SME Pro User" || rawName === "Your Name" || rawName.toLowerCase().includes("user");
  const displayName = isGeneric ? sampleName : rawName;
  const displayDesignation = profile.currentDesignation || "Senior Trade Policy Specialist";
  const displayOrg = profile.organisation || "Global Commerce Advisory";
  const displayCity = profile.city || "Mumbai";
  const displayCountry = profile.country || "India";
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
    setArticles(prev => [{ title: newTitle, sector: newSector, date: new Date().toLocaleDateString("en-IN"), reads: 0 }, ...prev]);
    setNewTitle("");
    setShowPublishForm(false);
  };

  // ── PUBLIC VIEW ─────────────────────────────────────────
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
        openToConsulting={openToConsulting}
        articles={articles}
        onBack={() => setViewMode("private")}
      />
    );
  }

  // ── PRIVATE / DASHBOARD VIEW ─────────────────────────────
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "articles", label: `Articles (${articles.length})` },
    { id: "consulting", label: `Inquiries (${inquiries.length})` },
    { id: "insights", label: "Insights" },
    { id: "affiliate", label: "Affiliate Tools" },
  ] as const;

  const firstPart = displayName.split(" ")[0].toUpperCase();
  const rolePrefix = user?.onboardingRole === "associate-sme" ? "ASME" : "SME";
  const couponCode = `${rolePrefix}-${firstPart}-10`;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* View toggle bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-xs text-gray-400">
          <span className="font-bold text-gray-600 dark:text-gray-300">SME Pro Dashboard</span> — private view
        </div>
        <button
          onClick={() => setViewMode("public")}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition-all hover:border-gray-400"
        >
          <Eye className="w-3.5 h-3.5" /> Preview Public Profile
        </button>
      </div>

      {/* Profile header */}
      <div className="relative bg-white dark:bg-[#122238] rounded-3xl border-2 border-blue-200 dark:border-blue-900/30 shadow-lg overflow-hidden mb-8">
        {/* Blue gradient header */}
        <div className="h-32 bg-gradient-to-r from-[#1E3A5F] via-blue-700 to-blue-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(96,165,250,0.2),transparent_60%)]" />
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-200 bg-blue-500/20 backdrop-blur-sm border border-blue-400/20 px-3 py-1.5 rounded-full">
              ✦ SME Pro Verified
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12 mb-5">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#122238] overflow-hidden shadow-lg ring-4 ring-blue-400/30 relative z-10">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-black text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-5 h-5 text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1 pt-12">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-blue-600 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> SME Pro Verified
                </span>
                {openToConsulting && (
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 px-2 py-0.5 rounded-full">
                    Open to Consulting
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}</p>
            </div>
          </div>

          {/* Profile URL + consulting toggle */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px] p-2.5 bg-blue-50/40 dark:bg-blue-950/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
              <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="flex-1 truncate text-[10px] text-gray-500">{profileUrl}</span>
              <button onClick={handleCopy} className="text-[10px] font-bold text-blue-600 hover:text-[#F0652E] transition-colors flex items-center gap-1">
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedUrl ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              onClick={() => setOpenToConsulting(v => !v)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[10px] font-bold transition-all ${
                openToConsulting
                  ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400"
                  : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400"
              }`}
            >
              {openToConsulting ? "✓ Open to Consulting" : "Consulting Off"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
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

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Articles", value: articles.length, icon: FileText, color: "from-blue-600 to-blue-500" },
            { label: "Total Reads", value: articles.reduce((a, b) => a + b.reads, 0).toLocaleString(), icon: Eye, color: "from-indigo-600 to-indigo-500" },
            { label: "Inquiries", value: inquiries.length, icon: MessageSquare, color: "from-emerald-600 to-teal-500" },
            { label: "Article Revenue", value: `₹${(articles.reduce((a, b) => a + b.reads, 0) * 0.05).toFixed(0)}`, icon: TrendingUp, color: "from-amber-500 to-yellow-500" },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl p-4 bg-gradient-to-br ${s.color} text-white shadow-md`}>
              <s.icon className="w-5 h-5 mb-2 opacity-80" />
              <p className="text-2xl font-black">{s.value}</p>
              <p className="text-[9px] opacity-80 mt-0.5 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── ARTICLES TAB ── */}
      {activeTab === "articles" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#1D1D46] dark:text-white">Your Articles</h2>
              <p className="text-xs text-gray-400 mt-0.5">Readers earn ₹50 per 1,000 reads</p>
            </div>
            <button onClick={() => setShowPublishForm(v => !v)} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> New Article
            </button>
          </div>

          {showPublishForm && (
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-blue-100 dark:border-blue-900/20 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#1D1D46] dark:text-white">Publish New Article</h3>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Article title…"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-[#1D1D46] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={newSector}
                onChange={e => setNewSector(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 text-[#1D1D46] dark:text-white focus:outline-none"
              >
                {SECTORS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={handlePublish} className="flex-1 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 flex items-center justify-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Submit for Review
                </button>
                <button onClick={() => setShowPublishForm(false)} className="px-4 py-2.5 text-xs font-bold text-gray-500 bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm divide-y divide-gray-50 dark:divide-white/5">
            {articles.length === 0 && (
              <div className="p-8 text-center text-xs text-gray-400">
                No articles yet. Publish your first trade insight!
              </div>
            )}
            {articles.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{a.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-blue-600">{a.reads.toLocaleString()} reads</p>
                  <p className="text-[10px] font-bold text-emerald-600">+₹{(a.reads * 0.05).toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONSULTING TAB ── */}
      {activeTab === "consulting" && (
        <div className="space-y-4">
          <h2 className="font-bold text-[#1D1D46] dark:text-white">Consulting Inquiries</h2>
          {inquiries.map((inq, i) => (
            <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center text-sm font-black text-blue-600 shrink-0">
                {inq.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{inq.name}</p>
                <p className="text-xs text-gray-500">{inq.company} · {inq.date}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 italic">"{inq.topic}"</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-700">Accept</button>
                <button className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-500 text-[10px] font-bold rounded-xl">Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── INSIGHTS TAB ── */}
      {activeTab === "insights" && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
          <h2 className="font-bold text-[#1D1D46] dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-500" /> Profile & Content Insights
          </h2>
          <div className="space-y-3 text-xs text-gray-500">
            {[
              { label: "Profile views (30 days)", value: "842" },
              { label: "Expert Directory rank", value: "#12 in Chemicals" },
              { label: "Avg reads per article", value: ((articles.reduce((a, b) => a + b.reads, 0)) / Math.max(articles.length, 1)).toFixed(0) },
              { label: "Consulting conversion rate", value: "4.2%" },
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                <span>{s.label}</span>
                <span className="font-bold text-[#1D1D46] dark:text-white">{s.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 bg-blue-50 dark:bg-blue-950/10 rounded-2xl border border-blue-100 dark:border-blue-900/20 text-xs text-blue-700 dark:text-blue-400">
            <p className="font-bold mb-1">💡 Upgrade to SME Elite for full analytics</p>
            <p className="text-blue-600/70 dark:text-blue-500/70">Elite unlocks booking revenue dashboard, CEPA tariff advisory pricing, and full IGE content calendar.</p>
            <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="mt-2 text-[10px] font-black text-blue-600 hover:underline flex items-center gap-1">
              View Elite Plan <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* ── AFFILIATE TAB ── */}
      {activeTab === "affiliate" && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-white/5 pb-4">
            <div>
              <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm">Affiliate Partner Dashboard</h2>
              <p className="text-xs text-gray-400 mt-0.5">Share IGE to earn cash commissions on reader purchases.</p>
            </div>
            <span className="text-[10px] font-black uppercase bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20 tracking-wider">
              ✦ Commission Eligible
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Link Clicks", value: "142" },
              { label: "Signups", value: "28" },
              { label: "Conversions", value: "11" },
              { label: "Earned Commissions", value: "₹12,450", green: true },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{s.label}</p>
                <p className={`text-xl font-black mt-1 ${s.green ? "text-emerald-600 animate-pulse" : "text-[#1D1D46] dark:text-white"}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Affiliate Link</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  readOnly
                  value={profileUrl.replace("/sme/", "/ref?code=" + couponCode.toLowerCase())}
                  className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-gray-500 font-mono focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(profileUrl.replace("/sme/", "/ref?code=" + couponCode.toLowerCase()));
                    alert("Affiliate link copied!");
                  }}
                  className="px-4 py-2.5 bg-[#1D1D46] hover:bg-[#F0652E] text-white text-xs font-bold rounded-xl transition-all"
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Custom Invite Discount Coupon Code</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  readOnly
                  value={couponCode}
                  className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-xs text-gray-500 font-mono focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(couponCode);
                    alert("Coupon code copied!");
                  }}
                  className="px-4 py-2.5 bg-[#1D1D46] hover:bg-[#F0652E] text-white text-xs font-bold rounded-xl transition-all"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 text-xs">
            <p className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">🏦 Commission Earnings Model</p>
            <p className="text-gray-600 dark:text-gray-400">As a paid member, your commissions are paid directly in cash via bank transfer or UPI. Payouts are made automatically on the 1st of every month.</p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Check, Upload, MapPin, FileText, Eye, EyeOff,
  BarChart3, MessageSquare, ShieldCheck, Star, Globe,
  Calendar, TrendingUp, BookOpen, Award, ExternalLink,
  Send, ArrowRight, DollarSign
} from "lucide-react";

// ─── Public Profile Card (ASME Elite Emerald) ──────────────
function ASMEElitePublicProfile({ profile, displayName, displayDesignation, displayOrg, displayCity, displayCountry, avatarBase64, bannerBase64, openToConsulting, consultingRate, articles, onBack }: any) {
  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-3xl mx-auto pb-24">
      <div className="flex justify-end mb-5">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition-all">
          <EyeOff className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      <div className="bg-white dark:bg-[#122238] rounded-3xl border-2 border-emerald-200 dark:border-emerald-900/30 shadow-xl overflow-hidden mb-6">
        {/* Emerald banner */}
        <div className="h-32 relative overflow-hidden group">
          {bannerBase64 ? (
            <img src={bannerBase64} alt="banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] via-emerald-700 to-teal-600" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(52,211,153,0.25),transparent_60%)]" />
            </div>
          )}
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-200 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/20 px-3 py-1.5 rounded-full">
              ★ ASME Elite
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-14 mb-5">
            <div className="w-28 h-28 rounded-2xl border-4 border-white dark:border-[#122238] overflow-hidden shadow-xl ring-4 ring-emerald-400/40 shrink-0">
              {avatarBase64 ? (
                <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/30 dark:to-teal-900/20">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 pt-14">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase bg-emerald-600 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <Star className="w-3 h-3 fill-white" /> ASME Elite
                </span>
                {openToConsulting && (
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 px-2 py-0.5 rounded-full">
                    Open to Consulting
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}</p>
            </div>
          </div>

          {profile.bio && <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed">"{profile.bio}"</p>}

          {profile.sectors?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.sectors.slice(0, 8).map((s: string, i: number) => (
                <span key={i} className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/30 px-2.5 py-1 rounded-full capitalize">{s}</span>
              ))}
            </div>
          )}

          {/* Affiliate Promotion Coupon Card */}
          {(() => {
            const firstPart = displayName.split(" ")[0].toUpperCase();
            const couponCode = `ASME-${firstPart}-10`;
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

          {openToConsulting ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Consulting Rate</p>
                  <p className="text-[10px] text-emerald-600/70 dark:text-emerald-500/70">₹{consultingRate} / session (60 min)</p>
                </div>
              </div>
              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                <Calendar className="w-4 h-4" /> Book a Consulting Session
              </button>
            </div>
          ) : (
            <div className="w-full py-3 bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 text-center text-xs text-gray-400 rounded-2xl">
              Currently not accepting new bookings
            </div>
          )}
        </div>
      </div>

      {/* Published articles */}
      {articles.length > 0 && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-5">
          <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-emerald-500" /> Published Articles
          </h2>
          <div className="space-y-3">
            {articles.map((a: any, i: number) => (
              <div key={i} className="flex items-start justify-between gap-3 py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                <div>
                  <p className="text-xs font-bold text-[#1D1D46] dark:text-white hover:text-[#F0652E] cursor-pointer">{a.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 whitespace-nowrap">{a.reads.toLocaleString()} reads</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
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

  const sampleName = "Ananya Krishnan";
  const rawName = profile.fullName || user?.name;
  const isGeneric = !rawName || rawName === "SME Pro User" || rawName === "Your Name" || rawName.toLowerCase().includes("user");
  const displayName = isGeneric ? sampleName : rawName;

  const firstPart = displayName.split(" ")[0].toUpperCase();
  const couponCode = `ASME-${firstPart}-10`;
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "consulting" | "revenue" | "settings">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const [bannerBase64, setBannerBase64] = useState(profile.bannerBase64 || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [openToConsulting, setOpenToConsulting] = useState(true);
  const [consultingRate, setConsultingRate] = useState(profile.consultingRate || "4,000");
  const [editingRate, setEditingRate] = useState(false);

  const [articles, setArticles] = useState([
    { title: "Specialist steel sourcing alternatives for MSMEs", sector: "steel", date: "Aug 11, 2026", reads: 1450, revenue: 72 },
    { title: "Logistics tracking structures in bilateral corridors", sector: "logistics", date: "Jul 15, 2026", reads: 890, revenue: 44 },
  ]);
  const [bookings] = useState([
    { name: "Vikram Malhotra", company: "Steel Hub Industries", topic: "Bilateral duty optimization", date: "Sep 2, 2026 · 11AM", status: "Pending", amount: 4000 },
  ]);

  const displayDesignation = profile.currentDesignation || "Associate Trade Consultant";
  const displayOrg = profile.organisation || "Logistics & Sourcing Specialist";
  const displayCity = profile.city || "Mumbai";
  const displayCountry = profile.country || "India";
  const profileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${locale}/associate-sme/${user?.id || user?.uid || "profile"}`
    : "";

  const totalRevenue = articles.reduce((a, b) => a + b.revenue, 0) + bookings.reduce((a, b) => a + b.amount, 0) * 0.7;

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

  // ── PUBLIC VIEW ─────────────────────────────────────────
  if (viewMode === "public") {
    return (
      <ASMEElitePublicProfile
        profile={profile}
        displayName={displayName}
        displayDesignation={displayDesignation}
        displayOrg={displayOrg}
        displayCity={displayCity}
        displayCountry={displayCountry}
        avatarBase64={avatarBase64}
        bannerBase64={bannerBase64}
        openToConsulting={openToConsulting}
        consultingRate={consultingRate}
        articles={articles}
        onBack={() => setViewMode("private")}
      />
    );
  }

  // ── PRIVATE / DASHBOARD VIEW ─────────────────────────────
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "articles", label: `Articles (${articles.length}/6)` },
    { id: "consulting", label: `Bookings (${bookings.length})` },
    { id: "revenue", label: "Revenue" },
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
        {/* Emerald banner */}
        <div className="h-40 relative overflow-hidden group cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
          {bannerBase64 ? (
            <img src={bannerBase64} alt="banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] via-emerald-700 to-teal-600" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(52,211,153,0.25),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <div className="flex items-center gap-2 text-white text-xs font-bold bg-white/15 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                  <Upload className="w-4 h-4" /> Upload Banner
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-200 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/20 px-3 py-1.5 rounded-full">
              ★ ASME Elite
            </span>
          </div>
          <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-14 mb-5">
            <div className="relative group">
              <div className="absolute inset-[-4px] rounded-[20px] ring-2 ring-emerald-400/50 ring-offset-2 ring-offset-white dark:ring-offset-[#122238]" />
              <div className="w-28 h-28 rounded-[18px] border-4 border-white dark:border-[#122238] overflow-hidden shadow-xl relative z-10">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-black text-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/30 dark:to-teal-900/20">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 z-20 flex items-center justify-center rounded-[18px] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-5 h-5 text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1 pt-14">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full tracking-widest shadow-sm">
                  <Star className="w-3 h-3 fill-white" /> ASME Elite
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

          {/* URL + consulting toggle row */}
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px] p-2.5 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="flex-1 truncate text-[10px] text-gray-500">{profileUrl}</span>
              <button onClick={handleCopy} className="text-[10px] font-bold text-emerald-600 hover:text-[#F0652E] flex items-center gap-1">
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedUrl ? "Copied!" : "Copy"}
              </button>
            </div>
            <button onClick={() => setOpenToConsulting(v => !v)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[10px] font-bold transition-all ${openToConsulting ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400" : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400"}`}>
              {openToConsulting ? "✓ Open to Consulting" : "Consulting Off"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 w-fit overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-white dark:bg-[#1D1D46] text-[#1D1D46] dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: TrendingUp, color: "from-emerald-600 to-teal-500" },
              { label: "Total Reads", value: articles.reduce((a, b) => a + b.reads, 0).toLocaleString(), icon: Eye, color: "from-blue-600 to-blue-500" },
              { label: "Bookings", value: bookings.length, icon: Calendar, color: "from-amber-500 to-yellow-500" },
              { label: "Articles", value: `${articles.length}/6`, icon: FileText, color: "from-purple-600 to-violet-500" },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl p-4 bg-gradient-to-br ${s.color} text-white shadow-md`}>
                <s.icon className="w-5 h-5 mb-2 opacity-80" />
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[9px] opacity-80 mt-0.5 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Rate card */}
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Consulting Rate</p>
              {editingRate ? (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">₹</span>
                  <input autoFocus value={consultingRate} onChange={e => setConsultingRate(e.target.value)} className="text-lg font-black text-[#1D1D46] dark:text-white bg-transparent border-b-2 border-emerald-400 focus:outline-none w-24" />
                  <span className="text-xs text-gray-400">/ session</span>
                  <button onClick={() => setEditingRate(false)} className="text-[10px] font-bold text-emerald-600"><Check className="w-4 h-4" /></button>
                </div>
              ) : (
                <p className="text-2xl font-black text-[#1D1D46] dark:text-white mt-1">₹{consultingRate} <span className="text-sm font-normal text-gray-400">/ session</span></p>
              )}
            </div>
            {!editingRate && (
              <button onClick={() => setEditingRate(true)} className="px-3 py-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/30">
                Edit Rate
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── ARTICLES ── */}
      {activeTab === "articles" && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm divide-y divide-gray-50 dark:divide-white/5">
          <div className="p-4 flex items-center justify-between">
            <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm">Published Articles</h2>
            <button className="px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-xl hover:bg-emerald-700 flex items-center gap-1">
              <FileText className="w-3 h-3" /> New Article
            </button>
          </div>
          {articles.map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <div className="flex-1">
                <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{a.title}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-blue-600">{a.reads.toLocaleString()} reads</p>
                <p className="text-[10px] font-bold text-emerald-600">+₹{a.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CONSULTING ── */}
      {activeTab === "consulting" && (
        <div className="space-y-4">
          <h2 className="font-bold text-[#1D1D46] dark:text-white">Booked Sessions</h2>
          {bookings.map((b, i) => (
            <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/20 flex items-center justify-center text-sm font-black text-emerald-700 shrink-0">
                {b.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{b.name}</p>
                <p className="text-xs text-gray-500">{b.company} · {b.date}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 italic">"{b.topic}"</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${b.status === "Confirmed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"}`}>
                  {b.status}
                </span>
                <p className="text-xs font-bold text-emerald-600 mt-1">₹{b.amount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── REVENUE ── */}
      {activeTab === "revenue" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Revenue Split (70/30)</h3>
            <p className="text-xs text-white/60 mb-4">You earn 70% of all consulting fees. IGE retains 30%.</p>
            <div className="text-4xl font-black">₹{totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <p className="text-sm text-white/70 mt-1">Your share this month</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Consulting (70%)", value: `₹${(bookings.reduce((a, b) => a + b.amount, 0) * 0.7).toLocaleString()}`, desc: `${bookings.length} sessions` },
              { label: "Article reads", value: `₹${articles.reduce((a, b) => a + b.revenue, 0)}`, desc: `${articles.reduce((a, b) => a + b.reads, 0).toLocaleString()} reads` },
              { label: "Report sales", value: "₹0", desc: "No reports published" },
            ].map((r, i) => (
              <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
                <p className="text-2xl font-black text-[#1D1D46] dark:text-white">{r.value}</p>
                <p className="text-xs font-bold text-gray-500 mt-1">{r.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Affiliate Referral Section */}
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-white/5 pb-3">
              <h4 className="font-bold text-sm text-[#1D1D46] dark:text-white flex items-center gap-2">
                🏷️ Affiliate Partner Program
              </h4>
              <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
                Active Affiliate
              </span>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              As an IGE Elite partner, you earn cash payouts for every colleague or reader who upgrades to an IGE paid subscription using your invite.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Custom Coupon Code (10% Off)</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    readOnly
                    value={couponCode}
                    className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-2 rounded-xl text-xs text-gray-500 font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(couponCode);
                      alert("Coupon code copied!");
                    }}
                    className="px-4 py-2 bg-[#1D1D46] hover:bg-[#F0652E] text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Estimated Affiliate Commissions</label>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-500/10 mt-1 flex justify-between items-center h-10">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">₹4,250.00</span>
                  <span className="text-[9px] text-emerald-600/70 dark:text-emerald-500/70">11 referrals conversion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SETTINGS ── */}
      {activeTab === "settings" && (
        <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
          <h2 className="font-bold text-[#1D1D46] dark:text-white mb-4 text-sm">Profile Settings</h2>
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-white/5">
              <div>
                <p className="font-bold text-[#1D1D46] dark:text-white">Open to Consulting</p>
                <p className="text-gray-400 mt-0.5">Allow Readers to book consulting sessions</p>
              </div>
              <button onClick={() => setOpenToConsulting(v => !v)} className={`w-11 h-6 rounded-full transition-all ${openToConsulting ? "bg-emerald-500" : "bg-gray-200 dark:bg-white/10"}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-all mx-0.5 ${openToConsulting ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-white/5">
              <div>
                <p className="font-bold text-[#1D1D46] dark:text-white">Profile Visibility</p>
                <p className="text-gray-400 mt-0.5">Your profile is publicly indexed and SEO-ranked</p>
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded-full">Public</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

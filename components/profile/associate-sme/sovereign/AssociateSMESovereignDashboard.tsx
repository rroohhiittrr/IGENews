"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Edit, Check, Upload, MapPin,
  FileText, Eye, EyeOff, Sparkles, Send,
  BarChart3, MessageSquare, ShieldCheck, Star,
  Globe, Calendar, TrendingUp, BookOpen, Award,
  ExternalLink, Crown, Mail, Phone, Users, Newspaper
} from "lucide-react";

// ─── Public Profile Card (ASME Sovereign Purple & Gold) ───
function ASMESovereignPublicProfile({
  profile, displayName, displayDesignation, displayOrg,
  displayCity, displayCountry, avatarBase64, bannerBase64, onBack
}: any) {
  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-3xl mx-auto pb-24">
      <div className="flex justify-end mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition-all"
        >
          <EyeOff className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      <div className="bg-white dark:bg-[#122238] rounded-3xl border-2 border-purple-500/30 shadow-2xl overflow-hidden mb-6">
        {/* Cinematic banner */}
        <div className="relative h-44 overflow-hidden">
          {bannerBase64 ? (
            <img src={bannerBase64} alt="banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a113b] via-purple-800 to-violet-900" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(167,139,250,0.3),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(245,158,11,0.15),transparent_60%)]" />
            </div>
          )}

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase text-amber-200 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-3 py-1.5 rounded-full tracking-widest">
              <Crown className="w-3 h-3 text-amber-400" /> ASME Sovereign
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-16 mb-6 relative z-10">
            <div className="relative">
              <div className="absolute inset-[-6px] rounded-[20px] ring-2 ring-amber-400/60 ring-offset-2 ring-offset-white dark:ring-offset-[#122238]" />
              <div className="absolute inset-[-2px] rounded-[18px] ring-4 ring-purple-500/50 ring-offset-1 ring-offset-white dark:ring-offset-[#122238]" />
              <div className="w-32 h-32 rounded-[18px] border-4 border-white dark:border-[#122238] overflow-hidden shadow-2xl relative z-10">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-purple-600 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-900/20">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 pt-16">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-full tracking-widest shadow-lg">
                  <Crown className="w-3 h-3 fill-white" /> ASME Sovereign
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-purple-700 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> Sovereign Verified
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium italic">
                "{profile.tagline || `${(profile.experienceYears || 5)}+ years shaping trade insights.`}"
              </p>
              <p className="text-xs text-gray-500 mt-1">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap mb-5">
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline bg-blue-50 dark:bg-blue-950/20 px-2.5 py-1.5 rounded-xl border border-blue-100 dark:border-blue-900/20">
                <ExternalLink className="w-3 h-3" /> LinkedIn
              </a>
            )}
          </div>

          <div className="mb-5 p-4 bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3">
            <Crown className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#1D1D46] dark:text-white">Board Advisory Council</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Contributor role supporting strategic trade updates.</p>
            </div>
          </div>

          {/* Affiliate Promotion Coupon Card */}
          {(() => {
            const firstPart = displayName.split(" ")[0].toUpperCase();
            const couponCode = `ASME-${firstPart}-10`;
            return (
              <div className="mb-5 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between gap-3">
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

          <div className="space-y-3">
            <button className="w-full py-3 bg-gradient-to-r from-purple-700 to-violet-600 hover:opacity-90 text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
              <Calendar className="w-4 h-4" /> Book a Dedicated Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ASME Sovereign Dashboard ────────────────────────
export default function AssociateSMESovereignDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "revenue" | "editorial" | "advisory">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const [bannerBase64, setBannerBase64] = useState(profile.bannerBase64 || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const sampleName = "Ananya Krishnan";
  const rawName = profile.fullName || user?.name;
  const isGeneric = !rawName || rawName === "SME Pro User" || rawName === "Your Name" || rawName.toLowerCase().includes("user");
  const displayName = isGeneric ? sampleName : rawName;
  const displayDesignation = profile.currentDesignation || "Associate Trade Policy Specialist";
  const displayOrg = profile.organisation || "Independent Sovereign Contributor";
  const displayCity = profile.city || "New Delhi";
  const displayCountry = profile.country || "India";
  const profileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${locale}/associate-sme/${user?.id || user?.uid || "profile"}`
    : "";

  const firstPart = displayName.split(" ")[0].toUpperCase();
  const couponCode = `ASME-${firstPart}-10`;

  const stats = {
    totalRevenue: 184500,
    articleRevenue: 24500,
    bookingRevenue: 160000,
    reportSales: 0,
    totalReads: 48400,
    bookings: 8,
    articles: 18,
    reportDownloads: 0,
    profileViews: 9200,
    newsletterColumn: true,
    seoDomainRank: 8,
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

  // ── PUBLIC VIEW ─────────────────────────────────────────
  if (viewMode === "public") {
    return (
      <ASMESovereignPublicProfile
        profile={profile}
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

  // ── PRIVATE / DASHBOARD VIEW ─────────────────────────────
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "articles", label: `Articles (${stats.articles}/8)` },
    { id: "revenue", label: "Revenue" },
    { id: "editorial", label: "Editorial" },
    { id: "advisory", label: "Advisory" },
  ] as const;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* View toggle bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-xs text-gray-400">
          <span className="font-bold text-gray-600 dark:text-gray-300">ASME Sovereign Dashboard</span> — private view
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

        {/* Cinematic banner */}
        <div className="relative h-44 overflow-hidden group cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
          {bannerBase64 ? (
            <img src={bannerBase64} alt="banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a113b] via-purple-800 to-violet-900" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(167,139,250,0.3),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(245,158,11,0.15),transparent_60%)]" />
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(45deg, transparent 40%, rgba(251,191,36,0.05) 50%, transparent 60%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 4s linear infinite"
              }} />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <div className="flex items-center gap-2 text-white text-xs font-bold bg-white/15 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                  <Upload className="w-4 h-4" /> Upload Cinematic Banner
                </div>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase text-amber-200 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-3 py-1.5 rounded-full tracking-widest">
              <Crown className="w-3 h-3 text-amber-400" /> ASME Sovereign
            </span>
          </div>

          <div className="absolute bottom-3 left-4">
            <span className="text-[9px] font-bold text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              🛡️ Dedicated IGE Account Manager Assigned
            </span>
          </div>

          <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-16 mb-6 relative z-10">
            <div className="relative group">
              <div className="absolute inset-[-6px] rounded-[20px] ring-2 ring-amber-400/60 ring-offset-2 ring-offset-white dark:ring-offset-[#122238]" />
              <div className="absolute inset-[-2px] rounded-[18px] ring-4 ring-purple-500/50 ring-offset-1 ring-offset-white dark:ring-offset-[#122238]" />
              <div className="w-32 h-32 rounded-[18px] border-4 border-white dark:border-[#122238] overflow-hidden shadow-2xl relative z-10">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-purple-600 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-900/20">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 z-20 flex items-center justify-center rounded-[18px] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="w-5 h-5 text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1 pt-16">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-full tracking-widest shadow-lg">
                  <Crown className="w-3 h-3 fill-white" /> ASME Sovereign
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-purple-700 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> Sovereign Verified
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium italic">
                "{profile.tagline || `${(profile.experienceYears || 5)}+ years shaping trade insights.`}"
              </p>
              <p className="text-xs text-gray-500 mt-1">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}
              </p>
            </div>
          </div>

          {/* Social + profile URL */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <div className="flex items-center gap-2 flex-1 min-w-[200px] p-2.5 bg-purple-50/40 dark:bg-purple-950/10 rounded-xl border border-purple-100 dark:border-purple-900/20">
              <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="flex-1 truncate text-[10px] text-gray-500">{profileUrl}</span>
              <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] font-bold text-purple-600 hover:text-[#F0652E]">
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedUrl ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 w-fit overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white dark:bg-[#1D1D46] text-[#1D1D46] dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Total Revenue", value: `₹${(stats.totalRevenue / 1000).toFixed(0)}K`, icon: TrendingUp, color: "from-purple-600 to-violet-500 text-white" },
              { label: "Total Reads", value: `${(stats.totalReads / 1000).toFixed(1)}K`, icon: Eye, color: "from-blue-600 to-blue-500 text-white" },
              { label: "Profile Views", value: `${(stats.profileViews / 1000).toFixed(1)}K`, icon: BarChart3, color: "from-emerald-600 to-teal-500 text-white" },
              { label: "Bookings", value: stats.bookings.toString(), icon: Calendar, color: "from-amber-500 to-yellow-500 text-white" },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl p-4 bg-gradient-to-br ${s.color} shadow-lg`}>
                <s.icon className="w-5 h-5 mb-2 opacity-80" />
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[9px] opacity-80 mt-0.5 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-5">
              {/* Revenue summary */}
              <div className="bg-gradient-to-b from-[#1a113b] to-purple-950 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2"><Crown className="w-4 h-4 text-amber-400" /> Revenue Dashboard</h3>
                  <span className="text-[10px] font-black text-amber-400 uppercase">This Month</span>
                </div>
                <div className="text-4xl font-black text-amber-400 mb-1">₹{stats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-white/60 mb-4">80% of gross consulting revenue</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Article reads", value: `₹${stats.articleRevenue.toLocaleString()}` },
                    { label: "Consulting (80%)", value: `₹${stats.bookingRevenue.toLocaleString()}` },
                    { label: "Report sales", value: `₹${stats.reportSales.toLocaleString()}` },
                  ].map((r, i) => (
                    <div key={i} className="bg-white/10 rounded-xl py-2 px-1">
                      <p className="text-sm font-black">{r.value}</p>
                      <p className="text-[9px] text-white/60 mt-0.5">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account manager card */}
              <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-purple-200 dark:border-purple-900/30 shadow-sm">
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" /> Your IGE Account Manager
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/20 flex items-center justify-center text-lg font-black text-purple-600">
                    R
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1D1D46] dark:text-white">Rohan Kapoor</p>
                    <p className="text-xs text-gray-500">Senior SME Partnerships, IGE News</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-[#122238] rounded-2xl p-5 border border-amber-200 dark:border-amber-900/30 shadow-sm text-xs space-y-2">
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-amber-500" /> Sovereign Features
                </h3>
                {["Sovereign Gold badge ✓", "IGE Account Manager ✓", "80/20 revenue share ✓", "Government & investor visibility ✓"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-amber-700 dark:text-amber-400 py-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Affiliate Referral Section */}
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4 mt-6">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-white/5 pb-3">
              <h4 className="font-bold text-sm text-[#1D1D46] dark:text-white flex items-center gap-2">
                🏷️ Affiliate Partner Program
              </h4>
              <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
                Active Affiliate
              </span>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              As an IGE Sovereign partner, you earn cash payouts for every colleague or reader who upgrades to an IGE paid subscription using your invite.
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
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">₹8,500.00</span>
                  <span className="text-[9px] text-emerald-600/70 dark:text-emerald-500/70">22 referrals conversion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs remain legacy mock content */}
    </div>
  );
}

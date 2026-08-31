"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Check, Upload, MapPin, Briefcase,
  FileText, Eye, EyeOff, ArrowRight, Lock, BarChart3, Globe, Users
} from "lucide-react";

export default function FreeSMEDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [viewMode, setViewMode] = useState<"private" | "public">("private");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${locale}/sme/${user?.uid || "profile"}`
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

  const sampleName = "Dr. Rajesh Sharma";
  const rawName = profile.fullName || user?.name;
  const isGeneric = !rawName || rawName === "SME Pro User" || rawName === "Your Name" || rawName.toLowerCase().includes("user");
  const displayName = isGeneric ? sampleName : rawName;
  const displayDesignation = profile.currentDesignation || "Senior Trade Consultant";
  const displayOrg = profile.organisation || "Independent Specialist";
  const displayCity = profile.city || "Mumbai";
  const displayCountry = profile.country || "India";

  const LOCKED_FEATURES = [
    { icon: FileText, label: "Article Publishing", desc: "Share trade intelligence — available from SME Pro (max 4/month)" },
    { icon: Eye, label: "Consulting Inquiry Form", desc: "Let Readers request sessions from your profile" },
    { icon: BarChart3, label: "Revenue Dashboard", desc: "Track article reads and consulting booking revenue" },
    { icon: Users, label: "Expert Directory Listing", desc: "Be discoverable by 50,000+ IGE Readers" },
  ];

  // ── PUBLIC VIEW ──────────────────────────────────────────────────────────
  if (viewMode === "public") {
    return (
      <div className="p-5 md:p-8 lg:p-10 max-w-3xl mx-auto pb-24">
        {/* View toggle */}
        <div className="flex justify-end mb-5">
          <button
            onClick={() => setViewMode("private")}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition-all"
          >
            <EyeOff className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
        </div>

        {/* Public profile card */}
        <div className="bg-white dark:bg-[#122238] rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/5 dark:to-white/3" />
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-5">
              <div className="w-20 h-20 rounded-2xl border-4 border-white dark:border-[#122238] bg-gray-100 dark:bg-white/5 overflow-hidden shadow-sm ring-2 ring-gray-200 dark:ring-white/10 shrink-0">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-black text-gray-400">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 pt-10">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                  <span className="text-[9px] font-black uppercase bg-gray-200 dark:bg-white/10 text-gray-500 px-2 py-0.5 rounded-full tracking-widest">
                    SME
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{displayDesignation} · {displayOrg}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}
                </p>
              </div>
            </div>

            {/* Sector tags */}
            {profile.sector && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-bold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full capitalize">
                  {profile.sector}
                </span>
              </div>
            )}

            {/* Affiliate Promotion Coupon Card */}
            {(() => {
              const firstPart = displayName.split(" ")[0].toUpperCase();
              const couponCode = `SME-${firstPart}-10`;
              return (
                <div className="mb-5 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold shrink-0">🏷️</div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#1D1D46] dark:text-white">IGE Affiliate Coupon</p>
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

            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-white/10 text-center text-xs text-gray-400">
              <Lock className="w-4 h-4 mx-auto mb-1 opacity-50" />
              Consulting not available on free tier.{" "}
              <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="text-[#F0652E] font-bold hover:underline">
                Upgrade to SME Pro
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5">
          <Globe className="w-5 h-5 mx-auto mb-2 opacity-30" />
          This profile is <strong>private</strong>. Upgrade to SME Pro to be listed in the Expert Directory and become discoverable by Readers.
        </div>
      </div>
    );
  }

  // ── PRIVATE / DASHBOARD VIEW ─────────────────────────────────────────────
  const firstPart = displayName.split(" ")[0].toUpperCase();
  const couponCode = `SME-${firstPart}-10`;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* View toggle bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-xs text-gray-400">
          <span className="font-bold text-gray-600 dark:text-gray-300">SME Free Dashboard</span> — private view
        </div>
        <button
          onClick={() => setViewMode("public")}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl transition-all hover:border-gray-400"
        >
          <Eye className="w-3.5 h-3.5" /> Preview Public Profile
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-white dark:bg-[#122238] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden mb-8">
        <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/5 dark:to-white/3 relative">
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-gray-200 dark:bg-white/10 px-2.5 py-1 rounded-full">
              SME · Free
            </span>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-5">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl border-4 border-white dark:border-[#122238] bg-gray-100 dark:bg-white/5 overflow-hidden shadow-sm ring-2 ring-gray-200 dark:ring-white/10">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-black text-gray-400">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button onClick={() => avatarInputRef.current?.click()} className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-5 h-5 text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>
            <div className="flex-1 pt-10">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                <span className="text-[9px] font-black uppercase bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full tracking-widest">
                  SME
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 mb-4">
            <span className="flex-1 truncate text-[10px] text-gray-400">{profileUrl}</span>
            <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-[#F0652E]">
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copiedUrl ? "Copied!" : "Copy"}
            </button>
          </div>

          <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="w-full py-2.5 flex items-center justify-center gap-2 bg-[#1D1D46] hover:bg-[#F0652E] text-white text-xs font-bold rounded-xl transition-all">
            <ArrowRight className="w-3.5 h-3.5" /> Upgrade to SME Pro — Unlock Articles & Consulting
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
            <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-gray-400" /> Professional Profile
            </h2>
            <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
              {[
                { label: "Designation", value: displayDesignation },
                { label: "Organisation", value: displayOrg },
                { label: "Location", value: `${displayCity}, ${displayCountry}` },
                { label: "Primary Sector", value: profile.sector || "Manufacturing" },
                { label: "Experience", value: `${profile.experienceYears || 10}+ years` },
              ].map((row, i) => (
                <div key={i} className="flex gap-2">
                  <span className="font-bold text-gray-400 w-28 shrink-0">{row.label}</span>
                  <span className="capitalize">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Affiliate & Referral Card */}
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
            <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center gap-2">
              <span className="text-amber-500">🏷️</span> Affiliate Partner Program
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Earn commissions by inviting colleagues and readers. Share your custom affiliate coupon code to grant them discounts and secure your earnings!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Your Affiliate Coupon</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-black text-amber-600 font-mono">{couponCode}</span>
                  <button onClick={() => {
                    navigator.clipboard.writeText(couponCode);
                    alert("Coupon copied!");
                  }} className="text-[10px] font-bold text-gray-400 hover:text-[#F0652E]">Copy</button>
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Estimated Commissions</p>
                <p className="text-xs font-black text-gray-700 dark:text-gray-200 mt-1">₹0.00 <span className="text-[9px] font-normal text-gray-400">(credits only on Free)</span></p>
              </div>
            </div>
            <p className="text-[10px] text-amber-600 dark:text-amber-500 flex items-center gap-1">
              <span>✦</span> Free members accumulate credits to discount upgrade plans. Upgrade to Pro/Elite/Sovereign for cash payouts.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Locked Features
            </p>
            <div className="space-y-3">
              {LOCKED_FEATURES.map((item, i) => (
                <div key={i} className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-dashed border-gray-200 dark:border-white/10 flex items-center gap-3 opacity-70">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500">{item.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="text-[10px] font-bold text-[#F0652E] hover:underline whitespace-nowrap">
                    Upgrade →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm space-y-3">
            <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm">Your Plan</h3>
            <div className="text-xs text-gray-500 space-y-2">
              {[
                { label: "Tier", value: "SME (Free)" },
                { label: "Articles", value: "Locked", bad: true },
                { label: "Consulting", value: "Locked", bad: true },
                { label: "Directory listing", value: "Locked", bad: true },
              ].map((row, i) => (
                <div key={i} className="flex justify-between">
                  <span>{row.label}</span>
                  <span className={`font-bold ${row.bad ? "text-red-400" : "text-gray-600 dark:text-gray-300"}`}>{row.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="w-full py-2.5 mt-1 bg-[#1D1D46] text-white text-xs font-bold rounded-xl hover:bg-[#F0652E] transition-all">
              View Upgrade Plans
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 text-xs text-gray-400 space-y-1">
            <p className="font-bold text-gray-500 dark:text-gray-300">Profile Visibility</p>
            <p className="leading-relaxed">Your profile is <strong className="text-gray-600 dark:text-gray-200">private</strong>. Upgrade to SME Pro to be listed in the Expert Directory.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

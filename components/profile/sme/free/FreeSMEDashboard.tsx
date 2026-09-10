"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Copy, Check, Upload, MapPin, Briefcase,
  FileText, Eye, EyeOff, ArrowRight, Lock, BarChart3, Globe, Users
} from "lucide-react";
import SmePublicProfile from "@/components/profile/common/SmePublicProfile";

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
      ? `${window.location.origin}/${locale}/sme/${user?.id || user?.uid || "profile"}`
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
    { icon: FileText, label: "Article Publishing", desc: "Share trade intelligence — available from SME Pro" },
    { icon: BarChart3, label: "Readership Analytics & Insights", desc: "Track article reads, impressions, and engagement metrics" },
    { icon: Users, label: "Expert Directory Listing", desc: "Be discoverable by 50,000+ IGE Readers" },
    { icon: Globe, label: "Google-Indexed Public Profile", desc: "Verified public SEO profile page for sector authority" },
  ];

  // ── PUBLIC VIEW ──────────────────────────────────────────────────────────
  if (viewMode === "public") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SmePublicProfile
          profileData={{
            name: displayName,
            designation: displayDesignation,
            organization: displayOrg,
            city: displayCity,
            country: displayCountry,
          }}
          tier="free"
          role="sme"
          isOwner={true}
          onSwitchToAdmin={() => setViewMode("private")}
        />
      </div>
    );
  }

  // ── PRIVATE / DASHBOARD VIEW ─────────────────────────────────────────────
  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* Prominent View Mode Switcher Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 mb-6 shadow-lg flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">SME Profile Admin Dashboard (Free Tier)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("private")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === "private"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🛠️ Admin View
          </button>
          <button
            onClick={() => setViewMode("public")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === "public"
                ? "bg-emerald-500 text-white shadow-sm"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            👁️ View Public Profile ↗
          </button>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-white dark:bg-[#122238] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden mb-8">
        <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-white/5 dark:to-white/3 relative">
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-gray-200 dark:bg-white/10 px-2.5 py-1 rounded-full">
              SME · Free Tier
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
            <ArrowRight className="w-3.5 h-3.5" /> Upgrade to SME Pro — Unlock Articles & Authority Directory
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
                { label: "Experience", value: `${profile.experienceYears || 20}+ years` },
              ].map((row, i) => (
                <div key={i} className="flex gap-2">
                  <span className="font-bold text-gray-400 w-28 shrink-0">{row.label}</span>
                  <span className="capitalize">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Locked Pro Features
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
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-white/5">
                <span>Current Tier</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">Free SME</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50 dark:border-white/5">
                <span>Article Quota</span>
                <span className="font-bold text-gray-400">0 / month</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Directory Listing</span>
                <span className="font-bold text-gray-400">Inactive</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/${locale}/profile/plans/sme`)}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all"
            >
              View SME Upgrade Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

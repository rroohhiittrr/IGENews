"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Copy, Edit, Check, Upload, MapPin,
  FileText, Eye, Sparkles, Send,
  BarChart3, MessageSquare, ShieldCheck, Star,
  Globe, Calendar, TrendingUp, BookOpen, Award,
  ExternalLink, Crown, Mail, Phone, Users, Newspaper
} from "lucide-react";

export default function SMESovereignDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "revenue" | "editorial" | "advisory">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const [bannerBase64, setBannerBase64] = useState(profile.bannerBase64 || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const displayName = profile.fullName || user?.name || "Your Name";
  const displayDesignation = profile.currentDesignation || "Senior Trade Policy Advisor";
  const displayOrg = profile.organisation || "Independent Sovereign Specialist";
  const displayCity = profile.city || "New Delhi";
  const displayCountry = profile.country || "India";
  const profileUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${locale}/sme/${user?.id || "profile"}`
    : "";

  // Mock sovereign-tier stats
  const stats = {
    totalRevenue: 284500,
    articleRevenue: 34500,
    bookingRevenue: 250000,
    reportSales: 0,
    totalReads: 128400,
    bookings: 12,
    articles: 28,
    reportDownloads: 0,
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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "articles", label: "Articles" },
    { id: "revenue", label: "Revenue" },
    { id: "editorial", label: "Editorial" },
    { id: "advisory", label: "Advisory" },
  ] as const;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* ── PROFILE HEADER CARD — Ultra-premium purple/gold cinematic ── */}
      <div className="relative bg-white dark:bg-[#122238] rounded-3xl border-2 border-purple-500/30 shadow-2xl overflow-hidden mb-8">

        {/* Cinematic banner */}
        <div className="relative h-44 overflow-hidden group cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
          {bannerBase64 ? (
            <img src={bannerBase64} alt="banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full relative">
              {/* Deep purple cinematic gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a113b] via-purple-800 to-violet-900" />
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(167,139,250,0.3),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(245,158,11,0.15),transparent_60%)]" />
              {/* Gold shimmer lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(45deg, transparent 40%, rgba(251,191,36,0.05) 50%, transparent 60%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 4s linear infinite"
              }} />
              {/* Upload hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <div className="flex items-center gap-2 text-white text-xs font-bold bg-white/15 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                  <Upload className="w-4 h-4" /> Upload Cinematic Banner
                </div>
              </div>
            </div>
          )}

          {/* Sovereign badge on banner */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase text-amber-200 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-3 py-1.5 rounded-full tracking-widest">
              <Crown className="w-3 h-3 text-amber-400" /> SME Sovereign
            </span>
          </div>

          {/* IGE Account Manager ribbon */}
          <div className="absolute bottom-3 left-4">
            <span className="text-[9px] font-bold text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              🛡️ Dedicated IGE Account Manager Assigned
            </span>
          </div>

          <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-16 mb-6 relative z-10">
            {/* Avatar 128px — purple + gold dual animated ring */}
            <div className="relative group">
              {/* Outer gold ring */}
              <div className="absolute inset-[-6px] rounded-[20px] ring-2 ring-amber-400/60 ring-offset-2 ring-offset-white dark:ring-offset-[#122238]" style={{ animation: "pulse 4s ease-in-out infinite" }} />
              {/* Inner purple ring */}
              <div className="absolute inset-[-2px] rounded-[18px] ring-4 ring-purple-500/50 ring-offset-1 ring-offset-white dark:ring-offset-[#122238]" style={{ animation: "pulse 3s ease-in-out infinite reverse" }} />
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

            {/* Name + Sovereign badges */}
            <div className="flex-1 pt-16">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                {/* Gold sovereign badge */}
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-full tracking-widest shadow-lg">
                  <Crown className="w-3 h-3 fill-white" /> SME Sovereign
                </span>
                {/* Sovereign verified tick */}
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-purple-700 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> Sovereign Verified
                </span>
              </div>
              {/* IGE headline statement */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium italic">
                "{profile.tagline || `${(profile.experienceYears || 20)}+ years shaping ${profile.sector || "India's"} trade policy & industry.`}"
              </p>
              <p className="text-xs text-gray-500 mt-1">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}
              </p>
            </div>
          </div>

          {/* Social + profile URL */}
          <div className="flex items-center gap-3 flex-wrap mb-5">
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline bg-blue-50 dark:bg-blue-950/20 px-2.5 py-1.5 rounded-xl border border-blue-100 dark:border-blue-900/20">
                <ExternalLink className="w-3 h-3" /> LinkedIn
              </a>
            )}
            {profile.websiteUrl && (
              <a href={profile.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-purple-600 hover:underline bg-purple-50 dark:bg-purple-950/20 px-2.5 py-1.5 rounded-xl border border-purple-100 dark:border-purple-900/20">
                <Globe className="w-3 h-3" /> Website
              </a>
            )}
            <div className="flex items-center gap-2 flex-1 min-w-[200px] p-2.5 bg-purple-50/40 dark:bg-purple-950/10 rounded-xl border border-purple-100 dark:border-purple-900/20">
              <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="flex-1 truncate text-[10px] text-gray-500">{profileUrl}</span>
              <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] font-bold text-purple-600 hover:text-[#F0652E] transition-colors">
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedUrl ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Key badges row */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 px-2.5 py-1 rounded-full">
              ✓ Open to Consulting
            </span>
            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 px-2.5 py-1 rounded-full">
              ✓ IGE Newsletter Column Active
            </span>
            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 px-2.5 py-1 rounded-full">
              ✓ Advisory Council Member
            </span>
            <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 px-2.5 py-1 rounded-full">
              ✓ Fully SEO Indexed
            </span>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
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

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Mega stats */}
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
                  <div className="ml-auto flex gap-2">
                    <a href="mailto:rohan@indiaglobalnews.com" className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-xl text-purple-600 hover:bg-purple-100 transition-all">
                      <Mail className="w-4 h-4" />
                    </a>
                    <a href="tel:+919876543210" className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-xl text-purple-600 hover:bg-purple-100 transition-all">
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Sovereign features */}
              <div className="bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-[#122238] rounded-2xl p-5 border border-amber-200 dark:border-amber-900/30 shadow-sm">
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm mb-3 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" /> Sovereign Active
                </h3>
                {[
                  "Sovereign Gold badge ✓",
                  "IGE Account Manager ✓",
                  "Co-bylined editorials ✓",
                  "80/20 revenue share ✓",
                  "Keynote placements ✓",
                  "Advisory Council ✓",
                  "SEO landing page ✓",
                  "Newsletter column ✓",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 py-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" /> {f}
                  </div>
                ))}
              </div>

              {/* SEO performance */}
              <div className="bg-white dark:bg-[#122238] rounded-2xl p-4 border border-gray-100 dark:border-white/5 shadow-sm">
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" /> SEO Performance
                </h3>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Google ranking</span>
                    <span className="font-bold text-emerald-600">Page #{stats.seoDomainRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Organic views (30d)</span>
                    <span className="font-bold text-[#1D1D46] dark:text-white">4,820</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profile indexed</span>
                    <span className="font-bold text-emerald-600">✓ Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EDITORIAL TAB ── */}
      {activeTab === "editorial" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-purple-100 dark:border-purple-900/20 shadow-sm">
            <h2 className="font-bold text-[#1D1D46] dark:text-white mb-5 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-purple-600" /> IGE Editorial Features
            </h2>
            <div className="space-y-4">
              {[
                { title: "Monthly Newsletter Column", desc: "Your expert column is sent to 20,000+ B2B subscribers", status: "Active", date: "Next: Sep 15, 2026" },
                { title: "Co-bylined Feature Article", desc: "India-UAE CEPA: Expert Perspective on Chemical Exports", status: "Published", date: "Aug 18, 2026" },
                { title: "Podcast Interview", desc: "Trade Policy Deep Dive — Scheduled with IGE editorial team", status: "Scheduled", date: "Sep 5, 2026 · 2PM" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-purple-50/30 dark:bg-purple-950/10 rounded-2xl border border-purple-100 dark:border-purple-900/20 flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 italic">{item.desc}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{item.date}</p>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase whitespace-nowrap ${
                    item.status === "Active" ? "bg-emerald-600 text-white" :
                    item.status === "Published" ? "bg-blue-600 text-white" :
                    "bg-amber-500 text-white"
                  }`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* White-label report section */}
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
            <h2 className="font-bold text-[#1D1D46] dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" /> White-Label Trade Reports
            </h2>
            <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center">
              <Award className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-[#1D1D46] dark:text-white mb-1">Publish Your First IGE-Sealed Report</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Upload a PDF trade report and IGE editorial will co-seal it under your name + IGE brand for maximum credibility.
              </p>
              <button className="mt-4 px-5 py-2.5 bg-gradient-to-r from-purple-700 to-violet-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 mx-auto">
                <Upload className="w-4 h-4" /> Upload Report for IGE Seal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADVISORY TAB ── */}
      {activeTab === "advisory" && (
        <div className="space-y-5">
          <div className="bg-gradient-to-b from-[#1a113b] to-purple-950 rounded-2xl p-6 text-white shadow-lg">
            <h2 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" /> IGE Board Advisory Council
            </h2>
            <p className="text-sm text-white/70 mb-6">As a Sovereign member, you are a recognised advisory council member of IGE News.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Council seat", value: "Active", icon: ShieldCheck },
                { label: "Events attended", value: "3", icon: Users },
                { label: "Policy inputs", value: "7 submitted", icon: MessageSquare },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-4 text-center">
                  <s.icon className="w-5 h-5 mx-auto mb-2 text-amber-400" />
                  <p className="font-black text-lg">{s.value}</p>
                  <p className="text-[10px] text-white/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="font-bold text-[#1D1D46] dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" /> Upcoming Speaking & Events
            </h3>
            <div className="space-y-3">
              {[
                { event: "IGE Trade Summit 2026", role: "Keynote Speaker", date: "Oct 12–14, 2026", location: "Mumbai" },
                { event: "FICCI India-Gulf Trade Roundtable", role: "Panel Judge", date: "Nov 4, 2026", location: "New Delhi" },
              ].map((ev, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-purple-50/30 dark:bg-purple-950/10 rounded-2xl border border-purple-100 dark:border-purple-900/20">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{ev.event}</p>
                    <p className="text-xs text-gray-500">{ev.date} · {ev.location}</p>
                  </div>
                  <span className="text-[9px] font-black bg-purple-600 text-white px-2 py-0.5 rounded-full uppercase whitespace-nowrap">{ev.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── REVENUE TAB ── */}
      {activeTab === "revenue" && (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-[#1a113b] to-purple-900 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-amber-400" /> Revenue Split (80/20)</h3>
            <p className="text-xs text-white/60 mb-4">You earn 80% of all consulting fees. IGE retains 20% for platform & operations.</p>
            <div className="text-5xl font-black text-amber-400 mb-1">₹{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-white/70">Your share this month</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Consulting (80%)", value: `₹${stats.bookingRevenue.toLocaleString()}`, desc: "12 sessions confirmed", color: "border-purple-200 dark:border-purple-900/30 text-purple-700 dark:text-purple-400" },
              { label: "Article revenue", value: `₹${stats.articleRevenue.toLocaleString()}`, desc: "128K reads × ₹50/1K", color: "border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-400" },
              { label: "Report sales", value: `₹${stats.reportSales.toLocaleString()}`, desc: "No reports published yet", color: "border-gray-200 dark:border-white/10 text-gray-400" },
            ].map((r, i) => (
              <div key={i} className={`bg-white dark:bg-[#122238] rounded-2xl p-5 border-2 ${r.color} shadow-sm`}>
                <p className={`text-2xl font-black ${r.color.split(" ")[2]}`}>{r.value}</p>
                <p className="text-xs font-bold text-[#1D1D46] dark:text-white mt-1">{r.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ARTICLES TAB ── */}
      {activeTab === "articles" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#1D1D46] dark:text-white">Published Articles</h2>
              <p className="text-xs text-gray-400 mt-0.5">{stats.articles} articles · {stats.totalReads.toLocaleString()} total reads</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-700 to-violet-600 text-white text-xs font-bold rounded-xl hover:opacity-90 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> New Article
            </button>
          </div>
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm space-y-3">
            {[
              { title: "India-UAE CEPA: 18 Months of Impact on Chemical Exports", sector: "Chemicals", reads: 3842, revenue: 192, date: "Aug 12, 2026" },
              { title: "Alloy Steel Import Substitution Strategy for Indian MSMEs", sector: "Steel", reads: 2190, revenue: 109, date: "Jul 28, 2026" },
              { title: "Digital Logistics: Port Clearance Innovation in GIFT City", sector: "Logistics", reads: 1840, revenue: 92, date: "Jul 14, 2026" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50 dark:border-white/5 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#1D1D46] dark:text-white hover:text-[#F0652E] cursor-pointer">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.sector} · {a.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-blue-600">{a.reads.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-emerald-600">+₹{a.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

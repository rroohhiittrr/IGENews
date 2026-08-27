"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Copy, Edit, Check, Upload, MapPin, Briefcase,
  FileText, Eye, ArrowRight, Sparkles, Send,
  BarChart3, MessageSquare, ShieldCheck, Star,
  Globe, Calendar, DollarSign, TrendingUp, BookOpen, Award, ExternalLink
} from "lucide-react";

export default function SMEEliteDashboard() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "consulting" | "revenue" | "settings">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const [bannerBase64, setBannerBase64] = useState(profile.bannerBase64 || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [openToConsulting, setOpenToConsulting] = useState(true);
  const [consultingRate, setConsultingRate] = useState(profile.consultingRate || "5,000");
  const [editingRate, setEditingRate] = useState(false);

  const [articles, setArticles] = useState([
    { title: "India-UAE CEPA: 18 Months of Impact on Chemical Exports", sector: "chemicals", date: "Aug 12, 2026", reads: 3842, revenue: 192 },
    { title: "Alloy Steel Import Substitution Strategy for Indian SMEs", sector: "steel", date: "Jul 28, 2026", reads: 2190, revenue: 109 },
  ]);
  const [bookings, setBookings] = useState([
    { name: "Ananya Krishnan", company: "PharmaTech Exports", topic: "API regulatory pathway", date: "Aug 28, 2026 · 3PM", status: "Confirmed", amount: 5000 },
    { name: "Vikram Malhotra", company: "Steel Hub Industries", topic: "Bilateral duty optimization", date: "Sep 2, 2026 · 11AM", status: "Pending", amount: 5000 },
  ]);

  const displayName = profile.fullName || user?.name || "Your Name";
  const displayDesignation = profile.currentDesignation || "Senior Trade Consultant";
  const displayOrg = profile.organisation || "Independent Specialist";
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

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setBannerBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const totalRevenue = articles.reduce((s, a) => s + a.revenue, 0) + bookings.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.amount, 0);
  const totalReads = articles.reduce((s, a) => s + a.reads, 0);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "articles", label: "Articles" },
    { id: "consulting", label: "Bookings" },
    { id: "revenue", label: "Revenue" },
    { id: "settings", label: "Settings" },
  ] as const;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* ── PROFILE HEADER CARD — Emerald/Gold premium ── */}
      <div className="bg-white dark:bg-[#122238] rounded-3xl border-2 border-emerald-500/30 shadow-2xl overflow-hidden mb-8">

        {/* Custom Banner */}
        <div className="relative h-36 overflow-hidden group cursor-pointer" onClick={() => bannerInputRef.current?.click()}>
          {bannerBase64 ? (
            <img src={bannerBase64} alt="banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent)]" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div className="flex items-center gap-2 text-white text-xs font-bold bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <Upload className="w-4 h-4" /> Upload Custom Banner
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-3 right-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-white bg-emerald-600/80 backdrop-blur-sm border border-emerald-400/30 px-2.5 py-1 rounded-full">
              SME Elite
            </span>
          </div>
          <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-14 mb-5">
            {/* Avatar 112px + animated emerald ring */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl ring-4 ring-emerald-400/50 ring-offset-2 ring-offset-white dark:ring-offset-[#122238] animate-pulse" style={{ animationDuration: "3s" }} />
              <div className="w-28 h-28 rounded-2xl border-4 border-white dark:border-[#122238] overflow-hidden shadow-xl relative z-10">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Upload className="w-5 h-5 text-white" />
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            {/* Name + Elite badge */}
            <div className="flex-1 pt-14">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                {/* Gold Elite badge */}
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-2.5 py-0.5 rounded-full tracking-widest shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-white" /> SME Elite
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-emerald-600 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> Elite Verified
                </span>
                {openToConsulting && (
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 px-2 py-0.5 rounded-full">
                    Open to Consulting · ₹{consultingRate}/hr
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{displayDesignation} · {displayOrg}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {displayCity}, {displayCountry}
              </p>
            </div>
          </div>

          {/* Social links row */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] text-blue-600 hover:underline font-bold">
                <ExternalLink className="w-3 h-3" /> LinkedIn
              </a>
            )}
            <div className="flex items-center gap-2 flex-1 p-2.5 bg-emerald-50/60 dark:bg-emerald-950/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20 text-xs">
              <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="flex-1 truncate text-[10px] text-gray-500">{profileUrl}</span>
              <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-[#F0652E] transition-colors">
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedUrl ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Consulting toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpenToConsulting(!openToConsulting)}
                className={`relative w-10 h-5 rounded-full transition-colors ${openToConsulting ? "bg-emerald-500" : "bg-gray-300 dark:bg-white/20"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${openToConsulting ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
              <span className="text-xs text-gray-500">Open to consulting</span>
            </div>
            <button
              onClick={() => router.push(`/${locale}/profile/plans/sme`)}
              className="text-[10px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              Upgrade to Sovereign <ArrowRight className="w-3 h-3" />
            </button>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600" },
                { label: "Total Reads", value: totalReads.toLocaleString(), icon: Eye, color: "text-blue-600" },
                { label: "Articles", value: articles.length.toString(), icon: FileText, color: "text-[#1D1D46] dark:text-white" },
                { label: "Bookings", value: bookings.length.toString(), icon: Calendar, color: "text-amber-500" },
              ].map((s, i) => (
                <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-4 border border-gray-100 dark:border-white/5 shadow-sm text-center">
                  <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
                  <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Upcoming bookings */}
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
              <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" /> Upcoming Bookings
              </h2>
              <div className="space-y-3">
                {bookings.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{b.name} · {b.company}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{b.topic}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{b.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-black text-emerald-600">₹{b.amount.toLocaleString()}</p>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${b.status === "Confirmed" ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400"}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent articles */}
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
              <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" /> Recent Articles
              </h2>
              <div className="space-y-3">
                {articles.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
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
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-[#122238] rounded-2xl p-5 border border-emerald-200 dark:border-emerald-900/30 shadow-sm space-y-3">
              <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Elite Features Active
              </h3>
              {[
                "Custom banner ✓", "Full booking system ✓", "Revenue share ✓",
                "Elite directory priority ✓", "IGE Newsletter ✓", "SEO indexed ✓",
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> {f}
                </div>
              ))}
              <div className="pt-3 border-t border-emerald-100 dark:border-emerald-900/30">
                <button
                  onClick={() => router.push(`/${locale}/profile/plans/sme`)}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-700 to-violet-600 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all"
                >
                  Apply for SME Sovereign
                </button>
              </div>
            </div>

            <div className="bg-emerald-600 rounded-2xl p-5 text-white space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">This Month</p>
              <p className="text-3xl font-black">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-[11px] opacity-70">Articles + consulting revenue</p>
              <div className="pt-2 border-t border-white/20 flex justify-between text-[10px] font-bold">
                <span>Article reads: {totalReads.toLocaleString()}</span>
                <span>Bookings: {bookings.length}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#122238] rounded-2xl p-4 border border-gray-100 dark:border-white/5 text-xs space-y-1">
              <p className="font-bold text-gray-500 dark:text-gray-300">Profile Visibility</p>
              <p className="text-gray-400">Fully Public — Google indexed. Discoverable by anyone searching your name or sector on Google.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── REVENUE TAB ── */}
      {activeTab === "revenue" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Article Revenue", value: `₹${articles.reduce((s, a) => s + a.revenue, 0)}`, icon: TrendingUp, color: "bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/20 text-blue-600" },
              { label: "Booking Revenue", value: `₹${bookings.filter(b => b.status === "Confirmed").reduce((s, b) => s + b.amount, 0).toLocaleString()}`, icon: Calendar, color: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/20 text-emerald-600" },
              { label: "Total Earned", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/20 text-amber-600" },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl p-5 border ${s.color}`}>
                <s.icon className="w-5 h-5 mb-2 opacity-80" />
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[10px] opacity-70 mt-0.5">{s.label} · This month</p>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
            <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm mb-4">Article Revenue Breakdown</h3>
            <div className="space-y-3">
              {articles.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                  <div>
                    <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{a.title.substring(0, 50)}...</p>
                    <p className="text-[10px] text-gray-400">{a.reads.toLocaleString()} reads · ₹50/1K reads</p>
                  </div>
                  <span className="text-sm font-black text-emerald-600">₹{a.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BOOKINGS TAB ── */}
      {activeTab === "consulting" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#1D1D46] dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" /> Booking Calendar
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400">Hourly rate:</span>
                {editingRate ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">₹</span>
                    <input value={consultingRate} onChange={e => setConsultingRate(e.target.value)} className="w-20 text-xs border border-emerald-300 rounded-lg px-2 py-1 focus:outline-none" />
                    <button onClick={() => setEditingRate(false)} className="text-[10px] font-bold text-emerald-600">Save</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingRate(true)} className="text-xs font-bold text-emerald-600 hover:underline">₹{consultingRate}/hr <Edit className="inline w-3 h-3 ml-0.5" /></button>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {bookings.map((b, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${b.status === "Confirmed" ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/30" : "bg-amber-50/50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/30"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{b.name} — {b.company}</p>
                      <p className="text-xs text-gray-500">{b.date}</p>
                    </div>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${b.status === "Confirmed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"}`}>{b.status}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-3">"{b.topic}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-emerald-600">₹{b.amount.toLocaleString()}</span>
                    {b.status === "Pending" && (
                      <div className="flex gap-2">
                        <button className="text-[10px] font-bold text-red-500 hover:underline">Decline</button>
                        <button className="text-[10px] font-bold text-emerald-600 hover:underline">Confirm</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ARTICLES TAB ── */}
      {activeTab === "articles" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#1D1D46] dark:text-white">Published Articles</h2>
            <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> New Article
            </button>
          </div>
          <div className="space-y-3">
            {articles.map((a, i) => (
              <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#1D1D46] dark:text-white hover:text-[#F0652E] cursor-pointer">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-1 capitalize">{a.sector} · {a.date}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-blue-600 font-bold">{a.reads.toLocaleString()} reads</span>
                      <span className="text-emerald-600 font-bold">+₹{a.revenue} earned</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-black bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 px-2 py-0.5 rounded-full uppercase shrink-0">Published</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SETTINGS TAB ── */}
      {activeTab === "settings" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
            <h2 className="font-bold text-[#1D1D46] dark:text-white">Profile Settings</h2>
            {[
              { label: "Open to consulting", desc: "Show consulting badge on your profile and Reader feeds", state: openToConsulting, toggle: () => setOpenToConsulting(!openToConsulting) },
            ].map((setting, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-white/5 last:border-0">
                <div>
                  <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{setting.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{setting.desc}</p>
                </div>
                <button
                  onClick={setting.toggle}
                  className={`relative w-11 h-6 rounded-full transition-colors ${setting.state ? "bg-emerald-500" : "bg-gray-300 dark:bg-white/20"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${setting.state ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

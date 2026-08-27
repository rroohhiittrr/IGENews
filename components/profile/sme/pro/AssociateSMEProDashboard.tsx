"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Copy, Edit, Check, Upload, MapPin, Briefcase,
  FileText, Eye, ArrowRight, Sparkles, Send,
  BarChart3, MessageSquare, ShieldCheck, Lock, Globe
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

export default function AssociateSMEProDashboard() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const profile = user?.onboardingForm || {};
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "consulting" | "insights">("overview");
  const [avatarBase64, setAvatarBase64] = useState(profile.profilePic || "");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [openToConsulting, setOpenToConsulting] = useState(true);
  const [articles, setArticles] = useState<{ title: string; sector: string; date: string; reads: number }[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState(profile.sector || "manufacturing");
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [inquiries, setInquiries] = useState([
    { name: "Rajiv Menon", company: "Chem Exports Ltd", topic: "CEPA duty advisory", date: "2 days ago" },
    { name: "Priya Shah", company: "Textile Hub India", topic: "FTA negotiation guidance", date: "5 days ago" },
  ]);

  const displayName = profile.fullName || user?.name || "Your Name";
  const displayDesignation = profile.currentDesignation || "Trade & Industry Professional";
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

  const handlePublish = () => {
    if (!newTitle.trim()) return;
    setArticles(prev => [{ title: newTitle, sector: newSector, date: new Date().toLocaleDateString("en-IN"), reads: 0 }, ...prev]);
    setNewTitle("");
    setShowPublishForm(false);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "articles", label: "Articles" },
    { id: "consulting", label: "Consulting" },
    { id: "insights", label: "Insights" },
  ] as const;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-5xl mx-auto pb-24">

      {/* ── PROFILE HEADER CARD — Blue professional style ── */}
      <div className="bg-white dark:bg-[#122238] rounded-3xl border-2 border-blue-500/20 shadow-md overflow-hidden mb-8">

        {/* Subtle blue top band — no banner */}
        <div className="h-24 bg-gradient-to-r from-[#1E3A5F]/10 via-blue-500/8 to-blue-400/5 dark:from-blue-950/30 dark:to-blue-900/10 relative">
          <div className="absolute top-3 right-4 flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-700/30 px-2.5 py-1 rounded-full">
              Associate SME Pro
            </span>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12 mb-5">
            {/* Avatar — 96px with blue ring */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#122238] overflow-hidden shadow-md ring-4 ring-blue-500/30 ring-offset-2 ring-offset-white dark:ring-offset-[#122238]">
                {avatarBase64 ? (
                  <img src={avatarBase64} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-black text-blue-500 bg-blue-50 dark:bg-blue-950/20">
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

            {/* Name + badge */}
            <div className="flex-1 pt-12">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                {/* Blue verified badge */}
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase bg-blue-600 text-white px-2.5 py-0.5 rounded-full tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> Verified Associate
                </span>
                {openToConsulting && (
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 px-2 py-0.5 rounded-full">
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

          {/* Profile URL */}
          <div className="flex items-center gap-2 p-2.5 bg-blue-50/50 dark:bg-blue-950/10 rounded-xl border border-blue-100 dark:border-blue-900/20 text-xs mb-5">
            <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="flex-1 truncate text-[10px] text-gray-500">{profileUrl}</span>
            <button onClick={handleCopy} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-[#F0652E] transition-colors">
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copiedUrl ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Consulting toggle + upgrade nudge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpenToConsulting(!openToConsulting)}
                className={`relative w-10 h-5 rounded-full transition-colors ${openToConsulting ? "bg-emerald-500" : "bg-gray-300 dark:bg-white/20"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${openToConsulting ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
              <span className="text-xs text-gray-500">Open to consulting inquiries</span>
            </div>
            <button
              onClick={() => router.push(`/${locale}/profile/plans/sme`)}
              className="text-[10px] font-bold text-blue-600 hover:text-[#F0652E] flex items-center gap-1"
            >
              Upgrade to Elite <ArrowRight className="w-3 h-3" />
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
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Profile Views", value: "284", color: "text-blue-600" },
                { label: "Articles", value: `${articles.length}`, color: "text-[#1D1D46] dark:text-white" },
                { label: "Inquiries", value: `${inquiries.length}`, color: "text-emerald-600" },
              ].map((s, i) => (
                <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-4 border border-gray-100 dark:border-white/5 text-center shadow-sm">
                  <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Bio / professional info */}
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
              <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" /> Professional Info
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
                    <span className="font-bold text-gray-400 w-28 shrink-0 capitalize">{row.label}</span>
                    <span className="capitalize">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent inquiries */}
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-sm">
              <h2 className="font-bold text-[#1D1D46] dark:text-white text-sm mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" /> Recent Consulting Inquiries
              </h2>
              <div className="space-y-3">
                {inquiries.map((inq, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 py-3 border-b border-gray-50 dark:border-white/5 last:border-0">
                    <div>
                      <p className="text-xs font-bold text-[#1D1D46] dark:text-white">{inq.name} · {inq.company}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{inq.topic}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 shrink-0">{inq.date}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 mt-1 border-t border-dashed border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2 opacity-50">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-[10px] text-gray-400">Full booking system available in SME Elite</p>
                  <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="text-[10px] font-bold text-[#F0652E] hover:underline ml-auto">
                    Upgrade →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-blue-100 dark:border-blue-900/20 shadow-sm space-y-3">
              <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm">Plan Status</h3>
              <div className="text-xs text-gray-500 space-y-2">
                {[
                  { label: "Articles", value: "Unlimited ✓", ok: true },
                  { label: "Consulting leads", value: "Active ✓", ok: true },
                  { label: "Expert Directory", value: "Listed ✓", ok: true },
                  { label: "Booking system", value: "Locked", ok: false },
                  { label: "Revenue share", value: "Locked", ok: false },
                  { label: "Custom banner", value: "Locked", ok: false },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{row.label}</span>
                    <span className={`font-bold ${row.ok ? "text-emerald-500" : "text-red-400"}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push(`/${locale}/profile/plans/sme`)}
                className="w-full py-2.5 mt-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all"
              >
                Upgrade to SME Elite
              </button>
            </div>

            <div className="bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/20 text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p className="font-bold">Visibility</p>
              <p className="text-[11px] text-blue-600/70 dark:text-blue-400/60">Platform-Only. Other verified members can view your profile. Not indexed by Google.</p>
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
              <p className="text-xs text-gray-400 mt-0.5">Unlimited publishing on Associate Pro</p>
            </div>
            <button
              onClick={() => setShowPublishForm(true)}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Publish Article
            </button>
          </div>

          {showPublishForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#122238] rounded-2xl p-5 border border-blue-100 dark:border-blue-900/20 shadow-md space-y-3"
            >
              <h3 className="font-bold text-sm text-[#1D1D46] dark:text-white">New Article</h3>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Article title..."
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <select
                value={newSector}
                onChange={e => setNewSector(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              >
                {["manufacturing", "chemicals", "textiles", "logistics", "steel", "pharmaceuticals", "agriculture"].map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button onClick={handlePublish} className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-1.5">
                  <Send className="w-3 h-3" /> Publish
                </button>
                <button onClick={() => setShowPublishForm(false)} className="px-4 py-2 text-xs text-gray-500 hover:text-gray-700">Cancel</button>
              </div>
            </motion.div>
          )}

          {articles.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold">No articles published yet</p>
              <p className="text-xs mt-1">Share your industry expertise to build authority.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((a, i) => (
                <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-4 border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">{a.sector} · {a.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-blue-600">{a.reads} reads</p>
                    <span className="text-[9px] font-black bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Published</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── CONSULTING TAB ── */}
      {activeTab === "consulting" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-[#122238] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
            <h2 className="font-bold text-[#1D1D46] dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" /> Consulting Inquiries
            </h2>
            {inquiries.map((inq, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl space-y-2 border border-gray-100 dark:border-white/5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#1D1D46] dark:text-white">{inq.name}</p>
                    <p className="text-xs text-gray-500">{inq.company} · {inq.date}</p>
                  </div>
                  <span className="text-[9px] font-black bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full uppercase">New</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 italic">"{inq.topic}"</p>
                <button className="text-xs font-bold text-blue-600 hover:underline">Reply to inquiry →</button>
              </div>
            ))}
            <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-dashed border-orange-200 dark:border-orange-900/30 rounded-2xl flex items-center gap-3">
              <Lock className="w-4 h-4 text-orange-400 shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-bold text-orange-700 dark:text-orange-400">Full booking calendar is an SME Elite feature</p>
                <p className="text-[10px] text-orange-500 mt-0.5">Allow readers to book paid 1:1 sessions directly from your profile.</p>
              </div>
              <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="text-xs font-bold text-[#F0652E] whitespace-nowrap">Upgrade →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── INSIGHTS TAB ── */}
      {activeTab === "insights" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Profile Views (30d)", value: "284", icon: Eye, color: "text-blue-600" },
              { label: "Article Reads", value: "1,240", icon: BarChart3, color: "text-emerald-600" },
              { label: "Inquiry Received", value: "2", icon: MessageSquare, color: "text-[#F0652E]" },
              { label: "Articles Published", value: `${articles.length}`, icon: FileText, color: "text-purple-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#122238] rounded-2xl p-4 border border-gray-100 dark:border-white/5 shadow-sm text-center">
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="p-5 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#1D1D46] dark:text-white">Deep audience insights available in SME Elite</p>
              <p className="text-[10px] text-gray-500 mt-0.5">See which Reader tiers are viewing you, their sectors, and geographic breakdown.</p>
            </div>
            <button onClick={() => router.push(`/${locale}/profile/plans/sme`)} className="ml-auto text-xs font-bold text-blue-600 whitespace-nowrap hover:underline">
              Upgrade →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

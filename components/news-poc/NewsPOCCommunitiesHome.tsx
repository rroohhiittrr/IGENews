"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Users, Search, CheckCircle, Crown, Star, TrendingUp,
  ChevronRight, ArrowUpRight, Bookmark, Share2, Eye, Award,
  Sparkles, Lock, Mic, BarChart2, Zap, Trophy,
  MessageSquare, Bell, Filter, Play, ChevronLeft, Target,
  MapPin, Briefcase, Shield, Activity, Calendar, Download, ThumbsUp,
  Building, ArrowDownRight, Layers, FileText, ArrowRight, Mail,
  Coins, Scale, Compass, Flag, Plus, Check, UserCheck, MessageCircle
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const COMMUNITY_STATS = [
  { val: "120,000+", label: "Active Trade Members", icon: Users, color: "text-blue-500" },
  { val: "4,800+", label: "Verified SMEs & ASMEs", icon: Award, color: "text-emerald-500" },
  { val: "1,200+", label: "C-Suite Executive Leaders", icon: Crown, color: "text-purple-500" },
  { val: "15,000+", label: "Live Trade Leads & RFQs", icon: Target, color: "text-amber-500" }
];

const CORE_COMMUNITY_TRACKS = [
  {
    id: "sme",
    title: "SME & ASME Expert Network",
    badge: "VERIFIED SME",
    color: "from-blue-600 to-indigo-700",
    bgLight: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-900",
    textCol: "text-blue-600 dark:text-blue-400",
    description: "Connect with verified Subject Matter Experts & Associate SMEs. Participate in live AMAs, request technical consultations, and share research.",
    members: "4,800+ Experts",
    cta: "Explore SME Network",
    href: "/en/news-poc/communities/sme"
  },
  {
    id: "reader",
    title: "Reader & Professional Network",
    badge: "GAMIFIED COMMUNITY",
    color: "from-emerald-600 to-teal-700",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-900",
    textCol: "text-emerald-600 dark:text-emerald-400",
    description: "Engage in article discussions, earn contributor badges, react to policy updates, and climb the reader leaderboard.",
    members: "98,000+ Readers",
    cta: "Explore Reader Network",
    href: "/en/news-poc/communities/reader"
  },
  {
    id: "leader",
    title: "C-Suite & Executive Leader Club",
    badge: "PRIVATE EXECUTIVE CLUB",
    color: "from-purple-600 to-indigo-700",
    bgLight: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-900",
    textCol: "text-purple-600 dark:text-purple-400",
    description: "Exclusive networking for CEOs, Founders, and Trade Ministers. Participate in private executive roundtables and corporate briefings.",
    members: "1,200+ Executives",
    cta: "Explore Executive Club",
    href: "/en/news-poc/communities/leader"
  },
  {
    id: "expo",
    title: "IGEN Expo Community (IFIC / IFEC)",
    badge: "TRADE EXPO NETWORK",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900",
    textCol: "text-amber-600 dark:text-amber-400",
    description: "B2B trade matchmaking hub for Importers (IFIC) and Exporters (IFEC). Access live RFQs, trade leads, and logistics partners.",
    members: "15,000+ Trade Leads",
    cta: "Explore Expo Network",
    href: "/en/news-poc/communities/expo"
  }
];

const COMMUNITY_FEED_POSTS = [
  {
    id: "post-1",
    author: "Dr. Aris Thorne",
    role: "Sovereign AI Lead Analyst",
    company: "Apex Tech Labs",
    badge: "VERIFIED SME",
    badgeCol: "bg-blue-600 text-white",
    time: "15m ago",
    sector: "AI & Cyber Security",
    title: "Key considerations for deploying quantized 8-bit LLMs on local edge hardware",
    content: "When evaluating sub-50ms latency constraints for enterprise deployments, edge TPU offloading provides a 4x throughput advantage compared to cloud API roundtrips. Here is a latency comparison benchmark...",
    upvotes: 142,
    comments: 38,
    track: "sme"
  },
  {
    id: "post-2",
    author: "Karan Patel",
    role: "Director of International Logistics",
    company: "AeroFreight Global",
    badge: "EXPORTER (IFEC)",
    badgeCol: "bg-amber-600 text-white",
    time: "1h ago",
    sector: "Logistics & Supply Chain",
    title: "Indo-European shipping tariff surge: Are exporters shifting to IMEC rail corridors?",
    content: "Maritime container rates on Mundra-Hamburg corridors rose 14% this fortnight. We are evaluating multimodal rail-to-port manifests via the Middle East. Share your experiences below.",
    upvotes: 98,
    comments: 24,
    track: "expo"
  },
  {
    id: "post-3",
    author: "Vikram Malhotra",
    role: "Managing Director",
    company: "Malhotra Heavy Engineering",
    badge: "C-SUITE LEADER",
    badgeCol: "bg-purple-600 text-white",
    time: "2h ago",
    sector: "Defence & Heavy Mfg",
    title: "Observations from the India-US Defense Procurement Summit in Washington D.C.",
    content: "Co-production frameworks for gas turbine engines and precision aerospace components have opened seamless offset investment avenues for Tier-1 defense suppliers.",
    upvotes: 210,
    comments: 52,
    track: "leader"
  }
];

const LIVE_AMAS = [
  { title: "AI Datacenter Power Management & Green Grid Integration", host: "Dr. Aris Thorne (SME)", time: "Tomorrow, 4 PM IST", attendees: "480 Registered", topic: "AI Hardware & Energy" },
  { title: "Navigating CEPA Tariff Phase-Outs for UAE Non-Oil Exports", host: "Sultan Ahmed bin Sulayem (DP World)", time: "July 24, 3 PM IST", attendees: "890 Registered", topic: "Bilateral Trade" }
];

const TOP_CONTRIBUTORS_LEADERBOARD = [
  { name: "Dr. Aris Thorne", role: "AI & Cyber SME", score: "9,840 pts", badge: "Top SME Contributor 🥇", avatar: "AT", color: "from-blue-600 to-indigo-700" },
  { name: "Vikram Malhotra", role: "C-Suite Executive", score: "8,920 pts", badge: "Top Leader 🥈", avatar: "VM", color: "from-purple-600 to-indigo-700" },
  { name: "Meera Deshmukh", role: "Trade Compliance SME", score: "8,450 pts", badge: "Top SME 🥉", avatar: "MD", color: "from-emerald-600 to-teal-700" },
  { name: "Rajesh Sharma", role: "Logistics Lead", score: "7,810 pts", badge: "Pro Reader", avatar: "RS", color: "from-amber-500 to-orange-600" }
];

const LIVE_TRADE_RFQS = [
  { id: "rfq-1", title: "Phytochemical Herbal Extracts (98% Purity)", buyer: "German BioPharma GmbH 🇩🇪", qty: "25 Metric Tons", budget: "$420,000", type: "BUYING RFQ", sector: "Biotech" },
  { id: "rfq-2", title: "Monocrystalline Solar PV Modules (550W)", buyer: "Dubai Solar Utilities 🇦🇪", qty: "10,000 Units", budget: "$1.2 Million", type: "BUYING RFQ", sector: "Clean Energy" }
];

const FEED_FILTER_TABS = ["All Posts", "SME & ASME", "Reader Discussions", "C-Suite Leaders", "Trade RFQs"];

export default function NewsPOCCommunitiesHome() {
  const [activeFeedTab, setActiveFeedTab] = useState("All Posts");
  const [feedPosts, setFeedPosts] = useState(COMMUNITY_FEED_POSTS);
  const [joinedTracks, setJoinedTracks] = useState<string[]>([]);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTrack, setNewPostTrack] = useState("sme");

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO BANNER — Global Trade Professional Communities Hub
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0c1a2e] via-[#112a4d] to-[#091526] text-white overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-10 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
            <div className="flex-1 space-y-6 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Trade Professional Network (IGN-M08)</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Global Trade Communities Hub
              </h1>
              
              <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed max-w-lg">
                Connect with 120,000+ trade professionals across SMEs, C-Suite Leaders, Readers, and Importers/Exporters (IFIC/IFEC).
              </p>

              {/* Global Community Search bar */}
              <div className="flex gap-2 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members, discussions, expert AMAs, RFQs..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm shrink-0">
                  Search Hub
                </button>
              </div>

              {/* 4 Action CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <Plus className="h-3.5 w-3.5" /> Join Community
                </Link>
                <Link href="#tracks" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <Compass className="h-3.5 w-3.5" /> Explore Tracks
                </Link>
                 <Link href="/eoi" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <Mic className="h-3.5 w-3.5" /> Host AMA / Webinar
                </Link>
              </div>
            </div>

            {/* Quick Stat Counter Panel */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {COMMUNITY_STATS.map((s, idx) => {
                const SIcon = s.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1.5 backdrop-blur-xs">
                    <SIcon className={`h-5 w-5 mx-auto ${s.color}`} />
                    <div className={`font-display text-xl font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-slate-400 text-[9px] font-semibold uppercase tracking-wider">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submenu Quick Navigation Strip */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-xs">
          <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3 flex flex-wrap gap-2 items-center justify-between">
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Submenus:</span>
            <div className="flex gap-2 flex-wrap text-xs">
              {[
                { label: "SME & ASME Network", href: "/en/news-poc/communities/sme", badge: "Verified Experts" },
                { label: "Reader Community", href: "/en/news-poc/communities/reader", badge: "Gamified Feed" },
                { label: "C-Suite Leader Club", href: "/en/news-poc/communities/leader", badge: "Executive Roundtables" },
                { label: "IGEN Expo Network", href: "/en/news-poc/communities/expo", badge: "Importers / Exporters" }
              ].map((sub, idx) => (
                <Link key={idx} href={sub.href} className="bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
                  <span>{sub.label}</span>
                  <ChevronRight className="h-3 w-3 opacity-60" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. MAIN CONTENT GRID (Community Feed / Live AMAs / RFQs / Leaderboards)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-12 gap-8">

          {/* ── LEFT MAIN COLUMN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* COMMUNITY FEED & DISCUSSIONS */}
            <div className="space-y-4">
               {/* Share Trade Insight quick-post panel */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">ME</div>
                <input 
                  type="text"
                  placeholder="Share a trade insight or ask a query to the community..."
                  onClick={() => {
                    setShowCreatePostModal(true);
                    setNewPostTitle("");
                    setNewPostContent("");
                  }}
                  readOnly
                  className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-xl px-4 py-2 text-xs outline-none hover:border-blue-500 transition-colors cursor-pointer"
                />
                <button 
                  onClick={() => {
                    setShowCreatePostModal(true);
                    setNewPostTitle("");
                    setNewPostContent("");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Post Insight
                </button>
              </div>

              <div className="space-y-4">
                {feedPosts
                  .filter((post) => {
                    if (activeFeedTab === "All Posts") return true;
                    if (activeFeedTab === "SME & ASME") return post.track === "sme";
                    if (activeFeedTab === "Reader Discussions") return post.track === "reader";
                    if (activeFeedTab === "C-Suite Leaders") return post.track === "leader";
                    if (activeFeedTab === "Trade RFQs") return post.track === "expo";
                    return true;
                  })
                  .map((post) => (
                    <div key={post.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3 hover:border-blue-300 dark:hover:border-blue-900 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {post.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{post.author}</h4>
                            <span className="text-[9px] text-gray-400">{post.role} · {post.company}</span>
                          </div>
                        </div>
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${post.badgeCol}`}>
                          {post.badge}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-gray-955 dark:text-white leading-snug">{post.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{post.content}</p>

                      <div className="pt-2 border-t border-gray-100 dark:border-gray-855 flex items-center justify-between text-[10px] text-gray-500">
                        <span>{post.time} · {post.sector}</span>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => {
                              setFeedPosts(prev => prev.map(p => p.id === post.id ? { ...p, upvotes: p.upvotes + 1 } : p));
                            }}
                            className="flex items-center gap-1 hover:text-blue-600"
                          >
                            <ThumbsUp className="h-3.5 w-3.5" /> {post.upvotes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600"><MessageSquare className="h-3.5 w-3.5" /> {post.comments} comments</button>
                          <button className="hover:text-gray-700"><Share2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* LIVE AMAs & WEBINARS SCHEDULE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Live Expert AMAs & Executive Webinars</h2>
                <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View Full Schedule</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LIVE_AMAS.map((ama, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/20 px-2 py-0.5 rounded">
                        {ama.topic} · {ama.time}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{ama.title}</h4>
                      <p className="text-[10px] text-gray-500">Host: {ama.host}</p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[9px]">
                      <span className="text-gray-400">{ama.attendees}</span>
                      <Link href="/eoi" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1.5 rounded-lg">
                        Register Free
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE TRADE LEADS & RFQS (IGEN EXPO NETWORK) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Live B2B Trade Leads & RFQs (IGEN Expo)</h2>
                <Link href="/en/news-poc/communities/expo" className="text-[10px] font-bold text-amber-500 hover:underline uppercase">View Expo Hub</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LIVE_TRADE_RFQS.map((rfq) => (
                  <div key={rfq.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                        {rfq.type}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400">{rfq.sector}</span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{rfq.title}</h4>
                    <p className="text-[10px] text-gray-500">Buyer: {rfq.buyer} · Quantity: {rfq.qty}</p>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-emerald-600">{rfq.budget}</span>
                      <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-[9px] px-3 py-1.5 rounded-lg">
                        Submit Quotation
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Top Contributors Leaderboard */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 bg-blue-600 text-white flex items-center justify-between font-bold text-xs">
                <span>Top Community Contributors</span>
                <Trophy className="h-4 w-4 text-amber-300" />
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-855">
                {TOP_CONTRIBUTORS_LEADERBOARD.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{c.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{c.name}</span>
                      <span className="text-[8px] text-gray-450 block truncate">{c.role} · {c.badge}</span>
                    </div>
                    <span className="font-display text-xs font-bold text-blue-600">{c.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Newsletter Subscription */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-855 pb-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Trade Community Briefing</span>
              </div>
              <p className="text-[10px] text-gray-500">Receive weekly expert AMAs, top discussions, and live RFQs.</p>
              <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none" placeholder="Enter work email" />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors">
                Subscribe Now
              </button>
            </div>

            {/* Persistent Upgrade Banner */}
            <div className="bg-gradient-to-br from-slate-950 to-[#112a4d] text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Community Pro & Verified</span>
              </div>
              <ul className="space-y-2 text-[10px] text-slate-300">
                {[
                  "Verified SME / ASME Profile Badge",
                  "Direct Member Messaging & Consultation Leads",
                  "Unlimited B2B RFQs & Trade Lead Submissions",
                  "Private C-Suite Executive Club Access",
                  "Host Sponsored AMAs & Industry Webinars"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-2 pt-2">
                <Link href="/eoi" className="block text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-lg transition-colors">
                  Get Verified SME Badge
                </Link>
                <Link href="/eoi" className="block text-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors">
                  Join Executive Club
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. CORE COMMUNITY TRACKS OVERVIEW (4 CARDS - RE-ORDERED)
      ══════════════════════════════════════════════════════════════════ */}
      <section id="tracks" className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore 4 Core Community Tracks</h2>
            <span className="text-[9px] font-bold text-gray-400">Targeted Trade Hubs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_COMMUNITY_TRACKS.map((track) => (
              <div key={track.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-blue-500 transition-all group space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${track.bgLight} ${track.textCol}`}>
                      {track.badge}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400">{track.members}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                    {track.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-855 flex items-center justify-between">
                  <Link href={track.href} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    {track.cta} <ChevronRight className="h-4 w-4" />
                  </Link>
                  <button 
                    onClick={() => {
                      setJoinedTracks(prev => prev.includes(track.id) ? prev.filter(t => t !== track.id) : [...prev, track.id]);
                    }}
                    className={`font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all ${
                      joinedTracks.includes(track.id)
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-450 border border-emerald-250 dark:border-emerald-900"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-305 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {joinedTracks.includes(track.id) ? "Joined ✓" : "Join Track"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create New Post Modal */}
      {showCreatePostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
              <span className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider">
                Share a Trade Insight
              </span>
              <button 
                onClick={() => setShowCreatePostModal(false)}
                className="text-gray-400 hover:text-gray-650 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Select Target Community Track</label>
                <select 
                  value={newPostTrack}
                  onChange={(e) => setNewPostTrack(e.target.value)}
                  className="w-full rounded-lg border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                >
                  <option value="sme">SME &amp; ASME Expert Network</option>
                  <option value="reader">Reader &amp; Professional Network</option>
                  <option value="leader">C-Suite &amp; Executive Leader Club</option>
                  <option value="expo">IGEN Expo Network (IFIC/IFEC)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Discussion Headline</label>
                <input 
                  type="text" 
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="e.g. Critical takeaways from the new digital trade policy guidelines..."
                  className="w-full rounded-lg border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-900 dark:text-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Insight Content Details</label>
                <textarea 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Provide detailed context, metrics, or trade compliance questions..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-900 dark:text-white font-normal leading-relaxed"
                />
              </div>

              <button 
                onClick={() => {
                  if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
                    alert("Please enter both a headline and some details before posting.");
                    return;
                  }
                  const badgeLabel = newPostTrack === "sme" 
                    ? "VERIFIED SME" 
                    : newPostTrack === "leader" 
                    ? "C-SUITE LEADER" 
                    : newPostTrack === "expo" 
                    ? "EXPORTER (IFEC)" 
                    : "MEMBER";
                  const badgeStyle = newPostTrack === "sme" 
                    ? "bg-blue-600 text-white" 
                    : newPostTrack === "leader" 
                    ? "bg-purple-600 text-white" 
                    : newPostTrack === "expo" 
                    ? "bg-amber-600 text-white" 
                    : "bg-gray-200 text-gray-800";

                  const newPostItem = {
                    id: `post-${Date.now()}`,
                    author: "Me (My Profile)",
                    role: "Trade Consultant",
                    company: "Global Trade Solutions",
                    badge: badgeLabel,
                    badgeCol: badgeStyle,
                    time: "Just now",
                    sector: "Trade Regulations",
                    title: newPostTitle,
                    content: newPostContent,
                    upvotes: 1,
                    comments: 0,
                    track: newPostTrack
                  };

                  setFeedPosts([newPostItem, ...feedPosts]);
                  setShowCreatePostModal(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors uppercase tracking-wider"
              >
                Publish Insight to Feed
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

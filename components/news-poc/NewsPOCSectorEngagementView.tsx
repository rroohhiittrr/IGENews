"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
  Plus,
  HelpCircle,
  CheckCircle,
  Users,
  Calendar,
  Sparkles,
  Lock,
  Mail,
  ChevronRight,
  TrendingUp,
  Award,
  Filter,
  Check,
  Crown,
  Zap,
  Cpu,
  Layers,
  Globe,
  Star,
  Activity,
  Flame,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { IGEN_50_SECTORS } from "./igenTaxonomyData";

// Reusing sector lists
const POPULAR_SECTORS = [
  "Semiconductors",
  "AI & Cyber Security",
  "Energy & Sustainability",
  "Electronics & IT",
  "Automotive & Electric Vehicles"
];

// Sub-industries mapping for selector
const SECTOR_SUB_INDUSTRIES: Record<string, string[]> = {
  "Semiconductors": ["OSAT Substrates", "Fab Manufacturing", "EDA Tooling", "Memory Packaging"],
  "AI & Cyber Security": ["Sovereign LLMs", "Edge Security Node", "Threat Telemetry", "SaaS Auditing"],
  "Energy & Sustainability": ["Green Hydrogen", "Solar PV Modules", "Solid State Storage", "Marine Bunkering"],
  "Electronics & IT": ["GCC Operations", "Printed Circuit Assembly", "Component Distribution", "Enterprise Cloud"],
  "Automotive & Electric Vehicles": ["800V Drivetrains", "Battery Pack Swap Enclosures", "Lidar Transceivers", "Fleet Management"]
};

export default function NewsPOCSectorEngagementView() {
  const router = useRouter();

  // Selected filters
  const [selectedSector, setSelectedSector] = useState<string>("Semiconductors");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("OSAT Substrates");
  const [activeFilterTab, setActiveFilterTab] = useState<"Trending" | "Most Discussed" | "Most Recent" | "Expert Discussions">("Trending");
  const [activePollVotes, setActivePollVotes] = useState<Record<string, number>>({});
  const [followedDiscussions, setFollowedDiscussions] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [showAskModal, setShowAskModal] = useState(false);
  const [expertQuestion, setExpertQuestion] = useState("");
  const [expertQASuccess, setExpertQASuccess] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const toggleFollowDiscussion = (id: string) => {
    setFollowedDiscussions(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleLikePost = (id: string) => {
    setLikedPosts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const submitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertQuestion.trim()) return;
    setExpertQASuccess(true);
    setTimeout(() => {
      setExpertQASuccess(false);
      setShowAskModal(false);
      setExpertQuestion("");
    }, 2500);
  };

  // Mock discussions data
  const discussions = useMemo(() => {
    return [
      {
        id: "post-1",
        type: "DISCUSSION",
        title: "Will the India-Taiwan OSAT substrate initiative meet commercial yield forecasts by Q4 2026?",
        excerpt: "Current cleanroom telemetry shows promising pilot packaging yield scaling at the Bengaluru facility, but substrate shortages continue to trigger component delays.",
        author: "Vikram R. Sen",
        designation: "VP Engineering",
        company: "Semicon India Labs",
        time: "15m ago",
        views: "1.2K",
        replies: 48,
        likes: 124,
        sector: "Semiconductors",
        industry: "OSAT Substrates"
      },
      {
        id: "post-2",
        type: "QUESTION",
        title: "What is the typical regulatory overhead when establishing sovereign LLM nodes inside Tier-2 clusters?",
        excerpt: "We are auditing MeitY's cloud infrastructure sandbox program. Are local server arrays subjected to mandatory encryption compliance updates?",
        author: "Meera Nair",
        designation: "Principal Architect",
        company: "Indo-Edge Systems",
        time: "2h ago",
        views: "980",
        replies: 24,
        likes: 85,
        sector: "AI & Cyber Security",
        industry: "Sovereign LLMs"
      },
      {
        id: "post-3",
        type: "EXPERT ANSWER",
        title: "Rotterdam green ammonia off-take pricing contracts breakdown",
        excerpt: "Verified Expert Response: Bunkering terminal pricing is indexing a 12% premium relative to Gulf competitors, compensated by tax rebates under bilateral EU mandates.",
        author: "Dr. Aris Thorne",
        designation: "Trade Compliance SME",
        company: "Global Corridors Advisory",
        time: "4h ago",
        views: "1.4K",
        replies: 15,
        likes: 195,
        sector: "Energy & Sustainability",
        industry: "Green Hydrogen"
      }
    ].filter(post => 
      !selectedSector || post.sector === selectedSector
    );
  }, [selectedSector]);

  // Polls
  const polls = [
    {
      id: "poll-1",
      question: "Which component supply chain exhibits the highest risk of Q4 capacity bottleneck?",
      options: [
        { label: "OSAT Packaging Substrates", pct: 48 },
        { label: "High-Voltage SiC Inverters", pct: 28 },
        { label: "GaN Fast-Charging MOSFETs", pct: 15 },
        { label: "PEM Electrolyzer Membranes", pct: 9 }
      ]
    }
  ];

  return (
    <div className="space-y-10 pb-16">

      {/* 01. COMMUNITY HERO */}
      <section className="bg-gradient-to-br from-[#051c14] via-[#092f22] to-[#030f0b] text-white relative overflow-hidden border-b border-gray-805 py-12 rounded-3xl">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] font-mono font-bold bg-emerald-650 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
              Sector Engagement Hub
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Connect, Discuss & Learn With Industry Professionals
            </h1>
            <p className="text-slate-350 text-xs md:text-sm font-normal leading-relaxed">
              Join sector-focused conversations, ask compliance questions, participate in industry sentiment polls, connect with verified experts, and discover professional B2B events.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setIsJoined(!isJoined)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                {isJoined ? "Joined Community ✓" : "Join the Community →"}
              </button>
              <button
                onClick={() => setShowAskModal(true)}
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
              >
                Ask a Question
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl max-w-xs space-y-3 shrink-0 backdrop-blur-xs text-xs font-semibold">
            <div className="flex justify-between items-center text-gray-400">
              <span>Active Professionals</span>
              <span className="text-white font-bold">14,840</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Verified Experts</span>
              <span className="text-white font-bold">320 SMEs</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Weekly Q&A Threads</span>
              <span className="text-white font-bold">1,820</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. SECTOR / INDUSTRY SELECTOR */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-850 pb-2">
          <Filter className="h-4 w-4 text-emerald-600" />
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Select Community Context
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Sector Group</label>
            <select
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value);
                const subArr = SECTOR_SUB_INDUSTRIES[e.target.value] || [];
                setSelectedIndustry(subArr[0] || "");
              }}
              className="w-full text-xs font-bold rounded-xl border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 outline-none text-gray-900 dark:text-white"
            >
              {POPULAR_SECTORS.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Sub-Segment Community</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full text-xs font-bold rounded-xl border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 outline-none text-gray-900 dark:text-white"
            >
              {(SECTOR_SUB_INDUSTRIES[selectedSector] || []).map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN GRID: LEFT FEED / RIGHT SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: COMMUNITY FEED */}
        <div className="col-span-12 lg:col-span-8 space-y-6">

          {/* 03. COMMUNITY FEED */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-205 dark:border-gray-850 pb-3">
              <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1">
                <MessageSquare className="h-4.5 w-4.5 text-emerald-600" /> {selectedSector} &gt; {selectedIndustry} Community Feed
              </h2>

              <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                {["Trending", "Most Discussed", "Most Recent", "Expert Discussions"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilterTab(tab as any)}
                    className={`px-2.5 py-1 rounded-md text-[9.5px] font-bold transition-all cursor-pointer ${
                      activeFilterTab === tab
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-gray-550 dark:text-gray-400 hover:text-emerald-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {discussions.length === 0 ? (
              <div className="text-center py-10 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-850">
                <p className="text-xs text-gray-400 font-semibold">No discussions are available yet for this sub-segment.</p>
                <button
                  onClick={() => setShowAskModal(true)}
                  className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-4 py-2 rounded-xl"
                >
                  Start a Discussion +
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {discussions.map((post) => {
                  const isLiked = likedPosts.includes(post.id);
                  const isFollowed = followedDiscussions.includes(post.id);
                  return (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 hover:border-emerald-500 transition-colors space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-955/20 px-2 py-0.5 rounded uppercase">
                          {post.type}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{post.time}</span>
                      </div>

                      <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="pt-3 border-t border-gray-100 dark:border-gray-855 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                        <div>
                          <span className="text-gray-800 dark:text-gray-200">{post.author}</span>
                          <span className="text-gray-450 font-normal"> · {post.designation}, {post.company}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center gap-1.5 cursor-pointer ${isLiked ? "text-emerald-600" : "hover:text-emerald-600"}`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" /> <span>{post.likes + (isLiked ? 1 : 0)}</span>
                          </button>
                          <button
                            onClick={() => toggleFollowDiscussion(post.id)}
                            className={`flex items-center gap-1.5 cursor-pointer ${isFollowed ? "text-blue-600" : "hover:text-blue-600"}`}
                          >
                            <Bookmark className="h-3.5 w-3.5" /> <span>{isFollowed ? "Following" : "Save"}</span>
                          </button>
                          <Link href="/en/eoi" className="text-emerald-600 hover:underline">
                            Reply ({post.replies}) →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 05. INDUSTRY PULSE / POLLS */}
          <div className="space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-205 dark:border-gray-850 pb-2">
              Live Industry Sentiment Polls
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {polls.map((poll) => {
                const votedOption = activePollVotes[poll.id];
                const hasVoted = votedOption !== undefined;
                return (
                  <div key={poll.id} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-4">
                    <span className="text-[8.5px] font-bold text-emerald-605 uppercase tracking-widest block">LIVE POLL</span>
                    <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">{poll.question}</h4>
                    
                    <div className="space-y-2.5">
                      {poll.options.map((opt, idx) => {
                        const isSelected = votedOption === idx;
                        return (
                          <button
                            key={idx}
                            disabled={hasVoted}
                            onClick={() => setActivePollVotes(prev => ({ ...prev, [poll.id]: idx }))}
                            className={`w-full text-left p-3 rounded-xl border text-xs relative overflow-hidden transition-all flex justify-between items-center ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-955/20 text-emerald-650"
                                : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 hover:border-emerald-300"
                            }`}
                          >
                            {hasVoted && (
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-emerald-500/10 rounded-xl transition-all"
                                style={{ width: `${opt.pct + (isSelected ? 2 : -1)}%` }}
                              />
                            )}
                            <span className="relative z-10 font-semibold flex items-center gap-1.5">
                              {isSelected && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                              {opt.label}
                            </span>
                            {hasVoted && (
                              <span className="relative z-10 text-emerald-600 font-bold">{opt.pct + (isSelected ? 2 : -1)}%</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 11. COMMUNITY INTELLIGENCE */}
          <div className="space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-205 dark:border-gray-850 pb-2">
              Community Sentiment Intelligence
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Top Concern", value: "Substrate Capex Shortage", context: "Semiconductor OSAT bottlenecks" },
                { title: "Emerging Focus", value: "Glass Core Packaging", context: "High-density local routing" },
                { title: "Investment Sentiment", value: "Highly Positive", context: "PLI Phase-2 guidelines matching" }
              ].map((intel, idx) => (
                <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-855 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[9px] text-gray-450 uppercase block font-bold">{intel.title}</span>
                  <div className="text-xs font-bold text-gray-955 dark:text-white leading-tight">{intel.value}</div>
                  <span className="text-[9.5px] text-gray-400 block font-medium leading-relaxed">{intel.context}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="col-span-12 lg:col-span-4 space-y-8">

          {/* 06 & 07: ASK AN EXPERT & FEATURED EXPERTS */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-850 pb-3">
              <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="h-4.5 w-4.5 text-emerald-600" /> Ask an Expert (SME Q&A)
              </h3>
              <button
                onClick={() => setShowAskModal(true)}
                className="text-[9.5px] font-bold text-emerald-650 hover:underline"
              >
                Submit Question
              </button>
            </div>

            {/* SME list */}
            <div className="space-y-4">
              {[
                { name: "Dr. Aris Thorne", role: "Trade Compliance SME", company: "Global Corridors Advisory", badge: "Top Contributor" },
                { name: "Meera Deshmukh", role: "AI & Cyber Specialist", company: "Indo-Edge Systems", badge: "Expert Mentor" }
              ].map((expert, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl border border-gray-200/60 dark:border-gray-850 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-purple-650 bg-purple-50 dark:bg-purple-955/20 px-2 py-0.5 rounded uppercase">
                      {expert.badge}
                    </span>
                    <span className="text-[8px] text-gray-400 font-bold flex items-center gap-0.5"><ShieldCheck className="h-3 w-3 text-emerald-505" /> Verified SME</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-tight">{expert.name}</h4>
                  <p className="text-[10px] text-gray-500 font-semibold">{expert.role} · {expert.company}</p>
                  <button
                    onClick={() => {
                      setShowAskModal(true);
                      setExpertQuestion(`Dear ${expert.name}, `);
                    }}
                    className="text-[9.5px] font-bold text-emerald-650 hover:underline mt-1 block"
                  >
                    Direct Q&A Ask →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 08. UPCOMING WEBINARS & EVENTS */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-emerald-600" /> Upcoming Webinars & Events
            </h3>

            <div className="space-y-4">
              {[
                { title: "Advanced OSAT Cleanroom Yield Parameters Roundtable", date: "Sep 18, 2026", format: "Live Panel" },
                { title: "Bilateral Customs Clearing & Blockchain Manifesting AMA", date: "Oct 05, 2026", format: "Webinar AMA" }
              ].map((ev, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-150 dark:border-gray-855 space-y-1.5">
                  <div className="flex justify-between items-center text-[8px] font-bold text-gray-400">
                    <span>{ev.format}</span>
                    <span>{ev.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">{ev.title}</h4>
                  <Link href="/en/eoi" className="text-[9.5px] font-bold text-emerald-600 hover:underline mt-2 block">
                    Register Seat →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 12. PREMIUM COMMUNITY (PRIVATE GROUPS) */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 rounded-2xl p-5 space-y-4">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> Private Industry Circles
            </h3>

            <div className="space-y-3">
              {[
                { name: "Semiconductor Packaging Leaders Circle", members: "125 members", format: "Executive Only" },
                { name: "Sovereign AI Compute Executive Roundtable", members: "88 members", format: "Gov & Enterprise Only" }
              ].map((group, idx) => (
                <div key={idx} className="p-3 bg-amber-500/5 border border-amber-550/15 rounded-xl flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-tight">{group.name}</h4>
                    <span className="text-[9px] text-gray-450 font-bold block">{group.members} · {group.format}</span>
                  </div>
                  <button
                    onClick={() => setProModalOpen(true)}
                    className="text-[9px] font-mono font-bold bg-amber-500 hover:bg-amber-600 text-gray-950 px-2 py-1 rounded flex items-center gap-0.5"
                  >
                    <Lock className="h-3 w-3" /> Apply
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 13. SPONSORED DISCUSSIONS */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 space-y-3">
            <span className="text-[8px] font-bold text-amber-655 uppercase tracking-widest block">Sponsored Conversation</span>
            <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">
              "How are local fab lines leveraging high-purity etching gases from Mundra Special Zone?"
            </h4>
            <span className="text-[9px] text-gray-400 block font-bold">Sponsored by Mundra Gas Logistics</span>
            <Link href="/en/eoi" className="text-[9.5px] font-bold text-amber-555 hover:underline mt-2 block">
              Join Sponsored Discussion →
            </Link>
          </div>

        </div>

      </div>

      {/* 14. COMMUNITY NEWSLETTER */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-1">
          <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider">Community & Industry Briefing</h3>
          <p className="text-xs text-gray-550 leading-normal">
            Subscribe to receive standard weekly summaries detailing most active Q&A threads, executive events schedule, and aggregated corridor metrics.
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0 max-w-sm">
          <input
            type="email"
            placeholder="Enter business email"
            className="text-xs font-bold rounded-xl border border-gray-205 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 px-3 py-2 outline-none text-gray-900 dark:text-white"
          />
          <button
            onClick={() => alert("Successfully Subscribed!")}
            className="bg-emerald-600 hover:bg-emerald-755 text-white font-bold text-xs px-4 py-2 rounded-xl"
          >
            Subscribe
          </button>
        </div>
      </section>

      {/* 15. PRO / ENTERPRISE CTA */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-emerald-500/5 dark:from-[#0f172a] dark:to-emerald-955/10">
        <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Unlock More From the Industry Community</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-355">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-850 space-y-3">
            <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">FREE</h4>
            <ul className="space-y-1.5 font-semibold text-gray-550 dark:text-gray-300">
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Public discussions</li>
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Basic sentiment voting</li>
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Community discovery</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border-2 border-emerald-555 bg-emerald-50/10 dark:bg-emerald-955/5 space-y-3 relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-emerald-550 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase">Most Popular</span>
            <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">PRO</h4>
            <ul className="space-y-1.5 font-semibold text-gray-555 dark:text-gray-300">
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Premium discussions access</li>
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Exclusive SME ask privileges</li>
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Member-only webinars</li>
            </ul>
            <button
              onClick={() => setProModalOpen(true)}
              className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Upgrade to Pro
            </button>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-855 space-y-3">
            <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">ENTERPRISE</h4>
            <ul className="space-y-1.5 font-semibold text-gray-555 dark:text-gray-300">
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Private group circles</li>
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Private C-suite roundtables</li>
              <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Custom event sponsorship</li>
            </ul>
            <Link
              href="/en/eoi"
              className="block text-center w-full bg-slate-900 hover:bg-slate-955 text-white font-bold text-xs py-2 rounded-xl transition-all"
            >
              Explore Enterprise
            </Link>
          </div>
        </div>
      </section>

      {/* --- ASK AN EXPERT MODAL --- */}
      {showAskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="h-4.5 w-4.5 text-emerald-600" /> Submit Question to SME
              </h4>
              <button
                onClick={() => {
                  setShowAskModal(false);
                  setExpertQASuccess(false);
                }}
                className="text-gray-450 hover:text-gray-655 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {expertQASuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-955/20 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Question Submitted!</h5>
                <p className="text-[10px] text-gray-555 px-4 font-normal leading-normal">
                  Your question has been routed to verified compliance SMEs. You will receive an alert once answered.
                </p>
              </div>
            ) : (
              <form onSubmit={submitQuestion} className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-450 uppercase">Question Details</label>
                  <textarea
                    rows={4}
                    value={expertQuestion}
                    onChange={(e) => setExpertQuestion(e.target.value)}
                    placeholder="Enter details of your B2B supply-chain, regulatory or tariff compliance question..."
                    className="w-full text-xs font-semibold rounded-xl border border-gray-205 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 p-3 outline-none text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAskModal(false)}
                    className="bg-gray-105 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- PRO UPGRADE MODAL --- */}
      {proModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-amber-505 animate-bounce" /> Upgrade to Community Pro
              </h4>
              <button
                onClick={() => {
                  setProModalOpen(false);
                  setProSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-655 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {proSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-955/20 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Pro Trial Registered!</h5>
                <p className="text-[10px] text-gray-555 px-4 font-normal leading-normal">
                  Thank you! Your pro community trial is now active. You can now access private circles and exclusive webinars.
                </p>
                <button
                  onClick={() => {
                    setProModalOpen(false);
                    setProSuccess(false);
                  }}
                  className="bg-gray-105 dark:bg-gray-855 text-gray-655 dark:text-slate-355 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355">
                <p className="text-[11px] leading-relaxed font-normal">
                  Unlock executive discussions, private roundtable groups, and monthly expert masterclasses.
                </p>
                <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-amber-600 uppercase tracking-widest text-[9px]">Included Entitlements</h5>
                  <ul className="list-disc pl-4 space-y-1 font-semibold text-[10.5px]">
                    <li>Private executive group applications</li>
                    <li>SME prioritization matching filters</li>
                    <li>Downloadable community pulse report briefs</li>
                  </ul>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setProModalOpen(false)}
                    className="bg-gray-105 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setProSuccess(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
                  >
                    Confirm Pro Trial Upgrade
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

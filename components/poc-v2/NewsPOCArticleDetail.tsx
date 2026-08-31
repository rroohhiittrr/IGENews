"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, ThumbsUp, MessageSquare, Bookmark, Share2, Sparkles,
  CheckCircle, User, Calendar, Clock, Eye, Send, Star, Download,
  Globe, ChevronRight, Sliders, ChevronDown, Award, Briefcase,
  Flame, Mail, ShieldAlert, Check, Heart
} from "lucide-react";

interface Props {
  articleId?: string;
}

const ARTICLE_DATA = {
  id: "sec-1",
  title: "India's Semiconductor Revolution: A $10B Strategic Leap",
  subtitle: "As global tech hardware supply chains realign, India's sovereign $10 Billion semiconductor mission clears key regulatory hurdles, accelerating OSAT substrate packaging facilities for Q4 2026 pilot production.",
  author: {
    name: "Dr. Arjan Mehta",
    role: "Chief Analyst, Hardware & Supply Chains",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Dr. Arjan Mehta specializes in semiconductor OSAT packaging, bilateral technology transfer corridors, and sovereign AI hardware infrastructure."
  },
  date: "15m ago",
  readTime: "5 min read",
  views: "3.8K",
  likesCount: 284,
  commentsCount: 38,
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
  sector: "Semiconductors (S46)",
  industry: "Silicon Fabrication & OSAT",
  tags: {
    sectors: ["Semiconductors (S46)", "Electronics & IT (S16)"],
    industries: ["Silicon OSAT Packaging", "Advanced Lithography", "Wafer Fabrication"],
    countries: ["India 🇮🇳", "USA 🇺🇸", "Taiwan 🇹🇼", "UAE 🇦🇪"],
    leaders: ["Executive Strategy", "OSAT Policy Directives", "C-Suite Tech Transfer", "Sovereign AI Governance"],
    readers: ["Procurement Managers", "Export Logistics Leads", "Sourcing Directors", "Trade Analysts"],
    general: ["#SemiconductorMission", "#OSATPackaging", "#SupplyChain", "#CustomsClearance", "#ViksitBharat", "#HardwareSubsidies"]
  }
};

const RELATED_INTEL = [
  { id: "rel-1", title: "Vande Bharat High-Speed Freight Corridors Expand to Western Ports", tag: "Railways", readTime: "4 min read", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&auto=format&fit=crop&q=60" },
  { id: "rel-2", title: "Solar PV Cell Production Hits Record 14GW Annualized Volume", tag: "Clean Energy", readTime: "5 min read", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60" },
  { id: "rel-3", title: "Sovereign AI Datacenter Grid Subsidies Unlocked for Tier-2 Parks", tag: "AI Infrastructure", readTime: "6 min read", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60" },
  { id: "rel-4", title: "Autonomous Industrial Robotics Deployment Expands across Gujarat Hubs", tag: "Robotics", readTime: "4 min read", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60" }
];

export default function NewsPOCArticleDetail({ articleId = "sec-1" }: Props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(ARTICLE_DATA.likesCount);
  const [saved, setSaved] = useState(false);
  const [ratedOption, setRatedOption] = useState<string | null>(null);

  const [comments, setComments] = useState([
    { id: "c1", author: "Ankit Sharma", time: "10m ago", text: "The fast-tracked customs clearance at Mundra Port will make a massive difference for wafer buffer stocks.", likes: 14 },
    { id: "c2", author: "Smita Verma", time: "25m ago", text: "Tremendous momentum for domestic OSAT packaging! Looking forward to seeing the Q4 pilot production yields.", likes: 8 }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now().toString(), author: "You (Rajesh)", time: "Just now", text: newComment, likes: 0 }
    ]);
    setNewComment("");
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

      {/* ── BREADCRUMBS STRIP ── */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a]">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/en/poc-v2" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to News Feed
          </Link>
          <span>/</span>
          <Link href="/en/poc-v2/sector-news" className="hover:text-blue-600">Sector News</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-200 font-bold truncate max-w-xs">{ARTICLE_DATA.title}</span>
        </div>
      </div>

      {/* ── MAIN TWO-COLUMN CONTAINER ── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="grid grid-cols-12 gap-8">

          {/* ══════════════════════════════════════════════════════════════════
              LEFT MAIN COLUMN (Article Body, Action Bar, Discussion)
          ══════════════════════════════════════════════════════════════════ */}
          <div className="col-span-12 lg:col-span-8 space-y-6">

            {/* Hero Cover Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
              <img
                src={ARTICLE_DATA.image}
                alt={ARTICLE_DATA.title}
                className="w-full h-72 md:h-96 object-cover"
              />
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-sm">
                {ARTICLE_DATA.sector}
              </span>
            </div>

            {/* Article Headline & Abstract */}
            <div className="space-y-4">
              <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight leading-tight text-gray-950 dark:text-white">
                {ARTICLE_DATA.title}
              </h1>

              {/* Sub-headline Executive Callout Box */}
              <div className="bg-blue-50/60 dark:bg-blue-950/20 border-l-4 border-blue-600 p-4 rounded-r-xl text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                {ARTICLE_DATA.subtitle}
              </div>

              {/* Author Byline Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-200 dark:border-gray-800 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={ARTICLE_DATA.author.avatar}
                    alt={ARTICLE_DATA.author.name}
                    className="h-10 w-10 rounded-full object-cover border border-blue-500"
                  />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      {ARTICLE_DATA.author.name}
                      <span className="bg-blue-100 dark:bg-blue-950 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded">VERIFIED SME</span>
                    </div>
                    <div className="text-[10px] text-gray-400">{ARTICLE_DATA.author.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{ARTICLE_DATA.date}</span>
                  <span>·</span>
                  <span>{ARTICLE_DATA.readTime}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{ARTICLE_DATA.views} Views</span>
                </div>
              </div>

              {/* ── ACTION BAR (Like & Comment on Left | Save & Share on Right) ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3 shadow-xs flex items-center justify-between">
                {/* Left Side: Like and Comment near each other */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      liked ? "bg-blue-600 text-white shadow-xs" : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{likes} Likes</span>
                  </button>

                  <a
                    href="#discussion"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    <MessageSquare className="h-4 w-4 text-emerald-500" />
                    <span>{comments.length} Comments</span>
                  </a>
                </div>

                {/* Right Side: Save and Share */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      saved ? "bg-emerald-600 text-white" : "border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                    <span>{saved ? "Saved" : "Save"}</span>
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

            </div>

            {/* ── ARTICLE CONTENT BODY ── */}
            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-5 text-gray-800 dark:text-gray-200">
              <h2 className="font-display text-xl font-bold text-gray-950 dark:text-white pt-2">
                The Silicon Corridor Strategy
              </h2>

              <p>
                Government initiatives under the sovereign $10 Billion Semiconductor Mission have reached a major milestone as high-precision lithography and OSAT (Outsourced Semiconductor Assembly and Test) equipment passed customs clearance at Chennai Port and Mundra Port.
              </p>

              <p>
                The strategic alignment between domestic OSAT fabricators and international equipment suppliers in Taiwan and Japan is projected to cut container holding latency by 48 hours, clearing the path for pilot wafer packaging trials by Q4 2026.
              </p>

              {/* Callout Stat Scorecards (2 Columns) */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl text-center space-y-1 shadow-xs">
                  <div className="font-display text-3xl font-bold text-blue-600">99.9%</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Yield Benchmark Target</div>
                </div>
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl text-center space-y-1 shadow-xs">
                  <div className="font-display text-3xl font-bold text-emerald-500">35%</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Export Growth YoY</div>
                </div>
              </div>

              {/* Key Takeaways Bullet List */}
              <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" /> Key Takeaways for Sourcing & Trade Leads
                </h3>
                <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>12 OSAT packaging facilities approved</strong> under Phase-2 Fab Subsidies with direct Ministry clearance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Mundra & Chennai Ports establish 48-hr fast-track customs clearance</strong> for green-channel electronics shipments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Bilateral technology transfer agreements signed</strong> with Japan & Taiwan hardware trade corridors.</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Rate / Value Widget */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Rate this article's value to business:</span>
                  <span className="text-[9px] text-gray-400">Anonymous feedback</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["High", "Medium", "Neutral", "Low"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setRatedOption(opt)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        ratedOption === opt
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "border-gray-200 dark:border-gray-800 hover:border-blue-500 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pro AI Executive Digest Box */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-5 rounded-2xl border border-blue-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Sparkles className="h-4 w-4" /> Pro Executive Digest
                </div>
                <p className="text-xs text-blue-100 leading-relaxed font-normal">
                  Key macroeconomic takeaways for exporters and investors: Hardware tariffs reduced by 12% under revised CEPA trade amendments. Domestic OSAT capacity is projected to fulfill 40% of local automotive chip demand by 2027.
                </p>
              </div>

              {/* Author Bio Box */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={ARTICLE_DATA.author.avatar}
                    alt={ARTICLE_DATA.author.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-blue-500 shrink-0"
                  />
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{ARTICLE_DATA.author.name}</h4>
                    <p className="text-[10px] text-blue-600 font-bold">{ARTICLE_DATA.author.role}</p>
                    <p className="text-xs text-gray-500 leading-snug">{ARTICLE_DATA.author.bio}</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0 transition-colors">
                  + Follow Author
                </button>
              </div>

            </div>

            {/* ── DISCUSSION & COMMENTS SECTION ── */}
            <div id="discussion" className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">
                  Discussion ({comments.length})
                </h3>
                <span className="text-[10px] text-gray-400">Sort by: Most Recent</span>
              </div>

              {/* Comment Input Form */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs space-y-3">
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your technical analysis or business perspective..."
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500 text-gray-900 dark:text-gray-100"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handlePostComment}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Send className="h-3.5 w-3.5" /> Post Comment
                  </button>
                </div>
              </div>

              {/* Comments Thread List */}
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                          {c.author[0]}
                        </div>
                        <span className="font-bold text-xs text-gray-900 dark:text-white">{c.author}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">{c.time}</span>
                    </div>

                    <p className="text-xs text-gray-700 dark:text-gray-300 font-normal leading-relaxed pl-9">
                      {c.text}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pl-9 pt-1">
                      <button className="flex items-center gap-1 hover:text-blue-600 font-bold">
                        <ThumbsUp className="h-3 w-3" /> {c.likes} Upvotes
                      </button>
                      <button className="hover:text-blue-600 font-bold">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT HAND SIDE (RHS SIDEBAR: TAXONOMY TAGGING & STAY UPDATED AT BOTTOM)
          ══════════════════════════════════════════════════════════════════ */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* ── TAXONOMY MAPPING SIDEBAR PANELS (ORDERED EXACTLY AS REQUESTED) ── */}

            {/* 1. Sectors Tags */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                  Sectors
                </span>
                <span className="text-[9px] text-gray-400 font-medium">Onboarding Taxonomy</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ARTICLE_DATA.tags.sectors.map((s, idx) => (
                  <Link key={idx} href="/en/poc-v2/sector-news" className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors">
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Industries Tags */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block">
                  Industries
                </span>
                <span className="text-[9px] text-gray-400 font-medium">Onboarding Taxonomy</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ARTICLE_DATA.tags.industries.map((ind, idx) => (
                  <Link key={idx} href="/en/poc-v2/feed/industry" className="bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors">
                    {ind}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Countries Tags */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                  Countries
                </span>
                <span className="text-[9px] text-gray-400 font-medium">Onboarding Taxonomy</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ARTICLE_DATA.tags.countries.map((c, idx) => (
                  <Link key={idx} href="/en/poc-v2/country-news" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors">
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Leaders Tags (No person profile/avatars) */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                  Leaders
                </span>
                <span className="text-[9px] text-gray-400 font-medium">Leadership Taxonomy</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ARTICLE_DATA.tags.leaders.map((l, idx) => (
                  <Link key={idx} href="/en/poc-v2/leader-news" className="bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors">
                    {l}
                  </Link>
                ))}
              </div>
            </div>

            {/* 5. Readers Tags */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                  Readers
                </span>
                <span className="text-[9px] text-gray-400 font-medium">Audience Taxonomy</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ARTICLE_DATA.tags.readers.map((r, idx) => (
                  <Link key={idx} href="/en/poc-v2/my-news" className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors">
                    {r}
                  </Link>
                ))}
              </div>
            </div>

            {/* 6. General Article Tags */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest block">
                  Tags
                </span>
                <span className="text-[9px] text-gray-400 font-medium">Article Keywords</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ARTICLE_DATA.tags.general.map((tag, idx) => (
                  <Link key={idx} href="/en/poc-v2/trending" className="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recommended Premium Intelligence Report */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Intelligence Report</span>
                <Download className="h-4 w-4 text-blue-500" />
              </div>
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">2026 Semiconductor Substrate OSAT Playbook</h5>
                <p className="text-[10px] text-gray-500">Comprehensive supplier maps, tariff analysis, and capacity forecasts.</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-sm text-blue-600">$249</span>
                  <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors">
                    Buy Report
                  </Link>
                </div>
              </div>
            </div>

            {/* ── 7. STAY UPDATED NEWSLETTER BOX (MOVED TO BOTTOM OF RHS SIDEBAR) ── */}
            <div className="bg-gradient-to-br from-[#0c1a2e] to-[#142d52] text-white p-6 rounded-2xl border border-blue-900/60 shadow-lg space-y-4">
              <div className="space-y-1">
                <h3 className="font-display text-base font-bold">Stay Updated!</h3>
                <p className="text-xs text-slate-300 font-normal">Get daily semiconductor & trade news briefings straight to your inbox.</p>
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs outline-none focus:border-blue-400 placeholder:text-slate-400"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs">
                  Subscribe Now
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RELATED INTEL (4-CARD GRID AT BOTTOM OF PAGE)
        ══════════════════════════════════════════════════════════════════ */}
        <section className="pt-12 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">Related Intel</h2>
            <Link href="/en/poc-v2" className="text-xs font-bold text-blue-600 hover:underline">View All News →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {RELATED_INTEL.map((item) => (
              <Link key={item.id} href={`/en/poc-v2/article/${item.id}`} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:border-blue-500 transition-all group block">
                <img src={item.image} alt={item.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4 space-y-2">
                  <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">{item.tag}</span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[9px] text-gray-400 block pt-1">{item.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  User, Search, CheckCircle, Crown, Star, Globe, TrendingUp,
  ChevronRight, ArrowUpRight, Bookmark, Share2, Eye, Award,
  Sparkles, Lock, Mic, BarChart2, Users, Zap, Trophy,
  MessageSquare, Bell, Filter, Play, ChevronLeft, Target,
  MapPin, Briefcase, Shield, Activity
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const FEATURED_LEADERS = [
  {
    id: "fl-1",
    name: "Gautam Adani",
    role: "Chairman",
    company: "Adani Group",
    logo: "AG",
    logoColor: "from-blue-600 to-indigo-700",
    category: "Business Expansion",
    headline: "Gautam Adani Unveils $15B Infrastructure Investment Plan",
    excerpt: "Adani Group to invest in ports, energy and green infrastructure across 12 Indian states, creating 200,000 jobs.",
    date: "May 20, 2025",
    readTime: "5 min",
    tier: "enterprise",
    influence: 98.7,
    followers: "125K"
  },
  {
    id: "fl-2",
    name: "Mukesh Ambani",
    role: "Chairman",
    company: "Reliance Industries",
    logo: "RI",
    logoColor: "from-purple-600 to-violet-700",
    category: "Corporate Update",
    headline: "Mukesh Ambani Highlights Jio's AI-First Strategy for 2025",
    excerpt: "Reliance Jio partners with global AI leaders to accelerate innovation and deploy generative AI for 500M users.",
    date: "May 19, 2025",
    readTime: "4 min",
    tier: "enterprise",
    influence: 98.2,
    followers: "210K"
  },
  {
    id: "fl-3",
    name: "Satya Nadella",
    role: "CEO",
    company: "Microsoft",
    logo: "MS",
    logoColor: "from-teal-500 to-cyan-600",
    category: "Interview",
    headline: "Satya Nadella on the Future of AI and Responsible Innovation",
    excerpt: "Microsoft CEO shares his vision on AI ethics, future of work, and how enterprise software will be reinvented globally.",
    date: "May 18, 2025",
    readTime: "6 min",
    tier: "verified",
    influence: 97.5,
    followers: "185K"
  },
  {
    id: "fl-4",
    name: "Indra Nooyi",
    role: "Former CEO",
    company: "PepsiCo",
    logo: "PC",
    logoColor: "from-rose-500 to-pink-600",
    category: "Achievement",
    headline: "Indra Nooyi Receives Lifetime Achievement Award 2025",
    excerpt: "Recognizing her outstanding contribution to global business and her transformational 12-year tenure as PepsiCo CEO.",
    date: "May 17, 2025",
    readTime: "3 min",
    tier: "verified",
    influence: 95.1,
    followers: "98K"
  }
];

const LATEST_NEWS = [
  { id: "ln-1", leader: "N Chandrasekaran", role: "Chairman, Tata Group", sector: "Technology", time: "2 hrs ago", views: "1.2K", headline: "N Chandrasekaran Appointed Chairman of New Tata Initiative for Global Expansion" },
  { id: "ln-2", leader: "Kiran Mazumdar-Shaw", role: "Founder, Biocon", sector: "Healthcare", time: "3 hrs ago", views: "987", headline: "Kiran Mazumdar-Shaw on Building Innovation-Driven Organizations in Pharma" },
  { id: "ln-3", leader: "Ratan Tata", role: "Trustee, Tata Trusts", sector: "Investment", time: "4 hrs ago", views: "1.5K", headline: "Ratan Tata Trusts Invest in 100 Startups Across India to Boost Deep-Tech" },
  { id: "ln-4", leader: "Sundar Pichai", role: "CEO, Google", sector: "Technology", time: "5 hrs ago", views: "2.3K", headline: "Sundar Pichai Discusses Google's AI Roadmap for 2025 and Global Cloud Push" },
  { id: "ln-5", leader: "Nirmala Sitharaman", role: "Finance Minister, India", sector: "Policy", time: "6 hrs ago", views: "1.8K", headline: "Finance Minister Previews Union Budget 2025-26 Infrastructure Priorities" },
  { id: "ln-6", leader: "Arvind Krishna", role: "CEO, IBM", sector: "Technology", time: "8 hrs ago", views: "1.1K", headline: "Arvind Krishna Signals IBM's Hybrid Cloud Expansion Strategy for APAC" }
];

const SPOTLIGHT_LEADERS = [
  { name: "Gautam Adani", role: "Chairman", company: "Adani Group", initial: "GA", color: "from-blue-600 to-indigo-700", influence: 98.7, followers: "125K", verified: true, tier: "enterprise" },
  { name: "Mukesh Ambani", role: "Chairman", company: "Reliance Ind.", initial: "MA", color: "from-purple-600 to-violet-700", influence: 98.2, followers: "210K", verified: true, tier: "enterprise" },
  { name: "Satya Nadella", role: "CEO", company: "Microsoft", initial: "SN", color: "from-teal-500 to-cyan-600", influence: 97.5, followers: "185K", verified: true, tier: "verified" },
  { name: "Sundar Pichai", role: "CEO", company: "Google", initial: "SP", color: "from-amber-500 to-orange-600", influence: 96.8, followers: "162K", verified: true, tier: "verified" },
  { name: "Kiran Mazumdar-Shaw", role: "Founder", company: "Biocon", initial: "KM", color: "from-rose-500 to-pink-600", influence: 95.1, followers: "98K", verified: true, tier: "verified" }
];

const INTELLIGENCE_MODULES = [
  { title: "Top Leaders Reports", desc: "Weekly / Monthly Top Leader Reports", icon: Trophy, locked: false, badge: "Free" },
  { title: "Executive Rankings", desc: "Global & Sector-wise Rankings", icon: BarChart2, locked: true, badge: "Pro" },
  { title: "AI Leadership Insights", desc: "AI-powered Leadership Intelligence", icon: Sparkles, locked: true, badge: "Pro" },
  { title: "Executive AMA Archive", desc: "Access Past Panels & AMAs", icon: MessageSquare, locked: false, badge: "Free" },
  { title: "Leadership Analytics", desc: "Influence Metrics, Comparisons", icon: Activity, locked: true, badge: "Enterprise" },
  { title: "Saved Alerts", desc: "Custom Alerts & Notifications", icon: Bell, locked: true, badge: "Pro" }
];

const INDUSTRIES = [
  { name: "Technology", icon: "💻", count: "2,400 leaders" },
  { name: "Healthcare", icon: "🏥", count: "1,840 leaders" },
  { name: "Manufacturing", icon: "⚙️", count: "1,620 leaders" },
  { name: "Finance", icon: "🏦", count: "2,100 leaders" },
  { name: "Energy", icon: "⚡", count: "980 leaders" },
  { name: "Logistics", icon: "🚢", count: "750 leaders" },
  { name: "Retail", icon: "🛒", count: "1,200 leaders" },
  { name: "Agriculture", icon: "🌾", count: "640 leaders" },
  { name: "Real Estate", icon: "🏢", count: "920 leaders" },
  { name: "Automotive", icon: "🚗", count: "870 leaders" }
];

const TOP_LEADERS = [
  { rank: 1, name: "Gautam Adani", company: "Adani Group", score: 98.7, initial: "GA", color: "from-blue-600 to-indigo-700" },
  { rank: 2, name: "Mukesh Ambani", company: "Reliance Industries", score: 98.2, initial: "MA", color: "from-purple-600 to-violet-700" },
  { rank: 3, name: "Satya Nadella", company: "Microsoft", score: 97.5, initial: "SN", color: "from-teal-500 to-cyan-600" },
  { rank: 4, name: "Sundar Pichai", company: "Google", score: 96.8, initial: "SP", color: "from-amber-500 to-orange-600" },
  { rank: 5, name: "Kiran Mazumdar-Shaw", company: "Biocon", score: 95.1, initial: "KM", color: "from-rose-500 to-pink-600" }
];

const SECTOR_LEADERS = [
  { rank: 1, name: "Satya Nadella", company: "Microsoft", score: 97.5, initial: "SN", color: "from-teal-500 to-cyan-600" },
  { rank: 2, name: "Sundar Pichai", company: "Google", score: 96.8, initial: "SP", color: "from-amber-500 to-orange-600" },
  { rank: 3, name: "Shantanu Narayen", company: "Adobe", score: 93.2, initial: "SHN", color: "from-red-500 to-rose-600" },
  { rank: 4, name: "Arvind Krishna", company: "IBM", score: 92.1, initial: "AK", color: "from-blue-800 to-slate-700" },
  { rank: 5, name: "Nikesh Arora", company: "Palo Alto Networks", score: 91.0, initial: "NA", color: "from-indigo-500 to-blue-600" }
];

const MOST_READ = [
  { headline: "Satya Nadella on the Future of AI", views: "2.3K" },
  { headline: "Mukesh Ambani Highlights Jio's AI Strategy", views: "1.9K" },
  { headline: "Gautam Adani Unveils $15B Plan", views: "1.6K" },
  { headline: "Ratan Tata Trusts Invest in Startups", views: "1.6K" },
  { headline: "Indra Nooyi Receives Award 2024", views: "1.3K" }
];

const APPOINTMENTS = [
  {
    type: "appointment",
    name: "Priya Nair",
    oldRole: "CMO, Hindustan Unilever",
    newRole: "CEO, HSBC India",
    company: "HSBC India",
    date: "Aug 5, 2026",
    badge: "NEW",
    color: "emerald"
  },
  {
    type: "promotion",
    name: "Nitin Paranjpe",
    oldRole: "COO, Unilever Global",
    newRole: "President & CEO, Unilever Global",
    company: "Unilever",
    date: "Aug 4, 2026",
    badge: "PROMOTED",
    color: "blue"
  },
  {
    type: "appointment",
    name: "Leena Nair",
    oldRole: "CHRO, Unilever",
    newRole: "Global CEO, Chanel",
    company: "Chanel",
    date: "Aug 3, 2026",
    badge: "NEW",
    color: "emerald"
  },
  {
    type: "resignation",
    name: "Sanjay Mehrotra",
    oldRole: "CEO, Micron Technology",
    newRole: "Independent Board Advisor",
    company: "Micron Technology",
    date: "Aug 2, 2026",
    badge: "STEPPING DOWN",
    color: "amber"
  },
  {
    type: "appointment",
    name: "Punit Renjen",
    oldRole: "Global CEO, Deloitte",
    newRole: "Chairman, Deloitte India Board",
    company: "Deloitte India",
    date: "Aug 1, 2026",
    badge: "APPOINTED",
    color: "blue"
  },
  {
    type: "promotion",
    name: "Anand Mahindra",
    oldRole: "MD & CEO, Mahindra Group",
    newRole: "Executive Chairman, Mahindra Group",
    company: "Mahindra Group",
    date: "Jul 30, 2026",
    badge: "PROMOTED",
    color: "blue"
  }
];

const QUOTE_OF_DAY = {
  quote: "India will not just be the world's largest economy — it will be the most sustainable one. That is the commitment we must make today.",
  leader: "Mukesh Ambani",
  role: "Chairman & MD",
  company: "Reliance Industries",
  initial: "MA",
  color: "from-purple-600 to-violet-700",
  date: "Aug 6, 2026"
};

const NEWS_TABS = ["Latest", "Trending", "Most Read", "Interviews", "Appointments"];

const FEATURED_LEADER_STORY = {
  id: "fls-1",
  leader: "Gautam Adani",
  role: "Chairman",
  company: "Adani Group",
  date: "Updated 15 mins ago",
  headline: "Gautam Adani Unveils $15 Billion Infrastructure Expansion Blueprint",
  summary: "Adani Group commits to a massive capital deployment across maritime ports, high-voltage energy transmission corridors, and green manufacturing clusters in 12 states to power India's industrial export corridors.",
  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&auto=format&fit=crop&q=80",
  metrics: [
    { label: "Capital Outlay", value: "$15 Billion", color: "text-amber-400" },
    { label: "New Employment", value: "200,000 Jobs", color: "text-emerald-400" },
    { label: "Sectors Impacted", value: "Infrastructure", color: "text-blue-400" }
  ]
};

const TIER_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  enterprise: { label: "Enterprise", bg: "bg-gradient-to-r from-amber-400 to-orange-500", text: "text-gray-950" },
  verified: { label: "Verified", bg: "bg-emerald-500", text: "text-white" },
  registered: { label: "Free", bg: "bg-blue-500", text: "text-white" }
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function NewsPOCLeaderNewsHome() {
  const [activeNewsTab, setActiveNewsTab] = useState("Latest");
  const [activeSectorTab, setActiveSectorTab] = useState("Technology");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [followedLeaders, setFollowedLeaders] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const tierPath = "/en/poc-v2/leader-news";

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* ── TOP SEARCH & TICKER STRIP ── */}
      <section className="bg-gradient-to-br from-[#0c1931] via-[#0f2444] to-[#0a1628] text-white pt-10 pb-6 border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-purple-400" />
              <h1 className="font-display text-2xl font-bold tracking-tight">Leader News Hub</h1>
              <span className="bg-purple-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ml-1">L</span>
            </div>
            
            {/* Search bar */}
            <div className="flex gap-2 w-full md:max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leaders, executives, companies..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-slate-400 outline-none focus:border-purple-400 transition-colors"
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all">
                Search
              </button>
            </div>
          </div>

          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 justify-start items-center">
            <span className="text-[10px] text-slate-450 uppercase tracking-wider font-semibold mr-2">Quick filters:</span>
            {["All Sectors", "CEOs", "Founders", "Tech Leaders", "Policy Makers", "Appointments"].map((chip) => (
              <button key={chip} className="bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[9px] font-bold px-2.5 py-1 rounded-full transition-all">
                {chip}
              </button>
            ))}
          </div>

          {/* Live news updates ticker */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md flex items-center gap-3">
            <div className="bg-red-600 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 animate-pulse">
              <span className="h-1 w-1 bg-white rounded-full" />
              LIVE UPDATE
            </div>
            <div className="flex-1 overflow-hidden h-5 relative">
              <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap text-[11px] text-slate-200 font-semibold gap-8">
                {[...LATEST_NEWS, ...LATEST_NEWS].map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2">
                    <strong className="text-purple-400 font-bold">{item.leader}:</strong> {item.headline}
                    <span className="text-slate-400 text-[9px]">({item.time})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED LEADER STORY (Hero Card style) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-[#0c1931] text-white min-h-[380px] flex flex-col justify-end p-8 border border-slate-800 shadow-sm group">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-65 group-hover:scale-102 transition-transform duration-300"
            style={{ backgroundImage: `url(${FEATURED_LEADER_STORY.image})` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                FEATURED LEADER STORY
              </span>
              <span className="text-[10px] text-slate-300 font-semibold">
                {FEATURED_LEADER_STORY.leader} · {FEATURED_LEADER_STORY.date}
              </span>
            </div>

            <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight text-white group-hover:text-purple-300 transition-colors">
              {FEATURED_LEADER_STORY.headline}
            </h2>
            
            <p className="text-slate-300 text-xs md:text-sm font-normal max-w-3xl leading-relaxed">
              {FEATURED_LEADER_STORY.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
              {FEATURED_LEADER_STORY.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="block text-[8px] text-gray-400 uppercase">{m.label}</span>
                  <span className={`text-sm font-bold ${m.color}`}>{m.value}</span>
                </div>
              ))}
              <div className="ml-auto">
                <Link href={`/en/poc-v2/article/${FEATURED_LEADER_STORY.id}`} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-[10px]">
                  READ FULL BRIEFING <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── LATEST LEADER NEWS FEED (Full Width, 2 Columns for Featured & Stream) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs p-6 space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-855 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-600 animate-ping" />
              <h3 className="font-display text-lg md:text-xl lg:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Latest & Trending Leader News</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
                {["Latest", "Trending", "Appointments"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveNewsTab(tab)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                      activeNewsTab === tab ? "bg-white dark:bg-gray-800 text-purple-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <Link href="/eoi" className="text-xs font-bold text-purple-500 hover:underline uppercase shrink-0">View All</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left featured column (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col gap-4 group cursor-pointer">
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-gray-200 dark:border-gray-800 relative shadow-sm shrink-0">
                <img 
                  src={activeNewsTab === "Latest" 
                    ? "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60"
                    : "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60"
                  } 
                  alt="News thumbnail" 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {activeNewsTab === "Latest" ? "EXCLUSIVE INTERVIEW" : "TRENDING"}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-extrabold text-[10px] md:text-xs px-2.5 py-0.5 rounded border border-purple-100 dark:border-purple-900/30 uppercase">
                    {activeNewsTab === "Latest" ? "Tata Group" : "Biocon India"}
                  </span>
                  <span className="text-xs text-slate-450 font-semibold">• {activeNewsTab === "Latest" ? "2 hrs ago" : "Trending #1"}</span>
                </div>
                <h4 className="font-display text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-purple-500 transition-colors">
                  {activeNewsTab === "Latest" 
                    ? "N Chandrasekaran outlines Tata Group's global multi-sector green strategy for 2026."
                    : "Kiran Mazumdar-Shaw receives Global Entrepreneurship excellence award in London."
                  }
                </h4>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
                  {activeNewsTab === "Latest"
                    ? "In a major leadership briefing, Tata Group Chairman N Chandrasekaran details the conglomerate's roadmap to integrate zero-emission supply chains across automotive, aerospace, and energy verticals."
                    : "The prestigious title recognizes Kiran Mazumdar-Shaw's outstanding lifetime work in building Biocon into a world-leader in biological medicine and affordable biosimilars."
                  }
                </p>
                {/* Share buttons on featured leader card */}
                <div className="flex items-center gap-3 pt-1 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Share:</span>
                  <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold px-2.5 py-1 rounded-md transition-colors">🔗 LinkedIn</button>
                  <button className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-md transition-colors">𝕏 Twitter</button>
                  <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-md transition-colors">💬 WhatsApp</button>
                  <button className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-[9px] font-bold px-2.5 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">📋 Copy</button>
                </div>
              </div>
            </div>

            {/* Right stream list (col-span-6) */}
            <div className="lg:col-span-6 divide-y divide-gray-100 dark:divide-gray-800 space-y-4 lg:pl-4">
              {LATEST_NEWS.map((item, idx) => (
                <div key={idx} className={`hover:bg-gray-55 dark:hover:bg-gray-955 transition-colors group p-4 rounded-xl cursor-pointer ${idx > 0 ? "pt-4" : ""}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="font-bold text-xs md:text-sm text-gray-900 dark:text-white">{item.leader}</span>
                    <span className="bg-purple-50 dark:bg-purple-950/20 text-purple-600 text-[8px] font-bold px-2 py-0.5 rounded">{item.sector}</span>
                    <span className="text-[10px] text-gray-400 ml-auto font-semibold">{item.time}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-snug font-semibold group-hover:text-purple-500 transition-colors">{item.headline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── APPOINTMENTS & EXECUTIVE MOVEMENTS ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-gray-100 dark:border-gray-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                <h3 className="font-display text-base md:text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Appointments &amp; Executive Movements</h3>
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5 ml-4">Latest leadership changes across top companies — updated daily</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {["All", "New", "Promoted", "Resigned"].map((t) => (
                  <button key={t} className="px-2.5 py-1 text-[9px] font-bold rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">{t}</button>
                ))}
              </div>
              <Link href="/eoi" className="text-[10px] font-bold text-purple-500 hover:underline uppercase flex items-center gap-0.5">View All <ChevronRight className="h-3 w-3" /></Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {APPOINTMENTS.map((appt, idx) => {
              const colorMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
                emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-900", dot: "bg-emerald-500" },
                blue: { bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-900", dot: "bg-blue-500" },
                amber: { bg: "bg-amber-50 dark:bg-amber-950/20", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-900", dot: "bg-amber-500" },
              };
              const c = colorMap[appt.color];
              return (
                <div key={idx} className={`p-4 border-b border-r border-gray-100 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group cursor-pointer ${idx >= 3 ? "border-b-0" : ""}`}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center font-bold text-white text-xs shrink-0">
                      {appt.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs text-gray-900 dark:text-white truncate">{appt.name}</span>
                        <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ${c.bg} ${c.text} ${c.border} border`}>{appt.badge}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
                        <span className="line-through">{appt.oldRole}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-gray-700 dark:text-gray-200">
                        <span className={`h-1.5 w-1.5 rounded-full ${c.dot} shrink-0`} />
                        {appt.newRole}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-gray-400">
                          <Link href="/en/poc-v2/company-news" className="hover:text-purple-500 hover:underline">
                            {appt.company}
                          </Link>
                          {" · "}{appt.date}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-purple-500 hover:underline">Share →</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT GRID (Featured Carousel / Spotlights / Intelligence / Rankings) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-12 gap-8">

          {/* ── LEFT MAIN COLUMN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* 1. FEATURED LEADER NEWS — Enterprise Spotlight Carousel (Moved here!) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Featured Leaders Spotlight</h2>
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-955 text-[8px] font-bold px-2 py-0.5 rounded-full">Enterprise Spotlight</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => scroll("left")} className="p-1 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer" aria-label="Previous slide">
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                  <button onClick={() => scroll("right")} className="p-1 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer" aria-label="Next slide">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase ml-2">View All</Link>
                </div>
              </div>

              <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {FEATURED_LEADERS.map((leader) => {
                  const badge = TIER_BADGE[leader.tier];
                  return (
                    <div 
                      key={leader.id} 
                      className="w-full md:w-[calc(50%-12px)] shrink-0 snap-start bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className={`h-28 bg-gradient-to-br ${leader.logoColor} relative flex items-center justify-center`}>
                        <div className="h-12 w-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-display text-base font-bold text-white shadow-sm">
                          {leader.logo}
                        </div>
                        <div className={`absolute top-2 left-2 ${badge.bg} ${badge.text} text-[7px] font-bold px-1.5 py-0.5 rounded`}>
                          {badge.label}
                        </div>
                        <div className="absolute top-2 right-2 bg-black/30 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                          {leader.category}
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div>
                          <span className="font-bold text-[10px] text-gray-900 dark:text-white block">{leader.name}</span>
                          <span className="text-[9px] text-gray-450">{leader.role} · {leader.company}</span>
                        </div>
                        <h3 className="text-xs font-bold text-gray-955 dark:text-white leading-snug group-hover:text-purple-500 transition-colors">{leader.headline}</h3>
                        <p className="text-[10px] text-gray-550 leading-relaxed font-normal line-clamp-2">{leader.excerpt}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. LEADER SPOTLIGHT */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Leader Spotlight</h2>
                  <span className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 text-[8px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">Verified Leaders</span>
                </div>
                <Link href="/eoi" className="text-[10px] font-bold text-purple-500 hover:underline uppercase">View All</Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {SPOTLIGHT_LEADERS.map((leader, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:shadow-md hover:border-purple-300 dark:hover:border-purple-900 transition-all group space-y-2">
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${leader.color} flex items-center justify-center font-bold text-white text-sm mx-auto relative`}>
                      {leader.initial}
                      {leader.verified && (
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-[9px] text-gray-900 dark:text-white block leading-tight">{leader.name}</span>
                      <span className="text-[8px] text-gray-450 block">{leader.role}</span>
                      <span className="text-[8px] text-gray-400 block truncate">{leader.company}</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[8px] text-gray-400">Influence Score</div>
                      <div className="font-display font-bold text-sm text-purple-600">{leader.influence}</div>
                      <div className="text-[8px] text-gray-400">{leader.followers} Followers</div>
                    </div>
                    <Link href="/eoi" className="w-full bg-purple-600 hover:bg-purple-700 text-white text-[8px] font-bold py-1.5 rounded-lg block transition-colors">
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. LEADERSHIP INTELLIGENCE MODULES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Leadership Intelligence</h2>
                <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1"><Sparkles className="h-3 w-3 text-amber-500" /> Powered by IGEN AI</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {INTELLIGENCE_MODULES.map((mod, idx) => {
                  const ModIcon = mod.icon;
                  return (
                    <div key={idx} className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl hover:shadow-sm transition-all group relative overflow-hidden ${mod.locked ? "opacity-80" : ""}`}>
                      {mod.locked && (
                        <div className="absolute top-3 right-3">
                          <Lock className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                      )}
                      <ModIcon className={`h-6 w-6 mb-3 ${mod.locked ? "text-gray-400" : "text-purple-500"}`} />
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">{mod.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 font-normal">{mod.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${mod.badge === "Free" ? "bg-blue-50 text-blue-600" : mod.badge === "Enterprise" ? "bg-amber-50 text-amber-600" : "bg-purple-50 text-purple-600"}`}>
                          {mod.badge}
                        </span>
                        {mod.locked ? (
                          <Link href="/eoi" className="text-[8px] font-bold text-purple-500 hover:underline">Upgrade →</Link>
                        ) : (
                          <Link href="/eoi" className="text-[8px] font-bold text-blue-500 hover:underline">Access →</Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6. BROWSE BY INDUSTRY */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Browse Leader News by Industry</h2>
                <Link href="/eoi" className="text-[10px] font-bold text-purple-500 hover:underline uppercase">View All Industries</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {INDUSTRIES.map((ind, idx) => (
                  <Link key={idx} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3 rounded-xl text-center hover:shadow-sm hover:border-purple-300 dark:hover:border-purple-900 transition-all group">
                    <span className="text-2xl block mb-1">{ind.icon}</span>
                    <span className="font-bold text-[10px] text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors block">{ind.name}</span>
                    <span className="text-[8px] text-gray-400 block mt-0.5">{ind.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 7. LEADER RANKINGS TABLE (3-column: Top, Sector, Most Read) */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Leader Rankings & Top Lists</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Top Influential */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-indigo-600 text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                    <span>Top Influential Leaders</span>
                    <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
                  </div>
                  <div className="divide-y divide-gray-50 dark:divide-gray-850">
                    {TOP_LEADERS.map((l) => (
                      <div key={l.rank} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                        <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-4 shrink-0 text-center">{l.rank}</span>
                        <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{l.initial}</div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{l.name}</span>
                          <span className="text-[8px] text-gray-450 block truncate">{l.company}</span>
                        </div>
                        <span className="font-display text-xs font-bold text-purple-600 shrink-0">{l.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top by Sector */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-emerald-600 text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                    <span>Top Leaders by Sector</span>
                    <select className="bg-transparent text-white text-[9px] outline-none" value={activeSectorTab} onChange={(e) => setActiveSectorTab(e.target.value)}>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Energy</option>
                    </select>
                  </div>
                  <div className="divide-y divide-gray-50 dark:divide-gray-850">
                    {SECTOR_LEADERS.map((l) => (
                      <div key={l.rank} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                        <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-4 shrink-0 text-center">{l.rank}</span>
                        <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{l.initial}</div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{l.name}</span>
                          <span className="text-[8px] text-gray-450 block truncate">{l.company}</span>
                        </div>
                        <span className="font-display text-xs font-bold text-emerald-600 shrink-0">{l.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Most Read */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-amber-500 text-gray-950 px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                    <span>Most Read Stories</span>
                    <Link href="/eoi" className="text-[9px] opacity-70 hover:opacity-100">View All</Link>
                  </div>
                  <div className="divide-y divide-gray-50 dark:divide-gray-850">
                    {MOST_READ.map((s, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                        <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-4 shrink-0 text-center mt-0.5">{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[10px] text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors block leading-snug">{s.headline}</span>
                          <span className="text-[9px] text-gray-400 flex items-center gap-0.5 mt-0.5"><Eye className="h-2.5 w-2.5" /> {s.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* 10. AI LEADERSHIP TRENDS (Premium) */}
            <div className="bg-gradient-to-br from-[#0c1931] to-[#162d54] text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider">AI Leadership Trends</h2>
                </div>
                <span className="bg-amber-400 text-gray-950 text-[8px] font-bold px-2 py-0.5 rounded-full">PRO</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Growth Trend", val: "+28%", desc: "Leadership news growth YoY", icon: TrendingUp, color: "text-emerald-400" },
                  { label: "Positive Sentiment", val: "73%", desc: "Positive media coverage", icon: Star, color: "text-amber-400" },
                  { label: "Executive Moves", val: "142", desc: "New appointments this month", icon: ArrowUpRight, color: "text-blue-400" },
                  { label: "Opportunities", val: "38", desc: "AI-flagged investment signals", icon: Target, color: "text-purple-400" }
                ].map((t, idx) => {
                  const TIcon = t.icon;
                  return (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1 text-center">
                      <TIcon className={`h-5 w-5 mx-auto ${t.color}`} />
                      <div className={`font-display text-xl font-bold ${t.color}`}>{t.val}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">{t.label}</div>
                      <div className="text-[9px] text-slate-500 font-normal">{t.desc}</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <Link href="/eoi" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2 rounded-lg transition-all">
                  Unlock AI Insights
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-5 py-2 rounded-lg transition-all">
                  View Sample Report
                </Link>
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Executive Quote of the Day */}
            <div className="bg-gradient-to-br from-[#0c1931] to-[#1a2d5a] text-white border border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-lg leading-none">“”</span>
                <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest">Quote of the Day</span>
                <span className="ml-auto text-[8px] text-slate-500">{QUOTE_OF_DAY.date}</span>
              </div>
              <blockquote className="text-sm font-semibold text-slate-200 leading-relaxed border-l-2 border-amber-400 pl-3 italic">
                &ldquo;{QUOTE_OF_DAY.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${QUOTE_OF_DAY.color} flex items-center justify-center font-bold text-white text-xs shrink-0`}>
                  {QUOTE_OF_DAY.initial}
                </div>
                <div>
                  <span className="font-bold text-[11px] text-white block">{QUOTE_OF_DAY.leader}</span>
                  <span className="text-[9px] text-slate-400">{QUOTE_OF_DAY.role} · {QUOTE_OF_DAY.company}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                <span className="text-[9px] text-slate-500">Share this quote:</span>
                <button className="text-[9px] font-bold text-blue-400 hover:text-blue-300">🔗 LinkedIn</button>
                <button className="text-[9px] font-bold text-sky-400 hover:text-sky-300">𝕏 Twitter</button>
              </div>
            </div>

            {/* Trending Leaders */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Trending Leaders</span>
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TOP_LEADERS.slice(0, 4).map((l, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-4 text-center">{idx + 1}</span>
                    <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[10px] shrink-0`}>{l.initial}</div>
                    <div className="flex-1 min-w-0">
                      <Link href="/en/poc-v2/leader-news" className="font-bold text-[10px] text-gray-900 dark:text-white block truncate hover:text-purple-500 transition-colors">
                        {l.name}
                      </Link>
                      <span className="text-[9px] text-gray-450 truncate block">{l.company}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setFollowedLeaders(prev => prev.includes(l.name) ? prev.filter(n => n !== l.name) : [...prev, l.name]);
                      }}
                      className={`text-[8px] font-bold px-2 py-1 rounded transition-all shrink-0 ${
                        followedLeaders.includes(l.name)
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-450 border border-emerald-250 dark:border-emerald-900"
                          : "text-purple-500 border border-purple-200 dark:border-purple-900 hover:bg-purple-50"
                      }`}
                    >
                      {followedLeaders.includes(l.name) ? "Following" : "Follow"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-purple-500" />
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">Leadership Intelligence Digest</h4>
              </div>
              <p className="text-[10px] text-gray-500 font-normal leading-relaxed">
                Top executive moves, AI trend reports, and sector rankings — delivered to 80K+ professionals every morning.
              </p>
              {subscribed ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-700 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center flex items-center gap-2 justify-center">
                  <CheckCircle className="h-3.5 w-3.5" /> Subscribed!
                </div>
              ) : (
                <div className="space-y-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="work@company.com" className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-955 outline-none focus:border-purple-500" />
                  <button onClick={() => { if (email) setSubscribed(true); }} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2 rounded-lg transition-colors">
                    Subscribe Free
                  </button>
                </div>
              )}
            </div>

            {/* Simplified upgrade teaser (Moved to bottom) */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-wider">Unlock Leader Pro Access</span>
              </div>
              <ul className="space-y-1.5 text-[10px] text-gray-600 dark:text-gray-400">
                {[
                  "Real-Time Executive Movements Tracker",
                  "Board Vacancy & Direct Sourcing Alerts",
                  "Sector-Wise Influence Analytics"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/eoi" className="block text-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-955 font-bold text-xs py-2.5 rounded-lg transition-colors">
                Learn More →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          12. UPGRADE BANNER — Primary Revenue Section
      ══════════════════════════════════════════════════════════════════ */}
      {/* Bottom upgrade banner removed — one conversion CTA is sufficient */}

    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  GraduationCap, Search, CheckCircle, Crown, Star, Globe, TrendingUp,
  ChevronRight, ArrowUpRight, Bookmark, Share2, Eye, Award,
  Sparkles, Lock, Mic, BarChart2, Users, Zap, Trophy,
  MessageSquare, Bell, Filter, Play, ChevronLeft, Target,
  MapPin, Briefcase, Shield, Activity, Calendar, Download, ThumbsUp
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const FEATURED_EXPERT_ARTICLES = [
  {
    id: "fea-1",
    author: "Dr. Aris Thorne",
    designation: "Chief AI Strategist & SME",
    company: "NeuralCognition Labs",
    logo: "AT",
    logoColor: "from-blue-600 to-indigo-700",
    category: "AI & Cyber Security",
    headline: "Architecting Enterprise AI Sovereign Models for Cross-Border Logistics",
    excerpt: "Detailed breakdown of decentralized LLM pipelines reducing latency by 40% while preserving strict GDPR and GoI digital compliance.",
    date: "May 20, 2025",
    readTime: "6 min read",
    tier: "verified",
    rating: 4.9,
    consultationRate: "$150/hr",
    type: "SME"
  },
  {
    id: "fea-2",
    author: "Prof. Sunita Reddy",
    designation: "Senior Biotech Advisory Board Member",
    company: "Viksit Life Sciences",
    logo: "SR",
    logoColor: "from-emerald-600 to-teal-700",
    category: "Biotechnology & Ayush",
    headline: "Standardizing Phytochemical Extracts for Global Export Markets",
    excerpt: "How unified botanical extraction benchmarks are opening $4.2B export corridors across EU and East Asian pharma distributors.",
    date: "May 19, 2025",
    readTime: "5 min read",
    tier: "enterprise",
    rating: 5.0,
    consultationRate: "$220/hr",
    type: "SME"
  },
  {
    id: "fea-3",
    author: "Vikramaditya Sen",
    designation: "Associate Energy Transition Analyst (ASME)",
    company: "CleanGrid Dynamics",
    logo: "VS",
    logoColor: "from-amber-500 to-orange-600",
    category: "New & Renewable Energy",
    headline: "Green Hydrogen Tariff Arbitrage: Offshore Wind vs. Solar Electrolysers",
    excerpt: "Comparative modeling of levelized cost of hydrogen (LCOH) across Gujarat maritime hubs and Middle East shipping lanes.",
    date: "May 18, 2025",
    readTime: "7 min read",
    tier: "registered",
    rating: 4.8,
    consultationRate: "$90/hr",
    type: "ASME"
  },
  {
    id: "fea-4",
    author: "Meera Deshmukh",
    designation: "Supply Chain & Trade Compliance SME",
    company: "Global Trade Policy Forum",
    logo: "MD",
    logoColor: "from-purple-600 to-pink-600",
    category: "Logistics & Supply Chain",
    headline: "Mitigating Red Sea Bottlenecks Through Multimodal Rail-Port Corridors",
    excerpt: "Strategic analysis of IMEC trade routes reducing transit times from Mundra Port to European entry points by 12 days.",
    date: "May 17, 2025",
    readTime: "4 min read",
    tier: "verified",
    rating: 4.9,
    consultationRate: "$180/hr",
    type: "SME"
  }
];

const LATEST_EXPERT_ARTICLES = [
  { id: "lea-1", expert: "Dr. Rajesh Kaushik", role: "Semiconductor OSAT SME", sector: "Semiconductors", time: "1 hr ago", views: "1.4K", headline: "Advanced Chiplet Packaging: Localizing Substrate Supply Chains in India", type: "SME" },
  { id: "lea-2", expert: "Ananya Roy", role: "FinTech Compliance ASME", sector: "FinTech & Payments", time: "3 hrs ago", views: "920", headline: "Cross-Border UPI Integration: Regulatory Playbook for ASEAN Expansion", type: "ASME" },
  { id: "lea-3", expert: "Dr. Marcus Vance", role: "Agritech Systems SME", sector: "Agriculture", time: "4 hrs ago", views: "1.8K", headline: "Precision Irrigation & Drone Sprayers: Yield Scaling in Semi-Arid Zones", type: "SME" },
  { id: "lea-4", expert: "Priya Nair", role: "Defense Avionics ASME", sector: "Defence & Aerospace", time: "5 hrs ago", views: "2.1K", headline: "Autonomous Flight Protocols & Sensor Fusion in Next-Gen Unmanned Aerial Vehicles", type: "ASME" },
  { id: "lea-5", expert: "Harish Vardhan", role: "EV Battery Chemistry SME", sector: "Automotive & EV", time: "6 hrs ago", views: "1.5K", headline: "Solid-State vs. LFP Batteries: Commercial Viability Benchmarks for 2026", type: "SME" },
  { id: "lea-6", expert: "Siddharth Mehta", role: "Maritime Customs Policy SME", sector: "Ports & Shipping", time: "7 hrs ago", views: "1.1K", headline: "Digital Customs Clearance Protocols: Automated Cargo Manifest Verification", type: "SME" }
];

const SPOTLIGHT_EXPERTS = [
  { name: "Dr. Aris Thorne", role: "AI & Cyber Security SME", company: "NeuralCognition", initial: "AT", color: "from-blue-600 to-indigo-700", rating: 4.9, reviews: 142, rate: "$150/hr", type: "SME", verified: true },
  { name: "Prof. Sunita Reddy", role: "Biotech Advisory SME", company: "Viksit Life Sciences", initial: "SR", color: "from-emerald-600 to-teal-700", rating: 5.0, reviews: 198, rate: "$220/hr", type: "SME", verified: true },
  { name: "Vikramaditya Sen", role: "Renewable Energy ASME", company: "CleanGrid Dynamics", initial: "VS", color: "from-amber-500 to-orange-600", rating: 4.8, reviews: 76, rate: "$90/hr", type: "ASME", verified: false },
  { name: "Meera Deshmukh", role: "Trade Compliance SME", company: "Global Trade Forum", initial: "MD", color: "from-purple-600 to-pink-600", rating: 4.9, reviews: 115, rate: "$180/hr", type: "SME", verified: true },
  { name: "Rohan Kapoor", role: "FinTech Security ASME", company: "CyberShield Pro", initial: "RK", color: "from-cyan-500 to-blue-600", rating: 4.7, reviews: 62, rate: "$85/hr", type: "ASME", verified: false }
];

const ADVISORY_MODULES = [
  { title: "SME Research Reports", desc: "Peer-reviewed Sector Whitepapers", icon: Download, locked: false, badge: "Free" },
  { title: "1:1 Expert Consultations", desc: "Book Live Video Advisory Sessions", icon: Calendar, locked: false, badge: "Pro" },
  { title: "AI Expert Matching", desc: "Instant AI Match with Verified SMEs", icon: Sparkles, locked: true, badge: "Pro" },
  { title: "Expert AMA Archive", desc: "Fireside Discussions & Q&A Panels", icon: MessageSquare, locked: false, badge: "Free" },
  { title: "Consultation Analytics", desc: "Track Advisory Sessions & ROI", icon: BarChart2, locked: true, badge: "Enterprise" },
  { title: "Custom Expert Briefs", desc: "Order Tailored B2B Market Briefings", icon: Briefcase, locked: true, badge: "Enterprise" }
];

const SECTOR_CATEGORIES = [
  { name: "AI & Cyber Security", icon: "🤖", count: "480 Experts", code: "S02" },
  { name: "Biotechnology & Ayush", icon: "🧬", count: "320 Experts", code: "S06" },
  { name: "Semiconductors & IT", icon: "🔌", count: "510 Experts", code: "S46" },
  { name: "Finance & FinTech", icon: "💳", count: "640 Experts", code: "S42" },
  { name: "Energy & Sustainability", icon: "⚡", count: "410 Experts", code: "S17" },
  { name: "Logistics & Supply Chain", icon: "🚢", count: "390 Experts", code: "S43" },
  { name: "Agriculture & Agritech", icon: "🌾", count: "290 Experts", code: "S01" },
  { name: "Healthcare & Pharma", icon: "🏥", count: "450 Experts", code: "S23" },
  { name: "Defence & Aerospace", icon: "🛡️", count: "210 Experts", code: "S13" },
  { name: "Automotive & EV", icon: "🚗", count: "340 Experts", code: "S45" }
];

const TOP_SMES = [
  { rank: 1, name: "Dr. Aris Thorne", sector: "AI & Cyber Security", rating: 4.9, initial: "AT", color: "from-blue-600 to-indigo-700", bookings: 184 },
  { rank: 2, name: "Prof. Sunita Reddy", sector: "Biotechnology", rating: 5.0, initial: "SR", color: "from-emerald-600 to-teal-700", bookings: 215 },
  { rank: 3, name: "Meera Deshmukh", sector: "Trade Compliance", rating: 4.9, initial: "MD", color: "from-purple-600 to-pink-600", bookings: 142 },
  { rank: 4, name: "Dr. Rajesh Kaushik", sector: "Semiconductors", rating: 4.8, initial: "RK", color: "from-indigo-600 to-blue-800", bookings: 128 },
  { rank: 5, name: "Harish Vardhan", sector: "Automotive & EV", rating: 4.8, initial: "HV", color: "from-amber-500 to-red-600", bookings: 96 }
];

const TOP_ASMES = [
  { rank: 1, name: "Vikramaditya Sen", sector: "Renewable Energy", rating: 4.8, initial: "VS", color: "from-amber-500 to-orange-600", bookings: 88 },
  { rank: 2, name: "Ananya Roy", sector: "FinTech & Payments", rating: 4.7, initial: "AR", color: "from-cyan-500 to-blue-600", bookings: 74 },
  { rank: 3, name: "Priya Nair", sector: "Defence Avionics", rating: 4.8, initial: "PN", color: "from-rose-500 to-pink-600", bookings: 69 },
  { rank: 4, name: "Siddharth Mehta", sector: "Ports & Shipping", rating: 4.6, initial: "SM", color: "from-teal-500 to-emerald-600", bookings: 54 },
  { rank: 5, name: "Kavita Joshi", sector: "Agritech Systems", rating: 4.7, initial: "KJ", color: "from-green-600 to-teal-700", bookings: 61 }
];

const MOST_READ_EXPERT_STORIES = [
  { headline: "Architecting Enterprise AI Sovereign Models for Logistics", views: "3.4K", author: "Dr. Aris Thorne" },
  { headline: "Standardizing Phytochemical Extracts for Global Export Markets", views: "2.8K", author: "Prof. Sunita Reddy" },
  { headline: "Green Hydrogen Tariff Arbitrage: LCOH Modeling", views: "2.1K", author: "Vikramaditya Sen" },
  { headline: "Mitigating Red Sea Bottlenecks via IMEC Corridors", views: "1.9K", author: "Meera Deshmukh" },
  { headline: "Advanced Chiplet Packaging in Domestic OSAT Hubs", views: "1.7K", author: "Dr. Rajesh Kaushik" }
];

const NEWS_TABS = ["Latest", "Trending", "SME Insights", "ASME Research", "Top Rated"];

const TIER_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  enterprise: { label: "Enterprise SME", bg: "bg-gradient-to-r from-purple-600 to-indigo-600", text: "text-white" },
  verified: { label: "Verified SME", bg: "bg-emerald-500", text: "text-white" },
  registered: { label: "Associate (ASME)", bg: "bg-blue-500", text: "text-white" }
};

export default function NewsPOCExpertNewsHome() {
  const [activeNewsTab, setActiveNewsTab] = useState("Latest");
  const [activeExpertTypeTab, setActiveExpertTypeTab] = useState("SME");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [followedExperts, setFollowedExperts] = useState<string[]>([]);
  const [selectedBulletin, setSelectedBulletin] = useState<{ text: string; cat: string; details: string } | null>(null);
  const [bookingExpert, setBookingExpert] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState("2026-08-10");
  const [bookingTime, setBookingTime] = useState("10:00 AM");
  const [bookingQuery, setBookingQuery] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Auto-advance featured carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % FEATURED_EXPERT_ARTICLES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const expertBasePath = "/en/news-poc/expert-news";

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO BANNER — Discovery & Conversion (Expert Hub)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0a1826] via-[#10273f] to-[#071322] text-white overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-10 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
            <div className="flex-1 space-y-6 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">SME & ASME Intelligence Hub (IGN-M07)</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Expert News & Insights
              </h1>
              
              <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed max-w-lg">
                Discover verified Subject Matter Experts (SMEs) and Associate Experts (ASMEs), read deep industry analysis, book 1:1 consultations, and explore expert pages.
              </p>

              {/* Search bar & filter dropdown */}
              <div className="flex gap-2 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search experts, topics, articles..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <select className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-3 text-xs outline-none">
                  <option className="bg-gray-955 text-white">All Sectors</option>
                  <option className="bg-gray-955 text-white">AI & Cyber Security</option>
                  <option className="bg-gray-955 text-white">Biotechnology</option>
                  <option className="bg-gray-955 text-white">Semiconductors</option>
                  <option className="bg-gray-955 text-white">FinTech</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Live Expert Bulletin Feed Ticker */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 w-full lg:w-[400px] backdrop-blur-md shadow-xl shrink-0 space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Advisory Bulletins</span>
                </div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Advisory Updates</span>
              </div>
              <div className="space-y-3.5">
                {[
                  { text: "Dr. K. Raghavan uploaded semiconductor supply chain mapping brief", time: "2 min ago", cat: "Semiconductors" },
                  { text: "SME Pro Group launched consultation slots for Cleantech PLI applications", time: "14 min ago", cat: "Green Energy" },
                  { text: "ASME Defense Advisory released draft aerospace offset guidelines", time: "1 hr ago", cat: "Aerospace" }
                ].map((b, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedBulletin({
                      text: b.text,
                      cat: b.cat,
                      details: `Advisory Brief by certified subject matter expert: "${b.text}". This publication covers industrial compliance standards, capital subsidy applications, and B2B trade policy audits. Click below to retrieve the complete technical guide.`
                    })}
                    className="space-y-1 group/item cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[8px]">
                      <span className="text-blue-400 font-bold uppercase">{b.cat}</span>
                      <span className="text-slate-400">{b.time}</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-200 group-hover/item:text-blue-300 transition-colors leading-relaxed line-clamp-2">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. FEATURED EXPERT BRIEFING (Hero Story)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a1826] to-[#102747] text-white min-h-[360px] flex flex-col justify-end p-8 border border-slate-800 shadow-lg group">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20 group-hover:scale-102 transition-transform duration-300"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80)` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">FEATURED EXPERT BRIEFING</span>
              <span className="text-[10px] text-slate-300 font-semibold">AI &amp; Cyber Security · SME · {FEATURED_EXPERT_ARTICLES[0].date}</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight text-white group-hover:text-blue-300 transition-colors">
              {FEATURED_EXPERT_ARTICLES[0].headline}
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-normal max-w-3xl leading-relaxed">
              {FEATURED_EXPERT_ARTICLES[0].excerpt}
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/10">
              <div>
                <span className="block text-[8px] text-gray-400 uppercase">Author</span>
                <span className="text-sm font-bold text-white">{FEATURED_EXPERT_ARTICLES[0].author}</span>
              </div>
              <div>
                <span className="block text-[8px] text-gray-400 uppercase">Designation</span>
                <span className="text-sm font-bold text-slate-300">{FEATURED_EXPERT_ARTICLES[0].designation}</span>
              </div>
              <div>
                <span className="block text-[8px] text-gray-400 uppercase">Read Time</span>
                <span className="text-sm font-bold text-amber-400">{FEATURED_EXPERT_ARTICLES[0].readTime}</span>
              </div>
              <div className="ml-auto flex items-center gap-2 flex-wrap">
                <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-[10px]">
                  READ FULL BRIEFING <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <button className="flex items-center gap-1 bg-blue-700/60 hover:bg-blue-600 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-md transition-colors">🔗 LinkedIn</button>
                <button className="flex items-center gap-1 bg-sky-600/60 hover:bg-sky-500 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-md transition-colors">𝕏 Twitter</button>
                <button className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-md transition-colors">📋 Copy</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submenu Quick Navigation Strip */}
      <div className="relative z-10 border-y border-gray-200 dark:border-gray-800 bg-white/5 py-4 my-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-1 flex flex-wrap gap-2 items-center justify-between">
          <span className="text-[9px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-widest">Submenus:</span>
          <div className="flex gap-2 flex-wrap text-xs">
            {[
              { label: "SME News", href: "/eoi", badge: "Primary" },
              { label: "SME Pages", href: "/eoi", badge: "Directory" },
              { label: "SME By Sector", href: "/eoi", badge: "Sectors" },
              { label: "ASME News", href: "/eoi", badge: "Emerging" },
              { label: "ASME Pages", href: "/eoi", badge: "Profiles" },
              { label: "ASME By Sector", href: "/eoi", badge: "Industries" }
            ].map((sub, idx) => (
              <Link key={idx} href={sub.href} className="bg-white/10 hover:bg-white/20 border border-white/15 text-gray-700 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
                <span>{sub.label}</span>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          3. MAIN CONTENT GRID (Latest News / Spotlight / Advisory / Rankings)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-12 gap-8">

          {/* ── LEFT MAIN COLUMN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* LATEST EXPERT NEWS FEED */}
            <div className="space-y-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-855 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-600 animate-pulse" />
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Latest Expert News Feed</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
                    {NEWS_TABS.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveNewsTab(tab)}
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${activeNewsTab === tab ? "bg-white dark:bg-gray-800 text-blue-600 shadow-xs" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <Link href="/eoi" className="text-xs font-bold text-blue-500 hover:underline uppercase shrink-0">View All</Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                {/* Left featured column (col-span-6) */}
                <div className="lg:col-span-6 flex flex-col gap-4 group cursor-pointer">
                  <div className="w-full h-52 md:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-gray-200 dark:border-gray-850 relative shadow-xs shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60" 
                      alt="Featured expert news" 
                      className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      SME INSIGHT
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-50 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400 font-extrabold text-[9px] px-2.5 py-0.5 rounded border border-blue-100 dark:border-blue-900/30 uppercase">
                        {LATEST_EXPERT_ARTICLES[0].expert}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">• {LATEST_EXPERT_ARTICLES[0].time}</span>
                    </div>
                    <h4 className="font-display text-base font-bold text-gray-950 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                      {LATEST_EXPERT_ARTICLES[0].headline}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
                      Sovereign AI pipelines and enterprise data models are scaling rapidly across logistics hubs. Read the full trade analysis on advanced localization benefits and GoI regulatory framework compliance.
                    </p>
                    
                    {/* Share row */}
                    <div className="flex items-center gap-2 pt-2.5 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Share:</span>
                      <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md transition-colors">🔗 LinkedIn</button>
                      <button className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md transition-colors">𝕏 Twitter</button>
                      <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md transition-colors">💬 WhatsApp</button>
                      <button className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-405 text-[9px] font-bold px-2.5 py-0.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">📋 Copy</button>
                    </div>
                  </div>
                </div>

                {/* Right stream list (col-span-6) */}
                <div className="lg:col-span-6 divide-y divide-gray-100 dark:divide-gray-850 space-y-4 lg:pl-4">
                  {LATEST_EXPERT_ARTICLES.slice(1).map((item, idx) => (
                    <div key={item.id} className={`hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group p-3.5 rounded-xl cursor-pointer ${idx > 0 ? "pt-4" : ""}`}>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-[10px] text-gray-950 dark:text-white flex items-center gap-1 truncate">
                            {item.expert}
                            <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0" />
                          </span>
                          <span className="bg-blue-50 dark:bg-blue-955/30 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{item.type}</span>
                          <span className="text-[9px] text-gray-400">· {item.time}</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                          {item.headline}
                        </h4>
                        <span className="text-[9px] text-gray-400 block truncate">{item.role} · {item.sector}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <Link href="/eoi" className="text-blue-600 font-bold text-xs hover:underline flex items-center gap-1 justify-center">
                  Load More Expert News <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* EXPERT SPOTLIGHT */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Expert Spotlight</h2>
                  <span className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 text-[8px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">Verified Advisory Board</span>
                </div>
                <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All Experts</Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {SPOTLIGHT_EXPERTS.map((expert, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900 transition-all group space-y-2">
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${expert.color} flex items-center justify-center font-bold text-white text-sm mx-auto relative`}>
                      {expert.initial}
                      {expert.verified && (
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-[9px] text-gray-900 dark:text-white block leading-tight">{expert.name}</span>
                      <span className="text-[8px] text-gray-450 block">{expert.role}</span>
                      <span className="text-[8px] text-gray-400 block truncate">{expert.company}</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[8px] text-amber-500 font-bold flex items-center justify-center gap-0.5">
                        <Star className="h-2.5 w-2.5 fill-amber-500" /> {expert.rating} ({expert.reviews})
                      </div>
                      <div className="font-display font-bold text-xs text-emerald-600 dark:text-emerald-400">{expert.rate}</div>
                    </div>
                    <button 
                      onClick={() => {
                        setBookingExpert(expert.name);
                        setBookingSuccess(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[8px] font-bold py-1.5 rounded-lg block transition-colors"
                    >
                      Book Advisory
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPERT OF THE WEEK */}
            <div className="relative bg-gradient-to-r from-[#0a1826] via-[#10273f] to-[#162d54] text-white rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10 p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-500 text-white text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-widest">🏆 Expert of the Week</span>
                  <span className="text-slate-400 text-[10px] font-semibold">Week of Aug 5 – 11, 2026</span>
                  <span className="text-[9px] text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">Editorial Pick</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 border-2 border-blue-400/30 flex items-center justify-center font-display text-lg font-bold text-white shrink-0">AT</div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Dr. Aris Thorne</h2>
                    <p className="text-slate-400 text-xs">Chief AI Strategist &amp; SME · NeuralCognition Labs</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-amber-400 text-[9px] font-bold flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-amber-400" /> 4.9 Rating</span>
                      <span className="text-[9px] text-slate-400">·</span>
                      <span className="text-emerald-400 text-[9px] font-bold">$150/hr</span>
                      <span className="text-[9px] text-slate-400">·</span>
                      <span className="text-blue-400 text-[9px] font-bold">142 consultations</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm font-normal leading-relaxed">
                  <span className="text-blue-300 font-bold">Why in focus this week:</span> Dr. Thorne's paper on decentralized LLM pipelines for cross-border logistics gained 3,400 reads — the most-read expert briefing on IGE this week. His model reduces GDPR compliance overhead by 40% while maintaining cross-border data sovereignty.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-950/50 text-blue-400 border border-blue-900 text-[9px] font-bold px-2.5 py-1 rounded-full">📈 3.4K Reads This Week</span>
                  <span className="bg-emerald-950/50 text-emerald-400 border border-emerald-900 text-[9px] font-bold px-2.5 py-1 rounded-full">✅ Verified SME</span>
                  <span className="bg-purple-950/50 text-purple-400 border border-purple-900 text-[9px] font-bold px-2.5 py-1 rounded-full">🤖 AI &amp; Cyber Security</span>
                </div>
                <div className="flex gap-3">
                  <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5">Read Briefing <ChevronRight className="h-3.5 w-3.5" /></Link>
                  <button 
                    onClick={() => {
                      setBookingExpert("Dr. Aris Thorne");
                      setBookingSuccess(false);
                    }}
                    className="border border-white/20 text-white hover:bg-white/10 font-bold text-xs px-4 py-2.5 rounded-lg transition-all"
                  >
                    Book Advisory →
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Expert Advisory & Intelligence Services</h2>
                <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1"><Sparkles className="h-3 w-3 text-amber-500" /> Powered by IGEN AI</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ADVISORY_MODULES.map((mod, idx) => {
                  const ModIcon = mod.icon;
                  return (
                    <div key={idx} className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl hover:shadow-sm transition-all group relative overflow-hidden ${mod.locked ? "opacity-80" : ""}`}>
                      {mod.locked && (
                        <div className="absolute top-3 right-3">
                          <Lock className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                      )}
                      <ModIcon className={`h-6 w-6 mb-3 ${mod.locked ? "text-gray-400" : "text-blue-600"}`} />
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">{mod.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 font-normal">{mod.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${mod.badge === "Free" ? "bg-blue-50 text-blue-600" : mod.badge === "Enterprise" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                          {mod.badge}
                        </span>
                        {mod.locked ? (
                          <Link href="/eoi" className="text-[8px] font-bold text-blue-500 hover:underline">Upgrade →</Link>
                        ) : (
                          <Link href="/eoi" className="text-[8px] font-bold text-blue-600 hover:underline">Access →</Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BROWSE BY INDUSTRY (SECTOR CARDS) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Browse Experts by Industry Sector</h2>
                <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All 50 Sectors</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {SECTOR_CATEGORIES.map((ind, idx) => (
                  <Link key={idx} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3 rounded-xl text-center hover:shadow-sm hover:border-blue-300 dark:hover:border-blue-900 transition-all group">
                    <span className="text-2xl block mb-1">{ind.icon}</span>
                    <span className="font-bold text-[10px] text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors block truncate">{ind.name}</span>
                    <span className="text-[8px] text-gray-400 block mt-0.5">{ind.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* PROMOTE YOUR EXPERTISE MONETIZATION BANNER */}
            <div className="bg-gradient-to-br from-[#0a1826] to-[#122b47] text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-400" />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider">Promote Your Expertise & Monetize Advisory Services</h2>
                </div>
                <span className="bg-amber-400 text-gray-950 text-[8px] font-bold px-2 py-0.5 rounded-full">SME & ASME PRO</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Verified Expert Profile", desc: "Gain trust with GoI ministry-aligned badge and global directory ranking.", icon: CheckCircle },
                  { title: "Paid Consultations", desc: "Set your hourly rates and receive direct 1:1 video consultation bookings.", icon: Calendar },
                  { title: "Publish Gated Research", desc: "Monetize whitepapers, reports, and expert articles directly to enterprise clients.", icon: Download }
                ].map((b, idx) => {
                  const BIcon = b.icon;
                  return (
                    <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1.5">
                      <BIcon className="h-5 w-5 text-blue-400" />
                      <h4 className="font-bold text-xs text-white">{b.title}</h4>
                      <p className="text-[10px] text-slate-300 font-normal leading-relaxed">{b.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs">
                  Become a Verified SME
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all">
                  View Advisory Pricing Tiers
                </Link>
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Top SMEs Rankings */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 bg-blue-600 text-white flex items-center justify-between font-bold text-xs">
                <span>Top SME Advisory Rankings</span>
                <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TOP_SMES.map((l) => (
                  <div key={l.rank} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <span className="font-display text-sm font-extrabold text-gray-300 dark:text-gray-700 w-4 shrink-0 text-center">{l.rank}</span>
                    <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{l.initial}</div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{l.name}</span>
                      <span className="text-[8px] text-gray-450 block truncate">{l.sector}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-xs font-bold text-amber-500 flex items-center gap-0.5 justify-end">
                        <Star className="h-2.5 w-2.5 fill-amber-500" /> {l.rating}
                      </span>
                      <span className="text-[7px] text-gray-400 block">{l.bookings} bookings</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top ASME Emerging Experts */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 bg-emerald-600 text-white flex items-center justify-between font-bold text-xs">
                <span>Top ASME Emerging Experts</span>
                <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TOP_ASMES.map((l) => (
                  <div key={l.rank} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <span className="font-display text-sm font-extrabold text-gray-300 dark:text-gray-700 w-4 shrink-0 text-center">{l.rank}</span>
                    <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{l.initial}</div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{l.name}</span>
                      <span className="text-[8px] text-gray-450 block truncate">{l.sector}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400">{l.rating}</span>
                      <span className="text-[7px] text-gray-400 block">{l.bookings} bookings</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Read Expert Stories */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-amber-500 text-gray-950 px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                <span>Most Read Expert Briefings</span>
                <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {MOST_READ_EXPERT_STORIES.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                    <span className="font-display text-sm font-extrabold text-gray-300 dark:text-gray-700 w-4 shrink-0 text-center mt-0.5">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors block leading-snug">{s.headline}</span>
                      <span className="text-[9px] text-gray-400 flex items-center gap-0.5 mt-0.5"><Eye className="h-2.5 w-2.5" /> {s.views} · By {s.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Membership Benefits Card at the bottom */}
            <div className="bg-gradient-to-br from-slate-955 to-[#10273f] text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Unlock Advisor Pro Access</span>
              </div>
              <ul className="space-y-1.5 text-[10px] text-slate-300">
                {[
                  "Certified SME 1:1 Consultation Access",
                  "Premium Advisory Audit Report Downloads",
                  "Direct B2B Client Lead Matching"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/eoi" className="block text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs py-2.5 rounded-lg transition-colors">
                Learn More →
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Ticker Bulletin Detail Modal */}
      {selectedBulletin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
              <span className="bg-blue-100 dark:bg-blue-955 text-blue-600 dark:text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                {selectedBulletin.cat}
              </span>
              <button 
                onClick={() => setSelectedBulletin(null)}
                className="text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>
            <h3 className="font-display text-sm font-bold text-gray-955 dark:text-white leading-snug">
              {selectedBulletin.text}
            </h3>
            <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
              {selectedBulletin.details}
            </p>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-855 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[10px] text-amber-500 font-bold flex items-center gap-1">
                <Crown className="h-3.5 w-3.5" /> Subscriber Premium Access
              </span>
              <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">
                Unlock Advisory Accords Data
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Subject Matter Expert Advisory Booking Modal */}
      {bookingExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
              <span className="text-[10px] font-bold text-gray-955 dark:text-white uppercase tracking-wider">
                Book 1:1 Consultation
              </span>
              <button 
                onClick={() => setBookingExpert(null)}
                className="text-gray-400 hover:text-gray-650 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="text-xs font-bold text-gray-955 dark:text-white uppercase">Request Successfully Submitted</h4>
                <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                  Your appointment slot for <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong> with <strong>{bookingExpert}</strong> has been saved. Our trade coordinators will email meeting access keys shortly.
                </p>
                <button 
                  onClick={() => setBookingExpert(null)}
                  className="bg-blue-650 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-lg transition-colors mt-2"
                >
                  Return to Portal
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-850">
                  <span className="text-[8px] text-slate-400 uppercase block font-semibold">Consulting Expert</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white block mt-0.5">{bookingExpert}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Select Date</label>
                    <input 
                      type="date" 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500 font-mono text-gray-955 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Available Time Slots</label>
                    <select 
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full rounded-lg border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-955 dark:text-white"
                    >
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>02:00 PM</option>
                      <option>04:30 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase">Briefly describe your advisory query</label>
                  <textarea 
                    value={bookingQuery}
                    onChange={(e) => setBookingQuery(e.target.value)}
                    placeholder="e.g. Sourcing regulations under India-UAE CEPA or semiconductor custom clearances..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500 font-normal leading-relaxed text-gray-955 dark:text-white"
                  />
                </div>

                <button 
                  onClick={() => setBookingSuccess(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors uppercase tracking-wider"
                >
                  Submit Booking Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

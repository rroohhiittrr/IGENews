"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Newspaper, Clock, ArrowUpRight, TrendingUp, RefreshCw, Lock, 
  ShieldAlert, FileText, ExternalLink, Eye, Share2, Compass, 
  BookOpen, UserCheck, BarChart2, ChevronRight, Play, CheckCircle,
  Sparkles, Bell
} from "lucide-react";

export default function NewsPOCHeadlinesHome() {
  const [activeTab, setActiveTab] = useState<"all" | "markets" | "tech">("all");
  const [tickerOffset, setTickerOffset] = useState(0);
  const [followedLeaders, setFollowedLeaders] = useState<string[]>([]);
  const [followedCorps, setFollowedCorps] = useState<string[]>([]);
  const [policyInput, setPolicyInput] = useState("EU Carbon Tax (CBAM)");
  const [hsCodeInput, setHsCodeInput] = useState("");
  const [exposureResult, setExposureResult] = useState<{ risk: string; score: string; rate: string; text: string } | null>(null);

  // Phase 11 Interactive States
  const [headlineCategory, setHeadlineCategory] = useState<"all" | "critical" | "policy" | "accords">("all");
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [downloadingPacketId, setDownloadingPacketId] = useState<string | null>(null);
  const [activeAlerts, setActiveAlerts] = useState([
    { id: "alt-1", message: "URGENT: Suez Canal shipping delays expected to exceed 48 hrs due to logistics bottleneck.", type: "critical" },
    { id: "alt-2", message: "POLICY WATCH: UAE CEPA tariff reductions now active for selected chemical compounds.", type: "info" }
  ]);

  // Auto scroll breaking news ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerOffset((prev) => (prev - 1) % 600);
    }, 45);
    return () => clearInterval(timer);
  }, []);

  const topHeadlines = {
    all: [
      { num: "01", category: "TECH & SEMI", title: "Apple Accelerates Manufacturing Expansion Across India", desc: "The Cupertino giant is increasing supplier partnerships and production investments as India becomes a strategic export hub for global markets.", readTime: "8 min read", date: "12 mins ago" },
      { num: "02", category: "MARKETS", title: "Global Chipmakers Increase India Investments Following PLI Scheme", desc: "New incentives for semiconductor manufacturing draw multi-billion dollar commitments from leading foundry operators in Taiwan and Europe.", readTime: "6 min read", date: "45 mins ago" },
      { num: "03", category: "RETAIL", title: "Luxury Retail Expansion Surges Across GCC Markets", desc: "High-net-worth consumption patterns drive a 15% increase in flagship boutique openings in Riyadh and Dubai this fiscal quarter.", readTime: "5 min read", date: "1 hour ago" }
    ],
    markets: [
      { num: "01", category: "MARKETS", title: "Global Chipmakers Increase India Investments Following PLI Scheme", desc: "New incentives for semiconductor manufacturing draw commitments from foundry operators in Taiwan and Europe.", readTime: "6 min read", date: "45 mins ago" },
      { num: "02", category: "COMMODITIES", title: "Lithium Price Index Stabilizes After High Supply Volatility", desc: "Bilateral resource corridors secure raw battery mineral flow, lowering EV supply chain risks.", readTime: "7 min read", date: "2 hrs ago" }
    ],
    tech: [
      { num: "01", category: "TECH & SEMI", title: "Apple Accelerates Manufacturing Expansion Across India", desc: "The Cupertino giant is increasing supplier partnerships as India becomes a strategic export hub.", readTime: "8 min read", date: "12 mins ago" },
      { num: "02", category: "AI & CYBER", title: "Cybersecurity Framework Standards Upgraded for Global SaaS Nodes", desc: "New encryption rules implemented across banking interfaces to block cloud infrastructure vulnerabilities.", readTime: "9 min read", date: "3 hrs ago" }
    ]
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Page Title fold */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-blue-500" />
            <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
              Headlines
            </h1>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              className="relative p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              {activeAlerts.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              )}
            </button>
            {showNotificationDrawer && (
              <div className="absolute right-0 top-10 z-30 w-80 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-xl p-4 shadow-xl space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-2">
                  <span className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-wider">Emergency Bulletins</span>
                  <button 
                    onClick={() => setActiveAlerts([])}
                    className="text-[9px] text-blue-500 font-bold hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                {activeAlerts.length === 0 ? (
                  <p className="text-[11px] text-gray-500">No active alerts or shipping notices.</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {activeAlerts.map((alert) => (
                      <div key={alert.id} className="p-2 rounded bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-850 space-y-1.5">
                        <p className="text-[10px] text-gray-700 dark:text-gray-300 leading-normal">{alert.message}</p>
                        <button 
                          onClick={() => setActiveAlerts(prev => prev.filter(a => a.id !== alert.id))}
                          className="text-[8px] text-gray-400 hover:text-gray-600 block text-right w-full font-semibold uppercase"
                        >
                          ✕ Clear
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Second Fold: Hero Cover Story */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
          
          {/* Hero cover image */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] flex flex-col justify-end p-8 group">
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-102 transition-transform duration-300"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=1200&auto=format&fit=crop&q=80')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="relative z-10">
              <span className="bg-amber-400 text-gray-950 text-[10px] font-bold px-3 py-1 rounded-sm tracking-wider uppercase">
                COVER STORY
              </span>
            </div>
          </div>

          {/* Hero text */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold tracking-wider">
                <span className="text-blue-500">GLOBAL ENERGY</span>
                <span>•</span>
                <span>MARCH 24, 2024</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight text-gray-950 dark:text-white">
                The Lithium Cartel
              </h2>
              <p className="text-xs md:text-sm text-gray-650 dark:text-gray-450 leading-relaxed font-normal">
                Inside the secret pact reshaping the global energy transition. How three nations and a handful of conglomerates are quietly consolidating power over the world's most critical mineral.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-bold text-xs uppercase text-blue-500">
                  MT
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-955 dark:text-white block">Marcus Thorne</span>
                  <span className="text-[9px] text-gray-400 block font-semibold uppercase">Senior Investigative Editor</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/en/news-poc/article/sec-1" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-5 py-2.5 rounded transition-all">
                  Read Story
                </Link>
                <button className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-850 transition-colors">
                  <Share2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Fold: Breaking News ticker */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="bg-[#E63946]/5 dark:bg-[#E63946]/10 border border-[#E63946]/20 rounded-xl flex items-center overflow-hidden h-10 shadow-3xs">
          <div className="bg-[#E63946] text-white text-[10px] font-bold px-4 h-full flex items-center tracking-wider shrink-0 select-none uppercase">
            BREAKING
          </div>
          <div className="relative flex-1 overflow-hidden h-full flex items-center">
            <div 
              className="absolute whitespace-nowrap text-xs font-semibold text-red-655 dark:text-red-400 flex gap-12"
              style={{ transform: `translateX(${tickerOffset}px)` }}
            >
              <span>● India finalises new PLI scheme for advanced electronics...</span>
              <span>● EU proposes new carbon border adjustment framework targeting metallurgy...</span>
              <span>● RBI keeps repo rate unchanged with focus on inflation calibration...</span>
              <span>● Brent crude futures dip below $85 as demand concerns persist...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Fold: 4-Grid News Updates Strip */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { tag: "URGENT · 14:22 GMT", title: "IMF revises global growth outlook for 2025: India surges to 7.8%.", isRed: true },
            { tag: "ALERT · 13:50 GMT", title: "Yen stabilizes against USD following suspected BoJ intervention.", isRed: false },
            { tag: "UPDATE · 13:15 GMT", title: "Tech stocks trade sideways ahead of high stakes Q3 earnings.", isRed: false },
            { tag: "UPDATE · 12:45 GMT", title: "Brent crude futures dip below $85 as demand worries persist.", isRed: false }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`p-4 bg-white dark:bg-[#0f172a] border ${
                item.isRed ? "border-red-200 dark:border-red-950/45 bg-red-50/20 dark:bg-red-950/5" : "border-gray-200 dark:border-gray-800"
              } rounded-xl shadow-3xs flex flex-col justify-between`}
            >
              <span className={`text-[9px] font-bold block mb-2 ${item.isRed ? "text-red-550" : "text-gray-400"}`}>
                {item.tag}
              </span>
              <p className="text-xs font-bold leading-relaxed text-gray-900 dark:text-white">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fifth Fold: Top Headlines & Live Updates layout */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Columns: Numbered Top Headlines */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-150 dark:border-gray-855 pb-2">
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                Top Headlines
              </h3>
              <div className="flex bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-250 dark:border-gray-800">
                {(["all", "critical", "policy", "accords"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setHeadlineCategory(cat)}
                    className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all uppercase ${
                      headlineCategory === cat 
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-2xs" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {cat === "all" ? "All News" : cat === "critical" ? "Critical" : cat === "policy" ? "Policies" : "Accords"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {topHeadlines[activeTab]
                .filter((story) => {
                  if (headlineCategory === "all") return true;
                  if (headlineCategory === "critical") return story.category.includes("SEMI") || story.category.includes("AI") || story.category.includes("TECH");
                  if (headlineCategory === "policy") return story.title.toLowerCase().includes("investments") || story.title.toLowerCase().includes("scheme") || story.title.toLowerCase().includes("rule");
                  if (headlineCategory === "accords") return story.title.toLowerCase().includes("partnership") || story.title.toLowerCase().includes("retail") || story.title.toLowerCase().includes("expansion");
                  return true;
                })
                .map((story, idx) => (
                  <Link key={idx} href="/en/news-poc/article/sec-1" className="flex gap-6 items-start group pb-6 border-b border-gray-100 dark:border-gray-850 last:border-0 last:pb-0 block">
                    <span className="font-display text-3xl font-extrabold text-gray-200 dark:text-gray-800 group-hover:text-blue-500 transition-colors leading-none">
                      {story.num}
                    </span>
                    <div className="flex-1 space-y-2">
                      <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                        {story.category}
                      </span>
                      <h4 className="text-sm font-bold text-gray-955 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                        {story.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-normal">
                        {story.desc}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold pt-1">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {story.date}</span>
                        <span>•</span>
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Right Column: Live Updates & Policy Tracker widget */}
          <div className="lg:col-span-4 space-y-6">

            {/* Policy Tracker block */}
            <div className="bg-slate-950 text-white border border-slate-900 p-5 rounded-2xl shadow-xs space-y-4">
              <span className="bg-[#E63946]/10 text-[#E63946] text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase block w-max">
                Policy Tracker
              </span>
              <div className="space-y-1">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wider block">CRITICAL</span>
                <h4 className="text-xs font-bold">EU Carbon Tax Revisions</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
                  Effective Jan 1, 2025. Impacts high-emission manufacturing and export sectors.
                </p>
              </div>
              <Link href="/eoi" className="text-xs text-blue-400 font-bold hover:underline flex items-center gap-1">
                VIEW POLICY ANALYTICS <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sixth Fold: Editor's Desk */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight">
            Editor's Desk
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1 */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-950 dark:text-white leading-snug">
                  China's EV Supply Chain Shift Reshapes Global Markets
                </h4>
                <p className="text-xs text-gray-550 leading-relaxed font-normal">
                  New export curbs and mineral policies are driving companies to diversify beyond China at record pace.
                </p>
              </div>
              <div className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-950/15 border-l-2 border-blue-500 rounded-r-lg">
                <span className="text-[8px] font-bold text-blue-600 block uppercase mb-1">Why it matters</span>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 italic">
                  "For global manufacturers, the supply chain is no longer just about cost, but geopolitical resilience. This shift will likely increase final product prices by 12% by 2026."
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">
                  Global Chipmakers Increase India Investment
                </h4>
                <p className="text-xs text-gray-550 leading-relaxed font-normal">
                  With $20B in fresh commitments, the subcontinent is positioning itself as the premier alternative for semiconductor assembly.
                </p>
              </div>
              <div className="mt-4 p-3 bg-amber-500/5 dark:bg-amber-950/15 border-l-2 border-amber-500 rounded-r-lg">
                <span className="text-[8px] font-bold text-amber-600 block uppercase mb-1">Why it matters</span>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 italic">
                  "India's talent pool combined with aggressive subsidies is finally overcoming historical infrastructure bottlenecks, creating a new tech axis."
                </p>
              </div>
            </div>

            {/* Column 3: The Daily Briefing */}
            <div className="bg-gradient-to-br from-[#0c1424] to-[#162136] border border-slate-800 text-white p-5 rounded-2xl shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-2">
                  The Daily Briefing
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Our chief analysts condense the day's noise into 3 critical takeaways for the C-suite.
                </p>
              </div>
              <div className="space-y-3 pt-3 text-[11px]">
                <div className="flex gap-2.5 items-start">
                  <span className="text-[#FEC970] font-bold">01</span>
                  <p className="text-slate-300 font-normal">Sovereign debt risks in emerging markets are peaking as USD holds firm.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-[#FEC970] font-bold">02</span>
                  <p className="text-slate-300 font-normal">AI regulation in the UK takes a surprisingly pro-innovation stance.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-[#FEC970] font-bold">03</span>
                  <p className="text-slate-300 font-normal">Commercial real estate defaults hit a 5-year high in major hubs.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Seventh Fold: Corporate Spotlight */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight">
              Corporate Spotlight
            </h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              MARKET LEADERS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60", title: "Toyota Announces New EV Production Hub in Japan", tag: "EXPANSION", date: "20 mins ago", type: "Automotive" },
              { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60", title: "Siemens to Acquire Industrial Automation Firm in Germany", tag: "M&A", date: "45 mins ago", type: "Industrial" },
              { img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60", title: "Microsoft Beats Q1 Estimates, Cloud Growth Strong", tag: "EARNINGS", date: "1 hour ago", type: "Tech" },
              { img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=500&auto=format&fit=crop&q=60", title: "Maersk Partners with DP World for Network Hubs", tag: "LOGISTICS", date: "2 hours ago", type: "Trade" }
            ].map((corp, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all group">
                <div className="h-32 w-full overflow-hidden relative">
                  <img src={corp.img} alt={corp.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                  <span className="absolute top-2.5 left-2.5 bg-gray-950 text-white text-[8px] font-bold px-2 py-0.5 rounded tracking-wider">
                    {corp.tag}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <Link href="/en/news-poc/company-news">
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 min-h-[32px] hover:text-blue-500 transition-colors">
                      {corp.title}
                    </h5>
                  </Link>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-gray-400 block font-semibold">
                      {corp.date} • {corp.type}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setFollowedCorps(prev => prev.includes(corp.title) ? prev.filter(c => c !== corp.title) : [...prev, corp.title]);
                      }}
                      className={`text-[8px] font-bold px-2 py-1 rounded transition-colors ${
                        followedCorps.includes(corp.title) 
                          ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {followedCorps.includes(corp.title) ? "Following" : "+ Follow"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eighth Fold: Leader Mentions */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight">
              Leader Mentions
            </h3>
            <button className="text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-wider">
              View Influence Index
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {[
              { name: "Elon Musk", role: "1.2K mentions" },
              { name: "Elena Rostova", role: "980 mentions" },
              { name: "Satya Nadella", role: "810 mentions" },
              { name: "Sarah Dransfield", role: "760 mentions" },
              { name: "Marcus Thorne", role: "650 mentions" }
            ].map((lead, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl text-center shadow-3xs flex flex-col items-center gap-2.5">
                <Link href="/en/news-poc/leader-news" className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm uppercase hover:scale-105 transition-transform">
                  {lead.name.charAt(0)}
                </Link>
                <div>
                  <Link href="/en/news-poc/leader-news" className="font-bold text-gray-955 dark:text-white block text-xs hover:text-blue-550 transition-colors">
                    {lead.name}
                  </Link>
                  <span className="text-[9px] text-gray-450 block font-mono mt-0.5">{lead.role}</span>
                </div>
                <button
                  onClick={() => {
                    setFollowedLeaders(prev => prev.includes(lead.name) ? prev.filter(l => l !== lead.name) : [...prev, lead.name]);
                  }}
                  className={`text-[8px] font-bold px-2.5 py-1 rounded transition-all ${
                    followedLeaders.includes(lead.name)
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {followedLeaders.includes(lead.name) ? "Following" : "+ Follow"}
                </button>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Ninth Fold: Premium Intelligence Banner */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="bg-slate-950 text-white border border-slate-900 p-8 rounded-3xl relative overflow-hidden shadow-lg space-y-6">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80')] bg-cover opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[9px] font-bold px-2.5 py-0.5 rounded tracking-wider uppercase block w-max">
                SUBSCRIBER EXCLUSIVE
              </span>
              <h3 className="font-display text-xl md:text-3xl font-bold leading-tight">
                Unlock Corporate Intelligence Pro.
              </h3>
              <p className="text-xs md:text-sm text-slate-350 font-normal leading-relaxed max-w-2xl">
                Get full access to 5,000+ verified corporate profiles, bilateral supply chain directories, and high-yielding B2B trade intelligence leads.
              </p>
            </div>
            <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs px-6 py-3 rounded-lg transition-colors whitespace-nowrap block">
              Get Premium Access
            </Link>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pb-4">
            {[
              "5,000+ Company Intelligence Profiles",
              "Bilateral Sourcing & Supply Chain Leads",
              "Verified Supplier Badges & Priority Expo Access"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Locked preview cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: "DEEP DIVE", title: "Why India is Becoming the Next Global Manufacturing Base", author: "By IGEN Research Team", read: "12 min read" },
              { type: "FORECAST", title: "The Hidden Impact of AI Regulation on Global Trade", author: "By Trade Intelligence Desk", read: "15 min read" },
              { type: "STRATEGY", title: "Global Supply Chain 2025: Risks, Shifts & Opportunities", author: "By Global Strategy Team", read: "22 min read" }
            ].map((pCard, idx) => (
              <div key={idx} className="bg-slate-900/60 backdrop-blur-xs p-5 rounded-xl border border-white/5 flex flex-col justify-between min-h-[140px] relative overflow-hidden group">
                <Lock className="absolute right-4 top-4 h-4 w-4 text-white/40" />
                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-amber-400 uppercase tracking-wider block">
                    {pCard.type}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug group-hover:text-amber-400 transition-colors">
                    {pCard.title}
                  </h4>
                </div>
                <div className="flex justify-between items-center text-[9px] text-slate-400 font-semibold pt-4">
                  <span>{pCard.author}</span>
                  <span>{pCard.read}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tenth Fold: Global Policy Tracker */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">LEGISLATIVE INTELLIGENCE</span>
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase mt-1">
                Global Policy Tracker
              </h3>
            </div>
            <button className="bg-gray-900 text-white dark:bg-white dark:text-gray-950 font-bold text-[10px] px-4 py-2 rounded-lg hover:opacity-90 transition-all uppercase">
              Launch Interactive Timeline
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { type: "CRITICAL IMPACT", act: "EU AI ACT · Implementation Phase", title: "Implementation of Tier-1 transparency requirements begins globally.", bio: "Companies failing to comply with the new audit logs by Q1 2025 face fines of up to 7% of global turnover, a potential $200B liability across the tech sector.", w: "88%", level: "SEVERE" },
              { type: "MODERATE IMPACT", act: "SEC 10-K · New Standard", title: "Climate-risk reporting standards finalized for US firms.", bio: "This mandate effectively forces Scope 3 disclosures, exposing supply chain vulnerabilities that were previously shielded from public investors.", w: "42%", level: "MODERATE" }
            ].map((policy, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 space-y-3">
                  <div className="flex gap-2 items-center">
                    <span className="bg-amber-500/10 text-amber-500 text-[8px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">{policy.type}</span>
                    <span className="text-[9px] text-gray-400 font-bold">{policy.act}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-950 dark:text-white leading-snug">{policy.title}</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-normal">{policy.bio}</p>
                </div>
                <div className="md:col-span-4 bg-gray-50 dark:bg-gray-955 p-3 rounded-xl flex flex-col justify-center gap-3">
                  <div>
                    <span className="text-[8px] text-gray-400 block uppercase">Market Impact</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: policy.w }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-950 dark:text-white font-mono">{policy.w}</span>
                    </div>
                  </div>
                  {policy.level === "SEVERE" && (
                    <div>
                      <span className="text-[8px] text-gray-400 block uppercase">Risk Indicator</span>
                      <span className="text-[10px] font-bold text-red-500 block mt-0.5">SEVERE ⚠️</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* AI Policy Impact Exposure Checker */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-855 pb-3">
              <Sparkles className="h-4.5 w-4.5 text-amber-500" />
              <h4 className="font-display text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider">
                AI Policy Impact &amp; HS Code Exposure Checker
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Inputs */}
              <div className="md:col-span-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Select Active Policy</label>
                  <select 
                    value={policyInput}
                    onChange={(e) => setPolicyInput(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500"
                  >
                    <option>EU Carbon Tax (CBAM)</option>
                    <option>US Critical Tech Defense Accord</option>
                    <option>India-UAE CEPA Tariff Schedules</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Enter 2-Digit HS Product Code</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 72 (Iron & Steel), 85 (Electrical Machinery)" 
                    value={hsCodeInput}
                    onChange={(e) => setHsCodeInput(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500"
                  />
                </div>

                <button 
                  onClick={() => {
                    const hs = parseInt(hsCodeInput);
                    if (isNaN(hs) || hsCodeInput.trim() === "") {
                      setExposureResult({
                        risk: "LOW RISK",
                        score: "15%",
                        rate: "0.0%",
                        text: "Product code not matching high-risk sectors under current policy revisions. Standard tariffs apply."
                      });
                      return;
                    }
                    if (policyInput.includes("EU Carbon")) {
                      if (hs === 72 || hs === 73 || hs === 76) {
                        setExposureResult({
                          risk: "SEVERE EXPOSURE",
                          score: "92%",
                          rate: "28.5% Import Tax",
                          text: "CBAM high-emission regulation applies. Immediate carbon emission reporting and audit sheets required to prevent supply penalties."
                        });
                      } else {
                        setExposureResult({
                          risk: "MODERATE EXPOSURE",
                          score: "45%",
                          rate: "4.2% Tariff Adjust",
                          text: "Secondary packaging emission standard applies. Ensure supplier compliance logs are updated annually."
                        });
                      }
                    } else if (policyInput.includes("US Critical")) {
                      if (hs === 85 || hs === 84) {
                        setExposureResult({
                          risk: "SEVERE EXPOSURE",
                          score: "88%",
                          rate: "Tech Sourcing Restrictions",
                          text: "iCET critical aerospace avionics and semiconductor rules apply. Require export control certification keys before cargo load."
                        });
                      } else {
                        setExposureResult({
                          risk: "LOW RISK",
                          score: "10%",
                          rate: "Standard Tariff",
                          text: "Non-defense commodity category. No active export restriction flags detected."
                        });
                      }
                    } else {
                      if (hs === 71 || hs === 39) {
                        setExposureResult({
                          risk: "DUTY CONCESSION (SAVINGS)",
                          score: "95%",
                          rate: "0% Duty Rate (CEPA)",
                          text: "CEPA Bilateral Accord applies. Net zero duty rate active for registered importers utilizing Form-A certificate."
                        });
                      } else {
                        setExposureResult({
                          risk: "LOW RISK",
                          score: "20%",
                          rate: "5.0% Standard Duty",
                          text: "Outside preferential concession schedules. standard custom duties apply."
                        });
                      }
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors uppercase tracking-wider"
                >
                  Assess Compliance Exposure
                </button>
              </div>

              {/* Results */}
              <div className="md:col-span-7 bg-gray-55 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800 flex flex-col justify-center space-y-4 min-h-[180px]">
                {exposureResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        exposureResult.risk.includes("SEVERE") 
                          ? "bg-red-100 dark:bg-red-950/40 text-red-650 dark:text-red-400"
                          : exposureResult.risk.includes("MODERATE")
                          ? "bg-amber-100 dark:bg-amber-955/40 text-amber-600 dark:text-amber-400"
                          : "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      }`}>
                        {exposureResult.risk}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold">Risk Score: <strong className="text-gray-950 dark:text-white">{exposureResult.score}</strong></span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-gray-400 block uppercase">Policy Tariff Delta</span>
                      <div className="text-sm font-bold text-gray-955 dark:text-white font-mono">{exposureResult.rate}</div>
                    </div>

                    <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                      {exposureResult.text}
                    </p>

                    <div className="pt-2 border-t border-gray-150 dark:border-gray-855 flex items-center justify-between">
                      <span className="text-[8px] text-slate-400 uppercase">Checked via IGE Policy AI Engine</span>
                      {downloadingPacketId === "packet-dl" ? (
                        <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-1">
                          <RefreshCw className="h-3 w-3 animate-spin" /> Downloading Packet...
                        </span>
                      ) : (
                        <button 
                          onClick={() => {
                            setDownloadingPacketId("packet-dl");
                            setTimeout(() => {
                              setDownloadingPacketId(null);
                              alert("Accord Compliance Packet compiled successfully. PDF download started.");
                            }, 2000);
                          }}
                          className="text-[9px] font-bold text-blue-500 hover:underline"
                        >
                          Download Accord Compliance Packet →
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-2">
                    <ShieldAlert className="h-8 w-8 text-gray-300 mx-auto" />
                    <h5 className="text-xs font-bold text-gray-450 uppercase">No Active Assessment</h5>
                    <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                      Enter your product's 2-digit HS Code above to analyze legislative compliance risk and tariff deltas under active policies.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eleventh Fold: Case Study & Resilience Spotlight */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sustainable Assets */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[300px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80')` }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-955 via-slate-950/40 to-transparent" />
            <div className="relative z-10 space-y-4">
              <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase w-max block">
                Resilience Brief
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">
                The Architecture of Resilience: Scaling Sustainable Assets in 2025
              </h3>
              <div className="p-3 bg-white/5 border-l-2 border-emerald-500 rounded-r-lg text-xs italic font-normal text-slate-300">
                "Infrastructure is no longer a passive asset class; it is the frontline of competitive advantage in a decarbonizing world."
                <span className="block text-[9px] text-slate-400 not-italic font-bold mt-1">— Julian Vance, CEO Nexus Dynamics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Case study content card */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-6 rounded-3xl flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">CASE STUDY</span>
              <h4 className="font-display text-base font-bold text-gray-950 dark:text-white leading-snug">
                How Apple is accelerating manufacturing expansion across India.
              </h4>
              <p className="text-xs text-gray-550 leading-relaxed font-normal">
                The "China Plus One" strategy is maturing. India now accounts for 14% of iPhone production, a figure projected to hit 25% by 2028.
              </p>
            </div>
            <button className="w-full mt-6 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-[10px] py-2.5 rounded-lg hover:bg-gray-50 transition-colors uppercase">
              Read Strategic Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Twelfth Fold: Premium Insights Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="bg-slate-950 text-white border border-slate-900 p-8 rounded-3xl relative overflow-hidden shadow-lg space-y-6">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80')] bg-cover opacity-5" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[9px] font-bold px-2.5 py-0.5 rounded tracking-wider uppercase block w-max">
                SUBSCRIBER EXCLUSIVE
              </span>
              <h3 className="font-display text-xl font-bold leading-tight">
                Premium Insights
              </h3>
              <p className="text-xs text-slate-350 leading-relaxed max-w-xl">
                Deep-dive technical forensic finance and central bank balance sheet technicals for professional decision makers.
              </p>
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
              Unlock Premium Insights
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "PDF REPORT", title: "Sovereign Debt Risk Mapping 2025", desc: "Country-by-country stress test for emerging market resilience." },
              { label: "INTERACTIVE", title: "Global Supply Chain Pulse", desc: "Real-time port congestion data integrated with commodity futures." }
            ].map((insight, idx) => (
              <div key={idx} className="bg-slate-900/60 p-5 rounded-xl border border-white/5 flex flex-col justify-between min-h-[130px] relative overflow-hidden group">
                <Lock className="absolute right-4 top-4 h-4 w-4 text-white/40" />
                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">{insight.label}</span>
                  <h4 className="text-xs font-bold text-white leading-snug group-hover:text-amber-400 transition-colors">{insight.title}</h4>
                  <p className="text-[10px] text-slate-450 font-normal">{insight.desc}</p>
                </div>
                <span className="text-[8px] font-bold text-amber-400 tracking-wider uppercase mt-4 block">SUBSCRIBER ONLY</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thirteenth Fold: Market Snapshot Strip */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-4">
          <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Market Snapshot</span>
            <span>REAL-TIME DATA • NYSE/LSE/NSE</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            {[
              { name: "S&P 500", val: "5,241.53", change: "+0.32%", up: true },
              { name: "NASDAQ", val: "16,384.47", change: "+0.18%", up: true },
              { name: "NIFTY 50", val: "22,475.20", change: "+0.68%", up: true },
              { name: "BRENT", val: "$85.42", change: "-0.56%", up: false },
              { name: "GOLD", val: "$2,358.40", change: "+0.35%", up: true },
              { name: "BTC/USD", val: "$68,432", change: "+1.45%", up: true }
            ].map((mVal, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-3 rounded-xl shadow-3xs text-center">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">{mVal.name}</span>
                <span className="text-xs font-bold text-gray-950 dark:text-white block mt-1 font-mono">{mVal.val}</span>
                <span className={`text-[9px] font-bold block mt-0.5 ${mVal.up ? "text-emerald-500" : "text-red-500"}`}>
                  {mVal.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fourteenth Fold: Rising Influence / Most Quoted Today */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Rising Influence */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight pb-2 border-b border-gray-150 dark:border-gray-855">
              Rising Influence
            </h4>
            <div className="space-y-3">
              {[
                { num: "01", name: "Deepak Narang", val: "+12" },
                { num: "02", name: "Chloe Zhang", val: "-2" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3 rounded-xl shadow-3xs">
                  <div className="flex gap-3 items-center">
                    <span className="font-mono text-xs font-bold text-gray-400">{item.num}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.name}</span>
                  </div>
                  <span className={`text-xs font-bold font-mono ${item.val.startsWith("-") ? "text-red-500" : "text-emerald-500"}`}>
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Quoted Today */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight pb-2 border-b border-gray-150 dark:border-gray-855">
              Most Quoted Today
            </h4>
            <div className="space-y-3">
              {[
                { num: "01", name: "Julian Vance", val: "+412" },
                { num: "02", name: "Elena Rostova", val: "+298" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3 rounded-xl shadow-3xs">
                  <div className="flex gap-3 items-center">
                    <span className="font-mono text-xs font-bold text-gray-400">{item.num}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-500 font-mono">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

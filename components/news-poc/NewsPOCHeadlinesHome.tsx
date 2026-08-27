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

  // Global Headlines Filters and Data
  const [globalCountryFilter, setGlobalCountryFilter] = useState("all");
  const [globalSectorFilter, setGlobalSectorFilter] = useState("all");

  const globalHeadlines = [
    { country: "US", sector: "tech", countryName: "United States", sectorName: "Tech & AI", title: "US Regulators Launch Antitrust Probe into Core Cloud Conglomerates", desc: "Federal trade officials open inquiry targeting AI licensing structures and cloud computing infrastructure acquisitions.", date: "15 mins ago", readTime: "5 min read" },
    { country: "IN", sector: "energy", countryName: "India", sectorName: "Energy", title: "India Green Hydrogen Corridor Attracts $15B in Foreign Commitments", desc: "Bilateral agreements signed to construct green hydrogen production hubs in Rajasthan and Gujarat with export corridors to Europe.", date: "1 hour ago", readTime: "8 min read" },
    { country: "EU", sector: "finance", countryName: "Europe", sectorName: "Finance", title: "European Central Bank Signals Rate Adjustment Protocols", desc: "Policy makers align on calibration measures to stabilize sovereign debt yields amid shifting core inflation indicators.", date: "3 hours ago", readTime: "6 min read" },
    { country: "JP", sector: "auto", countryName: "Japan", sectorName: "Auto & EV", title: "Japanese Auto Manufacturers Outline Unified Solid-State Battery Strategy", desc: "Joint venture commits to scaling manufacturing of solid-state EV batteries by 2027 to capture premium EV segment share.", date: "4 hours ago", readTime: "7 min read" }
  ];

  const filteredGlobalHeadlines = globalHeadlines.filter(news => {
    const matchCountry = globalCountryFilter === "all" || news.country === globalCountryFilter;
    const matchSector = globalSectorFilter === "all" || news.sector === globalSectorFilter;
    return matchCountry && matchSector;
  });

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
      { num: "03", category: "RETAIL", title: "Luxury Retail Expansion Surges Across GCC Markets", desc: "High-net-worth consumption patterns drive a 15% increase in flagship boutique openings in Riyadh and Dubai this fiscal quarter.", readTime: "5 min read", date: "1 hour ago" },
      { num: "04", category: "ENERGY", title: "Bilateral Grid Integrity Accords Signed for North Sea Wind Projects", desc: "European consortium secures $18B backing to build interconnected deep-sea offshore power hubs serving central grid nodes.", readTime: "7 min read", date: "2 hours ago" },
      { num: "05", category: "FINANCE", title: "Global Sovereign Debt Yields Rise Amid Stronger Dollar Projections", desc: "Central bank announcements signal prolonged interest rate calibration, impacting emerging market capital allocation.", readTime: "6 min read", date: "3 hours ago" },
      { num: "06", category: "AUTOMOTIVE", title: "Toyota Accelerates Next-Gen Solid-State Battery Scaling Program", desc: "New pilot assembly line in Aichi commits to delivering pilot batteries by 2026, targeting double the energy density.", readTime: "8 min read", date: "4 hours ago" }
    ],
    markets: [
      { num: "01", category: "MARKETS", title: "Global Chipmakers Increase India Investments Following PLI Scheme", desc: "New incentives for semiconductor manufacturing draw commitments from foundry operators in Taiwan and Europe.", readTime: "6 min read", date: "45 mins ago" },
      { num: "02", category: "COMMODITIES", title: "Lithium Price Index Stabilizes After High Supply Volatility", desc: "Bilateral resource corridors secure raw battery mineral flow, lowering EV supply chain risks.", readTime: "7 min read", date: "2 hrs ago" },
      { num: "03", category: "FINANCE", title: "Global Sovereign Debt Yields Rise Amid Stronger Dollar Projections", desc: "Central bank announcements signal prolonged interest rate calibration, impacting emerging market capital allocation.", readTime: "6 min read", date: "3 hours ago" },
      { num: "04", category: "RETAIL", title: "Luxury Retail Expansion Surges Across GCC Markets", desc: "High-net-worth consumption patterns drive a 15% increase in flagship boutique openings in Riyadh and Dubai this fiscal quarter.", readTime: "5 min read", date: "1 hour ago" },
      { num: "05", category: "ENERGY", title: "Green Hydrogen Off-Take Accords Finalized in European Hubs", desc: "Multi-decade supply contracts signed with heavy industry consortiums to guarantee green fuel availability.", readTime: "9 min read", date: "5 hours ago" }
    ],
    tech: [
      { num: "01", category: "TECH & SEMI", title: "Apple Accelerates Manufacturing Expansion Across India", desc: "The Cupertino giant is increasing supplier partnerships as India becomes a strategic export hub.", readTime: "8 min read", date: "12 mins ago" },
      { num: "02", category: "AI & CYBER", title: "Cybersecurity Framework Standards Upgraded for Global SaaS Nodes", desc: "New encryption rules implemented across banking interfaces to block cloud infrastructure vulnerabilities.", readTime: "9 min read", date: "3 hrs ago" },
      { num: "03", category: "TECH & SEMI", title: "TSMC Outlines Plan for Next-Gen 2nm Foundry Site in Hsinchu", desc: "Cleanroom construction commences ahead of scheduled production run targets in mid-2025.", readTime: "10 min read", date: "4 hours ago" },
      { num: "04", category: "AI & ROBOTICS", title: "Autonomous Sourcing Algorithms Deployed Across Supply Networks", desc: "Enterprise platform integrates predictive model loops to dynamically manage inventory and freight delays.", readTime: "7 min read", date: "5 hours ago" },
      { num: "05", category: "TELECOM", title: "Global 6G Standardization Panel Reaches Spectrum Consensus", desc: "Bilateral agreements signed across regulatory panels to reserve high-frequency bands for advanced mobile hubs.", readTime: "8 min read", date: "6 hours ago" }
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
                      <p className="text-xs text-gray-550 leading-relaxed font-normal">
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

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* The Daily Briefing */}
            <div className="bg-gradient-to-br from-[#0c1424] to-[#162136] border border-slate-800 text-white p-5 rounded-2xl shadow-xs space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-2">
                  The Daily Briefing
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Our chief analysts condense the day's noise into 5 critical takeaways for the C-suite.
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
                <div className="flex gap-2.5 items-start">
                  <span className="text-[#FEC970] font-bold">04</span>
                  <p className="text-slate-300 font-normal">Bilateral carbon adjustment policies force supply chain realignment in APAC.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-[#FEC970] font-bold">05</span>
                  <p className="text-slate-300 font-normal">Global semiconductor equipment demand surges following new subsidy packages.</p>
                </div>
              </div>
            </div>

            {/* Rising Influence */}
            <div className="space-y-4 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-xs">
              <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight pb-2 border-b border-gray-150 dark:border-gray-855">
                Rising Influence
              </h4>
              <div className="space-y-3">
                {[
                  { num: "01", name: "Deepak Narang", val: "+12" },
                  { num: "02", name: "Chloe Zhang", val: "-2" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-855 p-3 rounded-xl">
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
            <div className="space-y-4 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-xs">
              <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight pb-2 border-b border-gray-150 dark:border-gray-855">
                Most Quoted Today
              </h4>
              <div className="space-y-3">
                {[
                  { num: "01", name: "Julian Vance", val: "+412" },
                  { num: "02", name: "Elena Rostova", val: "+298" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-855 p-3 rounded-xl">
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
        </div>
      </section>

      {/* Sixth Fold: Editor's Desk */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight">
            Editor's Desk
          </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Column 1 */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">
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
              <div className="mt-4 p-3 bg-amber-500/5 dark:bg-amber-955/15 border-l-2 border-amber-500 rounded-r-lg">
                <span className="text-[8px] font-bold text-amber-600 block uppercase mb-1">Why it matters</span>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 italic">
                  "India's talent pool combined with aggressive subsidies is finally overcoming historical infrastructure bottlenecks, creating a new tech axis."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Headlines Section with Filters */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-150 dark:border-gray-855">
            <div>
              <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider block">Global Coverage</span>
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight mt-0.5">
                Global Headlines
              </h3>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] font-bold text-gray-405 uppercase self-center mr-1">Filter by:</span>
              <select 
                value={globalCountryFilter} 
                onChange={(e) => setGlobalCountryFilter(e.target.value)}
                className="rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2 py-1 text-[10px] font-bold uppercase outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="all">All Countries</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="EU">Europe</option>
                <option value="JP">Japan</option>
              </select>
              
              <select 
                value={globalSectorFilter} 
                onChange={(e) => setGlobalSectorFilter(e.target.value)}
                className="rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2 py-1 text-[10px] font-bold uppercase outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="all">All Sectors</option>
                <option value="energy">Energy & Sustainability</option>
                <option value="tech">Technology & AI</option>
                <option value="finance">BFSI & Finance</option>
                <option value="auto">Automotive & EV</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {filteredGlobalHeadlines.map((news, idx) => (
              <Link key={idx} href="/en/news-poc/article/sec-1" className="flex gap-6 items-start group pb-6 border-b border-gray-100 dark:border-gray-855 last:border-0 last:pb-0 block">
                <span className="font-display text-3xl font-extrabold text-gray-200 dark:text-gray-800 group-hover:text-blue-550 transition-colors leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    <span>{news.sectorName}</span>
                    <span>•</span>
                    <span className="text-gray-400">{news.countryName}</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-955 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                    {news.title}
                  </h4>
                  <p className="text-xs text-gray-550 leading-relaxed font-normal">
                    {news.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold pt-1">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {news.date}</span>
                    <span>•</span>
                    <span>{news.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
            {filteredGlobalHeadlines.length === 0 && (
              <div className="py-12 text-center text-xs text-gray-400 uppercase tracking-wider">
                No global headlines matching the selected filters.
              </div>
            )}
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
        </div>
      </section>

      {/* Eleventh Fold: Case Study & Resilience Spotlight */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: FEATURED INSIGHT */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[380px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80')` }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-955 via-slate-950/60 to-transparent" />
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase block">
                  FEATURED INSIGHT
                </span>
                <span className="bg-white/10 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block">
                  Special Report
                </span>
              </div>
              
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">
                The Architecture of Resilience: Scaling Sustainable Assets in 2025
              </h3>
              
              <div className="p-3 bg-white/5 border-l-2 border-blue-500 rounded-r-lg text-xs italic font-normal text-slate-300">
                "Infrastructure is no longer a passive asset class; it is the frontline of competitive advantage in a decarbonizing world."
                <span className="block text-[9px] text-slate-450 not-italic font-bold mt-1">— Julian Vance, CEO Nexus Dynamics</span>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[10px] text-slate-350 border-t border-white/10 pt-3">
                <div>
                  <span className="text-slate-500 block text-[8px] font-bold uppercase">Sector</span>
                  <span className="font-bold text-white">Energy &amp; Infrastructure</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px] font-bold uppercase">Region</span>
                  <span className="font-bold text-white">Global / Europe</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px] font-bold uppercase">Topic</span>
                  <span className="font-bold text-white">Decarbonization</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px] font-bold uppercase">Published</span>
                  <span className="font-bold text-white">2 hours ago</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px] font-bold uppercase">Read Time</span>
                  <span className="font-bold text-white">12 min read</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[8px] font-bold uppercase">Source</span>
                  <span className="font-bold text-emerald-400">✓ Verified Author</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/en/news-poc/article/sec-1" className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-150 text-slate-950 font-bold text-[10px] px-4 py-2.5 rounded-lg transition-colors uppercase">
                  Read Full Analysis <ChevronRight className="h-3.5 w-3.5" />
                </Link>
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



    </div>
  );
}

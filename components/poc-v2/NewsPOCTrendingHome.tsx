"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  TrendingUp, Clock, ArrowUpRight, Lock, ShieldAlert, FileText, 
  ThumbsUp, MessageCircle, Share2, Compass, BookOpen, Award, 
  ArrowLeft, ChevronRight, Search, Users, CheckCircle, MessageSquare, 
  Calendar, Flame, Sparkles, Star
} from "lucide-react";

const TREND_CLUSTERS = [
  {
    id: "india-semi",
    status: "🔥 ACCELERATING",
    statusColor: "text-amber-500 bg-amber-500/10",
    title: "India Semiconductor Expansion",
    explanation: "New manufacturing investments and international partnerships are accelerating India's semiconductor ecosystem.",
    articlesCount: 42,
    companiesCount: 18,
    countriesCount: 7,
    sectorsCount: 5,
    momentum: "82%",
    timeIndicator: "Trending for 18h",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    latestArticles: [
      {
        id: "la-1",
        title: "India Semiconductor Mission Receives Fresh $10B Institutional Backing",
        category: "POLICY",
        time: "2 hours ago",
        source: "Bloomberg",
        summary: "The federal cabinet has approved a second phase funding block targeting sub-14nm fabrication setups in Gujarat.",
        sentiment: "90% Positive",
        sentimentColor: "text-emerald-500"
      },
      {
        id: "la-2",
        title: "International Fab Consortia Align With Local Infrastructure Groups",
        category: "LOGISTICS",
        time: "5 hours ago",
        source: "Reuters",
        summary: "Joint alliances speed up logistics facilities approvals, dropping heavy machinery import timelines.",
        sentiment: "84% Positive",
        sentimentColor: "text-emerald-500"
      }
    ],
    companies: [
      { name: "Tata Electronics", sector: "Semiconductor Manufacturing", status: "↑ Rising" },
      { name: "ASML Holding", sector: "Lithography Equipment", status: "↑ Rising" },
      { name: "Vedanta Groups", sector: "Industrial Minerals", status: "→ Stable" }
    ],
    countries: [
      { name: "India", role: "Manufacturing & Infrastructure hubs" },
      { name: "Netherlands", role: "Specialized equipment lithography exports" },
      { name: "Japan", role: "Specialty chemicals and substrate suppliers" },
      { name: "Taiwan", role: "Technical operations alliances and training" },
      { name: "United States", role: "Venture finance and licensing clearances" }
    ],
    analysis: [
      {
        title: "Wafer FAB Economics: Geopolitical Arbitrage in Southeast Asia",
        author: "Satoshi Yamamoto",
        excerpt: "Analyzing the comparative CAPEX subsidies between India's ISM program and Vietnam's sub-tier concessions reveals key advantages in raw utility costs."
      }
    ],
    aiBrief: {
      explanation: "India's semiconductor push is gaining velocity due to structural state support under the India Semiconductor Mission (ISM), coupled with global supply chain diversification strategies ('China+1'). Major international lithography and assembly corporations are establishing joint operations with domestic firms to bypass trade restrictions and tap into India's vast pool of chip design talent.",
      drivers: [
        "Federal subsidy clearance covering up to 50% of fab establishment cost.",
        "Strategic alliances between domestic conglomerates and global technology leaders.",
        "Increasing global demand for mature nodes in automotive and smart grid applications.",
        "Geopolitical pressure forcing technology supply chains diversification."
      ],
      watch: [
        "Announcement of foreign equipment import tariff waivers.",
        "Groundbreaking timelines of Gujarat's first commercial fab facility.",
        "Local assembly and test packaging (OSAT) scaling metrics."
      ]
    }
  },
  {
    id: "ai-infra",
    status: "📈 EMERGING",
    statusColor: "text-blue-500 bg-blue-500/10",
    title: "AI Infrastructure Boom",
    explanation: "Growing demand for AI computing is driving new investment across chips, data centers, energy and cloud infrastructure.",
    articlesCount: 28,
    companiesCount: 14,
    countriesCount: 9,
    sectorsCount: 6,
    momentum: "67%",
    timeIndicator: "Rising over 7 days",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    latestArticles: [
      {
        id: "la-3",
        title: "Liquid Cooling Providers Face Backlogs As AI Datacenters Multiply",
        category: "INFRASTRUCTURE",
        time: "1 day ago",
        source: "TechRadar",
        summary: "Thermal management supply chains struggle to keep pace with the massive sub-assembly volumes needed by hyperscalers.",
        sentiment: "75% Positive",
        sentimentColor: "text-emerald-500"
      }
    ],
    companies: [
      { name: "Nvidia Corp", sector: "GPU Architecture", status: "↑ Rising" },
      { name: "Vertiv Holdings", sector: "Thermal Management Solutions", status: "↑ Rising" }
    ],
    countries: [
      { name: "United States", role: "Design, hyperscalers CapEx investment" },
      { name: "Ireland", role: "Hyperscale datacenters and tax hubs" }
    ],
    analysis: [
      {
        title: "The Grid Crunch: Powering the Next Hyperscale Wave",
        author: "Dr. Aris Thorne",
        excerpt: "Data centers are projected to consume up to 9% of total US grid capacity by 2028, sparking a regulatory race for alternative energy supply contracts."
      }
    ],
    aiBrief: {
      explanation: "The AI Infrastructure Boom is driven by the rapid transition from traditional datacenters to accelerated computing hubs. This requires specialized GPUs, advanced liquid-cooling hardware, high-bandwidth interconnects, and an unprecedented amount of electrical power.",
      drivers: [
        "Hyperscale cloud expansion projects.",
        "Transition to GPU-based high performance computing clusters.",
        "Surge in power grid demands forcing nuclear and renewable energy contracts."
      ],
      watch: [
        "Next-generation chip announcements and thermal management requirements.",
        "Regional grid restrictions on data center construction.",
        "Copper and optical fiber supply bottlenecks."
      ]
    }
  },
  {
    id: "green-shipping",
    status: "🌍 GLOBAL TREND",
    statusColor: "text-emerald-500 bg-emerald-500/10",
    title: "Green Shipping Expansion",
    explanation: "New regulations and investments are accelerating the transition toward lower-emission shipping and logistics.",
    articlesCount: 31,
    companiesCount: 12,
    countriesCount: 15,
    sectorsCount: 8,
    momentum: "54%",
    timeIndicator: "Rising over 7 days",
    bgImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&auto=format&fit=crop&q=80",
    latestArticles: [
      {
        id: "la-4",
        title: "Methanol-Fueled Containerships Dominate New Shipyard Orderbooks",
        category: "DECARBONIZATION",
        time: "3 days ago",
        source: "Lloyds List",
        summary: "Shipowners commit massive capital budgets to alternative fuel retrofits ahead of strict global carbon penalties.",
        sentiment: "68% Neutral",
        sentimentColor: "text-blue-500"
      }
    ],
    companies: [
      { name: "Maersk Line", sector: "Maritime Transport", status: "→ Stable" },
      { name: "Wärtsilä Marine", sector: "Propulsion Engineering", status: "↑ Rising" }
    ],
    countries: [
      { name: "Denmark", role: "Vessel operations and sustainability policies" },
      { name: "South Korea", role: "Shipyard construction and fuel tank designs" }
    ],
    analysis: [
      {
        title: "Carbon Tax Impact on Maritime Container Routes",
        author: "Elena Rostova",
        excerpt: "EU FuelEU Maritime compliance rules will add significant fuel surcharges beginning 2025, heavily affecting routes transiting through Mediterranean hubs."
      }
    ],
    aiBrief: {
      explanation: "Decarbonizing maritime transport is driven by international regulatory mandates (like the IMO greenhouse gas reduction goals and EU ETS integration). Fleet operators are turning to alternative fuels (methanol, ammonia, LNG) and specialized fuel-saving hull modifications.",
      drivers: [
        "Imminent carbon taxes and regulatory compliance penalties.",
        "Corporate shipper demands for net-zero scope 3 emissions.",
        "Advances in dual-fuel engine architectures and green fuel supply chains."
      ],
      watch: [
        "Availability and pricing of green e-methanol at bunkering hubs.",
        "Retrofitting capacities at global shipyard drydocks.",
        "Tighter maritime emission zones in Asian trading channels."
      ]
    }
  }
];
import NewsPOCFullDiscoveryView from "./NewsPOCFullDiscoveryView";

export default function NewsPOCTrendingHome() {
  const [selectedCluster, setSelectedCluster] = useState<typeof TREND_CLUSTERS[number] | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<"latest" | "data" | "companies" | "countries" | "analysis" | "aiBrief">("latest");
  const [isFullForecastOpen, setIsFullForecastOpen] = useState(false);
  const [sentimentVal, setSentimentVal] = useState(60);
  const [aiPlus, setAiPlus] = useState(true);
  const [activeRange, setActiveRange] = useState<"now" | "today" | "week" | "all">("now");
  const [trackedTrends, setTrackedTrends] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [chatLikes, setChatLikes] = useState({
    marcus1: 234,
    priya1: 189,
    marcus2: 234,
    priya2: 189,
    marcus3: 234
  });

  const incrementLike = (key: keyof typeof chatLikes) => {
    setChatLikes(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3000);
  };

  if (selectedCluster) {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
        {/* Detail Header Fold */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
            <button 
              onClick={() => setSelectedCluster(null)}
              className="hover:text-blue-500 flex items-center gap-1 uppercase text-[10px] font-extrabold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Trending
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-600 dark:text-gray-300">Trend Detail</span>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="space-y-1">
                <span className="text-blue-600 dark:text-blue-400 text-[10px] font-extrabold tracking-widest block uppercase">
                  Trend Cluster Overview
                </span>
                <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                  TREND: {selectedCluster.title}
                </h2>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className={`text-[9.5px] font-bold px-3 py-1 rounded-full ${selectedCluster.statusColor}`}>
                  {selectedCluster.status}
                </span>
                <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 text-[9.5px] font-extrabold px-3 py-1 rounded-full">
                  Momentum: {selectedCluster.momentum}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-normal text-gray-500 dark:text-gray-400">
              <span><strong>{selectedCluster.articlesCount}</strong> Articles</span>
              <span>•</span>
              <span><strong>{selectedCluster.companiesCount}</strong> Companies</span>
              <span>•</span>
              <span><strong>{selectedCluster.countriesCount}</strong> Countries</span>
              <span>•</span>
              <span><strong>{selectedCluster.sectorsCount}</strong> Sectors</span>
            </div>
          </div>
        </section>

        {/* Tab Controls fold */}
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="flex gap-1.5 border-b border-gray-200 dark:border-gray-800 pb-2 overflow-x-auto no-scrollbar text-xs font-bold uppercase">
            {([
              { key: "latest", label: "Latest" },
              { key: "data", label: "Data" },
              { key: "companies", label: "Companies" },
              { key: "countries", label: "Countries" },
              { key: "analysis", label: "Analysis" },
              { key: "aiBrief", label: "AI Brief" }
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveDetailTab(tab.key)}
                className={`px-4 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeDetailTab === tab.key 
                    ? "bg-blue-600 text-white shadow-2xs" 
                    : "bg-white text-gray-500 border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {activeDetailTab === "latest" && (
              <div className="space-y-4 pt-2">
                {selectedCluster.latestArticles.map((art) => (
                  <div key={art.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs flex flex-col md:flex-row gap-4 hover:shadow-2xs transition-all">
                    <div className="md:w-1/4 h-28 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-gray-550 uppercase tracking-widest">{art.category}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-[9px] text-gray-400 font-semibold">
                        <span className="text-blue-500">{art.category} • {art.source}</span>
                        <span>{art.time}</span>
                      </div>
                      <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-gray-555 dark:text-gray-400 font-normal leading-relaxed">
                        {art.summary}
                      </p>
                      <div className="flex justify-between items-center text-[9.5px] pt-1 border-t border-gray-50 dark:border-gray-855 pt-2 mt-2">
                        <div className="flex items-center gap-1 font-semibold">
                          <span>Sentiment:</span>
                          <span className={`font-bold ${art.sentimentColor}`}>{art.sentiment}</span>
                        </div>
                        <div className="flex gap-2.5 font-semibold">
                          <button onClick={() => showToast("Liked article")} className="hover:text-blue-500 flex items-center gap-0.5 text-gray-400"><ThumbsUp className="h-3 w-3" /> Like</button>
                          <button onClick={() => showToast("Copied share link")} className="hover:text-blue-500 flex items-center gap-0.5 text-gray-400"><Share2 className="h-3 w-3" /> Share</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeDetailTab === "data" && (
              <div className="space-y-6 pt-2">
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Trend Metrics Overview
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    {/* Momentum Gauge */}
                    <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-150 dark:border-gray-850 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Trend Velocity</span>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-2xl font-extrabold text-blue-500 font-mono">{selectedCluster.momentum}</span>
                        <span className="text-[10px] text-emerald-500 font-bold">↑ Accelerating</span>
                      </div>
                      <span className="text-[8px] text-gray-400 block pt-1">Based on global news coverage frequency and search query velocity.</span>
                    </div>

                    {/* Article Volume Growth */}
                    <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-150 dark:border-gray-850 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Coverage Growth</span>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-2xl font-extrabold text-[#FEC970] font-mono">+185%</span>
                        <span className="text-[10px] text-gray-400 font-semibold">Past 14 Days</span>
                      </div>
                      <span className="text-[8px] text-gray-400 block pt-1">Represents percentage change in total syndicated reporting volume.</span>
                    </div>

                    {/* Sentiment Index */}
                    <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-150 dark:border-gray-850 flex flex-col justify-between">
                      <span className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Sentiment Balance</span>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-2xl font-extrabold text-emerald-500 font-mono">82%</span>
                        <span className="text-[10px] text-gray-400 font-semibold font-bold">Positive / Neutral</span>
                      </div>
                      <span className="text-[8px] text-gray-400 block pt-1">AI-calculated net sentiment score across verified industry publications.</span>
                    </div>
                  </div>

                  {/* Activity chart representation */}
                  <div className="bg-gray-50 dark:bg-gray-900/40 p-5 rounded-xl border border-gray-150 dark:border-gray-850 space-y-3">
                    <span className="text-[9px] text-gray-400 uppercase font-bold block">Activity Momentum Chart</span>
                    <div className="h-32 flex items-end gap-1.5 pt-4">
                      {[15, 25, 18, 38, 45, 60, 85, 70, 92, 110, 130, 145].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                          <div className="w-full bg-blue-600/80 group-hover:bg-blue-500 rounded-t-xs transition-all relative" style={{ height: `${(val / 150) * 100}%` }}>
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-mono">
                              {val} items
                            </span>
                          </div>
                          <span className="text-[8px] text-gray-400 font-mono mt-1">{idx + 1}d</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === "companies" && (
              <div className="space-y-4 pt-2">
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                    Companies Driving This Trend
                  </h4>
                  
                  <div className="space-y-3">
                    {selectedCluster.companies.map((comp, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-150 dark:border-gray-850 hover:border-blue-500/20 transition-all">
                        <div>
                          <span className="font-bold text-xs text-gray-900 dark:text-white block">{comp.name}</span>
                          <span className="text-[9px] text-gray-450 block font-normal">{comp.sector}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-emerald-500 font-extrabold">{comp.status}</span>
                          <Link 
                            href="/en/poc-v2/company-news"
                            className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
                          >
                            Company Insights →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === "countries" && (
              <div className="space-y-4 pt-2">
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                    Countries Involved
                  </h4>
                  
                  <div className="space-y-3">
                    {selectedCluster.countries.map((c, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-150 dark:border-gray-850 hover:border-blue-500/20 transition-all">
                        <div>
                          <span className="font-bold text-xs text-gray-900 dark:text-white block">{c.name}</span>
                          <span className="text-[9px] text-gray-450 block font-normal">Role: {c.role}</span>
                        </div>
                        <Link 
                          href="/en/poc-v2/country-news"
                          className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
                        >
                          Country Intel →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeDetailTab === "analysis" && (
              <div className="space-y-4 pt-2">
                {selectedCluster.analysis.map((an, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3 hover:shadow-2xs transition-all">
                    <div className="flex justify-between items-start">
                      <span className="bg-amber-50 text-amber-700 dark:bg-amber-955/20 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Expert Analysis</span>
                      <span className="text-[10px] text-gray-455 font-semibold">Written by: {an.author}</span>
                    </div>
                    
                    <h4 className="text-xs md:text-sm font-bold text-gray-950 dark:text-white leading-snug">
                      {an.title}
                    </h4>

                    <p className="text-[11px] text-gray-555 dark:text-gray-400 font-normal leading-relaxed">
                      "{an.excerpt}"
                    </p>

                    <Link 
                      href="/en/poc-v2/expert-news"
                      className="bg-[#1D1D46] hover:bg-[#152e4f] text-white text-[9.5px] font-bold px-4 py-2 rounded-xl transition-all uppercase tracking-wider inline-block text-center mt-2"
                    >
                      Explore Expert Opinions →
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {activeDetailTab === "aiBrief" && (
              <div className="space-y-6 pt-2">
                <div className="bg-gradient-to-br from-indigo-950/55 via-slate-900/80 to-slate-950/55 dark:from-indigo-950/20 dark:to-slate-950/30 border border-indigo-900/40 p-6 rounded-2xl shadow-sm space-y-4 text-white">
                  <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
                      <h4 className="font-display text-sm font-bold uppercase tracking-wider">iGEN AI Brief</h4>
                    </div>
                    <span className="text-[9px] bg-indigo-500/30 text-indigo-300 font-extrabold px-2 py-0.5 rounded-full font-mono uppercase">Optimized Match</span>
                  </div>

                  <div className="space-y-3 font-sans text-xs">
                    <h5 className="text-[#FEC970] font-extrabold text-xs uppercase tracking-wider">Why is this trend gaining momentum?</h5>
                    <p className="text-slate-300 leading-relaxed font-normal">
                      {selectedCluster.aiBrief.explanation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-indigo-900/60 text-xs">
                    <div className="space-y-2">
                      <h5 className="text-emerald-400 font-extrabold text-[10px] uppercase tracking-wider">Key Drivers</h5>
                      <ul className="space-y-1.5 text-slate-350 list-disc list-inside font-semibold leading-relaxed">
                        {selectedCluster.aiBrief.drivers.map((drv, idx) => (
                          <li key={idx} className="marker:text-emerald-400 font-normal">{drv}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-amber-400 font-extrabold text-[10px] uppercase tracking-wider">What to Watch</h5>
                      <ul className="space-y-1.5 text-slate-355 list-disc list-inside font-semibold leading-relaxed">
                        {selectedCluster.aiBrief.watch.map((wtw, idx) => (
                          <li key={idx} className="marker:text-amber-400 font-normal">{wtw}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      onClick={() => showToast("Launching iGEN AI Chat assistant...")}
                      className="bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-[10.5px] px-5 py-2.5 rounded-xl transition-all uppercase tracking-wider shadow-md"
                    >
                      ASK iGEN AI →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="fixed bottom-4 right-4 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-lg shadow-lg text-xs font-bold transition-all">
            {toastMsg}
          </div>
        )}
      </div>
    );
  }

  if (isFullForecastOpen) {
    return (
      <NewsPOCFullDiscoveryView
        contextTitle="Trending Market Forecasts & Strategic Discovery"
        contextSubtitle="Explore multi-sector market forecasts, macroeconomic sentiment trends, policy projections, and strategic trade forecasts across 50 global industry sectors."
        contextBadge="TRENDING FORECASTS • FULL DISCOVERY"
        breadcrumbSource={[
          { label: "Trending", href: "/en/poc-v2/trending" },
          { label: "Popular Now" }
        ]}
        onBack={() => setIsFullForecastOpen(false)}
      />
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Title & Refinement Filter fold */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-250 dark:border-gray-855 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
              Trending Now
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            {/* Date Range Selector */}
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 block font-normal uppercase">Date Range</span>
              <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2.5 py-1 text-xs outline-none">
                <option>Last 7 Days</option>
                <option>Last 24 Hours</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            {/* Sectors Selector */}
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 block font-normal uppercase">Sectors</span>
              <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2.5 py-1 text-xs outline-none">
                <option>Multi-select (4)</option>
                <option>All Sectors</option>
              </select>
            </div>

            {/* Region Selector */}
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 block font-normal uppercase">Region</span>
              <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2.5 py-1 text-xs outline-none">
                <option>Global</option>
                <option>APAC</option>
                <option>EMEA</option>
              </select>
            </div>

            {/* Sentiment Slider */}
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 block font-normal uppercase">Filter by Sentiment</span>
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sentimentVal}
                  onChange={(e) => setSentimentVal(Number(e.target.value))}
                  className="w-24 accent-blue-500 h-1 rounded-lg"
                />
                <span className="font-mono text-[10px] text-gray-500">{sentimentVal}%</span>
              </div>
            </div>

            {/* AI Plus Toggle */}
            <div className="flex items-center gap-2 pt-3">
              <span className="text-xs">AI Plus</span>
              <button 
                onClick={() => setAiPlus(!aiPlus)}
                className={`w-8 h-4 rounded-full transition-all relative ${aiPlus ? "bg-blue-500" : "bg-gray-300"}`}
              >
                <span className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.25 transition-all ${aiPlus ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section: Top Trend & Live Discussion */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hero Top Trend card */}
          <div className="lg:col-span-12 relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[360px] lg:min-h-[460px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-102 transition-transform duration-350"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=800&auto=format&fit=crop&q=80')` }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-955 via-slate-950/45 to-transparent" />
            
            <div className="relative z-10 space-y-4">
              <span className="bg-[#E63946] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider block w-max">
                Top Trend
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight max-w-xl text-[#FEC970]">
                EV Battery Exports Surge <span className="text-[#FEC970]">320%</span> Across Southeast Asia
              </h2>
              <p className="text-slate-300 text-xs md:text-sm font-normal max-w-lg leading-relaxed">
                Rising demand EV batteries and strong export orders drive significant across regional market.
              </p>
              <div className="flex gap-3 pt-2">
                <Link href="/en/poc-v2/article/sec-1" className="bg-amber-50 hover:bg-amber-600 text-gray-955 font-bold text-xs px-5 py-2.5 rounded transition-all">
                  View Analysis
                </Link>
                <button 
                  onClick={() => {
                    const isTracking = trackedTrends.includes("ev-battery");
                    setTrackedTrends(prev => isTracking ? prev.filter(t => t !== "ev-battery") : [...prev, "ev-battery"]);
                    setToastMsg(isTracking ? "Removed trend from watch list" : "Now tracking EV Battery Export trends ✓");
                    setTimeout(() => setToastMsg(null), 2500);
                  }}
                  className={`font-bold text-xs px-5 py-2.5 rounded transition-all ${
                    trackedTrends.includes("ev-battery")
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-blue-650 hover:bg-blue-700 text-white"
                  }`}
                >
                  {trackedTrends.includes("ev-battery") ? "Tracking ✓" : "Track Trend"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Plus Executive Intelligence Summary */}
      {aiPlus && (
        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
          <div className="bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-slate-900/10 dark:from-blue-950/40 dark:to-slate-950/20 border border-blue-200/40 dark:border-blue-900/40 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-blue-650 dark:text-blue-400 font-bold text-xs">
              <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
              <span>AI Plus: Executive Briefing & Forecast Summary</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-normal text-gray-700 dark:text-gray-300">
              <li className="space-y-1 bg-white dark:bg-[#0f172a]/40 border border-gray-150 dark:border-gray-850 p-3 rounded-xl">
                <span className="font-semibold text-gray-900 dark:text-white block uppercase text-[9px] text-blue-500">Key Driver</span>
                PMI manufacturing expansion and sub-component localization laws are forcing battery suppliers to regionalize APAC stockpiles.
              </li>
              <li className="space-y-1 bg-white dark:bg-[#0f172a]/40 border border-gray-150 dark:border-gray-850 p-3 rounded-xl">
                <span className="font-semibold text-gray-900 dark:text-white block uppercase text-[9px] text-emerald-500">Tariff Forecast</span>
                We project a 4.5% tariff reduction on raw copper-foil subcomponents between Vietnam and India by Q3 2026.
              </li>
              <li className="space-y-1 bg-white dark:bg-[#0f172a]/40 border border-gray-150 dark:border-gray-855 p-3 rounded-xl">
                <span className="font-semibold text-gray-900 dark:text-white block uppercase text-[9px] text-amber-500">Supply Chain Risk</span>
                Lithium carbonate raw supply contracts have stabilized. However, local storage cells face a moderate 12% warehousing premium.
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Pill Time Filters */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-250 dark:border-gray-800">
            {(["now", "today", "week", "all"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-4 py-1 text-[10px] font-bold rounded-lg transition-all uppercase ${
                  activeRange === range 
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-2xs" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {range === "week" ? "This Week" : range === "all" ? "All Time" : range}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <select className="bg-white dark:bg-gray-900 border border-orange-500 rounded px-3 py-1 text-[10px] font-bold text-orange-550 outline-none uppercase">
              <option>Sector</option>
            </select>
            <select className="bg-white dark:bg-gray-900 border border-orange-500 rounded px-3 py-1 text-[10px] font-bold text-orange-550 outline-none uppercase">
              <option>Country</option>
            </select>
          </div>
        </div>
      </section>

      {/* Middle Section Layout: Grids, popular feeds */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column widgets (Momentum, search trends, AI intel) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sector Momentum */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-4 rounded-2xl shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 dark:border-gray-850 pb-2">
                Sector Momentum
              </span>
              <div className="space-y-3 text-xs">
                {[
                  { name: "EV & Energy", pct: "+8.4%", w: "84%", color: "bg-emerald-500", label: "text-emerald-500" },
                  { name: "Logistics", pct: "-2.1%", w: "21%", color: "bg-red-500", label: "text-red-500" },
                  { name: "Agriculture", pct: "+4.3%", w: "43%", color: "bg-emerald-500", label: "text-emerald-500" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>{item.name}</span>
                      <span className={item.label}>{item.pct}</span>
                    </div>
                    <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: item.w }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Trends */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-4 rounded-2xl shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 dark:border-gray-855 pb-2">
                Search Trends
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { tag: "#Lithium", count: "+24%" },
                  { tag: "#SuezCanal", count: "+12%" },
                  { tag: "#Semis", count: "+18%" },
                  { tag: "#IndiaExports", count: "+5%" }
                ].map((item, idx) => (
                  <span key={idx} className="bg-blue-50 dark:bg-blue-955/20 border border-blue-100/25 px-2 py-1 rounded text-[9px] font-semibold text-blue-600 dark:text-blue-400">
                    {item.tag} <strong className="ml-1 text-blue-805 dark:text-blue-200">{item.count}</strong>
                  </span>
                ))}
              </div>
            </div>

            {/* AI Intelligence banner */}
            <div className="bg-gradient-to-br from-indigo-950 to-purple-950 text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
              <span className="bg-amber-400 text-slate-950 text-[8px] font-bold px-2 py-0.5 rounded tracking-wider uppercase block w-max">
                AI Intelligence
              </span>
              <p className="text-[11px] leading-relaxed text-slate-300 font-normal">
                Grain export disruption predicted for Q4 due to Black Sea corridor tightening.
              </p>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px]">
                <div>
                  <span className="text-[8px] text-slate-450 block">CONFIDENCE</span>
                  <span className="font-bold text-amber-400 font-mono">92% MATCH</span>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded transition-all">
                  FULL REPORT
                </button>
              </div>
            </div>

          </div>

          {/* Center Column: Popular Now Feeds */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-gray-850">
              Popular Now
            </h3>

            <div className="space-y-6">
              {[
                { title: "India's semiconductor exports accelerate", desc: "India's semiconductor assembly and export rates register a significant surge as manufacturing investments and international partnerships expand.", pct: "90%", up: true, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60", partOf: "India Semiconductor Expansion" },
                { title: "Green Steel Revolution: India's New Export Frontier to European Markets", desc: "India's sustainable steel production is opening new corridors to European markets as carbon-border regulations reshape global trade dynamics.", pct: "82%", up: true, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60", partOf: "Green Shipping Expansion" },
                { title: "Asia bunker premiums hit record highs, some ships struggle to refuel", desc: "Bunkering services register massive queues across Singapore and Da Nang ports as fuel-trading terminals rebalance.", pct: "64%", up: true, img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=500&auto=format&fit=crop&q=60", partOf: "Green Shipping Expansion" },
                { title: "In charts: Singapore's energy and chemicals sector in focus as Middle East conflict escalates", desc: "Chemical inventories build up as shipping delays raise container freight rates through major corridors.", pct: "50%", up: false, img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60", partOf: "AI Infrastructure Boom" }
              ].map((art, idx) => (
                <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-3xs flex flex-col md:flex-row hover:shadow-2xs transition-all group">
                  <div className="md:w-1/3 h-40 md:h-auto overflow-hidden relative">
                    <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                  </div>
                  <div className="md:w-2/3 p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex gap-2 items-center flex-wrap">
                        <span className="bg-blue-50 text-blue-600 dark:bg-blue-955/20 text-[8px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                          MARKET METRIC
                        </span>
                        {art.partOf && (
                          <span className="bg-amber-50 text-amber-700 dark:bg-amber-955/20 text-[8px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase">
                            PART OF: {art.partOf}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs md:text-sm font-bold text-gray-955 dark:text-white group-hover:text-blue-550 transition-colors leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-xs text-gray-550 dark:text-gray-400 font-normal leading-relaxed line-clamp-2">
                        {art.desc}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-450 pt-3 border-t border-gray-5 dark:border-gray-855 font-semibold">
                      <div className="flex items-center gap-1">
                        <span>Sentiment:</span>
                        <span className={`font-bold ${art.up ? "text-emerald-500" : "text-red-500"}`}>{art.pct}</span>
                      </div>
                      <div className="flex gap-3">
                        <button className="hover:text-blue-500 flex items-center gap-0.5"><ThumbsUp className="h-3 w-3" /> Like</button>
                        <button className="hover:text-blue-500 flex items-center gap-0.5"><Share2 className="h-3 w-3" /> Share</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsFullForecastOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors uppercase shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>View All Forecasts</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Right Column widgets */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Watchlist */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-4 rounded-2xl shadow-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-850">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">My Watchlist</span>
                <span className="h-1.5 w-1.5 bg-orange-500 rounded-full" />
              </div>
              <div className="space-y-2 text-xs font-semibold">
                {[
                  { name: "Taiwan Semis (TSMC)", val: "142.20", up: true },
                  { name: "Lithium Carbonate", val: "13,400", up: false },
                  { name: "S&P Global Trade Index", val: "3,842", up: true }
                ].map((stock, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-gray-655 dark:text-gray-350">{stock.name}</span>
                    <span className={`font-bold font-mono ${stock.up ? "text-emerald-500" : "text-red-500"}`}>
                      {stock.val} {stock.up ? "▲" : "▼"}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-blue-500 font-bold text-[9px] hover:underline pt-1 block uppercase">
                + Add Entry
              </button>
            </div>

            {/* Go Premium banner */}
            <div className="bg-gradient-to-br from-[#c25e1d] to-[#e67e22] text-white p-5 rounded-2xl shadow-xs space-y-4">
              <h4 className="font-display text-sm font-bold leading-tight text-white">Go Premium</h4>
              <p className="text-[10px] text-orange-105 leading-relaxed font-normal">
                Unlock Predictive Analytics, real-time cargo tracking, and deep-dive trade flow maps.
              </p>
              <button className="w-full bg-slate-950 hover:bg-slate-850 text-white font-bold text-xs py-2 rounded transition-colors uppercase">
                Upgrade Access
              </button>
            </div>

            {/* Market Pulse */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-4 rounded-2xl shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 dark:border-gray-850 pb-2">
                Live Market Pulse
              </span>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex justify-between"><span>Tech Index</span><span className="text-emerald-500 font-bold">+2.45%</span></div>
                <div className="flex justify-between border-t border-gray-50 dark:border-gray-855 pt-2"><span>Energy (RE)</span><span className="text-red-505 font-bold">-0.12%</span></div>
              </div>
            </div>

            {/* Hot Keywords */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-800 p-4 rounded-2xl shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 dark:border-gray-850 pb-2">
                Hot Keywords
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["#NVIDIA", "#Semiconductors", "#GreenH2", "#ASML", "#AIGC"].map((word, idx) => (
                  <span key={idx} className="bg-gray-50 dark:bg-gray-955 border border-gray-205 dark:border-gray-800 px-2 py-0.5 rounded text-[9px] font-semibold">
                    {word}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trend Story Clusters Section */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <div className="space-y-1">
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight">
                Trend Story Clusters
              </h3>
              <p className="text-xs text-gray-550 dark:text-gray-400 font-normal">
                Related coverage grouped around the trends shaping markets, industries and businesses.
              </p>
            </div>
            <button 
              onClick={() => showToast("Opening all trending story clusters...")}
              className="text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-wider shrink-0 font-semibold"
            >
              VIEW ALL TRENDS →
            </button>
          </div>

          {/* Grid for 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREND_CLUSTERS.map((cluster) => (
              <div 
                key={cluster.id} 
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between min-h-[260px] hover:border-blue-500/30 hover:shadow-md transition-all group duration-350"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-[8.5px] font-bold px-2 py-0.5 rounded-full ${cluster.statusColor}`}>
                      {cluster.status}
                    </span>
                    <span className="text-[9px] text-gray-400 font-semibold">
                      {cluster.timeIndicator}
                    </span>
                  </div>

                  <button 
                    onClick={() => { setSelectedCluster(cluster); setActiveDetailTab("latest"); }}
                    className="font-display text-sm font-extrabold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors text-left focus:outline-none font-bold"
                  >
                    {cluster.title}
                  </button>

                  <p className="text-[11px] text-gray-500 dark:text-gray-450 leading-relaxed font-normal">
                    {cluster.explanation}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-850 mt-4 space-y-3">
                  {/* Grid for counts */}
                  <div className="grid grid-cols-4 gap-2 text-[10px] text-gray-500 dark:text-gray-450 font-semibold border-b border-gray-50 dark:border-gray-850 pb-2">
                    <div className="text-center bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-lg">
                      <span className="font-extrabold text-gray-900 dark:text-white block">{cluster.articlesCount}</span>
                      <span className="text-[8px] text-gray-400 block font-normal">Articles</span>
                    </div>
                    <div className="text-center bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-lg">
                      <span className="font-extrabold text-gray-900 dark:text-white block">{cluster.companiesCount}</span>
                      <span className="text-[8px] text-gray-400 block font-normal">Companies</span>
                    </div>
                    <div className="text-center bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-lg">
                      <span className="font-extrabold text-gray-900 dark:text-white block">{cluster.countriesCount}</span>
                      <span className="text-[8px] text-gray-400 block font-normal">Countries</span>
                    </div>
                    <div className="text-center bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-lg">
                      <span className="font-extrabold text-gray-900 dark:text-white block">{cluster.sectorsCount}</span>
                      <span className="text-[8px] text-gray-400 block font-normal">Sectors</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10.5px]">
                    <span className="font-bold text-blue-500 dark:text-blue-400">
                      Momentum ↑ {cluster.momentum}
                    </span>
                    <button 
                      onClick={() => { setSelectedCluster(cluster); setActiveDetailTab("latest"); }}
                      className="text-[9px] font-extrabold text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-wider group-hover:text-blue-500"
                    >
                      OPEN TREND →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Momentum Dashboard fold */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight">
              Sector Momentum Dashboard
            </h3>
            <button className="text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-wider">
              View full dashboard →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Momentum Overview (SVG Donut) */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Momentum Overview</span>
              <div className="flex items-center gap-4">
                <svg className="w-20 h-20" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="62 38" strokeDashoffset="25" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="21 79" strokeDashoffset="63" />
                </svg>
                <div className="text-[10px] space-y-1 font-semibold">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Rising: 62%</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Stable: 21%</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" /> Slowing: 11%</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Declining: 6%</div>
                </div>
              </div>
            </div>

            {/* Card 2: Top Gainers */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 dark:border-gray-855 pb-2">Top Gainers</span>
              <div className="space-y-2 text-xs font-semibold flex-1 pt-2">
                {[
                  { name: "EV & Energy", count: "▲ 320%" },
                  { name: "Semiconductors", count: "▲ 240%" },
                  { name: "Logistics", count: "▲ 180%" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-emerald-500 font-bold">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                    <span>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Top Losers */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 dark:border-gray-855 pb-2">Top Losers</span>
              <div className="space-y-2 text-xs font-semibold flex-1 pt-2">
                {[
                  { name: "Textile", count: "▼ 32%" },
                  { name: "Metals", count: "▼ 28%" },
                  { name: "Coal", count: "▼ 18%" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-red-500 font-bold">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                    <span>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Heatmap grid */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Heatmap Grid</span>
              <div className="grid grid-cols-5 gap-2 flex-1 pt-1">
                {[
                  "bg-emerald-500", "bg-emerald-600", "bg-blue-500", "bg-orange-500", "bg-red-500",
                  "bg-emerald-400", "bg-emerald-500", "bg-blue-400", "bg-orange-400", "bg-red-405",
                  "bg-emerald-500", "bg-emerald-600", "bg-blue-500", "bg-orange-500", "bg-red-500"
                ].slice(0, 15).map((color, idx) => (
                  <div key={idx} className={`h-6 rounded-xs ${color}`} />
                ))}
              </div>
              <div className="flex justify-between text-[8px] text-gray-450 uppercase pt-2">
                <span>Low Momentum</span>
                <span>High Momentum</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Predictive Trends fold */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 space-y-6">
          <div className="flex justify-between items-center pb-2">
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight">
              Predictive Trends
            </h3>
            <button className="text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-wider">
              VIEW ALL
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { type: "EMERGING", title: "Quantum Logistics", desc: "AI models predict a 400% efficiency gain in route optimization via quantum computing pilots starting Q4.", strength: "High (0.89)", time: "6-12 Months" },
              { type: "UPCOMING", title: "Smart Wearables", desc: "The integration of AI in wearable devices is projected to revolutionize health monitoring with real-time data analysis by 2026.", strength: "High (0.88)", time: "24-36 Months" },
              { type: "PROMISING", title: "Biodegradable Plastics", desc: "Innovations in plant-based polymers are set to replace conventional plastics, gaining traction among major retailers by 2025.", strength: "Med-High (0.75)", time: "12-18 Months" },
              { type: "STEADY RISE", title: "Circular Manufacturing", desc: "New cross-border recycling protocols are driving investment in reusable heavy industrial components.", strength: "Med (0.64)", time: "18-24 Months" },
              { type: "BREAKTHROUGH", title: "Augmented Reality in Retail", desc: "Immersive AR shopping experiences are expected to transform consumer engagement, with widespread implementation by 2025.", strength: "High (0.85)", time: "12-24 Months" },
              { type: "RISING STAR", title: "Blockchain for Supply Chain", desc: "Adoption of blockchain technology enhances transparency and traceability, with significant uptake expected by 2024.", strength: "High (0.82)", time: "12-24 Months" }
            ].map((pTrend, idx) => (
              <div key={idx} className="bg-slate-950 text-white border border-slate-900 p-5 rounded-2xl shadow-xs flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                      {pTrend.type}
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-blue-450" />
                  </div>
                  <h4 className="font-display text-xs font-bold leading-snug">{pTrend.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-normal">{pTrend.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3 mt-4 text-[10px]">
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase">Signal Strength</span>
                    <span className="font-bold text-white block mt-0.5">{pTrend.strength}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase">Time Horizon</span>
                    <span className="font-bold text-[#FEC970] block mt-0.5">{pTrend.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-lg shadow-lg text-xs font-bold transition-all">
          {toastMsg}
        </div>
      )}

    </div>
  );
}

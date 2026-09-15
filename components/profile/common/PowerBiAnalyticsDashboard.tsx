"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  RefreshCw,
  Globe2,
  Building2,
  Users2,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Search,
  ChevronDown,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  SlidersHorizontal,
  Maximize2,
  ExternalLink,
  PieChart as PieIcon,
  HelpCircle,
  Activity,
} from "lucide-react";

interface PowerBiAnalyticsProps {
  userRole?: "sme" | "associate-sme";
  currentTier?: "free" | "pro" | "elite" | "sovereign";
  customTitle?: string;
}

export default function PowerBiAnalyticsDashboard({
  userRole = "associate-sme",
  currentTier = "pro",
  customTitle = "Enterprise Readership & Institutional Telemetry",
}: PowerBiAnalyticsProps) {
  // Slicer States (Power BI Filters)
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "ytd">("30d");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedMetricView, setSelectedMetricView] = useState<"impressions" | "duration" | "downloads">("impressions");
  const [activeTab, setActiveTab] = useState<"executive" | "demographics" | "institutional" | "ai_insights">("executive");
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);
  const [searchEntity, setSearchEntity] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Time multipliers for realistic dynamic data adjustments
  const multiplier = useMemo(() => {
    switch (timeRange) {
      case "7d":
        return 0.32;
      case "30d":
        return 1.0;
      case "90d":
        return 2.85;
      case "ytd":
        return 6.4;
      default:
        return 1.0;
    }
  }, [timeRange]);

  // Dynamic Calculated Metrics
  const baseImpressions = Math.round(52480 * multiplier);
  const readThroughRate = (71.8 + (timeRange === "7d" ? 1.4 : -0.8)).toFixed(1);
  const institutionalCount = Math.round(14200 * multiplier);
  const policyDownloads = Math.round(1840 * multiplier);
  const authorityScore = 96.2;

  // Chart Data Points (30-day timeline simulation)
  const trendData = useMemo(() => {
    const dates = [
      "Aug 10", "Aug 14", "Aug 18", "Aug 22", "Aug 26", "Aug 30",
      "Sep 03", "Sep 05", "Sep 07", "Sep 08"
    ];
    return dates.map((date, index) => {
      const impressions = Math.round((1400 + index * 420 + (index % 2 === 0 ? 300 : -150)) * multiplier);
      const reads = Math.round(impressions * (0.68 + (index % 3) * 0.03));
      const durationSec = 220 + index * 12 + (index % 2 === 0 ? 30 : -20);
      const downloads = Math.round((45 + index * 22 + (index % 2 === 0 ? 15 : -8)) * multiplier);

      return {
        date,
        impressions,
        reads,
        durationMinutes: (durationSec / 60).toFixed(1),
        downloads,
      };
    });
  }, [multiplier]);

  // Institutional Reverse-IP Log
  const institutionalVisitors = [
    {
      name: "Ministry of Commerce & Industry",
      type: "Government Policy & Trade",
      location: "New Delhi, India",
      countryFlag: "IN",
      sessions: Math.round(28 * multiplier),
      avgDuration: "6m 42s",
      downloads: Math.round(16 * multiplier),
      intentScore: "Very High",
      intentColor: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      topArticle: "ASEAN-India EV Supply Chain Convergence",
    },
    {
      name: "McKinsey Global Institute",
      type: "Strategic Advisory & Analytics",
      location: "London, United Kingdom",
      countryFlag: "UK",
      sessions: Math.round(44 * multiplier),
      avgDuration: "5m 18s",
      downloads: Math.round(24 * multiplier),
      intentScore: "Very High",
      intentColor: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      topArticle: "Critical Mineral Corridor Strategy 2026",
    },
    {
      name: "Temasek Holdings",
      type: "Sovereign Wealth Fund",
      location: "Singapore",
      countryFlag: "SG",
      sessions: Math.round(22 * multiplier),
      avgDuration: "4m 50s",
      downloads: Math.round(11 * multiplier),
      intentScore: "High",
      intentColor: "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
      topArticle: "Semiconductor Ecosystems & CEPA Trade",
    },
    {
      name: "Adani Green Energy Ltd",
      type: "Renewables & Infrastructure",
      location: "Ahmedabad, India",
      countryFlag: "IN",
      sessions: Math.round(38 * multiplier),
      avgDuration: "5m 30s",
      downloads: Math.round(19 * multiplier),
      intentScore: "Very High",
      intentColor: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      topArticle: "Cross-Border Renewable Tariff Frameworks",
    },
    {
      name: "Goldman Sachs Asset Management",
      type: "Global Investment Banking",
      location: "New York / Singapore",
      countryFlag: "US",
      sessions: Math.round(31 * multiplier),
      avgDuration: "4m 12s",
      downloads: Math.round(14 * multiplier),
      intentScore: "High",
      intentColor: "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
      topArticle: "Bilateral Trade Deficits & Sovereign Bonds",
    },
    {
      name: "NITI Aayog Trade & Policy Cell",
      type: "Economic Think Tank",
      location: "New Delhi, India",
      countryFlag: "IN",
      sessions: Math.round(26 * multiplier),
      avgDuration: "7m 15s",
      downloads: Math.round(18 * multiplier),
      intentScore: "Very High",
      intentColor: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      topArticle: "ASEAN-India EV Supply Chain Convergence",
    },
  ];

  const filteredEntities = institutionalVisitors.filter(
    (e) =>
      e.name.toLowerCase().includes(searchEntity.toLowerCase()) ||
      e.type.toLowerCase().includes(searchEntity.toLowerCase()) ||
      e.location.toLowerCase().includes(searchEntity.toLowerCase())
  );

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* POWER BI EMBEDDED BAR & HEADER */}
      <div className="bg-[#111827] text-white rounded-2xl p-4 md:p-5 shadow-lg border border-slate-700 relative overflow-hidden">
        {/* PowerBI Top Ribbon */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-slate-950 font-black text-sm">
              PBI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight">{customTitle}</h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Fabric Stream
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Power BI Enterprise Semantic Model · DirectQuery Connected · Refresh: Every 10s
              </p>
            </div>
          </div>

          {/* Quick Actions / Export */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setTimeRange("30d");
                setSelectedSector("all");
                setSelectedRegion("all");
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Slicers</span>
            </button>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>{isExporting ? "Compiling PBIX..." : "Export Report (CSV/PBIX)"}</span>
            </button>
          </div>
        </div>

        {/* Success Alert on Export */}
        {exportSuccess && (
          <div className="mt-3 p-3 bg-emerald-950/80 border border-emerald-600/60 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Telemetry dataset compiled successfully! Downloaded <strong>IGENews_SME_Telemetry_Q3.csv</strong> for Power BI desktop analysis.</span>
          </div>
        )}

        {/* INTERACTIVE SLICERS BAR (Power BI Slicers Row) */}
        <div className="mt-4 pt-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Slicer 1: Time Horizon */}
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" /> Time Horizon
            </span>
            <div className="grid grid-cols-2 gap-1">
              {[
                { id: "7d", label: "7 Days" },
                { id: "30d", label: "30 Days" },
                { id: "90d", label: "90 Days" },
                { id: "ytd", label: "YTD '26" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeRange(t.id as any)}
                  className={`py-1 px-1.5 rounded-md text-[11px] font-medium text-center transition-all ${
                    timeRange === t.id
                      ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slicer 2: Sector Domain */}
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" /> Sector Filter
            </span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              aria-label="Filter telemetry by industry sector"
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-1.5 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none"
            >
              <option value="all">All Trade Sectors</option>
              <option value="clean_energy">Clean Energy & EV</option>
              <option value="cross_border">Cross-Border Trade & CEPA</option>
              <option value="semiconductors">Semiconductors & DeepTech</option>
              <option value="sovereign_wealth">Sovereign Funds & Banking</option>
            </select>
          </div>

          {/* Slicer 3: Regional Corridor */}
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
              <Globe2 className="w-3 h-3 text-amber-400" /> Geography
            </span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              aria-label="Filter telemetry by geographic corridor"
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-1.5 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none"
            >
              <option value="all">Global Corridors</option>
              <option value="in">India & South Asia</option>
              <option value="asean">Southeast Asia (ASEAN)</option>
              <option value="gcc">GCC & Middle East</option>
              <option value="eu_na">Europe & North America</option>
            </select>
          </div>

          {/* Slicer 4: Visualization View */}
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-amber-400" /> Focus View
            </span>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveTab("executive")}
                className={`py-1 px-1 rounded-md text-[10px] font-medium text-center transition-all ${
                  activeTab === "executive" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                Executive
              </button>
              <button
                onClick={() => setActiveTab("institutional")}
                className={`py-1 px-1 rounded-md text-[10px] font-medium text-center transition-all ${
                  activeTab === "institutional" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                Reverse-IP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TOP POWER BI SCORECARD KPI TILES (5 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* KPI 1: Verified Readership */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs hover:border-amber-400/50 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold">Verified Reads</span>
              <Activity className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {baseImpressions.toLocaleString()}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-bold">▲ +28.4%</span>
            <span className="text-slate-400">Target: 45,000</span>
          </div>
        </div>

        {/* KPI 2: Read Completion Rate */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs hover:border-blue-400/50 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold">Read Completion</span>
              <Clock className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {readThroughRate}%
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-bold">▲ +5.2% MoM</span>
            <span className="text-slate-400">Avg: 4m 26s</span>
          </div>
        </div>

        {/* KPI 3: Institutional Reach */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs hover:border-emerald-400/50 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold">Enterprise Reach</span>
              <Building2 className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {institutionalCount.toLocaleString()}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 font-bold">78.4% C-Suite</span>
            <span className="text-slate-400">Fortune 500</span>
          </div>
        </div>

        {/* KPI 4: Policy Downloads */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs hover:border-purple-400/50 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold">PDF Reports</span>
              <FileText className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {policyDownloads.toLocaleString()}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-purple-600 font-bold">▲ +42.1% Q3</span>
            <span className="text-slate-400">Trade briefs</span>
          </div>
        </div>

        {/* KPI 5: Authority Index */}
        <div className="col-span-2 md:col-span-1 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs hover:border-amber-400/50 transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold">Authority Index</span>
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {authorityScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-amber-600 dark:text-amber-400 font-bold">Top 1% Decile</span>
            <span className="text-slate-400">#3 in CEPA</span>
          </div>
        </div>
      </div>

      {/* MAIN POWER BI CHART CANVAS & SIDE DONUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual 1: Multi-Series Area & Spline Trend Visual (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                  Readership Volume & Conversion Velocity
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Multi-metric spline rendering impressions vs verified deep reads.
              </p>
            </div>

            {/* Metric Slicer Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl">
              {[
                { id: "impressions", label: "Impressions" },
                { id: "duration", label: "Read Time" },
                { id: "downloads", label: "Downloads" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMetricView(m.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedMetricView === m.id
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Power BI Trend Visual */}
          <div className="h-60 w-full relative mt-2">
            <svg className="w-full h-full" viewBox="0 0 700 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pbiGradAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="pbiGradBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="4" />
              <line x1="0" y1="100" x2="700" y2="100" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="4" />
              <line x1="0" y1="160" x2="700" y2="160" stroke="#94a3b8" strokeOpacity="0.15" strokeDasharray="4" />

              {/* Benchmark Target Line */}
              <path
                d="M 0 130 L 700 70"
                fill="none"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="6"
                strokeOpacity="0.4"
              />

              {/* Area 1: Total Impressions */}
              <path
                d="M 0 180 Q 70 150 140 160 T 280 110 T 420 80 T 560 50 T 700 25 L 700 220 L 0 220 Z"
                fill="url(#pbiGradAmber)"
              />
              <path
                d="M 0 180 Q 70 150 140 160 T 280 110 T 420 80 T 560 50 T 700 25"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
              />

              {/* Area 2: Verified Deep Reads */}
              <path
                d="M 0 200 Q 70 180 140 185 T 280 145 T 420 120 T 560 90 T 700 65 L 700 220 L 0 220 Z"
                fill="url(#pbiGradBlue)"
              />
              <path
                d="M 0 200 Q 70 180 140 185 T 280 145 T 420 120 T 560 90 T 700 65"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
              />

              {/* Data Points */}
              {trendData.map((d, i) => {
                const cx = (i / (trendData.length - 1)) * 680 + 10;
                const cy = 180 - i * 16 - (i % 2 === 0 ? 10 : -5);
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={hoveredDataPoint === i ? 6 : 3.5}
                    className="fill-amber-500 stroke-white dark:stroke-slate-900 stroke-2 cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredDataPoint(i)}
                    onMouseLeave={() => setHoveredDataPoint(null)}
                  />
                );
              })}
            </svg>

            {/* Hover Tooltip Box */}
            {hoveredDataPoint !== null && (
              <div
                className="absolute -top-1 bg-slate-900 text-white text-[11px] p-2.5 rounded-xl border border-slate-700 shadow-xl pointer-events-none z-10 space-y-1"
                style={{
                  left: `${(hoveredDataPoint / (trendData.length - 1)) * 80 + 5}%`,
                }}
              >
                <span className="font-bold text-amber-400 block">{trendData[hoveredDataPoint].date}</span>
                <div className="flex items-center justify-between gap-3 text-slate-300">
                  <span>Impressions:</span>
                  <span className="font-bold text-white">{trendData[hoveredDataPoint].impressions.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-slate-300">
                  <span>Deep Reads:</span>
                  <span className="font-bold text-blue-400">{trendData[hoveredDataPoint].reads.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-slate-300">
                  <span>Avg Duration:</span>
                  <span className="font-bold text-emerald-400">{trendData[hoveredDataPoint].durationMinutes}m</span>
                </div>
              </div>
            )}
          </div>

          {/* Timeline Date labels and Legend */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full bg-amber-500" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">Total Impressions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full bg-blue-500" />
                <span className="text-slate-600 dark:text-slate-300 font-medium">Verified Reads (71.8%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-slate-400" />
                <span className="text-slate-400">Q3 Target Path</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] text-slate-400 font-medium">
              <span>Aug 10</span>
              <span>Aug 22</span>
              <span>Sep 01</span>
              <span>Sep 08</span>
            </div>
          </div>
        </div>

        {/* Visual 2: Seniority Donut Visual (1 Col) */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-500" />
                <span>Reader Seniority Breakdown</span>
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">PowerBI Donut</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Hierarchy distribution of verified LinkedIn & IGENews authenticated visitors.
            </p>

            {/* Custom SVG Donut */}
            <div className="flex items-center justify-center my-2 relative">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
                {/* Segment 1: C-Suite & Board 38% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="14"
                  strokeDasharray="95.5 251.2"
                  strokeDashoffset="0"
                />
                {/* Segment 2: VP & Director 32% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="14"
                  strokeDasharray="80.4 251.2"
                  strokeDashoffset="-95.5"
                />
                {/* Segment 3: Senior Policy Analysts 20% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="14"
                  strokeDasharray="50.2 251.2"
                  strokeDashoffset="-175.9"
                />
                {/* Segment 4: Associates 10% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#8b5cf6"
                  strokeWidth="14"
                  strokeDasharray="25.1 251.2"
                  strokeDashoffset="-226.1"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-slate-900 dark:text-white">70%</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Leadership</span>
              </div>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="space-y-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            {[
              { label: "C-Suite, MD & Board", pct: "38%", color: "bg-amber-500", desc: "19.9k readers" },
              { label: "Vice Presidents & Practice Heads", pct: "32%", color: "bg-blue-500", desc: "16.8k readers" },
              { label: "Lead Policy Analysts & Economists", pct: "20%", color: "bg-emerald-500", desc: "10.5k readers" },
              { label: "Research Associates & Managers", pct: "10%", color: "bg-purple-500", desc: "5.2k readers" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-sm ${row.color}`} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{row.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{row.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HORIZONTAL STACKED BARS (SECTORS & GEOGRAPHIES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual 3: Sector Engagement Matrix */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Industry Sector Penetration</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Enterprise read volume by industrial taxonomy.</p>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-500">
              Taxonomy Match
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            {[
              { name: "Clean Energy, Battery Storage & EV", pct: 44, value: "23.1k", color: "from-amber-500 to-amber-600" },
              { name: "Cross-Border Trade, Customs & CEPA", pct: 26, value: "13.6k", color: "from-blue-500 to-blue-600" },
              { name: "Semiconductors & DeepTech Fab Hubs", pct: 18, value: "9.4k", color: "from-emerald-500 to-emerald-600" },
              { name: "Sovereign Wealth, Banking & ESG Debt", pct: 12, value: "6.3k", color: "from-purple-500 to-purple-600" },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium text-[11px]">
                  <span>{s.name}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{s.pct}% ({s.value})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-500`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual 4: Geographic Corridors Matrix */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Geographic Reading Corridors</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Institutional sessions across trade hubs.</p>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-500">
              IP Verified
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            {[
              { region: "India & South Asia (Mumbai, Delhi, BLR)", pct: 58, value: "30.4k", flag: "🇮🇳" },
              { region: "Southeast Asia (Singapore, Jakarta, KL)", pct: 22, value: "11.5k", flag: "🇸🇬" },
              { region: "GCC & Middle East (Dubai, Riyadh)", pct: 12, value: "6.3k", flag: "🇦🇪" },
              { region: "Europe & NA (London, Frankfurt, NY)", pct: 8, value: "4.2k", flag: "🇬🇧" },
            ].map((g, i) => (
              <div key={i}>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span>{g.flag}</span>
                    <span>{g.region}</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{g.pct}% ({g.value})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-slate-800 dark:bg-slate-200 transition-all duration-500"
                    style={{ width: `${g.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POWER BI MATRIX TABLE: REVERSE-IP INSTITUTIONAL TRAFFIC */}
      <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                Institutional Reverse-IP Traffic Matrix
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified corporate entities, government departments, and consulting practices accessing your research.
            </p>
          </div>

          {/* Search bar inside table */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchEntity}
              onChange={(e) => setSearchEntity(e.target.value)}
              placeholder="Filter by organization or location..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">Organization</th>
                <th className="pb-3 font-semibold">Vertical Category</th>
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold text-center">Sessions</th>
                <th className="pb-3 font-semibold text-center">Avg Time</th>
                <th className="pb-3 font-semibold text-center">PDFs Saved</th>
                <th className="pb-3 font-semibold text-right">Intent Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredEntities.map((entity, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-amber-500">
                        {entity.countryFlag}
                      </span>
                      <span>{entity.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5 ml-8">
                      Top Read: {entity.topArticle}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-slate-600 dark:text-slate-300 font-medium">{entity.type}</td>
                  <td className="py-3.5 pr-4 text-slate-500 dark:text-slate-400">{entity.location}</td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-900 dark:text-white">
                    {entity.sessions}
                  </td>
                  <td className="py-3.5 px-3 text-center font-medium text-slate-700 dark:text-slate-300">
                    {entity.avgDuration}
                  </td>
                  <td className="py-3.5 px-3 text-center font-semibold text-purple-600 dark:text-purple-400">
                    {entity.downloads}
                  </td>
                  <td className="py-3.5 pl-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${entity.intentColor}`}
                    >
                      {entity.intentScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* POWER BI SMART NARRATIVE & AI COPILOT INSIGHTS */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 dark:from-[#111c30] dark:via-[#0f172a] dark:to-[#1a1c29] rounded-2xl border border-amber-200/80 dark:border-amber-900/40 p-5 md:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
            Power BI Smart Narrative · AI Policy & Readership Insights
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-3">
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-xl border border-amber-100 dark:border-amber-950/60 shadow-2xs">
            <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">
              High C-Suite Conversion Corridor
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Articles featuring <strong>#CleanEnergy & #CrossBorderTrade</strong> generate 3.4x higher repeat visits from ASEAN Sovereign funds and GCC Ministries.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-xl border border-amber-100 dark:border-amber-950/60 shadow-2xs">
            <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">
              PDF Whitepaper Impact
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Downloadable trade reports increase reader session engagement by <strong>+180 seconds</strong> compared to standard articles, driving institutional bookmarking.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-xl border border-amber-100 dark:border-amber-950/60 shadow-2xs">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
              Peak Strategic Reading Window
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Maximum executive engagement occurs on <strong>Tuesday & Thursday mornings (08:30 - 11:30 IST)</strong>, aligning with corporate briefing routines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

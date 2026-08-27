"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  FileText,
  Lock,
  Scale,
  Mail,
  ShieldCheck,
  CheckCircle,
  ChevronRight,
  Plus,
  Bookmark,
  Sparkles,
  Layers,
  Star,
  Download,
  AlertCircle,
  Database,
  Briefcase,
  HelpCircle,
  Cpu,
  BarChart2,
  DollarSign,
  Activity,
  Award,
  Crown
} from "lucide-react";

// Mock reports database
const REPORTS_DATABASE = [
  {
    id: "rep-1",
    code: "REP-SEM-46",
    title: "Global Semiconductor OSAT Substrate Supply & Capex Analysis",
    sector: "Semiconductors",
    type: "Market Research",
    geography: "Global",
    published: "June 2026",
    updated: "Updated August 2026",
    rating: "4.9 ★",
    downloads: 1890,
    price: "$249",
    rawPrice: 249,
    pages: "84 pages",
    format: "PDF + Excel Datapack",
    forecastPeriod: "2026–2031",
    summary: "Comprehensive capex allocation telemetry tracking packaging substrate scaling across India's OSAT hubs, comparing domestic manufacturing yields against traditional East Asian supply nodes.",
    findings: [
      "Advanced glass packaging units command a 12% yield margin advantage relative to legacy FR4 substrate layers.",
      "Tamil Nadu's OSAT footprint projects to capture 8% of global high-density interconnect routing by Q4 2027.",
      "Capex reallocations from SEA corridors show high correlation with MeitY semiconductor subsidy milestones."
    ]
  },
  {
    id: "rep-2",
    code: "REP-AI-02",
    title: "2026 Sovereign AI Infrastructure & Enterprise Datacenter Report",
    sector: "AI & Cyber Security",
    type: "Technology",
    geography: "APAC",
    published: "July 2026",
    updated: "Updated July 2026",
    rating: "4.9 ★",
    downloads: 1420,
    price: "$299",
    rawPrice: 299,
    pages: "96 pages",
    format: "PDF + Dashboard Access",
    forecastPeriod: "2026–2030",
    summary: "An in-depth study of regional sovereign LLM parameters, infrastructure subsidies, cloud regulations, and enterprise edge node scaling.",
    findings: [
      "Sovereign data residency mandates drive a 34% increase in local private cloud deployments across Tier-2 cities.",
      "Hardware latency optimization at the edge reduces compute operational costs by 22% compared to central cloud arrays."
    ]
  },
  {
    id: "rep-3",
    code: "REP-ENG-17",
    title: "India Green Hydrogen Maritime Export Corridors & LCOH Outlook",
    sector: "Energy & Sustainability",
    type: "Trade Intelligence",
    geography: "Global",
    published: "July 2026",
    updated: "Updated August 2026",
    rating: "4.8 ★",
    downloads: 1150,
    price: "$199",
    rawPrice: 199,
    pages: "62 pages",
    format: "PDF",
    forecastPeriod: "2026–2032",
    summary: "Bilateral trade corridors mapping clean bunkering hubs, levelized hydrogen export tariffs, and maritime off-take compliance models.",
    findings: [
      "Gujarat bunkering hubs maintain a levelized cost of hydrogen (LCOH) yield premium over Middle East export alternatives.",
      "Bilateral off-take agreements with EU ports indicate accelerated capital reallocations ahead of carbon tariff enforcement."
    ]
  },
  {
    id: "rep-4",
    code: "REP-AUTO-45",
    title: "High-Voltage SiC Inverters Sourcing & Production Audit",
    sector: "Automotive & Electric Vehicles",
    type: "Competitive Intelligence",
    geography: "EMEA",
    published: "May 2026",
    updated: "Updated June 2026",
    rating: "4.7 ★",
    downloads: 860,
    price: "$149",
    rawPrice: 149,
    pages: "50 pages",
    format: "PDF",
    forecastPeriod: "2026–2029",
    summary: "Competitive benchmarking of tier-1 automotive silicon carbide packaging, evaluating assembly yields, domestic localization rates, and EU export margins.",
    findings: [
      "800V drivetrain localized assemblies command a 15% pricing leverage advantage inside European fleets.",
      "Sourcing dependencies for raw wafer substrates show shift towards Nordic chemical synthesis partnerships."
    ]
  }
];

const COMPARE_SECTORS_DATABASE: Record<string, {
  name: string;
  initials: string;
  growth: string;
  industries: string;
  ministry: string;
  corridors: string;
  fdiOutlook: string;
  riskIndex: string;
}> = {
  "Semiconductors": {
    name: "Semiconductors",
    initials: "SEM",
    growth: "+38.2% YoY",
    industries: "26 Industries",
    ministry: "Min of Electronics & IT",
    corridors: "India-Taiwan, India-US, India-Japan",
    fdiOutlook: "Very High ($15B CapEx Pipeline)",
    riskIndex: "Medium (Supply Chain Constraints)"
  },
  "AI & Cyber Security": {
    name: "AI & Cyber Security",
    initials: "AIC",
    growth: "+34.1% YoY",
    industries: "30 Industries",
    ministry: "Min of Electronics & IT",
    corridors: "Global Corridors, India-US",
    fdiOutlook: "High ($8B Infrastructure Projects)",
    riskIndex: "Low (High Tech Adoption Rate)"
  },
  "Energy & Sustainability": {
    name: "Energy & Sustainability",
    initials: "ENG",
    growth: "+31.0% YoY",
    industries: "28 Industries",
    ministry: "Min of New & Renewable Energy",
    corridors: "India-EU, India-Gulf Corridors",
    fdiOutlook: "Very High ($22B Green Bonds)",
    riskIndex: "Low-Medium (Policy Subsidies)"
  },
  "Automotive & Electric Vehicles": {
    name: "Automotive & Electric Vehicles",
    initials: "EV",
    growth: "+24.3% YoY",
    industries: "26 Industries",
    ministry: "Min of Heavy Industries",
    corridors: "India-Germany, India-South Korea",
    fdiOutlook: "High ($12B Localization)",
    riskIndex: "Medium (Raw Material Sourcing)"
  },
  "Agriculture & Farmers Welfare": {
    name: "Agriculture & Farmers Welfare",
    initials: "AGR",
    growth: "+14.2% YoY",
    industries: "28 Industries",
    ministry: "Min of Agriculture & Welfare",
    corridors: "India-ASEAN, India-Middle East",
    fdiOutlook: "Medium ($4.5B Agritech Inflow)",
    riskIndex: "Medium-High (Climate Interventions)"
  }
};

export default function NewsPOCSectorIntelligenceView({ view }: { view?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedGeography, setSelectedGeography] = useState("All");
  
  // Compare Sectors State
  const [compareSectorA, setCompareSectorA] = useState("Semiconductors");
  const [compareSectorB, setCompareSectorB] = useState("AI & Cyber Security");
  const [compareSectorC, setCompareSectorC] = useState("Energy & Sustainability");
  const [showSectorComparison, setShowSectorComparison] = useState(false);

  useEffect(() => {
    if (view === "compare") {
      setShowSectorComparison(true);
      setTimeout(() => {
        const el = document.getElementById("compare-sectors-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [view]);

  // Report comparison state
  const [compareList, setCompareList] = useState<string[]>([]);
  
  // Active detail preview modal
  const [previewReportId, setPreviewReportId] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<"summary" | "findings" | "methodology">("summary");
  
  // Alerts
  const [alertSector, setAlertSector] = useState("Semiconductors");
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Upgrade Modal
  const [proModalOpen, setProModalOpen] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);

  // Lead Generation Form
  const [rfpSubmitted, setRfpSubmitted] = useState(false);
  const [rfpData, setRfpData] = useState({
    name: "",
    company: "",
    email: "",
    requirement: "",
    budget: "$10,000 - $25,000"
  });

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfpSubmitted(true);
    setTimeout(() => {
      setRfpSubmitted(false);
      setRfpData({ name: "", company: "", email: "", requirement: "", budget: "$10,000 - $25,000" });
    }, 3000);
  };

  const handleCompareToggle = (id: string) => {
    setCompareList(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  // Filtered reports list
  const filteredReports = useMemo(() => {
    return REPORTS_DATABASE.filter(rep => {
      const matchSearch = rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rep.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rep.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSector = selectedSector === "All" || rep.sector === selectedSector;
      const matchType = selectedType === "All" || rep.type === selectedType;
      const matchGeo = selectedGeography === "All" || rep.geography === selectedGeography;
      return matchSearch && matchSector && matchType && matchGeo;
    });
  }, [searchQuery, selectedSector, selectedType, selectedGeography]);

  // Selected report objects for comparison
  const comparedReports = useMemo(() => {
    return REPORTS_DATABASE.filter(rep => compareList.includes(rep.id));
  }, [compareList]);

  // Selected report for detailed preview modal
  const activePreviewReport = useMemo(() => {
    return REPORTS_DATABASE.find(rep => rep.id === previewReportId) || null;
  }, [previewReportId]);

  return (
    <div className="space-y-10 pb-16">

      {/* 01. INTELLIGENCE MARKETPLACE HERO */}
      <section className="bg-gradient-to-br from-[#0c0f1d] via-[#151c3a] to-[#080a14] text-white relative overflow-hidden border-b border-gray-805 py-12 rounded-3xl">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] font-mono font-bold bg-blue-600 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
              Research & B2B Marketplace
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Research, Insights & Intelligence for Every Sector
            </h1>
            <p className="text-slate-350 text-xs md:text-sm font-normal leading-relaxed">
              Discover premium market research forecasts, customs trade datasets, sovereign investment intelligence, policy regulatory watch indices, and cross-corridor risk matrices.
            </p>

            {/* Smart Search Bar */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-1 max-w-lg">
              <Search className="h-4.5 w-4.5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports, sectors, codes or topics..."
                className="w-full bg-transparent border-none outline-none py-2 text-xs text-white placeholder-gray-500 font-semibold"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-xs text-gray-400 hover:text-white px-1 font-bold">Clear</button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#catalog" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer">
                Explore Catalog →
              </a>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl max-w-xs space-y-3 shrink-0 backdrop-blur-xs text-xs font-semibold">
            <div className="flex justify-between items-center text-gray-400">
              <span>Bilateral Datapoints</span>
              <span className="text-white font-bold">148,200</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Monthly Downloads</span>
              <span className="text-white font-bold">4.2K Reports</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Analyst Validation</span>
              <span className="text-white font-bold">100% Peer-Reviewed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. SEARCH & SMART FILTERS */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-850 pb-2">
          <Filter className="h-4 w-4 text-blue-600" />
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Smart Marketplace Filters
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Sector Taxonomy</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full text-xs font-bold rounded-xl border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2.5 outline-none text-gray-900 dark:text-white"
            >
              <option value="All">All Sectors</option>
              <option value="Semiconductors">Semiconductors</option>
              <option value="AI & Cyber Security">AI & Cyber Security</option>
              <option value="Energy & Sustainability">Energy & Sustainability</option>
              <option value="Automotive & Electric Vehicles">Automotive & EV</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Report Category</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs font-bold rounded-xl border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2.5 outline-none text-gray-900 dark:text-white"
            >
              <option value="All">All Categories</option>
              <option value="Market Research">Market Research</option>
              <option value="Technology">Technology Research</option>
              <option value="Trade Intelligence">Trade Intelligence</option>
              <option value="Competitive Intelligence">Competitive Intel</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Geography / Region</label>
            <select
              value={selectedGeography}
              onChange={(e) => setSelectedGeography(e.target.value)}
              className="w-full text-xs font-bold rounded-xl border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2.5 outline-none text-gray-900 dark:text-white"
            >
              <option value="All">All Geographies</option>
              <option value="Global">Global Corridors</option>
              <option value="APAC">APAC Corridors</option>
              <option value="EMEA">EMEA Region</option>
            </select>
          </div>
        </div>

        {(selectedSector !== "All" || selectedType !== "All" || selectedGeography !== "All" || searchQuery) && (
          <div className="flex justify-between items-center bg-blue-50/20 dark:bg-blue-955/10 p-3 rounded-xl">
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-blue-600">
              {searchQuery && <span>Search: &quot;{searchQuery}&quot;</span>}
              {selectedSector !== "All" && <span>Sector: {selectedSector}</span>}
              {selectedType !== "All" && <span>Type: {selectedType}</span>}
              {selectedGeography !== "All" && <span>Geo: {selectedGeography}</span>}
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSector("All");
                setSelectedType("All");
                setSelectedGeography("All");
              }}
              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Clear Filters [x]
            </button>
          </div>
        )}
      </section>

      {/* 03 & 04. FEATURED & TRENDING REPORTS */}
      <section id="catalog" className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-850 pb-2">
          <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
            <Award className="h-4.5 w-4.5 text-blue-600" /> Featured Sector Research & Intelligence Reports
          </h2>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{filteredReports.length} Reports Found</span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-850 space-y-2">
            <p className="text-xs text-gray-400 font-bold">No intelligence reports match your active filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSector("All");
                setSelectedType("All");
                setSelectedGeography("All");
              }}
              className="text-[10px] font-bold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReports.map((rep) => {
              const inCompare = compareList.includes(rep.id);
              return (
                <div
                  key={rep.id}
                  className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 hover:border-blue-600 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-mono font-bold bg-blue-50 dark:bg-blue-955/20 text-blue-600 px-2 py-0.5 rounded uppercase">
                        {rep.code}
                      </span>
                      <span className="text-[10px] font-bold text-amber-500">{rep.rating}</span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-955 dark:text-white leading-snug">
                      {rep.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed line-clamp-3">
                      {rep.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2 text-[8px] font-bold text-gray-400">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded uppercase">{rep.sector}</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded uppercase">{rep.geography}</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded uppercase">{rep.pages}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-855 flex justify-between items-center text-xs font-bold">
                    <div className="space-y-0.5">
                      <span className="text-gray-450 text-[9px] block">Price (entitlement)</span>
                      <span className="text-gray-900 dark:text-white font-display font-extrabold">{rep.price}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCompareToggle(rep.id)}
                        className={`text-[10px] border px-3 py-2 rounded-xl transition-all cursor-pointer ${
                          inCompare
                            ? "border-blue-600 bg-blue-50/20 text-blue-600"
                            : "border-gray-250 dark:border-gray-800 text-gray-650 dark:text-gray-400 hover:border-blue-500"
                        }`}
                      >
                        {inCompare ? "Compared ✓" : "Compare"}
                      </button>
                      <button
                        onClick={() => setPreviewReportId(rep.id)}
                        className="bg-gray-100 hover:bg-gray-150 dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-[10px] px-3.5 py-2 rounded-xl"
                      >
                        Preview Brief
                      </button>
                      <Link href="/en/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] px-3.5 py-2 rounded-xl transition-colors">
                        Buy Report
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 07. REPORT COMPARISON GRID */}
      {compareList.length > 0 && (
        <section className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 p-5 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-gray-150 dark:border-gray-850 pb-2">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4.5 w-4.5 text-blue-600" /> Side-by-Side Research Comparison ({compareList.length}/3)
            </h3>
            <button
              onClick={() => setCompareList([])}
              className="text-[10px] font-bold text-blue-600 hover:underline"
            >
              Clear Comparison
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 font-bold text-gray-400">
                  <th className="py-2.5 pr-4">Metrics</th>
                  {comparedReports.map(rep => (
                    <th key={rep.id} className="py-2.5 px-4 font-bold text-gray-900 dark:text-white">{rep.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850 text-gray-650 dark:text-slate-300 font-semibold">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Code</td>
                  {comparedReports.map(rep => (
                    <td key={rep.id} className="py-2.5 px-4 font-mono font-bold text-blue-600">{rep.code}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Sector Group</td>
                  {comparedReports.map(rep => (
                    <td key={rep.id} className="py-2.5 px-4">{rep.sector}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Forecast Period</td>
                  {comparedReports.map(rep => (
                    <td key={rep.id} className="py-2.5 px-4 font-bold text-emerald-600">{rep.forecastPeriod}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Report Format</td>
                  {comparedReports.map(rep => (
                    <td key={rep.id} className="py-2.5 px-4">{rep.format}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Price (Single-user)</td>
                  {comparedReports.map(rep => (
                    <td key={rep.id} className="py-2.5 px-4 font-display font-extrabold text-gray-905 dark:text-white">{rep.price}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 08 & 09. REPORT PREVIEW DETAIL PANEL (INTELLIGENCE SNAPSHOT) */}
      {previewReportId && activePreviewReport && (
        <section className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 p-5 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-gray-150 dark:border-gray-850 pb-2">
            <div>
              <span className="text-[8.5px] font-bold text-emerald-650 uppercase tracking-widest block font-mono">Report Preview Mode</span>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                {activePreviewReport.title}
              </h3>
            </div>
            <button
              onClick={() => setPreviewReportId(null)}
              className="text-gray-450 hover:text-gray-700 text-base font-bold cursor-pointer"
            >
              Close Preview [x]
            </button>
          </div>

          <div className="flex gap-2 border-b border-gray-100 dark:border-gray-850 pb-2 text-[10px] font-bold">
            <button
              onClick={() => setPreviewTab("summary")}
              className={`px-3 py-1.5 rounded-lg ${previewTab === "summary" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-500"}`}
            >
              Executive Summary
            </button>
            <button
              onClick={() => setPreviewTab("findings")}
              className={`px-3 py-1.5 rounded-lg ${previewTab === "findings" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-500"}`}
            >
              Key Findings
            </button>
            <button
              onClick={() => setPreviewTab("methodology")}
              className={`px-3 py-1.5 rounded-lg ${previewTab === "methodology" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-500"}`}
            >
              Methodology & Validation
            </button>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-150 dark:border-gray-855 text-xs text-gray-650 dark:text-slate-300 leading-relaxed font-semibold">
            {previewTab === "summary" && (
              <div className="space-y-3">
                <p>{activePreviewReport.summary}</p>
                <div className="p-3 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg flex justify-between items-center text-[10.5px] font-bold">
                  <span>Want to access full granular supply-chain forecasts? Unlock the premium publication.</span>
                  <Link href="/en/eoi" className="bg-emerald-600 text-white px-3 py-1.5 rounded hover:bg-emerald-700 shrink-0 ml-2">Buy Now</Link>
                </div>
              </div>
            )}
            {previewTab === "findings" && (
              <ul className="list-disc pl-4 space-y-2">
                {activePreviewReport.findings.map((find, idx) => (
                  <li key={idx}>{find}</li>
                ))}
              </ul>
            )}
            {previewTab === "methodology" && (
              <div className="space-y-3">
                <p>Data validated against custom customs manifesting logs, MeitY plant registration databases, and quarterly DPIIT capital inflow filings.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 font-bold text-[10px]">
                  <div>
                    <span className="text-gray-400 block">Research Period</span>
                    <span className="text-gray-900 dark:text-white">Q1 2025 – Q2 2026</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Corridors Analyzed</span>
                    <span className="text-gray-900 dark:text-white">India-Taiwan, India-EU</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Update Cycle</span>
                    <span className="text-gray-900 dark:text-white">Quarterly Telemetry</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Validation Index</span>
                    <span className="text-gray-900 dark:text-white">Peer-Reviewed V3</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── COMPARE SECTORS INTERACTIVE SECTION ─────────────────────────────── */}
      <section id="compare-sectors-section" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 space-y-6">
        <div className="border-b border-gray-150 dark:border-gray-800 pb-3">
          <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="h-4.5 w-4.5 text-[#a855f7]" /> COMPARE SECTOR
          </h3>
          <p className="text-[10px] text-gray-500 mt-1">
            Compare up to three industrial sectors side-by-side across growth metrics, regulatory ministry control, and FDI pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-[9.5px] font-bold text-gray-400 uppercase">Select Sector A</label>
            <select
              value={compareSectorA}
              onChange={(e) => {
                setCompareSectorA(e.target.value);
                setShowSectorComparison(false);
              }}
              className="w-full text-xs font-semibold rounded-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2.5 outline-none text-gray-900 dark:text-white"
            >
              {Object.keys(COMPARE_SECTORS_DATABASE).map(name => (
                <option key={name} value={name}>{COMPARE_SECTORS_DATABASE[name].initials} {name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9.5px] font-bold text-gray-400 uppercase">Select Sector B</label>
            <select
              value={compareSectorB}
              onChange={(e) => {
                setCompareSectorB(e.target.value);
                setShowSectorComparison(false);
              }}
              className="w-full text-xs font-semibold rounded-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2.5 outline-none text-gray-900 dark:text-white"
            >
              {Object.keys(COMPARE_SECTORS_DATABASE).map(name => (
                <option key={name} value={name}>{COMPARE_SECTORS_DATABASE[name].initials} {name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9.5px] font-bold text-gray-400 uppercase">Select Sector C</label>
            <select
              value={compareSectorC}
              onChange={(e) => {
                setCompareSectorC(e.target.value);
                setShowSectorComparison(false);
              }}
              className="w-full text-xs font-semibold rounded-full border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-2.5 outline-none text-gray-900 dark:text-white"
            >
              {Object.keys(COMPARE_SECTORS_DATABASE).map(name => (
                <option key={name} value={name}>{COMPARE_SECTORS_DATABASE[name].initials} {name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowSectorComparison(true)}
            className="bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold text-xs px-6 py-2.5 rounded-full cursor-pointer transition-colors shadow-sm"
          >
            Compare Now
          </button>
        </div>

        {showSectorComparison && (
          <div className="border-t border-gray-150 dark:border-gray-800 pt-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-150 dark:border-gray-800 text-[10px] uppercase text-gray-455 tracking-wider">
                  <th className="py-2.5 pr-4 font-bold">Indicator / Attribute</th>
                  <th className="py-2.5 px-4 font-bold text-[#a855f7]">{compareSectorA}</th>
                  <th className="py-2.5 px-4 font-bold text-purple-650">{compareSectorB}</th>
                  <th className="py-2.5 px-4 font-bold text-purple-750">{compareSectorC}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-semibold text-gray-900 dark:text-white">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Growth Rate (YoY)</td>
                  <td className="py-2.5 px-4 text-emerald-600 font-mono">{COMPARE_SECTORS_DATABASE[compareSectorA]?.growth}</td>
                  <td className="py-2.5 px-4 text-emerald-600 font-mono">{COMPARE_SECTORS_DATABASE[compareSectorB]?.growth}</td>
                  <td className="py-2.5 px-4 text-emerald-600 font-mono">{COMPARE_SECTORS_DATABASE[compareSectorC]?.growth}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Sub-Industries Mapped</td>
                  <td className="py-2.5 px-4 font-mono">{COMPARE_SECTORS_DATABASE[compareSectorA]?.industries}</td>
                  <td className="py-2.5 px-4 font-mono">{COMPARE_SECTORS_DATABASE[compareSectorB]?.industries}</td>
                  <td className="py-2.5 px-4 font-mono">{COMPARE_SECTORS_DATABASE[compareSectorC]?.industries}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Regulatory Ministry</td>
                  <td className="py-2.5 px-4">{COMPARE_SECTORS_DATABASE[compareSectorA]?.ministry}</td>
                  <td className="py-2.5 px-4">{COMPARE_SECTORS_DATABASE[compareSectorB]?.ministry}</td>
                  <td className="py-2.5 px-4">{COMPARE_SECTORS_DATABASE[compareSectorC]?.ministry}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Active Trade Corridors</td>
                  <td className="py-2.5 px-4 text-gray-600 dark:text-gray-300 font-normal leading-normal">{COMPARE_SECTORS_DATABASE[compareSectorA]?.corridors}</td>
                  <td className="py-2.5 px-4 text-gray-600 dark:text-gray-300 font-normal leading-normal">{COMPARE_SECTORS_DATABASE[compareSectorB]?.corridors}</td>
                  <td className="py-2.5 px-4 text-gray-600 dark:text-gray-300 font-normal leading-normal">{COMPARE_SECTORS_DATABASE[compareSectorC]?.corridors}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">FDI / Capex Pipeline</td>
                  <td className="py-2.5 px-4 text-blue-600 font-mono text-[11px] leading-relaxed">{COMPARE_SECTORS_DATABASE[compareSectorA]?.fdiOutlook}</td>
                  <td className="py-2.5 px-4 text-blue-600 font-mono text-[11px] leading-relaxed">{COMPARE_SECTORS_DATABASE[compareSectorB]?.fdiOutlook}</td>
                  <td className="py-2.5 px-4 text-blue-600 font-mono text-[11px] leading-relaxed">{COMPARE_SECTORS_DATABASE[compareSectorC]?.fdiOutlook}</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-gray-400">Risk Profile Index</td>
                  <td className="py-2.5 px-4 text-amber-600">{COMPARE_SECTORS_DATABASE[compareSectorA]?.riskIndex}</td>
                  <td className="py-2.5 px-4 text-amber-600">{COMPARE_SECTORS_DATABASE[compareSectorB]?.riskIndex}</td>
                  <td className="py-2.5 px-4 text-amber-600">{COMPARE_SECTORS_DATABASE[compareSectorC]?.riskIndex}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 13 & 14. RELATED RESEARCH & ALERTS */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-850 pb-3">
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="h-4.5 w-4.5 text-blue-600" /> Research Alerts & Topic Watch Scheduling
          </h3>

          <div className="flex gap-2">
            <select
              value={alertSector}
              onChange={(e) => setAlertSector(e.target.value)}
              className="text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-805 bg-white dark:bg-gray-950 px-2.5 py-1.5 outline-none text-gray-900 dark:text-white"
            >
              <option value="Semiconductors">Semiconductors</option>
              <option value="AI & Cyber Security">AI & Cyber Security</option>
              <option value="Energy & Sustainability">Energy & Sustainability</option>
            </select>
            <button
              onClick={() => {
                setAlertSuccess(true);
                setTimeout(() => setAlertSuccess(false), 3000);
              }}
              className="bg-blue-650 hover:bg-blue-755 text-white font-bold text-[10.5px] px-3.5 py-1.5 rounded-lg cursor-pointer"
            >
              Enable Alerts
            </button>
          </div>
        </div>

        {alertSuccess ? (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-955/20 border-l-4 border-emerald-500 rounded-r-lg text-emerald-600 font-bold text-xs">
            Alert enabled! You will be notified when new {alertSector} reports are published.
          </div>
        ) : (
          <p className="text-xs text-gray-450 leading-relaxed font-semibold">
            Subscribe to real-time custom notification briefs monitoring newly registered capacity studies, semiconductor OSAT datasets updates, or green hydrogen off-take agreements.
          </p>
        )}
      </section>

      {/* 15. INTELLIGENCE NEWSLETTER */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-1">
          <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider">Sector Intelligence Briefing</h3>
          <p className="text-xs text-gray-550 leading-normal font-semibold">
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl"
          >
            Subscribe
          </button>
        </div>
      </section>

      {/* 16. PRO / ENTERPRISE UPGRADE CTA */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-blue-500/5 dark:from-[#0f172a] dark:to-blue-955/10">
        <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Unlock Premium Sector Intelligence</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-355">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-850 space-y-3">
            <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">FREE</h4>
            <ul className="space-y-1.5 font-semibold text-gray-550 dark:text-gray-300">
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> Report discovery</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> Executive summary briefs</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> Basic sector snapshots</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border-2 border-blue-555 bg-blue-50/10 dark:bg-blue-955/5 space-y-3 relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase">Most Popular</span>
            <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">PRO</h4>
            <ul className="space-y-1.5 font-semibold text-gray-555 dark:text-gray-300">
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> Full premium reports access</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> AI-powered forecasts</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> Advanced data tables downloads</li>
            </ul>
            <button
              onClick={() => setProModalOpen(true)}
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Upgrade to Pro
            </button>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-855 space-y-3">
            <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">ENTERPRISE</h4>
            <ul className="space-y-1.5 font-semibold text-gray-555 dark:text-gray-300">
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> Custom target research</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> C-suite advisory briefings</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-500" /> Dedicated analyst support</li>
            </ul>
            <a
              href="#custom-rfp"
              className="block text-center w-full bg-slate-900 hover:bg-slate-955 text-white font-bold text-xs py-2 rounded-xl transition-all"
            >
              Explore Enterprise
            </a>
          </div>
        </div>
      </section>

      {/* --- PRO UPGRADE MODAL --- */}
      {proModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-amber-505 animate-bounce" /> Upgrade to Pro Research
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
                  Thank you! Your pro research catalog trial is now active. You have full access to premium report datapacks and forecasts.
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
                  Unlock the full global sector and sub-industry research store containing plant capacity benchmarks, customs datasets, and model forecasts.
                </p>
                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-blue-650 uppercase tracking-widest text-[9px]">Included Entitlements</h5>
                  <ul className="list-disc pl-4 space-y-1 font-semibold text-[10.5px]">
                    <li>Full PDF + raw Excel data tables downloads</li>
                    <li>Live alert notifications matching target sectors</li>
                    <li>SME Q&A priority thread validation</li>
                  </ul>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setProModalOpen(false)}
                    className="bg-gray-105 dark:bg-gray-855 text-gray-655 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setProSuccess(true)}
                    className="bg-blue-600 hover:bg-blue-755 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
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

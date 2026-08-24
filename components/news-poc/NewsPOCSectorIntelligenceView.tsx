"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  FileText,
  Lock,
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

export default function NewsPOCSectorIntelligenceView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedGeography, setSelectedGeography] = useState("All");
  
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
              <a href="#custom-rfp" className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer">
                Request Custom Research
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

      {/* 10. SECTOR RESEARCH BUNDLES */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-805 rounded-2xl p-5 space-y-4">
        <div className="border-b border-gray-100 dark:border-gray-850 pb-2">
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="h-4.5 w-4.5 text-blue-600" /> Sector Research Bundles (Cross-Sell)
          </h3>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[8.5px] font-bold text-purple-650 bg-purple-50 dark:bg-purple-955/20 px-2 py-0.5 rounded uppercase block w-max">Bundle Offer</span>
            <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-snug">Global Advanced Technologies Sourcing & Capex Package 2026</h4>
            <p className="text-[11px] text-gray-500 leading-normal font-semibold">Includes Semiconductor OSAT Substrate Analysis (REP-SEM-46) + Sovereign AI Infrastructure (REP-AI-02) reports.</p>
          </div>

          <div className="shrink-0 space-y-2 text-right">
            <div className="text-xs font-bold">
              <span className="text-gray-400 line-through mr-2">$548 Value</span>
              <span className="text-emerald-600 font-extrabold text-sm">$399 Package Price</span>
            </div>
            <Link href="/en/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl text-center block shadow-xs">
              Get Bundle & Save 27%
            </Link>
          </div>
        </div>
      </section>

      {/* 11. AI INTELLIGENCE PREVIEW (LOCKED) */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-805 rounded-2xl p-5 space-y-4">
        <div className="border-b border-gray-100 dark:border-gray-850 pb-2">
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-4.5 w-4.5 text-blue-605" /> AI-Powered Sector Intelligence (Predictive Signals)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 font-semibold text-xs leading-relaxed text-gray-655 dark:text-slate-355">
            <p>Go beyond traditional market sizing reports with AI model projections on plant capacity shifts, regulatory watch parameters, and corridor risk telemetry.</p>
            <div className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-xl space-y-2 border border-gray-150 dark:border-gray-855 relative">
              <div className="absolute right-3 top-3 text-[8.5px] font-bold text-emerald-600 uppercase flex items-center gap-0.5"><Activity className="h-3 w-3" /> Live Signal</div>
              <h5 className="font-bold text-gray-950 dark:text-white text-[11.5px]">Sovereign Edge Node Capex reallocations</h5>
              <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">India-US sub-50ms regional datacenter node growth projections project positive FDI momentum (+18%) over Q4.</p>
            </div>
          </div>

          {/* Locked Box */}
          <div className="bg-[#0f172a] border border-gray-800 p-5 rounded-2xl text-center relative overflow-hidden flex flex-col items-center justify-center min-h-40 space-y-3">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
            <div className="h-10 w-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Lock className="h-4 w-4" />
            </div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Unlock Predictive Model Projections</h5>
            <p className="text-[9.5px] text-slate-400 px-8 font-semibold leading-normal">
              Access real-time dynamic forecasts, semiconductor packaging yield margins updates, and GoI regulatory sandbox policy watch variables.
            </p>
            <button
              onClick={() => setProModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded-lg cursor-pointer transition-all shadow-md"
            >
              Activate Pro Intelligence Trial
            </button>
          </div>
        </div>
      </section>

      {/* 12. CUSTOM / ENTERPRISE RESEARCH */}
      <section id="custom-rfp" className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-805 rounded-2xl p-5 md:p-6 shadow-xs space-y-6">
        <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
          <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="h-4.5 w-4.5 text-blue-600" /> Need Custom Research Built for Your Business?
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-3 font-semibold text-xs leading-relaxed text-gray-655 dark:text-slate-355">
            <p>Commission customized plant capacity audits, tier-2 supply chain bottlenecks mapping, or regional PLI subsidy clearance briefings matching your target corridors.</p>
            <div className="space-y-2 pt-2">
              {[
                { title: "Plant Sizing & Capacity Audits", desc: "Granular plant-level yield validations" },
                { title: "Bilateral Tariff Modeling", desc: "Corridor-specific tariff arbitrage analysis" },
                { title: "Ministry Subsidy Due Diligence", desc: "DPIIT & MeitY compliance filings verification" }
              ].map((srv, idx) => (
                <div key={idx} className="flex gap-2 items-start text-[10.5px]">
                  <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-955/20 text-blue-600 flex items-center justify-center font-bold text-[8.5px] shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-gray-950 dark:text-white">{srv.title}</h5>
                    <span className="text-[9.5px] text-gray-400 font-medium leading-relaxed block">{srv.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-gray-50 dark:bg-gray-900/30 p-5 rounded-2xl border border-gray-205 dark:border-gray-850">
            {rfpSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-955/20 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h4 className="text-xs font-bold dark:text-white">Research Inquiry Submitted!</h4>
                <p className="text-[10px] text-gray-550 px-8 leading-normal font-normal">
                  Thank you. Your RFP has been logged. Our custom research advisory team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRfpSubmit} className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9.5px] font-bold text-gray-400 uppercase">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={rfpData.name}
                      onChange={(e) => setRfpData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Vikram Sen"
                      className="w-full text-xs font-semibold rounded-xl border border-gray-205 dark:border-gray-800 bg-white dark:bg-gray-900 px-3.5 py-2.5 outline-none text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9.5px] font-bold text-gray-400 uppercase">Business Email</label>
                    <input
                      type="email"
                      required
                      value={rfpData.email}
                      onChange={(e) => setRfpData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. vsen@semicon.in"
                      className="w-full text-xs font-semibold rounded-xl border border-gray-205 dark:border-gray-800 bg-white dark:bg-gray-900 px-3.5 py-2.5 outline-none text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-bold text-gray-400 uppercase">Research Objectives & Requirements</label>
                  <textarea
                    rows={3}
                    required
                    value={rfpData.requirement}
                    onChange={(e) => setRfpData(prev => ({ ...prev, requirement: e.target.value }))}
                    placeholder="Specify the target plants, capacity thresholds or tariff regulatory sandbox parameters..."
                    className="w-full text-xs font-semibold rounded-xl border border-gray-250 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 outline-none text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9.5px] font-bold text-gray-400 uppercase">Estimated Budget</span>
                    <select
                      value={rfpData.budget}
                      onChange={(e) => setRfpData(prev => ({ ...prev, budget: e.target.value }))}
                      className="text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-805 bg-white dark:bg-gray-950 px-2.5 py-1.5 outline-none text-gray-900 dark:text-white"
                    >
                      <option>&lt; $10,000</option>
                      <option>$10,000 - $25,000</option>
                      <option>$25,000 - $50,000</option>
                      <option>Enterprise Custom RFP</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl cursor-pointer transition-all shadow-xs"
                  >
                    Submit Custom RFP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
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

"use client";

import { useState } from "react";

interface ModuleConfig {
  code: string;
  name: string;
  slug: string;
  purpose: string;
  details: string;
  color: string;
  icon: string;
  tier: "Free/Registered" | "Verified/Pro" | "Enterprise" | "All Tiers";
  audience: string[];
}

const MODULES_DATA: ModuleConfig[] = [
  {
    code: "IGN-M01",
    name: "Feed",
    slug: "feed",
    purpose: "Personalized news feed by sector, industry, country, leader, and reader categories.",
    details: "Provides hyper-customized news streams dynamically filtered by user profile and selected tracking chips. Features AI intelligence recommendations.",
    color: "#2563EB",
    icon: "📱",
    tier: "All Tiers",
    audience: ["Business Owners / MSMEs", "Industry Professionals", "Media Professionals"]
  },
  {
    code: "IGN-M02",
    name: "Headlines",
    slug: "headlines",
    purpose: "Curated editorial news by editor type — AI, Intelligence, SME, Viksit Bharat, Podcast.",
    details: "Features authoritative curated dashboards managed by designated editors (e.g., IGEN AI Editor, Viksit Bharat Panel Editor) representing high-value global events.",
    color: "#DC2626",
    icon: "🔥",
    tier: "Free/Registered",
    audience: ["General Public", "Government Officials", "Media Professionals"]
  },
  {
    code: "IGN-M03",
    name: "Sector News",
    slug: "sector-news",
    purpose: "Industry-specific news and intelligence hub across 50 sectors.",
    details: "Comprehensive market updates, trade reports, and regulatory announcements categorized cleanly under 50 GoI ministry-aligned sectors.",
    color: "#D97706",
    icon: "🏭",
    tier: "Verified/Pro",
    audience: ["Exporters / Importers", "Business Owners / MSMEs", "Investors"]
  },
  {
    code: "IGN-M04",
    name: "Company Pages",
    slug: "company-pages",
    purpose: "Company digital presence, news publishing, and B2B lead generation.",
    details: "Enables companies to establish a premium landing page, publish news releases, and connect with direct trade leads securely.",
    color: "#059669",
    icon: "🏢",
    tier: "Verified/Pro",
    audience: ["Enterprises / Corporates", "Startups", "SMEs & ASMEs"]
  },
  {
    code: "IGN-M05",
    name: "Country News",
    slug: "country-news",
    purpose: "Country-specific business intelligence, trade data, and investment opportunities.",
    details: "Covers 195 countries, providing trade policy updates, bilateral agreements, tariff charts, and bilateral commerce flows.",
    color: "#7C3AED",
    icon: "🌐",
    tier: "Verified/Pro",
    audience: ["Exporters / Importers", "Government Officials", "Researchers"]
  },
  {
    code: "IGN-M06",
    name: "Leader News",
    slug: "leader-news",
    purpose: "Leadership intelligence — executive news, rankings, interviews, and AI insights.",
    details: "Focuses on executive decision-makers. Includes custom executive network intelligence, leadership trend analytics, and featured CEO profiles.",
    color: "#DB2777",
    icon: "👑",
    tier: "Enterprise",
    audience: ["Industry Leaders", "Investors", "Enterprises / Corporates"]
  },
  {
    code: "IGN-M07",
    name: "Expert News",
    slug: "expert-news",
    purpose: "SME & ASME expert insights, consultation booking, and knowledge hub.",
    details: "Provides direct publishing access to verified Subject Matter Experts (SMEs). Users can request insights, book consultations, and read whitepapers.",
    color: "#0891B2",
    icon: "🎓",
    tier: "Verified/Pro",
    audience: ["SMEs & ASMEs", "Researchers / Students", "Business Owners / MSMEs"]
  },
  {
    code: "IGN-M08",
    name: "Communities",
    slug: "communities",
    purpose: "Trade professional community network for SMEs, Readers, Leaders, and Expo members.",
    details: "Private and public forums, chat rooms, and networking directories divided into segments (Importers, Exporters, Service Providers, and Leaders).",
    color: "#4F46E5",
    icon: "🤝",
    tier: "All Tiers",
    audience: ["Industry Professionals", "Exporters / Importers", "SMEs & ASMEs"]
  },
  {
    code: "IGN-M09",
    name: "Trending",
    slug: "trending",
    purpose: "Most-liked, most-shared, most-commented news discovery across sectors.",
    details: "Dynamic algorithm surfaces popular reports, hot-button policy discussions, and viral industry developments in real-time.",
    color: "#EA580C",
    icon: "📈",
    tier: "Free/Registered",
    audience: ["General Public", "Researchers / Students", "Media Professionals"]
  },
  {
    code: "IGN-M10",
    name: "My News",
    slug: "my-news",
    purpose: "Personal workspace for trade news bookmarks, reader intelligence, and analytics.",
    details: "The user's central workspace. Save articles, explore reader intelligence analytics, track activity, and configure AI summary settings.",
    color: "#475569",
    icon: "👤",
    tier: "Verified/Pro",
    audience: ["Business Owners / MSMEs", "Industry Professionals", "SMEs & ASMEs"]
  }
];

export default function NewsPOCWorkspace() {
  const [selectedModule, setSelectedModule] = useState<ModuleConfig>(MODULES_DATA[0]);
  const [customInput, setCustomInput] = useState("");
  const [simulatorOutput, setSimulatorOutput] = useState<string | null>(null);

  const handleSimulate = () => {
    switch (selectedModule.code) {
      case "IGN-M01":
        setSimulatorOutput(`Generated personalized Feed matching [${customInput || "Agriculture, Tech, India"}] filters. Loaded 3 matching AI-ranked articles.`);
        break;
      case "IGN-M02":
        setSimulatorOutput(`Editorial Channel [${customInput || "Viksit Bharat Editor"}] loaded successfully. Showing 5 verified policy bulletins.`);
        break;
      case "IGN-M03":
        setSimulatorOutput(`Sector dashboard initialized for: ${customInput || "S02 - AI & Cyber Security"}. 12 trade reports unlocked.`);
        break;
      case "IGN-M04":
        setSimulatorOutput(`Company profile created for "${customInput || "TATA Consultancy"}". Lead Generation capturing enabled!`);
        break;
      case "IGN-M05":
        setSimulatorOutput(`Bilateral trade analysis generated for India ↔ ${customInput || "USA"}. Total Trade Volume: $191.8 Billion.`);
        break;
      case "IGN-M06":
        setSimulatorOutput(`AI Leadership Trends Dashboard unlocked for Executive "${customInput || "N. Chandrasekaran"}".`);
        break;
      case "IGN-M07":
        setSimulatorOutput(`Booking consultation with Expert ID "${customInput || "EXP-9231"}". Slot selected: Monday 10:00 AM IST.`);
        break;
      case "IGN-M08":
        setSimulatorOutput(`Joined private Community Lounge: "${customInput || "Exporters Forum (IFEC)"}". Members online: 1,489.`);
        break;
      case "IGN-M09":
        setSimulatorOutput(`Trending score algorithm calculated for topic [${customInput || "Semiconductor Subsidy"}]: 98.4/100.`);
        break;
      case "IGN-M10":
        setSimulatorOutput(`User workspace saved successfully. Exported ${customInput || "5"} bookmarked reports to CSV.`);
        break;
      default:
        setSimulatorOutput("Simulator updated.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Hero Header */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#1E3A5F] via-[#2F6FA3] to-[#1E293B] p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-gray-900 uppercase tracking-wide">
              iGEN News Proof of Concept
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight">
              India Global News Platform Hub
            </h1>
            <p className="mt-2 text-blue-100 max-w-2xl text-sm md:text-base">
              Explore the 10 core architectural modules of the B2B trade news engine. Use this interactive POC workspace to test data flows and preview module behaviors.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-md">
            <span className="text-2xl animate-pulse">📡</span>
            <div className="text-xs">
              <p className="font-semibold text-white">Status: Connected</p>
              <p className="text-gray-300">Workspace V1.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Module Sidebar Picker */}
        <div className="col-span-12 lg:col-span-4 space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-primary)] dark:text-white px-2">
            10 Core Modules
          </h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {MODULES_DATA.map((mod) => {
              const isSelected = selectedModule.code === mod.code;
              return (
                <button
                  key={mod.code}
                  onClick={() => {
                    setSelectedModule(mod);
                    setSimulatorOutput(null);
                    setCustomInput("");
                  }}
                  className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 shadow-sm"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="text-2xl">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                        {mod.code}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        mod.tier === "Enterprise"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                          : mod.tier === "Verified/Pro"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                      }`}>
                        {mod.tier}
                      </span>
                    </div>
                    <p className="font-semibold text-sm truncate mt-0.5">{mod.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Module Detail Workspace */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
            {/* Header info */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedModule.icon}</span>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                      Module Details & POC Simulator
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedModule.code}: {selectedModule.name}
                    </h2>
                  </div>
                </div>
              </div>
              <span
                className="w-3.5 h-3.5 rounded-full animate-pulse"
                style={{ backgroundColor: selectedModule.color }}
              />
            </div>

            {/* Purpose & Details */}
            <div className="my-6 space-y-4">
              <div>
                <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                  Module Purpose
                </h3>
                <p className="mt-1.5 text-gray-850 dark:text-gray-250 font-medium">
                  {selectedModule.purpose}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                  Detailed Scope
                </h3>
                <p className="mt-1.5 text-gray-600 dark:text-gray-400 text-sm">
                  {selectedModule.details}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Subscription Access Tier
                  </h4>
                  <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    🔑 {selectedModule.tier}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Target Audience Focus
                  </h4>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    🎯 {selectedModule.audience.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* POC Simulator Sandbox */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                Interactive Module Simulator
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    {selectedModule.code === "IGN-M01" && "Add Filter Tags (comma-separated)"}
                    {selectedModule.code === "IGN-M02" && "Select Editor Channel Name"}
                    {selectedModule.code === "IGN-M03" && "Enter Sector Code (e.g. S02, S15)"}
                    {selectedModule.code === "IGN-M04" && "Mock Company Name"}
                    {selectedModule.code === "IGN-M05" && "Enter Target Country (e.g., USA, UK)"}
                    {selectedModule.code === "IGN-M06" && "Search Executive Leader Name"}
                    {selectedModule.code === "IGN-M07" && "Expert ID or Sector Domain"}
                    {selectedModule.code === "IGN-M08" && "Select Community Channel Name"}
                    {selectedModule.code === "IGN-M09" && "Input Trending Keyword/Topic"}
                    {selectedModule.code === "IGN-M10" && "Number of saved items to retrieve"}
                  </label>
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={
                      selectedModule.code === "IGN-M01" ? "Agriculture, FinTech, Germany" :
                      selectedModule.code === "IGN-M02" ? "Viksit Bharat Panel Editor" :
                      selectedModule.code === "IGN-M03" ? "S02 - AI & Cyber Security" :
                      selectedModule.code === "IGN-M04" ? "TATA Group" :
                      selectedModule.code === "IGN-M05" ? "United Kingdom" :
                      selectedModule.code === "IGN-M06" ? "Sundar Pichai" :
                      selectedModule.code === "IGN-M07" ? "AI Expert - Dr. Sharma" :
                      selectedModule.code === "IGN-M08" ? "Exporters Forum (IFEC)" :
                      selectedModule.code === "IGN-M09" ? "Viksit Bharat 2047" : "10"
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleSimulate}
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  ⚡ Simulate Data Flow
                </button>

                {simulatorOutput && (
                  <div className="mt-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-sm text-blue-950 dark:text-blue-200">
                    <p className="font-mono text-xs text-blue-500 mb-1">▶ Response Output:</p>
                    <p className="font-medium">{simulatorOutput}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

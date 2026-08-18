"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  BarChart2,
  Bookmark,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Compass,
  Crown,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  Handshake,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Zap,
  ArrowUp,
  ArrowDown,
  Building2,
  ExternalLink,
  SlidersHorizontal
} from "lucide-react";

// ─── Local UI primitives (strictly scoped to ASME All Sector) ────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-3 mb-4">
      <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
      {action}
    </div>
  );
}

function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border border-indigo-200 dark:border-indigo-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.blue}`}>{children}</span>
  );
}

// ─── Master All-Sector Mock Data ─────────────────────────────────────────────

interface MasterSector {
  id: string;
  name: string;
  icon: string;
  asmeCount: number;
  industryCount: number;
  description: string;
  topSkill: string;
  trendingRate: string;
}

const MASTER_SECTORS: MasterSector[] = [
  { id: "renewable-energy", name: "Renewable Energy & Cleantech", icon: "⚡", asmeCount: 480, industryCount: 32, description: "Green hydrogen, solar photovoltaic scaling, offshore wind, and grid BESS.", topSkill: "LCOH Modeling", trendingRate: "+38%" },
  { id: "fintech-banking", name: "FinTech & Digital Banking", icon: "💳", asmeCount: 640, industryCount: 45, description: "Cross-border payment rails, UPI integrations, CBDC settlement, and RegTech.", topSkill: "Cross-Border UPI", trendingRate: "+29%" },
  { id: "defence-aerospace", name: "Defence & Aerospace", icon: "🛡️", asmeCount: 350, industryCount: 28, description: "Tactical UAV swarms, avionics sensor fusion, AESA radar, and defense offsets.", topSkill: "Sensor Fusion", trendingRate: "+44%" },
  { id: "biotech-pharma", name: "Biotechnology & Healthcare", icon: "🧬", asmeCount: 410, industryCount: 36, description: "Phytochemical extract standards, biosimilars, clinical trial analytics, and AYUSH.", topSkill: "EU Phytochemicals", trendingRate: "+22%" },
  { id: "logistics-shipping", name: "Logistics & Supply Chain", icon: "🚢", asmeCount: 530, industryCount: 41, description: "Multimodal rail-port corridors, automated customs, and freight risk telemetry.", topSkill: "Manifest Verification", trendingRate: "+31%" },
  { id: "agritech-farming", name: "Agriculture & AgriTech", icon: "🌾", asmeCount: 290, industryCount: 24, description: "Precision farming, drone sprayers, bio-fertilizer supply, and cold chain telemetry.", topSkill: "Drone Sprayer Policy", trendingRate: "+18%" },
  { id: "semiconductors-ai", name: "Semiconductors & Deep Tech", icon: "💻", asmeCount: 580, industryCount: 39, description: "OSAT packaging, substrate fabrication, edge AI hardware, and chip design verification.", topSkill: "OSAT Packaging", trendingRate: "+46%" },
  { id: "smart-manufacturing", name: "Advanced Manufacturing", icon: "🏭", asmeCount: 360, industryCount: 30, description: "Industrial robotics, PLC automation, digital twins, and export quality audits.", topSkill: "ZED Quality Audits", trendingRate: "+25%" },
];

interface MasterIndustry {
  id: string;
  name: string;
  parentSector: string;
  sectorId: string;
  asmeCount: number;
  popular: boolean;
  trending: boolean;
  emerging: boolean;
  activitySignal: string;
}

const MASTER_INDUSTRIES: MasterIndustry[] = [
  { id: "green-hydrogen", name: "Green Hydrogen & Ammonia", parentSector: "Renewable Energy", sectorId: "renewable-energy", asmeCount: 86, popular: true, trending: true, emerging: false, activitySignal: "High RFP Volume" },
  { id: "upi-rails", name: "Cross-Border UPI Rails", parentSector: "FinTech", sectorId: "fintech-banking", asmeCount: 112, popular: true, trending: true, emerging: false, activitySignal: "ASEAN Expansion" },
  { id: "tactical-uav", name: "Tactical UAVs & Drones", parentSector: "Defence", sectorId: "defence-aerospace", asmeCount: 94, popular: true, trending: false, emerging: true, activitySignal: "Procurement Bids" },
  { id: "phytochemicals", name: "Phytochemicals & Botanicals", parentSector: "Biotechnology", sectorId: "biotech-pharma", asmeCount: 68, popular: false, trending: false, emerging: true, activitySignal: "EU Export Norms" },
  { id: "osat-packaging", name: "OSAT Semiconductor Packaging", parentSector: "Deep Tech", sectorId: "semiconductors-ai", asmeCount: 124, popular: true, trending: true, emerging: false, activitySignal: "ISM Allocations" },
  { id: "bess-storage", name: "Grid Scale BESS Energy Storage", parentSector: "Renewable Energy", sectorId: "renewable-energy", asmeCount: 72, popular: false, trending: true, emerging: false, activitySignal: "Tariff Arbitrage" },
  { id: "customs-digitization", name: "Automated Customs Clearance", parentSector: "Logistics", sectorId: "logistics-shipping", asmeCount: 82, popular: false, trending: false, emerging: false, activitySignal: "IMEC Verification" },
  { id: "drone-agriculture", name: "Precision Agri Drone Systems", parentSector: "Agriculture", sectorId: "agritech-farming", asmeCount: 54, popular: false, trending: false, emerging: true, activitySignal: "GoI Subsidies" },
  { id: "cbdc-settlement", name: "CBDC Wholesale Settlements", parentSector: "FinTech", sectorId: "fintech-banking", asmeCount: 42, popular: false, trending: true, emerging: true, activitySignal: "Pilot Clearing" },
  { id: "radar-avionics", name: "AESA Radar & Military Avionics", parentSector: "Defence", sectorId: "defence-aerospace", asmeCount: 45, popular: false, trending: false, emerging: false, activitySignal: "DO-178C Audits" },
  { id: "biosimilars", name: "Biosimilar Fermentation Scaling", parentSector: "Biotechnology", sectorId: "biotech-pharma", asmeCount: 58, popular: true, trending: false, emerging: false, activitySignal: "FDA Submissions" },
  { id: "industrial-digital-twin", name: "Industrial Digital Twin Simulation", parentSector: "Manufacturing", sectorId: "smart-manufacturing", asmeCount: 49, popular: false, trending: true, emerging: true, activitySignal: "Plant Automation" },
];

const POPULAR_SKILLS = [
  { name: "LCOH Tariff Arbitrage Modeling", count: "142 ASMEs", sector: "Energy" },
  { name: "Cross-Border UPI Gateway Integration", count: "186 ASMEs", sector: "FinTech" },
  { name: "UAV Multi-Sensor Fusion", count: "98 ASMEs", sector: "Defence" },
  { name: "EU Phytochemical Regulatory Filing", count: "74 ASMEs", sector: "Biotech" },
  { name: "Substrate & OSAT Verification", count: "115 ASMEs", sector: "Deep Tech" },
  { name: "Customs Manifest Blockchain Attestation", count: "88 ASMEs", sector: "Logistics" },
  { name: "Drone Sprayer Flight Controller Calibration", count: "62 ASMEs", sector: "AgriTech" },
  { name: "FATF Digital AML Architecture", count: "91 ASMEs", sector: "Banking" },
];

const EXPERTISE_CATEGORIES = [
  { name: "Technology & Artificial Intelligence", asmes: "580 ASMEs", industries: ["Semiconductors", "Edge AI", "Cyber Security", "SaaS"] },
  { name: "Finance, Banking & RegTech", asmes: "640 ASMEs", industries: ["Cross-Border UPI", "CBDC Settlement", "Digital Lending", "AML"] },
  { name: "Energy Transition & Cleantech", asmes: "480 ASMEs", industries: ["Green Hydrogen", "Solar PV", "Grid BESS", "Offshore Wind"] },
  { name: "Defence, Avionics & Security", asmes: "350 ASMEs", industries: ["Tactical UAVs", "AESA Radar", "Defence Offsets", "Avionics DO-178C"] },
  { name: "Trade, Logistics & Maritime", asmes: "530 ASMEs", industries: ["Multimodal Ports", "Automated Customs", "Freight Risk", "Warehousing"] },
  { name: "Biopharma & Ayush Exports", asmes: "410 ASMEs", industries: ["Phytochemicals", "Biosimilars", "Ayush Formulations", "Clinical CRO"] },
];

const FEATURED_ASMES_ALL = [
  { id: 1, name: "Vikramaditya Sen", role: "Energy Transition Analyst", sector: "Renewable Energy", industry: "Green Hydrogen", country: "India", initials: "VS", color: "from-amber-500 to-orange-600", verified: true, rate: "$90/hr", views: "19.2K", followers: "1.4K" },
  { id: 2, name: "Ananya Roy", role: "FinTech Compliance Analyst", sector: "FinTech", industry: "Cross-Border Rails", country: "India", initials: "AR", color: "from-cyan-500 to-blue-600", verified: true, rate: "$85/hr", views: "16.1K", followers: "1.2K" },
  { id: 3, name: "Priya Nair", role: "Defence Technology Analyst", sector: "Defence", industry: "Tactical UAVs", country: "India", initials: "PN", color: "from-purple-500 to-indigo-600", verified: true, rate: "$95/hr", views: "24.1K", followers: "1.7K" },
  { id: 4, name: "Meghna Iyer", role: "Biotech Regulatory Analyst", sector: "Biotechnology", industry: "Phytochemicals", country: "India", initials: "MI", color: "from-rose-500 to-pink-600", verified: true, rate: "$88/hr", views: "12.4K", followers: "910" },
];

const ASME_DISTRIBUTION = [
  { sector: "FinTech & Banking", count: 640, percentage: 20, color: "bg-blue-600" },
  { sector: "Semiconductors & Deep Tech", count: 580, percentage: 18, color: "bg-indigo-600" },
  { sector: "Logistics & Supply Chain", count: 530, percentage: 16, color: "bg-teal-600" },
  { sector: "Renewable Energy & Cleantech", count: 480, percentage: 15, color: "bg-amber-500" },
  { sector: "Biotechnology & Healthcare", count: 410, percentage: 13, color: "bg-rose-500" },
  { sector: "Advanced Manufacturing", count: 360, percentage: 11, color: "bg-purple-600" },
  { sector: "Defence & Aerospace", count: 350, percentage: 11, color: "bg-slate-700" },
  { sector: "Agriculture & AgriTech", count: 290, percentage: 9, color: "bg-emerald-600" },
];

const MASTER_OPPORTUNITIES = [
  { title: "National Green Hydrogen Electrolyser Testing Sandbox", sector: "Renewable Energy", type: "Procurement Tender", entity: "Public Energy Board", deadline: "10 days left" },
  { title: "ASEAN-India UPI Real-time Clearing Gateway Integration", sector: "FinTech", type: "RFP Partnership", entity: "Banking Consortium", deadline: "Open RFP" },
  { title: "Tactical Light UAV Micro-Turbine Sub-System Supply", sector: "Defence", type: "Procurement", entity: "Aerospace Defense Org", deadline: "15 days left" },
  { title: "EU Botanical Classification Validation Consultancy", sector: "Biotechnology", type: "Advisory Mandate", entity: "Pharma Import Hub · Germany", deadline: "Immediate" },
];

const MASTER_RESOURCES = [
  { title: "2026 Master Industry Taxonomy & ASME Competency Matrix", type: "Official Framework", format: "PDF (3.8 MB)", downloads: "3.4K" },
  { title: "Cross-Border UPI Regulatory & Security Integration Playbook", type: "Implementation Guide", format: "PDF (2.4 MB)", downloads: "2.8K" },
  { title: "LCOH Modeling & Green Hydrogen Electrolyser Tariff Benchmark", type: "Technical Whitepaper", format: "PDF (3.1 MB)", downloads: "2.1K" },
  { title: "Tactical UAV DO-178C Avionics Software Compliance Checklist", type: "Engineering Brief", format: "PDF (4.2 MB)", downloads: "1.5K" },
];

const MASTER_NEWS_PREVIEWS = [
  { title: "India Semiconductor Mission Phase-II Expands Substrate Fabrication Incentives", sector: "Semiconductors", date: "Today", readTime: "4 min read", author: "Deep Tech Desk" },
  { title: "NPCI International Announces UPI Expansion in 4 Middle East Remittance Corridors", sector: "FinTech", date: "Today", readTime: "3 min read", author: "Ananya Roy" },
  { title: "MNRE Issues Standardised Electrolyser Benchmark Norms for Hydrogen Hubs", sector: "Renewable Energy", date: "Yesterday", readTime: "5 min read", author: "Vikramaditya Sen" },
  { title: "DefExpo 2026 Spotlights Indigenous Tactical UAV Autonomy Architectures", sector: "Defence", date: "2 days ago", readTime: "4 min read", author: "Priya Nair" },
];

const MASTER_EVENTS = [
  { title: "Global Clean Energy & Hydrogen Horizons Summit 2026", date: "Oct 24-26, 2026", location: "New Delhi / Hybrid", sector: "Renewable Energy", attendees: "1,200+ Registered" },
  { title: "ASEAN-India FinTech & Cross-Border Payments Conclave", date: "Nov 04, 2026", location: "Singapore / Virtual", sector: "FinTech", attendees: "850+ Registered" },
  { title: "DefExpo Tactical Drone & Avionics Innovation Showcase", date: "Nov 18-20, 2026", location: "Bengaluru, India", sector: "Defence", attendees: "2,400+ Registered" },
  { title: "International Phytochemical Quality & Export Compliance Forum", date: "Dec 02, 2026", location: "Frankfurt / Virtual", sector: "Biotechnology", attendees: "650+ Registered" },
];

const INDUSTRY_RANKINGS = [
  { rank: 1, name: "Green Hydrogen & Cleantech", sector: "Renewable Energy", asmes: 86, searchGrowth: "+48%", signal: "LCOH Tariff Modeling" },
  { rank: 2, name: "Cross-Border Payment Rails", sector: "FinTech", asmes: 112, searchGrowth: "+39%", signal: "UPI Internationalization" },
  { rank: 3, name: "OSAT Semiconductor Packaging", sector: "Deep Tech", asmes: 124, searchGrowth: "+46%", signal: "ISM Substrate Mandates" },
  { rank: 4, name: "Tactical UAVs & Autonomous Flight", sector: "Defence", asmes: 94, searchGrowth: "+44%", signal: "Sensor Fusion Protocols" },
  { rank: 5, name: "Phytochemical & Botanical Exports", sector: "Biotechnology", asmes: 68, searchGrowth: "+26%", signal: "EU Quality Standards" },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ASMEAllSectorView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSectorFilter, setSelectedSectorFilter] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeNavSection, setActiveNavSection] = useState("sectors");

  const navItems = [
    { id: "sectors", label: "All Sectors" },
    { id: "industries", label: "Industry Directory" },
    { id: "popular", label: "Popular" },
    { id: "trending", label: "Trending" },
    { id: "skills", label: "Skills" },
    { id: "expertise", label: "Expertise" },
    { id: "featured-asmes", label: "Featured ASMEs" },
    { id: "distribution", label: "Distribution" },
    { id: "opportunities", label: "Opportunities" },
    { id: "resources", label: "Resources" },
    { id: "news", label: "News" },
    { id: "events", label: "Events" },
    { id: "rankings", label: "Rankings" },
    { id: "premium", label: "Premium" },
  ];

  const scrollTo = (id: string) => {
    setActiveNavSection(id);
    const el = document.getElementById(`all-sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredIndustries = MASTER_INDUSTRIES.filter((ind) => {
    const matchesSector = selectedSectorFilter === "All" || ind.parentSector === selectedSectorFilter;
    const matchesSearch = ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ind.parentSector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ind.activitySignal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-800 via-blue-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 border border-white/20 px-3 py-1 rounded-full bg-white/10 inline-flex items-center gap-1.5 shadow-xs">
                <Compass className="h-3 w-3 text-cyan-300" /> ASME ALL SECTOR
              </span>
              <span className="text-[10px] font-semibold text-cyan-200 bg-cyan-950/40 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                Master Industry &amp; Skill Ecosystem
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Explore ASMEs Across Every Industry
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-2xl font-normal">
              Discover sectors, industries, skills, expertise, and professional opportunities across the complete Associate Subject Matter Expert ecosystem.
            </p>

            {/* 02. Global Discovery Search */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search sector, industry, skill, or expertise (e.g. Green Hydrogen, OSAT, UPI, Sensor Fusion)..."
                  aria-label="Search sector, industry, skill or expertise"
                />
              </div>
              <button
                onClick={() => scrollTo("industries")}
                className="bg-white text-indigo-800 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-sm"
              >
                Explore Industries →
              </button>
              <Link
                href="/eoi"
                className="border border-white/30 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs"
              >
                Find an ASME →
              </Link>
            </div>

            {/* Stats Strip */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-white/15">
              {[
                { label: "Total Sectors", value: "50 GoI Sectors" },
                { label: "Mapped Industries", value: "1,350+ Verticals" },
                { label: "Active ASMEs", value: "3,200+ Verified" },
                { label: "Indexed Skills", value: "850+ Competencies" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold tracking-tight text-white">{s.value}</div>
                  <div className="text-[10px] text-white/65 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. QUICK DISCOVERY NAVIGATION (STICKY CHIP BAR) ────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-1.5 overflow-x-auto py-2.5" style={{ scrollbarWidth: "none" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-label={`Navigate to ${item.label}`}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeNavSection === item.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-indigo-600 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 04. SECTOR DIRECTORY ───────────────────────────────────────────── */}
        <section id="all-sec-sectors">
          <SectionTitle
            title="Explore Sectors"
            action={
              <Link href="/en/news-poc/expert-news/asme/sector" className="text-[10px] font-bold text-blue-600 hover:underline">
                View By Sector Hub →
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MASTER_SECTORS.map((sec) => (
              <Card key={sec.id} className="p-4 hover:shadow-md transition-all hover:border-indigo-400 dark:hover:border-indigo-600 group flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl" aria-hidden="true">{sec.icon}</span>
                    <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded">
                      {sec.trendingRate} growth
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 leading-snug">
                    {sec.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                    {sec.description}
                  </p>
                  <p className="text-[9px] text-indigo-600 font-semibold mt-2">
                    Top Skill: {sec.topSkill}
                  </p>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-gray-700 dark:text-gray-300">{sec.asmeCount} ASMEs · {sec.industryCount} Ind.</span>
                  <Link
                    href="/en/news-poc/expert-news/asme/sector"
                    className="text-[9px] font-bold text-indigo-600 hover:underline"
                  >
                    Explore →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 05. INDUSTRY DIRECTORY (EXPLORER WITH FILTERS) ─────────────────── */}
        <section id="all-sec-industries" className="space-y-4">
          <SectionTitle
            title="Explore Industries"
            action={
              <span className="text-[10px] font-bold text-gray-500">
                {filteredIndustries.length} Industries Mapped
              </span>
            }
          />

          {/* Filters */}
          <Card className="p-3.5 flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" /> Sector Filter:
            </span>
            {["All", "Renewable Energy", "FinTech", "Defence", "Biotechnology", "Deep Tech", "Logistics", "Agriculture", "Manufacturing"].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedSectorFilter(f)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  selectedSectorFilter === f
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                }`}
              >
                {f}
              </button>
            ))}
          </Card>

          {/* Industry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredIndustries.map((ind) => (
              <Card key={ind.id} className="p-3.5 hover:border-indigo-400 transition-colors flex items-center justify-between group">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 leading-snug">
                      {ind.name}
                    </h4>
                    {ind.popular && <Badge color="amber">Popular</Badge>}
                    {ind.trending && <Badge color="indigo">Trending</Badge>}
                    {ind.emerging && <Badge color="purple">Emerging</Badge>}
                  </div>
                  <p className="text-[9px] text-gray-400">{ind.parentSector} · {ind.asmeCount} ASMEs</p>
                  <p className="text-[8px] text-emerald-600 font-semibold">⚡ {ind.activitySignal}</p>
                </div>
                <Link
                  href="/eoi"
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-indigo-600 group-hover:text-white text-gray-400 transition-colors shrink-0 ml-2"
                  aria-label={`Explore ${ind.name}`}
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 06 & 07. POPULAR & TRENDING INDUSTRIES ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Popular Industries */}
          <section id="all-sec-popular">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Popular Industries" action={<Star className="h-4 w-4 text-amber-500" />} />
              <p className="text-[10px] text-gray-500">Industries receiving sustained high inquiry and engagement volume across the enterprise network.</p>
              <div className="space-y-2.5">
                {MASTER_INDUSTRIES.filter((i) => i.popular).map((ind) => (
                  <div key={ind.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{ind.name}</span>
                        <Badge color="amber">High Volume</Badge>
                      </div>
                      <p className="text-[9px] text-gray-400">{ind.parentSector} · {ind.asmeCount} Active ASMEs</p>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-indigo-600 hover:underline shrink-0">
                      Explore →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Trending Industries */}
          <section id="all-sec-trending">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Trending Industries" action={<TrendingUp className="h-4 w-4 text-blue-500" />} />
              <p className="text-[10px] text-gray-500">Industries experiencing sharp recent increases in searches, publications, and procurement interest.</p>
              <div className="space-y-2.5">
                {MASTER_INDUSTRIES.filter((i) => i.trending).map((ind) => (
                  <div key={ind.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{ind.name}</span>
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded">↑ Trending Signal</span>
                      </div>
                      <p className="text-[9px] text-gray-400">Signal: {ind.activitySignal}</p>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-indigo-600 hover:underline shrink-0">
                      Explore →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 08. POPULAR SKILLS & 09. EXPERTISE EXPLORER ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Popular Skills */}
          <section id="all-sec-skills">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Explore Popular Skills" action={<Target className="h-4 w-4 text-indigo-500" />} />
              <p className="text-[10px] text-gray-500">Frequently searched and in-demand practitioner competencies.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {POPULAR_SKILLS.map((skill) => (
                  <Link
                    key={skill.name}
                    href="/eoi"
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-indigo-400 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 leading-snug">{skill.name}</h4>
                      <span className="text-[9px] text-gray-400">{skill.count} · {skill.sector}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          {/* Expertise Explorer */}
          <section id="all-sec-expertise">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Explore Expertise Clusters" action={<Layers className="h-4 w-4 text-purple-500" />} />
              <p className="text-[10px] text-gray-500">Cross-industry practice groups connecting expertise to relevant verticals.</p>
              <div className="space-y-2.5">
                {EXPERTISE_CATEGORIES.map((exp) => (
                  <div key={exp.name} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{exp.name}</span>
                      <span className="text-[9px] font-bold text-indigo-600">{exp.asmes}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {exp.industries.map((ind) => (
                        <span key={ind} className="text-[8px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 10. FEATURED ASMES ACROSS INDUSTRIES ──────────────────────────── */}
        <section id="all-sec-featured-asmes" className="space-y-4">
          <SectionTitle
            title="Featured ASMEs Across Industries"
            action={
              <Link href="/en/news-poc/expert-news/asme/pages" className="text-[10px] font-bold text-blue-600 hover:underline">
                View All Featured on ASME Pages →
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_ASMES_ALL.map((asme) => (
              <Card key={asme.id} className="p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                      {asme.initials}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{asme.name}</h3>
                      <p className="text-[9px] text-gray-400">{asme.role}</p>
                    </div>
                  </div>
                  {asme.verified && (
                    <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge color="blue">{asme.sector}</Badge>
                  <Badge color="indigo">{asme.industry}</Badge>
                </div>
                <div className="flex items-center justify-between text-[9px] text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-2">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{asme.views}</span>
                  <span className="font-bold text-blue-600">{asme.rate}</span>
                </div>
                <Link
                  href="/eoi"
                  className="block w-full text-center text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-lg transition-colors"
                  aria-label={`View ${asme.name}'s ASME profile`}
                >
                  View ASME →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 11. ASME DISTRIBUTION BY INDUSTRY ──────────────────────────────── */}
        <section id="all-sec-distribution">
          <SectionTitle
            title="Where ASMEs Are Active"
            action={<Badge color="indigo">Verified Distribution</Badge>}
          />
          <Card className="p-6 space-y-4">
            <p className="text-[10px] text-gray-500">Live platform distribution of 3,200+ verified Associate Subject Matter Experts across major industry divisions.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {ASME_DISTRIBUTION.map((item) => (
                <div key={item.sector} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-200">
                    <span>{item.sector}</span>
                    <span className="text-[10px] text-gray-500">{item.count} ASMEs ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage * 4}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── 12. INDUSTRY OPPORTUNITIES & 13. PROFESSIONAL RESOURCES ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Industry Opportunities */}
          <section id="all-sec-opportunities">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Opportunities Across Industries" action={<Handshake className="h-4 w-4 text-emerald-500" />} />
              <div className="space-y-2.5">
                {MASTER_OPPORTUNITIES.map((opp, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{opp.title}</span>
                      <Badge color="emerald">{opp.type}</Badge>
                    </div>
                    <p className="text-[9px] text-gray-400">{opp.entity} · {opp.sector}</p>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                      <span className="text-rose-500 font-semibold">{opp.deadline}</span>
                      <Link href="/eoi" className="font-bold text-indigo-600 hover:underline">
                        Explore Opportunity →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Professional Resources */}
          <section id="all-sec-resources">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Professional Resources" action={<Download className="h-4 w-4 text-blue-500" />} />
              <div className="space-y-2.5">
                {MASTER_RESOURCES.map((res, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{res.title}</h4>
                      <p className="text-[9px] text-gray-400 mt-0.5">{res.type} · {res.format} · {res.downloads} downloads</p>
                    </div>
                    <Link
                      href="/eoi"
                      className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 hover:bg-blue-100 shrink-0"
                      aria-label={`Download ${res.title}`}
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 14. INDUSTRY NEWS PREVIEW & 15. INDUSTRY EVENTS ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Industry News Preview */}
          <section id="all-sec-news">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle
                title="What's Happening Across Industries"
                action={
                  <Link href="/en/news-poc/expert-news/asme/news" className="text-[10px] font-bold text-blue-600 hover:underline">
                    All News →
                  </Link>
                }
              />
              <div className="space-y-2.5">
                {MASTER_NEWS_PREVIEWS.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between text-[8px] text-gray-400">
                      <span className="font-bold text-indigo-600">{item.sector}</span>
                      <span>{item.date} · {item.readTime}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug hover:text-indigo-600 cursor-pointer">
                      {item.title}
                    </h4>
                    <span className="text-[8px] text-gray-400">By {item.author}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Industry Events */}
          <section id="all-sec-events">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Upcoming Industry Events" action={<Calendar className="h-4 w-4 text-indigo-500" />} />
              <div className="space-y-2.5">
                {MASTER_EVENTS.map((evt, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{evt.title}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">{evt.date} · {evt.location}</p>
                      <span className="text-[8px] font-semibold text-emerald-600">{evt.attendees}</span>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1.5 rounded-lg shrink-0">
                      View Event →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 16. INDUSTRY RANKINGS & METHODOLOGY ────────────────────────────── */}
        <section id="all-sec-rankings">
          <SectionTitle
            title="Most Active Industries"
            action={<Badge color="indigo">Ranked Weekly</Badge>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-4 space-y-3">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {INDUSTRY_RANKINGS.map((item) => (
                    <div key={item.rank} className="flex items-center gap-3 py-3">
                      <span className={`text-sm font-bold w-6 shrink-0 text-center ${item.rank <= 3 ? "text-amber-500" : "text-gray-400"}`}>
                        #{item.rank}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-900 dark:text-white">{item.name}</span>
                          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1 py-0.5 rounded">
                            {item.searchGrowth}
                          </span>
                        </div>
                        <p className="text-[9px] text-gray-400">{item.sector} · {item.asmes} ASMEs · Signal: {item.signal}</p>
                      </div>
                      <Link href="/eoi" className="text-[9px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-1 rounded-lg">
                        Explore →
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Methodology */}
            <div>
              <Card className="p-4 space-y-3">
                <SectionTitle title="How Rankings Work" action={<BarChart2 className="h-4 w-4 text-gray-400" />} />
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Industry activity rankings are computed transparently based on weekly verified practitioner activity and commercial intent.
                </p>
                {[
                  { signal: "Verified ASME Publications", weight: "35%" },
                  { signal: "Enterprise Search Volume", weight: "30%" },
                  { signal: "Procurement & RFP Signals", weight: "20%" },
                  { signal: "Event & Webinar Participation", weight: "15%" },
                ].map((item) => (
                  <div key={item.signal} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] text-gray-600 dark:text-gray-400">{item.signal}</span>
                    <span className="text-[10px] font-bold text-indigo-600">{item.weight}</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </section>

        {/* ── 17. PREMIUM INDUSTRY DISCOVERY & AI PREVIEW ────────────────────── */}
        <section id="all-sec-premium">
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-900 space-y-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Unlock Advanced Industry Discovery</h2>
                <p className="text-[10px] text-gray-500 mt-1">Full cross-industry intelligence, historical growth trends, and AI-powered practitioner matching.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "FREE",
                  color: "border-gray-200 dark:border-gray-800",
                  items: ["Master sector directory", "Industry directory search", "Popular skill tags", "Basic news previews"],
                  locked: false
                },
                {
                  tier: "PRO",
                  color: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
                  items: ["Advanced Industry Intelligence", "Historical Trend Velocity", "AI ASME Competency Matching", "Full Opportunity Directory", "Direct Inquiry Routing"],
                  locked: true
                },
                {
                  tier: "ENTERPRISE",
                  color: "border-purple-400 bg-purple-50 dark:bg-purple-950/20",
                  items: ["Custom Industry Mapping", "Private RFP Pipeline", "Dedicated ASME Advisory Board", "Bespoke Cross-Border Reports", "Priority Placement"],
                  locked: true
                }
              ].map((plan) => (
                <div key={plan.tier} className={`border rounded-xl p-4 space-y-2 ${plan.color}`}>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{plan.tier}</span>
                  <ul className="space-y-1.5 mt-2">
                    {plan.items.map((item) => (
                      <li key={item} className="text-[10px] text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                        {plan.locked ? (
                          <>
                            <span className="shrink-0 mt-0.5" aria-hidden="true">🔒</span>
                            <span>{item}</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link href="/eoi" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-xs">
              Unlock Premium Industry Intelligence →
            </Link>
          </Card>
        </section>

        {/* ── 18. FEATURED / SPONSORED INDUSTRY & 19. PREMIUM VISIBILITY ─────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Sponsored Industry Spotlight */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/20 dark:to-slate-900/40 border-blue-200 dark:border-blue-900 relative">
            <span className="absolute top-4 right-4 text-[8px] font-bold bg-amber-100 dark:bg-amber-950/30 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              SPONSORED
            </span>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Featured Industry Partner</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Sovereign Artificial Intelligence &amp; Cloud Infrastructure</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
              Accelerating Indian enterprise LLM deployment with indigenous data sovereignty architectures and certified ASME advisors.
            </p>
            <Link href="/eoi" className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors">
              Explore Partner Hub →
            </Link>
          </Card>

          {/* Premium ASME Visibility */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Get Discovered Across Your Industry</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Elevate your ASME practice across relevant sectors, industries, and skills.</p>
              </div>
            </div>
            <ul className="space-y-2">
              {["Featured Industry Placement", "Popular Skill Spotlights", "Verified Practitioner Badging", "Opportunity Lead Routing"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-400">
                  <Zap className="h-3 w-3 text-amber-500 shrink-0" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors">
              Increase My Visibility →
            </Link>
          </Card>
        </div>

        {/* ── 20. NEWSLETTER ─────────────────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-indigo-700 to-blue-800 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-white/70" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">ASME Industry Brief</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get cross-industry trends, emerging sectors, practitioner skills, and business opportunities delivered to your inbox.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-52 rounded-xl bg-white/15 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20"
                placeholder="Enter your email address..."
                aria-label="Newsletter email address"
                type="email"
              />
              <button
                className="bg-white text-indigo-800 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-xs"
                aria-label="Subscribe to ASME Industry Brief"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-[9px] text-white/50 text-center">Trusted by 32,000+ cross-industry executives &amp; practitioners · Unsubscribe anytime</p>
          </Card>
        </section>

      </div>
    </div>
  );
}

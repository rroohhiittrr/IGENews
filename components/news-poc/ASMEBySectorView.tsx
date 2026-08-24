"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  BarChart2,
  Bookmark,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Crown,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  GraduationCap,
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
  Handshake,
  Compass
} from "lucide-react";

// ─── Local UI primitives (strictly scoped to ASME By Sector) ─────────────────

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

// ─── Sector-Centric Mock Data ────────────────────────────────────────────────

interface SectorInfo {
  id: string;
  name: string;
  icon: string;
  asmeCount: number;
  industriesCount: number;
  growth: string;
  description: string;
  signal: string;
  trending: boolean;
  emerging: boolean;
  featured: boolean;
  sponsoredBy?: string;
}

const SECTOR_DATA: SectorInfo[] = [
  {
    id: "renewable-energy",
    name: "Renewable Energy & Cleantech",
    icon: "⚡",
    asmeCount: 480,
    industriesCount: 32,
    growth: "+38%",
    description: "Green hydrogen electrolysis, utility solar scaling, offshore wind, and clean power grid storage.",
    signal: "LCOH Tariff Modeling & GoI Subsidy Norms",
    trending: true,
    emerging: false,
    featured: true,
    sponsoredBy: "Global CleanPower Alliance"
  },
  {
    id: "fintech-banking",
    name: "FinTech & Digital Banking",
    icon: "💳",
    asmeCount: 640,
    industriesCount: 45,
    growth: "+29%",
    description: "Cross-border payment rails, UPI internationalization, neo-banking, and central bank digital currency (CBDC).",
    signal: "Cross-Border UPI ASEAN Interoperability",
    trending: true,
    emerging: false,
    featured: true,
  },
  {
    id: "defence-aerospace",
    name: "Defence & Aerospace",
    icon: "🛡️",
    asmeCount: 350,
    industriesCount: 28,
    growth: "+44%",
    description: "Autonomous tactical UAVs, avionics sensor fusion, indigenous radar architecture, and defense offsets.",
    signal: "Next-Gen Tactical Drone Swarm Protocols",
    trending: false,
    emerging: true,
    featured: true,
  },
  {
    id: "biotech-pharma",
    name: "Biotechnology & Healthcare",
    icon: "🧬",
    asmeCount: 410,
    industriesCount: 36,
    growth: "+22%",
    description: "Standardized phytochemical extracts, biosimilar scaling, AYUSH export compliance, and clinical analytics.",
    signal: "EU & UK Botanical Classifications",
    trending: false,
    emerging: true,
    featured: false,
  },
  {
    id: "logistics-shipping",
    name: "Logistics & Supply Chain",
    icon: "🚢",
    asmeCount: 530,
    industriesCount: 41,
    growth: "+31%",
    description: "Multimodal rail-port corridors, automated customs manifests, maritime freight risk, and supply chain telemetry.",
    signal: "IMEC Corridors & Red Sea Re-routing",
    trending: true,
    emerging: false,
    featured: false,
  },
  {
    id: "agritech-farming",
    name: "Agriculture & AgriTech",
    icon: "🌾",
    asmeCount: 290,
    industriesCount: 24,
    growth: "+18%",
    description: "Precision farming, drone pesticide spraying frameworks, climate-resilient seed tech, and farmgate cold chains.",
    signal: "Subsidized Drone Sprayer Compliance",
    trending: false,
    emerging: true,
    featured: false,
  },
  {
    id: "semiconductors-ai",
    name: "Semiconductors & Deep Tech",
    icon: "💻",
    asmeCount: 580,
    industriesCount: 39,
    growth: "+46%",
    description: "OSAT packaging, substrate fabrication, edge AI hardware, sovereign model weights, and chip design verification.",
    signal: "India Semiconductor Mission Phase-II",
    trending: true,
    emerging: true,
    featured: true,
  },
  {
    id: "smart-manufacturing",
    name: "Advanced Manufacturing",
    icon: "🏭",
    asmeCount: 360,
    industriesCount: 30,
    growth: "+25%",
    description: "Industrial robotics, PLC automation, digital twin simulations, and export quality standardizations.",
    signal: "Zero-Defect Zero-Effect (ZED) Audits",
    trending: false,
    emerging: false,
    featured: false,
  },
];

// Sector-specific ASME discovery data
const SECTOR_ASME_POOLS: Record<string, Array<{
  id: number;
  name: string;
  role: string;
  industry: string;
  country: string;
  expertise: string;
  initials: string;
  color: string;
  verified: boolean;
  featured: boolean;
  rate: string;
  followers: string;
  views: string;
  rank: number;
}>> = {
  "renewable-energy": [
    { id: 1, name: "Vikramaditya Sen", role: "Energy Transition Analyst", industry: "Green Hydrogen", country: "India", expertise: "LCOH Modeling", initials: "VS", color: "from-amber-500 to-orange-600", verified: true, featured: true, rate: "$90/hr", followers: "1.4K", views: "19.2K", rank: 1 },
    { id: 2, name: "Dr. Sandeep Rao", role: "Solar Photovoltaic Specialist", industry: "Utility Solar", country: "India", expertise: "Bifacial Cell Yield", initials: "SR", color: "from-yellow-500 to-amber-600", verified: true, featured: false, rate: "$85/hr", followers: "920", views: "12.8K", rank: 2 },
    { id: 3, name: "Elena Rostova", role: "Offshore Grid Architect", industry: "Wind Energy", country: "Singapore", expertise: "Subsea Cable HVDC", initials: "ER", color: "from-blue-500 to-cyan-600", verified: true, featured: true, rate: "$95/hr", followers: "1.1K", views: "15.4K", rank: 3 },
  ],
  "fintech-banking": [
    { id: 4, name: "Ananya Roy", role: "FinTech Compliance Analyst", industry: "Cross-Border Rails", country: "India", expertise: "UPI ASEAN Rails", initials: "AR", color: "from-cyan-500 to-blue-600", verified: true, featured: true, rate: "$85/hr", followers: "1.2K", views: "16.1K", rank: 1 },
    { id: 5, name: "Tariq Al-Mansoor", role: "Payment Gateways Associate", industry: "Digital Banking", country: "UAE", expertise: "CBDC Settlement", initials: "TM", color: "from-indigo-500 to-purple-600", verified: true, featured: false, rate: "$95/hr", followers: "870", views: "11.9K", rank: 2 },
    { id: 6, name: "Kavita Singhal", role: "RegTech Analyst", industry: "KYC & AML", country: "India", expertise: "FATF Compliance", initials: "KS", color: "from-pink-500 to-rose-600", verified: false, featured: false, rate: "$80/hr", followers: "740", views: "9.3K", rank: 3 },
  ],
  "defence-aerospace": [
    { id: 7, name: "Priya Nair", role: "Defence Technology Analyst", industry: "Tactical UAVs", country: "India", expertise: "Sensor Fusion", initials: "PN", color: "from-purple-500 to-indigo-600", verified: true, featured: true, rate: "$95/hr", followers: "1.7K", views: "24.1K", rank: 1 },
    { id: 8, name: "Col. (Retd) Arvind Joshi", role: "Aerospace Avionics Associate", industry: "Radar Systems", country: "India", expertise: "AESA Tracking", initials: "AJ", color: "from-blue-600 to-slate-700", verified: true, featured: false, rate: "$110/hr", followers: "1.3K", views: "18.5K", rank: 2 },
    { id: 9, name: "Marcus Vance", role: "Defence Offset Strategist", industry: "Aerospace", country: "UK", expertise: "ITAR & Dual-Use", initials: "MV", color: "from-slate-600 to-slate-800", verified: true, featured: false, rate: "$100/hr", followers: "960", views: "13.2K", rank: 3 },
  ],
  "biotech-pharma": [
    { id: 10, name: "Meghna Iyer", role: "Biotech Regulatory Analyst", industry: "Phytochemicals", country: "India", expertise: "EU Export Norms", initials: "MI", color: "from-rose-500 to-pink-600", verified: true, featured: true, rate: "$88/hr", followers: "910", views: "12.4K", rank: 1 },
    { id: 11, name: "Dr. Harsh Vardhan", role: "Biosimilar Process Analyst", industry: "Biopharma", country: "India", expertise: "Fermentation Yield", initials: "HV", color: "from-emerald-500 to-teal-600", verified: true, featured: false, rate: "$95/hr", followers: "820", views: "10.6K", rank: 2 },
  ],
};

// Fallback pool for sectors without customized sub-pools
const DEFAULT_ASME_POOL = [
  { id: 101, name: "Siddharth Mehta", role: "Trade Compliance Analyst", industry: "Customs & Freight", country: "India", expertise: "Manifest Digitization", initials: "SM", color: "from-teal-500 to-emerald-600", verified: true, featured: true, rate: "$80/hr", followers: "790", views: "10.1K", rank: 1 },
  { id: 102, name: "Rohan Pillai", role: "AgriTech Innovation Analyst", industry: "Precision Farming", country: "India", expertise: "Drone Sprayer Policy", initials: "RP", color: "from-green-500 to-teal-600", verified: false, featured: false, rate: "$78/hr", followers: "650", views: "7.9K", rank: 2 },
  { id: 103, name: "Kavya Sharma", role: "Deep Tech Policy Analyst", industry: "Semiconductors", country: "India", expertise: "OSAT Packaging", initials: "KS", color: "from-indigo-500 to-purple-600", verified: true, featured: true, rate: "$90/hr", followers: "1.1K", views: "14.6K", rank: 3 },
];

const SECTOR_EXPERTISE: Record<string, Array<{ name: string; count: string }>> = {
  "renewable-energy": [
    { name: "Green Hydrogen Electrolysis", count: "86 ASMEs" },
    { name: "Offshore Wind Turbines", count: "54 ASMEs" },
    { name: "Battery Energy Storage (BESS)", count: "72 ASMEs" },
    { name: "Carbon Credits & Offsets", count: "48 ASMEs" },
    { name: "PPA Tariff Structuring", count: "60 ASMEs" },
    { name: "Solar Bifacial Yield Optimization", count: "92 ASMEs" },
  ],
  "fintech-banking": [
    { name: "Cross-Border UPI Integration", count: "112 ASMEs" },
    { name: "Digital Lending Underwriting", count: "84 ASMEs" },
    { name: "CBDC Wholesale Settlements", count: "42 ASMEs" },
    { name: "FATF & AML Regulatory Systems", count: "67 ASMEs" },
    { name: "Payment Aggregator Licensing", count: "58 ASMEs" },
    { name: "Embedded Finance APIs", count: "79 ASMEs" },
  ],
  "defence-aerospace": [
    { name: "Autonomous Tactical UAVs", count: "64 ASMEs" },
    { name: "Radar Sensor Fusion", count: "45 ASMEs" },
    { name: "Defense Offset Structuring", count: "38 ASMEs" },
    { name: "Avionics DO-178C Compliance", count: "31 ASMEs" },
    { name: "Satellite Constellation Telemetry", count: "29 ASMEs" },
    { name: "Counter-Drone EW Systems", count: "41 ASMEs" },
  ],
};

const SECTOR_INDUSTRIES: Record<string, Array<{ name: string; count: string }>> = {
  "renewable-energy": [
    { name: "Green Hydrogen & Ammonia", count: "18 ASMEs" },
    { name: "Utility-Scale Solar Farms", count: "24 ASMEs" },
    { name: "Offshore & Onshore Wind", count: "14 ASMEs" },
    { name: "Grid Scale BESS Storage", count: "19 ASMEs" },
    { name: "Bio-Energy & CBG", count: "11 ASMEs" },
    { name: "EV Fast Charging Infrastructure", count: "16 ASMEs" },
  ],
  "fintech-banking": [
    { name: "Cross-Border Remittances", count: "28 ASMEs" },
    { name: "Neo-Banking & WealthTech", count: "22 ASMEs" },
    { name: "RegTech & Identity Verification", count: "19 ASMEs" },
    { name: "Decentralized Finance & CBDC", count: "15 ASMEs" },
    { name: "Merchant Payment Terminals", count: "17 ASMEs" },
    { name: "Micro-Insurance & InsurTech", count: "12 ASMEs" },
  ],
  "defence-aerospace": [
    { name: "UAV Swarms & Loitering Munitions", count: "21 ASMEs" },
    { name: "AESA Radar & Sonar", count: "14 ASMEs" },
    { name: "Small Satellite Launch Vehicles", count: "11 ASMEs" },
    { name: "Armored Vehicle Propulsion", count: "9 ASMEs" },
    { name: "Military Optronics & Night Vision", count: "13 ASMEs" },
    { name: "Electronic Countermeasures", count: "10 ASMEs" },
  ],
};

const SECTOR_NEWS: Record<string, Array<{ title: string; date: string; industry: string; readTime: string; author: string }>> = {
  "renewable-energy": [
    { title: "MNRE Releases Benchmark Guidelines for Green Hydrogen Electrolyser Manufacturing", date: "Today", industry: "Green Hydrogen", readTime: "4 min read", author: "Vikramaditya Sen" },
    { title: "Offshore Wind Bidding Pipeline Expands with 4 GW Gujarat Corridor Allocations", date: "Yesterday", industry: "Wind Energy", readTime: "5 min read", author: "Elena Rostova" },
    { title: "Grid Energy Arbitrage: Battery Storage Bids Fall Below Thermal Peaking Parity", date: "2 days ago", industry: "BESS", readTime: "3 min read", author: "Dr. Sandeep Rao" },
    { title: "Cross-Border Power Trading in South Asia Reaches 2.4 GW Daily Peak", date: "3 days ago", industry: "Power Grid", readTime: "4 min read", author: "Editorial Team" },
  ],
  "fintech-banking": [
    { title: "NPCI International Expands Cross-Border QR Rails Across 4 Middle East Hubs", date: "Today", industry: "UPI Rails", readTime: "3 min read", author: "Ananya Roy" },
    { title: "RBI Issues Updated Digital Lending Guidelines on First-Loss Default Guarantees", date: "Yesterday", industry: "Digital Lending", readTime: "5 min read", author: "Tariq Al-Mansoor" },
    { title: "Cross-Border Trade Settlements in Local Currencies Grow 34% Year-over-Year", date: "2 days ago", industry: "CBDC", readTime: "4 min read", author: "Kavita Singhal" },
    { title: "AI-Driven KYC Fraud Detection Reduces Onboarding Abandonment by 22%", date: "4 days ago", industry: "RegTech", readTime: "3 min read", author: "Editorial Team" },
  ],
  "defence-aerospace": [
    { title: "DefExpo 2026 Spotlights Indigenous Micro-Turbine Engines for Light Tactical Drones", date: "Today", industry: "UAV Systems", readTime: "4 min read", author: "Priya Nair" },
    { title: "Defence Ministry Approves Fast-Track Procurement for Next-Gen Tactical Radios", date: "2 days ago", industry: "Avionics", readTime: "5 min read", author: "Col. Joshi" },
    { title: "Space Tech Startups Secure Dual-Use Earth Observation Contracts with Coast Guard", date: "3 days ago", industry: "Aerospace", readTime: "3 min read", author: "Marcus Vance" },
    { title: "Advanced Composite Materials Facility Commissioned for Fighter Aircraft Fuselages", date: "5 days ago", industry: "Manufacturing", readTime: "4 min read", author: "Editorial Team" },
  ],
};

const SECTOR_LEARNING_RESOURCES = [
  { title: "Comprehensive LCOH Tariff Arbitrage Modeling Framework (2026)", type: "Technical Whitepaper", format: "PDF (3.2 MB)", downloads: "1.8K" },
  { title: "Cross-Border UPI Integration: Operational Checklist for FinTechs", type: "Compliance Guide", format: "PDF (2.1 MB)", downloads: "2.4K" },
  { title: "UAV Sensor Fusion Protocols: Multi-Spectral Camera & LiDAR Integration", type: "Engineering Brief", format: "PDF (4.5 MB)", downloads: "1.2K" },
  { title: "Phytochemical Standardization Manual for European Botanical Registrations", type: "Export Handbook", format: "PDF (2.8 MB)", downloads: "950" },
];

const SECTOR_OPPORTUNITIES = [
  { title: "Green Hydrogen Electrolyser Pilot Procurement", entity: "Public Energy Utility · India", scope: "5 MW PEM Stacks", deadline: "Closes in 12 days", type: "Procurement Tender" },
  { title: "ASEAN Payment Gateway Integration Partner", entity: "FinTech Consortium · Singapore/India", scope: "Real-time Settlement APIs", deadline: "Open RFP", type: "Partnership" },
  { title: "Autonomous Tactical Drone Sub-System Supply", entity: "Defence Systems Integrator", scope: "Gimbal & Thermal Sensor Pods", deadline: "Closes in 18 days", type: "Supply Contract" },
  { title: "EU Botanical Extract Distribution Mandate", entity: "Pharma Importer · Germany", scope: "Standardized Curcumin & Ashwagandha Extracts", deadline: "Immediate", type: "Export Mandate" },
];

const SECTOR_MENTORS = [
  { name: "Dr. Sandeep Rao", domain: "Clean Power & Storage", experience: "14+ yrs", availability: "2 sessions/week", sessionsConducted: 48, rating: 4.9, initials: "SR", color: "from-amber-500 to-orange-600" },
  { name: "Ananya Roy", domain: "FinTech Compliance & Cross-Border", experience: "11+ yrs", availability: "3 sessions/week", sessionsConducted: 62, rating: 4.8, initials: "AR", color: "from-cyan-500 to-blue-600" },
  { name: "Priya Nair", domain: "Defence UAVs & Embedded AI", experience: "12+ yrs", availability: "1 session/week", sessionsConducted: 39, rating: 5.0, initials: "PN", color: "from-purple-500 to-indigo-600" },
];

const SECTOR_ACHIEVEMENTS = [
  { title: "ASME Vikramaditya Sen's LCOH Report Adopted by Inter-Ministerial Energy Taskforce", category: "Policy Benchmark", time: "3 days ago" },
  { title: "DefExpo 2026 Innovation Citation Awarded to Priya Nair for Tactical Sensor Fusion", category: "Industry Award", time: "5 days ago" },
  { title: "FinTech ASME Ananya Roy Keynotes ASEAN Central Banking Working Group in Singapore", category: "Global Recognition", time: "1 week ago" },
];

const RANKING_METRICS_TABS = ["Top ASMEs", "Most Viewed", "Most Followed", "Most Active"] as const;
type RankingTab = typeof RANKING_METRICS_TABS[number];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ASMEBySectorView() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>("renewable-energy");
  const [sectorSearchQuery, setSectorSearchQuery] = useState("");
  const [activeRankTab, setActiveRankTab] = useState<RankingTab>("Top ASMEs");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeNavSection, setActiveNavSection] = useState("directory");

  const currentSector = SECTOR_DATA.find((s) => s.id === selectedSectorId) || SECTOR_DATA[0];
  const sectorAsmes = SECTOR_ASME_POOLS[selectedSectorId] || DEFAULT_ASME_POOL;
  const sectorExpertise = SECTOR_EXPERTISE[selectedSectorId] || SECTOR_EXPERTISE["renewable-energy"];
  const sectorIndustries = SECTOR_INDUSTRIES[selectedSectorId] || SECTOR_INDUSTRIES["renewable-energy"];
  const sectorNews = SECTOR_NEWS[selectedSectorId] || SECTOR_NEWS["renewable-energy"];

  const filteredSectors = SECTOR_DATA.filter((s) =>
    s.name.toLowerCase().includes(sectorSearchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(sectorSearchQuery.toLowerCase()) ||
    s.signal.toLowerCase().includes(sectorSearchQuery.toLowerCase())
  );

  const navItems = [
    { id: "directory", label: "Sector Directory" },
    { id: "featured", label: "Featured Sectors" },
    { id: "trending", label: "Trending" },
    { id: "emerging", label: "Emerging" },
    { id: "top-asmes", label: "Top ASMEs" },
    { id: "rankings", label: "Rankings" },
    { id: "expertise", label: "Expertise" },
    { id: "industries", label: "Industries" },
    { id: "snapshot", label: "Snapshot" },
    { id: "news", label: "Sector News" },
    { id: "learning", label: "Learning" },
    { id: "opportunities", label: "Opportunities" },
    { id: "mentorship", label: "Mentorship" },
    { id: "achievements", label: "Achievements" },
    { id: "premium", label: "Premium" },
  ];

  const scrollTo = (id: string) => {
    setActiveNavSection(id);
    const el = document.getElementById(`sector-sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 border border-white/20 px-3 py-1 rounded-full bg-white/10 inline-flex items-center gap-1.5 shadow-xs">
                <Compass className="h-3 w-3 text-cyan-300" /> ASME BY SECTOR
              </span>
              <span className="text-[10px] font-semibold text-cyan-200 bg-cyan-950/40 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                50 GoI-Aligned Sectors · 1,350+ Industries
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Discover ASMEs Across Every Industry Sector
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-2xl font-normal">
              Explore professionals, emerging experts, sector trends, learning resources, and business opportunities across the industry sectors that matter to your enterprise.
            </p>

            {/* 02. Search Experience */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={sectorSearchQuery}
                  onChange={(e) => setSectorSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search sectors, industries, expertise, or skills (e.g. Green Hydrogen, UAVs, UPI)..."
                  aria-label="Search sectors, industries or expertise"
                />
              </div>
              <button
                onClick={() => scrollTo("directory")}
                className="bg-white text-blue-800 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-sm"
              >
                Explore Sectors →
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
                { label: "Active Sectors", value: "50 GoI Sectors" },
                { label: "ASMEs Indexed", value: "3,200+ Verified" },
                { label: "Sub-Industries", value: "1,350+ Mapped" },
                { label: "Active Opportunities", value: "240+ Live Leads" },
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

      {/* ── 03. SECTOR NAVIGATION (STICKY CHIP BAR) ──────────────────────────── */}
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
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTIVE SECTOR BANNER STRIP ──────────────────────────────────────── */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40 py-3">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" aria-hidden="true">{currentSector.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white">{currentSector.name}</span>
                <Badge color="blue">Active Focus</Badge>
                {currentSector.sponsoredBy && <Badge color="amber">Sponsored by {currentSector.sponsoredBy}</Badge>}
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">{currentSector.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-semibold text-gray-500">Jump to Sector:</span>
            <select
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1 text-xs font-bold text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              aria-label="Select active sector"
            >
              {SECTOR_DATA.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.asmeCount} ASMEs)</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 04. SECTOR DIRECTORY ───────────────────────────────────────────── */}
        <section id="sector-sec-directory">
          <SectionTitle
            title="Explore Sectors"
            action={
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                Showing {filteredSectors.length} of {SECTOR_DATA.length} Sectors
              </span>
            }
          />
          {filteredSectors.length === 0 ? (
            <Card className="p-8 text-center text-gray-400 text-xs">
              No sectors match your search query. Try another keyword or clear the search.
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSectors.map((sector) => {
                const isSelected = sector.id === selectedSectorId;
                return (
                  <Card
                    key={sector.id}
                    className={`p-4 transition-all cursor-pointer group hover:shadow-md ${
                      isSelected
                        ? "border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20 dark:bg-blue-950/20"
                        : "hover:border-blue-400 dark:hover:border-blue-600"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl" aria-hidden="true">{sector.icon}</span>
                      <div className="flex flex-col items-end gap-1">
                        {sector.trending && <Badge color="indigo">↑ Trending</Badge>}
                        {sector.emerging && <Badge color="purple">Emerging</Badge>}
                        {sector.featured && <Badge color="amber">Featured</Badge>}
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 leading-snug">
                      {sector.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                      {sector.description}
                    </p>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-2.5 mt-3">
                      <span className="font-bold text-gray-700 dark:text-gray-300">{sector.asmeCount} ASMEs</span>
                      <span>{sector.industriesCount} Industries</span>
                      <span className="font-bold text-emerald-600">{sector.growth}</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSectorId(sector.id);
                        scrollTo("top-asmes");
                      }}
                      className={`w-full text-center text-[10px] font-bold py-2 rounded-lg mt-3 transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                      aria-label={`Explore ASMEs in ${sector.name}`}
                    >
                      {isSelected ? "Active Sector Selected ✓" : "Explore Sector →"}
                    </button>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* ── 05, 06, 07. FEATURED, TRENDING & EMERGING SECTORS ───────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Featured Sectors */}
          <section id="sector-sec-featured">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Featured Sectors" action={<Star className="h-4 w-4 text-amber-500" />} />
              <div className="space-y-2.5">
                {SECTOR_DATA.filter((s) => s.featured).slice(0, 3).map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => { setSelectedSectorId(sec.id); scrollTo("top-asmes"); }}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-amber-400 transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{sec.icon} {sec.name}</span>
                      <Badge color="amber">Editorial Choice</Badge>
                    </div>
                    <p className="text-[9px] text-gray-400">{sec.asmeCount} ASMEs · {sec.industriesCount} Industries</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Trending Sectors */}
          <section id="sector-sec-trending">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Trending Sectors" action={<TrendingUp className="h-4 w-4 text-blue-500" />} />
              <div className="space-y-2.5">
                {SECTOR_DATA.filter((s) => s.trending).slice(0, 3).map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => { setSelectedSectorId(sec.id); scrollTo("top-asmes"); }}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-400 transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{sec.icon} {sec.name}</span>
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded">↑ Trending {sec.growth}</span>
                    </div>
                    <p className="text-[9px] text-gray-400">⚡ {sec.signal}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Emerging Sectors */}
          <section id="sector-sec-emerging">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Emerging Sectors" action={<Sparkles className="h-4 w-4 text-purple-500" />} />
              <div className="space-y-2.5">
                {SECTOR_DATA.filter((s) => s.emerging).slice(0, 3).map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => { setSelectedSectorId(sec.id); scrollTo("top-asmes"); }}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-400 transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{sec.icon} {sec.name}</span>
                      <Badge color="purple">Emerging Hub</Badge>
                    </div>
                    <p className="text-[9px] text-gray-400">{sec.asmeCount} Emerging ASMEs mapped</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 08. TOP ASMES BY SECTOR & 09. EMERGING ASMES ───────────────────── */}
        <section id="sector-sec-top-asmes" className="space-y-4">
          <SectionTitle
            title={`Top ASMEs in ${currentSector.name}`}
            action={
              <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">
                View All {currentSector.asmeCount} in {currentSector.name} →
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectorAsmes.map((asme) => (
              <Card key={asme.id} className="p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                      {asme.initials}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{asme.name}</h3>
                      <p className="text-[9px] text-gray-400">{asme.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-1.5 py-0.5 rounded">
                      #{asme.rank}
                    </span>
                    {asme.verified && (
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <CheckCircle className="h-2.5 w-2.5" /> Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge color="blue">{asme.industry}</Badge>
                  <Badge color="indigo">{asme.expertise}</Badge>
                  <Badge color="purple">{asme.country}</Badge>
                </div>

                <div className="flex items-center justify-between text-[9px] text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-2">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{asme.views}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{asme.followers}</span>
                  <span className="font-bold text-blue-600">{asme.rate}</span>
                </div>

                <Link
                  href="/eoi"
                  className="block w-full text-center text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  aria-label={`View ${asme.name}'s ASME profile`}
                >
                  View ASME →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 10. SECTOR ASME RANKINGS & 11. RANKING METHODOLOGY ─────────────── */}
        <section id="sector-sec-rankings">
          <SectionTitle
            title={`Sector ASME Rankings: ${currentSector.name}`}
            action={<Badge color="indigo">Updated Weekly</Badge>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-4 space-y-4">
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800 flex-wrap">
                  {RANKING_METRICS_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveRankTab(tab)}
                      className={`flex-1 min-w-[70px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                        activeRankTab === tab
                          ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {sectorAsmes.map((asme, idx) => (
                    <div key={asme.id} className="flex items-center gap-3 py-3">
                      <div className="w-6 shrink-0 text-center">
                        <span className={`text-sm font-bold ${idx === 0 ? "text-amber-500" : "text-gray-400"}`}>
                          #{idx + 1}
                        </span>
                      </div>
                      <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {asme.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{asme.name}</p>
                        <p className="text-[9px] text-gray-400">{asme.industry} · {asme.expertise}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] text-gray-400 font-semibold">{asme.views}</span>
                        {idx === 0 && <Trophy className="h-3.5 w-3.5 text-amber-500" aria-label="Rank #1 Leader" />}
                        <Link href="/eoi" className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded-lg">
                          View →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Methodology */}
            <div>
              <Card className="p-4 space-y-3">
                <SectionTitle title="How Sector Rankings Work" action={<BarChart2 className="h-4 w-4 text-gray-400" />} />
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Sector rankings are computed using transparent platform weights reflecting verified sector domain contributions.
                </p>
                {[
                  { signal: "Sector Technical Publications", weight: "30%" },
                  { signal: "Verified Enterprise Inquiries", weight: "25%" },
                  { signal: "Sector Mentorship Activity", weight: "20%" },
                  { signal: "Industry Peer Endorsements", weight: "15%" },
                  { signal: "Profile Completeness & Verification", weight: "10%" },
                ].map((item) => (
                  <div key={item.signal} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] text-gray-600 dark:text-gray-400">{item.signal}</span>
                    <span className="text-[10px] font-bold text-blue-600">{item.weight}</span>
                  </div>
                ))}
                <Link href="/eoi" className="block text-center text-[10px] font-bold text-blue-600 hover:underline pt-1">
                  Full Sector Methodology →
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* ── 12. EXPLORE EXPERTISE & 13. EXPLORE INDUSTRIES ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Explore Expertise in Sector */}
          <section id="sector-sec-expertise">
            <Card className="p-4 h-full space-y-4">
              <SectionTitle
                title={`Expertise in ${currentSector.name}`}
                action={<Target className="h-4 w-4 text-blue-500" />}
              />
              <p className="text-[10px] text-gray-500">Discover specialized domains and practice areas supported by ASMEs in this sector.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sectorExpertise.map((exp) => (
                  <Link
                    key={exp.name}
                    href="/eoi"
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 leading-snug">{exp.name}</h4>
                      <span className="text-[9px] text-gray-400">{exp.count}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          {/* Explore Industries in Sector */}
          <section id="sector-sec-industries">
            <Card className="p-4 h-full space-y-4">
              <SectionTitle
                title={`Industries in ${currentSector.name}`}
                action={<Layers className="h-4 w-4 text-indigo-500" />}
              />
              <p className="text-[10px] text-gray-500">Sub-industry verticals mapped under this sector taxonomy.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sectorIndustries.map((ind) => (
                  <Link
                    key={ind.name}
                    href="/eoi"
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-indigo-400 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 leading-snug">{ind.name}</h4>
                      <span className="text-[9px] text-gray-400">{ind.count}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-500 shrink-0" />
                  </Link>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 14. SECTOR SNAPSHOT ────────────────────────────────────────────── */}
        <section id="sector-sec-snapshot">
          <Card className="p-6 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-white space-y-4 border-none shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentSector.icon}</span>
                <div>
                  <h3 className="text-sm font-bold">{currentSector.name} — Sector Snapshot</h3>
                  <p className="text-[10px] text-white/70">Real-time macro and ASME activity telemetry</p>
                </div>
              </div>
              <Badge color="emerald">Live Platform Signals</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Total ASMEs</div>
                <div className="text-xl font-bold mt-0.5">{currentSector.asmeCount}</div>
                <div className="text-[8px] text-emerald-300 font-semibold">{currentSector.growth} growth</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Mapped Industries</div>
                <div className="text-xl font-bold mt-0.5">{currentSector.industriesCount}</div>
                <div className="text-[8px] text-white/60">Sub-verticals</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Primary Signal</div>
                <div className="text-xs font-bold mt-1 text-cyan-200 line-clamp-1">{currentSector.signal}</div>
                <div className="text-[8px] text-white/60">Top searched</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Active Opportunities</div>
                <div className="text-xl font-bold mt-0.5">38 Leads</div>
                <div className="text-[8px] text-amber-300 font-semibold">Open tenders/RFPs</div>
              </div>
            </div>
          </Card>
        </section>

        {/* ── 15. LATEST SECTOR NEWS PREVIEW ─────────────────────────────────── */}
        <section id="sector-sec-news">
          <SectionTitle
            title={`Latest News in ${currentSector.name}`}
            action={
              <Link href="/en/news-poc/expert-news/asme/news" className="text-[10px] font-bold text-blue-600 hover:underline">
                View All Sector News →
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectorNews.map((item, idx) => (
              <Card key={idx} className="p-4 space-y-2.5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-[9px] text-gray-400">
                  <span className="font-bold text-blue-600">{item.industry}</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug hover:text-blue-600 cursor-pointer">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[8px] text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-2">
                  <span>By {item.author}</span>
                  <span>{item.readTime}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 16. LEARNING RESOURCES & 17. BUSINESS OPPORTUNITIES ────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Learning Resources */}
          <section id="sector-sec-learning">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle
                title="Sector Learning Resources & Whitepapers"
                action={<Download className="h-4 w-4 text-blue-500" />}
              />
              <div className="space-y-2.5">
                {SECTOR_LEARNING_RESOURCES.map((res, idx) => (
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

          {/* Business Opportunities */}
          <section id="sector-sec-opportunities">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle
                title="Sector Business Opportunities"
                action={<Handshake className="h-4 w-4 text-emerald-500" />}
              />
              <div className="space-y-2.5">
                {SECTOR_OPPORTUNITIES.map((opp, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{opp.title}</span>
                      <Badge color="emerald">{opp.type}</Badge>
                    </div>
                    <p className="text-[10px] text-gray-500">{opp.entity} · Scope: {opp.scope}</p>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                      <span className="text-rose-500 font-semibold">{opp.deadline}</span>
                      <Link href="/eoi" className="font-bold text-blue-600 hover:underline">
                        Explore Opportunity →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 18. SECTOR MENTORSHIP & 19. ACHIEVEMENTS ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Sector Mentorship */}
          <section id="sector-sec-mentorship">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle
                title="Find a Mentor in This Sector"
                action={<UserCheck className="h-4 w-4 text-purple-500" />}
              />
              <p className="text-[10px] text-gray-500">Connect 1:1 with verified senior practitioners and advisors in this industry sector.</p>
              <div className="space-y-2.5">
                {SECTOR_MENTORS.map((m, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${m.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {m.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-900 dark:text-white">{m.name}</span>
                          <span className="flex items-center text-[8px] font-bold text-amber-500"><Star className="h-2.5 w-2.5 fill-amber-500" /> {m.rating}</span>
                        </div>
                        <p className="text-[9px] text-gray-400">{m.domain} · {m.experience} exp</p>
                        <p className="text-[8px] text-emerald-600 font-semibold">{m.availability} ({m.sessionsConducted} sessions)</p>
                      </div>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1.5 rounded-lg shrink-0">
                      Explore Mentors →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Sector Achievements */}
          <section id="sector-sec-achievements">
            <Card className="p-4 h-full space-y-3">
              <SectionTitle
                title="Sector Achievements & Milestones"
                action={<Trophy className="h-4 w-4 text-amber-500" />}
              />
              <div className="space-y-3">
                {SECTOR_ACHIEVEMENTS.map((a, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge color="amber">{a.category}</Badge>
                      <span className="text-[8px] text-gray-400">{a.time}</span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200 leading-snug">{a.title}</p>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline block pt-0.5">
                      Read Story →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 20. RECOMMENDED ASMES (PERSONALIZED) ──────────────────────────── */}
        <section>
          <SectionTitle
            title={`Recommended for You in ${currentSector.name}`}
            action={<Badge color="indigo">Personalised</Badge>}
          />
          <Card className="p-4 space-y-3">
            <p className="text-[10px] text-gray-500">
              Recommendations based on your followed sector ({currentSector.name}), reader history, and advisory search signals.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sectorAsmes.slice(0, 3).map((asme) => (
                <div key={asme.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${asme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {asme.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{asme.name}</p>
                      <p className="text-[8px] text-gray-400">{asme.industry} · {asme.country}</p>
                    </div>
                  </div>
                  <Link href="/eoi" className="block text-center text-[9px] font-bold bg-blue-600 text-white py-1.5 rounded-lg">
                    View ASME →
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── 21. PREMIUM SECTOR DISCOVERY & AI DISCOVERY ────────────────────── */}
        <section id="sector-sec-premium">
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-900 space-y-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Unlock Advanced Sector Intelligence</h2>
                <p className="text-[10px] text-gray-500 mt-1">Access verified sector ranking history, AI expert matching, and enterprise procurement intelligence.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "FREE",
                  color: "border-gray-200 dark:border-gray-800",
                  items: ["Sector directory discovery", "Basic ASME listings", "Basic sector news preview", "Basic search filters"],
                  locked: false
                },
                {
                  tier: "PRO",
                  color: "border-blue-400 bg-blue-50 dark:bg-blue-950/20",
                  items: ["Advanced Sector Rankings", "Ranking Historical Trends", "AI-Powered ASME Matching", "Direct Advisory Connect", "Procurement Opportunity Signals"],
                  locked: true
                },
                {
                  tier: "ENTERPRISE",
                  color: "border-purple-400 bg-purple-50 dark:bg-purple-950/20",
                  items: ["Custom Sector Intelligence", "Dedicated Research Briefs", "RFP & Tender Early Access", "Custom ASME Advisory Board", "Priority Directory Placement"],
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
              Unlock Premium Intelligence →
            </Link>
          </Card>
        </section>

        {/* ── 22. GET YOUR ASME FEATURED IN THIS SECTOR ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Increase Visibility in Your Sector</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Get your ASME discovered by B2B buyers and decision makers in {currentSector.name}.</p>
              </div>
            </div>
            <ul className="space-y-2">
              {["Featured Sector Placement", "Industry Spotlights", "Sector Opportunity Lead Alerts", "Sponsored Placement"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-400">
                  <Zap className="h-3 w-3 text-amber-500 shrink-0" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors">
              Get Featured in {currentSector.name} →
            </Link>
          </Card>

          {/* ── 23. SPONSORED SECTOR SPOTLIGHT ───────────────────────────────── */}
          <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-950/20 dark:to-slate-900/40 border-blue-200 dark:border-blue-900 relative">
            <span className="absolute top-4 right-4 text-[8px] font-bold bg-amber-100 dark:bg-amber-950/30 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              SPONSORED
            </span>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Sector Partner Spotlight</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Supported by {currentSector.sponsoredBy || "iGEN Enterprise Network"}</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
              Accelerate industry adoption through sponsored whitepapers, co-branded webinars, and curated ASME advisory panels.
            </p>
            <Link href="/eoi" className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors">
              Become a Sector Partner →
            </Link>
          </Card>
        </div>

        {/* ── 24. SECTOR INTELLIGENCE NEWSLETTER ─────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-white/70" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">Sector Intelligence Brief</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get sector news, emerging ASMEs, regulatory updates, and business opportunities delivered directly to your inbox.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-52 rounded-xl bg-white/15 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20"
                placeholder="Enter your work email..."
                aria-label="Newsletter email address"
                type="email"
              />
              <button
                className="bg-white text-blue-800 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-xs"
                aria-label="Subscribe to Sector Intelligence Brief"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-[9px] text-white/50 text-center">Trusted by 24,000+ industry practitioners &amp; enterprise leaders · Unsubscribe anytime</p>
          </Card>
        </section>

      </div>
    </div>
  );
}

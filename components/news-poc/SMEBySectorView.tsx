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
  Compass,
  Check
} from "lucide-react";

// ─── Local UI primitives (strictly scoped to SME By Sector) ───────────────────

function Card({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
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

// ─── Sector-Centric Mock Data for SME ────────────────────────────────────────

interface SectorInfo {
  id: string;
  name: string;
  icon: string;
  smeCount: number;
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
    id: "semiconductors-ai",
    name: "Semiconductors & Deep Tech",
    icon: "💻",
    smeCount: 720,
    industriesCount: 42,
    growth: "+48%",
    description: "3nm OSAT packaging, substrate fabrication, edge AI hardware, sovereign model weights, and chip design verification.",
    signal: "India Semiconductor Mission Phase-II Norms",
    trending: true,
    emerging: true,
    featured: true,
    sponsoredBy: "India Semiconductor Mission Alliance"
  },
  {
    id: "renewable-energy",
    name: "Clean Energy & Hydrogen",
    icon: "⚡",
    smeCount: 640,
    industriesCount: 36,
    growth: "+41%",
    description: "Green hydrogen electrolysis, utility solar scaling, offshore wind, and clean power grid battery storage.",
    signal: "LCOH Tariff Modeling & Subsidy Allocations",
    trending: true,
    emerging: false,
    featured: true,
  },
  {
    id: "fintech-banking",
    name: "FinTech & Banking Rails",
    icon: "💳",
    smeCount: 760,
    industriesCount: 48,
    growth: "+32%",
    description: "Cross-border payment rails, UPI internationalization, ISO 20022 messaging, and CBDC liquidity frameworks.",
    signal: "Cross-Border UPI ASEAN Interoperability",
    trending: true,
    emerging: false,
    featured: true,
  },
  {
    id: "defence-aerospace",
    name: "Defence & Aerospace",
    icon: "🛡️",
    smeCount: 480,
    industriesCount: 32,
    growth: "+46%",
    description: "Autonomous tactical UAVs, avionics sensor fusion, indigenous AESA radar architecture, and defense offsets.",
    signal: "Next-Gen Tactical Drone Swarm Protocols",
    trending: false,
    emerging: true,
    featured: true,
  },
  {
    id: "biotech-pharma",
    name: "Healthcare & Biosimilars",
    icon: "🧬",
    smeCount: 580,
    industriesCount: 38,
    growth: "+26%",
    description: "Standardized phytochemical extracts, biosimilar scaling, USFDA/EMA clinical filings, and oncology analytics.",
    signal: "USFDA Accelerated Approval Pathways",
    trending: false,
    emerging: true,
    featured: false,
  },
  {
    id: "logistics-shipping",
    name: "Logistics & Multimodal",
    icon: "🚢",
    smeCount: 510,
    industriesCount: 40,
    growth: "+34%",
    description: "Multimodal rail-port corridors, automated customs manifests, IMEC trade routes, and maritime freight telemetry.",
    signal: "IMEC Corridors & Red Sea Re-routing",
    trending: true,
    emerging: false,
    featured: false,
  },
  {
    id: "agritech-farming",
    name: "AgriTech & Precision Farming",
    icon: "🌾",
    smeCount: 460,
    industriesCount: 28,
    growth: "+22%",
    description: "Precision farming, drone pesticide spraying frameworks, climate-resilient seed tech, and farmgate cold chains.",
    signal: "Subsidized Drone Sprayer Compliance",
    trending: false,
    emerging: true,
    featured: false,
  },
  {
    id: "smart-manufacturing",
    name: "Advanced Manufacturing",
    icon: "🏭",
    smeCount: 490,
    industriesCount: 34,
    growth: "+28%",
    description: "Industrial robotics, PLC automation, digital twin simulations, and export quality standardizations.",
    signal: "Zero-Defect Zero-Effect (ZED) Audits",
    trending: false,
    emerging: false,
    featured: false,
  },
];

// Sector-specific SME discovery data
const SECTOR_SME_POOLS: Record<string, Array<{
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
  "semiconductors-ai": [
    { id: 1, name: "Dr. Arvind Subramanian", role: "Principal Semiconductor Architect", industry: "Semiconductors & OSAT", country: "India", expertise: "3nm Lithography & Packaging", initials: "AS", color: "from-blue-600 to-indigo-700", verified: true, featured: true, rate: "$120/hr", followers: "2.4K", views: "34.2K", rank: 1 },
    { id: 2, name: "Dr. K. Swaminathan", role: "Silicon Photonics Fellow", industry: "OSAT Packaging", country: "Singapore", expertise: "Wafer Testing Protocols", initials: "KS", color: "from-indigo-600 to-purple-600", verified: true, featured: false, rate: "$130/hr", followers: "1.9K", views: "26.4K", rank: 2 },
    { id: 3, name: "Kavya Sharma", role: "Deep Tech Policy Lead", industry: "VLSI Design", country: "India", expertise: "RISC-V Architectures", initials: "KS", color: "from-cyan-600 to-blue-600", verified: true, featured: true, rate: "$110/hr", followers: "1.6K", views: "21.8K", rank: 3 },
  ],
  "renewable-energy": [
    { id: 4, name: "Raghavendra Kulkarni", role: "Green Hydrogen Infrastructure SME", industry: "Renewables & Hydrogen", country: "India", expertise: "PEM Electrolysers", initials: "RK", color: "from-emerald-500 to-teal-700", verified: true, featured: true, rate: "$105/hr", followers: "1.5K", views: "22.4K", rank: 1 },
    { id: 5, name: "Dr. Sandeep Rao", role: "Solar Photovoltaic Specialist", industry: "Utility Solar", country: "India", expertise: "Bifacial Cell Yield", initials: "SR", color: "from-yellow-500 to-amber-600", verified: true, featured: false, rate: "$95/hr", followers: "1.2K", views: "18.6K", rank: 2 },
    { id: 6, name: "Elena Rostova", role: "Offshore Grid Architect", industry: "Wind Energy", country: "Singapore", expertise: "Subsea Cable HVDC", initials: "ER", color: "from-blue-500 to-cyan-600", verified: true, featured: true, rate: "$115/hr", followers: "1.4K", views: "19.8K", rank: 3 },
  ],
  "fintech-banking": [
    { id: 7, name: "Nandini Bhattacharya", role: "FinTech Settlement & Cross-Border SME", industry: "Digital Payments", country: "India", expertise: "ISO 20022 & UPI Rails", initials: "NB", color: "from-purple-600 to-rose-600", verified: true, featured: true, rate: "$115/hr", followers: "1.9K", views: "26.1K", rank: 1 },
    { id: 8, name: "Tariq Al-Mansoor", role: "Payment Gateways Principal", industry: "Digital Banking", country: "UAE", expertise: "CBDC Settlement", initials: "TM", color: "from-indigo-500 to-purple-600", verified: true, featured: false, rate: "$125/hr", followers: "1.3K", views: "17.9K", rank: 2 },
    { id: 9, name: "Ananya Roy", role: "FinTech Compliance Analyst", industry: "Cross-Border Rails", country: "India", expertise: "UPI ASEAN Rails", initials: "AR", color: "from-cyan-500 to-blue-600", verified: true, featured: false, rate: "$100/hr", followers: "1.4K", views: "18.2K", rank: 3 },
  ],
  "defence-aerospace": [
    { id: 10, name: "Commodore R. Venkat", role: "Defence Avionics & Radar Specialist", industry: "Aerospace & Radar", country: "India", expertise: "AESA Radar Integration", initials: "RV", color: "from-indigo-600 to-purple-700", verified: true, featured: true, rate: "$130/hr", followers: "2.9K", views: "41.8K", rank: 1 },
    { id: 11, name: "Priya Nair", role: "Defence Technology Analyst", industry: "Tactical UAVs", country: "India", expertise: "Sensor Fusion", initials: "PN", color: "from-purple-500 to-indigo-600", verified: true, featured: false, rate: "$115/hr", followers: "2.1K", views: "31.2K", rank: 2 },
    { id: 12, name: "Col. (Retd) Arvind Joshi", role: "Aerospace Avionics Specialist", industry: "Radar Systems", country: "India", expertise: "AESA Tracking", initials: "AJ", color: "from-blue-600 to-slate-700", verified: true, featured: false, rate: "$120/hr", followers: "1.7K", views: "24.5K", rank: 3 },
  ],
  "biotech-pharma": [
    { id: 13, name: "Dr. Meenakshi Sundaram", role: "Biopharma Regulatory Lead", industry: "Biosimilars & Oncology", country: "India", expertise: "USFDA & EMA Filings", initials: "MS", color: "from-cyan-500 to-teal-600", verified: true, featured: true, rate: "$110/hr", followers: "1.8K", views: "28.5K", rank: 1 },
    { id: 14, name: "Meghna Iyer", role: "Biotech Regulatory Specialist", industry: "Phytochemicals", country: "India", expertise: "EU Export Norms", initials: "MI", color: "from-rose-500 to-pink-600", verified: true, featured: false, rate: "$105/hr", followers: "1.3K", views: "18.4K", rank: 2 },
  ],
};

const DEFAULT_SME_POOL = [
  { id: 101, name: "Suresh Narayanan", role: "Supply Chain Resilience Consultant", industry: "Multimodal Freight", country: "India", expertise: "IMEC Corridors", initials: "SN", color: "from-amber-500 to-orange-600", verified: true, featured: true, rate: "$95/hr", followers: "1.1K", views: "16.8K", rank: 1 },
  { id: 102, name: "Rohan Pillai", role: "AgriTech Innovation Specialist", industry: "Precision Farming", country: "India", expertise: "Drone Sprayer Policy", initials: "RP", color: "from-green-500 to-teal-600", verified: false, featured: false, rate: "$88/hr", followers: "890", views: "12.9K", rank: 2 },
  { id: 103, name: "Vikram Singhania", role: "Automotive Systems SME", industry: "EV Powertrains", country: "India", expertise: "Battery Management Systems", initials: "VS", color: "from-blue-500 to-cyan-600", verified: true, featured: true, rate: "$105/hr", followers: "1.3K", views: "17.6K", rank: 3 },
];

const SECTOR_EXPERTISE: Record<string, Array<{ name: string; count: string }>> = {
  "semiconductors-ai": [
    { name: "3nm OSAT Packaging", count: "124 SMEs" },
    { name: "Substrate & Wafer Fabrication", count: "88 SMEs" },
    { name: "RISC-V Chip Architecture", count: "96 SMEs" },
    { name: "Sovereign LLM Weights", count: "142 SMEs" },
    { name: "Zero-Trust Edge Hardware", count: "78 SMEs" },
    { name: "Automotive Grade Silicon", count: "64 SMEs" },
  ],
  "renewable-energy": [
    { name: "Green Hydrogen Electrolysis", count: "112 SMEs" },
    { name: "Offshore Wind Turbines", count: "74 SMEs" },
    { name: "Battery Energy Storage (BESS)", count: "98 SMEs" },
    { name: "Carbon Credits & Offsets", count: "68 SMEs" },
    { name: "PPA Tariff Structuring", count: "82 SMEs" },
    { name: "Solar Bifacial Optimization", count: "126 SMEs" },
  ],
  "fintech-banking": [
    { name: "Cross-Border UPI Integration", count: "148 SMEs" },
    { name: "Digital Lending Underwriting", count: "116 SMEs" },
    { name: "CBDC Wholesale Settlements", count: "62 SMEs" },
    { name: "FATF & AML Regulatory Systems", count: "94 SMEs" },
    { name: "Payment Aggregator Licensing", count: "81 SMEs" },
    { name: "Embedded Finance APIs", count: "105 SMEs" },
  ],
  "defence-aerospace": [
    { name: "Autonomous Tactical UAVs", count: "92 SMEs" },
    { name: "AESA Radar Sensor Fusion", count: "68 SMEs" },
    { name: "Defense Offset Structuring", count: "54 SMEs" },
    { name: "Avionics DO-178C Compliance", count: "48 SMEs" },
    { name: "Satellite Constellation Telemetry", count: "41 SMEs" },
    { name: "Counter-Drone EW Systems", count: "62 SMEs" },
  ],
};

const SECTOR_INDUSTRIES: Record<string, Array<{ name: string; count: string }>> = {
  "semiconductors-ai": [
    { name: "OSAT Chip Packaging", count: "28 SMEs" },
    { name: "VLSI Circuit Design", count: "32 SMEs" },
    { name: "Foundry Fab Operations", count: "19 SMEs" },
    { name: "Edge AI Accelerators", count: "26 SMEs" },
    { name: "Quantum Computing Hardware", count: "14 SMEs" },
    { name: "Photonic Interconnects", count: "18 SMEs" },
  ],
  "renewable-energy": [
    { name: "Green Hydrogen & Ammonia", count: "26 SMEs" },
    { name: "Utility-Scale Solar Farms", count: "34 SMEs" },
    { name: "Offshore & Onshore Wind", count: "21 SMEs" },
    { name: "Grid Scale BESS Storage", count: "29 SMEs" },
    { name: "Bio-Energy & CBG", count: "16 SMEs" },
    { name: "EV Fast Charging Infrastructure", count: "24 SMEs" },
  ],
  "fintech-banking": [
    { name: "Cross-Border Remittances", count: "38 SMEs" },
    { name: "Neo-Banking & WealthTech", count: "31 SMEs" },
    { name: "RegTech & Identity Verification", count: "27 SMEs" },
    { name: "Decentralized Finance & CBDC", count: "22 SMEs" },
    { name: "Merchant Payment Terminals", count: "25 SMEs" },
    { name: "Micro-Insurance & InsurTech", count: "18 SMEs" },
  ],
  "defence-aerospace": [
    { name: "UAV Swarms & Loitering Munitions", count: "31 SMEs" },
    { name: "AESA Radar & Sonar", count: "22 SMEs" },
    { name: "Small Satellite Launch Vehicles", count: "16 SMEs" },
    { name: "Armored Vehicle Propulsion", count: "14 SMEs" },
    { name: "Military Optronics & Night Vision", count: "19 SMEs" },
    { name: "Electronic Countermeasures", count: "17 SMEs" },
  ],
};

const SECTOR_NEWS: Record<string, Array<{ title: string; date: string; industry: string; readTime: string; author: string }>> = {
  "semiconductors-ai": [
    { title: "ISM Approves $1.8B Packaging & OSAT Fab Facility in Sanand Under Phase-II", date: "Today", industry: "Semiconductors", readTime: "4 min read", author: "Dr. Arvind Subramanian" },
    { title: "India-US Semiconductor Supply Chain Accord Expedites Advanced Packaging Testbeds", date: "Yesterday", industry: "OSAT Packaging", readTime: "5 min read", author: "Dr. K. Swaminathan" },
    { title: "Sovereign AI Compute Infrastructure: 10,000 GPU Cluster Deployed in Hyderabad", date: "2 days ago", industry: "Deep Tech", readTime: "3 min read", author: "Kavya Sharma" },
    { title: "RISC-V Chip Core Architecture Standardized for Indigenous Automotive Microcontrollers", date: "3 days ago", industry: "VLSI Design", readTime: "4 min read", author: "Editorial Team" },
  ],
  "renewable-energy": [
    { title: "MNRE Releases Benchmark Guidelines for Green Hydrogen Electrolyser Manufacturing", date: "Today", industry: "Green Hydrogen", readTime: "4 min read", author: "Raghavendra Kulkarni" },
    { title: "Offshore Wind Bidding Pipeline Expands with 4 GW Gujarat Corridor Allocations", date: "Yesterday", industry: "Wind Energy", readTime: "5 min read", author: "Elena Rostova" },
    { title: "Grid Energy Arbitrage: Battery Storage Bids Fall Below Thermal Peaking Parity", date: "2 days ago", industry: "BESS", readTime: "3 min read", author: "Dr. Sandeep Rao" },
    { title: "Cross-Border Power Trading in South Asia Reaches 2.4 GW Daily Peak", date: "3 days ago", industry: "Power Grid", readTime: "4 min read", author: "Editorial Team" },
  ],
  "fintech-banking": [
    { title: "NPCI International Expands Cross-Border QR Rails Across 4 Middle East Hubs", date: "Today", industry: "UPI Rails", readTime: "3 min read", author: "Nandini Bhattacharya" },
    { title: "RBI Issues Updated Digital Lending Guidelines on First-Loss Default Guarantees", date: "Yesterday", industry: "Digital Lending", readTime: "5 min read", author: "Tariq Al-Mansoor" },
    { title: "Cross-Border Trade Settlements in Local Currencies Grow 34% Year-over-Year", date: "2 days ago", industry: "CBDC", readTime: "4 min read", author: "Ananya Roy" },
    { title: "AI-Driven KYC Fraud Detection Reduces Onboarding Abandonment by 22%", date: "4 days ago", industry: "RegTech", readTime: "3 min read", author: "Editorial Team" },
  ],
  "defence-aerospace": [
    { title: "DefExpo 2026 Spotlights Indigenous Micro-Turbine Engines for Light Tactical Drones", date: "Today", industry: "UAV Systems", readTime: "4 min read", author: "Commodore R. Venkat" },
    { title: "Defence Ministry Approves Fast-Track Procurement for Next-Gen Tactical Radios", date: "2 days ago", industry: "Avionics", readTime: "5 min read", author: "Col. Joshi" },
    { title: "Space Tech Startups Secure Dual-Use Earth Observation Contracts with Coast Guard", date: "3 days ago", industry: "Aerospace", readTime: "3 min read", author: "Priya Nair" },
    { title: "Advanced Composite Materials Facility Commissioned for Fighter Aircraft Fuselages", date: "5 days ago", industry: "Manufacturing", readTime: "4 min read", author: "Editorial Team" },
  ],
};

const SECTOR_LEARNING_RESOURCES = [
  { title: "Semiconductor OSAT Packaging & Substrate Fabrication Standards (2026)", type: "Technical Whitepaper", format: "PDF (3.8 MB)", downloads: "2.6K" },
  { title: "Comprehensive LCOH Tariff Arbitrage Modeling Framework", type: "Technical Whitepaper", format: "PDF (3.2 MB)", downloads: "2.1K" },
  { title: "Cross-Border UPI & ISO 20022 Integration Operational Guide", type: "Compliance Guide", format: "PDF (2.4 MB)", downloads: "3.1K" },
  { title: "Tactical UAV Radar & Sensor Fusion Integration Manual", type: "Engineering Brief", format: "PDF (4.5 MB)", downloads: "1.7K" },
];

const SECTOR_OPPORTUNITIES = [
  { title: "OSAT Packaging Testbed Engineering Advisory", entity: "Semiconductor Fab Integrator · India", scope: "Cleanroom Class 100 Standards", deadline: "Closes in 10 days", type: "Advisory Mandate" },
  { title: "Green Hydrogen Electrolyser Pilot Procurement", entity: "Public Energy Utility · India", scope: "5 MW PEM Stacks", deadline: "Closes in 12 days", type: "Procurement Tender" },
  { title: "ASEAN Payment Gateway Integration Partner", entity: "FinTech Consortium · Singapore/India", scope: "Real-time Settlement APIs", deadline: "Open RFP", type: "Partnership" },
  { title: "Autonomous Tactical Drone Sub-System Supply", entity: "Defence Systems Integrator", scope: "Gimbal & Thermal Sensor Pods", deadline: "Closes in 18 days", type: "Supply Contract" },
];

const SECTOR_MENTORS = [
  { name: "Dr. Arvind Subramanian", domain: "Semiconductors & Deep Tech", experience: "18+ yrs", availability: "2 sessions/week", sessionsConducted: 84, rating: 5.0, initials: "AS", color: "from-blue-600 to-indigo-700" },
  { name: "Commodore R. Venkat", domain: "Defence Radar & Avionics", experience: "22+ yrs", availability: "1 session/week", sessionsConducted: 92, rating: 4.9, initials: "RV", color: "from-indigo-600 to-purple-700" },
  { name: "Nandini Bhattacharya", domain: "FinTech Settlement & ISO 20022", experience: "14+ yrs", availability: "3 sessions/week", sessionsConducted: 76, rating: 4.9, initials: "NB", color: "from-purple-600 to-rose-600" },
];

const SECTOR_ACHIEVEMENTS = [
  { title: "SME Dr. Arvind Subramanian's OSAT Standard Adopted for India Semiconductor Mission", category: "Policy Benchmark", time: "2 days ago" },
  { title: "National Defence Innovation Citation Awarded to Commodore R. Venkat for Radar Fusion", category: "National Award", time: "4 days ago" },
  { title: "FinTech SME Nandini Bhattacharya Delivers Keynote at Global FinTech Festival", category: "Global Keynote", time: "1 week ago" },
];

const RANKING_METRICS_TABS = ["Top SMEs", "Most Viewed", "Most Followed", "Most Active"] as const;
type RankingTab = typeof RANKING_METRICS_TABS[number];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SMEBySectorView() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>("semiconductors-ai");
  const [sectorSearchQuery, setSectorSearchQuery] = useState("");
  const [activeRankTab, setActiveRankTab] = useState<RankingTab>("Top SMEs");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeNavSection, setActiveNavSection] = useState("directory");

  const currentSector = SECTOR_DATA.find((s) => s.id === selectedSectorId) || SECTOR_DATA[0];
  const sectorSmes = SECTOR_SME_POOLS[selectedSectorId] || DEFAULT_SME_POOL;
  const sectorExpertise = SECTOR_EXPERTISE[selectedSectorId] || SECTOR_EXPERTISE["semiconductors-ai"];
  const sectorIndustries = SECTOR_INDUSTRIES[selectedSectorId] || SECTOR_INDUSTRIES["semiconductors-ai"];
  const sectorNews = SECTOR_NEWS[selectedSectorId] || SECTOR_NEWS["semiconductors-ai"];

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
    { id: "top-smes", label: "Top SMEs" },
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
    const el = document.getElementById(`sme-sector-sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-950 text-white relative overflow-hidden border-b border-indigo-950/60">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-full bg-cyan-950/60 inline-flex items-center gap-1.5 shadow-xs">
                <Compass className="h-3 w-3 text-cyan-300" /> SME BY SECTOR
              </span>
              <span className="text-[10px] font-semibold text-cyan-200 bg-cyan-950/40 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                50 GoI-Aligned Sectors · 1,350+ Specialized Verticals
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Discover Subject Matter Experts Across Every Industry Sector
            </h1>
            <p className="text-base text-cyan-100/85 leading-relaxed max-w-2xl font-normal">
              Explore specialized technical authorities, industry advisors, sector innovation trends, and advisory opportunities across key industry sectors.
            </p>

            {/* 02. Search Experience */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={sectorSearchQuery}
                  onChange={(e) => setSectorSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search sectors, industries, specialized expertise, or skills (e.g. Semiconductors, UAVs, UPI)..."
                  aria-label="Search sectors, industries or expertise"
                />
              </div>
              <button
                onClick={() => scrollTo("directory")}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Explore Sectors →
              </button>
              <Link
                href="/eoi"
                className="border border-white/30 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs"
              >
                Find an SME →
              </Link>
            </div>

            {/* Stats Strip */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-white/15">
              {[
                { label: "Active Sectors", value: "50 GoI Sectors" },
                { label: "SMEs Indexed", value: "4,800+ Verified" },
                { label: "Sub-Industries", value: "1,350+ Mapped" },
                { label: "Live Advisory Leads", value: "320+ Active RFPs" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold tracking-tight text-white">{s.value}</div>
                  <div className="text-[10px] text-cyan-200/70 uppercase tracking-wider font-semibold">{s.label}</div>
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
              className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-1.5 text-xs font-bold text-gray-800 dark:text-gray-200 outline-none focus:border-blue-500"
            >
              {SECTOR_DATA.map((s) => (
                <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 04. SECTOR DIRECTORY GRID ───────────────────────────────────────── */}
        <section id="sme-sector-sec-directory">
          <SectionTitle
            title="Sector Directory Overview"
            action={<span className="text-[10px] text-gray-400 font-semibold">{filteredSectors.length} of 50 Sectors</span>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSectors.map((sec) => (
              <Card
                key={sec.id}
                className={`p-4 space-y-3 cursor-pointer transition-all hover:border-blue-400 hover:shadow-md ${
                  selectedSectorId === sec.id ? "ring-2 ring-blue-600 border-transparent shadow-md" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl" aria-hidden="true">{sec.icon}</span>
                  <div className="flex items-center gap-1">
                    {sec.trending && <Badge color="rose">TRENDING</Badge>}
                    {sec.emerging && <Badge color="amber">EMERGING</Badge>}
                    <span className="text-[9px] font-bold text-emerald-600 font-mono">{sec.growth}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{sec.name}</h3>
                  <p className="text-[9px] text-gray-500 mt-1 line-clamp-2">{sec.description}</p>
                </div>
                <div className="text-[8px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded-lg">
                  ⚡ {sec.signal}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-2 flex items-center justify-between text-[9px] text-gray-400">
                  <span>{sec.smeCount} SMEs · {sec.industriesCount} Ind.</span>
                  <button
                    onClick={() => setSelectedSectorId(sec.id)}
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Select →
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 05. FEATURED SECTORS ────────────────────────────────────────────── */}
        <section id="sme-sector-sec-featured">
          <SectionTitle
            title="Featured High-Activity Sectors"
            action={<Badge color="purple">Priority Ecosystems</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SECTOR_DATA.filter((s) => s.featured).map((sec) => (
              <Card key={sec.id} className="p-5 space-y-4 hover:shadow-lg transition-all border-l-4 border-l-blue-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sec.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">{sec.name}</h3>
                      <span className="text-[9px] text-emerald-600 font-bold">{sec.growth} YoY growth</span>
                    </div>
                  </div>
                  <Badge color="blue">FEATURED</Badge>
                </div>
                <p className="text-[10px] text-gray-600 dark:text-gray-300 leading-relaxed">{sec.description}</p>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl space-y-1.5 text-[9px]">
                  <div className="flex justify-between text-gray-500">
                    <span>Indexed SMEs:</span>
                    <strong className="text-gray-900 dark:text-white font-mono">{sec.smeCount} verified</strong>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Key Focus Signal:</span>
                    <strong className="text-blue-600">{sec.signal}</strong>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedSectorId(sec.id);
                    scrollTo("top-smes");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl transition-colors text-center shadow-xs"
                >
                  Explore {sec.name} SMEs →
                </button>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 06. TRENDING & 07. EMERGING SECTORS ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trending */}
          <section id="sme-sector-sec-trending">
            <Card className="p-5 space-y-4 h-full">
              <SectionTitle title="Trending Sectors This Week" action={<TrendingUp className="h-4 w-4 text-rose-500" />} />
              <div className="space-y-3">
                {SECTOR_DATA.filter((s) => s.trending).map((sec) => (
                  <div key={sec.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sec.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{sec.name}</h4>
                        <p className="text-[9px] text-gray-400">{sec.smeCount} active SMEs · {sec.growth}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSectorId(sec.id)}
                      className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2.5 py-1 rounded-lg hover:bg-blue-100 shrink-0"
                    >
                      View Hub →
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Emerging */}
          <section id="sme-sector-sec-emerging">
            <Card className="p-5 space-y-4 h-full">
              <SectionTitle title="Emerging Sectors with High Momentum" action={<Sparkles className="h-4 w-4 text-amber-500" />} />
              <div className="space-y-3">
                {SECTOR_DATA.filter((s) => s.emerging).map((sec) => (
                  <div key={sec.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sec.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{sec.name}</h4>
                        <p className="text-[9px] text-emerald-600 font-semibold">⚡ {sec.signal}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSectorId(sec.id)}
                      className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2.5 py-1 rounded-lg hover:bg-blue-100 shrink-0"
                    >
                      Explore →
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 08. TOP SMEs IN SELECTED SECTOR ─────────────────────────────────── */}
        <section id="sme-sector-sec-top-smes">
          <SectionTitle
            title={`Top SMEs in ${currentSector.name}`}
            action={
              <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">
                View All {currentSector.smeCount} SMEs →
              </Link>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sectorSmes.map((sme) => (
              <Card key={sme.id} className="p-5 space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${sme.color} text-white font-bold text-sm flex items-center justify-center shadow-xs`}>
                        {sme.initials}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{sme.name}</h3>
                        <p className="text-[9px] text-gray-400 mt-0.5">{sme.role}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-500 font-display">#{sme.rank}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge color="blue">{sme.industry}</Badge>
                    <Badge color="purple">{sme.country}</Badge>
                    {sme.verified && <Badge color="emerald">✓ Verified SME</Badge>}
                  </div>

                  <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 text-[9px] text-gray-600 dark:text-gray-300">
                    <span className="font-bold text-blue-600 block">Specialized Focus:</span>
                    {sme.expertise}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
                  <div className="text-[9px] text-gray-400">
                    <span className="font-bold text-blue-600 text-xs block">{sme.rate}</span>
                    <span>{sme.views} views</span>
                  </div>
                  <Link
                    href="/eoi"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                  >
                    Connect →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 09. SECTOR RANKINGS (TABBED) ────────────────────────────────────── */}
        <section id="sme-sector-sec-rankings">
          <SectionTitle
            title={`${currentSector.name} Leaderboard`}
            action={<Badge color="indigo">Live Benchmarks</Badge>}
          />
          <Card className="p-5 space-y-4">
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800 flex-wrap">
              {RANKING_METRICS_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveRankTab(tab)}
                  className={`flex-1 min-w-[80px] py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    activeRankTab === tab
                      ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {sectorSmes.map((sme, idx) => (
                <div key={sme.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-5 text-center font-display">#{idx + 1}</span>
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${sme.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {sme.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{sme.name}</h4>
                      <p className="text-[9px] text-gray-400">{sme.role} · {sme.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-bold text-emerald-600">▲ Active</span>
                    <span className="font-display font-bold text-blue-600 text-xs">{sme.rate}</span>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded-lg">
                      Profile →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ── 10. EXPERTISE & 11. INDUSTRIES BREAKDOWN ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expertise */}
          <section id="sme-sector-sec-expertise">
            <Card className="p-5 space-y-4 h-full">
              <SectionTitle title={`Key Expertise in ${currentSector.name}`} action={<Target className="h-4 w-4 text-blue-500" />} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sectorExpertise.map((exp) => (
                  <div key={exp.name} className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200">{exp.name}</span>
                    <span className="text-[9px] font-semibold text-blue-600 shrink-0">{exp.count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Sub-Industries */}
          <section id="sme-sector-sec-industries">
            <Card className="p-5 space-y-4 h-full">
              <SectionTitle title="Mapped Sub-Industries" action={<Layers className="h-4 w-4 text-purple-500" />} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sectorIndustries.map((ind) => (
                  <div key={ind.name} className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200">{ind.name}</span>
                    <span className="text-[9px] font-semibold text-purple-600 shrink-0">{ind.count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 12. SECTOR SNAPSHOT ─────────────────────────────────────────────── */}
        <section id="sme-sector-sec-snapshot">
          <Card className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border-none space-y-4 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{currentSector.icon}</span>
                <div>
                  <h2 className="text-base font-bold">{currentSector.name} Intelligence Snapshot</h2>
                  <p className="text-[10px] text-white/70">Verified sectoral advisory health metrics and policy alignment.</p>
                </div>
              </div>
              <Badge color="emerald">Updated Real-Time</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10">
              <div>
                <span className="text-xl font-bold text-cyan-300 font-display">{currentSector.smeCount}</span>
                <p className="text-[9px] text-white/60 font-semibold">Active Subject Matter Experts</p>
              </div>
              <div>
                <span className="text-xl font-bold text-amber-300 font-display">{currentSector.industriesCount}</span>
                <p className="text-[9px] text-white/60 font-semibold">Mapped Verticals</p>
              </div>
              <div>
                <span className="text-xl font-bold text-emerald-300 font-display">{currentSector.growth}</span>
                <p className="text-[9px] text-white/60 font-semibold">YoY Advisory Growth</p>
              </div>
              <div>
                <span className="text-xl font-bold text-purple-300 font-display">94.8%</span>
                <p className="text-[9px] text-white/60 font-semibold">Verification Audit Score</p>
              </div>
            </div>
          </Card>
        </section>

        {/* ── 13. SECTOR NEWS FEED ────────────────────────────────────────────── */}
        <section id="sme-sector-sec-news">
          <SectionTitle
            title={`Sector News & Executive Briefs: ${currentSector.name}`}
            action={
              <Link href="/en/news-poc/expert-news/sme/news" className="text-xs font-bold text-blue-600 hover:underline">
                All SME News →
              </Link>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectorNews.map((news, idx) => (
              <Card key={idx} className="p-4 space-y-2.5 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between text-[9px] text-gray-400">
                  <span className="font-bold text-blue-600">{news.industry}</span>
                  <span>{news.date} · {news.readTime}</span>
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug hover:text-blue-600 cursor-pointer">
                  {news.title}
                </h3>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-2 text-[9px]">
                  <span className="text-gray-500">By <strong>{news.author}</strong></span>
                  <Link href="/eoi" className="font-bold text-blue-600 hover:underline">Read Brief →</Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 15. OPPORTUNITIES ───────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6">

          {/* Business Opportunities & RFPs */}
          <section id="sme-sector-sec-opportunities">
            <Card className="p-5 space-y-4 h-full">
              <SectionTitle title="Active Advisory Opportunities" action={<Handshake className="h-4 w-4 text-emerald-500" />} />
              <div className="space-y-2.5">
                {SECTOR_OPPORTUNITIES.map((opp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{opp.title}</h4>
                      <Badge color="emerald">{opp.type}</Badge>
                    </div>
                    <p className="text-[9px] text-gray-500">{opp.entity} — Scope: {opp.scope}</p>
                    <div className="flex items-center justify-between text-[8px] text-gray-400 pt-1">
                      <span>{opp.deadline}</span>
                      <Link href="/eoi" className="font-bold text-blue-600 hover:underline">Apply / RFP →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 16. MENTORSHIP & 17. ACHIEVEMENTS ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mentorship */}
          <section id="sme-sector-sec-mentorship">
            <Card className="p-5 space-y-4 h-full">
              <SectionTitle title="Sector 1:1 Mentors" action={<GraduationCap className="h-4 w-4 text-purple-500" />} />
              <div className="space-y-3">
                {SECTOR_MENTORS.map((m) => (
                  <div key={m.name} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${m.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {m.initials}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{m.name}</h4>
                        <p className="text-[9px] text-gray-400">{m.domain} · {m.experience}</p>
                        <span className="text-[8px] text-amber-500 font-bold">★ {m.rating} ({m.sessionsConducted} sessions)</span>
                      </div>
                    </div>
                    <Link href="/eoi" className="bg-blue-600 text-white text-[8px] font-bold px-2.5 py-1.5 rounded-lg shrink-0">
                      Book →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Achievements */}
          <section id="sme-sector-sec-achievements">
            <Card className="p-5 space-y-4 h-full">
              <SectionTitle title="Sector Milestones" action={<Award className="h-4 w-4 text-amber-500" />} />
              <div className="space-y-3">
                {SECTOR_ACHIEVEMENTS.map((a, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <Badge color="amber">{a.category}</Badge>
                      <span className="text-[8px] text-gray-400">{a.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-700 dark:text-gray-300 font-medium">{a.title}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 18. PREMIUM INTELLIGENCE TIERS ──────────────────────────────────── */}
        <section id="sme-sector-sec-premium">
          <Card className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border-none space-y-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Unlock Sector SME Intelligence &amp; Direct Engagement</h2>
                <p className="text-[10px] text-white/70 mt-1">Upgrade to track proprietary advisory signals, policy consultations, and expert rate benchmarks across all 50 sectors.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "FREE (STANDARD)",
                  color: "border-white/20 bg-white/5",
                  items: ["Sector discovery & navigation", "Top SME previews", "Basic sector news feed", "Whitepaper downloads", "Community directory"],
                  locked: false
                },
                {
                  tier: "PRO (VERIFIED)",
                  color: "border-blue-400 bg-blue-950/40",
                  items: ["Complete sector SME leaderboards", "Sector policy briefings", "Direct consultation booking", "Advisory fee benchmarks", "Custom sector alerts"],
                  locked: true
                },
                {
                  tier: "ENTERPRISE",
                  color: "border-amber-400 bg-amber-950/30",
                  items: ["Bespoke sector technical research", "Executive advisory retainer matching", "Private RFP matchmaking", "Dedicated sector analyst", "CRM workflow integration"],
                  locked: true
                }
              ].map((plan) => (
                <div key={plan.tier} className={`border rounded-xl p-4 space-y-2 ${plan.color}`}>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">{plan.tier}</span>
                  <ul className="space-y-1.5 mt-2">
                    {plan.items.map((item) => (
                      <li key={item} className="text-[10px] text-white/80 flex items-start gap-1.5">
                        {plan.locked ? (
                          <>
                            <span className="shrink-0 mt-0.5" aria-hidden="true">🔒</span>
                            <span>{item}</span>
                          </>
                        ) : (
                          <>
                            <Check className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link href="/eoi" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-xs">
              Unlock Premium SME Intelligence →
            </Link>
          </Card>
        </section>

        {/* ── 19. PROMOTION BANNER ────────────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900 space-y-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Sector Leadership Promotion</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white mt-1">Boost Your SME Authority in {currentSector.name}</h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Position your technical advisory practice and policy expertise directly in front of corporate decision-makers.
                </p>
              </div>
              <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm">
                Promote Your Profile →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[10px] text-gray-700 dark:text-gray-300 font-medium">
              <div>✓ Featured Sector SME</div>
              <div>✓ Verified Advisory Badge</div>
              <div>✓ Direct Consultation Leads</div>
              <div>✓ Whitepaper Co-Publishing</div>
            </div>
          </Card>
        </section>

        {/* ── 20. SECTOR NEWSLETTER ───────────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-blue-800 to-indigo-950 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">{currentSector.name} Intelligence Brief</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get weekly technical breakthroughs, executive appointments, and procurement notices from {currentSector.name} delivered to your inbox.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-52 rounded-xl bg-white/15 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20"
                placeholder="Enter work email..."
                aria-label="Newsletter email address"
                type="email"
              />
              <button
                className="bg-white text-blue-950 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-xs"
                aria-label="Subscribe to Sector Intelligence Brief"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-[9px] text-white/50 text-center">Zero spam · Unsubscribe anytime</p>
          </Card>
        </section>

      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart2,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Compass,
  Crown,
  Download,
  Eye,
  FileText,
  Filter,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  HelpCircle,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";

// ─── Local UI Primitives (Strictly Scoped to Verified Leaders All Sectors) ───

function Card({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, action, subtitle }: { title: string; action?: React.ReactNode; subtitle?: string }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 pb-3 mb-4 space-y-1">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
        {action}
      </div>
      {subtitle && <p className="text-[10px] text-gray-500 font-normal">{subtitle}</p>}
    </div>
  );
}

function Badge({ children, color = "emerald" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    teal: "bg-teal-50 dark:bg-teal-950/20 text-teal-600 border border-teal-200 dark:border-teal-900/40",
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border border-indigo-200 dark:border-indigo-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.emerald}`}>
      {children}
    </span>
  );
}

// ─── Sector Taxonomy Master for Verified Leaders ─────────────────────────────

interface MasterSector {
  id: string;
  name: string;
  category: "Technology" | "Finance" | "Industrial" | "Energy" | "Healthcare" | "Services";
  leaders: number;
  industries: number;
  companies: number;
  newsCount: number;
  status: "Featured" | "Trending" | "Emerging" | "Standard";
  description: string;
  topIndustries: string[];
  keyLeader: { name: string; role: string; company: string };
  region: "Asia" | "North America" | "Europe" | "Middle East";
}

const ALL_50_SECTORS: MasterSector[] = [
  {
    id: "tech-deep",
    name: "Technology & Deep Tech",
    category: "Technology",
    leaders: 580,
    industries: 28,
    companies: 1840,
    newsCount: 412,
    status: "Featured",
    description: "Sovereign compute, semiconductors, LLMs, enterprise cloud infrastructure, and quantum engineering.",
    topIndustries: ["Sovereign AI", "Semiconductors", "Cloud & GPU Clusters", "Cybersecurity"],
    keyLeader: { name: "Jensen Huang", role: "CEO", company: "NVIDIA Corp" },
    region: "North America"
  },
  {
    id: "fin-services",
    name: "Financial Services & FinTech",
    category: "Finance",
    leaders: 490,
    industries: 22,
    companies: 1620,
    newsCount: 388,
    status: "Trending",
    description: "Cross-border payment rails, institutional treasury, private equity, and sovereign debt markets.",
    topIndustries: ["Digital Payments", "Asset Management", "InsurTech", "Trade Finance"],
    keyLeader: { name: "Ananya Sengupta", role: "MD", company: "Standard Chartered" },
    region: "Asia"
  },
  {
    id: "energy-clean",
    name: "Energy & Infrastructure",
    category: "Energy",
    leaders: 420,
    industries: 19,
    companies: 1250,
    newsCount: 295,
    status: "Trending",
    description: "Green hydrogen synthesis, grid-scale solar parks, transmission corridors, and offshore wind.",
    topIndustries: ["Green Hydrogen", "Solar Generation", "Grid Energy Storage", "Power Transmission"],
    keyLeader: { name: "Dr. Rajesh Grover", role: "CTO", company: "Adani Green Hydrogen" },
    region: "Asia"
  },
  {
    id: "health-life",
    name: "Healthcare & Life Sciences",
    category: "Healthcare",
    leaders: 350,
    industries: 16,
    companies: 980,
    newsCount: 240,
    status: "Featured",
    description: "Biosimilars, genomic medicine, clinical trial research, and hospital network management.",
    topIndustries: ["Biosimilars", "Digital Health", "Medical Devices", "Biopharma"],
    keyLeader: { name: "Dr. Elena Vance", role: "Board Director", company: "Biocon Biologics" },
    region: "North America"
  },
  {
    id: "mfg-adv",
    name: "Industrial & Advanced Manufacturing",
    category: "Industrial",
    leaders: 380,
    industries: 24,
    companies: 1420,
    newsCount: 265,
    status: "Featured",
    description: "Precision tooling, semiconductor OSAT packaging, robotics, automotive EV platforms, and heavy equipment.",
    topIndustries: ["OSAT Packaging", "EV Powertrains", "Industrial Robotics", "Defence Hardware"],
    keyLeader: { name: "N. Chandrasekaran", role: "Chairman", company: "Tata Sons" },
    region: "Asia"
  },
  {
    id: "logistics-sc",
    name: "Logistics & Supply Chain",
    category: "Services",
    leaders: 310,
    industries: 14,
    companies: 890,
    newsCount: 190,
    status: "Trending",
    description: "IMEC multi-modal corridors, automated container ports, cold storage networks, and air cargo.",
    topIndustries: ["Maritime Freight", "Warehousing", "Cold Chain Logistics", "Air Express"],
    keyLeader: { name: "Elena Rostova", role: "Global Head", company: "Pacific Logistics" },
    region: "Europe"
  },
  {
    id: "space-tech",
    name: "Space Tech & Geospatial",
    category: "Technology",
    leaders: 140,
    industries: 9,
    companies: 340,
    newsCount: 96,
    status: "Emerging",
    description: "Low-earth orbit constellations, satellite imaging telemetry, and launch propulsion systems.",
    topIndustries: ["Satellite Telemetry", "Launch Vehicles", "Earth Observation", "Orbital Payload"],
    keyLeader: { name: "Pawan Kumar Chandana", role: "Co-Founder & CEO", company: "Skyroot Aerospace" },
    region: "Asia"
  },
  {
    id: "agri-tech",
    name: "Agriculture & Food Processing",
    category: "Industrial",
    leaders: 230,
    industries: 12,
    companies: 670,
    newsCount: 152,
    status: "Standard",
    description: "Precision farming drones, organic food export corridors, and dairy processing technologies.",
    topIndustries: ["Precision Farming", "Dairy Processing", "Fertilizers", "Cold Storages"],
    keyLeader: { name: "Devendra Rao", role: "Founder & MD", company: "AgriSmart India" },
    region: "Asia"
  },
  {
    id: "chem-spec",
    name: "Chemicals & Petrochemicals",
    category: "Industrial",
    leaders: 260,
    industries: 15,
    companies: 780,
    newsCount: 168,
    status: "Standard",
    description: "Specialty fluorine chemistry, green polymers, battery active materials, and agrochemicals.",
    topIndustries: ["Specialty Chemicals", "Polymers", "Battery Cathodes", "Agro Formulation"],
    keyLeader: { name: "Ashish Bharat Ram", role: "Chairman & MD", company: "SRF Limited" },
    region: "Asia"
  },
  {
    id: "telecom-5g",
    name: "Telecommunications & 5G/6G",
    category: "Technology",
    leaders: 210,
    industries: 11,
    companies: 520,
    newsCount: 182,
    status: "Standard",
    description: "Fiber backbones, open-RAN networks, satellite broadband, and private enterprise 5G networks.",
    topIndustries: ["Open-RAN", "Optical Fiber", "Satellite Broadband", "Enterprise Private 5G"],
    keyLeader: { name: "Gopal Vittal", role: "MD & CEO", company: "Bharti Airtel" },
    region: "Asia"
  },
  {
    id: "defense-aero",
    name: "Defense & Aerospace",
    category: "Industrial",
    leaders: 180,
    industries: 10,
    companies: 430,
    newsCount: 142,
    status: "Emerging",
    description: "Unmanned aerial systems, avionics radar, indigenous naval shipbuilding, and missile guidance.",
    topIndustries: ["UAVs & Drones", "Avionics Radar", "Naval Vessels", "Armor Composites"],
    keyLeader: { name: "Baba Kalyani", role: "Chairman", company: "Bharat Forge" },
    region: "Asia"
  },
  {
    id: "retail-ecom",
    name: "Retail & E-Commerce",
    category: "Services",
    leaders: 340,
    industries: 18,
    companies: 1100,
    newsCount: 235,
    status: "Standard",
    description: "Omnichannel fulfillment, quick commerce dark stores, cross-border D2C brands, and logistics tech.",
    topIndustries: ["Quick Commerce", "Omnichannel Retail", "D2C Brands", "Fulfillment"],
    keyLeader: { name: "Isha Ambani", role: "Executive Director", company: "Reliance Retail" },
    region: "Asia"
  }
];

const SECTOR_NEWS_SNIPPETS = [
  {
    id: "vns-1",
    sector: "Technology & Deep Tech",
    headline: "NVIDIA and Tata Expand Sovereign AI GPU Supercluster Deployment to 16,000 H100 Nodes",
    leader: "Jensen Huang & N. Chandrasekaran",
    company: "NVIDIA / Tata Group",
    time: "25 mins ago",
    readTime: "3 min read",
  },
  {
    id: "vns-2",
    sector: "Energy & Infrastructure",
    headline: "Adani Green Commissioned 3 GW Hybrid Solar-Wind Park in Khavda Renewable Mega-Grid",
    leader: "Dr. Rajesh Grover",
    company: "Adani Green",
    time: "1 hour ago",
    readTime: "4 min read",
  },
  {
    id: "vns-3",
    sector: "Financial Services & FinTech",
    headline: "Standard Chartered Launches $1.5B Cross-Border Sustainable Liquidity Program in South Asia",
    leader: "Ananya Sengupta",
    company: "Standard Chartered",
    time: "2 hours ago",
    readTime: "3 min read",
  },
];

export default function VerifiedLeaderAllSectorsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [activeSnapshotSector, setActiveSnapshotSector] = useState<MasterSector>(ALL_50_SECTORS[0]);
  const [followedSectors, setFollowedSectors] = useState<Record<string, boolean>>({
    "tech-deep": true,
    "energy-clean": true,
    "fin-services": true
  });
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(["tech-deep", "fin-services"]);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const toggleFollow = (id: string) => {
    setFollowedSectors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompare = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id];
      }
      return [...prev, id];
    });
  };

  // Filtered sectors
  const filteredSectors = ALL_50_SECTORS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topIndustries.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.keyLeader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keyLeader.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesRegion = selectedRegion === "All" || s.region === selectedRegion;
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const featuredSectors = ALL_50_SECTORS.filter((s) => s.status === "Featured");
  const trendingSectors = ALL_50_SECTORS.filter((s) => s.status === "Trending");
  const emergingSectors = ALL_50_SECTORS.filter((s) => s.status === "Emerging");

  const comparedSectorObjects = ALL_50_SECTORS.filter((s) => selectedForCompare.includes(s.id));

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 text-white relative overflow-hidden border-b border-teal-950/60">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full bg-emerald-950/60 inline-flex items-center gap-1.5 shadow-xs">
                <Compass className="h-3.5 w-3.5 text-emerald-400" /> ALL SECTORS • VERIFIED LEADERS
              </span>
              <span className="text-[10px] font-semibold text-teal-200 bg-teal-900/30 border border-teal-700/40 px-2.5 py-0.5 rounded-full">
                Global Sector Directory &amp; Verified Leadership Gateway
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Explore Verified Leaders Across Every Sector
            </h1>

            <p className="text-base text-teal-100/85 leading-relaxed max-w-2xl font-normal">
              Discover sectors, industries, and authenticated leadership activity across the global business ecosystem with verified credibility metrics.
            </p>

            {/* 02. Search & Filter Bar */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search sector, industry, verified leader or company (e.g. Technology, Deep Tech, Jensen Huang)..."
                  aria-label="Search sector, industry, verified leader or company"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("complete-sector-directory");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Explore Sectors →
              </button>
              <Link
                href="/en/poc-v2/all-leaders"
                className="border border-emerald-400/40 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs inline-flex items-center gap-1.5"
              >
                <UserCheck className="h-4 w-4 text-emerald-300" />
                <span>Discover Leaders →</span>
              </Link>
            </div>

            {/* Live Metrics Counter */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-white/15">
              {[
                { label: "Active GoI Sectors", value: "50 Sectors" },
                { label: "Verified CXOs", value: "2,840+ Profiles" },
                { label: "Mapped Industries", value: "1,350+ Verticals" },
                { label: "Tracked Enterprises", value: "14,000+ Companies" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold tracking-tight text-white">{s.value}</div>
                  <div className="text-[10px] text-teal-200/70 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. CATEGORY & REGION QUICK FILTER STRIP ─────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sector Groups:</span>
            {["All", "Technology", "Finance", "Energy", "Healthcare", "Industrial", "Services"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-emerald-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 border-l border-gray-200 dark:border-gray-800 pl-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Region:</span>
            {["All", "Asia", "North America", "Europe", "Middle East"].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${
                  selectedRegion === reg
                    ? "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 04. FEATURED & 05. TRENDING SECTORS ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* 04. Featured Sectors */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="Featured Sectors"
                subtitle="High-impact sectors with extensive corporate investments and verified executive governance."
                action={<Badge color="emerald">VERIFIED CORE</Badge>}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredSectors.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setActiveSnapshotSector(s)}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-emerald-300 transition-all cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">
                        {s.category}
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono">{s.leaders} Leaders</span>
                    </div>
                    <h3 className="font-display font-bold text-xs text-gray-950 dark:text-white leading-tight">{s.name}</h3>
                    <p className="text-[10px] text-gray-500 line-clamp-2">{s.description}</p>
                    <div className="border-t border-gray-200/60 dark:border-gray-800 pt-2 flex items-center justify-between text-[9px] font-semibold text-emerald-600">
                      <span>Snapshot Preview →</span>
                      <span className="text-gray-400">{s.industries} Industries</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 05. Trending Sectors */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="Trending Sectors"
                subtitle="Sectors showing high search velocity, new leadership appointments, and active news coverage."
                action={<Flame className="h-4 w-4 text-orange-500" />}
              />
              <div className="space-y-3">
                {trendingSectors.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setActiveSnapshotSector(s)}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 hover:border-orange-300 transition-all cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">🔥</span>
                        <h4 className="font-display font-bold text-xs text-gray-950 dark:text-white">{s.name}</h4>
                        <span className="text-[8px] font-bold bg-orange-50 text-orange-600 px-1.5 py-0.2 rounded">
                          +{Math.floor(s.newsCount / 10)}% Activity
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500">
                        Featured Leader: <strong className="text-gray-700 dark:text-gray-300">{s.keyLeader.name}</strong> ({s.keyLeader.company})
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] text-emerald-600 font-bold block">Preview Snapshot →</span>
                      <span className="text-[9px] text-gray-400 font-mono">{s.companies} Companies</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* ── 07. SECTOR SNAPSHOT PREVIEW (INTERACTIVE) ─────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-950 text-white border border-emerald-800/40 space-y-5 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-white/15 pb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest">Selected Sector Snapshot</span>
                <h3 className="text-xl font-bold text-white">{activeSnapshotSector.name}</h3>
                <p className="text-xs text-white/80 max-w-2xl">{activeSnapshotSector.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFollow(activeSnapshotSector.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    followedSectors[activeSnapshotSector.id]
                      ? "bg-emerald-500 text-white"
                      : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                  }`}
                >
                  {followedSectors[activeSnapshotSector.id] ? "Following Sector ✓" : "+ Follow Sector"}
                </button>
                <Link
                  href="/en/poc-v2/leader-news/verified/sector"
                  className="bg-white text-emerald-950 font-bold text-xs px-5 py-2 rounded-xl hover:bg-emerald-50 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  Explore Full Sector Hub →
                </Link>
              </div>
            </div>

            {/* Snapshot Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 space-y-0.5">
                <span className="text-[9px] text-white/60 uppercase font-semibold">Executive Leaders</span>
                <div className="text-lg font-bold text-white">{activeSnapshotSector.leaders} Verified</div>
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 space-y-0.5">
                <span className="text-[9px] text-white/60 uppercase font-semibold">Mapped Industries</span>
                <div className="text-lg font-bold text-white">{activeSnapshotSector.industries} Verticals</div>
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 space-y-0.5">
                <span className="text-[9px] text-white/60 uppercase font-semibold">Tracked Companies</span>
                <div className="text-lg font-bold text-white">{activeSnapshotSector.companies} Listed</div>
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 space-y-0.5">
                <span className="text-[9px] text-white/60 uppercase font-semibold">Leadership Stories</span>
                <div className="text-lg font-bold text-white">{activeSnapshotSector.newsCount} Published</div>
              </div>
            </div>

            {/* Top Industries in active snapshot */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-teal-200 uppercase tracking-wider">Top Industries Inside This Sector:</span>
              <div className="flex flex-wrap gap-2">
                {activeSnapshotSector.topIndustries.map((ind) => (
                  <Link
                    key={ind}
                    href="/en/poc-v2/all-industry"
                    className="bg-white/15 hover:bg-white/25 text-white text-xs px-3 py-1.5 rounded-lg border border-white/20 transition-colors flex items-center gap-1.5"
                  >
                    <span>{ind}</span>
                    <span className="text-[9px] text-teal-300">Explore →</span>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* ── 03. COMPLETE SECTOR DIRECTORY (PRIMARY SECTION) ─────────────────── */}
        <section id="complete-sector-directory" className="space-y-4">
          <SectionTitle
            title="Complete Sector Directory"
            subtitle={`Showing ${filteredSectors.length} active sectors. Select any sector card for instant intelligence preview or jump into sector leadership.`}
            action={
              <span className="text-xs font-bold text-gray-500 font-mono">
                {filteredSectors.length} / {ALL_50_SECTORS.length} Sectors
              </span>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSectors.map((sector) => {
              const isSelected = activeSnapshotSector.id === sector.id;
              const isComparing = selectedForCompare.includes(sector.id);

              return (
                <Card
                  key={sector.id}
                  className={`p-5 flex flex-col justify-between space-y-4 transition-all ${
                    isSelected
                      ? "ring-2 ring-emerald-600 shadow-md border-transparent"
                      : "hover:border-emerald-300 hover:shadow-xs"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <Badge color={sector.status === "Featured" ? "emerald" : sector.status === "Trending" ? "amber" : sector.status === "Emerging" ? "purple" : "teal"}>
                        {sector.status.toUpperCase()}
                      </Badge>
                      <span className="text-[9px] text-gray-400 font-semibold">{sector.region}</span>
                    </div>

                    <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white leading-snug">
                      {sector.name}
                    </h3>

                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 font-normal">
                      {sector.description}
                    </p>

                    {/* Sector Key Statistics */}
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-900/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800/80 text-center">
                      <div>
                        <span className="text-[8px] text-gray-400 uppercase font-semibold block">Leaders</span>
                        <span className="text-xs font-bold text-emerald-600">{sector.leaders}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-gray-400 uppercase font-semibold block">Industries</span>
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{sector.industries}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-gray-400 uppercase font-semibold block">News</span>
                        <span className="text-xs font-bold text-teal-600">{sector.newsCount}</span>
                      </div>
                    </div>

                    {/* Sub Industries Tag Preview */}
                    <div className="flex flex-wrap gap-1">
                      {sector.topIndustries.slice(0, 3).map((ind) => (
                        <span key={ind} className="text-[8px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded font-medium">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveSnapshotSector(sector)}
                        className="text-[10px] font-bold text-emerald-600 hover:underline"
                      >
                        Snapshot →
                      </button>
                      <button
                        onClick={() => toggleCompare(sector.id)}
                        className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                          isComparing
                            ? "bg-teal-50 text-teal-700 border-teal-300 font-bold"
                            : "text-gray-400 border-gray-200 hover:text-gray-600"
                        }`}
                      >
                        {isComparing ? "Comparing ✓" : "+ Compare"}
                      </button>
                    </div>

                    <Link
                      href="/en/poc-v2/leader-news/verified/sector"
                      className="text-[10px] font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 inline-flex items-center gap-0.5"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── 13. SECTOR COMPARISON MATRIX (OPTIONAL FEATURE) ──────────────────── */}
        {comparedSectorObjects.length > 1 && (
          <section className="space-y-4">
            <Card className="p-5 space-y-4 bg-gradient-to-br from-teal-50/40 via-white to-emerald-50/40 dark:from-teal-950/20 dark:via-[#0f172a] dark:to-emerald-950/20 border-teal-200 dark:border-teal-900">
              <SectionTitle
                title="Sector Comparison Matrix"
                subtitle="Direct side-by-side benchmark across selected sectors."
                action={
                  <button onClick={() => setSelectedForCompare([])} className="text-xs font-bold text-teal-600 hover:underline">
                    Clear Comparison
                  </button>
                }
              />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 text-[10px] uppercase font-bold">
                      <th className="p-3">METRIC</th>
                      {comparedSectorObjects.map((s) => (
                        <th key={s.id} className="p-3 text-gray-900 dark:text-white font-bold">{s.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Executive Leaders</td>
                      {comparedSectorObjects.map((s) => (
                        <td key={s.id} className="p-3 font-bold text-emerald-600">{s.leaders} Leaders</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Mapped Industries</td>
                      {comparedSectorObjects.map((s) => (
                        <td key={s.id} className="p-3 font-semibold">{s.industries} Industries</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Tracked Companies</td>
                      {comparedSectorObjects.map((s) => (
                        <td key={s.id} className="p-3 font-semibold">{s.companies} Companies</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Leadership News Velocity</td>
                      {comparedSectorObjects.map((s) => (
                        <td key={s.id} className="p-3 font-bold text-teal-600">{s.newsCount} Stories</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold">Key Leadership Figure</td>
                      {comparedSectorObjects.map((s) => (
                        <td key={s.id} className="p-3 text-gray-800 dark:text-gray-200 font-semibold">
                          {s.keyLeader.name} ({s.keyLeader.company})
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        )}

        {/* ── 11. LATEST LEADERSHIP NEWS ACROSS SECTORS ───────────────────────── */}
        <section className="space-y-4">
          <SectionTitle
            title="Latest Leadership News Across Sectors"
            subtitle="Recent executive statements, board appointments, and major capital deployments."
            action={
              <Link href="/en/poc-v2/leader-news/verified/news" className="text-xs font-bold text-emerald-600 hover:underline">
                View All Leadership News →
              </Link>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SECTOR_NEWS_SNIPPETS.map((item) => (
              <Card key={item.id} className="p-4 flex flex-col justify-between space-y-3 hover:shadow-md hover:border-emerald-300 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] text-gray-500">
                    <span className="font-bold text-emerald-600">{item.sector}</span>
                    <span>{item.time}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white leading-snug hover:text-emerald-600 cursor-pointer">
                    {item.headline}
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    {item.leader} · {item.company}
                  </p>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between text-[10px]">
                  <Link href="/eoi" className="font-bold text-emerald-600 hover:underline">
                    Read Story →
                  </Link>
                  <span className="text-gray-400 text-[9px]">{item.readTime}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 14. FOLLOW YOUR SECTORS & 15. RECOMMENDED SECTORS ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 14. Follow Your Sectors */}
          <Card className="p-6 bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-950 text-white border-none space-y-4 shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-teal-300 uppercase tracking-widest">Personalized Feeds</span>
              <h3 className="text-base font-bold">Follow Sectors That Matter to You</h3>
              <p className="text-xs text-white/80 leading-relaxed font-normal">
                Follow your preferred sectors to automatically receive curated leadership news, board movements, and investment signals in your weekly executive digest.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <span className="text-[9px] text-white/60 uppercase font-bold tracking-wider block">Your Quick Sector Toggles:</span>
              <div className="flex flex-wrap gap-2">
                {ALL_50_SECTORS.slice(0, 4).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleFollow(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      followedSectors[s.id]
                        ? "bg-emerald-500 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    {followedSectors[s.id] ? `${s.name} ✓` : `+ ${s.name}`}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* 15. Recommended Sectors */}
          <Card className="p-5 h-full space-y-3">
            <SectionTitle title="Recommended Sectors For You" action={<Badge color="teal">Personalized</Badge>} />
            <p className="text-[10px] text-gray-500">Suggested based on your tracked industries and reading activity.</p>
            <div className="space-y-2.5">
              {emergingSectors.concat(featuredSectors.slice(0, 1)).slice(0, 2).map((s) => (
                <div key={s.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{s.name}</h4>
                      <Badge color="purple">{s.status}</Badge>
                    </div>
                    <span className="text-[9px] text-gray-500">{s.leaders} Leaders · {s.industries} Industries</span>
                  </div>
                  <button
                    onClick={() => toggleFollow(s.id)}
                    className="text-[9px] font-bold text-emerald-600 hover:underline shrink-0"
                  >
                    {followedSectors[s.id] ? "Following ✓" : "+ Follow"}
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── 18. PREMIUM SECTOR INTELLIGENCE ─────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 text-white border-none space-y-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Unlock Advanced Sector Intelligence</h2>
                <p className="text-[10px] text-white/70 mt-1">Upgrade to track predictive executive movement signals, boardroom dossiers, and AI-synthesized forecasts across all 50 sectors.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "FREE (REGISTERED)",
                  color: "border-white/20 bg-white/5",
                  items: ["Complete 50 sector directory", "Basic sector statistics", "Sector snapshot preview", "Follow preferred sectors", "Leadership news preview"],
                  locked: false
                },
                {
                  tier: "PRO (VERIFIED)",
                  color: "border-emerald-400 bg-emerald-950/40",
                  items: ["Full sector ranking analytics", "AI sector summary & trends", "Executive movement radar", "Advanced cross-sector comparison", "Historical data benchmarks"],
                  locked: false
                },
                {
                  tier: "ENTERPRISE",
                  color: "border-amber-400 bg-amber-950/30",
                  items: ["Custom sector monitoring dashboards", "Executive advisory matching", "Competitor board intelligence", "Bespoke sector research reports", "API & CRM integrations"],
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

            <Link href="/eoi" className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-xs">
              Unlock Enterprise Sector Intelligence →
            </Link>
          </Card>
        </section>

        {/* ── 19. FEATURED / SPONSORED SECTOR ──────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-amber-50/70 to-orange-50/70 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Sponsored Sector Showcase</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                  Global Clean Tech &amp; Hydrogen Infrastructure Pavilion
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Featured industrial initiative showcasing major energy transitions and electrolyser technology manufacturing across South Asia.
                </p>
              </div>
              <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm">
                Explore Pavilion →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[10px] text-gray-700 dark:text-gray-300 font-medium">
              <div>✓ 28 Enterprise Partners</div>
              <div>✓ $18B Capital Deployment</div>
              <div>✓ 3.2 GW Operational Capacity</div>
              <div>✓ Verified Clean Energy Milestone</div>
            </div>
          </Card>
        </section>

        {/* ── 20. SECTOR LEADERSHIP NEWSLETTER ────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-emerald-800 to-teal-900 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-white/70" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">Sector Leadership Brief</h2>
                <p className="text-[10px] text-white/70 mt-0.5">
                  Get important leadership appointments, sector developments, and emerging industry updates from all 50 sectors delivered to your inbox weekly.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-52 rounded-xl bg-white/15 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20"
                placeholder="Enter your corporate email..."
                aria-label="Newsletter email address"
                type="email"
              />
              <button
                className="bg-white text-emerald-950 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors shrink-0 shadow-xs"
                aria-label="Subscribe to Sector Leadership Brief"
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

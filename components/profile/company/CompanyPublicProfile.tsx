"use client";

import { useState } from "react";
import { 
  ShieldCheck, MapPin, Mail, ExternalLink,
  Lock, Share2,
  Check, Star, AlertCircle, 
  Rocket, Crown
} from "lucide-react";
import { useParams } from "next/navigation";

interface CompanyPublicProfileProps {
  companyData?: any;
  tier?: "free" | "startup" | "company" | "corporate";
  onUpgradeClick?: () => void;
  isOwner?: boolean;
}

export default function CompanyPublicProfile({
  companyData = {},
  tier = "company",
  onUpgradeClick,
  isOwner = false,
}: CompanyPublicProfileProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const isFree = tier === "free";
  const isStartup = tier === "startup";
  const isCompany = tier === "company";
  const isCorporate = tier === "corporate";

  // Tab State
  const [startupTab, setStartupTab] = useState<"pitch" | "product">("pitch");
  const [companyTab, setCompanyTab] = useState<"investors" | "employees" | "stakeholders" | "brand">("investors");
  const [corporateTab, setCorporateTab] = useState<"investors" | "employees" | "stakeholders" | "brand" | "corridors">("investors");

  const [selectedLeaderModal, setSelectedLeaderModal] = useState<any | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Profile data
  const companyName = companyData.companyName || (isStartup ? "Nexus AI Robotics Ltd" : isFree ? "Acme Enterprise Solutions" : "Bharat Forge & Metallurgy Ltd");
  const sector = companyData.sector || (isStartup ? "Industrial Robotics & Automation" : "Manufacturing & Precision Metallurgy");
  const tagline = companyData.tagline || (isStartup 
    ? "Building autonomous warehouse robotic systems and AI-driven precision sorting for modern supply chains." 
    : "Pioneering indigenous heavy forgings and critical global aerospace supply corridors.");
  const city = companyData.city || (isStartup ? "Bengaluru" : "Pune");
  const country = companyData.country || "India";
  const website = companyData.website || "https://example.com";
  const foundedYear = companyData.foundedYear || (isStartup ? "2022" : "1988");
  const employeesCount = companyData.employeesCount || (isStartup ? "45 Innovators" : "1,200+ Professionals");

  // Executive Leaders Database
  const corporateLeaders = [
    {
      id: "leader-1",
      name: "Rajiv V. Mehta",
      title: "Managing Director & Chief Executive Officer",
      roleBadge: "CEO · 24 yrs exp",
      bio: "Spearheaded national capacity expansion across aerospace metallurgy and bilateral CEPA export corridors to 35+ countries.",
      category: "Aerospace & Metallurgy",
    },
    {
      id: "leader-2",
      name: "Dr. Ananya Subramanian",
      title: "Chief Technology Officer & Head of R&D",
      roleBadge: "CTO · PhD Metallurgy",
      bio: "Pioneered titanium alloy forged components for indigenous defence and renewable wind turbine gearboxes.",
      category: "Innovation & Materials Science",
    },
    {
      id: "leader-3",
      name: "Suresh K. Pillai",
      title: "Chief Financial Officer & Capital Strategy",
      roleBadge: "CFO · CA / CFA",
      bio: "Oversees institutional capital allocation, credit facilities with Exim Bank, and strategic capex deployment.",
      category: "Corporate Finance",
    },
    {
      id: "leader-4",
      name: "Vikram Singhania",
      title: "Executive Director — Global Export Supply",
      roleBadge: "VP Supply Chain",
      bio: "Manages bilateral supply chains across UAE, North America, and European Union industrial manufacturing clusters.",
      category: "Supply Chain & Logistics",
    },
    {
      id: "leader-5",
      name: "Meera Krishnan",
      title: "Chief Sustainability & ESG Officer",
      roleBadge: "Head of ESG",
      bio: "Leading the Net-Zero 2035 roadmap, circular water recycling, and 45% renewable energy transition across forging facilities.",
      category: "ESG & Compliance",
    },
  ];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // =========================================================================
  // 1. FREE COMPANY PROFILE VIEW (Minimalist Slate, Unverified, Locked Tabs)
  // =========================================================================
  if (isFree) {
    return (
      <div className="bg-slate-900 text-slate-100 min-h-screen p-4 md:p-10 font-sans">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Unverified Top Warning */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Unverified Basic Company Profile · Unlisted in Curated Top 10 Directory</span>
            </div>
            {isOwner && onUpgradeClick && (
              <button
                onClick={onUpgradeClick}
                className="px-3.5 py-1.5 bg-[#F0652E] hover:bg-[#d85522] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Upgrade to Top Start-up / Company
              </button>
            )}
          </div>

          {/* Basic Header Card */}
          <div className="p-6 md:p-8 bg-slate-950 border border-slate-800 rounded-3xl space-y-4">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 text-white font-black text-2xl flex items-center justify-center border border-slate-700">
                  {companyName.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white">{companyName}</h1>
                  <p className="text-xs font-bold text-slate-400">{sector}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {city}, {country}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              {tagline}
            </p>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
              <span>Established: <strong>{foundedYear}</strong></span>
              <span>•</span>
              <a href={website} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Website
              </a>
            </div>
          </div>

          {/* Locked Feature Teasers Grid */}
          <div className="p-8 bg-slate-950 border border-slate-800 rounded-3xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">
              Institutional Trust Asset Features are Locked
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Upgrade to a verified tier to unlock the Bloomberg-grade 4-Stakeholder Micro-Site, KYC Blue Tick, bundled Executive Leader Profiles, and curated Top 10 Sector Placement.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 opacity-60">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">📈 Investors Tab</span>
                <span className="text-xs font-bold text-slate-500">Locked 🔒</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 opacity-60">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">👥 Bundled Leaders</span>
                <span className="text-xs font-bold text-slate-500">Locked 🔒</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 opacity-60">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">🤝 Governance & ESG</span>
                <span className="text-xs font-bold text-slate-500">Locked 🔒</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 opacity-60">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">🌍 Global Corridors</span>
                <span className="text-xs font-bold text-slate-500">Locked 🔒</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. TOP START-UP VIEW (Modern Electric Blue, Founder Spotlight, Growth Metrics)
  // =========================================================================
  if (isStartup) {
    return (
      <div className="bg-gradient-to-b from-[#070d1e] via-[#0b152e] to-[#060b18] text-slate-100 min-h-screen pb-24 font-sans">
        
        {/* Startup Top Ribbon */}
        <div className="border-b border-blue-900/40 bg-blue-950/20 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <Rocket className="w-3.5 h-3.5 text-cyan-400" /> Top Start-up Innovator
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Blue Tick Verified
                </span>
              </div>
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-xl bg-blue-900/30 hover:bg-blue-800/40 text-blue-300 text-xs font-bold transition-all border border-blue-700/50 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? "Copied!" : "Share Profile"}</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-800 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
                  {companyName.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>{companyName}</span>
                    <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </h1>
                  <p className="text-xs font-bold text-cyan-400 mt-0.5">{sector}</p>
                  <p className="text-xs text-slate-300 max-w-2xl mt-1.5 leading-relaxed">{tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Contact Founders
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-blue-900/40">
              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50">
                <span className="text-[10px] text-cyan-300/80 font-bold block">Stage</span>
                <span className="text-sm font-black text-white">Seed / Series A</span>
              </div>
              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50">
                <span className="text-[10px] text-cyan-300/80 font-bold block">Team Size</span>
                <span className="text-sm font-black text-white">{employeesCount}</span>
              </div>
              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50">
                <span className="text-[10px] text-cyan-300/80 font-bold block">HQ Location</span>
                <span className="text-sm font-black text-white">{city}, {country}</span>
              </div>
              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50">
                <span className="text-[10px] text-cyan-300/80 font-bold block">Bundled Leader</span>
                <span className="text-sm font-black text-cyan-400">1 Founder Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Tailored Startup Tabs */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
          <div className="flex gap-3 mb-6 border-b border-blue-900/40 pb-3">
            <button
              onClick={() => setStartupTab("pitch")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                startupTab === "pitch"
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🚀 Growth & Pitch Metrics
            </button>
            <button
              onClick={() => setStartupTab("product")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                startupTab === "product"
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              💡 Solution & Product MVP
            </button>
          </div>

          {startupTab === "pitch" && (
            <div className="space-y-6">
              {/* Founder Spotlight Card */}
              <div className="p-6 bg-slate-900/80 border border-blue-900/50 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center">
                    R
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-white">Rajiv Mehta</h3>
                      <span className="text-[10px] font-bold bg-cyan-500/15 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                        Founder & CEO (Bundled Leader)
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Ex-Robotics Engineer · 12 yrs robotics research & patent author</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLeaderModal(corporateLeaders[0])}
                  className="px-4 py-2 bg-blue-900/40 hover:bg-blue-800/60 text-cyan-300 text-xs font-bold rounded-xl border border-blue-700/60 transition-all"
                >
                  View Founder Profile
                </button>
              </div>

              {/* Startup Growth KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-900/80 border border-blue-900/40 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">ARR / Revenue Run Rate</span>
                  <span className="text-2xl font-black text-cyan-400">₹8.4 Cr</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">↑ +140% YoY ARR Growth</span>
                </div>
                <div className="p-5 bg-slate-900/80 border border-blue-900/40 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">Active Enterprise Clients</span>
                  <span className="text-2xl font-black text-white">18 B2B Clients</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Automotive & Warehousing</span>
                </div>
                <div className="p-5 bg-slate-900/80 border border-blue-900/40 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">Capital Raised</span>
                  <span className="text-2xl font-black text-white">₹12 Cr</span>
                  <span className="text-[10px] text-cyan-300 block mt-1">Seed Backed by DeepTech Fund</span>
                </div>
              </div>
            </div>
          )}

          {startupTab === "product" && (
            <div className="p-6 bg-slate-900/80 border border-blue-900/50 rounded-3xl space-y-4">
              <h3 className="text-base font-black text-white">Autonomous Sortation & AI AMR Platform</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Proprietary autonomous mobile robots (AMRs) that reduce e-commerce warehouse fulfillment sorting cycle times by 65% with sub-second optical barcode AI.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-blue-950">
                  <span className="text-xs font-bold text-cyan-400 block mb-1">Hardware Specification</span>
                  <p className="text-xs text-slate-400">LiDAR 360° obstacle avoidance, 250kg payload capacity, 8-hr hot-swappable battery.</p>
                </div>
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-blue-950">
                  <span className="text-xs font-bold text-cyan-400 block mb-1">Software Fleet Engine</span>
                  <p className="text-xs text-slate-400">Cloud fleet orchestrator seamlessly integrating with SAP and Oracle WMS.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. TOP COMPANY VIEW (Warm Amber/Coral Executive Theme, 2 Leaders, Full 4 Tabs)
  // =========================================================================
  if (isCompany) {
    return (
      <div className="bg-gradient-to-b from-[#0e1626] via-[#141e33] to-[#0c1322] text-slate-100 min-h-screen pb-24 font-sans">
        
        {/* Executive Header */}
        <div className="border-b border-orange-500/20 bg-gradient-to-b from-[#101b30] to-[#0d1627]">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0652E]/15 border border-[#F0652E]/30 text-[#F0652E] text-xs font-black uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 fill-[#F0652E]" /> Curated Top 10 Company
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> KYC Blue Tick Verified
                </span>
              </div>
              <button
                onClick={handleShare}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? "Copied!" : "Share Profile"}</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#F0652E] to-amber-600 text-white font-black text-3xl flex items-center justify-center shadow-xl shadow-orange-500/15 shrink-0 p-4">
                  {companyName.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>{companyName}</span>
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </h1>
                  <p className="text-xs md:text-sm font-bold text-[#F0652E] mt-0.5">{sector}</p>
                  <p className="text-xs md:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">{tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="px-6 py-3 bg-[#F0652E] hover:bg-[#d85522] text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" /> Request Buyer RFQ
                </button>
              </div>
            </div>

            {/* Quick KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800">
              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Turnover</span>
                <span className="text-base font-black text-white">₹480 Cr</span>
              </div>
              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Export Share</span>
                <span className="text-base font-black text-amber-400">58%</span>
              </div>
              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Workforce</span>
                <span className="text-base font-black text-white">{employeesCount}</span>
              </div>
              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Bundled Leaders</span>
                <span className="text-base font-black text-emerald-400">2 Verified Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Full Stakeholder Tabs */}
        <div className="border-b border-slate-800 bg-[#0d1627] sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-2.5">
              {[
                { id: "investors", label: "📈 Investors & Capital" },
                { id: "employees", label: "👥 Employees & Leadership (2)" },
                { id: "stakeholders", label: "🤝 Stakeholders & Governance" },
                { id: "brand", label: "📢 Brand & Capabilities" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setCompanyTab(t.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    companyTab === t.id
                      ? "bg-[#F0652E] text-white shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
          {companyTab === "investors" && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl">
                <h3 className="text-base font-black text-white mb-2">Financial Highlights & Expansion</h3>
                <p className="text-xs text-slate-300 mb-6">CRISIL AA- rated credit capacity with ₹140 Cr greenfield deployment in precision metallurgy.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-amber-400 font-bold block mb-1">YoY Growth</span>
                    <span className="text-xl font-black text-white">+24.8%</span>
                  </div>
                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-emerald-400 font-bold block mb-1">Capacity Utilization</span>
                    <span className="text-xl font-black text-white">91.4%</span>
                  </div>
                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-blue-400 font-bold block mb-1">Export Corridors</span>
                    <span className="text-xl font-black text-white">35 Countries</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {companyTab === "employees" && (
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">2 Bundled Executive Leaders:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {corporateLeaders.slice(0, 2).map((ldr) => (
                  <div key={ldr.id} className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">{ldr.roleBadge}</span>
                      <Check className="w-4 h-4 text-blue-400" />
                    </div>
                    <h4 className="text-base font-black text-white">{ldr.name}</h4>
                    <p className="text-xs text-[#F0652E] font-medium mb-2">{ldr.title}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{ldr.bio}</p>
                    <button
                      onClick={() => setSelectedLeaderModal(ldr)}
                      className="text-xs font-bold text-cyan-400 hover:underline"
                    >
                      View Leader Profile →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {companyTab === "stakeholders" && (
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-base font-black text-white">Institutional Banking & Supplier Governance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-white block mb-1">State Bank of India & HDFC</span>
                  <span className="text-xs text-slate-400">Lead Consortium Banking & Forex Facilities</span>
                </div>
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block mb-1">100% Trace-Audited Suppliers</span>
                  <span className="text-xs text-slate-400">Tier-1 MSME fair-wage & safety code compliance</span>
                </div>
              </div>
            </div>
          )}

          {companyTab === "brand" && (
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4">
              <h3 className="text-base font-black text-white">Macro Product Domains & Verified News</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-orange-400 block mb-1">Aerospace Structural Forgings</span>
                  <span className="text-xs text-slate-400">AS9100D titanium alloy landing gear and turbofan mounts.</span>
                </div>
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-orange-400 block mb-1">Renewable Energy Shafts</span>
                  <span className="text-xs text-slate-400">Main rotor shafts for 3MW to 6MW offshore wind turbines.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. TOP CORPORATE VIEW (Ultra-Luxury Royal Purple & Gold Bloomberg Terminal)
  // =========================================================================
  return (
    <div className="bg-gradient-to-b from-[#090310] via-[#120722] to-[#06020a] text-slate-100 min-h-screen pb-24 font-sans">
      
      {/* Sector #1 Pinned Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-slate-950 py-1.5 px-4 text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-md">
        <Crown className="w-4 h-4 fill-slate-950" />
        <span>SECTOR #1 PINNED LEADER · HIGHEST INSTITUTIONAL DESIGNATION</span>
      </div>

      {/* Corporate Sovereign Header */}
      <div className="border-b border-purple-500/30 bg-purple-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 fill-amber-300" /> Sector #1 Titan
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> KYC Sovereign Blue Tick
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                5 C-Suite Leaders
              </span>
            </div>

            <button
              onClick={handleShare}
              className="px-4 py-1.5 rounded-xl bg-purple-900/30 hover:bg-purple-800/40 text-purple-200 text-xs font-bold transition-all border border-purple-700/50 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? "Copied!" : "Share Profile"}</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500 text-white font-black text-4xl flex items-center justify-center shadow-2xl shadow-purple-500/25 shrink-0 border border-purple-400/30">
                {companyName.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                  <span>{companyName}</span>
                  <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/40">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </h1>
                <p className="text-sm font-bold text-amber-400 mt-1">{sector}</p>
                <p className="text-xs md:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">{tagline}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-black text-xs rounded-xl shadow-xl shadow-purple-500/25 transition-all flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> Request Institutional RFQ
              </button>
            </div>
          </div>

          {/* Terminal-Grade Financial Ticker Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-purple-900/40">
            <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-900/50">
              <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider block">Audited Turnover (FY26)</span>
              <span className="text-xl font-black text-white">₹480 Cr</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">↑ +24.8% YoY</span>
            </div>
            <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-900/50">
              <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider block">Export Corridors</span>
              <span className="text-xl font-black text-amber-400">42 Countries</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">58% Revenue</span>
            </div>
            <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-900/50">
              <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider block">Institutional Rating</span>
              <span className="text-xl font-black text-emerald-400">CRISIL AA-</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Stable Outlook</span>
            </div>
            <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-900/50">
              <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider block">Boardroom Suite</span>
              <span className="text-xl font-black text-purple-300">5 C-Suite Verified</span>
              <span className="text-[10px] text-purple-400 block mt-0.5">Full Board Dossier</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Full Navigation Tabs including Global Corridors */}
      <div className="border-b border-purple-900/40 bg-[#0e051a] sticky top-0 z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5">
            {[
              { id: "investors", label: "📈 Investors & Capital" },
              { id: "employees", label: "👥 C-Suite Boardroom (5)" },
              { id: "stakeholders", label: "🤝 Stakeholders & Governance" },
              { id: "brand", label: "📢 Brand & Capabilities" },
              { id: "corridors", label: "🌍 Global Corridors & Certs (Titan)" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setCorporateTab(t.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  corporateTab === t.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30"
                    : "text-purple-300 hover:text-white hover:bg-purple-950/50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Tab Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        {corporateTab === "investors" && (
          <div className="space-y-6">
            <div className="p-6 bg-purple-950/30 border border-purple-900/50 rounded-3xl">
              <h3 className="text-lg font-black text-white mb-2">Audited Institutional Financials & Capex Allocation</h3>
              <p className="text-xs text-slate-300 mb-6">₹140 Cr deployment for 5,000-ton automated aerospace forging lines and JAFZA Dubai corridor hub.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-black/40 rounded-2xl border border-purple-900/50">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">Phase 1 · Q3 2026</span>
                  <h4 className="text-sm font-bold text-white mb-1">5,000-Ton Forging Press</h4>
                  <p className="text-xs text-slate-400">₹65 Cr deployment for heavy metallurgy drivetrains.</p>
                </div>
                <div className="p-5 bg-black/40 rounded-2xl border border-purple-900/50">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block mb-1">Phase 2 · Q1 2027</span>
                  <h4 className="text-sm font-bold text-white mb-1">AS9100 Cryogenic Lab</h4>
                  <p className="text-xs text-slate-400">₹45 Cr allocation for defence alloy testing.</p>
                </div>
                <div className="p-5 bg-black/40 rounded-2xl border border-purple-900/50">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block mb-1">Phase 3 · Q4 2027</span>
                  <h4 className="text-sm font-bold text-white mb-1">JAFZA Dubai Trade Hub</h4>
                  <p className="text-xs text-slate-400">₹30 Cr joint-venture warehouse for CEPA corridor routing.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {corporateTab === "employees" && (
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">5 Bundled C-Suite Leader Profiles:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corporateLeaders.map((ldr) => (
                <div key={ldr.id} className="p-6 bg-purple-950/30 border border-purple-900/50 rounded-3xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-full">{ldr.roleBadge}</span>
                    <Check className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-base font-black text-white">{ldr.name}</h4>
                  <p className="text-xs text-amber-400 font-medium mb-2">{ldr.title}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">{ldr.bio}</p>
                  <button
                    onClick={() => setSelectedLeaderModal(ldr)}
                    className="text-xs font-bold text-purple-300 hover:underline"
                  >
                    View Executive Dossier →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {corporateTab === "stakeholders" && (
          <div className="p-6 bg-purple-950/30 border border-purple-900/50 rounded-3xl space-y-4">
            <h3 className="text-base font-black text-white">Banking Consortium & ESG Net-Zero 2035</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                <span className="text-xs font-bold text-white block mb-1">State Bank of India</span>
                <span className="text-xs text-slate-400">Lead Consortium Partner</span>
              </div>
              <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                <span className="text-xs font-bold text-white block mb-1">Exim Bank of India</span>
                <span className="text-xs text-slate-400">Export Credit & Overseas Capex</span>
              </div>
              <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Net-Zero by 2035</span>
                <span className="text-xs text-slate-400">18 MW Captive Solar Facility</span>
              </div>
            </div>
          </div>
        )}

        {corporateTab === "brand" && (
          <div className="p-6 bg-purple-950/30 border border-purple-900/50 rounded-3xl space-y-4">
            <h3 className="text-base font-black text-white">Macro Product Capabilities & Co-Bylined PR</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                <span className="text-xs font-bold text-amber-400 block mb-1">Aerospace Structural Forgings</span>
                <span className="text-xs text-slate-400">AS9100D certified titanium turbofan mounts.</span>
              </div>
              <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                <span className="text-xs font-bold text-amber-400 block mb-1">Renewable Energy Shafts</span>
                <span className="text-xs text-slate-400">6MW wind turbine main drive shafts.</span>
              </div>
              <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                <span className="text-xs font-bold text-amber-400 block mb-1">Critical Defence Metallurgy</span>
                <span className="text-xs text-slate-400">DRDO-approved transmission assemblies.</span>
              </div>
            </div>
          </div>
        )}

        {corporateTab === "corridors" && (
          <div className="space-y-6">
            <div className="p-6 bg-purple-950/30 border border-purple-900/50 rounded-3xl">
              <h3 className="text-base font-black text-white mb-2">Active Bilateral Trade Corridors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                  <span className="text-[10px] text-amber-400 font-bold block mb-1">Middle East (CEPA)</span>
                  <span className="text-sm font-bold text-white">India → UAE Port Jebel Ali</span>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                  <span className="text-[10px] text-cyan-400 font-bold block mb-1">North America</span>
                  <span className="text-sm font-bold text-white">India → United States (Seattle/Houston)</span>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-purple-900/50">
                  <span className="text-[10px] text-emerald-400 font-bold block mb-1">European Union</span>
                  <span className="text-sm font-bold text-white">India → Germany & France</span>
                </div>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">5 Certified Regulatory Seals:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3 bg-black/50 rounded-xl border border-purple-900/40">
                  <span className="text-xs font-black text-white block">BIS Certified</span>
                  <span className="text-[10px] text-emerald-400">Valid 2028</span>
                </div>
                <div className="p-3 bg-black/50 rounded-xl border border-purple-900/40">
                  <span className="text-xs font-black text-white block">CE Mark</span>
                  <span className="text-[10px] text-emerald-400">EU Verified</span>
                </div>
                <div className="p-3 bg-black/50 rounded-xl border border-purple-900/40">
                  <span className="text-xs font-black text-white block">FDA Reg.</span>
                  <span className="text-[10px] text-emerald-400">US Verified</span>
                </div>
                <div className="p-3 bg-black/50 rounded-xl border border-purple-900/40">
                  <span className="text-xs font-black text-white block">AS9100D</span>
                  <span className="text-[10px] text-emerald-400">Aerospace</span>
                </div>
                <div className="p-3 bg-black/50 rounded-xl border border-purple-900/40">
                  <span className="text-xs font-black text-white block">ISO 9001</span>
                  <span className="text-[10px] text-emerald-400">Quality Mgmt</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leader Bio Modal */}
      {selectedLeaderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-purple-900/60 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedLeaderModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white font-bold text-lg flex items-center justify-center">
                {selectedLeaderModal.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{selectedLeaderModal.name}</h3>
                <p className="text-xs text-amber-400 font-semibold">{selectedLeaderModal.title}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 mb-4 text-xs text-slate-300 leading-relaxed">
              {selectedLeaderModal.bio}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Category: <strong>{selectedLeaderModal.category}</strong></span>
              <span className="text-emerald-400 font-bold">✓ KYC Verified Executive</span>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => {
                setInquiryModalOpen(false);
                setInquirySent(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            {inquirySent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-lg font-black text-white mb-1">Inquiry Sent Directly</h3>
                <p className="text-xs text-slate-300">
                  Your procurement request has been delivered to <strong>{companyName}</strong>.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-black text-white mb-1">Request Trade RFQ</h3>
                <p className="text-xs text-slate-400 mb-4">Send a direct procurement inquiry to {companyName}.</p>
                <div className="space-y-3 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Johnathan Vance"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Gulf Aerospace Ltd"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Inquiry Scope</label>
                    <textarea
                      rows={3}
                      placeholder="Specify your procurement requirements..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setInquirySent(true)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  Submit Trade Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

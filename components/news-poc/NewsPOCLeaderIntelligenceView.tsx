"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart2,
  Bell,
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
  FileSpreadsheet,
  FileText,
  Filter,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  HelpCircle,
  Layers,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  RefreshCw,
  Search,
  Share2,
  ShieldAlert,
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

// ─── Local UI Primitives ─────────────────────────────────────────────────────

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

function Badge({ children, color = "purple" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border border-indigo-200 dark:border-indigo-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.purple}`}>
      {children}
    </span>
  );
}

// ─── Existing & Enriched Datasets ─────────────────────────────────────────────

const LEADER_INTELLIGENCE_KPIS = [
  { label: "Executive Statements", val: "140+", sub: "Verified C-Suite Quotes", icon: MessageSquare, color: "text-purple-600" },
  { label: "Predictive Signals", val: "48", sub: "Active Forward Projections", icon: Sparkles, color: "text-indigo-600" },
  { label: "Briefs Available", val: "24", sub: "Peer-Reviewed Reports", icon: FileText, color: "text-emerald-600" },
  { label: "Boardroom Audits", val: "12", sub: "Custom Corporate Dossiers", icon: ShieldCheck, color: "text-amber-600" }
];

const EXECUTIVE_STATEMENTS_DATA = [
  {
    name: "Jensen Huang",
    role: "CEO & Founder, NVIDIA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    quote: "India produces more software engineers than anywhere in the world. Sovereign AI is not an option; it is national infrastructure.",
    context: "NVIDIA AI Summit 2026",
    badge: "COMPUTE SOVEREIGNTY",
    score: "99/100 Relevance"
  },
  {
    name: "N. Chandrasekaran",
    role: "Chairman, Tata Sons",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    quote: "Semiconductors and artificial intelligence are the twin anchors of our $100 billion manufacturing transformation roadmap.",
    context: "Tata Global Keynote",
    badge: "SEMICONDUCTOR CAPEX",
    score: "98/100 Relevance"
  },
  {
    name: "Ananya Sengupta",
    role: "Managing Director, Standard Chartered",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&auto=format&fit=crop&q=80",
    quote: "Cross-border tokenized trade settlements at GIFT City reduced transaction clearing times from 72 hours to under 4 minutes.",
    context: "Asian Trade Liquidity Panel",
    badge: "FINTECH TREASURY",
    score: "96/100 Relevance"
  },
  {
    name: "Dr. Rajesh Grover",
    role: "CTO, Adani Green Hydrogen",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    quote: "The 3 GW electrolyser stack achieves 82% efficiency, setting a new global benchmark for sub-$2 per kg green hydrogen production.",
    context: "Clean Energy Transition Summit",
    badge: "CLEANTECH HYDROGEN",
    score: "95/100 Relevance"
  }
];

const LEADER_INFLUENCE_SCORECARDS = [
  { name: "Sridhar Vembu", title: "CEO, Zoho Corp", badge: "R&D Sovereignty", score: 94, trend: "+4% YoY", signal: "Fabless Chip Investment" },
  { name: "Dr. Randhir Thakur", title: "CEO, Tata Electronics", badge: "OSAT Packaging", score: 92, trend: "+6% YoY", signal: "Dholera Facility Scaling" },
  { name: "Dr. Elena Vance", title: "Director, Biocon Biologics", badge: "Biologics R&D", score: 91, trend: "+3% YoY", signal: "Global Biosimilars Expansion" },
  { name: "Vikram Malhotra", title: "CEO, Barclays India", badge: "Cross-Border Banking", score: 89, trend: "+5% YoY", signal: "GIFT City Treasury Scaling" }
];

const PREDICTIVE_LEADER_SIGNALS = [
  { sig: "Talent Migration", name: "Semiconductor Silicon Design Leadership Inflow", desc: "Top fabless architects relocating to Bangalore and Gujarat design centers from North America.", w: "88%", color: "bg-purple-600" },
  { sig: "CapEx Allocation", name: "Green Hydrogen C-Suite Mandates Expanding", desc: "Over 40 utility-scale clean tech firms creating Chief Green Transition Officer positions.", w: "82%", color: "bg-indigo-600" },
  { sig: "Supply Chain", name: "Electronics Manufacturing Services (EMS) Board Restructuring", desc: "Tier-1 EMS providers appointing dedicated European defense and supply chain advisors.", w: "76%", color: "bg-emerald-600" }
];

const LEADER_RESEARCH_BRIEFS = [
  { id: "rep-1", code: "EXEC-AI-2026", title: "Sovereign AI C-Suite Roadmap: 2026-2030 Strategies", pages: "48 Pages", downloads: "1,420", price: "$490", rating: "★★★★★ (4.9)" },
  { id: "rep-2", code: "OSAT-CHIP-2026", title: "Global Semiconductor OSAT & Packaging Leadership Matrix", pages: "62 Pages", downloads: "1,180", price: "$650", rating: "★★★★★ (4.8)" },
  { id: "rep-3", code: "ESG-HYDRO-2026", title: "Green Hydrogen & Energy Transition Executive Benchmark", pages: "36 Pages", downloads: "890", price: "$390", rating: "★★★★★ (4.9)" },
  { id: "rep-4", code: "FIN-GIFT-2026", title: "Cross-Border Treasury & Tokenized Trade Finance Brief", pages: "54 Pages", downloads: "1,640", price: "$590", rating: "★★★★★ (5.0)" }
];

const AI_LEADERSHIP_PREVIEWS: Record<string, { summary: string; focus: string; priorities: string; developments: string; outlook: string }> = {
  "Jensen Huang": {
    summary: "Spearheading accelerated compute and sovereign AI foundation cluster deployments globally.",
    focus: "Accelerated GPU Superclusters, Sovereign AI Infrastructure, Deep Tech Silicon",
    priorities: "Scaling 100,000 GPU installations with Tata Sons across South Asia.",
    developments: "$14B bilateral commitment announced for sovereign enterprise supercomputing.",
    outlook: "Very High Growth in APAC data center infrastructure and model training capacity."
  },
  "Nandan Nilekani": {
    summary: "Championing Open Network for Digital Commerce (ONDC) and sovereign DPI protocols globally.",
    focus: "Digital Public Infrastructure, Open Networks, Financial Inclusion",
    priorities: "Adoption of modular open APIs for cross-border logistics and trade finance.",
    developments: "Interoperable trade bill framework rolled out in collaboration with ASEAN central banks.",
    outlook: "Transformative digital footprint across emerging trade corridors."
  },
  "Shaktikanta Das": {
    summary: "Guiding monetary stability, CBDC cross-border liquidity rails, and systemic financial resilience.",
    focus: "Central Bank Digital Currency (CBDC), Liquidity Buffers, Macro Stability",
    priorities: "Bilateral instant settlement integrations with UAE and Singapore.",
    developments: "Pilot cross-border digital rupee clearing initiated with institutional participants.",
    outlook: "Steady institutional adoption of automated smart-contract trade clearing."
  }
};

interface NewsPOCLeaderIntelligenceViewProps {
  view?: string;
}

export default function NewsPOCLeaderIntelligenceView({ view }: NewsPOCLeaderIntelligenceViewProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiPreviewLeader, setAiPreviewLeader] = useState("Jensen Huang");
  const [aiPromptInput, setAiPromptInput] = useState("");
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [trendCompareLeft, setTrendCompareLeft] = useState("Technology");
  const [trendCompareRight, setTrendCompareRight] = useState("Finance");
  const [watchlist, setWatchlist] = useState<string[]>([
    "Sovereign AI Infrastructure",
    "GIFT City Cross-Border Treasury",
    "Semiconductor OSAT Packaging"
  ]);
  const [alertActive, setAlertActive] = useState<Record<string, boolean>>({
    "CEO Appointment in Technology": true,
    "Cross-Border Board Restructuring": true
  });

  const handleAskExecutiveAi = (prompt: string) => {
    setAiPromptInput(prompt);
    if (prompt.includes("trends are emerging in technology")) {
      setAiAnalysisResult("Technology leadership appointments in Q3 2026 are heavily skewed toward Sovereign Compute Foundries (+42% YoY) and Custom RISC-V Hardware Architects.");
    } else if (prompt.includes("most CEO changes")) {
      setAiAnalysisResult("CleanTech & Green Hydrogen saw the fastest CEO turnover (+38%), driven by rapid CapEx scaling at utility-scale electrolyser projects.");
    } else if (prompt.includes("Summarize executive movements")) {
      setAiAnalysisResult("This month recorded 32 executive transitions across technology and banking, with significant migration from North American foundries to Asian manufacturing nodes.");
    } else {
      setAiAnalysisResult(`AI Intelligence Synthesis for "${prompt}": Cross-sector analysis shows increased board directorship convergence between AI infrastructure and financial treasury hubs.`);
    }
  };

  const toggleWatchlist = (item: string) => {
    setWatchlist((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleAlert = (type: string) => {
    setAlertActive((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. INTELLIGENCE HERO ────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1b0d2a] via-[#12061f] to-slate-950 text-white relative overflow-hidden border-b border-purple-950/60">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#a855f7_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-950/60 inline-flex items-center gap-1.5 shadow-xs">
                <Sparkles className="h-3 w-3 text-purple-400" /> LEADER INTELLIGENCE • PREMIUM
              </span>
              <span className="text-[10px] font-semibold text-purple-200 bg-purple-900/30 border border-purple-700/40 px-2.5 py-0.5 rounded-full">
                Leadership Intelligence, Analytics & Decision Support Hub
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Leadership Intelligence for Smarter Business Decisions
            </h1>

            <p className="text-base text-purple-100/85 leading-relaxed max-w-2xl font-normal">
              Track executive movements, leadership trends, board activity, corporate changes and emerging leadership signals across industries and markets.
            </p>

            {/* Search and Action CTAs */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search executive intelligence, movements, board changes, signals..."
                  aria-label="Search executive intelligence"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("executive-movements-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Explore Intelligence →
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("ask-ai-intelligence-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-purple-400/40 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs flex items-center gap-1.5"
              >
                <Sparkles className="h-4 w-4 text-purple-300" />
                <span>Ask AI →</span>
              </button>
            </div>

            {/* Live Metrics Counter */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-purple-800/30">
              {[
                { label: "Executive Movements", value: "1,250 Tracked" },
                { label: "New Appointments", value: "320 Verified" },
                { label: "Board Changes", value: "180 Audited" },
                { label: "Rising Signals", value: "420 Active" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold tracking-tight text-white font-mono">{s.value}</div>
                  <div className="text-[10px] text-purple-300/70 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. LEADERSHIP INTELLIGENCE SNAPSHOT ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">
        <section>
          {/* KPI Intelligence Cards (Preserved and Enriched) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {LEADER_INTELLIGENCE_KPIS.map((kpi, idx) => {
              const KIcon = kpi.icon;
              return (
                <Card key={idx} className="p-4 space-y-1.5 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-400 uppercase font-mono">{kpi.label}</span>
                    <KIcon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <div className={`font-display text-2xl font-bold ${kpi.color}`}>{kpi.val}</div>
                  <span className="text-[9px] text-gray-500 dark:text-gray-400 block">{kpi.sub}</span>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── FEATURED C-SUITE ALLIANCE SPOTLIGHT (PRESERVED) ─────────────────── */}
        <section>
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[320px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80')` }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            
            <div className="relative z-10 space-y-4 max-w-4xl">
              <div className="flex items-center gap-2">
                <span className="bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                  C-SUITE STRATEGIC ALLIANCE
                </span>
                <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                  PREDICTIVE SCORE: 98/100
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight text-white">
                Tata Sons & NVIDIA Roll Out $14 Billion Sovereign AI Infrastructure & Enterprise Supercluster
              </h2>
              
              <p className="text-slate-300 text-xs md:text-sm font-normal max-w-3xl leading-relaxed">
                Spearheaded by N. Chandrasekaran and Jensen Huang, the multi-year partnership establishes 100,000 next-gen GPU clusters in Mumbai and Hyderabad, anchoring India's sovereign AI cloud ecosystem.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
                <div>
                  <span className="block text-[8px] text-gray-400 uppercase font-mono">Capital Commitment</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">$14.2 Billion</span>
                </div>
                <div>
                  <span className="block text-[8px] text-gray-400 uppercase font-mono">Executive Lead</span>
                  <span className="text-sm font-bold text-white">N. Chandrasekaran & Jensen Huang</span>
                </div>
                <div>
                  <span className="block text-[8px] text-gray-400 uppercase font-mono">Strategic Impact</span>
                  <span className="text-sm font-bold text-emerald-400">Transformative</span>
                </div>
                <div className="ml-auto flex gap-3">
                  <Link href="/eoi" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 text-[10px]">
                    Read Executive Analysis <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03. EXECUTIVE MOVEMENT INTELLIGENCE & 07. APPOINTMENTS TRACKER ───── */}
        <section id="executive-movements-section" className="space-y-4">
          <SectionTitle
            title="Executive Movement Intelligence & Appointments Tracker"
            subtitle="Track verified C-suite moves: who moved, from where, to where, and the associated strategic impact."
            action={<Briefcase className="h-4 w-4 text-purple-600" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                type: "NEW CEO APPOINTMENT",
                company: "Tata Electronics",
                leader: "Dr. Randhir Thakur",
                prev: "President, Intel Foundry Services",
                newRole: "CEO & Managing Director",
                sector: "Semiconductors & OSAT",
                country: "India",
                date: "Aug 17, 2026",
                impact: "High Fabless Scale"
              },
              {
                type: "COUNTRY HEAD & CEO",
                company: "Barclays India",
                leader: "Vikram Malhotra",
                prev: "Head of Corporate Banking",
                newRole: "Chief Executive Officer, India",
                sector: "Banking & Treasury",
                country: "India",
                date: "Aug 15, 2026",
                impact: "GIFT City Liquidity"
              },
              {
                type: "CHIEF TECHNOLOGY OFFICER",
                company: "Adani Green Hydrogen",
                leader: "Dr. Rajesh Grover",
                prev: "VP Clean Fuel Stacks",
                newRole: "Chief Technology Officer",
                sector: "CleanTech & Renewables",
                country: "India",
                date: "Aug 12, 2026",
                impact: "Electrolyser Yield"
              }
            ].map((mov, idx) => (
              <Card key={idx} className="p-5 flex flex-col justify-between space-y-4 hover:border-purple-400 transition-all shadow-xs">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="font-bold text-purple-600 uppercase font-mono">{mov.type}</span>
                    <span className="text-gray-400 font-mono">{mov.date}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white leading-tight">{mov.leader}</h3>
                    <p className="text-[10px] text-gray-500 font-semibold">{mov.company}</p>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1 text-xs">
                    <p className="text-[10px] text-gray-600 dark:text-gray-300">
                      <strong>New Role:</strong> {mov.newRole}
                    </p>
                    <p className="text-[9px] text-gray-400">
                      <strong>Previous:</strong> {mov.prev}
                    </p>
                    <p className="text-[9px] text-purple-600 font-semibold pt-1">
                      {mov.sector} · {mov.country} ({mov.impact})
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
                  <Link href="/eoi" className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                    <span>Analyze Movement</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <span className="text-[9px] font-bold text-emerald-600 font-mono">VERIFIED DISCLOSURE</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 04. LEADERSHIP TRENDS & 06. LEADERSHIP SIGNALS ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Live Executive Statements & Signals (Preserved) */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="p-6 space-y-4">
              <SectionTitle
                title="Live Executive Leadership Statements & Signals"
                action={<span className="text-[10px] font-bold text-purple-600 font-mono">Updated Hourly</span>}
                subtitle="Direct verbatim statements and strategic intent decoded from investor earnings calls and summits."
              />
              <div className="space-y-4">
                {EXECUTIVE_STATEMENTS_DATA.map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200/60 dark:border-gray-800 space-y-3 hover:border-purple-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover border border-purple-200 dark:border-purple-800" />
                        <div>
                          <h4 className="font-bold text-xs text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-[10px] text-gray-500">{item.role}</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-bold bg-purple-50 dark:bg-purple-950 text-purple-600 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 font-mono">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs italic text-gray-700 dark:text-gray-300 font-normal leading-relaxed pl-2 border-l-2 border-purple-500">
                      "{item.quote}"
                    </p>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 font-semibold pt-1 border-t border-gray-100 dark:border-gray-800">
                      <span>{item.context}</span>
                      <span className="text-emerald-500 font-bold font-mono">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Column 2: AI Leadership Influence Scorecards & Radar (Preserved) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Influence Scorecards */}
            <Card className="p-5 space-y-3">
              <SectionTitle title="AI Leadership Influence Radar" action={<Sparkles className="h-4 w-4 text-purple-600" />} />
              <div className="space-y-2.5 text-xs">
                {LEADER_INFLUENCE_SCORECARDS.map((card, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900 dark:text-white text-[11px]">{card.name}</span>
                        <span className="text-[8px] bg-purple-100 dark:bg-purple-950 text-purple-600 px-1.5 py-0.2 rounded font-bold font-mono">{card.badge}</span>
                      </div>
                      <span className="text-[9px] text-gray-400 block">{card.title} · {card.signal}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-display font-bold text-xs text-purple-600 font-mono">{card.score}/100</span>
                      <span className="text-[8px] text-emerald-500 block font-bold font-mono">{card.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Strategic Board Alert (Preserved) */}
            <div className="border border-purple-200 dark:border-purple-950/40 bg-purple-50/50 dark:bg-purple-950/10 p-5 rounded-2xl space-y-2">
              <h4 className="font-bold text-xs text-purple-600 flex items-center gap-1.5 uppercase">
                <Bell className="h-4 w-4 text-purple-600" /> Strategic Board Alert
              </h4>
              <p className="text-xs text-purple-800 dark:text-purple-300 leading-relaxed font-normal">
                Over 18 Fortune 500 CEOs have signaled secondary supply chain hub deployments in India during Q3 investor briefings, bypassing single-region dependencies.
              </p>
              <Link href="/eoi" className="text-purple-600 font-bold text-[10px] hover:underline block pt-1">
                View Board Intel Briefing →
              </Link>
            </div>

          </div>

        </div>

        {/* ── 14. COMPARE LEADERSHIP TRENDS (INTERACTIVE DOMAIN BENCHMARK) ─────── */}
        <section className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-purple-50/40 via-white to-indigo-50/40 dark:from-purple-950/20 dark:via-[#0f172a] dark:to-indigo-950/20 border-purple-200 dark:border-purple-900">
            <SectionTitle
              title="Compare Leadership Trends & Activity"
              subtitle="Aggregate comparative analysis across economic sectors and trade jurisdictions."
              action={
                <div className="flex items-center gap-2">
                  <select
                    value={trendCompareLeft}
                    onChange={(e) => setTrendCompareLeft(e.target.value)}
                    className="text-[10px] font-bold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 rounded"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Energy">Energy</option>
                  </select>
                  <span className="text-xs text-gray-400 font-bold">vs</span>
                  <select
                    value={trendCompareRight}
                    onChange={(e) => setTrendCompareRight(e.target.value)}
                    className="text-[10px] font-bold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1 rounded"
                  >
                    <option value="Finance">Finance</option>
                    <option value="Energy">Energy</option>
                    <option value="Healthcare">Healthcare</option>
                  </select>
                </div>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-white dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                <span className="text-[9px] font-bold text-purple-600 uppercase font-mono">C-Suite Appointment Growth</span>
                <div className="flex justify-between items-center pt-1">
                  <span>{trendCompareLeft}: <strong className="text-purple-600">+34% YoY</strong></span>
                  <span>{trendCompareRight}: <strong className="text-indigo-600">+19% YoY</strong></span>
                </div>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                <span className="text-[9px] font-bold text-purple-600 uppercase font-mono">Board Restructuring Index</span>
                <div className="flex justify-between items-center pt-1">
                  <span>{trendCompareLeft}: <strong className="text-purple-600">62 Changes</strong></span>
                  <span>{trendCompareRight}: <strong className="text-indigo-600">48 Changes</strong></span>
                </div>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#0f172a] rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                <span className="text-[9px] font-bold text-purple-600 uppercase font-mono">AI Mandates Adoption</span>
                <div className="flex justify-between items-center pt-1">
                  <span>{trendCompareLeft}: <strong className="text-purple-600">92% Board Level</strong></span>
                  <span>{trendCompareRight}: <strong className="text-indigo-600">74% Board Level</strong></span>
                </div>
              </div>
            </div>
          </Card>
        </section>



        {/* ── 22. PEER-REVIEWED RESEARCH BRIEFS (PRESERVED) ───────────────────── */}
        <section className="space-y-4">
          <SectionTitle title="Peer-Reviewed Executive Intelligence Briefs" action={<span className="text-[10px] font-bold text-purple-600 font-mono">Download Samples Available</span>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEADER_RESEARCH_BRIEFS.map((rep) => (
              <Card key={rep.id} className="p-5 space-y-3 flex flex-col justify-between hover:border-purple-500 transition-all group">
                <div>
                  <div className="flex items-center justify-between text-[8px] font-bold text-gray-400 font-mono">
                    <span>{rep.code}</span>
                    <span className="text-amber-500">{rep.rating}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-950 dark:text-white mt-2 leading-snug group-hover:text-purple-600 transition-colors">{rep.title}</h3>
                  <span className="text-[9px] text-gray-400 block mt-1 font-mono">{rep.pages} · {rep.downloads} downloads</span>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-bold text-gray-900 dark:text-white font-mono">{rep.price}</span>
                    <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg transition-colors">
                      Buy Brief
                    </Link>
                  </div>
                  <Link href="/eoi" className="w-full text-center border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-[9px] font-bold py-1.5 rounded-lg block hover:bg-gray-100 dark:hover:bg-gray-900">
                    Download Sample PDF
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

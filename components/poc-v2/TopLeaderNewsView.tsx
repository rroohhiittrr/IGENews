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

function Badge({ children, color = "amber" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 border border-indigo-200 dark:border-indigo-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.amber}`}>
      {children}
    </span>
  );
}

export default function TopLeaderNewsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNewsCategory, setActiveNewsCategory] = useState("All");
  const [watchlist, setWatchlist] = useState<string[]>([
    "N. Chandrasekaran (Tata Sons)",
    "Jensen Huang (NVIDIA)",
    "Standard Chartered C-Suite"
  ]);
  const [alertActive, setAlertActive] = useState<Record<string, boolean>>({
    "CEO Departure": true,
    "M&A Announcement": true
  });
  const [compareExecs, setCompareExecs] = useState<string[]>(["exec-1", "exec-2"]);
  const [aiPromptInput, setAiPromptInput] = useState("");
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  const toggleWatchlist = (name: string) => {
    setWatchlist((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleAlert = (type: string) => {
    setAlertActive((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleAskExecutiveAi = (prompt: string) => {
    setAiPromptInput(prompt);
    if (prompt.includes("major leadership changes")) {
      setAiAnalysisResult("Tata Electronics appointed Dr. Randhir Thakur as CEO, and Barclays India elevated Vikram Malhotra to Country Head. Elevated succession planning is detected across 4 Fortune 500 APAC entities.");
    } else if (prompt.includes("Summarize CEO movements")) {
      setAiAnalysisResult("Tech sector CEO transitions in Q3 are heavily centered on Sovereign AI Foundries and RISC-V Silicon architectures, with +28% YoY increase in semiconductor-background C-suite appointments.");
    } else {
      setAiAnalysisResult(`Executive AI Synthesis for "${prompt}": Cross-border strategic leadership appointments have concentrated heavily in India-Europe trade lanes and Sovereign Cloud governance.`);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. ENTERPRISE HERO ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a0f02] via-[#241405] to-slate-950 text-white relative overflow-hidden border-b border-amber-950/60">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fbbf24_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-950/60 inline-flex items-center gap-1.5 shadow-xs">
                <Crown className="h-3 w-3 text-amber-400" /> TOP LEADERS • CORPORATE • ENTERPRISE
              </span>
              <span className="text-[10px] font-semibold text-amber-200 bg-amber-900/30 border border-amber-700/40 px-2.5 py-0.5 rounded-full">
                Executive Intelligence & Strategic Newsroom
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Executive Intelligence for Strategic Decisions
            </h1>

            <p className="text-base text-amber-100/85 leading-relaxed max-w-2xl font-normal">
              Monitor global executive movements, board changes, corporate developments, M&A activity and emerging leadership trends.
            </p>

            {/* Search and Primary Action CTAs */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search executive, company, board, sector or event..."
                  aria-label="Search executive, company, board, sector or event"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("executive-landscape-dashboard");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Explore Executive Intelligence →
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("executive-watchlist-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-amber-400/40 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs flex items-center gap-1.5"
              >
                <Bookmark className="h-4 w-4 text-amber-300" />
                <span>Create Executive Watchlist →</span>
              </button>
            </div>

            {/* Live Metrics Counter */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-amber-800/30">
              {[
                { label: "Executive Moves", value: "32 Today" },
                { label: "Board Changes", value: "12 This Week" },
                { label: "CEO Appointments", value: "8 Active" },
                { label: "M&A Developments", value: "14 Tracked" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold tracking-tight text-white font-mono">{s.value}</div>
                  <div className="text-[10px] text-amber-300/70 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. EXECUTIVE INTELLIGENCE DASHBOARD ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">
        <section id="executive-landscape-dashboard">
          <Card className="p-6 bg-gradient-to-r from-[#1f1204] via-[#170c02] to-slate-900 text-white border-amber-900/60 shadow-lg space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest block">Executive Intelligence Dashboard</span>
                <h2 className="font-display text-xl font-bold text-white">Today's Executive Landscape</h2>
              </div>
              <Badge color="amber">REAL-TIME MONITORING</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 border-t border-white/10 pt-4">
              <div>
                <div className="text-2xl font-bold text-amber-400 font-mono">32</div>
                <div className="text-[10px] text-amber-200 uppercase font-semibold">Movements</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">12</div>
                <div className="text-[10px] text-amber-200 uppercase font-semibold">Board Changes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">8</div>
                <div className="text-[10px] text-amber-200 uppercase font-semibold">CEO Appts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">14</div>
                <div className="text-[10px] text-amber-200 uppercase font-semibold">M&A Deals</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-rose-400 font-mono">5</div>
                <div className="text-[10px] text-amber-200 uppercase font-semibold">C-Suite Exits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">24</div>
                <div className="text-[10px] text-amber-200 uppercase font-semibold">Strategic Moves</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">540</div>
                <div className="text-[10px] text-amber-200 uppercase font-semibold">Monitored Firms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-300 font-mono">Critical</div>
                <div className="text-[10px] text-amber-200 uppercase font-semibold">Alert Status</div>
              </div>
            </div>
          </Card>
        </section>

        {/* ── 03. GLOBAL EXECUTIVE NEWS ────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionTitle
            title="Global Executive News & Strategic Dispatches"
            subtitle="Verified executive announcements, strategic board approvals, and leadership restructuring."
            action={
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {["All", "CEO News", "C-Suite", "Board News", "M&A Intelligence", "Appointments"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveNewsCategory(cat)}
                    className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition-all shrink-0 ${
                      activeNewsCategory === cat
                        ? "bg-amber-500 text-gray-950"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-amber-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "en-1",
                category: "CEO NEWS",
                tagColor: "amber",
                title: "Tata Sons & NVIDIA Commission $14B Sovereign AI Supercluster in Mumbai & Singapore",
                exec: "N. Chandrasekaran & Jensen Huang",
                company: "Tata Sons / NVIDIA",
                time: "2h ago",
                impact: "High Capital Velocity",
                desc: "Strategic C-suite pact deploying 100,000 next-gen GPU accelerators to anchor enterprise sovereignty across Asian corridors."
              },
              {
                id: "en-2",
                category: "M&A INTELLIGENCE",
                tagColor: "emerald",
                title: "Standard Chartered Acquires Strategic 40% Stake in GIFT City Tokenized Treasury Hub",
                exec: "Ananya Sengupta (Managing Director)",
                company: "Standard Chartered",
                time: "4h ago",
                impact: "Cross-Border Liquidity",
                desc: "Boardroom-approved $1.5B capital allocation to institutionalize instant smart-contract bill-of-lading trade clearances."
              },
              {
                id: "en-3",
                category: "BOARD NEWS",
                tagColor: "blue",
                title: "Zoho Corporation Board Greenlights $700M Fabless Chip Packaging R&D Unit",
                exec: "Sridhar Vembu (CEO & Founder)",
                company: "Zoho Corporation",
                time: "6h ago",
                impact: "Semiconductor OSAT",
                desc: "Expands national fabless silicon design footprint with dedicated RISC-V hardware development centers in South India."
              }
            ].map((news) => (
              <Card key={news.id} className="p-5 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-bold text-amber-600 uppercase font-mono">{news.category}</span>
                    <span className="text-gray-400">{news.time}</span>
                  </div>

                  <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white leading-snug">{news.title}</h3>

                  <div className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <p className="text-[10px] text-gray-700 dark:text-gray-300 font-semibold">
                      Key Figure: <span className="text-amber-600">{news.exec}</span>
                    </p>
                    <p className="text-[9px] text-gray-400">{news.company} · {news.impact}</p>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{news.desc}</p>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
                  <Link href="/eoi" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                    <span>Executive Analysis</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button onClick={() => toggleWatchlist(news.exec)} className="text-[10px] font-bold text-gray-400 hover:text-amber-600">
                    {watchlist.includes(news.exec) ? "★ Watched" : "+ Watch"}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 04. EXECUTIVE APPOINTMENTS & 05. BOARD UPDATES & 06. M&A ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 04. Executive Appointments */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="Executive Appointments"
                subtitle="Newly appointed CEOs, CFOs, CTOs, and board executives."
                action={<Briefcase className="h-4 w-4 text-amber-600" />}
              />
              <div className="space-y-3">
                {[
                  { company: "Tata Electronics", exec: "Dr. Randhir Thakur", role: "CEO & Managing Director", prev: "President, Intel Foundry", date: "Aug 2026" },
                  { company: "Barclays India", exec: "Vikram Malhotra", role: "Country Head & CEO", prev: "Head of Corporate Banking", date: "Aug 2026" },
                  { company: "Adani Green Hydrogen", exec: "Dr. Rajesh Grover", role: "Chief Technology Officer", prev: "VP Clean Fuel Stacks", date: "Jul 2026" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-bold text-emerald-600 uppercase">NEW APPOINTMENT</span>
                      <span className="text-gray-400 font-mono">{item.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.exec}</h4>
                    <p className="text-[10px] text-gray-500">{item.company} — <strong className="text-gray-700 dark:text-gray-300">{item.role}</strong></p>
                    <p className="text-[9px] text-gray-400">Previous: {item.prev}</p>
                    <div className="text-right pt-1">
                      <Link href="/eoi" className="text-[9px] font-bold text-amber-600 hover:underline">
                        View Intelligence →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 05. Board & Governance Updates */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="Board & Governance Updates"
                subtitle="Independent directors, Chairman transitions, and committee restructuring."
                action={<ShieldCheck className="h-4 w-4 text-blue-600" />}
              />
              <div className="space-y-3">
                {[
                  { company: "National Payments Council", exec: "Dinesh Khara", change: "Appointed Senior Board Advisor", sector: "Banking", date: "Aug 2026" },
                  { company: "Biocon Biologics", exec: "Dr. Elena Vance", change: "Elected Independent Director", sector: "Healthcare", date: "Jul 2026" },
                  { company: "Siemens Energy India", exec: "Dr. Hans Becker", change: "Appointed Audit Committee Chair", sector: "Clean Tech", date: "Jul 2026" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-bold text-blue-600 uppercase">BOARD CHANGE</span>
                      <span className="text-gray-400 font-mono">{item.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.company}</h4>
                    <p className="text-[10px] text-gray-700 dark:text-gray-300 font-semibold">{item.exec}</p>
                    <p className="text-[9px] text-gray-500">{item.change} ({item.sector})</p>
                    <div className="text-right pt-1">
                      <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline">
                        Governance Dossier →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 06. M&A & Corporate Transactions */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="M&A & Strategic Deals"
                subtitle="Corporate acquisitions, joint ventures, and capital investments."
                action={<TrendingUp className="h-4 w-4 text-emerald-600" />}
              />
              <div className="space-y-3">
                {[
                  { acquirer: "Tata Group", target: "Dholera Packaging Assets", val: "$11.2 Billion", date: "Aug 2026", type: "Strategic JV" },
                  { acquirer: "Adani Green", target: "Khavda Grid Concession", val: "$4.8 Billion", date: "Jul 2026", type: "Concession Win" },
                  { acquirer: "ReNew Power", target: "Offshore Wind JV", val: "$1.9 Billion", date: "Jul 2026", type: "Cross-Border JV" }
                ].map((deal, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-bold text-emerald-600 uppercase">{deal.type}</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">{deal.val}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{deal.acquirer} ➔ {deal.target}</h4>
                    <p className="text-[9px] text-gray-400 font-mono">Date: {deal.date}</p>
                    <div className="text-right pt-1">
                      <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline">
                        View M&A Intelligence →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* ── 09. RISK SIGNALS & 10. PREDICTIVE INSIGHTS ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 09. Leadership Risk Signals */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4 border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10">
              <SectionTitle
                title="Leadership Risk Signals"
                subtitle="Objective, evidence-based alerts on elevated C-suite turnover and succession milestones."
                action={<AlertTriangle className="h-4 w-4 text-amber-600" />}
              />
              <div className="space-y-3">
                {[
                  {
                    title: "ELEVATED C-SUITE RESTRUCTURING",
                    company: "Global Logistics Conglomerate",
                    desc: "Three executive-level transitions (COO, CFO, Head of Freight) recorded within a 45-day window following multimodal route redesign.",
                    status: "Monitored Signal"
                  },
                  {
                    title: "SUCCESSION TIMELINE INITIATION",
                    company: "Tier-1 Public Banking Institution",
                    desc: "Board advisory committee commissioned search mandate for upcoming Managing Director retirement in Q1 2027.",
                    status: "Succession Watch"
                  }
                ].map((sig, idx) => (
                  <div key={idx} className="p-3.5 bg-white dark:bg-[#0f172a] rounded-xl border border-amber-200 dark:border-amber-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="font-bold text-amber-600 uppercase tracking-wider">{sig.title}</span>
                      <span className="font-mono text-gray-400">{sig.status}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{sig.company}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{sig.desc}</p>
                    <div className="text-right">
                      <Link href="/eoi" className="text-[9px] font-bold text-amber-600 hover:underline">
                        View Evidence & Timeline →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 10. Predictive Executive Insights */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4 bg-gradient-to-br from-purple-50/30 via-white to-amber-50/30 dark:from-purple-950/20 dark:via-[#0f172a] dark:to-amber-950/20">
              <SectionTitle
                title="What Could Happen Next? (Predictive Insights)"
                subtitle="Forward-looking AI pattern modeling on executive succession and sector talent movements."
                action={<Sparkles className="h-4 w-4 text-purple-600" />}
              />
              <div className="space-y-3">
                {[
                  {
                    header: "AI-GENERATED INSIGHT",
                    headline: "Semiconductor OSAT Talent Inflow Accelerating in West India",
                    projection: "Model projects 14 additional VP/Director-level semiconductor hires across Gujarat & Tamil Nadu over the next two quarters.",
                    confidence: "94% Confidence"
                  },
                  {
                    header: "AI-GENERATED INSIGHT",
                    headline: "Cross-Sector CTO Migration to Green Hydrogen & CCUS",
                    projection: "Chemical engineering CTOs migrating toward renewable ammonia infrastructure at a 2.4x velocity compared to 2025 baseline.",
                    confidence: "89% Confidence"
                  }
                ].map((ins, idx) => (
                  <div key={idx} className="p-3.5 bg-white dark:bg-[#0f172a] rounded-xl border border-purple-200 dark:border-purple-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="font-bold text-purple-600 uppercase font-mono">{ins.header}</span>
                      <span className="text-emerald-600 font-bold font-mono">{ins.confidence}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{ins.headline}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">{ins.projection}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* ── 14. MY EXECUTIVE WATCHLIST & 15. CUSTOM EXECUTIVE ALERTS ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="executive-watchlist-section">

          {/* 14. My Executive Watchlist */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="My Executive Watchlist"
                subtitle="Monitored corporate decision-makers, board seats, and key enterprises."
                action={<Bookmark className="h-4 w-4 text-amber-600" />}
              />
              <div className="space-y-2.5">
                {watchlist.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-500" />
                      <span className="font-bold text-gray-900 dark:text-white">{item}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href="/eoi" className="text-[10px] font-bold text-amber-600 hover:underline">
                        Dossier →
                      </Link>
                      <button onClick={() => toggleWatchlist(item)} className="text-[10px] text-gray-400 hover:text-rose-500">
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 15. Custom Executive Alerts */}
          <div className="lg:col-span-6 space-y-4">
            <Card className="p-5 h-full space-y-4">
              <SectionTitle
                title="Create Executive Alerts"
                subtitle="Receive instant notifications upon CEO resignations, board elections, or M&A filings."
                action={<Bell className="h-4 w-4 text-amber-600" />}
              />
              <div className="space-y-2.5">
                {[
                  "CEO Departure",
                  "Major Board Change",
                  "M&A Announcement",
                  "Semiconductor C-Suite Hire",
                  "Cross-Border Joint Venture"
                ].map((alertType) => (
                  <div key={alertType} className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-900 dark:text-white">{alertType}</span>
                    <button
                      onClick={() => toggleAlert(alertType)}
                      className={`text-[10px] px-3 py-1 rounded-lg font-bold transition-all ${
                        alertActive[alertType]
                          ? "bg-amber-500 text-gray-950"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                      }`}
                    >
                      {alertActive[alertType] ? "Active Alert ✓" : "Enable"}
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* ── 22. AI EXECUTIVE INTELLIGENCE & 25. EXPORTS ───────────────────────── */}
        <section className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-[#211304] via-slate-950 to-amber-950 text-white border-amber-900/60 shadow-xl space-y-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest block">Executive AI Intelligence</span>
                <h3 className="text-lg font-bold text-white">Ask AI About Executive Activity & Board Decisions</h3>
              </div>
              <Badge color="amber">PRO ENTERPRISE AI</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Which companies had major leadership changes this month?",
                "Summarize CEO movements in technology.",
                "Which sectors are seeing increased executive turnover?",
                "Compare leadership activity in Finance and Healthcare."
              ].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleAskExecutiveAi(prompt)}
                  className="text-xs bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 rounded-lg text-amber-200 transition-colors"
                >
                  "{prompt}"
                </button>
              ))}
            </div>

            {aiAnalysisResult && (
              <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/50 space-y-2 text-xs text-amber-100 leading-relaxed">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px] uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Executive AI Synthesis ({aiPromptInput})</span>
                </div>
                <p>{aiAnalysisResult}</p>
              </div>
            )}
          </Card>
        </section>

        {/* ── 20. EXECUTIVE REPORTS & 21. ENTERPRISE RESEARCH ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 20. Enterprise Executive Reports */}
          <Card className="p-6 bg-gradient-to-br from-slate-950 via-[#211202] to-amber-950 text-white border-none space-y-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest">Enterprise Dossiers</span>
              <h3 className="text-base font-bold text-white">Enterprise Executive Intelligence Reports</h3>
              <p className="text-xs text-amber-100/80 leading-relaxed font-normal">
                Access verified CEO succession studies, Board directorship audits, and C-Suite risk signals across global markets.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-amber-200 font-medium">
              <div>✓ Global CEO Movement Report</div>
              <div>✓ Board & Governance Audit</div>
              <div>✓ M&A Executive Integration</div>
              <div>✓ Custom Boardroom Alerts</div>
            </div>
            <Link href="/eoi" className="block text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2.5 rounded-xl transition-colors shadow-sm">
              Explore Executive Reports →
            </Link>
          </Card>

          {/* 21. Enterprise Research */}
          <Card className="p-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Custom C-Suite Advisory</span>
              <h3 className="text-base font-bold text-gray-950 dark:text-white">Need Deeper Executive Intelligence?</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                Get customized research on executives, companies, leadership movements and corporate developments.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/eoi" className="flex-1 text-center bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-bold text-xs py-2.5 rounded-xl transition-colors shadow-xs">
                Request Enterprise Research →
              </Link>
              <Link href="/eoi" className="flex-1 text-center border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-xs py-2.5 rounded-xl transition-colors">
                Talk to an Intelligence Specialist →
              </Link>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

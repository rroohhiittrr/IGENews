"use client";

import Link from "next/link";
import { useState } from "react";
import {
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

// ─── Pro Workspace Mock Datasets ─────────────────────────────────────────────

interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  leader: string;
  company: string;
  sector: string;
  country: string;
  date: string;
  readTime: string;
  aiAvailable: boolean;
  tag: string;
  image: string;
}

const PERSONALIZED_PRO_NEWS: NewsItem[] = [
  {
    id: "pro-n1",
    headline: "NVIDIA and Tata Sons Expand Sovereign AI GPU Supercluster Deployment to 16,000 H100 Nodes",
    summary: "Spearheaded by Jensen Huang and N. Chandrasekaran, the strategic expansion delivers foundational compute infrastructure for sovereign LLMs across Indian enterprises.",
    leader: "Jensen Huang & N. Chandrasekaran",
    company: "NVIDIA / Tata Group",
    sector: "Technology & Deep Tech",
    country: "India / USA",
    date: "15 mins ago",
    readTime: "4 min read",
    aiAvailable: true,
    tag: "BREAKING",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pro-n2",
    headline: "Standard Chartered Deploys $1.5B Cross-Border Sustainable Liquidity Window for Asian Exporters",
    summary: "Managing Director Ananya Sengupta outlines green trade finance mechanisms supporting renewable energy equipment corridors between South Asia and Europe.",
    leader: "Ananya Sengupta",
    company: "Standard Chartered",
    sector: "Financial Services",
    country: "Singapore / India",
    date: "1 hour ago",
    readTime: "3 min read",
    aiAvailable: true,
    tag: "PRO EXCLUSIVE",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pro-n3",
    headline: "Adani Green Commissioned 3 GW Hybrid Solar-Wind Park at Khavda Mega-Grid",
    summary: "CTO Dr. Rajesh Grover confirms commissioning of high-efficiency bifacial modules linked to new HVDC transmission corridors.",
    leader: "Dr. Rajesh Grover",
    company: "Adani Green Hydrogen",
    sector: "Energy & Infrastructure",
    country: "India",
    date: "2 hours ago",
    readTime: "3 min read",
    aiAvailable: true,
    tag: "STRATEGIC MOVE",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pro-n4",
    headline: "Biocon Biologics Secures US FDA Clearance for Oncology Biosimilar Franchise",
    summary: "Board Director Dr. Elena Vance leads global regulatory rollout, opening $4.2B market access across North American healthcare systems.",
    leader: "Dr. Elena Vance",
    company: "Biocon Biologics",
    sector: "Healthcare & Life Sciences",
    country: "India / USA",
    date: "4 hours ago",
    readTime: "5 min read",
    aiAvailable: true,
    tag: "REGULATORY",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80"
  }
];

const EXECUTIVE_MOVES = [
  { leader: "Dr. Rajesh Grover", role: "Appointed CTO", company: "Adani Green Hydrogen", prevRole: "Former Head of R&D, CleanTech Corp", sector: "Energy", date: "Effective Today" },
  { leader: "Ananya Sengupta", role: "Named Managing Director, South Asia", company: "Standard Chartered", prevRole: "Executive Director, Trade Treasury", sector: "Finance", date: "Effective Yesterday" },
  { leader: "Dr. Elena Vance", role: "Elected to Board of Directors", company: "Biocon Biologics", prevRole: "SVP Regulatory Affairs", sector: "Healthcare", date: "2 Days Ago" },
  { leader: "Suresh Narayanan", role: "Transitioned to Senior Board Advisor", company: "Nestlé South Asia", prevRole: "Chairman & Managing Director", sector: "Consumer Goods", date: "Last Week" }
];

const LEADERSHIP_REPORTS = [
  { id: "rep-1", title: "2026 Sovereign AI Leadership Playbook: GPU Clusters & Cloud Autonomy", category: "Deep Tech", pages: "68 Pages", coverage: "Fortune 500 & Top 50 Indian Enterprises" },
  { id: "rep-2", title: "Cross-Border Trade Treasury & Digital Currency Rails: C-Suite Executive Briefing", category: "FinTech & Banking", pages: "54 Pages", coverage: "APAC & GCC Central Banks" },
  { id: "rep-3", title: "IMEC Multi-Modal Transit Accord: Boardroom Infrastructure Risk & Asset Allocation", category: "Supply Chain", pages: "48 Pages", coverage: "Port Operators & Freight Conglomerates" }
];

const LEADER_WATCHLIST_DATA = [
  { name: "Jensen Huang", role: "CEO", company: "NVIDIA Corp", stories: 14, moves: 2, score: 98, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" },
  { name: "N. Chandrasekaran", role: "Chairman", company: "Tata Sons", stories: 18, moves: 3, score: 98, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80" },
  { name: "Ananya Sengupta", role: "MD", company: "Standard Chartered", stories: 9, moves: 1, score: 92, photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80" }
];

const COMPANY_WATCHLIST_DATA = [
  { name: "Tata Sons", sector: "Conglomerate & Tech", activeStories: 24, execMoves: 4, signal: "Sovereign AI CapEx" },
  { name: "Standard Chartered", sector: "Financial Services", activeStories: 16, execMoves: 2, signal: "$1.5B Green Trade Window" },
  { name: "Adani Green Energy", sector: "Clean Energy", activeStories: 19, execMoves: 3, signal: "3 GW Khavda Pilot" }
];

const UPCOMING_EVENTS = [
  { title: "Global Sovereign AI C-Suite Roundtable", date: "Sept 12, 2026", location: "Mumbai & Virtual", attendees: "450+ CXOs" },
  { title: "Bilateral Indo-Gulf Trade Finance Summit", date: "Oct 04, 2026", location: "Abu Dhabi", attendees: "600+ Executives" },
  { title: "IMEC Corridors Logistics Board Forum", date: "Nov 18, 2026", location: "New Delhi", attendees: "300+ Board Chairs" }
];

export default function VerifiedLeaderNewsView() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTabSaved, setActiveTabSaved] = useState<"news" | "reports" | "leaders" | "companies">("news");
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({ "pro-n1": true, "pro-n2": true });
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [alertCreated, setAlertCreated] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const toggleSave = (id: string) => {
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAskAI = (promptText?: string) => {
    const q = promptText || aiQuestion;
    if (!q.trim()) return;
    setAiQuestion(q);
    setAiResponse(
      `AI Executive Synthesis for "${q}": Over the past 14 days, C-suite leadership transitions across Technology and Clean Energy have accelerated by 38%. Key appointments include new CTO appointments at Adani Green and Tata Sons expanding GPU cluster capital allocation to $14B. Recommended focus: Monitor Q4 board resolutions on cross-border supply chain derisking.`
    );
  };

  const filteredNews = PERSONALIZED_PRO_NEWS.filter((item) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Executive Moves") return item.tag === "STRATEGIC MOVE";
    if (selectedFilter === "Trending") return item.tag === "BREAKING" || item.tag === "PRO EXCLUSIVE";
    if (selectedFilter === "Sectors") return item.sector.includes("Technology") || item.sector.includes("Energy");
    return true;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. PREMIUM HERO SECTION ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#120826] via-[#1a0f3c] to-slate-950 text-white relative overflow-hidden border-b border-purple-950/60">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#a855f7_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-950/60 inline-flex items-center gap-1.5 shadow-xs">
                <Crown className="h-3 w-3 text-amber-400" /> VERIFIED LEADERS • PRO
              </span>
              <span className="text-[10px] font-semibold text-purple-200 bg-purple-900/30 border border-purple-700/40 px-2.5 py-0.5 rounded-full">
                Premium Leadership Intelligence Workspace
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Stay Ahead of Leadership Developments
            </h1>

            <p className="text-base text-purple-100/85 leading-relaxed max-w-2xl font-normal">
              Get unlimited leadership news, AI-powered summaries, executive movements, premium intelligence, and personalized alerts built for professionals and decision-makers.
            </p>

            <div className="flex gap-3 flex-wrap pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("personalized-news-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Explore Premium Intelligence →
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("leadership-alerts-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-purple-400/40 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs flex items-center gap-1.5"
              >
                <Bell className="h-4 w-4 text-purple-300" />
                <span>Set Up My Alerts →</span>
              </button>
            </div>

            {/* 08. Intelligence Snapshot Mini-Counter */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-purple-800/30">
              {[
                { label: "Executive Moves", value: "+24 This Week" },
                { label: "Tracked Leaders", value: "32 Active" },
                { label: "Tracked Companies", value: "18 Monitored" },
                { label: "Executive Stories", value: "128 Published" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-lg font-bold tracking-tight text-white">{s.value}</div>
                  <div className="text-[10px] text-purple-300/70 uppercase tracking-wider font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. PERSONALIZED FILTERS STRIP ───────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Feed Filter:</span>
            {["All", "Following", "Companies", "Sectors", "Countries", "Executive Moves", "Trending"].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedFilter === f
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:text-purple-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 border-l border-gray-200 dark:border-gray-800 pl-4">
            <Badge color="purple">UNLIMITED PRO ACCESS</Badge>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 02. YOUR LEADERSHIP NEWS & 03. AI EXECUTIVE BRIEF ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="personalized-news-section">

          {/* Main Feed Column */}
          <div className="lg:col-span-8 space-y-6">
            <SectionTitle
              title="Your Personalized Leadership News"
              subtitle="Curated feed aligned with your followed leaders, companies, and monitored industry verticals."
              action={<Badge color="purple">PRO FEED</Badge>}
            />

            <div className="space-y-4">
              {filteredNews.map((news) => {
                const isSaved = savedItems[news.id];

                return (
                  <Card key={news.id} className="p-5 space-y-4 hover:border-purple-300 transition-all shadow-xs">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-2 py-0.5 rounded">
                            {news.tag}
                          </span>
                          <span className="text-[10px] font-semibold text-blue-600">{news.sector}</span>
                          <span className="text-[10px] text-gray-400">· {news.country}</span>
                          <span className="text-[10px] text-gray-400">· {news.date}</span>
                        </div>

                        <h3 className="font-display text-base font-bold text-gray-950 dark:text-white leading-snug hover:text-purple-600 cursor-pointer">
                          {news.headline}
                        </h3>

                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                          {news.summary}
                        </p>

                        <div className="text-[10px] text-gray-500 font-semibold pt-1">
                          Key Figures: <strong className="text-gray-800 dark:text-gray-200">{news.leader}</strong> ({news.company})
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => toggleSave(news.id)}
                          className={`p-2 rounded-lg border transition-colors ${
                            isSaved
                              ? "bg-purple-50 text-purple-600 border-purple-200"
                              : "text-gray-400 border-gray-200 hover:text-purple-600"
                          }`}
                          aria-label="Save story"
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert("Story link copied to clipboard")}
                          className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-purple-600"
                          aria-label="Share story"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* 03. AI Executive Brief Box inside Pro Card */}
                    {news.aiAvailable && (
                      <div className="bg-purple-50/60 dark:bg-purple-950/20 p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/40 space-y-2">
                        <div className="flex items-center justify-between text-[9px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> AI Executive Summary
                          </span>
                          <span className="text-[8px] bg-purple-100 dark:bg-purple-900 px-1.5 py-0.2 rounded font-mono">VERIFIED AI</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-gray-700 dark:text-gray-300">
                          <div>
                            <strong className="text-gray-900 dark:text-white">Why it matters:</strong> Accelerates sovereign compute capability and reduces single-vendor overseas dependence.
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Business impact:</strong> $14B direct capital deployment, unlocking 100K+ enterprise developer workloads.
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between text-xs">
                      <Link href="/eoi" className="font-bold text-purple-600 hover:underline inline-flex items-center gap-1">
                        <span>Read Full Story</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                      <span className="text-[10px] text-gray-400">{news.readTime}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Intelligence Column */}
          <div className="lg:col-span-4 space-y-6">

            {/* 04. Executive Moves */}
            <Card className="p-5 space-y-4">
              <SectionTitle
                title="Executive Moves"
                subtitle="Verified leadership appointments & board successions."
                action={<Briefcase className="h-4 w-4 text-purple-600" />}
              />
              <div className="space-y-3">
                {EXECUTIVE_MOVES.map((m, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{m.leader}</h4>
                      <span className="text-[8px] bg-purple-50 text-purple-600 px-1.5 py-0.2 rounded font-bold">{m.sector}</span>
                    </div>
                    <p className="text-[10px] text-purple-600 font-semibold">{m.role} · {m.company}</p>
                    <p className="text-[9px] text-gray-400">{m.prevRole}</p>
                    <span className="text-[8px] text-gray-400 block pt-0.5">{m.date}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 05. Leadership Alerts Setup */}
            <Card className="p-5 space-y-3 bg-gradient-to-br from-purple-900 to-slate-900 text-white border-none shadow-md" id="leadership-alerts-section">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold flex items-center gap-1.5">
                  <Bell className="h-4 w-4 text-purple-300" />
                  <span>Leadership Alerts</span>
                </h3>
                <Badge color="purple">PRO FEATURE</Badge>
              </div>
              <p className="text-[10px] text-purple-100/80 leading-relaxed font-normal">
                Receive instant notifications when key executives at your tracked companies make strategic announcements, file disclosures, or change roles.
              </p>
              <div className="space-y-1.5 pt-1">
                {["C-Suite Appointments", "Sovereign AI Deals", "Board Transitions", "M&A Filings"].map((alertName) => (
                  <div key={alertName} className="p-2 bg-white/10 rounded-lg text-[10px] font-semibold text-white/90 flex items-center justify-between">
                    <span>{alertName}</span>
                    <span className="text-[9px] text-emerald-400">Active ✓</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setAlertCreated(true);
                  alert("New executive alert created! You will be notified on key leadership moves.");
                }}
                className="w-full text-center bg-white text-purple-950 font-bold text-xs py-2 rounded-xl hover:bg-purple-50 transition-colors shadow-xs"
              >
                + Create Custom Alert
              </button>
            </Card>

            {/* 09. Trending Leadership Topics */}
            <Card className="p-5 space-y-3">
              <SectionTitle title="Trending Leadership Topics" action={<Flame className="h-4 w-4 text-orange-500" />} />
              <div className="flex flex-wrap gap-1.5">
                {[
                  "AI Governance & LLMs",
                  "CEO Succession",
                  "Green Hydrogen Subsidies",
                  "IMEC Multi-Modal Routing",
                  "Semiconductor OSAT CapEx",
                  "Cross-Border Liquidity",
                ].map((top) => (
                  <span key={top} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    #{top}
                  </span>
                ))}
              </div>
            </Card>

          </div>
        </div>

        {/* ── 15. AI LEADERSHIP Q&A (PRO FEATURE) ─────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-[#1c0d38] to-[#0d071a] text-white border border-purple-800/40 space-y-4 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold">AI Leadership Intelligence Q&A</h3>
                  <p className="text-[10px] text-purple-200/70">Ask deep questions about executive movements, corporate strategy, and board trends.</p>
                </div>
              </div>
              <Badge color="purple">PRO AI ACTIVE</Badge>
            </div>

            {/* Pre-canned prompts */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Summarize recent CEO moves in Deep Tech",
                "What are Tata Sons' top 3 AI priorities?",
                "Which banks launched green trade windows?",
                "Identify upcoming Indo-Gulf board meetings",
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => handleAskAI(pill)}
                  className="bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-lg text-[10px] font-medium text-purple-100 transition-colors"
                >
                  "{pill}"
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex gap-2 pt-1">
              <input
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAskAI();
                }}
                className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-xs text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Ask anything about global leaders, boardroom decisions, or sector investments..."
                aria-label="Ask AI Question"
              />
              <button
                onClick={() => handleAskAI()}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                Ask AI →
              </button>
            </div>

            {/* AI Output Display */}
            {aiResponse && (
              <div className="p-4 bg-purple-950/40 rounded-xl border border-purple-800/60 text-xs text-purple-100 leading-relaxed space-y-1">
                <span className="text-[9px] font-bold text-purple-300 uppercase tracking-widest block">AI Synthesis Response:</span>
                <p>{aiResponse}</p>
              </div>
            )}
          </Card>
        </section>

        {/* ── 06. SAVED INTELLIGENCE & 07. PREMIUM REPORTS ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 06. Saved Intelligence */}
          <Card className="p-5 space-y-4">
            <SectionTitle
              title="Saved Intelligence"
              subtitle="Organized briefings, bookmarked stories, and monitored leader dossiers."
              action={
                <div className="flex gap-1 text-[9px] font-bold">
                  {(["news", "reports", "leaders", "companies"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTabSaved(tab)}
                      className={`px-2 py-1 rounded capitalize ${
                        activeTabSaved === tab ? "bg-purple-600 text-white" : "text-gray-500 hover:text-purple-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              }
            />

            <div className="space-y-2.5">
              {PERSONALIZED_PRO_NEWS.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <div className="space-y-0.5 flex-1">
                    <span className="text-[8px] font-bold text-purple-600 uppercase">{item.sector}</span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight line-clamp-1">{item.headline}</h4>
                    <span className="text-[9px] text-gray-400">{item.leader} · {item.company}</span>
                  </div>
                  <Link href="/eoi" className="text-[10px] font-bold text-purple-600 hover:underline shrink-0">
                    Open →
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* 07. Premium Leadership Reports */}
          <Card className="p-5 space-y-4">
            <SectionTitle
              title="Leadership Intelligence Reports"
              subtitle="Exclusive research dossiers and predictive board trend analyses."
              action={<Badge color="purple">PRO REPORTS</Badge>}
            />

            <div className="space-y-3">
              {LEADERSHIP_REPORTS.map((rep) => (
                <div key={rep.id} className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 px-1.5 py-0.5 rounded">
                      {rep.category}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">{rep.pages}</span>
                  </div>
                  <h4 className="font-display font-bold text-xs text-gray-950 dark:text-white leading-snug">{rep.title}</h4>
                  <p className="text-[10px] text-gray-500">Coverage: {rep.coverage}</p>
                  <div className="border-t border-gray-200/60 dark:border-gray-800 pt-2 flex items-center justify-between">
                    <Link href="/eoi" className="text-[10px] font-bold text-purple-600 hover:underline flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>Read Pro Report →</span>
                    </Link>
                    <Link href="/eoi" className="text-[9px] font-semibold text-gray-400 hover:text-gray-600">
                      Request Research →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── 11. LEADER WATCHLIST & 12. COMPANY WATCHLIST ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 11. My Leader Watchlist */}
          <Card className="p-5 space-y-4">
            <SectionTitle
              title="My Leader Watchlist"
              subtitle="Active executives and founders being continuously monitored."
              action={
                <Link href="/en/poc-v2/all-leaders" className="text-xs font-bold text-purple-600 hover:underline">
                  + Add Leader
                </Link>
              }
            />
            <div className="space-y-3">
              {LEADER_WATCHLIST_DATA.map((l, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={l.photo} alt={l.name} className="h-10 w-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{l.name}</h4>
                      <p className="text-[10px] text-gray-500">{l.role} at {l.company}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-bold text-purple-600 block">{l.stories} New Stories</span>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline">
                      Updates →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 12. My Company Watchlist */}
          <Card className="p-5 space-y-4">
            <SectionTitle
              title="My Company Watchlist"
              subtitle="Enterprises monitored for executive announcements and boardroom shifts."
              action={
                <Link href="/eoi" className="text-xs font-bold text-purple-600 hover:underline">
                  + Add Company
                </Link>
              }
            />
            <div className="space-y-3">
              {COMPANY_WATCHLIST_DATA.map((c, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{c.name}</h4>
                    <span className="text-[9px] text-gray-500">{c.sector}</span>
                    <p className="text-[9px] text-purple-600 font-semibold">Signal: {c.signal}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-mono font-bold text-emerald-600 block">+{c.execMoves} Moves</span>
                    <Link href="/eoi" className="text-[9px] font-bold text-purple-600 hover:underline">
                      Intelligence →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── 16. DAILY EXECUTIVE BRIEF & 17. WEEKLY LEADERSHIP REVIEW ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 16. Daily Executive Brief */}
          <Card className="p-5 space-y-3 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-900">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest">Morning Dispatch</span>
              <Badge color="purple">TODAY'S BRIEF</Badge>
            </div>
            <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white">
              Daily Executive Brief: Sovereign Compute, Green Corridor Liquidity, and OSAT Approvals
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
              Essential morning roundup covering 14 key corporate announcements, 3 board appointments across India and GCC, and regulatory updates in clean hydrogen financing.
            </p>
            <div className="border-t border-purple-200/60 dark:border-purple-900/40 pt-3 flex items-center justify-between">
              <Link href="/eoi" className="text-xs font-bold text-purple-600 hover:underline">
                Read Daily Brief →
              </Link>
              <span className="text-[10px] text-gray-400">Published 07:00 AM IST</span>
            </div>
          </Card>

          {/* 17. Weekly Leadership Review */}
          <Card className="p-5 space-y-3 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Weekly Strategic Synthesis</span>
              <Badge color="blue">WEEK 33 REVIEW</Badge>
            </div>
            <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white">
              Weekly Leadership Review: Strategic Alliances Across Sovereign Tech & Clean Infrastructure
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
              Comprehensive weekly intelligence analyzing 24 executive transitions, $18B in cross-border capital commitments, and bilateral policy developments.
            </p>
            <div className="border-t border-blue-200/60 dark:border-blue-900/40 pt-3 flex items-center justify-between">
              <Link href="/eoi" className="text-xs font-bold text-blue-600 hover:underline">
                View Weekly Intelligence →
              </Link>
              <span className="text-[10px] text-gray-400">Published Sunday</span>
            </div>
          </Card>
        </div>

        {/* ── 18. UPCOMING EXECUTIVE EVENTS & 19. PRO EXCLUSIVE CONTENT ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* 18. Upcoming Events */}
          <Card className="p-5 space-y-4">
            <SectionTitle title="Upcoming Executive Events" action={<Calendar className="h-4 w-4 text-purple-600" />} />
            <div className="space-y-3">
              {UPCOMING_EVENTS.map((ev, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{ev.title}</h4>
                    <span className="text-[8px] bg-purple-50 text-purple-600 px-1.5 py-0.2 rounded font-bold">{ev.attendees}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{ev.date} · {ev.location}</p>
                  <Link href="/eoi" className="text-[9px] font-bold text-purple-600 hover:underline block pt-1">
                    View Event Dossier →
                  </Link>
                </div>
              ))}
            </div>
          </Card>

          {/* 19. Pro Exclusive Content */}
          <Card className="p-5 space-y-4">
            <SectionTitle title="Pro Exclusive Analysis" action={<Badge color="purple">PRO EXCLUSIVE</Badge>} />
            <div className="space-y-3">
              {[
                { title: "Exclusive Interview: N. Chandrasekaran on Sovereign AI & Global Supply Webs", type: "Executive Interview", read: "8 min read" },
                { title: "Boardroom Playbook: How Indian Exporters Are Mitigating EU Carbon Border Taxes", type: "Strategic Analysis", read: "6 min read" },
                { title: "GCC Sovereign Wealth Co-Investment Strategy in Asian Renewable Terminals", type: "Market Intelligence", read: "7 min read" },
              ].map((art, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                  <div className="flex items-center justify-between text-[8px] text-purple-600 font-bold">
                    <span>{art.type}</span>
                    <span className="text-gray-400">{art.read}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{art.title}</h4>
                  <Link href="/eoi" className="text-[9px] font-bold text-purple-600 hover:underline block pt-1">
                    Read Exclusive Story →
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── 21. ENTERPRISE INTELLIGENCE CTA ─────────────────────────────────── */}
        <section>
          <Card className="p-8 bg-gradient-to-br from-slate-950 via-[#1f0f38] to-purple-950 text-white border border-purple-800/40 space-y-6 shadow-xl">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="max-w-2xl space-y-2">
                <span className="text-[9px] font-bold text-purple-300 uppercase tracking-widest">Enterprise Custom Solutions</span>
                <h2 className="text-2xl font-bold tracking-tight">Leadership Intelligence for Your Business</h2>
                <p className="text-xs text-purple-100/80 leading-relaxed">
                  Equip executive leadership teams, corporate strategy units, and investment boards with bespoke competitor monitoring, custom board dossiers, and multi-user CRM data integrations.
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/eoi" className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-sm">
                  Explore Enterprise →
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-4 py-3 rounded-xl transition-colors">
                  Talk to Sales →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-purple-800/40 pt-4 text-xs font-medium text-purple-200">
              <div>✓ Custom Board Monitoring</div>
              <div>✓ Competitor Leadership Alerts</div>
              <div>✓ Bespoke Executive Research</div>
              <div>✓ Multi-User Team Access</div>
            </div>
          </Card>
        </section>

        {/* ── 20. EXECUTIVE INTELLIGENCE NEWSLETTER ───────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-purple-800 to-indigo-900 text-white border-none space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-purple-200" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-bold">Executive Intelligence Brief</h2>
                <p className="text-[10px] text-purple-200/80 mt-0.5">
                  Receive the most important leadership developments, executive transitions, and strategic briefings directly in your corporate inbox.
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 min-w-52 rounded-xl bg-white/15 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20"
                placeholder="Enter your corporate email..."
                aria-label="Newsletter email"
                type="email"
              />
              <button
                className="bg-white text-purple-950 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-purple-50 transition-colors shrink-0 shadow-xs"
                aria-label="Subscribe to Executive Intelligence Brief"
              >
                Subscribe →
              </button>
            </div>
            <p className="text-[9px] text-purple-300/60 text-center">Executive Tier · Unsubscribe anytime</p>
          </Card>
        </section>

      </div>
    </div>
  );
}

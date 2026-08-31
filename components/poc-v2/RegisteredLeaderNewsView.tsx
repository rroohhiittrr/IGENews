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
  SlidersHorizontal,
  Clock,
  Flame,
  ShieldCheck,
  Check
} from "lucide-react";

// ─── Local UI primitives (strictly scoped to Registered Leaders News) ────────

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

// ─── Mock Data for Registered Leaders News ───────────────────────────────────

interface LeadershipNewsItem {
  id: string;
  headline: string;
  summary: string;
  leader: string;
  company: string;
  industry: string;
  country: string;
  time: string;
  readTime: string;
  breaking: boolean;
  latest: boolean;
  trending: boolean;
  views: string;
  image: string;
}

const LATEST_LEADERSHIP_NEWS: LeadershipNewsItem[] = [
  {
    id: "ln-1",
    headline: "N. Chandrasekaran Outlines Tata Group's $14 Billion Sovereign AI and Semiconductor Hub Roadmap",
    summary: "Chairman N. Chandrasekaran announced high-capacity packaging lines in Gujarat and major sovereign model infrastructure deployment in partnership with international technology leaders.",
    leader: "N. Chandrasekaran",
    company: "Tata Sons",
    industry: "Semiconductors & AI",
    country: "India",
    time: "25 mins ago",
    readTime: "4 min read",
    breaking: true,
    latest: true,
    trending: true,
    views: "8.4K",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "ln-2",
    headline: "Jensen Huang Emphasizes Bilateral Tech Ties: 'India Will Build Sovereign AI Powering Global Enterprise'",
    summary: "Speaking at the Indo-Global Technology Roundtable, NVIDIA CEO highlighted enterprise GPU supercomputing clusters currently being commissioned across Mumbai and Hyderabad.",
    leader: "Jensen Huang",
    company: "NVIDIA Corp",
    industry: "Deep Tech & Cloud",
    country: "USA / Global",
    time: "1 hour ago",
    readTime: "3 min read",
    breaking: false,
    latest: true,
    trending: true,
    views: "14.2K",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "ln-3",
    headline: "Adani Green Energy Appoints Dr. Rajesh Grover as Chief Technology Officer for Hydrogen Scaling",
    summary: "Dr. Grover brings over 18 years of electrochemical engineering expertise to spearhead 3 GW alkaline electrolyser pilot deployments across Khavda Renewable Park.",
    leader: "Dr. Rajesh Grover",
    company: "Adani Green",
    industry: "Renewable Energy",
    country: "India",
    time: "2 hours ago",
    readTime: "3 min read",
    breaking: false,
    latest: true,
    trending: false,
    views: "5.6K",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "ln-4",
    headline: "Standard Chartered Global Corporate Banking Names Ananya Sengupta Managing Director for South Asia",
    summary: "Sengupta will lead multinational treasury operations, cross-border corporate trade corridors, and sustainable financing facilities across India, Singapore, and UAE.",
    leader: "Ananya Sengupta",
    company: "Standard Chartered",
    industry: "Finance & Banking",
    country: "Singapore / India",
    time: "4 hours ago",
    readTime: "4 min read",
    breaking: false,
    latest: true,
    trending: false,
    views: "4.8K",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "ln-5",
    headline: "Biocon Appoints Dr. Elena Vance to Board of Directors to Accelerate US Biosimilar Filings",
    summary: "Former US FDA Regulatory Director Dr. Vance joins Biocon’s executive board to oversee global clinical strategy and biologics commercialization across North America.",
    leader: "Dr. Elena Vance",
    company: "Biocon Biologics",
    industry: "Biotechnology",
    country: "USA / India",
    time: "6 hours ago",
    readTime: "5 min read",
    breaking: false,
    latest: true,
    trending: false,
    views: "3.9K",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80"
  }
];

const EXECUTIVE_APPOINTMENTS = [
  {
    leader: "Suresh Narayanan",
    newRole: "Non-Executive Chairman & Senior Board Advisor",
    company: "Nestlé South Asia",
    prevRole: "Managing Director, Nestlé India",
    date: "Effective Oct 2026",
    category: "Boardroom Transition"
  },
  {
    leader: "Pooja Malhotra",
    newRole: "Chief Financial Officer (CFO)",
    company: "PayPulse Technologies",
    prevRole: "VP Finance, Razorpay",
    date: "Effective Q4 2026",
    category: "C-Suite Appointment"
  },
  {
    leader: "Vikram Singhania",
    newRole: "Chief Operating Officer (COO)",
    company: "CleanGrid Dynamics",
    prevRole: "Director Infrastructure, ReNew",
    date: "Effective Nov 2026",
    category: "Executive Move"
  },
  {
    leader: "Dr. Alok Verma",
    newRole: "Chief Scientific Officer (CSO)",
    company: "Viksit Life Sciences",
    prevRole: "Senior Scientist, CSIR-CDRI",
    date: "Effective Immediate",
    category: "R&D Leadership"
  }
];

const TRENDING_LEADERSHIP_STORIES = [
  { rank: 1, title: "How Indian Conglomerates Are Structuring AI Boardroom Committees in 2026", reads: "28.4K reads", shares: "1.2K shares", sector: "Corporate Governance" },
  { rank: 2, title: "The Next Generation of CFOs: Managing Sovereign Currency Reserves and UPI Rails", reads: "21.6K reads", shares: "950 shares", sector: "FinTech Leadership" },
  { rank: 3, title: "Supply Chain Reshoring: Why 40+ Multinational CEOs Visited Gujarat Ports This Quarter", reads: "18.9K reads", shares: "840 shares", sector: "Logistics Strategy" },
  { rank: 4, title: "Women in Deep Tech: Emerging Executive Voices Driving Semiconductor OSAT Plants", reads: "15.3K reads", shares: "720 shares", sector: "Tech Leadership" },
];

const LEADERSHIP_TOPICS = [
  "All Topics",
  "CEO Moves",
  "Executive Appointments",
  "Boardroom",
  "Corporate Leadership",
  "Leadership Strategy",
  "Entrepreneurship",
  "Digital Leadership",
  "Business Transformation",
  "Succession Planning",
  "Executive Careers",
  "Women in Leadership",
  "Leadership Innovation"
];

const INDUSTRY_LEADERSHIP_DATA = [
  { name: "Technology & AI", count: "142 Stories", latest: "Jensen Huang on Sovereign LLMs and Enterprise AI Infrastructure", leader: "Jensen Huang" },
  { name: "Finance & Banking", count: "118 Stories", latest: "Standard Chartered Expands South Asia Executive Leadership Board", leader: "Ananya Sengupta" },
  { name: "Renewable Energy", count: "96 Stories", latest: "Adani Green Appoints CTO for 3 GW Hydrogen Electrolyser Hub", leader: "Dr. Rajesh Grover" },
  { name: "Biotechnology & Pharma", count: "84 Stories", latest: "Biocon Adds Ex-FDA Regulatory Director to Advisory Board", leader: "Dr. Elena Vance" },
  { name: "Automotive & EV", count: "72 Stories", latest: "Tata Motors Commercial Vehicles Names New Engineering Chief", leader: "Girish Wagh" },
  { name: "Logistics & Supply Chain", count: "89 Stories", latest: "DP World South Asia Reorganizes Executive Port Management", leader: "Rizwan Soomar" },
];

const COUNTRY_LEADERSHIP_DATA = [
  { country: "India", flag: "🇮🇳", stories: "320+ Stories", highlight: "Tata Sons & Adani Green executive strategies" },
  { country: "United States", flag: "🇺🇸", stories: "240+ Stories", highlight: "NVIDIA & Big Tech leadership briefings" },
  { country: "United Kingdom", flag: "🇬🇧", stories: "140+ Stories", highlight: "Department for Business & Trade ministerial statements" },
  { country: "UAE", flag: "🇦🇪", stories: "110+ Stories", highlight: "G42 & sovereign capital executive appointments" },
  { country: "Singapore", flag: "🇸🇬", stories: "95+ Stories", highlight: "ASEAN FinTech and corporate treasury pivots" },
  { country: "Germany", flag: "🇩🇪", stories: "80+ Stories", highlight: "Industrial automation & clean chemistry executive moves" },
];

const MOST_READ_STORIES = {
  today: [
    { rank: 1, title: "N. Chandrasekaran Outlines Tata Group's $14B AI Roadmap", views: "8.4K", time: "25 mins ago" },
    { rank: 2, title: "Jensen Huang on India Sovereign AI Clusters", views: "14.2K", time: "1 hour ago" },
    { rank: 3, title: "Adani Green CTO Appointment for Hydrogen Scaling", views: "5.6K", time: "2 hours ago" },
  ],
  thisWeek: [
    { rank: 1, title: "Global C-Suite Reshoring Survey: 2026 Executive Priorities", views: "42.8K", time: "3 days ago" },
    { rank: 2, title: "RBI Governor Keynote on Cross-Border Local Currency Settlements", views: "38.1K", time: "4 days ago" },
    { rank: 3, title: "How 100+ Enterprise CEOs Are Preparing for Carbon Border Taxes", views: "31.5K", time: "5 days ago" },
  ]
};

const LEADERSHIP_MOVEMENTS_TIMELINE = [
  { timeGroup: "TODAY", title: "Dr. Rajesh Grover appointed CTO at Adani Green Hydrogen Division", category: "Appointment" },
  { timeGroup: "TODAY", title: "Ananya Sengupta named MD South Asia Corporate Banking at Standard Chartered", category: "Promotion" },
  { timeGroup: "YESTERDAY", title: "Dr. Elena Vance elected to Biocon Biologics Board of Directors", category: "Board" },
  { timeGroup: "2 DAYS AGO", title: "Suresh Narayanan transitions to Senior Board Advisor at Nestlé South Asia", category: "Succession" },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function RegisteredLeaderNewsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [mostReadTab, setMostReadTab] = useState<"today" | "thisWeek">("today");
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [followedLeaders, setFollowedLeaders] = useState<Record<string, boolean>>({
    "N. Chandrasekaran": true,
    "Jensen Huang": true
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [aiSummaryArticle, setAiSummaryArticle] = useState(LATEST_LEADERSHIP_NEWS[0]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFollow = (leader: string) => {
    setFollowedLeaders((prev) => ({ ...prev, [leader]: !prev[leader] }));
  };

  const filteredNews = LATEST_LEADERSHIP_NEWS.filter((item) => {
    const matchesSearch = item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.leader.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === "All Topics" || item.industry.toLowerCase().includes(selectedTopic.toLowerCase());
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── 01. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 border border-white/20 px-3 py-1 rounded-full bg-white/10 inline-flex items-center gap-1.5 shadow-xs">
                <Compass className="h-3 w-3 text-cyan-300" /> LEADERS NEWS
              </span>
              <span className="text-[10px] font-semibold text-cyan-200 bg-cyan-950/40 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                Registered Leaders (Free Access Hub)
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Stay Ahead of Leadership News
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-2xl font-normal">
              Discover the latest leadership moves, executive appointments, boardroom strategies, and emerging business leadership stories from across the globe.
            </p>

            {/* 02. Search Bar */}
            <div className="flex gap-3 flex-wrap pt-2">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-white dark:bg-gray-900 border border-white/20 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-400 shadow-sm"
                  placeholder="Search leaders, companies, topics, or news (e.g. CEO appointment, Tata, NVIDIA)..."
                  aria-label="Search leaders, companies, topics or news"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById("latest-news-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-blue-900 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shrink-0 shadow-sm"
              >
                Explore Latest News →
              </button>
              <Link
                href="/en/poc-v2/leader-news/registered/pages"
                className="border border-white/30 bg-white/10 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-colors shrink-0 backdrop-blur-xs"
              >
                Explore Leaders →
              </Link>
            </div>

            {/* Live Counter Strip */}
            <div className="flex flex-wrap gap-6 pt-3 border-t border-white/15">
              {[
                { label: "Executive News Stories", value: "1,450+ Indexed" },
                { label: "C-Suite Leaders Tracked", value: "2,800+ Profiles" },
                { label: "Appointments This Month", value: "185 Verified" },
                { label: "Global Sectors", value: "50 GoI Sectors" },
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

      {/* ── 07. LEADERSHIP TOPIC CHIPS BAR ──────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-1.5 overflow-x-auto py-2.5" style={{ scrollbarWidth: "none" }}>
            {LEADERSHIP_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedTopic === topic
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-12">

        {/* ── 04. FEATURED LEADERSHIP STORY (STORY OF THE DAY) ────────────────── */}
        <section>
          <SectionTitle
            title="Leadership Story of the Day"
            action={<Badge color="amber">Editorial Spotlight</Badge>}
          />
          <Card className="overflow-hidden border-blue-200 dark:border-blue-900/40 hover:shadow-lg transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div
                className="lg:col-span-6 min-h-[280px] bg-cover bg-center relative"
                style={{ backgroundImage: `url('${LATEST_LEADERSHIP_NEWS[0].image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Flame className="h-3 w-3" /> Breaking Briefing
                  </span>
                </div>
              </div>
              <div className="lg:col-span-6 p-6 lg:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[9px] text-gray-500 dark:text-gray-400 font-semibold">
                    <span className="text-blue-600 font-bold">{LATEST_LEADERSHIP_NEWS[0].industry}</span>
                    <span>·</span>
                    <span>{LATEST_LEADERSHIP_NEWS[0].country}</span>
                    <span>·</span>
                    <span>{LATEST_LEADERSHIP_NEWS[0].readTime}</span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-gray-950 dark:text-white leading-tight">
                    {LATEST_LEADERSHIP_NEWS[0].headline}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                    {LATEST_LEADERSHIP_NEWS[0].summary}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-xs font-bold text-gray-800 dark:text-gray-200">
                    <span className="text-blue-600">Leader Focus:</span>
                    <span>{LATEST_LEADERSHIP_NEWS[0].leader}</span>
                    <span className="text-gray-400 font-normal">({LATEST_LEADERSHIP_NEWS[0].company})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 flex-wrap gap-2">
                  <Link
                    href="/eoi"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-xs"
                  >
                    Read Full Story <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(LATEST_LEADERSHIP_NEWS[0].id)}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        bookmarkedIds[LATEST_LEADERSHIP_NEWS[0].id]
                          ? "bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-950/40"
                          : "border-gray-200 dark:border-gray-700 text-gray-500 hover:text-blue-600"
                      }`}
                      aria-label="Bookmark article"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => alert("Story link copied to clipboard")}
                      className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-blue-600 transition-all text-xs font-bold"
                      aria-label="Share article"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ── 03. LATEST LEADERSHIP NEWS GRID ─────────────────────────────────── */}
        <section id="latest-news-section">
          <SectionTitle
            title="Latest Leadership News"
            action={
              <span className="text-[10px] font-bold text-gray-500">
                {filteredNews.length} Stories Available
              </span>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.slice(1).map((item) => (
              <Card key={item.id} className="p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[9px] text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-blue-600">{item.industry}</span>
                      {item.trending && <Badge color="indigo">Trending</Badge>}
                    </div>
                    <span>{item.time}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white leading-snug hover:text-blue-600 cursor-pointer">
                    {item.headline}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                    <span><strong>{item.leader}</strong> · {item.company}</span>
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
                  <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">
                    Read Story →
                  </Link>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className={`p-1.5 rounded-lg border text-[10px] transition-colors ${
                        bookmarkedIds[item.id]
                          ? "bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-950/40"
                          : "border-gray-200 dark:border-gray-700 text-gray-400 hover:text-blue-600"
                      }`}
                      aria-label={`Bookmark ${item.headline}`}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => alert("Story link copied to clipboard")}
                      className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-blue-600 text-[10px]"
                      aria-label={`Share ${item.headline}`}
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 05. EXECUTIVE APPOINTMENTS & 06. TRENDING LEADERSHIP NEWS ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 05. Executive Appointments */}
          <section id="executive-appointments">
            <Card className="p-4 h-full space-y-4">
              <SectionTitle
                title="Executive Appointments"
                action={<Briefcase className="h-4 w-4 text-blue-500" />}
              />
              <p className="text-[10px] text-gray-500">Verified senior executive, C-suite, and board transitions.</p>
              <div className="space-y-2.5">
                {EXECUTIVE_APPOINTMENTS.map((app, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{app.leader}</span>
                      <Badge color="blue">{app.category}</Badge>
                    </div>
                    <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">{app.newRole} — {app.company}</p>
                    <div className="flex items-center justify-between text-[8px] text-gray-400 pt-0.5">
                      <span>Prev: {app.prevRole}</span>
                      <span>{app.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* 06. Trending in Leadership */}
          <section id="trending-leadership">
            <Card className="p-4 h-full space-y-4">
              <SectionTitle
                title="Trending in Leadership"
                action={<TrendingUp className="h-4 w-4 text-indigo-500" />}
              />
              <p className="text-[10px] text-gray-500">High-velocity readership and executive boardroom discussion trends.</p>
              <div className="space-y-3">
                {TRENDING_LEADERSHIP_STORIES.map((item) => (
                  <div key={item.rank} className="flex items-start gap-3 p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 h-6 w-6 rounded-md flex items-center justify-center shrink-0">
                      #{item.rank}
                    </span>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug hover:text-indigo-600 cursor-pointer">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between text-[8px] text-gray-400 pt-0.5">
                        <span className="font-semibold text-indigo-500">{item.sector}</span>
                        <span>{item.reads} · {item.shares}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 08. LEADERSHIP ACROSS INDUSTRIES & 09. LEADERSHIP AROUND THE WORLD ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Leadership News by Industry */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Leadership Across Industries" action={<Layers className="h-4 w-4 text-purple-500" />} />
              <div className="space-y-2.5">
                {INDUSTRY_LEADERSHIP_DATA.map((ind) => (
                  <div key={ind.name} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{ind.name}</span>
                        <span className="text-[8px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/20 px-1.5 py-0.2 rounded">{ind.count}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5 line-clamp-1">{ind.latest}</p>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline shrink-0">
                      Explore →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Leadership News by Country */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Leadership Around the World" action={<Globe className="h-4 w-4 text-emerald-500" />} />
              <div className="space-y-2.5">
                {COUNTRY_LEADERSHIP_DATA.map((c) => (
                  <div key={c.country} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base" aria-hidden="true">{c.flag}</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{c.country}</span>
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.2 rounded">{c.stories}</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">{c.highlight}</p>
                    </div>
                    <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline shrink-0">
                      Explore →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 10. MOST READ & 11. RECOMMENDED FOR YOU ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Most Read Leadership News */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Most Read Leadership News</h2>
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => setMostReadTab("today")}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                      mostReadTab === "today" ? "bg-white dark:bg-gray-800 text-blue-600 shadow-2xs" : "text-gray-400"
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setMostReadTab("thisWeek")}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                      mostReadTab === "thisWeek" ? "bg-white dark:bg-gray-800 text-blue-600 shadow-2xs" : "text-gray-400"
                    }`}
                  >
                    This Week
                  </button>
                </div>
              </div>
              <div className="space-y-2.5">
                {MOST_READ_STORIES[mostReadTab].map((item) => (
                  <div key={item.rank} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-blue-600 w-4 text-center">#{item.rank}</span>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{item.title}</h4>
                        <span className="text-[8px] text-gray-400">{item.time}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-gray-500 shrink-0">{item.views}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Recommended For You */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Recommended For You" action={<Badge color="indigo">Personalized</Badge>} />
              <p className="text-[10px] text-gray-500">Curated based on your followed topics (Semiconductors, Renewable Energy, FinTech).</p>
              <div className="space-y-2.5">
                {LATEST_LEADERSHIP_NEWS.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <span className="text-[8px] font-bold text-indigo-600 uppercase">{item.industry}</span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug hover:text-indigo-600 cursor-pointer">
                      {item.headline}
                    </h4>
                    <span className="text-[8px] text-gray-400">Leader: {item.leader} ({item.company})</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 12. NEWS FROM LEADERS YOU FOLLOW & 13/14. RECENT MOVEMENTS ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* News From Leaders You Follow */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="News From Leaders You Follow" action={<UserCheck className="h-4 w-4 text-blue-500" />} />
              <div className="space-y-2.5">
                {LATEST_LEADERSHIP_NEWS.slice(0, 2).map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{item.leader}</span>
                      <button
                        onClick={() => toggleFollow(item.leader)}
                        className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded-full"
                      >
                        {followedLeaders[item.leader] ? "Following ✓" : "+ Follow"}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-600 dark:text-gray-300 font-semibold">{item.headline}</p>
                    <span className="text-[8px] text-gray-400">{item.company} · {item.time}</span>
                  </div>
                ))}
              </div>
              <Link href="/en/poc-v2/leader-news/registered/pages" className="block text-center text-[10px] font-bold text-blue-600 hover:underline pt-1">
                Discover More Leaders to Follow →
              </Link>
            </Card>
          </section>

          {/* Recent Leadership Movements Timeline */}
          <section>
            <Card className="p-4 h-full space-y-3">
              <SectionTitle title="Recent Leadership Movements" action={<Clock className="h-4 w-4 text-purple-500" />} />
              <div className="space-y-3">
                {LEADERSHIP_MOVEMENTS_TIMELINE.map((m, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/30 px-2 py-0.5 rounded">
                        {m.timeGroup}
                      </span>
                      <Badge color="purple">{m.category}</Badge>
                    </div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{m.title}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* ── 15. AI NEWS SUMMARY PREVIEW ────────────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-900 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">AI-Powered Leadership News Summary</h3>
                  <p className="text-[10px] text-gray-500">Get the full executive story distilled in 60 seconds.</p>
                </div>
              </div>
              <Badge color="indigo">Free Preview Active</Badge>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-indigo-100 dark:border-indigo-900/60 space-y-2">
              <div className="flex items-center justify-between text-[9px] text-gray-400">
                <span>Story: {aiSummaryArticle.headline.slice(0, 60)}...</span>
                <span className="font-bold text-indigo-600">60-Sec Digest</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 italic leading-relaxed">
                "{aiSummaryArticle.summary} Key strategic takeaways include sovereign hardware clustering, direct capex allocation, and cross-border tech alliances."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="text-[9px] text-gray-500">🔒 Leadership Impact: <span className="text-gray-400">Available in Pro</span></div>
                <div className="text-[9px] text-gray-500">🔒 Boardroom Context: <span className="text-gray-400">Available in Pro</span></div>
                <div className="text-[9px] text-gray-500">🔒 Related Signals: <span className="text-gray-400">Available in Pro</span></div>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-gray-500">Upgrade to Pro for full AI summaries across all 1,450+ indexed executive briefings.</span>
              <Link href="/eoi" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors">
                Unlock Full AI Summaries →
              </Link>
            </div>
          </Card>
        </section>

        {/* ── 16. PREMIUM LEADERSHIP INTELLIGENCE ────────────────────────────── */}
        <section>
          <Card className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-none space-y-5 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Go Beyond Leadership News</h2>
                <p className="text-[10px] text-white/70 mt-1">Upgrade your registered account to unlock predictive executive movement signals and boardroom dossiers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  tier: "FREE (REGISTERED)",
                  color: "border-white/20 bg-white/5",
                  items: ["Latest leadership news", "Trending stories", "Executive appointments", "Basic search & bookmarks", "Share stories"],
                  locked: false
                },
                {
                  tier: "PRO (VERIFIED)",
                  color: "border-purple-400 bg-purple-950/40",
                  items: ["Full AI News Summaries", "C-Suite Movement Signals", "Executive Influence Radar", "Custom Alerts", "Priority Inquiries"],
                  locked: true
                },
                {
                  tier: "ENTERPRISE",
                  color: "border-amber-400 bg-amber-950/30",
                  items: ["Boardroom Dossiers", "Competitor Executive Tracking", "Custom Leadership Research", "Dedicated Advisory Sessions", "CRM Integration"],
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

            <Link href="/eoi" className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-xs">
              Unlock Leadership Intelligence →
            </Link>
          </Card>
        </section>

        {/* ── 17. SPONSORED LEADERSHIP CONTENT ───────────────────────────────── */}
        <section>
          <Card className="p-6 space-y-3 bg-gradient-to-br from-amber-50/60 to-orange-50/60 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900 relative">
            <span className="absolute top-4 right-4 text-[8px] font-bold bg-amber-100 dark:bg-amber-950/30 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              SPONSORED
            </span>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">Featured Corporate Leadership Initiative</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Presented by Global Enterprise Alliance</p>
              </div>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
              "How Indian clean energy leaders are setting benchmark ESG governance standards for cross-border solar and hydrogen project financing."
            </p>
            <Link href="/eoi" className="inline-block text-xs font-bold text-amber-600 hover:underline pt-1">
              Read Sponsored Whitepaper →
            </Link>
          </Card>
        </section>

        {/* ── 19. FINAL UPGRADE CTA ───────────────────────────────────────────── */}
        <section>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white text-center space-y-4 border border-purple-900/50 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 border border-purple-800 px-3 py-1 rounded-full">
                GO BEYOND THE HEADLINES
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Unlock Complete Leadership Intelligence &amp; C-Suite Signals
              </h2>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Join verified executives tracking market-moving statements, predictive board decisions, and bilateral enterprise alliances.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
              <Link href="/eoi" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm">
                Upgrade to Pro →
              </Link>
              <Link href="/eoi" className="border border-white/30 bg-white/10 text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-white/20 transition-all">
                Explore Enterprise →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

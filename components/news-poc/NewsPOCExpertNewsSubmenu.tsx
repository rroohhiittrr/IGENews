"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowLeft,
  Award,
  BarChart2,
  Bell,
  Bookmark,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Crown,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Mic,
  Plus,
  Search,
  Share2,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  Users,
  Zap,
  ThumbsUp
} from "lucide-react";

type ExpertType = "sme" | "asme";
type View = "news" | "pages" | "sector" | "all";
type IconType = ComponentType<{ className?: string }>;

interface Props {
  expertType: ExpertType;
  view: View;
}

const EXPERT_CONFIG: Record<ExpertType, {
  label: string;
  sublabel: string;
  purpose: string;
  icon: IconType;
  gradFrom: string;
  gradTo: string;
  badgeBg: string;
  textAccent: string;
  softBg: string;
  softBorder: string;
  button: string;
  badgeLabel: string;
  newsLimit: string;
  searchRank: string;
  analytics: string;
  leadGen: string;
  avgRate: string;
}> = {
  sme: {
    label: "Subject Matter Expert (SME)",
    sublabel: "Verified Industry Experts & Advisory Board",
    purpose: "Deep technical columns, 1:1 video advisory, peer-reviewed reports",
    icon: CheckCircle,
    gradFrom: "from-emerald-600",
    gradTo: "to-teal-700",
    badgeBg: "bg-emerald-600",
    textAccent: "text-emerald-600",
    softBg: "bg-emerald-50 dark:bg-emerald-950/20",
    softBorder: "border-emerald-200 dark:border-emerald-900",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    badgeLabel: "Verified SME (Pro)",
    newsLimit: "Unlimited expert articles",
    searchRank: "Featured directory priority",
    analytics: "Advisory revenue dashboard",
    leadGen: "Direct client inquiry forms",
    avgRate: "$150 - $250 / hr"
  },
  asme: {
    label: "Associate Expert (ASME)",
    sublabel: "Emerging Subject Matter Experts & Analysts",
    purpose: "Emerging business insights, research briefs, mentorship programs",
    icon: GraduationCap,
    gradFrom: "from-blue-600",
    gradTo: "to-indigo-700",
    badgeBg: "bg-blue-600",
    textAccent: "text-blue-600",
    softBg: "bg-blue-50 dark:bg-blue-950/20",
    softBorder: "border-blue-200 dark:border-blue-900",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    badgeLabel: "Associate SME (Free)",
    newsLimit: "Standard article publishing",
    searchRank: "Standard directory placement",
    analytics: "Basic profile stats",
    leadGen: "Basic contact requests",
    avgRate: "$75 - $120 / hr"
  }
};

const VIEW_LABELS: Record<View, string> = {
  news: "News",
  pages: "Pages",
  sector: "By Sector",
  all: "All Sector"
};

const EXPERTS_DATA: Record<ExpertType, {
  name: string;
  role: string;
  company: string;
  sector: string;
  country: string;
  photo: string;
  initials: string;
  rating: number;
  reviews: number;
  rate: string;
  about: string;
  certifications: string[];
  publications: string[];
  interviews: string[];
}> = {
  sme: {
    name: "Dr. Aris Thorne",
    role: "Chief AI Strategist & SME Advisory Chair",
    company: "NeuralCognition Labs",
    sector: "AI & Cyber Security",
    country: "India / USA",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320&auto=format&fit=crop&q=70",
    initials: "AT",
    rating: 4.9,
    reviews: 142,
    rate: "$150/hr",
    about: "Verified Subject Matter Expert with 15+ years leading enterprise AI architecture, sovereign LLM deployments, and cross-border digital compliance.",
    certifications: ["GoI Cyber Security Panel Advisory", "ISO 27001 Chief Auditor", "MIT Enterprise AI Certificate"],
    publications: ["Architecting Enterprise AI Sovereign Models", "Cross-Border Data Sovereignty Playbook"],
    interviews: ["Live Advisory AMA on AI Regulations", "Executive Fireside: AI in Supply Chain"]
  },
  asme: {
    name: "Vikramaditya Sen",
    role: "Associate Energy Transition Analyst (ASME)",
    company: "CleanGrid Dynamics",
    sector: "New & Renewable Energy",
    country: "India",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&auto=format&fit=crop&q=70",
    initials: "VS",
    rating: 4.8,
    reviews: 76,
    rate: "$90/hr",
    about: "Associate Subject Matter Expert specializing in levelized cost of green hydrogen (LCOH) modeling, offshore wind grid storage, and clean energy trade.",
    certifications: ["Renewable Energy Finance Analyst", "CleanTech Policy Scholar"],
    publications: ["Green Hydrogen Tariff Arbitrage Modeling", "Offshore Wind Storage Benchmarks"],
    interviews: ["Emerging Experts Panel: Hydrogen Corridors", "Grid Energy Arbitrage Briefing"]
  }
};

const ARTICLES_DATA: Record<ExpertType, Array<{
  title: string;
  author: string;
  sector: string;
  type: string;
  time: string;
  views: string;
  premium: boolean;
  rate: string;
}>> = {
  sme: [
    { title: "Architecting Enterprise AI Sovereign Models for Cross-Border Logistics", author: "Dr. Aris Thorne", sector: "AI & Cyber Security", type: "SME Whitepaper", time: "1 hr ago", views: "3.4K", premium: true, rate: "$150/hr" },
    { title: "Standardizing Phytochemical Extracts for Global Export Markets", author: "Prof. Sunita Reddy", sector: "Biotechnology", type: "SME Column", time: "3 hrs ago", views: "2.8K", premium: false, rate: "$220/hr" },
    { title: "Mitigating Red Sea Bottlenecks Through Multimodal Rail-Port Corridors", author: "Meera Deshmukh", sector: "Logistics", type: "SME Report", time: "5 hrs ago", views: "1.9K", premium: true, rate: "$180/hr" },
    { title: "Advanced Chiplet Packaging: Localizing Substrate Supply Chains", author: "Dr. Rajesh Kaushik", sector: "Semiconductors", type: "SME Research", time: "7 hrs ago", views: "1.7K", premium: false, rate: "$200/hr" }
  ],
  asme: [
    { title: "Green Hydrogen Tariff Arbitrage: Offshore Wind vs. Solar Electrolysers", author: "Vikramaditya Sen", sector: "Renewable Energy", type: "ASME Brief", time: "2 hrs ago", views: "2.1K", premium: false, rate: "$90/hr" },
    { title: "Cross-Border UPI Integration: Regulatory Playbook for ASEAN Expansion", author: "Ananya Roy", sector: "FinTech", type: "ASME Insight", time: "4 hrs ago", views: "1.4K", premium: false, rate: "$85/hr" },
    { title: "Autonomous Flight Protocols & Sensor Fusion in Next-Gen UAVs", author: "Priya Nair", sector: "Defence", type: "ASME Column", time: "6 hrs ago", views: "1.8K", premium: false, rate: "$95/hr" },
    { title: "Digital Customs Clearance Protocols: Automated Manifest Verification", author: "Siddharth Mehta", sector: "Shipping", type: "ASME Paper", time: "8 hrs ago", views: "1.1K", premium: false, rate: "$80/hr" }
  ]
};

const EXPERT_DIRECTORY = [
  { name: "Dr. Aris Thorne", role: "AI & Cyber Security SME", company: "NeuralCognition", sector: "AI & Cyber Security", rating: 4.9, reviews: 142, rate: "$150/hr", type: "SME", initial: "AT", color: "from-blue-600 to-indigo-700" },
  { name: "Prof. Sunita Reddy", role: "Biotech Advisory SME", company: "Viksit Life Sciences", sector: "Biotechnology", rating: 5.0, reviews: 198, rate: "$220/hr", type: "SME", initial: "SR", color: "from-emerald-600 to-teal-700" },
  { name: "Meera Deshmukh", role: "Trade Compliance SME", company: "Global Trade Forum", sector: "Logistics", rating: 4.9, reviews: 115, rate: "$180/hr", type: "SME", initial: "MD", color: "from-purple-600 to-pink-600" },
  { name: "Vikramaditya Sen", role: "Renewable Energy ASME", company: "CleanGrid Dynamics", sector: "Energy", rating: 4.8, reviews: 76, rate: "$90/hr", type: "ASME", initial: "VS", color: "from-amber-500 to-orange-600" },
  { name: "Ananya Roy", role: "FinTech Compliance ASME", company: "PayPulse Advisory", sector: "FinTech", rating: 4.7, reviews: 62, rate: "$85/hr", type: "ASME", initial: "AR", color: "from-cyan-500 to-blue-600" },
  { name: "Dr. Rajesh Kaushik", role: "Semiconductors SME", company: "SiliconFab India", sector: "Semiconductors", rating: 4.8, reviews: 128, rate: "$200/hr", type: "SME", initial: "RK", color: "from-indigo-600 to-blue-800" }
];

const SECTORS_LIST = [
  { name: "AI & Cyber Security", count: "480 Experts", growth: "+34%", top: "Dr. Aris Thorne", signal: "Sovereign AI & Data LLMs" },
  { name: "Biotechnology & Ayush", count: "320 Experts", growth: "+22%", top: "Prof. Sunita Reddy", signal: "Phytochemical EU Exports" },
  { name: "Semiconductors & IT", count: "510 Experts", growth: "+29%", top: "Dr. Rajesh Kaushik", signal: "OSAT Packaging & Substrates" },
  { name: "Finance & FinTech", count: "640 Experts", growth: "+26%", top: "Ananya Roy", signal: "Cross-Border UPI Rails" },
  { name: "Energy & Sustainability", count: "410 Experts", growth: "+31%", top: "Vikramaditya Sen", signal: "Green Hydrogen Tariff Arbitrage" },
  { name: "Logistics & Supply Chain", count: "390 Experts", growth: "+19%", top: "Meera Deshmukh", signal: "IMEC Multimodal Corridors" },
  { name: "Agriculture & Agritech", count: "290 Experts", growth: "+15%", top: "Dr. Marcus Vance", signal: "Drone Sprayer Grants" },
  { name: "Healthcare & Pharma", count: "450 Experts", growth: "+18%", top: "Kiran Mazumdar-Shaw", signal: "Biosimilar Global Scaling" }
];

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
      <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
      {action}
    </div>
  );
}

export default function NewsPOCExpertNewsSubmenu({ expertType, view }: Props) {
  const router = useRouter();
  const cfg = EXPERT_CONFIG[expertType];
  const IconComponent = cfg.icon;
  const expertProfile = EXPERTS_DATA[expertType];
  const articlesList = ARTICLES_DATA[expertType];
  const basePath = "/en/news-poc/expert-news";

  const SubMenuHeader = () => (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="flex items-center gap-2 py-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => router.push(basePath)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all mr-1"
          aria-label="Go back to Expert News main page"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* Expert Track Switcher (SME vs ASME) */}
        <div className={`bg-gradient-to-r ${cfg.gradFrom} ${cfg.gradTo} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-xs`}>
          <IconComponent className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold">{cfg.label.split(" ")[0]}</span>
        </div>

        {/* View Tabs */}
        <div className="flex gap-1 flex-wrap">
          {(["news", "pages", "sector", "all"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => router.push(`${basePath}/${expertType}/${v}`)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                view === v
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {VIEW_LABELS[v]}
            </button>
          ))}
        </div>

        {/* Switch Expert Track (SME <-> ASME) */}
        <div className="ml-auto flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
          {(["sme", "asme"] as ExpertType[]).map((t) => (
            <button
              key={t}
              onClick={() => router.push(`${basePath}/${t}/${view}`)}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${
                expertType === t
                  ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t.toUpperCase()} Track
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const HeroBanner = ({ title, description }: { title: string; description: string }) => (
    <section className={`bg-gradient-to-br ${cfg.gradFrom} ${cfg.gradTo} text-white relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <IconComponent className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{cfg.sublabel}</span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-white/85 leading-relaxed font-normal">{description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 min-w-0 lg:min-w-[520px]">
            {[
              { label: "Access Level", value: cfg.newsLimit },
              { label: "Directory Rank", value: cfg.searchRank },
              { label: "Advisory Rate", value: cfg.avgRate },
              { label: "Lead Gen", value: cfg.leadGen }
            ].map((item) => (
              <div key={item.label} className="bg-white/10 border border-white/15 rounded-xl p-3">
                <div className="text-[8px] font-bold uppercase text-white/50">{item.label}</div>
                <div className="text-xs font-bold mt-1 leading-tight">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // VIEW 1: NEWS (SME News & ASME News)
  if (view === "news") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title={`${expertType.toUpperCase()} News & Editorial Briefings`}
          description={`Discover peer-reviewed articles, sector insights, research reports, and columns written by ${expertType === "sme" ? "Subject Matter Experts (SMEs)" : "Associate Subject Matter Experts (ASMEs)"}.`}
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <Card className="p-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-blue-500" placeholder={`Search ${expertType.toUpperCase()} articles, topics, author...`} />
            </div>
            {["All Topics", "AI & Cyber Security", "Biotechnology", "FinTech", "Energy", "Logistics"].map((topic) => (
              <button key={topic} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 px-3 py-2 text-[10px] font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600">
                {topic}
              </button>
            ))}
            <button className={`${cfg.button} rounded-lg px-4 py-2 text-xs font-bold flex items-center gap-1.5`}>
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
          </Card>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Featured Article */}
              <Card className="overflow-hidden">
                <div className={`h-44 bg-gradient-to-r ${cfg.gradFrom} ${cfg.gradTo} p-6 flex items-end relative`}>
                  <div className="relative z-10">
                    <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-1 rounded uppercase">
                      Featured {expertType.toUpperCase()} Briefing
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h2 className="font-display text-lg font-bold text-gray-950 dark:text-white">
                    {articlesList[0].title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                    Peer-reviewed analysis detailing strategic trade implications, regulatory benchmarks, and industry adaptation frameworks.
                  </p>
                  <div className="flex flex-wrap items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                      <span>By {articlesList[0].author}</span>
                      <span className="text-gray-400 font-normal">· {articlesList[0].sector}</span>
                    </div>
                    <Link href="/eoi" className={`${cfg.button} rounded-lg px-4 py-2 text-xs font-bold`}>
                      Read Full Article
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Feed List */}
              <div className="space-y-3">
                <SectionTitle title={`Latest ${expertType.toUpperCase()} News Feed`} action={<span className="text-[10px] font-bold text-gray-400">{articlesList.length} articles</span>} />
                {articlesList.map((item, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`h-11 w-11 rounded-xl ${cfg.badgeBg} flex items-center justify-center text-white font-bold shrink-0`}>
                        {item.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600">{item.type}</span>
                          <span className="text-[9px] text-gray-400">{item.sector}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-950 dark:text-white leading-snug hover:text-blue-600">{item.title}</h3>
                        <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                          <span>{item.author} · {item.time}</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.views}</span>
                            <span className="text-emerald-600 font-bold">Rate: {item.rate}</span>
                            <Link href="/eoi" className="bg-blue-600 text-white font-bold text-[8px] px-2 py-0.5 rounded">
                              Book Advisory
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-5">
              <Card className="p-4 space-y-3">
                <SectionTitle title="Research Reports" action={<Download className="h-4 w-4 text-blue-500" />} />
                {[
                  { title: "Q3 Sovereign AI Infrastructure Report", size: "2.4 MB PDF" },
                  { title: "Global Phytochemical Benchmark Guide", size: "1.8 MB PDF" },
                  { title: "Green Hydrogen LCOH Tariff Tables", size: "3.1 MB PDF" }
                ].map((rep, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{rep.title}</h4>
                      <span className="text-[9px] text-gray-400">{rep.size}</span>
                    </div>
                    <Link href="/eoi" className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <Download className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ))}
              </Card>

              <Card className="p-4 space-y-3">
                <SectionTitle title="Newsletter Sponsorship" />
                <p className="text-[10px] text-gray-500">Subscribe to receive weekly SME & ASME executive digests.</p>
                <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none" placeholder="Enter work email" />
                <button className={`${cfg.button} w-full rounded-lg py-2 text-xs font-bold`}>
                  Subscribe to Digest
                </button>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // VIEW 2: PAGES (SME Pages & ASME Pages Directory)
  if (view === "pages") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <section className={`bg-gradient-to-br ${cfg.gradFrom} ${cfg.gradTo} text-white`}>
          <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
            <div className="flex flex-col md:flex-row gap-6 md:items-end">
              <img src={expertProfile.photo} alt={expertProfile.name} className="h-28 w-28 rounded-2xl object-cover border-4 border-white/25 shadow-lg" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-3xl font-bold">{expertProfile.name}</h1>
                  <span className="rounded-full bg-white/20 border border-white/25 px-2 py-1 text-[9px] font-bold flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> {cfg.badgeLabel}
                  </span>
                </div>
                <p className="text-sm text-white/85">{expertProfile.role}, {expertProfile.company}</p>
                <div className="flex flex-wrap gap-3 text-[10px] font-semibold text-white/70">
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{expertProfile.sector}</span>
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{expertProfile.country}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-300 text-amber-300" />{expertProfile.rating} ({expertProfile.reviews} reviews)</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 min-w-52">
                <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center">
                  <div className="font-display text-xl font-bold text-amber-300">{expertProfile.rating} ★</div>
                  <div className="text-[8px] font-bold uppercase text-white/60">Client Rating</div>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center">
                  <div className="font-display text-xl font-bold text-emerald-300">{expertProfile.rate}</div>
                  <div className="text-[8px] font-bold uppercase text-white/60">Advisory Fee</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <Card className="p-6 space-y-4">
                <SectionTitle title="Expert Directory" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EXPERT_DIRECTORY.map((exp, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${exp.color} text-white font-bold text-xs flex items-center justify-center`}>
                            {exp.initial}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{exp.name}</h4>
                            <span className="text-[9px] text-gray-400">{exp.role}</span>
                          </div>
                        </div>
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">{exp.type}</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-2">
                        <span className="text-amber-500 font-bold flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-amber-500" /> {exp.rating} ({exp.reviews})</span>
                        <span className="font-bold text-emerald-600">{exp.rate}</span>
                        <Link href="/eoi" className="bg-blue-600 text-white font-bold text-[8px] px-2 py-1 rounded">
                          Book Consultation
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-5">
              <Card className="p-5 space-y-3">
                <SectionTitle title="Book 1:1 Consultation" />
                <div className="space-y-2">
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none" placeholder="Your name" />
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none" placeholder="Work email" />
                  <select className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none">
                    <option>Technical Advisory (1 hr)</option>
                    <option>Policy Compliance Audit</option>
                    <option>Market Entry Strategy</option>
                  </select>
                  <button className={`${cfg.button} w-full rounded-lg py-2.5 text-xs font-bold`}>
                    Request Consultation
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // VIEW 3: SECTOR (By Sector SME & ASME)
  if (view === "sector") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title={`${expertType.toUpperCase()} Directory by Industry Sector`}
          description="Browse experts organized across 50 GoI ministry-aligned sectors and 1,350+ industries."
        />
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {SECTORS_LIST.map((sec, idx) => (
              <Card key={idx} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-900 dark:text-white">{sec.name}</span>
                  <span className="text-[9px] font-bold text-emerald-500">{sec.growth}</span>
                </div>
                <p className="text-[10px] text-gray-500">{sec.count}</p>
                <p className="text-[9px] text-blue-600 font-bold">Top: {sec.top}</p>
                <p className="text-[9px] text-gray-400 italic">⚡ {sec.signal}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // VIEW 4: ALL SECTOR (Master Directory)
  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
      <SubMenuHeader />
      <HeroBanner
        title={`All Sector ${expertType.toUpperCase()} Master Directory`}
        description="Master index of all 50 sectors and 1,350+ industries for comprehensive B2B expert discovery."
      />
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
        <Card className="p-6 space-y-4">
          <SectionTitle title="Master Sector Directory" />
          <div className="divide-y divide-gray-100 dark:border-gray-800">
            {SECTORS_LIST.map((sec, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{sec.name}</h4>
                  <span className="text-[9px] text-gray-400">{sec.count} · Top Expert: {sec.top}</span>
                </div>
                <Link href="/eoi" className="bg-blue-600 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg">
                  Explore Sector →
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

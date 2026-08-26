"use client";

import Link from "next/link";
import ASMEPagesView from "./ASMEPagesView";
import SMEPagesView from "./SMEPagesView";
import ASMEBySectorView from "./ASMEBySectorView";
import SMEBySectorView from "./SMEBySectorView";
import ASMEAllSectorView from "./ASMEAllSectorView";
import SMEAllSectorView from "./SMEAllSectorView";
import { useRouter } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
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

  // SME News state
  const [smeSearchQuery, setSmeSearchQuery] = useState("");
  const [smeSelectedIndustry, setSmeSelectedIndustry] = useState("All");
  const [smeSelectedContentType, setSmeSelectedContentType] = useState("All");
  const [smeSelectedRegion, setSmeSelectedRegion] = useState("All");
  const [smeSelectedDate, setSmeSelectedDate] = useState("All");
  const [smeSortOption, setSmeSortOption] = useState("Latest");
  const [smeActiveTrendingTab, setSmeActiveTrendingTab] = useState<"Most Read" | "Most Discussed" | "Most Saved" | "Trending">("Trending");
  const [smeNewsletterEmail, setSmeNewsletterEmail] = useState("");
  const [smeIsSubscribed, setSmeIsSubscribed] = useState(false);
  const [smeAskInput, setSmeAskInput] = useState("");
  const [smeAskedQuestions, setSmeAskedQuestions] = useState([
    { id: 1, question: "How can agricultural SMEs qualify for the central drone deployment grant scheme?", votes: 42, voted: false },
    { id: 2, question: "What regulatory clearance is needed for biotech Ayush exports to EMEA regions?", votes: 31, voted: false },
    { id: 3, question: "Can electronics components manufacturers apply for custom single-window fast-track duty exemptions?", votes: 19, voted: false }
  ]);
  const [smeAlertActive, setSmeAlertActive] = useState(false);
  const [smePublishCompany, setSmePublishCompany] = useState("");
  const [smePublishTitle, setSmePublishTitle] = useState("");
  const [smePublishSuccess, setSmePublishSuccess] = useState(false);

  // ASME News state
  const [asmeSelectedIndustry, setAsmeSelectedIndustry] = useState("All");
  const [asmeSelectedContentType, setAsmeSelectedContentType] = useState("All");
  const [asmeSortOption, setAsmeSortOption] = useState("Latest");
  const [asmeActiveTrendingTab, setAsmeActiveTrendingTab] = useState<"Most Read" | "Most Saved">("Most Read");
  const [asmeQuestionVotes, setAsmeQuestionVotes] = useState([
    { id: 1, question: "Should tech MSMEs deploy sovereign LLMs on-premise or use APIs?", votes: 24, voted: false },
    { id: 2, question: "How to validate HPLC testing reports for sea manifest custom audits?", votes: 18, voted: false },
    { id: 3, question: "What are the ASEAN cross-border UPI compliance checkpoints?", votes: 11, voted: false }
  ]);
  const [asmeNewQuestion, setAsmeNewQuestion] = useState("");
  const [asmeNewsletterEmail, setAsmeNewsletterEmail] = useState("");

  const ASME_ARTICLES = [
    { title: "Green Hydrogen Tariff Arbitrage: Offshore Wind vs. Solar Electrolysers", author: "Vikramaditya Sen", sector: "Renewable Energy", type: "ASME Brief", time: "2 hrs ago", views: "2.1K", saves: "340", premium: false, rate: "$90/hr", excerpt: "Comparative LCOH analysis of green hydrogen production pathways across offshore wind and solar electrolysis routes in India and the Gulf Corridor.", tags: ["Energy", "H2 Economy", "Trade Policy"] },
    { title: "Cross-Border UPI Integration: Regulatory Playbook for ASEAN Expansion", author: "Ananya Roy", sector: "FinTech", type: "ASME Insight", time: "4 hrs ago", views: "1.4K", saves: "210", premium: false, rate: "$85/hr", excerpt: "Step-by-step compliance and integration framework for Indian FinTechs seeking UPI merchant rail expansion across Singapore, UAE and Thailand.", tags: ["FinTech", "UPI", "ASEAN"] },
    { title: "Autonomous Flight Protocols & Sensor Fusion in Next-Gen UAVs", author: "Priya Nair", sector: "Defence", type: "ASME Column", time: "6 hrs ago", views: "1.8K", saves: "290", premium: false, rate: "$95/hr", excerpt: "Technical brief on multi-sensor fusion architectures enabling autonomous obstacle avoidance and route planning for military-grade UAV platforms.", tags: ["Defence", "UAV", "AI"] },
    { title: "Digital Customs Clearance Protocols: Automated Manifest Verification", author: "Siddharth Mehta", sector: "Shipping", type: "ASME Paper", time: "8 hrs ago", views: "1.1K", saves: "155", premium: false, rate: "$80/hr", excerpt: "End-to-end digitization blueprint for customs manifest validation using blockchain attestation and AI-driven document parsing engines.", tags: ["Shipping", "Customs", "Blockchain"] },
    { title: "Phytochemical Standardization for EU & UK Export Compliance", author: "Meghna Iyer", sector: "Biotechnology", type: "ASME Brief", time: "10 hrs ago", views: "920", saves: "130", premium: false, rate: "$88/hr", excerpt: "Regulatory mapping of EC and MHRA standards for botanical extract classification with standardized batch documentation practices.", tags: ["Biotech", "Export", "Ayush"] }
  ];

  const ASME_TRENDING = {
    "Most Read": [
      { rank: 1, title: "LCOH Tariff Tables: Green H2 Economics", author: "Vikramaditya Sen", views: "4.8K", sector: "Energy" },
      { rank: 2, title: "UPI Cross-Border ASEAN Compliance Grid", author: "Ananya Roy", views: "3.2K", sector: "FinTech" },
      { rank: 3, title: "Sensor Fusion in Military UAVs", author: "Priya Nair", views: "2.9K", sector: "Defence" }
    ],
    "Most Saved": [
      { rank: 1, title: "Phytochemical EU Export Compliance Guide", author: "Meghna Iyer", views: "1.6K", sector: "Biotech" },
      { rank: 2, title: "Automated Manifest Verification Blueprint", author: "Siddharth Mehta", views: "1.1K", sector: "Shipping" },
      { rank: 3, title: "LCOH Tariff Tables: Green H2 Economics", author: "Vikramaditya Sen", views: "980", sector: "Energy" }
    ]
  };

  const ASME_RESEARCH_REPORTS = [
    { title: "Green Hydrogen LCOH Tariff Tables — India 2026", size: "3.1 MB PDF" },
    { title: "ASEAN UPI Rail Regulatory Playbook", size: "1.9 MB PDF" },
    { title: "Phytochemical Batch Compliance Handbook", size: "2.4 MB PDF" }
  ];

  const ASME_CONTENT_TYPES = ["All", "ASME Brief", "ASME Insight", "ASME Column", "ASME Paper"];
  const ASME_INDUSTRIES = ["All", "Renewable Energy", "FinTech", "Defence", "Shipping", "Biotechnology"];


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
  // VIEW 1: NEWS — SME News
  if (view === "news" && expertType === "sme") {
    // Verified local MSME datasets
    const SME_NEWS_ARTICLES = [
      {
        id: "sme-a1",
        title: "How Manufacturing MSMEs are Offsetting Global Steel Tariffs via Local Sourcing Pools",
        excerpt: "Sovereign cluster incentives enable cooperative bulk purchasing contracts, reducing raw steel input costs by 18% for light engineering units.",
        company: "ABC Manufacturing Alliance",
        sector: "Manufacturing",
        author: "Rakesh Sharma · Industrial Policy Expert",
        region: "Bengaluru",
        date: "Today",
        readTime: "5 min read",
        likes: 124,
        comments: 15,
        views: "1.2K",
        isFeatured: true,
        isSponsored: false,
        isPremium: false,
        type: "Success Story",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "sme-a2",
        title: "Ayush Extract Exporters Face Stricter MHRA Standard Audits in Q3",
        excerpt: "New batch certification requirements mandate third-party lab testing certificates for botanical shipments entering UK and EU distribution zones.",
        company: "Arogya Herbals",
        sector: "Biotechnology",
        author: "Prof. Sunita Reddy · Biotech Advisory",
        region: "Delhi NCR",
        date: "Yesterday",
        readTime: "6 min read",
        likes: 98,
        comments: 8,
        views: "940",
        isFeatured: false,
        isSponsored: false,
        isPremium: true,
        type: "Expert Opinion",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "sme-a3",
        title: "FinTech MSMEs Adopt Decentralized Ledger Protocols for Invoice Discounting",
        excerpt: "Commercial sandbox testbeds report 34% faster liquidity release timelines for trade receivable transactions using smart contracts.",
        company: "PayPulse Advisory",
        sector: "FinTech",
        author: "Ananya Roy · FinTech Lead",
        region: "Mumbai",
        date: "3 days ago",
        readTime: "4 min read",
        likes: 156,
        comments: 22,
        views: "2.1K",
        isFeatured: false,
        isSponsored: true,
        isPremium: false,
        type: "Sponsored Article",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "sme-a4",
        title: "Sovereign LLMs: Localized AI Training Sandbox Launched for Tech Startups",
        excerpt: "Incentivized compute credit grants enable cloud hosting platforms to deploy private secure models for 80 verified tech MSMEs.",
        company: "NeuralCognition Labs",
        sector: "AI & Cyber Security",
        author: "Dr. Aris Thorne · Advisory Chair",
        region: "Bengaluru",
        date: "4 days ago",
        readTime: "7 min read",
        likes: 210,
        comments: 29,
        views: "3.4K",
        isFeatured: false,
        isSponsored: false,
        isPremium: false,
        type: "News",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
      }
    ];

    const SME_EXPERT_VOICES = [
      { name: "Dr. Aris Thorne", role: "AI & Cyber Security SME", company: "NeuralCognition Labs", sector: "AI & Cyber Security", rating: 4.9, reviews: 142, rate: "$150/hr", initial: "AT", color: "from-emerald-600 to-teal-700", bio: "Former GoI cyber consultant, expert in enterprise sovereign LLM infrastructure." },
      { name: "Prof. Sunita Reddy", role: "Biotechnology Advisory SME", company: "Viksit Life Sciences", sector: "Biotechnology", rating: 5.0, reviews: 198, rate: "$220/hr", initial: "SR", color: "from-teal-600 to-emerald-700", bio: "SME board chairperson specializing in botanical export clearance and standardization." },
      { name: "Meera Deshmukh", role: "Logistics & Trade Compliance SME", company: "Global Trade Forum", sector: "Logistics", rating: 4.9, reviews: 115, rate: "$180/hr", initial: "MD", color: "from-blue-600 to-indigo-700", bio: "Customs audit auditor with 12+ years experience advising trade logistics networks." }
    ];

    const SME_SUCCESS_STORIES = [
      { title: "From Local Steel Fabricator to German Automotive Component Supplier", company: "Kalyani Precision Engineering", sector: "Manufacturing", region: "Bengaluru", excerpt: "How cooperation buying consortiums and digital process validations unlocked tier-1 overseas export accounts for a 45-person workshop.", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80" }
    ];

    const SME_MARKET_PULSE = [
      { label: "SME Capital CapEx Index", value: "+12.4% YoY", trend: "up", desc: "MSME tooling & fabrication upgrades expand." },
      { label: "Bilateral Export Orders Index", value: "Active", trend: "stable", desc: "Cross-border component demand steady." },
      { label: "MSME Funding Activity", value: "+8.5% QoQ", trend: "up", desc: "Pre-series A and credit lines pick up." },
      { label: "Industrial Tech Adoption", value: "72% Peak", trend: "up", desc: "CNC automated systems lead integration." }
    ];

    const SME_OPPORTUNITIES = [
      { title: "Sovereign Defence Drone Avionics Vendor Empanelment Open", agency: "Department of Defence Production", deadline: "Aug 30, 2026", type: "Procurement Tender" },
      { title: "SME Green Ammonia Shipping Corridor Credit Grants", agency: "Offshore Decarbonization Alliance", deadline: "Sep 15, 2026", type: "Multilateral Funding" }
    ];

    // Stateful logic for filtering & search
    const filteredArticles = SME_NEWS_ARTICLES.filter((art) => {
      const matchSearch = !smeSearchQuery ||
        art.title.toLowerCase().includes(smeSearchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(smeSearchQuery.toLowerCase()) ||
        art.company.toLowerCase().includes(smeSearchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(smeSearchQuery.toLowerCase());
      
      const matchIndustry = smeSelectedIndustry === "All" || art.sector === smeSelectedIndustry;
      const matchContentType = smeSelectedContentType === "All" || art.type === smeSelectedContentType;
      const matchRegion = smeSelectedRegion === "All" || art.region === smeSelectedRegion;
      
      return matchSearch && matchIndustry && matchContentType && matchRegion;
    }).sort((a, b) => {
      if (smeSortOption === "Trending") return parseInt(b.views.replace("K", "000").replace(".", "")) - parseInt(a.views.replace("K", "000").replace(".", ""));
      if (smeSortOption === "Most Read") return b.likes - a.likes;
      return 0; // Default Latest
    });

    const featuredStory = SME_NEWS_ARTICLES.find(a => a.isFeatured);

    const handleVote = (id: number) => {
      setSmeAskedQuestions(prev => prev.map(q => {
        if (q.id === id) {
          return { ...q, votes: q.votes + (q.voted ? -1 : 1), voted: !q.voted };
        }
        return q;
      }));
    };

    const handleAddQuestion = () => {
      if (!smeAskInput.trim()) return;
      setSmeAskedQuestions(prev => [
        ...prev,
        { id: Date.now(), question: smeAskInput.trim(), votes: 1, voted: true }
      ]);
      setSmeAskInput("");
    };

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20 transition-colors">
        <SubMenuHeader />

        {/* ── 01. SME NEWS HERO ── */}
        <section className={`bg-gradient-to-br ${cfg.gradFrom} ${cfg.gradTo} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6 space-y-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                  SME NEWS
                </span>
                <span className="text-[10px] text-emerald-100">Verified MSME Editorial Room</span>
              </div>
              <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">
                Business News, Expert Insights & Stories from SMEs
              </h1>
              <p className="text-sm md:text-base text-emerald-50 leading-relaxed font-normal">
                Discover the latest SME developments, expert opinions, business stories, industry insights, research and opportunities from the businesses shaping today's economy.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => {
                  setSmeSelectedIndustry("All");
                  setSmeSearchQuery("");
                  window.scrollTo({ top: 700, behavior: "smooth" });
                }}
                className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                Explore SME News →
              </button>
              <Link 
                href="/eoi"
                className="bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-emerald-700/60 transition-colors shadow-xs"
              >
                Become a Featured SME →
              </Link>
            </div>

            {/* Search Input Box */}
            <div className="relative max-w-2xl pt-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300" />
              <input
                value={smeSearchQuery}
                onChange={(e) => setSmeSearchQuery(e.target.value)}
                placeholder="Search SME news, companies, experts..."
                className="w-full rounded-xl bg-white/10 border border-white/20 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-emerald-200 outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-xs"
              />
            </div>
          </div>
        </section>

        {/* ── 02. SEARCH & SMART FILTERS ── */}
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-emerald-600" /> Smart Filters
              </span>
              {(smeSelectedIndustry !== "All" || smeSelectedContentType !== "All" || smeSelectedRegion !== "All" || smeSearchQuery !== "") && (
                <button
                  onClick={() => {
                    setSmeSelectedIndustry("All");
                    setSmeSelectedContentType("All");
                    setSmeSelectedRegion("All");
                    setSmeSearchQuery("");
                  }}
                  className="text-[10px] font-bold text-red-500 hover:underline"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Industry Selector */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Industry</label>
                <select
                  value={smeSelectedIndustry}
                  onChange={(e) => setSmeSelectedIndustry(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold outline-none"
                >
                  <option value="All">All Industries</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="FinTech">FinTech</option>
                  <option value="AI & Cyber Security">AI & Cyber Security</option>
                  <option value="Logistics">Logistics</option>
                </select>
              </div>

              {/* Content Type Selector */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Content Type</label>
                <select
                  value={smeSelectedContentType}
                  onChange={(e) => setSmeSelectedContentType(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold outline-none"
                >
                  <option value="All">All Content</option>
                  <option value="Success Story">Success Stories</option>
                  <option value="Expert Opinion">Expert Opinions</option>
                  <option value="Sponsored Article">Sponsored Stories</option>
                  <option value="News">News Updates</option>
                </select>
              </div>

              {/* Region Selector */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Region</label>
                <select
                  value={smeSelectedRegion}
                  onChange={(e) => setSmeSelectedRegion(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold outline-none"
                >
                  <option value="All">All Regions</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>

              {/* Sort Selector */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Sort By</label>
                <select
                  value={smeSortOption}
                  onChange={(e) => setSmeSortOption(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold outline-none"
                >
                  <option value="Latest">Latest Updates</option>
                  <option value="Trending">Velocity / Views</option>
                  <option value="Most Read">Appreciation / Likes</option>
                </select>
              </div>
            </div>
          </Card>
        </section>

        {/* ── 03. FEATURED SME STORY ── */}
        {featuredStory && !smeSearchQuery && smeSelectedIndustry === "All" && (
          <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <div className="space-y-4">
              <SectionTitle title="Featured SME Story" />
              <Card className="overflow-hidden group hover:border-emerald-500 transition-all flex flex-col md:flex-row">
                <div className="md:w-1/2 relative min-h-[260px] bg-slate-900">
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                    FEATURED BRIEF
                  </span>
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-emerald-600">{featuredStory.sector}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500 font-medium">{featuredStory.region}</span>
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold leading-tight text-gray-950 dark:text-white">
                      {featuredStory.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                      {featuredStory.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="font-bold text-gray-700 dark:text-gray-300 block">{featuredStory.author}</span>
                      <span className="text-[10px] text-gray-400 block">{featuredStory.company}</span>
                    </div>
                    <Link
                      href="/eoi"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs"
                    >
                      Read Story →
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* ── MAIN LAYOUT: NEWS FEED & SIDEBAR ── */}
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT 8-COLUMN: NEWS FEED */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <div>
                  <h3 className="font-display text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
                    Latest SME News Feed
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Chronological briefings verified by subject experts.</p>
                </div>
                <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded">
                  {filteredArticles.length} Stories
                </span>
              </div>

              {filteredArticles.length > 0 ? (
                <div className="space-y-4">
                  {filteredArticles.map((art) => (
                    <Card key={art.id} className="p-5 hover:border-emerald-500 transition-all flex flex-col sm:flex-row gap-4">
                      {/* Left thumbnail */}
                      <div className="sm:w-44 sm:shrink-0 h-32 rounded-xl overflow-hidden bg-slate-900 relative">
                        <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/75 text-white text-[8px] font-bold px-1.5 py-0.5 rounded font-mono">
                          {art.type}
                        </span>
                        {art.isPremium && (
                          <span className="absolute top-2 right-2 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded font-mono">
                            PREMIUM
                          </span>
                        )}
                        {art.isSponsored && (
                          <span className="absolute top-2 right-2 bg-amber-500 text-slate-950 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono">
                            SPONSORED
                          </span>
                        )}
                      </div>

                      {/* Right metadata */}
                      <div className="flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] text-gray-400">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{art.sector}</span>
                            <span>{art.date}</span>
                          </div>
                          <h4 className="text-sm md:text-base font-bold text-gray-950 dark:text-white leading-snug">
                            {art.title}
                          </h4>
                          <p className="text-xs text-gray-655 dark:text-gray-350 line-clamp-2 leading-relaxed">
                            {art.excerpt}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs gap-3">
                          <div className="text-[10px] text-gray-500">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{art.author}</span>
                            <span className="mx-1">·</span>
                            <span>{art.company}</span>
                          </div>
                          <Link href="/eoi" className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-0.5">
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 space-y-3">
                  <span className="text-sm font-bold text-gray-500 block">No SME news is available right now.</span>
                  <p className="text-xs text-gray-400">Try clearing active filters or search terms.</p>
                  <button
                    onClick={() => {
                      setSmeSelectedIndustry("All");
                      setSmeSelectedContentType("All");
                      setSmeSelectedRegion("All");
                      setSmeSearchQuery("");
                    }}
                    className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* ── 10. SME SUCCESS STORIES ── */}
              <div className="space-y-4 pt-4">
                <SectionTitle title="SME Success Stories" />
                {SME_SUCCESS_STORIES.map((story, i) => (
                  <Card key={i} className="overflow-hidden flex flex-col md:flex-row group hover:border-emerald-500 transition-all">
                    <div className="md:w-2/5 h-40 bg-slate-900 relative">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[8px] font-bold px-2 py-0.5 rounded font-mono">
                        GROWTH JOURNAL
                      </span>
                    </div>
                    <div className="p-5 md:w-3/5 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="font-bold text-emerald-600">{story.sector}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-500">{story.region}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                          {story.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{story.excerpt}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-400 font-mono">{story.company}</span>
                        <Link href="/eoi" className="text-xs font-bold text-emerald-600 hover:underline">
                          Read Success Story →
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* ── 07. SME INSIGHTS & OPINIONS ── */}
              <div className="space-y-3 pt-4">
                <SectionTitle title="SME Insights & Opinions" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "What New Export Regulations Mean for Indian SMEs", author: "Rakesh Sharma", type: "EXPERT OPINION", excerpt: "An in-depth analysis of high-frequency compliance checkpoints for light-engineering clusters shipping overseas." },
                    { title: "Standardizing Ayush Botanical Classifications: MHRA Guidelines", author: "Prof. Sunita Reddy", type: "EDITORIAL ANALYSIS", excerpt: "Step-by-step documentation audit checklist for MSME fermentation labs targeting high-margin UK/EU buyers." }
                  ].map((op, idx) => (
                    <Card key={idx} className="p-4 space-y-3 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[8px] font-bold">
                          <span className="text-purple-600 bg-purple-50 dark:bg-purple-950/20 px-2 py-0.5 rounded">{op.type}</span>
                          <span className="text-gray-400">Verified</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{op.title}</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">{op.excerpt}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">By {op.author}</span>
                        <Link href="/eoi" className="text-emerald-600 font-bold hover:underline">Read Expert View →</Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT 4-COLUMN: SIDEBAR ADVISORY & TOOLS */}
            <div className="col-span-12 lg:col-span-4 space-y-6">

              {/* ── 11. SME MARKET PULSE ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    SME Market Pulse
                  </h4>
                  <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded font-bold">Live Data</span>
                </div>
                <div className="space-y-3">
                  {SME_MARKET_PULSE.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">{item.label}</span>
                        <span className="text-[11px] text-gray-600 dark:text-gray-300 leading-normal block mt-0.5">{item.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 06. SME EXPERT VOICES ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-emerald-600" />
                    SME Expert Voices
                  </h4>
                  <span className="text-[9px] text-gray-400 font-mono">Advisory Panel</span>
                </div>
                <div className="space-y-3.5">
                  {SME_EXPERT_VOICES.map((exp, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {exp.initial}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <h5 className="text-xs font-bold text-gray-950 dark:text-white truncate">{exp.name}</h5>
                            <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded">SME</span>
                          </div>
                          <span className="text-[9px] text-gray-400 block">{exp.role}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-relaxed font-normal">{exp.bio}</p>
                      <div className="pt-2 border-t border-gray-150/40 dark:border-gray-800 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-600 font-bold font-mono">{exp.rate}</span>
                        <Link href="/eoi" className="bg-emerald-600 text-white font-bold text-[8px] px-2.5 py-1 rounded-lg">
                          Book Advisory
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 12. SME RESEARCH & REPORTS ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-emerald-600" />
                    SME Research & Reports
                  </h4>
                  <span className="text-[9px] text-gray-400 font-mono">MSME Focus</span>
                </div>
                <div className="space-y-2">
                  {[
                    { title: "Q3 Sovereign AI Infrastructure & MSMEs Report", size: "2.4 MB PDF", isPremium: true },
                    { title: "Global Phytochemical Benchmark Guide", size: "1.8 MB PDF", isPremium: false },
                    { title: "Green Hydrogen LCOH MSME Tariff Tables", size: "3.1 MB PDF", isPremium: true }
                  ].map((rep, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-[11px] font-bold text-gray-900 dark:text-white truncate leading-snug">{rep.title}</h5>
                          {rep.isPremium && <span className="bg-purple-600 text-white text-[7px] font-bold px-1 rounded">PRO</span>}
                        </div>
                        <span className="text-[9px] text-gray-400">{rep.size}</span>
                      </div>
                      <Link href="/eoi" className="p-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-lg hover:bg-emerald-100">
                        <Download className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 14. ASK AN SME EXPERT ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4 text-emerald-600" />
                  Ask an SME Expert
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                  Ask experienced SME professionals about business, markets, technology, exports and growth.
                </p>

                <div className="space-y-2.5">
                  {smeAskedQuestions.map((q) => (
                    <div key={q.id} className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 text-[11px] space-y-1.5">
                      <p className="font-semibold text-gray-850 dark:text-gray-200 leading-snug">{q.question}</p>
                      <div className="flex items-center justify-between text-[10px]">
                        <button
                          onClick={() => handleVote(q.id)}
                          className={`font-bold hover:text-emerald-600 ${q.voted ? "text-emerald-600" : "text-gray-400"}`}
                        >
                          {q.voted ? "▲ Voted" : "▲ Vote"} ({q.votes})
                        </button>
                        <span className="text-gray-400">Verified Advisory</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <input
                    value={smeAskInput}
                    onChange={(e) => setSmeAskInput(e.target.value)}
                    placeholder="Ask Dr. Thorne a question..."
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleAddQuestion}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl shadow-xs transition-colors"
                  >
                    Submit Question
                  </button>
                </div>
              </div>

              {/* ── 16. SME OPPORTUNITIES ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="h-4 w-4 text-emerald-600" />
                    Opportunities for SMEs
                  </h4>
                  <span className="text-[9px] text-gray-400 font-mono">B2B Leads</span>
                </div>
                <div className="space-y-3">
                  {SME_OPPORTUNITIES.map((opp, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150/40 dark:border-gray-800 space-y-1">
                      <div className="flex justify-between items-center text-[8px] font-bold text-gray-400">
                        <span className="text-emerald-600">{opp.type}</span>
                        <span>Deadline: {opp.deadline}</span>
                      </div>
                      <h5 className="text-[11px] font-bold text-gray-900 dark:text-white leading-snug">{opp.title}</h5>
                      <span className="text-[9px] text-gray-400 block">{opp.agency}</span>
                      <Link href="/eoi" className="text-[10px] text-emerald-600 hover:underline font-bold block pt-1.5">
                        Apply / Explore Opportunity →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 17 & 18. PREMIUM SME INTELLIGENCE & AI PREVIEW ── */}
              <div className="p-5 bg-gradient-to-br from-slate-950 to-emerald-950 text-white rounded-3xl border border-emerald-900/60 shadow-md space-y-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 block font-mono">
                    AI-POWERED INSIGHTS
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    SME Intelligence Pro
                  </h4>
                </div>

                <div className="space-y-2.5 text-xs text-emerald-100 font-medium">
                  <div className="flex justify-between items-center py-1 border-b border-emerald-900/35">
                    <span className="flex items-center gap-1">🔒 AI Market Summary</span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-900/60 px-1 rounded">PRO</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-emerald-900/35">
                    <span className="flex items-center gap-1">🔒 Opportunity Signals</span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-900/60 px-1 rounded">PRO</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-emerald-900/35">
                    <span className="flex items-center gap-1">🔒 Risk Signals</span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-900/60 px-1 rounded">PRO</span>
                  </div>
                </div>

                <Link
                  href="/eoi"
                  className="block text-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  Unlock Pro Intelligence →
                </Link>
              </div>

              {/* ── 20. PUBLISH YOUR SME STORY ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="h-4 w-4 text-emerald-600" />
                  Publish Your SME Story
                </h4>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Share your company's expertise, achievements, insights, announcements and industry perspective with the iGEN business audience.
                </p>

                {smePublishSuccess ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl text-center">
                    ✓ Story submitted for editorial review!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      value={smePublishCompany}
                      onChange={(e) => setSmePublishCompany(e.target.value)}
                      placeholder="Company Name"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                    <input
                      value={smePublishTitle}
                      onChange={(e) => setSmePublishTitle(e.target.value)}
                      placeholder="Story Headline (e.g. Scaling Micro-Cap Exports)"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                    <button
                      onClick={() => {
                        if (smePublishCompany && smePublishTitle) setSmePublishSuccess(true);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl shadow-xs transition-colors"
                    >
                      Submit Story
                    </button>
                  </div>
                )}
              </div>

              {/* ── 21. SME NEWS ALERTS ── */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/40 rounded-3xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Bell className="h-4 w-4 text-emerald-600" />
                  SME News Alerts
                </h4>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  Notify me when new manufacturing or biotechnology SME stories are published.
                </p>
                <button
                  onClick={() => setSmeAlertActive(!smeAlertActive)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
                    smeAlertActive
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  {smeAlertActive ? "SME Alerts Active ✓" : "Enable Alerts"}
                </button>
              </div>

              {/* ── 22. SME NEWSLETTER BRIEFING ── */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  SME Intelligence Briefing
                </h4>
                <p className="text-[11px] text-gray-500">
                  Get the latest SME news, expert insights, research and business opportunities delivered to your inbox.
                </p>
                {smeIsSubscribed ? (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl text-center">
                    ✓ Subscribed successfully!
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      value={smeNewsletterEmail}
                      onChange={(e) => setSmeNewsletterEmail(e.target.value)}
                      placeholder="work@company.com"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-emerald-500"
                    />
                    <button
                      onClick={() => {
                        if (smeNewsletterEmail) setSmeIsSubscribed(true);
                      }}
                      className="w-full bg-emerald-650 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>
      </div>
    );
  }

  // VIEW 1b: NEWS — ASME News (mirrors SME News structure with ASME-specific data)
  if (view === "news" && expertType === "asme") {
    const filteredArticles = ASME_ARTICLES.filter((a) => {
      const industryMatch = asmeSelectedIndustry === "All" || a.sector === asmeSelectedIndustry;
      const typeMatch = asmeSelectedContentType === "All" || a.type === asmeSelectedContentType;
      return industryMatch && typeMatch;
    }).sort((a, b) => {
      if (asmeSortOption === "Latest") return 0;
      if (asmeSortOption === "Most Viewed") return parseInt(b.views.replace("K", "000").replace(".", "")) - parseInt(a.views.replace("K", "000").replace(".", ""));
      return 0;
    });

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />

        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
              <div className="max-w-3xl space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Emerging Subject Matter Experts & Analysts</span>
                </div>
                <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">ASME News & Editorial Briefings</h1>
                <p className="text-sm text-white/85 leading-relaxed">Discover emerging insights, research briefs, sector columns, and peer analysis written by Associate Subject Matter Experts (ASMEs) across 50+ global industries.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 min-w-0 lg:min-w-[520px]">
                {[
                  { label: "ASME Articles", value: `${ASME_ARTICLES.length} Published` },
                  { label: "Advisory Rate", value: "$75 – $120 / hr" },
                  { label: "Sectors Covered", value: "50 GoI Sectors" },
                  { label: "Content Type", value: "Briefs & Insights" }
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

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">

          {/* Filter Bar */}
          <Card className="p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-blue-500" placeholder="Search ASME articles, topics, author..." />
              </div>
              <select
                value={asmeSortOption}
                onChange={(e) => setAsmeSortOption(e.target.value)}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs font-bold outline-none text-gray-600 dark:text-gray-400"
              >
                {["Latest", "Most Viewed"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5" /> Filter
              </button>
            </div>
            {/* Content Type Chips */}
            <div className="flex flex-wrap gap-2">
              {ASME_CONTENT_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setAsmeSelectedContentType(t)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                    asmeSelectedContentType === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* Industry Chips */}
            <div className="flex flex-wrap gap-2">
              {ASME_INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setAsmeSelectedIndustry(ind)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                    asmeSelectedIndustry === ind
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-400"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </Card>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-8">

            {/* LEFT: Feed Column (8 cols) */}
            <div className="col-span-12 lg:col-span-8 space-y-6">

              {/* Featured Article */}
              <Card className="overflow-hidden">
                <div className="h-44 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-end relative">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
                  <div className="relative z-10 space-y-1">
                    <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-1 rounded uppercase">Featured ASME Briefing</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600">{ASME_ARTICLES[0].type}</span>
                    <span className="text-[9px] text-gray-400">{ASME_ARTICLES[0].sector}</span>
                    <span className="text-[9px] text-gray-400">· {ASME_ARTICLES[0].time}</span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-gray-950 dark:text-white">{ASME_ARTICLES[0].title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{ASME_ARTICLES[0].excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {ASME_ARTICLES[0].tags.map((tag) => (
                      <span key={tag} className="text-[9px] bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 font-bold px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-[9px]">
                        {ASME_ARTICLES[0].author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <span>By {ASME_ARTICLES[0].author}</span>
                      <span className="text-gray-400 font-normal">· {ASME_ARTICLES[0].sector}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[9px] text-gray-400"><Eye className="h-3 w-3" />{ASME_ARTICLES[0].views}</span>
                      <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-xs font-bold">Read Full Article</Link>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Article Feed */}
              <div className="space-y-3">
                <SectionTitle
                  title="Latest ASME News Feed"
                  action={
                    <span className="text-[10px] font-bold text-gray-400">{filteredArticles.length} articles</span>
                  }
                />
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">No articles match your current filters.</div>
                ) : (
                  filteredArticles.map((item, idx) => (
                    <Card key={idx} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold shrink-0 text-xs">
                          {item.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600">{item.type}</span>
                            <span className="text-[9px] text-gray-400">{item.sector}</span>
                            {item.premium && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 flex items-center gap-0.5"><Lock className="h-2.5 w-2.5" />Premium</span>}
                          </div>
                          <h3 className="text-sm font-bold text-gray-950 dark:text-white leading-snug hover:text-blue-600 cursor-pointer">{item.title}</h3>
                          <p className="text-[10px] text-gray-500 leading-relaxed">{item.excerpt}</p>
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {item.tags.map((tag) => (
                              <span key={tag} className="text-[8px] bg-gray-100 dark:bg-gray-900 text-gray-500 font-bold px-1.5 py-0.5 rounded">#{tag}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                            <span>{item.author} · {item.time}</span>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.views}</span>
                              <span className="flex items-center gap-1"><Bookmark className="h-3 w-3" />{item.saves}</span>
                              <span className="text-blue-600 font-bold">Rate: {item.rate}</span>
                              <Link href="/eoi" className="bg-blue-600 text-white font-bold text-[8px] px-2 py-0.5 rounded">Book Advisory</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT: Sidebar (4 cols) */}
            <div className="col-span-12 lg:col-span-4 space-y-5">

              {/* Trending Widget */}
              <Card className="p-4 space-y-3">
                <SectionTitle title="Trending ASME Content" action={<TrendingUp className="h-4 w-4 text-blue-500" />} />
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
                  {(["Most Read", "Most Saved"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAsmeActiveTrendingTab(tab)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        asmeActiveTrendingTab === tab
                          ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {ASME_TRENDING[asmeActiveTrendingTab].map((item) => (
                    <div key={item.rank} className="flex items-start gap-2.5 p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 h-5 w-5 rounded flex items-center justify-center shrink-0">#{item.rank}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-900 dark:text-white leading-snug">{item.title}</p>
                        <span className="text-[8px] text-gray-400">{item.author} · {item.sector}</span>
                      </div>
                      <span className="text-[8px] font-bold text-gray-400 shrink-0">{item.views}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Ask an ASME Expert */}
              <Card className="p-4 space-y-3">
                <SectionTitle title="Ask an ASME Expert" action={<MessageSquare className="h-4 w-4 text-indigo-500" />} />
                <div className="space-y-2">
                  {asmeQuestionVotes.map((q) => (
                    <div key={q.id} className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                      <p className="text-[10px] font-bold text-gray-800 dark:text-gray-200 leading-snug mb-1.5">{q.question}</p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setAsmeQuestionVotes((prev) =>
                            prev.map((item) =>
                              item.id === q.id && !item.voted
                                ? { ...item, votes: item.votes + 1, voted: true }
                                : item
                            )
                          )}
                          className={`flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded transition-all ${
                            q.voted
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                          }`}
                        >
                          <ThumbsUp className="h-2.5 w-2.5" /> {q.votes}
                        </button>
                        <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline">Answer →</Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={asmeNewQuestion}
                    onChange={(e) => setAsmeNewQuestion(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500"
                    placeholder="Ask your question..."
                  />
                  <button
                    onClick={() => {
                      if (!asmeNewQuestion.trim()) return;
                      setAsmeQuestionVotes((prev) => [
                        ...prev,
                        { id: prev.length + 1, question: asmeNewQuestion.trim(), votes: 1, voted: true }
                      ]);
                      setAsmeNewQuestion("");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-xs font-bold"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Card>

              {/* Research Reports */}
              <Card className="p-4 space-y-3">
                <SectionTitle title="ASME Research Reports" action={<Download className="h-4 w-4 text-blue-500" />} />
                {ASME_RESEARCH_REPORTS.map((rep, idx) => (
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

              {/* Newsletter */}
              <Card className="p-4 space-y-3">
                <SectionTitle title="ASME Digest Newsletter" />
                <p className="text-[10px] text-gray-500">Get weekly ASME briefings, emerging expert insights, and advisory rate updates directly in your inbox.</p>
                <input
                  value={asmeNewsletterEmail}
                  onChange={(e) => setAsmeNewsletterEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500"
                  placeholder="Enter work email"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-lg py-2 text-xs font-bold flex items-center justify-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Subscribe to ASME Digest
                </button>
                <p className="text-[9px] text-gray-400 text-center">Trusted by 18,000+ B2B professionals · Unsubscribe anytime</p>
              </Card>

            </div>
          </div>
        </section>
      </div>
    );
  }

  // VIEW 2: PAGES — ASME Discovery Hub (ASME) or Expert Directory (SME)
  if (view === "pages" && expertType === "asme") {
    return <ASMEPagesView />;
  }

  if (view === "pages" && expertType === "sme") {
    return <SMEPagesView />;
  }

  // VIEW 3: SECTOR — ASME Sector Discovery Hub (ASME) or SME Sector Directory (SME)
  if (view === "sector" && expertType === "asme") {
    return <ASMEBySectorView />;
  }

  if (view === "sector" && expertType === "sme") {
    return <SMEBySectorView />;
  }

  // VIEW 4: ALL SECTOR — ASME Master Industry & Sector Hub (ASME) or SME Master Directory (SME)
  if (expertType === "asme") {
    return <ASMEAllSectorView />;
  }

  if (expertType === "sme") {
    return <SMEAllSectorView />;
  }

  return null;
}

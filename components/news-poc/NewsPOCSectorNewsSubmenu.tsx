"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import NewsPOCSectorEngagementView from "./NewsPOCSectorEngagementView";
import NewsPOCSectorIntelligenceView from "./NewsPOCSectorIntelligenceView";
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
  Factory,
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
  ThumbsUp,
  HelpCircle,
  Layers,
  Check,
  TrendingDown
} from "lucide-react";

import NewsPOCAllIndustryView from "./NewsPOCAllIndustryView";
import NewsPOCFullDiscoveryView from "./NewsPOCFullDiscoveryView";

type Submenu = "all" | "engagement" | "intelligence" | "industry";

interface Props {
  submenu: Submenu;
  view?: string;
}

const SUBMENU_CONFIG: Record<Submenu, {
  label: string;
  sublabel: string;
  purpose: string;
  icon: ComponentType<{ className?: string }>;
  gradFrom: string;
  gradTo: string;
  badgeBg: string;
  button: string;
}> = {
  all: {
    label: "All Sector Directory",
    sublabel: "Master 50-Sector Industry Repository",
    purpose: "Browse all 50 sectors, 1,350+ industries, and ministry-aligned taxonomy.",
    icon: Factory,
    gradFrom: "from-blue-600",
    gradTo: "to-indigo-700",
    badgeBg: "bg-blue-600",
    button: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  engagement: {
    label: "Sector Engagement",
    sublabel: "Industry Community, Polls & Expert Q&A",
    purpose: "Engage with trade professionals, participate in polls, and ask verified SMEs.",
    icon: Users,
    gradFrom: "from-emerald-600",
    gradTo: "to-teal-700",
    badgeBg: "bg-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white"
  },
  intelligence: {
    label: "Sector Intelligence",
    sublabel: "Market Research Reports & AI Forecasts",
    purpose: "Purchase peer-reviewed sector whitepapers, view AI forecasts, and order custom research.",
    icon: Sparkles,
    gradFrom: "from-purple-600",
    gradTo: "to-indigo-700",
    badgeBg: "bg-purple-600",
    button: "bg-purple-600 hover:bg-purple-700 text-white"
  },
  industry: {
    label: "Industry Intelligence",
    sublabel: "1,350+ Detailed Sub-Industries Directory",
    purpose: "Explore granular sub-industry profiles, capacity audits, and supply chain telemetry.",
    icon: BarChart2,
    gradFrom: "from-amber-600",
    gradTo: "to-orange-700",
    badgeBg: "bg-amber-600",
    button: "bg-amber-600 hover:bg-amber-700 text-white"
  }
};

const SECTORS_ALL_50 = [
  { code: "S01", name: "Agriculture & Farmers Welfare", count: "28 Industries", news: "1,420 Articles", growth: "+14.2%", ministry: "Ministry of Agriculture", heat: "High" },
  { code: "S02", name: "AI & Cyber Security", count: "30 Industries", news: "2,840 Articles", growth: "+34.1%", ministry: "Ministry of Electronics & IT", heat: "Very High" },
  { code: "S03", name: "Animal Husbandry & Dairying", count: "28 Industries", news: "890 Articles", growth: "+11.8%", ministry: "Ministry of Fisheries & Dairying", heat: "Medium" },
  { code: "S04", name: "Atomic Energy", count: "27 Industries", news: "620 Articles", growth: "+9.5%", ministry: "Department of Atomic Energy", heat: "Medium" },
  { code: "S05", name: "Ayush & Herbal Medicine", count: "31 Industries", news: "1,150 Articles", growth: "+18.2%", ministry: "Ministry of Ayush", heat: "High" },
  { code: "S06", name: "Biotechnology", count: "30 Industries", news: "1,980 Articles", growth: "+22.5%", ministry: "Min of Science & Technology", heat: "Very High" },
  { code: "S07", name: "Chemicals & Fertilizers", count: "35 Industries", news: "1,340 Articles", growth: "+13.7%", ministry: "Min of Chemicals & Fertilizers", heat: "High" },
  { code: "S13", name: "Defence & Aerospace", count: "25 Industries", news: "2,100 Articles", growth: "+19.8%", ministry: "Ministry of Defence", heat: "Very High" },
  { code: "S16", name: "Electronics & IT", count: "35 Industries", news: "3,450 Articles", growth: "+28.7%", ministry: "Ministry of Electronics & IT", heat: "Very High" },
  { code: "S17", name: "Energy & Sustainability", count: "28 Industries", news: "2,760 Articles", growth: "+31.0%", ministry: "Min of Renewable Energy", heat: "Very High" },
  { code: "S23", name: "Health & Family Welfare", count: "25 Industries", news: "2,240 Articles", growth: "+18.4%", ministry: "Ministry of Health", heat: "High" },
  { code: "S42", name: "FinTech & Digital Payments", count: "26 Industries", news: "3,120 Articles", growth: "+26.9%", ministry: "Reserve Bank of India", heat: "Very High" },
  { code: "S43", name: "Logistics & Supply Chain", count: "26 Industries", news: "1,890 Articles", growth: "+16.5%", ministry: "Ministry of Commerce", heat: "High" },
  { code: "S45", name: "Automotive & Electric Vehicles", count: "26 Industries", news: "2,410 Articles", growth: "+24.3%", ministry: "Min of Heavy Industries", heat: "Very High" },
  { code: "S46", name: "Semiconductors", count: "26 Industries", news: "3,890 Articles", growth: "+38.2%", ministry: "Ministry of Electronics & IT", heat: "Very High" },
  { code: "S47", name: "Startups & Innovation", count: "26 Industries", news: "2,650 Articles", growth: "+21.4%", ministry: "DPIIT", heat: "Very High" }
];

const COMMUNITY_POSTS = [
  { id: "cp-1", author: "Rajesh Sharma", role: "Logistics Operations Lead", company: "AeroFreight Logistics", time: "25m ago", title: "How is your team handling Red Sea freight tariff fluctuations?", content: "Maritime freight rates on Indo-European lanes have seen a 14% spike over the last fortnight. Are exporters shifting to air freight or IMEC rail multimodal corridors?", likes: 42, comments: 18, sector: "Logistics (S43)" },
  { id: "cp-2", author: "Dr. Ananya Varma", role: "Biotech Policy Analyst", company: "BioVisions India", time: "1h ago", title: "New GoI Phytochemical Export Benchmarks — Key Takeaways", content: "The Ministry of Commerce has unified extraction purity benchmarks for herbal exports to EU ports. Here is a breakdown of compliance requirements.", likes: 89, comments: 27, sector: "Biotechnology (S06)" },
  { id: "cp-3", author: "Karan Patel", role: "Clean Energy Strategist", company: "SunGrid Solutions", time: "2h ago", title: "SIGHT Phase-2 Green Hydrogen Tariff Arbitrage Discussion", content: "Comparing levelized cost of hydrogen (LCOH) across Gujarat ports vs Middle East bunkering hubs. Thoughts on long-term off-take agreements?", likes: 64, comments: 14, sector: "Energy (S17)" }
];

const COMMUNITY_POLLS = [
  { id: "poll-1", question: "Which sector will see the highest FDI inflow growth in H2 2026?", totalVotes: 1240, options: [{ label: "Semiconductors (S46)", pct: 45 }, { label: "Renewable Energy (S17)", pct: 32 }, { label: "AI & Cyber (S02)", pct: 15 }, { label: "Biotechnology (S06)", pct: 8 }] },
  { id: "poll-2", question: "Is your organization planning to deploy sovereign LLM infrastructure this year?", totalVotes: 890, options: [{ label: "Yes, currently in pilot", pct: 52 }, { label: "Evaluating vendors", pct: 28 }, { label: "No immediate plans", pct: 20 }] }
];

const EXPERT_QA = [
  { expert: "Dr. Aris Thorne", role: "AI & Cyber SME", q: "What is the optimal latency threshold for sovereign enterprise LLMs?", answer: "Sub-50ms latency is achievable by running quantized 8-bit model weights on local edge nodes with direct tensor acceleration.", upvotes: 154 },
  { expert: "Meera Deshmukh", role: "Trade Compliance SME", q: "How do IMEC corridors alter customs documentation clearance times?", answer: "Digitized blockchain manifests reduce container holding times at Mundra Port by an average of 48 hours.", upvotes: 128 }
];

const INTELLIGENCE_REPORTS_STORE = [
  { id: "rep-1", title: "2026 Sovereign AI Infrastructure & Enterprise Datacenter Report", code: "REP-AI-02", price: "$299", category: "AI & Cyber Security", pages: "96 pages", date: "Updated July 2026", rating: "4.9 ★", downloads: 1420 },
  { id: "rep-2", title: "Global Semiconductor OSAT Substrate Supply & Capex Analysis", code: "REP-SEM-46", price: "$249", category: "Semiconductors", pages: "84 pages", date: "Updated June 2026", rating: "4.9 ★", downloads: 1890 },
  { id: "rep-3", title: "India Green Hydrogen Maritime Export Corridors & LCOH Outlook", code: "REP-ENG-17", price: "$199", category: "Energy & Sustainability", pages: "62 pages", date: "Updated July 2026", rating: "4.8 ★", downloads: 1150 },
  { id: "rep-4", title: "Precision Agritech Drone Sprayer Global Export & Tariff Playbook", code: "REP-AGR-01", price: "$149", category: "Agriculture", pages: "50 pages", date: "Updated May 2026", rating: "4.7 ★", downloads: 860 }
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

export default function NewsPOCSectorNewsSubmenu({ submenu, view }: Props) {
  const router = useRouter();
  const cfg = SUBMENU_CONFIG[submenu];
  const IconComp = cfg.icon;
  const basePath = "/en/news-poc/sector-news";

  const [votedPolls, setVotedPolls] = useState<Record<string, number>>({});
  const [sectorSearch, setSectorSearch] = useState("");
  const [sectorRegion, setSectorRegion] = useState("All Regions");

  const handleVote = (pollId: string, optionIdx: number) => {
    setVotedPolls((prev) => ({ ...prev, [pollId]: optionIdx }));
  };

  const SubMenuHeader = () => (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="flex items-center gap-2 py-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => router.push(basePath)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all mr-1"
          aria-label="Go back to Sector News main page"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className={`bg-gradient-to-r ${cfg.gradFrom} ${cfg.gradTo} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-xs`}>
          <IconComp className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold">{cfg.label}</span>
        </div>

        <div className="flex gap-1 flex-wrap">
          {(["all", "engagement", "intelligence", "industry"] as Submenu[]).map((s) => (
            <button
              key={s}
              onClick={() => router.push(`${basePath}/${s}`)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                submenu === s
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {SUBMENU_CONFIG[s].label}
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
                <IconComp className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{cfg.sublabel}</span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-white/85 leading-relaxed font-normal">{description}</p>
          </div>
          
          <div className="flex gap-2">
            <Link href="/eoi" className="bg-white text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all">
              Explore Datasets
            </Link>
            <Link href="/eoi" className="bg-white/15 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-white/25 transition-all">
              Request Advisory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  // VIEW 1: ALL SECTOR (Full News Discovery Hub & Master Directory)
  if (submenu === "all") {
    const filteredSectors = SECTORS_ALL_50.filter(sec => {
      const query = sectorSearch.toLowerCase();
      const matchesSearch = sec.name.toLowerCase().includes(query) || 
                            sec.code.toLowerCase().includes(query) ||
                            sec.ministry.toLowerCase().includes(query);
      return matchesSearch;
    });

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <NewsPOCFullDiscoveryView
          initialCategory="All"
          onBack={() => router.push(basePath)}
          contextTitle="All Sector Master Directory & Intelligence Feed"
          contextSubtitle="Master repository of all 50 sectors, 1,350+ industries, and GoI ministry taxonomy."
          breadcrumbSource={[
            { label: "Sector News", href: "/en/news-poc/sector-news" }
          ]}
        />

        {/* Master 50-Sector Directory Section */}
        <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6 space-y-8 border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Master 50-Sector Directory
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Explore the comprehensive list of sectors, industry count, and ministry alignment.</p>
              </div>
              <span className="text-xs font-bold text-gray-400 font-mono">
                {filteredSectors.length} Sectors Found
              </span>
            </div>

            {/* Search & Quick Filter */}
            <Card className="p-4 flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input 
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-blue-500" 
                  placeholder="Search 50 sectors, codes, or ministry alignment..." 
                  value={sectorSearch}
                  onChange={(e) => setSectorSearch(e.target.value)}
                />
              </div>
              {["All Regions", "Domestic", "India-US Bilateral", "India-EU Corridors", "ASEAN"].map((r) => (
                <button 
                  key={r} 
                  onClick={() => setSectorRegion(r)}
                  className={`rounded-lg border px-3 py-2 text-[10px] font-bold transition-all ${
                    sectorRegion === r
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </Card>

            {/* Sectors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredSectors.map((sec) => (
                <Card key={sec.code} className="p-4 hover:border-blue-500 transition-all space-y-2 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gray-400 font-bold">{sec.code}</span>
                    <span className="text-[9px] font-bold text-emerald-500">{sec.growth} YoY</span>
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">{sec.name}</h3>
                  <p className="text-[10px] text-gray-500">{sec.ministry}</p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[9px]">
                    <span className="text-gray-400">{sec.count}</span>
                    <span className="text-blue-600 font-bold">{sec.news}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // VIEW 2: ENGAGEMENT (Sector Engagement & Community)
  if (submenu === "engagement") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <NewsPOCSectorEngagementView />
        </div>
      </div>
    );
  }

  // VIEW 4: INDUSTRY (1,350+ Industries)
  if (submenu === "industry") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <NewsPOCAllIndustryView />
        </div>
      </div>
    );
  }

  // VIEW 3: INTELLIGENCE (Sector Intelligence Reports & AI)
  if (submenu === "intelligence") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <NewsPOCSectorIntelligenceView view={view} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
      <SubMenuHeader />
      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <NewsPOCSectorIntelligenceView view={view} />
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RegisteredLeaderNewsView from "./RegisteredLeaderNewsView";
import RegisteredLeaderPagesView from "./RegisteredLeaderPagesView";
import RegisteredLeaderBySectorView from "./RegisteredLeaderBySectorView";
import RegisteredLeaderAllSectorsView from "./RegisteredLeaderAllSectorsView";
import VerifiedLeaderNewsView from "./VerifiedLeaderNewsView";
import VerifiedLeaderPagesView from "./VerifiedLeaderPagesView";
import TopLeaderNewsView from "./TopLeaderNewsView";
import TopLeaderPagesView from "./TopLeaderPagesView";
import NewsPOCLeaderIntelligenceView from "./NewsPOCLeaderIntelligenceView";
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
  Zap
} from "lucide-react";

type Tier = "registered" | "verified" | "top" | "intelligence";
type View = "news" | "pages" | "sector" | "all" | "signals" | "influence" | "briefs";
type IconType = ComponentType<{ className?: string }>;

interface Props {
  tier: Tier;
  view: View;
}

const TIER_CONFIG: Record<Tier, {
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
}> = {
  registered: {
    label: "Registered",
    sublabel: "Free Leaders",
    purpose: "Basic discovery, limited news, standard search rank",
    icon: User,
    gradFrom: "from-blue-600",
    gradTo: "to-indigo-700",
    badgeBg: "bg-blue-600",
    textAccent: "text-blue-600",
    softBg: "bg-blue-50 dark:bg-blue-950/20",
    softBorder: "border-blue-200 dark:border-blue-900",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    badgeLabel: "Registered",
    newsLimit: "5 news reads/month",
    searchRank: "Standard rank",
    analytics: "Locked",
    leadGen: "Basic inquiry"
  },
  verified: {
    label: "Verified",
    sublabel: "Pro Leaders",
    purpose: "Premium visibility, AI summaries, basic analytics",
    icon: CheckCircle,
    gradFrom: "from-emerald-500",
    gradTo: "to-teal-600",
    badgeBg: "bg-emerald-600",
    textAccent: "text-emerald-600",
    softBg: "bg-emerald-50 dark:bg-emerald-950/20",
    softBorder: "border-emerald-200 dark:border-emerald-900",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    badgeLabel: "Verified Leader",
    newsLimit: "Unlimited news",
    searchRank: "Featured placement",
    analytics: "Basic analytics",
    leadGen: "Advanced lead gen"
  },
  top: {
    label: "Enterprise",
    sublabel: "Top Leaders",
    purpose: "Executive intelligence, sponsored slots, CRM workflows",
    icon: Crown,
    gradFrom: "from-amber-500",
    gradTo: "to-orange-600",
    badgeBg: "bg-gradient-to-r from-amber-500 to-orange-600",
    textAccent: "text-amber-600",
    softBg: "bg-amber-50 dark:bg-amber-950/20",
    softBorder: "border-amber-200 dark:border-amber-900",
    button: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950",
    badgeLabel: "Crown Enterprise",
    newsLimit: "Unlimited + sponsored",
    searchRank: "Homepage priority",
    analytics: "Advanced + CRM",
    leadGen: "CRM integrated"
  },
  intelligence: {
    label: "Leader Intelligence",
    sublabel: "C-Suite Strategic Moves & Predictive Signals",
    purpose: "Track market-moving executive statements, AI leadership influence ratings, and bilateral CEO board decisions.",
    icon: Sparkles,
    gradFrom: "from-purple-600",
    gradTo: "to-indigo-800",
    badgeBg: "bg-purple-600",
    textAccent: "text-purple-600",
    softBg: "bg-purple-50 dark:bg-purple-950/20",
    softBorder: "border-purple-200 dark:border-purple-900",
    button: "bg-purple-600 hover:bg-purple-700 text-white",
    badgeLabel: "Leader Intelligence",
    newsLimit: "Full C-Suite access",
    searchRank: "C-Suite Signal Radar",
    analytics: "Predictive V4 AI models",
    leadGen: "Board Advisory Inquiry"
  }
};

const VIEW_LABELS: Record<string, string> = {
  news: "News",
  pages: "Pages",
  sector: "By Sector",
  all: "All Sectors",
  signals: "Signals",
  influence: "Influence",
  briefs: "Briefs"
};

const LEADERS: Record<Tier, {
  name: string;
  role: string;
  company: string;
  sector: string;
  country: string;
  photo: string;
  initials: string;
  influence: string;
  followers: string;
  about: string;
  achievements: string[];
  coverage: string[];
  interviews: string[];
}> = {
  registered: {
    name: "Aarav Menon",
    role: "Founder and Managing Director",
    company: "GreenArc Mobility",
    sector: "Automotive and EV",
    country: "India",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=320&auto=format&fit=crop&q=70",
    initials: "AM",
    influence: "72.4",
    followers: "4.8K",
    about: "Registered leader profile with basic biography, company context, latest leadership news, and discovery visibility across iGEN Leader News.",
    achievements: ["Built a 60-city EV service network", "Raised seed capital for clean mobility", "Recognized in regional founder lists"],
    coverage: ["Local business profile", "EV charging milestone mention", "Startup award nomination"],
    interviews: ["Founder Q&A preview", "Clean mobility short clip"]
  },
  verified: {
    name: "Kiran Mazumdar-Shaw",
    role: "Executive Chairperson",
    company: "Biocon",
    sector: "Healthcare and Biotechnology",
    country: "India",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=320&auto=format&fit=crop&q=70",
    initials: "KM",
    influence: "95.1",
    followers: "98K",
    about: "Verified leadership page with premium trust signals, AI insights, downloadable profile assets, editorial coverage, and advanced business inquiry actions.",
    achievements: ["Built a global biopharma platform", "Advanced biosimilar innovation", "Featured in global leadership rankings"],
    coverage: ["Verified editorial success story", "Leadership achievement article", "Healthcare innovation profile"],
    interviews: ["Executive interview booking", "SME-led industry conversation"]
  },
  top: {
    name: "Satya Nadella",
    role: "Chairman and CEO",
    company: "Microsoft",
    sector: "Technology and AI",
    country: "Global",
    photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=320&auto=format&fit=crop&q=70",
    initials: "SN",
    influence: "97.5",
    followers: "185K",
    about: "Enterprise executive intelligence profile with board network, investment signals, advanced analytics, API access, and priority leadership visibility.",
    achievements: ["Scaled AI-first enterprise strategy", "Expanded global cloud leadership", "Led high-impact executive transformation"],
    coverage: ["Sponsored leadership story", "Board strategy report", "Global executive news feature"],
    interviews: ["Executive roundtable", "Enterprise media interview"]
  },
  intelligence: {
    name: "N. Chandrasekaran",
    role: "Chairman",
    company: "Tata Sons",
    sector: "Conglomerate & Tech",
    country: "India & Global",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&auto=format&fit=crop&q=70",
    initials: "NC",
    influence: "98.2",
    followers: "240K",
    about: "Executive leadership intelligence profile with real-time C-suite statement tracking, predictive FDI signals, and bilateral AI alliance benchmarks.",
    achievements: ["Spearheaded $14B Tata-NVIDIA Sovereign AI supercluster", "Led greenfield semiconductor fab in Gujarat", "Accelerated global EV supply chain reshoring"],
    coverage: ["Sovereign AI Infrastructure Keynote", "Bilateral Trade Accord Statement", "Semiconductor Fab Expansion Report"],
    interviews: ["Global C-Suite Policy Dialogue", "CEO Strategy Roundtable"]
  }
};

const NEWS_ITEMS = [
  { title: "Global CEO panel maps AI governance priorities for boardrooms", leader: "Satya Nadella", sector: "Technology", type: "Board Strategy", time: "38 min ago", views: "18.4K", premium: false },
  { title: "Biotech founder outlines next wave of affordable healthcare innovation", leader: "Kiran Mazumdar-Shaw", sector: "Healthcare", type: "Interview", time: "2 hrs ago", views: "8.9K", premium: false },
  { title: "Executive appointment tracker flags 42 C-suite movements this week", leader: "iGEN Desk", sector: "Corporate", type: "Appointments", time: "4 hrs ago", views: "6.2K", premium: true },
  { title: "Leadership sentiment shifts positive across clean energy companies", leader: "AI Intelligence", sector: "Energy", type: "AI Summary", time: "6 hrs ago", views: "5.7K", premium: true },
  { title: "Founder visibility report: emerging leaders gaining investor attention", leader: "SME Editorial", sector: "Startups", type: "Premium Report", time: "1 day ago", views: "4.1K", premium: true }
];

const TRENDING_ITEMS = [
  { title: "Cross-border battery JV signed by automotive leadership panel", score: "98%", category: "JV & Deals" },
  { title: "AI infrastructure mandate approved by leading IT enterprise council", score: "95%", category: "Policy & AI" },
  { title: "Pharma export corridor expanded with new bilateral healthcare pact", score: "92%", category: "Trade" }
];

const SECTOR_LEADER_CARDS = [
  { name: "Sunil Varma", role: "MD, AeroGrid Dynamics", sector: "Defence and Aerospace", score: "91.8", signal: "Capex expansion" },
  { name: "Pooja Hegde", role: "CEO, NexaVolt Energy", sector: "Renewable Energy", score: "93.4", signal: "Green hydrogen lead" },
  { name: "Devendra Rao", role: "Founder, AgriSmart India", sector: "Agriculture and Food", score: "88.7", signal: "Precision drone rollout" }
];

const DIRECTORY_ROWS = [
  { sector: "AI & Cyber Security", leaders: "184 Leaders", verified: "42 Pro", top: "12 Top", country: "Global", heat: "Very High" },
  { sector: "Automotive & EV", leaders: "210 Leaders", verified: "56 Pro", top: "18 Top", country: "India & SEA", heat: "High" },
  { sector: "Healthcare & Biotech", leaders: "165 Leaders", verified: "38 Pro", top: "14 Top", country: "India, US, EU", heat: "High" },
  { sector: "Energy & Sustainability", leaders: "195 Leaders", verified: "49 Pro", top: "16 Top", country: "Global", heat: "Very High" },
  { sector: "FinTech & Payments", leaders: "230 Leaders", verified: "62 Pro", top: "20 Top", country: "India & ME", heat: "High" }
];

const AI_LEADERSHIP_PREVIEWS: Record<string, { summary: string; focus: string; priorities: string; developments: string; outlook: string }> = {
  "Jensen Huang": {
    summary: "Recent activity outlines an aggressive strategy to establish sovereign cloud and compute networks globally, bypassing conventional centralized datacentres.",
    focus: "Sovereign compute, customized GPU architecture, regional fab integrations.",
    priorities: "Acquiring strategic land and energy pipelines, signing regional fabricator commitments.",
    developments: "Signed hardware allocation pacts with major Western and South Asian regional providers.",
    outlook: "Expect Nvidia to secure local market shares through bespoke national infrastructure deployments."
  },
  "Nandan Nilekani": {
    summary: "Advocating for unified open-source standards to allow digital public infrastructure (DPI) to compete against monopolistic corporate models.",
    focus: "Open-source AI rails, digital identity standardization, national computing nodes.",
    priorities: "Consolidating dataset consensus standards across government and business stakeholders.",
    developments: "Presented strategic blueprints at global forums for national tech interoperability.",
    outlook: "Likely to shape regional digital compliance and public database sharing models."
  },
  "Shaktikanta Das": {
    summary: "Focusing heavily on bilateral UPI corridors and central bank digital currencies (CBDC) to optimize treasury flows and direct trade settlements.",
    focus: "Direct currency clearing networks, UPI SAARC terminals, sovereign debt settlement.",
    priorities: "Minimizing US Dollar conversion dependencies for South Asian imports.",
    developments: "Established pilot clearing lines for bilateral energy trade with regional suppliers.",
    outlook: "UPI is projected to displace legacy SWIFT routes for 40% of neighboring trade transactions by 2028."
  }
};

const LEADER_INTELLIGENCE_KPIS = [
  { label: "Top Strategic Alliance", val: "Tata-NVIDIA $14B", sub: "100k GPU Sovereign Supercluster", color: "text-amber-500", icon: Crown },
  { label: "Tracked C-Suite Leaders", val: "1,840 Figures", sub: "CEOs, Ministers & Board Chairs", color: "text-purple-600", icon: Users },
  { label: "Executive Forward Sentiment", val: "+28.4% Net Pos", sub: "Q3 Capex & Reshoring Guidance", color: "text-emerald-500", icon: TrendingUp },
  { label: "Strategic Alerts Active", val: "14 C-Suite Alerts", sub: "Cross-Border M&A & Board Moves", color: "text-blue-500", icon: Bell }
];

const EXECUTIVE_STATEMENTS_DATA = [
  {
    name: "N. Chandrasekaran",
    role: "Chairman, Tata Sons",
    company: "Tata Group",
    badge: "Sovereign AI Signal",
    quote: "Building indigenous AI computing infrastructure and semiconductor fabrication in India is not merely an enterprise opportunity; it is foundational to our sovereign technological resilience over the next three decades.",
    context: "India Global AI Summit Keynote",
    date: "4 hours ago",
    score: "98 Influence",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
  },
  {
    name: "Jensen Huang",
    role: "Founder & CEO, NVIDIA",
    company: "NVIDIA Corp",
    badge: "Global Tech Signal",
    quote: "India has the data, the scale of computer scientists, and the manufacturing momentum. There is no doubt India will produce its own sovereign AI models powering global enterprise supply chains.",
    context: "Bilateral Technology Partnership Forum",
    date: "8 hours ago",
    score: "97 Influence",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
  },
  {
    name: "Jonathan Reynolds",
    role: "UK Secretary of State for Business & Trade",
    company: "Department for Business & Trade, UK",
    badge: "Policy Statement",
    quote: "India's emergence as an advanced manufacturing and renewable energy export hub represents the defining bilateral partnership opportunity for British industry over the next decade.",
    context: "UK-India Trade Agreement Round 14",
    date: "14 hours ago",
    score: "95 Influence",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
  },
  {
    name: "Elena Rostova",
    role: "Global Head of Supply Chain, Pacific Logistics Group",
    company: "Pacific Logistics",
    badge: "Logistics Signal",
    quote: "We are reallocating 30% of our multimodal corridor budget into the India-Middle East-Europe Economic Corridor (IMEC), routing directly through Mundra and Jebel Ali.",
    context: "Global Maritime & Port Summit",
    date: "1 day ago",
    score: "92 Influence",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
  }
];

const PREDICTIVE_LEADER_SIGNALS = [
  {
    name: "C-Suite Semiconductor Capex Commitment",
    sig: "SIGNAL: HIGH CONVICTION (94%)",
    desc: "Over 40 Tier-1 semiconductor and OSAT CEOs have greenlit secondary facility budgets in Dholera and Sanand for Q4 2026 groundbreakings.",
    w: "94%",
    color: "bg-purple-600"
  },
  {
    name: "Cross-Border Sovereign Wealth Direct Co-Investment",
    sig: "SIGNAL: ACCELERATING (89%)",
    desc: "Gulf and Singaporean sovereign wealth funds shifting direct equity allocations toward Indian renewable energy port terminals.",
    w: "89%",
    color: "bg-emerald-500"
  },
  {
    name: "Executive Multimodal Corridor Routing Pivots",
    sig: "SIGNAL: STRATEGIC SHIFT (84%)",
    desc: "Fortune 500 logistics leaders routing high-value container volumes via IMEC and INSTC corridors ahead of carbon tax deadlines.",
    w: "84%",
    color: "bg-amber-500"
  }
];

const LEADER_INFLUENCE_SCORECARDS = [
  { name: "N. Chandrasekaran", title: "Chairman, Tata Sons", sector: "Conglomerate & Tech", score: 98, trend: "▲ +4", signal: "Sovereign AI Lead", badge: "Global Tier-1" },
  { name: "Jensen Huang", title: "CEO, NVIDIA", sector: "AI & Semiconductors", score: 97, trend: "▲ +6", signal: "Enterprise GPU Clusters", badge: "Global Titan" },
  { name: "Mukesh Ambani", title: "Chairman, Reliance Industries", sector: "Energy & Telecom", score: 96, trend: "▲ +2", signal: "Green Hydrogen Hub", badge: "Global Tier-1" },
  { name: "Dr. Lisa Su", title: "CEO, AMD", sector: "Semiconductors", score: 94, trend: "▲ +5", signal: "R&D Campus Scaling", badge: "Tech Leader" },
  { name: "Sheikh Tahnoon bin Zayed", title: "Chairman, ADQ / G42", sector: "Sovereign Capital & AI", score: 95, trend: "▲ +3", signal: "Indo-Gulf Capital Axis", badge: "Capital Leader" }
];

const LEADER_RESEARCH_BRIEFS = [
  { id: "lead-rep-1", title: "2026 Global C-Suite Outlook: Supply Chain Reshoring to India & Southeast Asia", code: "BRIEF-CEO-01", price: "$299", pages: "92 pages", rating: "4.9 ★", downloads: 1820 },
  { id: "lead-rep-2", title: "Bilateral Trade Ministers Strategy Brief: IMEC Multimodal Transit Accords", code: "BRIEF-POL-04", price: "$249", pages: "78 pages", rating: "4.9 ★", downloads: 1450 },
  { id: "lead-rep-3", title: "Sovereign AI Compute Infrastructure: C-Suite Implementation Playbook", code: "BRIEF-AI-12", price: "$199", pages: "64 pages", rating: "4.8 ★", downloads: 1210 },
  { id: "lead-rep-4", title: "Cross-Border Tariff Risk & Boardroom Governance Playbook", code: "BRIEF-GOV-08", price: "$149", pages: "54 pages", rating: "4.7 ★", downloads: 890 }
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

export default function NewsPOCLeaderNewsSubmenu({ tier, view }: Props) {
  const router = useRouter();
  const tc = TIER_CONFIG[tier];
  const TierIcon = tc.icon;
  const leader = LEADERS[tier];
  const tierPath = "/en/news-poc/leader-news";
  const [aiPreviewLeader, setAiPreviewLeader] = useState("Jensen Huang");

  const SubMenuTabs = () => (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="flex items-center gap-2 py-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => router.push(tierPath)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-300 transition-all mr-1"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className={`bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-xs`}>
          <TierIcon className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold">{tc.label}</span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {(["registered", "verified", "top", "intelligence"] as Tier[]).map((item) => (
            <button
              key={item}
              onClick={() => router.push(item === "intelligence" ? `${tierPath}/intelligence` : `${tierPath}/${item}/news`)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                tier === item
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-purple-600"
              }`}
            >
              {TIER_CONFIG[item].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const UpgradeCTA = ({ compact = false }: { compact?: boolean }) => {
    if (tier === "top" || tier === "intelligence") return null;
    const nextTier: Tier = tier === "registered" ? "verified" : "top";
    const nextConfig = TIER_CONFIG[nextTier];

    return (
      <div className={`${compact ? "p-4 rounded-xl" : "p-6 rounded-2xl"} bg-gradient-to-br from-slate-950 to-[#26124d] text-white border border-purple-900/60 space-y-3`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${nextConfig.textAccent}`}>Revenue Upgrade</span>
            <h3 className={`${compact ? "text-xs" : "text-base"} font-bold mt-1`}>
              {tier === "registered" ? "Get verified for trust, unlimited news, and lead generation" : "Go Enterprise for sponsored stories, CRM, and priority ranking"}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 font-normal">
              Convert leadership visibility into editorial coverage, inquiries, reports, awards, and executive interview bookings.
            </p>
          </div>
          <Lock className="h-5 w-5 text-purple-300 shrink-0" />
        </div>
        <Link href="/eoi" className={`${nextConfig.button} inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all`}>
          <Sparkles className="h-3.5 w-3.5" />
          Upgrade to {nextConfig.label}
        </Link>
      </div>
    );
  };

  const TierHero = ({ title, description }: { title: string; description: string }) => (
    <section className={`bg-gradient-to-br ${tc.gradFrom} ${tc.gradTo} text-white relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <TierIcon className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{tc.sublabel}</span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-white/85 leading-relaxed font-normal">{description}</p>
          </div>
          
          <div className="flex gap-2">
            <Link href="/eoi" className="bg-white text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all">
              Claim Profile
            </Link>
            <Link href="/eoi" className="bg-white/15 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-white/25 transition-all">
              Executive Advisory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  // VIEW: LEADER INTELLIGENCE (C-Suite Strategic Moves & Predictive Signals)
  if (tier === "intelligence") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
        <SubMenuTabs />
        <NewsPOCLeaderIntelligenceView />
      </div>
    );
  }

  // VIEW 1: NEWS
  if (view === "news") {
    if (tier === "registered") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <RegisteredLeaderNewsView />
        </div>
      );
    }

    if (tier === "verified") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <VerifiedLeaderNewsView />
        </div>
      );
    }

    if (tier === "top") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <TopLeaderNewsView />
        </div>
      );
    }

    const visibleNews = NEWS_ITEMS;

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />
        <TierHero
          title="Leader News Intelligence"
          description="Search executive updates, track appointments, follow trending leadership narratives, and convert premium visibility into reports, PR coverage, and interview demand."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <Card className="p-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-purple-500" placeholder="Search leaders, companies, appointments..." />
            </div>
            {["All News", "Appointments", "Interviews", "Awards", "M&A", "Board Changes"].map((filter) => (
              <button key={filter} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 px-3 py-2 text-[10px] font-bold text-gray-600 dark:text-gray-400 hover:text-purple-600">
                {filter}
              </button>
            ))}
            <button className={`${tc.button} rounded-lg px-4 py-2 text-xs font-bold flex items-center gap-1.5`}>
              <Filter className="h-3.5 w-3.5" /> Apply
            </button>
          </Card>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <Card className="overflow-hidden">
                <div className={`h-44 bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} p-6 flex items-end`}>
                  <div>
                    <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-1 rounded uppercase">Featured News</span>
                    {tier === "top" && <span className="ml-2 bg-amber-300 text-gray-950 text-[8px] font-bold px-2 py-1 rounded">SPONSORED</span>}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h2 className="font-display text-lg font-bold text-gray-950 dark:text-white">Executive leadership shifts accelerate across AI, biotech, and clean energy boards</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                    iGEN tracks appointments, strategy statements, verified editorial coverage, and predictive executive movement signals for leadership-focused decisions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/en/news-poc/article/lea-1" className={`${tc.button} rounded-lg px-4 py-2 text-xs font-bold`}>Read Full Brief</Link>
                    <button className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                      <Bookmark className="h-3.5 w-3.5" /> Save
                    </button>
                    <button className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                      <Share2 className="h-3.5 w-3.5" /> Share
                    </button>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                <SectionTitle title="Latest Executive Updates" />
                {visibleNews.map((item, idx) => (
                  <Card key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-purple-400 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950 px-1.5 py-0.5 rounded">
                          {item.type}
                        </span>
                        <span className="text-[10px] text-gray-400">{item.time}</span>
                      </div>
                      <h3 className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-[11px] text-gray-500">Executive: <span className="font-semibold text-gray-700 dark:text-gray-300">{item.leader}</span> · Sector: {item.sector}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href="/en/news-poc/article/lea-1" className="text-[10px] font-bold text-purple-600 hover:underline">Read →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-6">
              <UpgradeCTA />
              <Card className="p-5 space-y-3">
                <SectionTitle title="Trending Executive Topics" />
                {TRENDING_ITEMS.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <span className="text-[8px] font-bold text-purple-600 uppercase">{item.category}</span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <span className="text-[9px] text-emerald-500 font-bold">{item.score} positive sentiment</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // VIEW 2: PAGES
  if (view === "pages") {
    if (tier === "registered") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <RegisteredLeaderPagesView />
        </div>
      );
    }

    if (tier === "top") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuTabs />
          <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <TopLeaderPagesView />
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />
        <TierHero
          title={`${tc.label} Leader Pages Profile`}
          description={leader.about}
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <Card className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row items-start gap-6 border-b border-gray-100 dark:border-gray-800 pb-6">
              <img src={leader.photo} alt={leader.name} className="h-24 w-24 rounded-2xl object-cover border-2 border-purple-300" />
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-950 dark:text-white">{leader.name}</h2>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded text-white ${tc.badgeBg}`}>{tc.badgeLabel}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">{leader.role} at <span className="font-bold">{leader.company}</span></p>
                <div className="flex items-center gap-4 text-[10px] text-gray-400 pt-2">
                  <span>Sector: {leader.sector}</span>
                  <span>Geography: {leader.country}</span>
                  <span className="text-emerald-500 font-bold">Influence: {leader.influence}/100</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/eoi" className={`${tc.button} text-xs font-bold px-4 py-2 rounded-xl`}>Connect / Inquire</Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 space-y-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Key Achievements</h4>
                <ul className="text-[10px] text-gray-500 space-y-1 list-disc pl-4">
                  {leader.achievements.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </Card>
              <Card className="p-4 space-y-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Editorial Coverage</h4>
                <ul className="text-[10px] text-gray-500 space-y-1 list-disc pl-4">
                  {leader.coverage.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </Card>
              <Card className="p-4 space-y-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Interviews & Appearances</h4>
                <ul className="text-[10px] text-gray-500 space-y-1 list-disc pl-4">
                  {leader.interviews.map((intv, i) => <li key={i}>{intv}</li>)}
                </ul>
              </Card>
            </div>
          </Card>
        </section>
      </div>
    );
  }

  // VIEW 3: BY SECTOR
  if (view === "sector") {
    if (tier === "registered") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <RegisteredLeaderBySectorView />
        </div>
      );
    }
  }

  // VIEW 4: ALL SECTORS
  if (view === "all") {
    if (tier === "registered") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <RegisteredLeaderAllSectorsView />
        </div>
      );
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
      <SubMenuTabs />
      <TierHero
        title={`All 50 Sectors Leader Registry`}
        description="Comprehensive directory of executive figures, CXOs, founders, and industry leaders mapped across 50 sectors."
      />

      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
        <Card className="p-6 space-y-4">
          <SectionTitle title="Sector-Wise Leadership Directory" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800">
                  <th className="p-3">SECTOR</th>
                  <th className="p-3">TOTAL LEADERS</th>
                  <th className="p-3">VERIFIED</th>
                  <th className="p-3">ENTERPRISE TOP</th>
                  <th className="p-3">GEOGRAPHY</th>
                  <th className="p-3">HEAT INDEX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                {DIRECTORY_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <td className="p-3 font-bold text-gray-900 dark:text-white">{row.sector}</td>
                    <td className="p-3 font-semibold text-gray-600 dark:text-gray-300">{row.leaders}</td>
                    <td className="p-3 text-emerald-600 font-bold">{row.verified}</td>
                    <td className="p-3 text-amber-600 font-bold">{row.top}</td>
                    <td className="p-3 text-gray-400">{row.country}</td>
                    <td className="p-3">
                      <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 border border-purple-200 dark:border-purple-800">
                        {row.heat}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}

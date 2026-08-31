"use client";

import Link from "next/link";
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
  Flag,
  Scale,
  Compass,
  ArrowRight,
  Layers,
  Building,
  Check,
  Heart,
  RefreshCw,
  FileEdit,
  Clock,
  Sliders,
  Flame,
  Send,
  Upload,
  Activity,
  Shield
} from "lucide-react";

interface Props {
  submenuSlug: string; // my | feed | activities | intelligence
  viewSlug: string;    // all | likes | comments | analytics | velocity | sectors | benchmarks
}

type SubmenuType = "my" | "activities" | "intelligence";

function normalizeSubmenu(slug: string): SubmenuType {
  if (slug === "activities") return "activities";
  if (slug === "intelligence" || slug === "contribution" || slug === "reader-intelligence") return "intelligence";
  return "my";
}

const SUBMENU_CONFIG: Record<SubmenuType, {
  label: string;
  sublabel: string;
  icon: ComponentType<{ className?: string }>;
  gradFrom: string;
  gradTo: string;
  button: string;
}> = {
  my: {
    label: "My Sector Trade News",
    sublabel: "Personalized News Feed & AI Executive Briefings",
    icon: User,
    gradFrom: "from-blue-600",
    gradTo: "to-indigo-700",
    button: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  activities: {
    label: "My Activities & Analytics",
    sublabel: "Engagement History, Likes, Comments & Pro Analytics",
    icon: Activity,
    gradFrom: "from-emerald-600",
    gradTo: "to-teal-700",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white"
  },
  intelligence: {
    label: "Reader Intelligence",
    sublabel: "Audience Analytics, Reading Velocity & Topic Intelligence (Pro)",
    icon: Sparkles,
    gradFrom: "from-indigo-600",
    gradTo: "to-purple-700",
    button: "bg-purple-600 hover:bg-purple-700 text-white"
  }
};

const LIKED_STORIES = [
  { id: "l-1", title: "Hosur Semiconductor Hub Receives $1.2 Billion Equipment Approval", date: "Liked 2 hrs ago", sector: "Semiconductors", views: "2.4K" },
  { id: "l-2", title: "India-UAE CEPA Non-Oil Trade Crosses $87 Billion", date: "Liked 1 day ago", sector: "Logistics", views: "3.8K" },
  { id: "l-3", title: "2026 Sovereign AI Infrastructure Roadmap Released", date: "Liked 3 days ago", sector: "AI & Cyber", views: "4.1K" }
];

const MY_COMMENTS_LOG = [
  { id: "c-1", article: "India-Europe Maritime Freight Rates Rise 14%", comment: "Our freight team is shifting 20% volume to the IMEC multimodal rail route via Mundra.", date: "Yesterday, 4:15 PM", upvotes: 12 },
  { id: "c-2", article: "Phytochemical Herbal Extracts EU Purity Standards", comment: "The unified testing protocol at Mundra Port has cut lab clearance times significantly.", date: "July 18, 2026", upvotes: 8 }
];

const READER_INTELLIGENCE_METRICS = [
  { label: "Weekly Reading Velocity", val: "4.8 hrs", sub: "+18% vs Last Week", color: "text-purple-600", icon: Clock },
  { label: "Sector Consumption Index", val: "82%", sub: "8 Active Sectors Tracked", color: "text-blue-600", icon: Target },
  { label: "Pro Intelligence Score", val: "94/100", sub: "Top 5% Trade Analysts", color: "text-emerald-500", icon: Trophy },
  { label: "Executive AI Digests Read", val: "28 Digests", sub: "100% Completion Rate", color: "text-amber-500", icon: Sparkles }
];

const SECTOR_CONSUMPTION_BREAKDOWN = [
  { sector: "Semiconductors (S46)", percentage: 42, articlesRead: 18, growth: "+14%", color: "bg-purple-600" },
  { sector: "Logistics & Supply Chain (S43)", percentage: 28, articlesRead: 12, growth: "+8%", color: "bg-blue-600" },
  { sector: "AI & Cyber Security (S02)", percentage: 18, articlesRead: 9, growth: "+22%", color: "bg-emerald-500" },
  { sector: "Energy & Sustainability (S17)", percentage: 12, articlesRead: 5, growth: "+5%", color: "bg-amber-500" }
];

const PEER_AUDIENCE_BENCHMARKS = [
  { metric: "Weekly In-Depth Reads", userVal: "14 Articles", peerAvg: "8.2 Articles", status: "Top 10%", badge: "High Velocity" },
  { metric: "Trade Policy Topic Depth", userVal: "92% Score", peerAvg: "64% Score", status: "Top 5%", badge: "Expert Tier" },
  { metric: "Bilateral Corridor Tracking", userVal: "5 Corridors", peerAvg: "2 Corridors", status: "Top 15%", badge: "Multi-Regional" },
  { metric: "AI Audio Digest Listens", userVal: "12 Sessions", peerAvg: "4 Sessions", status: "Top 8%", badge: "Power User" }
];

const READING_ACTIVITY_TIMELINE = [
  { day: "Mon", count: 8, minutes: 54, height: "60%" },
  { day: "Tue", count: 11, minutes: 72, height: "80%" },
  { day: "Wed", count: 9, minutes: 60, height: "65%" },
  { day: "Thu", count: 14, minutes: 95, height: "100%" },
  { day: "Fri", count: 6, minutes: 40, height: "45%" },
  { day: "Sat", count: 4, minutes: 25, height: "30%" },
  { day: "Sun", count: 7, minutes: 48, height: "55%" }
];

const TOPIC_GAP_ALERTS = [
  {
    title: "Semiconductor OSAT Tariff Shift (Q4 2026)",
    reason: "High surge in your followed sector, but you have not read the latest CEPA impact brief.",
    action: "Read Briefing →",
    href: "/en/poc-v2/my-news/feed",
    urgency: "High Priority",
    urgencyColor: "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/30"
  },
  {
    title: "Gujarat Green Hydrogen Port Subsidies",
    reason: "New policy circular released 4 hours ago matching your logistics bookmarks.",
    action: "Read Briefing →",
    href: "/en/poc-v2/my-news/feed",
    urgency: "New Update",
    urgencyColor: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30"
  }
];

const MY_SUBMISSIONS = [
  { id: "sub-1", title: "Multimodal Logistics Corridors: Accelerating Indo-EU Bilateral Trade", date: "July 15, 2026", status: "Published", views: "1,420 Views", color: "bg-emerald-50 text-emerald-605" },
  { id: "sub-2", title: "Sovereign AI Infrastructure Investment Playbook for SMEs", date: "July 19, 2026", status: "Under Review", views: "Editorial Queue", color: "bg-amber-50 text-amber-600" },
  { id: "sub-3", title: "Green Hydrogen Tariff Arbitrage Across Gujarat Ports", date: "July 20, 2026", status: "Draft Saved", views: "In Progress", color: "bg-gray-100 text-gray-655" }
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

export default function NewsPOCMyNewsSubmenu({ submenuSlug, viewSlug }: Props) {
  const router = useRouter();
  const activeSubmenu = normalizeSubmenu(submenuSlug);
  const cfg = SUBMENU_CONFIG[activeSubmenu];
  const IconComp = cfg.icon;
  const basePath = "/en/poc-v2/my-news";

  const [activeActivityView, setActiveActivityView] = useState(viewSlug || "all");
  const [activeIntelligenceView, setActiveIntelligenceView] = useState(viewSlug || "all");

  // Reader Intelligence specific states
  const [isPro, setIsPro] = useState(false);
  const [dateRange, setDateRange] = useState<"7 Days" | "30 Days" | "90 Days" | "1 Year">("30 Days");
  const [lastUpdated, setLastUpdated] = useState("Just now (01:10 AM)");
  const [goalTarget, setGoalTarget] = useState(25);
  const [goalCurrent, setGoalCurrent] = useState(18);
  const [isPersonalizationEnabled, setIsPersonalizationEnabled] = useState(true);

  const handleRefreshData = () => {
    const now = new Date();
    setLastUpdated(`Just now (${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
  };

  const SubMenuHeader = () => (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="flex flex-col gap-3 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => router.push(basePath)}
            className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all mr-1"
            aria-label="Go back to My News main page"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className={`bg-gradient-to-r ${cfg.gradFrom} ${cfg.gradTo} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-xs`}>
            <IconComp className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold">{cfg.label}</span>
          </div>

          <div className="flex gap-1 flex-wrap">
            {[
              { slug: "my", label: "My Sector Trade News" },
              { slug: "activities", label: "My Activities" },
              { slug: "intelligence", label: "Reader Intelligence" }
            ].map((s) => (
              <button
                key={s.slug}
                onClick={() => router.push(`${basePath}/${s.slug}`)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  activeSubmenu === normalizeSubmenu(s.slug)
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-view switcher for Activities */}
        {activeSubmenu === "activities" && (
          <div className="flex gap-2 pt-1 border-t border-gray-100 dark:border-gray-850">
            <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center">Sub-Views:</span>
            {[
              { slug: "all", label: "Overview Dashboard" },
              { slug: "likes", label: "My Likes" },
              { slug: "comments", label: "My Comments" },
              { slug: "analytics", label: "Trade-News Analytics (Pro)" }
            ].map((v) => (
              <button
                key={v.slug}
                onClick={() => {
                  setActiveActivityView(v.slug);
                  router.push(`${basePath}/activities/${v.slug}`);
                }}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  activeActivityView === v.slug
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-emerald-500"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Sub-view switcher for Intelligence */}
        {activeSubmenu === "intelligence" && (
          <div className="flex gap-2 pt-1 border-t border-gray-100 dark:border-gray-850">
            <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center">Intelligence Views:</span>
            {[
              { slug: "all", label: "Overview Dashboard" },
              { slug: "analytics", label: "Reading Analytics" },
              { slug: "sectors", label: "Sector Heatmap" },
              { slug: "benchmarks", label: "Peer Benchmarks" },
              { slug: "contributions", label: "My Contributions" }
            ].map((v) => (
              <button
                key={v.slug}
                onClick={() => {
                  setActiveIntelligenceView(v.slug);
                  router.push(`${basePath}/intelligence/${v.slug}`);
                }}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  activeIntelligenceView === v.slug
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-purple-600"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const HeroBanner = ({ title, description }: { title: string; description: string }) => (
    <section className={`bg-gradient-to-br ${cfg.gradFrom} ${cfg.gradTo} text-white relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <IconComp className="h-4 w-4 text-white/80" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{cfg.sublabel}</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-white/80 text-xs md:text-sm font-normal leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );

  // VIEW 1: MY SECTOR TRADE NEWS (Personalized Feed)
  if (activeSubmenu === "my") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title="My Sector Trade News Feed"
          description="Personalized real-time intelligence matching your followed sectors, countries, leaders, and custom keyword alerts."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          
          {/* Followed Sectors Quick Strip */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Active Sector Streams (4 Followed)</span>
              <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">Manage Stream Filters →</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Semiconductors (S46)", color: "bg-blue-50 dark:bg-blue-950 text-blue-600" },
                { name: "AI & Cyber Security (S02)", color: "bg-purple-50 dark:bg-purple-950 text-purple-600" },
                { name: "Logistics & Supply Chain (S43)", color: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600" },
                { name: "Energy & Sustainability (S17)", color: "bg-amber-50 dark:bg-amber-950 text-amber-600" }
              ].map((s, idx) => (
                <span key={idx} className={`text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800 ${s.color}`}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* AI Executive Digest Card */}
          <div className="bg-gradient-to-br from-[#0c1a2e] to-[#142d52] text-white p-6 rounded-2xl border border-blue-900/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <h2 className="font-display text-sm font-bold uppercase tracking-wider">Daily Sector AI Executive Summary</h2>
              </div>
              <span className="bg-amber-400 text-gray-950 text-[8px] font-bold px-2.5 py-0.5 rounded-full">PRO FEATURE</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                "Chennai OSAT packaging facility achieves milestone 99.4% silicon wafer yield rate.",
                "India-UAE CEPA bilateral non-oil logistics clearance latency reduced to under 12 hours at Mundra Port.",
                "Gujarat state cabinet notifies tariff exemption for renewable hydrogen transmission."
              ].map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-200">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="font-normal leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
              <span className="text-[10px] text-slate-400">Generated 45m ago for your account profile.</span>
              <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded-lg transition-colors">
                Listen to Audio Summary 🎧
              </Link>
            </div>
          </div>

          {/* Stream of Personalized Articles */}
          <div className="space-y-4">
            <SectionTitle title="Latest Stories From Your Followed Sectors" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "f-1",
                  title: "Hosur Semiconductor Hub Receives $1.2 Billion Equipment Sourcing Approval",
                  excerpt: "High-precision lithography tools clear customs at Chennai Port, accelerating OSAT substrate packaging timeline for Q4 2026 pilot production.",
                  sector: "Semiconductors",
                  date: "15m ago",
                  readTime: "4 min read",
                  views: "2.4K"
                },
                {
                  id: "f-2",
                  title: "India-UAE CEPA Non-Oil Cargo Throughput Increases 18.4% at Mundra Port",
                  excerpt: "Digitized blockchain manifests cut container holding latency by 48 hours for fast-tracked pharmaceutical and renewable energy equipment.",
                  sector: "Logistics & Trade",
                  date: "1h ago",
                  readTime: "5 min read",
                  views: "3.8K"
                },
                {
                  id: "f-3",
                  title: "Sovereign AI Infrastructure: Tier-2 Datacenter Capital Subsidy Notified",
                  excerpt: "New Ministry guidelines provide up to 35% capex rebate for high-density compute clusters powered by captive green energy.",
                  sector: "AI & Cyber Security",
                  date: "3h ago",
                  readTime: "6 min read",
                  views: "1.9K"
                },
                {
                  id: "f-4",
                  title: "Green Hydrogen Tariff Arbitrage: Gujarat Ports Lead Export Readiness",
                  excerpt: "Terminal infrastructure at Kandla and Mundra accelerates bunkering readiness ahead of European carbon border tax enforcement.",
                  sector: "Energy & Sustainability",
                  date: "5h ago",
                  readTime: "4 min read",
                  views: "4.1K"
                }
              ].map((art) => (
                <Card key={art.id} className="p-5 space-y-3 hover:border-blue-500 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                      {art.sector}
                    </span>
                    <span className="text-[9px] text-gray-400">{art.date} · {art.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-normal leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[10px] text-gray-400">
                    <span>{art.views} Views</span>
                    <Link href={`/en/poc-v2/article/${art.id}`} className="text-blue-600 font-bold hover:underline">
                      Read Full Article →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </section>
      </div>
    );
  }

  // VIEW 2: MY ACTIVITIES & ANALYTICS
  if (activeSubmenu === "activities") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title="My Activities & Engagement Hub"
          description="Review your liked articles, discussion comments, reading history, and custom trade-news analytics."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Liked Stories", val: "38 Items", icon: Heart, color: "text-emerald-500" },
              { label: "Discussion Comments", val: "19 Comments", icon: MessageSquare, color: "text-blue-500" },
              { label: "Bookmarked Reports", val: "14 Items", icon: Bookmark, color: "text-purple-500" },
              { label: "Weekly Reading Time", val: "4.8 Hours", icon: Clock, color: "text-amber-500" }
            ].map((m, idx) => {
              const MIcon = m.icon;
              return (
                <Card key={idx} className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{m.label}</span>
                    <MIcon className={`h-4 w-4 ${m.color}`} />
                  </div>
                  <div className={`font-display text-xl font-bold ${m.color}`}>{m.val}</div>
                </Card>
              );
            })}
          </div>

          {/* Sub-view Content: All or Likes */}
          {(activeActivityView === "all" || activeActivityView === "likes") && (
            <div className="space-y-4">
              <SectionTitle title="My Liked Articles Log" action={<span className="text-[10px] text-gray-400">Showing 3 of 38</span>} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LIKED_STORIES.map((s) => (
                  <Card key={s.id} className="p-4 space-y-2 hover:border-emerald-500 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">{s.sector}</span>
                      <span className="text-[9px] text-gray-400">{s.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{s.title}</h4>
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[10px]">
                      <span className="text-gray-400">{s.views} Reads</span>
                      <Link href="/en/poc-v2/my-news/feed" className="text-blue-600 font-bold hover:underline">View →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Sub-view Content: Comments */}
          {(activeActivityView === "all" || activeActivityView === "comments") && (
            <div className="space-y-4">
              <SectionTitle title="My Discussion Contributions" action={<span className="text-[10px] text-gray-400">19 Total Comments</span>} />
              <div className="space-y-3">
                {MY_COMMENTS_LOG.map((c) => (
                  <Card key={c.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span className="font-bold text-gray-900 dark:text-white">{c.article}</span>
                      <span>{c.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-normal italic bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                      &quot;{c.comment}&quot;
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                      <span className="text-emerald-500 font-bold">▲ {c.upvotes} Upvotes from Industry Peers</span>
                      <Link href="/en/poc-v2/my-news/feed" className="text-blue-600 font-bold hover:underline">Go to Thread →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Sub-view Content: Pro Analytics */}
          {(activeActivityView === "all" || activeActivityView === "analytics") && (
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Pro Analytics Hub</span>
                  <h3 className="font-display text-lg font-bold">Trade-News Reading & Topic Engagement Graph</h3>
                </div>
                <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all">
                  Download Monthly PDF Report
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { sector: "Semiconductors", pct: "42% of reading time", bar: "w-[85%]", color: "bg-purple-500" },
                  { sector: "Logistics & Trade", pct: "28% of reading time", bar: "w-[56%]", color: "bg-blue-500" },
                  { sector: "AI & Cyber Security", pct: "18% of reading time", bar: "w-[36%]", color: "bg-emerald-500" }
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-slate-200">{stat.sector}</span>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color} ${stat.bar}`} />
                    </div>
                    <span className="text-[10px] text-slate-400 block">{stat.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      </div>
    );
  }

  // VIEW 3: READER INTELLIGENCE WORKSPACE (REPLACED MY CONTRIBUTION)
  if (activeSubmenu === "intelligence" && activeIntelligenceView === "contributions") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-150 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title="My Contribution & Press Release Publishing Workspace"
          description="Publish trade analysis, press releases, submit articles for editorial review, and track content views."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          
          {/* Author Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Published Articles", val: "3 Articles", sub: "1,420 Total Views", color: "text-purple-600" },
              { label: "Drafts Saved", val: "2 Drafts", sub: "In Progress", color: "text-blue-600" },
              { label: "Under Review", val: "1 Article", sub: "Editorial Queue", color: "text-amber-500" },
              { label: "Total Views", val: "1,420 Views", sub: "+24% This Month", color: "text-emerald-505" }
            ].map((m, idx) => (
              <Card key={idx} className="p-4 space-y-1">
                <span className="text-[9px] font-bold text-gray-400 uppercase block">{m.label}</span>
                <div className={`font-display text-xl font-bold ${m.color}`}>{m.val}</div>
                <span className="text-[9px] text-gray-500 block">{m.sub}</span>
              </Card>
            ))}
          </div>

          {/* Submit New Article Form Card */}
          <Card className="p-6 space-y-4">
            <SectionTitle title="Create & Submit New Trade Article / Press Release" action={<FileEdit className="h-4 w-4 text-purple-600" />} />
            
            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Article Headline / Title</label>
                <input className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 text-xs outline-none focus:border-purple-500" placeholder="Enter headline..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Target Sector</label>
                  <select className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 text-xs outline-none font-bold">
                    <option>Semiconductors (S46)</option>
                    <option>AI & Cyber Security (S02)</option>
                    <option>Logistics & Supply Chain (S43)</option>
                    <option>Energy & Sustainability (S17)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Content Type</label>
                  <select className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 text-xs outline-none font-bold">
                    <option>Trade Analysis Article</option>
                    <option>Press Release</option>
                    <option>SME Column / Opinion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Executive Summary / Abstract</label>
                <textarea rows={2} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 text-xs outline-none focus:border-purple-500" placeholder="Brief 2-line summary..." />
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Article Body Content</label>
                <textarea rows={5} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 text-xs outline-none focus:border-purple-500" placeholder="Write or paste your article content here..." />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-850">
                <button className="border border-gray-200 dark:border-gray-805 text-gray-600 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900">
                  Save as Draft
                </button>
                <button className={`${cfg.button} rounded-xl px-5 py-2 text-xs font-bold flex items-center gap-1.5 shadow-xs`}>
                  <Send className="h-3.5 w-3.5" /> Submit for Editorial Review
                </button>
              </div>
            </div>
          </Card>

          {/* My Submissions Table */}
          <div className="space-y-4">
            <SectionTitle title="My Submissions History" />
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800">
                    <th className="p-3.5">ARTICLE TITLE</th>
                    <th className="p-3.5">DATE</th>
                    <th className="p-3.5">STATUS</th>
                    <th className="p-3.5">PERFORMANCE</th>
                    <th className="p-3.5">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {MY_SUBMISSIONS.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">{sub.title}</td>
                      <td className="p-3.5 text-gray-450">{sub.date}</td>
                      <td className="p-3.5"><span className={`text-[8px] font-bold px-2 py-0.5 rounded ${sub.color}`}>{sub.status}</span></td>
                      <td className="p-3.5 font-bold text-purple-600">{sub.views}</td>
                      <td className="p-3.5"><Link href="/eoi" className="text-blue-600 font-bold text-[10px] hover:underline">Edit / View →</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-150 pb-16 transition-colors duration-300">
      <SubMenuHeader />
      
      {/* 01. INTELLIGENCE HEADER */}
      <section className="bg-gradient-to-br from-[#0c182b] via-[#151c3c] to-[#0d122b] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-mono font-bold bg-purple-600 px-2 py-0.5 rounded uppercase tracking-widest text-white">
                  AUDIENCE ANALYTICS, READING VELOCITY & TOPIC INTELLIGENCE (PRO)
                </span>
                <span className="text-[9px] text-slate-350">
                  Last updated: {lastUpdated}
                </span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
                Reader Intelligence & Content Analytics Workspace
              </h1>
              <p className="text-slate-300 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
                Understand your reading behavior, discover evolving interests, and turn your content activity into actionable intelligence.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Entitlement Simulator */}
              <button
                onClick={() => setIsPro(!isPro)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                  isPro 
                    ? "bg-amber-500 text-slate-955 border-amber-450 hover:bg-amber-600" 
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                }`}
              >
                <Crown className="h-3 w-3" />
                {isPro ? "Simulating Pro" : "Simulate Pro View"}
              </button>

              {/* Date Selector */}
              <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5">
                {(["7 Days", "30 Days", "90 Days", "1 Year"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setDateRange(r)}
                    className={`px-2.5 py-1 rounded-md text-[9px] font-bold transition-all cursor-pointer ${
                      dateRange === r ? "bg-purple-600 text-white shadow-xs" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRefreshData}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs p-2 rounded-xl transition-all cursor-pointer"
                title="Refresh Analytics"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => alert(isPro ? "Preparing PDF dossier export..." : "Dossier export requires Reader Pro Upgrade.")}
                className="bg-purple-600 hover:bg-purple-750 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                Export Report
              </button>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
        
        {/* 02. READER OVERVIEW / KPI CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { val: "128", label: "Articles Read", sub: "Last 30 Days", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50/40 dark:bg-purple-950/10" },
            { val: "6h 42m", label: "Reading Time", sub: "Focused Attention", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50/40 dark:bg-blue-950/10" },
            { val: "18", label: "Topics Explored", sub: "Across 4 Continents", color: "text-emerald-600 dark:text-emerald-450", bg: "bg-emerald-50/40 dark:bg-emerald-950/10" },
            { val: "12", label: "Saved Articles", sub: "Saved Bookmarks", color: "text-indigo-650 dark:text-indigo-400", bg: "bg-indigo-50/40 dark:bg-indigo-950/10" },
            { val: "7 Days", label: "Reading Streak", sub: "Habit Score: Peak", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50/40 dark:bg-amber-950/10" },
            { val: "82%", label: "Interest Match", sub: "Target Convergence", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50/40 dark:bg-pink-950/10" }
          ].map((kpi, idx) => (
            <div key={idx} className={`${kpi.bg} border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center space-y-1`}>
              <div className={`font-display text-xl md:text-2xl font-bold ${kpi.color}`}>{kpi.val}</div>
              <span className="text-[10px] text-gray-900 dark:text-white font-bold block leading-tight">{kpi.label}</span>
              <span className="text-[8px] text-gray-400 block">{kpi.sub}</span>
            </div>
          ))}
        </div>

        {/* SUBMENU SPECIFIC CONDITIONAL RENDERING / MAIN MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 8-COLUMNS: CORE CHARTS & INSIGHTS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 03. YOUR READING PULSE */}
            {(activeIntelligenceView === "all" || activeIntelligenceView === "analytics") && (
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-905 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="h-4 w-4 text-purple-500" />
                      Your Reading Pulse
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">Show how actively you consume content over time.</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    ↑ 24% Activity This Week
                  </span>
                </div>

                {/* Timeline activity visualization */}
                <div className="pt-2">
                  <div className="flex items-end justify-between gap-3 h-32 border-b border-gray-200 dark:border-gray-800 pb-2 px-1">
                    {READING_ACTIVITY_TIMELINE.map((t, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[8px] font-mono font-bold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {t.minutes}m
                        </span>
                        <div 
                          className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-md group-hover:brightness-110 transition-all cursor-pointer"
                          style={{ height: t.height }}
                          title={`Read: ${t.count} articles, Time: ${t.minutes} min`}
                        />
                        <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                          {t.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-500 dark:text-gray-400">
                  <span>Reading Active Hours Peak: <strong>Thursday 9:30 AM</strong></span>
                  <span>Avg Duration: <strong>42 min / session</strong></span>
                </div>
              </Card>
            )}

            {/* 04. INTEREST & TOPIC INTELLIGENCE */}
            <Card className="p-6 space-y-4">
              <h3 className="font-display text-sm font-bold text-gray-909 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Target className="h-4 w-4 text-blue-500" />
                Your Top Interests
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { topic: "Technology", pct: 34, growth: "+12%", color: "bg-blue-600", tag: "#SovereignAI" },
                  { topic: "Manufacturing", pct: 22, growth: "+6%", color: "bg-emerald-500", tag: "#TradeCorridors" },
                  { topic: "Energy", pct: 17, growth: "+18%", color: "bg-purple-600", tag: "#GreenHydrogen" },
                  { topic: "Global Trade", pct: 14, growth: "Stable", color: "bg-amber-500", tag: "#CEPA" },
                  { topic: "AI Systems", pct: 13, growth: "+9%", color: "bg-indigo-600", tag: "#SovereignCompute" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">{item.topic}</span>
                        <span className="text-[9px] text-gray-400">{item.tag}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-emerald-500 text-[10px]">{item.growth}</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{item.pct}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 05. SECTOR ENGAGEMENT HEATMAP */}
            {(activeIntelligenceView === "all" || activeIntelligenceView === "sectors") && (
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold text-gray-909 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-emerald-500" />
                      Sector Engagement
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">Analysis of read volume & bookmarks indexed against IGEN 50 Sector Taxonomies.</p>
                  </div>
                  <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                    Active Streams
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SECTOR_CONSUMPTION_BREAKDOWN.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-[#0c1322] border border-gray-200 dark:border-gray-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-905 dark:text-white truncate max-w-[150px]">{item.sector}</span>
                        <span className="text-[10px] font-bold text-emerald-500">{item.growth}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-500">
                        <span>{item.articlesRead} Reads</span>
                        <span className="font-mono text-purple-650 dark:text-purple-400 font-bold">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* 08. READING VELOCITY & BEHAVIOR */}
            {(activeIntelligenceView === "all" || activeIntelligenceView === "analytics") && (
              <Card className="p-6 space-y-4">
                <h3 className="font-display text-sm font-bold text-gray-905 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-purple-500" />
                  Reading Velocity & Behavior
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { val: "4m 32s", label: "Avg Reading Time", desc: "Long-form focus" },
                    { val: "6.4", label: "Articles / Session", desc: "Deep discovery" },
                    { val: "78%", label: "Completion Rate", desc: "High engagement" },
                    { val: "4.2", label: "Sessions / Week", desc: "Consistent reader" }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-905 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
                      <div className="font-display text-lg font-bold text-purple-600 dark:text-purple-400">{stat.val}</div>
                      <div className="text-[10px] text-gray-909 dark:text-white font-bold">{stat.label}</div>
                      <span className="text-[8px] text-gray-400 block">{stat.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 rounded-xl text-xs leading-relaxed text-gray-700 dark:text-gray-300 font-serif italic">
                  💡 "Interpretation: You tend to read long-form industry analysis more frequently than short news updates, showing high affinity for bilateral policy corridors."
                </div>
              </Card>
            )}

            {/* 09. CONTENT ENGAGEMENT ANALYSIS */}
            {(activeIntelligenceView === "all" || activeIntelligenceView === "analytics") && (
              <Card className="p-6 space-y-4">
                <h3 className="font-display text-sm font-bold text-gray-905 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart2 className="h-4 w-4 text-indigo-500" />
                  Your Content Preferences
                </h3>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { type: "News Briefings", share: 54, color: "bg-blue-600" },
                    { type: "Deep Policy Analysis", share: 21, color: "bg-purple-600" },
                    { type: "Industry Dossiers & Reports", share: 14, color: "bg-emerald-500" },
                    { type: "Executive Interviews", share: 7, color: "bg-amber-500" },
                    { type: "B2B Trade Video/Audio Guides", share: 4, color: "bg-indigo-600" }
                  ].map((cType, idx) => (
                    <div key={idx} className="flex items-center gap-3 justify-between text-xs">
                      <span className="text-gray-909 dark:text-white font-bold">{cType.type}</span>
                      <div className="flex-1 max-w-[200px] flex items-center gap-2 font-mono">
                        <div className="w-full bg-gray-150 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${cType.color}`} style={{ width: `${cType.share}%` }} />
                        </div>
                        <span className="w-8 text-right font-bold">{cType.share}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-[10px] text-gray-400 italic pt-1 border-t border-gray-100 dark:border-gray-850">
                  Your Reading Style: "You primarily consume industry news and analysis."
                </div>
              </Card>
            )}

            {/* 10. INTEREST EVOLUTION */}
            {(activeIntelligenceView === "all" || activeIntelligenceView === "sectors") && (
              <Card className="p-6 space-y-4">
                <h3 className="font-display text-sm font-bold text-gray-909 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-amber-500" />
                  How Your Interests Are Changing
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl space-y-1">
                    <span className="text-[9px] font-bold text-emerald-650 dark:text-emerald-450 uppercase tracking-widest block font-mono">
                      Emerging Interest
                    </span>
                    <h5 className="font-bold text-gray-955 dark:text-white text-xs">Renewable Energy</h5>
                    <p className="text-[10px] text-gray-500 leading-normal">
                      Your engagement with this topic increased 31% over the last 30 days.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50/40 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-xl space-y-1">
                    <span className="text-[9px] font-bold text-red-655 dark:text-red-400 uppercase tracking-widest block font-mono">
                      Declining Interest
                    </span>
                    <h5 className="font-bold text-gray-955 dark:text-white text-xs">Retail & Consumer</h5>
                    <p className="text-[10px] text-gray-500 leading-normal">
                      Your reading activity decreased 14% over the last 30 days.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* 11. AI READER INTELLIGENCE */}
            <div className="bg-gradient-to-br from-[#0c1a2e] to-[#142d52] text-white p-6 rounded-3xl border border-blue-900/60 shadow-md space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider">AI Reader Intelligence insights</h3>
                </div>
                {isPro ? (
                  <span className="bg-amber-500 text-slate-955 text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    PRO Activated
                  </span>
                ) : (
                  <span className="bg-slate-700/60 text-slate-300 text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 font-mono">
                    <Lock className="h-2.5 w-2.5" /> Free Preview
                  </span>
                )}
              </div>

              {/* Insights Grid */}
              <div className="space-y-3 relative z-10 text-xs font-normal">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest block font-mono">What You're Reading</span>
                  <p className="text-slate-200">
                    Your recent activity shows increasing interest in Technology, Manufacturing, and capturing bilateral Green Hydrogen developments.
                  </p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[9px] font-bold text-emerald-400 block font-mono uppercase tracking-widest">What Changed</span>
                  <p className="text-slate-200">
                    Your attention toward Renewable Energy infrastructure capex trends increased 18% over the last 30 days.
                  </p>
                </div>

                {isPro ? (
                  <>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block font-mono">What You May Be Missing</span>
                      <p className="text-slate-200">
                        You have been tracking semiconductor manufacturing layout updates, but have missed the recent India-US bilateral supply chain manifest policy updates.
                      </p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                      <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest block font-mono">What to Explore Next</span>
                      <p className="text-slate-200">
                        We recommend review of the "Bilateral Indo-US Semiconductor Corridor Outlook 2026" policy dossier.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="relative p-4 bg-slate-950/60 rounded-xl border border-white/5 text-center space-y-2">
                    <div className="absolute inset-0 bg-slate-950/10 backdrop-blur-xs rounded-xl" />
                    
                    <div className="relative z-10 space-y-2">
                      <Lock className="h-5 w-5 text-amber-400 mx-auto" />
                      <h4 className="font-bold text-white text-xs">Unlock "What You May Be Missing" & "What to Explore Next"</h4>
                      <p className="text-slate-400 text-[10px] max-w-sm mx-auto">
                        Get personalized AI analysis of missing topics, peer standing recommendations, and cross-topic drift trackers.
                      </p>
                      <button 
                        onClick={() => setIsPro(true)} 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer inline-block"
                      >
                        Unlock Reader Intelligence Pro
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI TOPIC GAP ALERTS CARD (EXISTING WIDGET PRESERVED) */}
            <div className="space-y-4">
              <SectionTitle
                title="AI Topic Gap Alerts & Missed High-Impact Coverage"
                action={<span className="text-[10px] text-gray-400">Updated every 6 hours</span>}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOPIC_GAP_ALERTS.map((gap, idx) => (
                  <Card key={idx} className="p-5 space-y-3 border-l-4 border-l-purple-600 hover:border-purple-400 transition-all">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${gap.urgencyColor}`}>
                        {gap.urgency}
                      </span>
                      <span className="text-[9px] text-gray-400">AI Recommendation</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                      {gap.title}
                    </h4>
                    <p className="text-xs text-gray-505 dark:text-gray-450 font-normal leading-relaxed">
                      {gap.reason}
                    </p>
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex justify-end">
                      <Link href={gap.href} className="text-purple-605 font-bold text-xs hover:underline flex items-center gap-1">
                        {gap.action}
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 4-COLUMNS: SIDEBAR ANALYTICS WIDGETS */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 06. COUNTRY & MARKET ATTENTION */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider block font-display border-b border-gray-100 dark:border-gray-800 pb-2">
                Countries You're Following
              </span>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { country: "India", count: 42, growth: "↑ 18%", color: "text-blue-500" },
                  { country: "United States", count: 28, growth: "↑ 11%", color: "text-emerald-500" },
                  { country: "UAE", count: 19, growth: "↑ 7%", color: "text-purple-500" },
                  { country: "Singapore", count: 11, growth: "Stable →", color: "text-gray-400" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="font-bold text-gray-900 dark:text-white">{item.country}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-gray-450">{item.count} Reads</span>
                      <span className={`font-bold ${item.color}`}>{item.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 07. COMPANY & LEADER ATTENTION */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-3xl p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold text-gray-909 dark:text-white uppercase tracking-wider block font-display border-b border-gray-100 dark:border-gray-800 pb-2">
                Companies & Leaders You're Following
              </span>

              <div className="space-y-3 text-xs">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono block">Companies</span>
                  {[
                    { name: "NVIDIA", count: 12, trend: "Growing Interest ↑", color: "text-emerald-500" },
                    { name: "Microsoft", count: 9, trend: "Stable →", color: "text-gray-400" },
                    { name: "Tata Motors", count: 7, trend: "Rising ↑", color: "text-blue-500" }
                  ].map((cp, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 dark:text-white">{cp.name}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-gray-455">{cp.count} Reads</span>
                        <span className={`text-[10px] font-bold ${cp.color}`}>{cp.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-855">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono block">Leaders</span>
                  {[
                    { name: "Jensen Huang", count: 8, tag: "Founder" },
                    { name: "Shaktikanta Das", count: 5, tag: "Governor" }
                  ].map((l, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="font-bold text-gray-905 dark:text-white">{l.name}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-gray-455">{l.count} Reads</span>
                        <span className="bg-blue-50 dark:bg-blue-955 text-blue-600 dark:text-blue-400 text-[8px] font-bold px-1.5 py-0.25 rounded font-mono">
                          {l.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 12. RECOMMENDED INTELLIGENCE */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold text-gray-909 dark:text-white uppercase tracking-wider block font-display">
                Recommended For You
              </span>

              <div className="space-y-3">
                {[
                  { title: "Indo-US Semiconductor Corridor Outlook", reason: "Based on interest in Manufacturing & Technology", isPremium: true },
                  { title: "India-UAE CEPA Maritime Cargo Volume Report", reason: "Based on interest in Logistics", isPremium: false }
                ].map((rep, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-905 border border-gray-200 dark:border-gray-850 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-bold">
                      <span className="text-gray-400 uppercase tracking-wider font-mono">Report Recommendation</span>
                      {rep.isPremium ? (
                        <span className="text-purple-650 font-bold flex items-center gap-0.5 font-mono"><Lock className="h-2.5 w-2.5" /> PRO</span>
                      ) : (
                        <span className="text-emerald-500 uppercase font-mono">Free</span>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{rep.title}</h5>
                    <span className="text-[10px] text-gray-400 block font-normal">{rep.reason}</span>
                    
                    <div className="pt-2 border-t border-gray-200/50 dark:border-gray-850">
                      {rep.isPremium && !isPro ? (
                        <button
                          onClick={() => setIsPro(true)}
                          className="w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[9px] py-1.5 rounded-lg transition-all block cursor-pointer"
                        >
                          Unlock Report with Pro →
                        </button>
                      ) : (
                        <Link
                          href="/en/poc-v2/headlines"
                          className="w-full text-center bg-blue-600 hover:bg-blue-705 text-white font-bold text-[9px] py-1.5 rounded-lg transition-all block font-mono"
                        >
                          Download Report →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 13. READING GOALS & STREAK */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold text-gray-909 dark:text-white uppercase tracking-wider block font-display">
                Your Reading Goals
              </span>

              <div className="space-y-3 text-xs font-normal">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Weekly Target:</span>
                  <span className="font-bold text-gray-900 dark:text-white font-mono">{goalCurrent} / {goalTarget} articles</span>
                </div>
                <div className="w-full bg-gray-150 dark:bg-gray-805 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(goalCurrent / goalTarget) * 100}%` }} />
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                  <span>Streak: <strong>7 Days 🔥</strong></span>
                  <button 
                    onClick={() => {
                      const newTarget = prompt("Enter new weekly goal target:", String(goalTarget));
                      if (newTarget && !isNaN(Number(newTarget))) setGoalTarget(Number(newTarget));
                    }}
                    className="text-blue-500 font-bold hover:underline cursor-pointer"
                  >
                    Adjust Goal →
                  </button>
                </div>
              </div>
            </div>

            {/* PEER AUDIENCE BENCHMARKS WIDGET PRESERVED */}
            {(activeIntelligenceView === "all" || activeIntelligenceView === "benchmarks") && (
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3">
                <span className="text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider block font-display border-b border-gray-100 dark:border-gray-800 pb-2">
                  Peer Standing Benchmarks
                </span>
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  {PEER_AUDIENCE_BENCHMARKS.map((b, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-905 border border-gray-200 dark:border-gray-800 rounded-xl space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 dark:text-white text-[11px]">{b.metric}</span>
                        <span className="text-[9px] font-bold text-purple-605">{b.status}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                        <span>Your score: <strong>{b.userVal}</strong></span>
                        <span>Avg: {b.peerAvg}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 14. PREMIUM INTELLIGENCE / UPGRADE */}
            <div className="bg-gradient-to-br from-[#0c1424] to-[#162136] border border-slate-800 text-white p-5 rounded-3xl shadow-sm space-y-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-mono block">
                  Unlock Reader Intelligence Pro
                </span>
                <h4 className="font-display text-sm font-bold text-white mt-1">
                  Go beyond basic statistics with advanced reading intelligence analytics.
                </h4>
              </div>

              <div className="space-y-1.5 text-xs text-slate-350">
                {[
                  "Advanced Reading Analytics",
                  "Reading Velocity Tracking",
                  "Sector Engagement Heatmaps",
                  "Interest Evolution Charts",
                  "AI Reader Intelligence Briefings",
                  "Emerging Interest Detection Alerts"
                ].map(benefit => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsPro(true)}
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Upgrade to Reader Pro →
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 15. DATA & PRIVACY CONTROLS */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
            <div>
              <h4 className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Shield className="h-4.5 w-4.5 text-blue-500" />
                Your Data & Privacy Controls
              </h4>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Your reading activity is used to personalize your experience and generate Reader Intelligence insights.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-505">Activity Tracking:</span>
              <button
                onClick={() => setIsPersonalizationEnabled(!isPersonalizationEnabled)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-all ${isPersonalizationEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
              >
                <div className={`bg-white h-4.5 w-4.5 rounded-full shadow-md transform transition-all ${isPersonalizationEnabled ? 'translate-x-4.5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] text-gray-500">
            <button onClick={() => alert("Personalization settings updated.")} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:text-blue-500 font-bold cursor-pointer">
              Manage Personalization
            </button>
            <button onClick={() => alert("Retrieving full reading logs...")} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:text-blue-500 font-bold cursor-pointer">
              Reading History Log
            </button>
            <button onClick={() => alert("Privacy preferences saved.")} className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:text-blue-500 font-bold cursor-pointer">
              Privacy Settings
            </button>
            <button 
              onClick={() => {
                if (confirm("Are you sure you want to clear your local reading logs history? This resets your streak & heatmaps.")) {
                  setGoalCurrent(0);
                  alert("Local reading history cleared.");
                }
              }} 
              className="px-3 py-1.5 bg-red-50 dark:bg-red-950/20 text-red-655 dark:text-red-400 border border-red-200 dark:border-red-900/40 rounded-lg font-bold cursor-pointer"
            >
              Clear History
            </button>
          </div>
        </div>

        {/* Pro Actions Footer Banner (Preserved) */}
        <div className="bg-gradient-to-br from-[#0c1a2e] to-[#1a2e4c] text-white p-6 rounded-2xl border border-blue-900/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Export Custom Reader Intelligence Brief</h3>
            <p className="text-xs text-slate-350">Generate a branded PDF executive dossier of your sector consumption & audience analytics.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer">
              Configure Alerts
            </button>
            <button
              onClick={() => alert("Generating PDF dossier package...")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" /> Download Dossier (PDF)
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}

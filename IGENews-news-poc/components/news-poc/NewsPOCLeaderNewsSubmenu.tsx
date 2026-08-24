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

type Tier = "registered" | "verified" | "top";
type View = "news" | "pages" | "sector" | "all";
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
  }
};

const VIEW_LABELS: Record<View, string> = {
  news: "News",
  pages: "Pages",
  sector: "By Sector",
  all: "All Sectors"
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
  "Board changes in AI infrastructure companies",
  "Women leaders driving biotech growth",
  "Executive movements in EV supply chains",
  "Leadership awards season nominations",
  "M&A signals from enterprise technology firms"
];

const SECTORS = [
  { name: "Technology and AI", leaders: "12,400", growth: "+31%", top: "Satya Nadella", signal: "AI governance and cloud capex" },
  { name: "Healthcare and Pharma", leaders: "8,850", growth: "+18%", top: "Kiran Mazumdar-Shaw", signal: "Biologics and affordable care" },
  { name: "Finance and FinTech", leaders: "9,620", growth: "+22%", top: "Nandan Nilekani", signal: "Digital payment infrastructure" },
  { name: "Energy and Climate", leaders: "6,410", growth: "+27%", top: "Sumant Sinha", signal: "Green hydrogen and grid storage" },
  { name: "Automotive and EV", leaders: "5,780", growth: "+24%", top: "Bhavish Aggarwal", signal: "Battery supply chain localization" },
  { name: "Logistics and Trade", leaders: "4,950", growth: "+16%", top: "Suresh Narayanan", signal: "Cross-border supply resilience" },
  { name: "Manufacturing", leaders: "7,120", growth: "+14%", top: "N Chandrasekaran", signal: "Factory digitization" },
  { name: "Agriculture and Food", leaders: "3,880", growth: "+11%", top: "Sanjiv Puri", signal: "Agri exports and food security" }
];

const DIRECTORY_ROWS = [
  { sector: "Technology and AI", leaders: "12,400", verified: "3,120", top: "420", country: "Global", heat: "Very High" },
  { sector: "Healthcare and Pharma", leaders: "8,850", verified: "1,880", top: "230", country: "India, US, EU", heat: "High" },
  { sector: "Finance and FinTech", leaders: "9,620", verified: "2,240", top: "310", country: "Global", heat: "High" },
  { sector: "Energy and Climate", leaders: "6,410", verified: "1,460", top: "260", country: "APAC, EU", heat: "Very High" },
  { sector: "Automotive and EV", leaders: "5,780", verified: "1,020", top: "190", country: "India, China, EU", heat: "Rising" },
  { sector: "Logistics and Trade", leaders: "4,950", verified: "880", top: "150", country: "Global", heat: "Rising" },
  { sector: "Manufacturing", leaders: "7,120", verified: "1,340", top: "210", country: "India, ASEAN", heat: "Stable" }
];

const TOP_LEADERS = [
  { rank: 1, name: "Satya Nadella", company: "Microsoft", score: "97.5", sector: "Technology" },
  { rank: 2, name: "Kiran Mazumdar-Shaw", company: "Biocon", score: "95.1", sector: "Healthcare" },
  { rank: 3, name: "N Chandrasekaran", company: "Tata Group", score: "94.8", sector: "Manufacturing" },
  { rank: 4, name: "Nandan Nilekani", company: "Infosys", score: "93.9", sector: "FinTech" },
  { rank: 5, name: "Falguni Nayar", company: "Nykaa", score: "92.7", sector: "Retail" }
];

function isLocked(tier: Tier, required: Tier) {
  const order: Record<Tier, number> = { registered: 0, verified: 1, top: 2 };
  return order[tier] < order[required];
}

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

function LockedNote({ label, tierName = "Verified" }: { label: string; tierName?: string }) {
  return (
    <div className="rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/20 p-3 flex items-center gap-2">
      <Lock className="h-4 w-4 text-purple-600 shrink-0" />
      <p className="text-[10px] font-semibold text-purple-700 dark:text-purple-300">{label}</p>
      <Link href="/eoi" className="ml-auto shrink-0 text-[9px] font-bold text-purple-600 hover:underline">
        Upgrade to {tierName}
      </Link>
    </div>
  );
}

export default function NewsPOCLeaderNewsSubmenu({ tier, view }: Props) {
  const router = useRouter();
  const tc = TIER_CONFIG[tier];
  const TierIcon = tc.icon;
  const leader = LEADERS[tier];
  const tierPath = "/en/news-poc/leader-news";

  const SubMenuTabs = () => (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="flex items-center gap-2 py-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-300 transition-all mr-1"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className={`bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0`}>
          <TierIcon className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold">{tc.label}</span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {(["news", "pages", "sector", "all"] as View[]).map((item) => (
            <button
              key={item}
              onClick={() => router.push(`${tierPath}/${tier}/${item}`)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                view === item
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-purple-600"
              }`}
            >
              {VIEW_LABELS[item]}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
          {(["registered", "verified", "top"] as Tier[]).map((item) => (
            <button
              key={item}
              onClick={() => router.push(`${tierPath}/${item}/${view}`)}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${
                tier === item
                  ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                  : "text-gray-400 hover:text-gray-600"
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
    if (tier === "top") return null;
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
            <p className="text-sm text-white/80 leading-relaxed font-normal">{description}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 min-w-0 lg:min-w-[520px]">
            {[
              { label: "Access", value: tc.newsLimit },
              { label: "Search", value: tc.searchRank },
              { label: "Analytics", value: tc.analytics },
              { label: "Leads", value: tc.leadGen }
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

  if (view === "news") {
    const lockedAi = tier === "registered";
    const visibleNews = tier === "registered" ? NEWS_ITEMS.slice(0, 3) : NEWS_ITEMS;

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
                <SectionTitle title="Latest Feed" action={<span className="text-[10px] font-bold text-gray-400">{tc.newsLimit}</span>} />
                {visibleNews.map((item) => {
                  const itemLocked = item.premium && tier === "registered";
                  return (
                    <Card key={item.title} className={`p-4 ${itemLocked ? "opacity-80" : ""}`}>
                      <div className="flex items-start gap-3">
                        <div className={`h-11 w-11 rounded-xl ${tc.badgeBg} flex items-center justify-center text-white font-bold shrink-0`}>
                          {item.leader.split(" ").map((word) => word[0]).slice(0, 2).join("")}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/20 text-purple-600">{item.type}</span>
                            <span className="text-[9px] text-gray-400">{item.sector}</span>
                            {itemLocked && <Lock className="h-3 w-3 text-gray-400" />}
                          </div>
                          <h3 className="text-sm font-bold text-gray-950 dark:text-white leading-snug hover:text-purple-600">{item.title}</h3>
                          <div className="flex items-center justify-between text-[9px] text-gray-400">
                            <span>{item.leader} - {item.time}</span>
                            <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.views}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
                {tier === "registered" && <LockedNote label="Free access is limited. Unlimited leader news, saved articles, alerts, and premium reports unlock with Verified." />}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-5">
              <Card className="p-4 space-y-3">
                <SectionTitle title="Trending News" />
                <div className="space-y-2">
                  {TRENDING_ITEMS.map((item, index) => (
                    <div key={item} className="flex items-start gap-2 border-b border-gray-100 dark:border-gray-850 pb-2 last:border-0">
                      <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-5">{index + 1}</span>
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4 space-y-3">
                <SectionTitle title="Publish CTA" />
                {tier === "registered" ? (
                  <LockedNote label="Publishing leadership stories is locked for registered leaders." />
                ) : (
                  <Link href="/eoi" className={`${tc.button} w-full rounded-lg py-2.5 text-xs font-bold flex items-center justify-center gap-1.5`}>
                    <Plus className="h-3.5 w-3.5" /> Publish Leadership News
                  </Link>
                )}
                <p className="text-[10px] text-gray-500">Editorial upsells include SME/ASME articles, sponsored leadership stories, and PR media coverage.</p>
              </Card>

              <Card className="p-4 space-y-3">
                <SectionTitle title="AI Trend Insights" action={lockedAi ? <Lock className="h-3.5 w-3.5 text-gray-400" /> : <Sparkles className="h-3.5 w-3.5 text-amber-500" />} />
                {lockedAi ? (
                  <LockedNote label="AI summaries, predictive insights, and alerts unlock with Verified." />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Sentiment", value: "74%", icon: Star },
                      { label: "Exec Moves", value: "142", icon: TrendingUp },
                      { label: "M&A Signals", value: "28", icon: Target },
                      { label: "Alerts", value: "16", icon: Bell }
                    ].map((stat) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={stat.label} className="rounded-xl bg-gray-50 dark:bg-gray-900 p-3 text-center">
                          <StatIcon className={`h-4 w-4 mx-auto ${tc.textAccent}`} />
                          <div className="font-display text-lg font-bold text-gray-950 dark:text-white">{stat.value}</div>
                          <div className="text-[8px] font-bold uppercase text-gray-400">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              {tier === "top" && (
                <Card className="p-4 space-y-3 border-amber-300 dark:border-amber-900">
                  <SectionTitle title="Sponsored Slots" action={<Crown className="h-3.5 w-3.5 text-amber-500" />} />
                  {["Homepage leader spotlight", "Sector ranking sponsor", "Executive interview promo"].map((slot) => (
                    <div key={slot} className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-3 text-xs font-bold text-amber-700 dark:text-amber-300">
                      {slot}
                    </div>
                  ))}
                </Card>
              )}

              <UpgradeCTA compact />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (view === "pages") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />
        <section className={`bg-gradient-to-br ${tc.gradFrom} ${tc.gradTo} text-white`}>
          <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
            <div className="flex flex-col md:flex-row gap-6 md:items-end">
              <img src={leader.photo} alt={leader.name} className="h-28 w-28 rounded-2xl object-cover border-4 border-white/25 shadow-lg" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-3xl font-bold">{leader.name}</h1>
                  <span className="rounded-full bg-white/20 border border-white/25 px-2 py-1 text-[9px] font-bold flex items-center gap-1">
                    {tier === "top" ? <Crown className="h-3 w-3" /> : tier === "verified" ? <CheckCircle className="h-3 w-3" /> : <User className="h-3 w-3" />}
                    {tc.badgeLabel}
                  </span>
                </div>
                <p className="text-sm text-white/85">{leader.role}, {leader.company}</p>
                <div className="flex flex-wrap gap-3 text-[10px] font-semibold text-white/70">
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{leader.sector}</span>
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{leader.country}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{leader.followers} followers</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 min-w-52">
                <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center">
                  <div className="font-display text-2xl font-bold">{leader.influence}</div>
                  <div className="text-[8px] font-bold uppercase text-white/60">Influence Score</div>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/20 p-3 text-center">
                  <div className="font-display text-2xl font-bold">{leader.followers}</div>
                  <div className="text-[8px] font-bold uppercase text-white/60">Followers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <Card className="p-6 space-y-4">
                <SectionTitle title="About / Bio" />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">{leader.about}</p>
                {tier === "registered" && <LockedNote label="Custom banner, AI profile insights, downloads, and verified badge unlock with Verified." />}
              </Card>

              <Card className="p-6 space-y-4">
                <SectionTitle title="Achievements" action={<Award className={`h-4 w-4 ${tc.textAccent}`} />} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {leader.achievements.map((item) => (
                    <div key={item} className={`${tc.softBg} ${tc.softBorder} border rounded-xl p-4`}>
                      <Trophy className={`h-5 w-5 ${tc.textAccent} mb-2`} />
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-5 space-y-4">
                  <SectionTitle title="Media Coverage" />
                  {leader.coverage.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-850 pb-3 last:border-0">
                      <FileText className={`h-4 w-4 ${tc.textAccent}`} />
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{item}</p>
                        <p className="text-[9px] text-gray-400">iGEN Editorial - Article {index + 1}</p>
                      </div>
                    </div>
                  ))}
                  {isLocked(tier, "verified") && <LockedNote label="SME/ASME editorial articles are available for higher-tier Verified and Enterprise leaders." />}
                </Card>

                <Card className="p-5 space-y-4">
                  <SectionTitle title="Interviews" />
                  {leader.interviews.map((item) => (
                    <div key={item} className="rounded-xl bg-gray-50 dark:bg-gray-900 p-3 flex items-center gap-3">
                      <Mic className={`h-4 w-4 ${tc.textAccent}`} />
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{item}</p>
                    </div>
                  ))}
                  <Link href="/eoi" className={`${tc.button} rounded-lg py-2.5 text-xs font-bold flex items-center justify-center gap-1.5`}>
                    <Calendar className="h-3.5 w-3.5" /> Book Executive Interview
                  </Link>
                </Card>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-5">
              <Card className="overflow-hidden">
                <div className={`bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} p-4 text-white`}>
                  <h3 className="font-bold text-sm">Lead Generation</h3>
                  <p className="text-[10px] text-white/75">{tc.leadGen}</p>
                </div>
                <div className="p-4 space-y-2">
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-purple-500" placeholder="Work email" />
                  <select className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none">
                    <option>Book meeting</option>
                    <option>Media inquiry</option>
                    <option>Partnership</option>
                    <option>Invite to awards</option>
                  </select>
                  <textarea rows={3} className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-purple-500 resize-none" placeholder="Message" />
                  <button className={`${tc.button} w-full rounded-lg py-2.5 text-xs font-bold`}>
                    Book Meeting CTA
                  </button>
                </div>
              </Card>

              <Card className="p-4 space-y-3">
                <SectionTitle title="Analytics" action={tier === "registered" ? <Lock className="h-3.5 w-3.5 text-gray-400" /> : <BarChart2 className={`h-3.5 w-3.5 ${tc.textAccent}`} />} />
                {tier === "registered" ? (
                  <LockedNote label="Profile analytics are locked for free leaders." />
                ) : (
                  <div className="space-y-2">
                    {[
                      { label: "Profile Views", value: tier === "top" ? "82.4K" : "14.8K", change: "+24%" },
                      { label: "Business Enquiries", value: tier === "top" ? "328" : "64", change: "+19%" },
                      { label: "Media Mentions", value: tier === "top" ? "1,240" : "186", change: "+31%" }
                    ].map((stat) => (
                      <div key={stat.label} className="flex justify-between text-xs">
                        <span className="text-gray-500">{stat.label}</span>
                        <span className="font-bold text-gray-950 dark:text-white">{stat.value} <span className="text-emerald-500 text-[9px]">{stat.change}</span></span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card className="p-4 space-y-3">
                <SectionTitle title="Premium Assets" />
                {[
                  { label: "Download profile brief", icon: Download, locked: tier === "registered" },
                  { label: "AI leadership insights", icon: Sparkles, locked: tier === "registered" },
                  { label: "API access", icon: Zap, locked: tier !== "top" },
                  { label: "Board network map", icon: Users, locked: tier !== "top" }
                ].map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2"><ItemIcon className="h-3.5 w-3.5" />{item.label}</span>
                      {item.locked ? <Lock className="h-3 w-3 text-gray-400" /> : <CheckCircle className="h-3 w-3 text-emerald-500" />}
                    </div>
                  );
                })}
              </Card>

              <UpgradeCTA compact />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (view === "sector") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />
        <TierHero
          title="Leadership by Sector"
          description="Discover sector leaders, rankings, market trends, executive movements, and upgrade pathways for deeper competitive research."
        />
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <Card className="p-4 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-purple-500" placeholder="Search sectors, leaders, companies..." />
            </div>
            <select className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2.5 text-xs outline-none">
              <option>All Regions</option>
              <option>India</option>
              <option>APAC</option>
              <option>Global</option>
            </select>
            <Link href="/eoi" className={`${tc.button} rounded-lg px-4 py-2.5 text-xs font-bold flex items-center gap-1.5`}>
              <Plus className="h-3.5 w-3.5" /> Register Leader
            </Link>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {SECTORS.map((sector) => (
              <Card key={sector.name} className="p-4 hover:border-purple-300 dark:hover:border-purple-900 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className={`h-10 w-10 rounded-xl ${tc.softBg} ${tc.softBorder} border flex items-center justify-center`}>
                    <Globe className={`h-5 w-5 ${tc.textAccent}`} />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500">{sector.growth}</span>
                </div>
                <h3 className="font-bold text-sm text-gray-950 dark:text-white mt-4">{sector.name}</h3>
                <p className="text-[10px] text-gray-500 mt-1">{sector.leaders} leaders tracked</p>
                <p className="text-[10px] text-gray-400 mt-2">Top: <span className="font-bold text-gray-700 dark:text-gray-300">{sector.top}</span></p>
                <p className="text-[10px] text-purple-600 font-semibold mt-2">{sector.signal}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              <Card className="overflow-hidden">
                <div className="bg-purple-600 text-white px-4 py-3 flex items-center justify-between">
                  <h2 className="font-bold text-sm">Top Leaders per Sector</h2>
                  {isLocked(tier, "verified") && <Lock className="h-4 w-4" />}
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-850">
                  {TOP_LEADERS.map((item) => (
                    <div key={item.rank} className="p-4 flex items-center gap-3">
                      <span className="font-display text-lg font-extrabold text-gray-200 dark:text-gray-800 w-6">{item.rank}</span>
                      <div className={`h-9 w-9 rounded-xl ${tc.badgeBg} text-white flex items-center justify-center text-xs font-bold`}>
                        {item.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-950 dark:text-white">{item.name}</p>
                        <p className="text-[9px] text-gray-400">{item.company} - {item.sector}</p>
                      </div>
                      <span className="font-display text-sm font-bold text-purple-600">{item.score}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-5">
              <Card className="p-5 space-y-4">
                <SectionTitle title="Industry Insights" action={<Sparkles className="h-4 w-4 text-amber-500" />} />
                {[
                  "Sector rankings reveal faster movement in AI, healthtech, and clean energy.",
                  "Emerging leaders are gaining share through verified editorial coverage.",
                  "Enterprise users can forecast executive changes and export reports."
                ].map((item) => (
                  <div key={item} className="rounded-xl bg-gray-50 dark:bg-gray-900 p-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {item}
                  </div>
                ))}
                {tier === "registered" && <LockedNote label="Sector rankings, emerging leader lists, and market trend reports unlock with Verified." />}
              </Card>
              <UpgradeCTA compact />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
      <SubMenuTabs />
      <TierHero
        title="All Leadership Sectors"
        description="Use the complete sector directory, featured sectors, statistics, heatmaps, exports, and saved dashboards to navigate leadership intelligence."
      />
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Leaders", value: "58,900+", icon: Users },
            { label: "Verified Profiles", value: "12,640", icon: CheckCircle },
            { label: "Enterprise Leaders", value: "1,770", icon: Crown },
            { label: "Sectors Covered", value: "50+", icon: Globe }
          ].map((stat) => {
            const StatIcon = stat.icon;
            return (
              <Card key={stat.label} className="p-5">
                <StatIcon className={`h-5 w-5 ${tc.textAccent}`} />
                <div className="font-display text-2xl font-bold text-gray-950 dark:text-white mt-3">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase text-gray-400">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {(tier === "verified" || tier === "top") && (
          <Card className="p-5 space-y-4">
            <SectionTitle title="Featured Sectors" action={<Star className="h-4 w-4 text-amber-500" />} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {SECTORS.slice(0, 4).map((sector) => (
                <div key={sector.name} className={`${tc.softBg} ${tc.softBorder} border rounded-xl p-4`}>
                  <p className="font-bold text-sm text-gray-950 dark:text-white">{sector.name}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{sector.signal}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="overflow-hidden">
          <div className="p-4 flex flex-wrap gap-3 items-center border-b border-gray-200 dark:border-gray-800">
            <div className="relative flex-1 min-w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-purple-500" placeholder="Search full sector directory..." />
            </div>
            <button className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2.5 text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5" /> Advanced Filters
              {tier === "registered" && <Lock className="h-3 w-3" />}
            </button>
            <button className={`${tc.button} rounded-lg px-3 py-2.5 text-xs font-bold flex items-center gap-1.5`}>
              <Download className="h-3.5 w-3.5" /> Export
              {tier !== "top" && <Lock className="h-3 w-3" />}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-gray-900 text-[9px] uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-bold">Sector</th>
                  <th className="px-4 py-3 font-bold">Leader Count</th>
                  <th className="px-4 py-3 font-bold">Verified</th>
                  <th className="px-4 py-3 font-bold">Enterprise</th>
                  <th className="px-4 py-3 font-bold">Country Rank</th>
                  <th className="px-4 py-3 font-bold">Heatmap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                {DIRECTORY_ROWS.map((row) => (
                  <tr key={row.sector} className="hover:bg-gray-50 dark:hover:bg-gray-900/60">
                    <td className="px-4 py-3 font-bold text-gray-950 dark:text-white">{row.sector}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.leaders}</td>
                    <td className="px-4 py-3 text-emerald-600 font-bold">{row.verified}</td>
                    <td className="px-4 py-3 text-amber-600 font-bold">{row.top}</td>
                    <td className="px-4 py-3 text-gray-500">{row.country}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                        row.heat === "Very High" ? "bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300" :
                        row.heat === "High" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" :
                        "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300"
                      }`}>
                        {row.heat}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-5 space-y-3">
            <SectionTitle title="Industry Statistics" />
            {["Leadership heatmaps", "Country rankings", "AI recommendations", "Saved dashboards"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-900 p-3">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{item}</span>
                {tier === "top" || (tier === "verified" && item !== "Country rankings") ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Lock className="h-3.5 w-3.5 text-gray-400" />}
              </div>
            ))}
          </Card>
          <Card className="p-5 space-y-3">
            <SectionTitle title="Revenue Opportunities" />
            {["Featured Leader Profile", "Sponsored Leadership Stories", "PR and Media Coverage", "Leadership Awards"].map((item) => (
              <Link key={item} href="/eoi" className="flex items-center justify-between rounded-lg bg-purple-50 dark:bg-purple-950/20 p-3 text-xs font-bold text-purple-700 dark:text-purple-300">
                {item}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </Card>
          <UpgradeCTA />
        </div>
      </section>
    </div>
  );
}

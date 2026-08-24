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
  Activity
} from "lucide-react";

interface Props {
  submenuSlug: string; // my | feed | activities | contribution
  viewSlug: string;    // all | likes | comments | analytics
}

type SubmenuType = "my" | "activities" | "contribution";

function normalizeSubmenu(slug: string): SubmenuType {
  if (slug === "activities") return "activities";
  if (slug === "contribution") return "contribution";
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
  contribution: {
    label: "My Contribution Workspace",
    sublabel: "Publishing Dashboard, Drafts & Article Submissions",
    icon: FileEdit,
    gradFrom: "from-purple-600",
    gradTo: "to-indigo-700",
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

const MY_SUBMISSIONS = [
  { id: "sub-1", title: "Multimodal Logistics Corridors: Accelerating Indo-EU Bilateral Trade", date: "July 15, 2026", status: "Published", views: "1,420 Views", color: "bg-emerald-50 text-emerald-600" },
  { id: "sub-2", title: "Sovereign AI Infrastructure Investment Playbook for SMEs", date: "July 19, 2026", status: "Under Review", views: "Editorial Queue", color: "bg-amber-50 text-amber-600" },
  { id: "sub-3", title: "Green Hydrogen Tariff Arbitrage Across Gujarat Ports", date: "July 20, 2026", status: "Draft Saved", views: "In Progress", color: "bg-gray-100 text-gray-600" }
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
  const basePath = "/en/news-poc/my-news";

  const [activeActivityView, setActiveActivityView] = useState(viewSlug || "all");

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
              { slug: "contribution", label: "My Contribution Workspace" }
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
              Manage Interests
            </Link>
            <Link href="/eoi" className="bg-white/15 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-white/25 transition-all">
              Upgrade Pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  // VIEW 1: MY NEWS (Personalized Feed)
  if (activeSubmenu === "my") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title="My Sector Trade News Feed"
          description="Personalized news stream matching your selected sector interests, followed companies, and country corridors."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <Card className="p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <RefreshCw className="h-4 w-4 text-blue-500 animate-spin-slow" />
              <span className="font-bold text-gray-900 dark:text-white">Refreshed 2m ago</span>
              <span className="text-gray-400">· 12 new items matching your profile</span>
            </div>
            <button className={`${cfg.button} rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1.5`}>
              <RefreshCw className="h-3.5 w-3.5" /> Refresh Stream
            </button>
          </Card>
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
          title={
            activeActivityView === "likes"
              ? "My Liked Stories Archive"
              : activeActivityView === "comments"
              ? "My Comment History & Discussions Log"
              : activeActivityView === "analytics"
              ? "My Trade-News Analytics & Reading Insights (Pro)"
              : "My Activities & Engagement Dashboard"
          }
          description="Track your likes, comments, saved bookmarks, reading trends, and export analytics PDF reports."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          
          {/* Sub-view: Likes */}
          {activeActivityView === "likes" && (
            <div className="space-y-4">
              <SectionTitle title="Liked Stories (38 Items)" action={<Heart className="h-4 w-4 text-red-500 fill-red-500" />} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LIKED_STORIES.map((story) => (
                  <Card key={story.id} className="p-4 space-y-2 hover:border-red-400 transition-all">
                    <span className="text-[8px] font-bold text-blue-600 uppercase">{story.sector}</span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{story.title}</h4>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1 border-t border-gray-100 dark:border-gray-850">
                      <span>{story.date}</span>
                      <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{story.views}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Sub-view: Comments */}
          {activeActivityView === "comments" && (
            <div className="space-y-4">
              <SectionTitle title="My Comment History (19 Comments)" action={<MessageSquare className="h-4 w-4 text-emerald-500" />} />
              <div className="space-y-3">
                {MY_COMMENTS_LOG.map((c) => (
                  <Card key={c.id} className="p-4 space-y-2">
                    <span className="text-[9px] text-gray-400">On article: <strong className="text-gray-900 dark:text-white">{c.article}</strong></span>
                    <p className="text-xs text-gray-700 dark:text-gray-300 italic">"{c.comment}"</p>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1 border-t border-gray-100 dark:border-gray-850">
                      <span>{c.date}</span>
                      <span className="text-emerald-500 font-bold">👍 {c.upvotes} helpful upvotes</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Sub-view: Analytics */}
          {activeActivityView === "analytics" && (
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-slate-950 to-[#0d213a] text-white border border-emerald-900/60 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Trade-News Intelligence Score</span>
                    <div className="font-display text-3xl font-bold text-white mt-1">88 / 100</div>
                    <p className="text-xs text-slate-300 font-normal mt-0.5">High reading diversity across Semiconductors, Bilateral Trade, and Clean Energy.</p>
                  </div>
                  <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0 flex items-center gap-1.5">
                    <Download className="h-3.5 w-3.5" /> Export Analytics PDF
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                    <span className="text-slate-400 block text-[9px] uppercase">Top Read Sector</span>
                    <span className="font-bold text-white block text-sm">Semiconductors (42%)</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                    <span className="text-slate-400 block text-[9px] uppercase">Total Hours Read</span>
                    <span className="font-bold text-emerald-400 block text-sm">12.5 Hours (Month)</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                    <span className="text-slate-400 block text-[9px] uppercase">Reading Consistency</span>
                    <span className="font-bold text-amber-400 block text-sm">🔥 5-Day Active Streak</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Sub-view: Overview / All */}
          {activeActivityView === "all" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Bookmarked Articles", val: "14 Items", icon: Bookmark, color: "text-blue-500" },
                  { label: "Liked Stories", val: "38 Likes", icon: Heart, color: "text-red-500" },
                  { label: "Comments Posted", val: "19 Comments", icon: MessageSquare, color: "text-emerald-500" },
                  { label: "Reading Time", val: "12.5 Hours", icon: Clock, color: "text-purple-500" }
                ].map((act, idx) => {
                  const AIcon = act.icon;
                  return (
                    <Card key={idx} className="p-4 space-y-1.5">
                      <AIcon className={`h-5 w-5 ${act.color}`} />
                      <span className="text-[9px] font-bold text-gray-400 uppercase block">{act.label}</span>
                      <div className="font-display text-lg font-bold text-gray-900 dark:text-white">{act.val}</div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

        </section>
      </div>
    );
  }

  // VIEW 3: MY CONTRIBUTION WORKSPACE
  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
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
            { label: "Total Views", val: "1,420 Views", sub: "+24% This Month", color: "text-emerald-500" }
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
              <input className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-purple-500" placeholder="Enter headline..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Target Sector</label>
                <select className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none font-bold">
                  <option>Semiconductors (S46)</option>
                  <option>AI & Cyber Security (S02)</option>
                  <option>Logistics & Supply Chain (S43)</option>
                  <option>Energy & Sustainability (S17)</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Content Type</label>
                <select className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none font-bold">
                  <option>Trade Analysis Article</option>
                  <option>Press Release</option>
                  <option>SME Column / Opinion</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Executive Summary / Abstract</label>
              <textarea rows={2} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-purple-500" placeholder="Brief 2-line summary..." />
            </div>

            <div>
              <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Article Body Content</label>
              <textarea rows={5} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-purple-500" placeholder="Write or paste your article content here..." />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-850">
              <button className="border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900">
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
                    <td className="p-3.5 text-gray-400">{sub.date}</td>
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

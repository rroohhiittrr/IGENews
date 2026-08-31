"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import SMEAllCommunityView from "./SMEAllCommunityView";
import SMETopCommunityView from "./SMETopCommunityView";
import LeaderAllCommunityView from "./LeaderAllCommunityView";
import LeaderTopCommunityView from "./LeaderTopCommunityView";
import ReaderAllCommunityView from "./ReaderAllCommunityView";
import ReaderTopCommunityView from "./ReaderTopCommunityView";
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
  HelpCircle,
  Package
} from "lucide-react";

interface Props {
  trackSlug: string; // sme | sme-asme | reader | leader | expo | igen-expo
  viewSlug: string;  // all | top | ific | importers | ifec | exporters | service | services
}

type Track = "sme" | "reader" | "leader" | "expo";

function normalizeTrack(slug: string): Track {
  if (slug === "sme" || slug === "sme-asme") return "sme";
  if (slug === "reader") return "reader";
  if (slug === "leader") return "leader";
  return "expo";
}

const TRACK_CONFIG: Record<Track, {
  label: string;
  sublabel: string;
  icon: ComponentType<{ className?: string }>;
  gradFrom: string;
  gradTo: string;
  button: string;
  views: { slug: string; label: string }[];
}> = {
  sme: {
    label: "SME & ASME Community",
    sublabel: "Private Subject Matter Expert Network & Advisory Logs",
    icon: Award,
    gradFrom: "from-blue-600",
    gradTo: "to-indigo-700",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    views: [
      { slug: "all", label: "All SMEs & ASMEs" },
      { slug: "top", label: "Top SME Leaderboard" }
    ]
  },
  reader: {
    label: "Reader Community",
    sublabel: "Open Reader Discussion Forums & Gamified Badges",
    icon: Users,
    gradFrom: "from-emerald-600",
    gradTo: "to-teal-700",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    views: [
      { slug: "all", label: "All Reader Threads" },
      { slug: "top", label: "Top Readers Board" }
    ]
  },
  leader: {
    label: "Leader Community",
    sublabel: "Executive C-Suite Roundtable & Leadership Directory",
    icon: Crown,
    gradFrom: "from-purple-600",
    gradTo: "to-indigo-700",
    button: "bg-purple-600 hover:bg-purple-700 text-white",
    views: [
      { slug: "all", label: "All Leaders Directory" },
      { slug: "top", label: "Top Leaders Ranking" }
    ]
  },
  expo: {
    label: "IGEN Expo Community",
    sublabel: "Importers (IFIC), Exporters (IFEC) & Service Providers",
    icon: Target,
    gradFrom: "from-amber-500",
    gradTo: "to-orange-600",
    button: "bg-amber-500 hover:bg-amber-600 text-gray-950",
    views: [
      { slug: "ific", label: "Importers (IFIC)" },
      { slug: "ifec", label: "Exporters (IFEC)" },
      { slug: "service", label: "Service Providers" }
    ]
  }
};

const SME_EXPERTS_SAMPLE = [
  { name: "Dr. Aris Thorne", role: "AI & Sovereign Datacenters SME", company: "Apex Tech Labs", location: "India 🇮🇳", rating: "4.9 ★", consults: "142 Consultations", badge: "VERIFIED SME" },
  { name: "Meera Deshmukh", role: "Bilateral Trade Compliance SME", company: "TradeShield Legal", location: "UAE 🇦🇪", rating: "4.9 ★", consults: "98 Consultations", badge: "VERIFIED SME" },
  { name: "Karan Patel", role: "Clean Hydrogen Grid SME", company: "SunGrid Solutions", location: "Germany 🇩🇪", rating: "4.8 ★", consults: "76 Consultations", badge: "ASSOCIATE SME" },
  { name: "Siddharth Rao", role: "Semicon OSAT Packaging SME", company: "ChipCraft India", location: "Singapore 🇸🇬", rating: "4.9 ★", consults: "115 Consultations", badge: "VERIFIED SME" }
];

const LEADERS_SAMPLE = [
  { name: "Sultan Ahmed bin Sulayem", role: "Group Chairman & CEO", company: "DP World 🇦🇪", sector: "Port Logistics", score: 98.4, badge: "C-SUITE LEADER" },
  { name: "Tim Cook", role: "CEO", company: "Apple 🇺🇸", sector: "Electronics Mfg", score: 99.1, badge: "C-SUITE LEADER" },
  { name: "Christian Bruch", role: "CEO", company: "Siemens Energy 🇩🇪", sector: "Clean Energy", score: 95.8, badge: "C-SUITE LEADER" },
  { name: "N. Chandrasekaran", role: "Chairman", company: "Tata Sons 🇮🇳", sector: "Conglomerate", score: 97.9, badge: "C-SUITE LEADER" }
];

const EXPO_IMPORTERS_SAMPLE = [
  { company: "German BioPharma GmbH", country: "Germany 🇩🇪", category: "Active Pharmaceutical Ingredients", requirement: "Seeking 25MT Phytochemical Extracts", budget: "$420,000", badge: "IFIC FOUNDING IMPORTER" },
  { company: "Dubai Solar Utilities", country: "UAE 🇦🇪", category: "Clean Energy Infrastructure", requirement: "10,000 Monocrystalline PV Modules (550W)", budget: "$1.2 Million", badge: "IFIC VERIFIED IMPORTER" }
];

const EXPO_EXPORTERS_SAMPLE = [
  { company: "Hosur Micro-Substrates Pvt Ltd", country: "India 🇮🇳", category: "Semiconductors & OSAT", product: "Silicon Interposer Wafers & Substrates", capacity: "50,000 units/mo", badge: "IFEC FOUNDING EXPORTER" },
  { company: "AeroFreight Logistics Pvt Ltd", country: "India 🇮🇳", category: "Freight Logistics", product: "IMEC Multimodal Container Freight", capacity: "Global Reach", badge: "IFEC VERIFIED EXPORTER" }
];

const EXPO_SERVICES_SAMPLE = [
  { company: "TÜV Rheinland India", service: "EU CE Mark & ISO Certification", location: "India 🇮🇳", rating: "4.9 ★", clients: "1,200+ Exporters" },
  { company: "Standard Chartered Trade Finance", service: "Letter of Credit & Bill Discounting", location: "Global 🌐", rating: "4.9 ★", clients: "3,500+ Clients" }
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

export default function NewsPOCCommunitiesSubmenu({ trackSlug, viewSlug }: Props) {
  const router = useRouter();
  const activeTrack = normalizeTrack(trackSlug);
  const cfg = TRACK_CONFIG[activeTrack];
  const IconComp = cfg.icon;
  const basePath = "/en/poc-v2/communities";

  const currentView = cfg.views.some((v) => v.slug === viewSlug) ? viewSlug : cfg.views[0].slug;

  const SubMenuHeader = () => (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="flex flex-col gap-3 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => router.push(basePath)}
            className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all mr-1"
            aria-label="Go back to Communities main page"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className={`bg-gradient-to-r ${cfg.gradFrom} ${cfg.gradTo} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-xs`}>
            <IconComp className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold">{cfg.label}</span>
          </div>

          <div className="flex gap-1 flex-wrap">
            {(["sme", "reader", "leader", "expo"] as Track[]).map((t) => (
              <button
                key={t}
                onClick={() => router.push(`${basePath}/${t}/${TRACK_CONFIG[t].views[0].slug}`)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  activeTrack === t
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {TRACK_CONFIG[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* View switcher sub-tabs */}
        <div className="flex gap-2 pt-1 border-t border-gray-100 dark:border-gray-850">
          <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center">Sub-Views:</span>
          {cfg.views.map((v) => (
            <button
              key={v.slug}
              onClick={() => router.push(`${basePath}/${activeTrack}/${v.slug}`)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                currentView === v.slug
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-emerald-500"
              }`}
            >
              {v.label}
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
              Join Track
            </Link>
            <Link href="/eoi" className="bg-white/15 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-white/25 transition-all">
              Upgrade Badge
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  // ══════════════════════════════════════════════════════════════════
  // TRACK 1: SME & ASME COMMUNITY
  // ══════════════════════════════════════════════════════════════════
  if (activeTrack === "sme") {
    if (currentView === "all") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuHeader />
          <SMEAllCommunityView />
        </div>
      );
    }

    if (currentView === "top") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuHeader />
          <SMETopCommunityView />
        </div>
      );
    }

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title={currentView === "top" ? "Top SME & ASME Contributors Leaderboard" : "SME & ASME Subject Matter Expert Directory"}
          description="Access domain specialists, participating technical threads, live AMAs, and advisory logs."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <div className="space-y-4">
            <SectionTitle
              title={currentView === "top" ? "Top 10 SME Advisory Contributors" : "Verified SME & ASME Directory"}
              action={<span className="text-[10px] font-bold text-blue-600">4,800+ Experts Active</span>}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SME_EXPERTS_SAMPLE.map((exp, idx) => (
                <Card key={idx} className="p-5 space-y-3 hover:border-blue-500 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                      {exp.badge}
                    </span>
                    <span className="text-amber-500 text-[10px] font-bold">{exp.rating}</span>
                  </div>

                  <h3 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">{exp.name}</h3>
                  <p className="text-[10px] text-gray-500 font-semibold">{exp.role}</p>
                  <p className="text-[9px] text-gray-400">{exp.company} · {exp.location}</p>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[9px]">
                    <span className="text-gray-400">{exp.consults}</span>
                    <Link href="/eoi" className="bg-blue-600 text-white font-bold px-3 py-1 rounded-lg">
                      Request Consultation
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

  // ══════════════════════════════════════════════════════════════════
  // TRACK 2: READER COMMUNITY
  // ══════════════════════════════════════════════════════════════════
  if (activeTrack === "reader") {
    if (currentView === "all") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuHeader />
          <ReaderAllCommunityView />
        </div>
      );
    }

    if (currentView === "top") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuHeader />
          <ReaderTopCommunityView />
        </div>
      );
    }

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title={currentView === "top" ? "Top Reader Contributors & Badges" : "Reader Community Discussions Feed"}
          description="Engage in public article threads, earn contributor badges, and climb the reader rank."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <div className="space-y-4">
            <SectionTitle title="Public Discussion Feed" action={<MessageSquare className="h-4 w-4 text-emerald-500" />} />
            <div className="space-y-3">
              {[
                { title: "Should India accelerate semiconductor equipment import tariff exemptions?", author: "Rajesh Sharma", time: "30m ago", replies: "24 replies", likes: "68 likes" },
                { title: "Impact of new GoI Phytochemical export benchmarks on small scale units", author: "Dr. Ananya Varma", time: "2h ago", replies: "42 replies", likes: "112 likes" }
              ].map((t, idx) => (
                <Card key={idx} className="p-4 space-y-2 hover:border-emerald-500 transition-all">
                  <span className="text-[8px] font-bold text-emerald-600 uppercase">READER THREAD</span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{t.title}</h4>
                  <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                    <span>By {t.author} · {t.time}</span>
                    <span className="font-bold text-emerald-600">{t.replies} · {t.likes}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // TRACK 3: LEADER COMMUNITY
  // ══════════════════════════════════════════════════════════════════
  if (activeTrack === "leader") {
    if (currentView === "all") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuHeader />
          <LeaderAllCommunityView />
        </div>
      );
    }

    if (currentView === "top") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuHeader />
          <LeaderTopCommunityView />
        </div>
      );
    }

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title={currentView === "top" ? "Top C-Suite Leaders Influence Ranking" : "C-Suite Executive Leader Directory"}
          description="Exclusive networking for CEOs, Founders, and Trade Ministers in private executive roundtables."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          <div className="space-y-4">
            <SectionTitle title="Executive Leader Profiles" action={<Crown className="h-4 w-4 text-purple-500" />} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {LEADERS_SAMPLE.map((l, idx) => (
                <Card key={idx} className="p-5 space-y-3 hover:border-purple-500 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-600">
                      {l.badge}
                    </span>
                    <span className="font-display text-xs font-bold text-purple-600">{l.score}</span>
                  </div>

                  <h3 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors leading-snug">{l.name}</h3>
                  <p className="text-[10px] text-gray-500 font-semibold">{l.role}</p>
                  <p className="text-[9px] text-gray-400">{l.company} · {l.sector}</p>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[9px]">
                    <span className="text-gray-400">Board Member</span>
                    <Link href="/eoi" className="bg-purple-600 text-white font-bold px-3 py-1 rounded-lg">
                      Request Roundtable
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

  // ══════════════════════════════════════════════════════════════════
  // TRACK 4: IGEN EXPO COMMUNITY (IFIC / IFEC / SERVICES)
  // ══════════════════════════════════════════════════════════════════
  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
      <SubMenuHeader />
      <HeroBanner
        title={
          currentView === "ific"
            ? "India Foreign Importers Community (IFIC)"
            : currentView === "ifec"
            ? "India Foreign Exporters Community (IFEC)"
            : "Trade Service Providers Directory"
        }
        description="Cross-link to igenexpo.com founding channels — access B2B buying & selling RFQs and logistics partners."
      />

      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
        
        {currentView === "ific" && (
          <div className="space-y-4">
            <SectionTitle title="Active Importers & Buying RFQs (IFIC)" action={<span className="text-[10px] font-bold text-amber-500">15,000+ RFQs</span>} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXPO_IMPORTERS_SAMPLE.map((imp, idx) => (
                <Card key={idx} className="p-5 space-y-3 hover:border-amber-500 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600">{imp.badge}</span>
                    <span className="text-[9px] text-gray-400">{imp.country}</span>
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug">{imp.company}</h3>
                  <p className="text-[10px] text-gray-500 font-semibold">{imp.category}</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-normal">{imp.requirement}</p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[9px]">
                    <span className="font-display text-sm font-bold text-emerald-600">{imp.budget}</span>
                    <Link href="/eoi" className="bg-amber-500 text-gray-950 font-bold px-3 py-1.5 rounded-lg">
                      Submit Quotation
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === "ifec" && (
          <div className="space-y-4">
            <SectionTitle title="Active Exporters & Product Showcase (IFEC)" action={<Package className="h-4 w-4 text-emerald-500" />} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXPO_EXPORTERS_SAMPLE.map((exp, idx) => (
                <Card key={idx} className="p-5 space-y-3 hover:border-emerald-500 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">{exp.badge}</span>
                    <span className="text-[9px] text-gray-400">{exp.country}</span>
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug">{exp.company}</h3>
                  <p className="text-[10px] text-gray-500 font-semibold">{exp.category}</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-normal">{exp.product}</p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[9px]">
                    <span className="text-gray-400">Capacity: {exp.capacity}</span>
                    <Link href="/eoi" className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg">
                      Request Sample / RFQ
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === "service" && (
          <div className="space-y-4">
            <SectionTitle title="Logistics, Certification & Finance Partners" action={<Briefcase className="h-4 w-4 text-blue-500" />} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXPO_SERVICES_SAMPLE.map((srv, idx) => (
                <Card key={idx} className="p-5 space-y-3 hover:border-blue-500 transition-all">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-gray-900 dark:text-white">{srv.company}</h3>
                    <span className="text-amber-500 text-[10px] font-bold">{srv.rating}</span>
                  </div>
                  <p className="text-xs text-blue-600 font-semibold">{srv.service}</p>
                  <p className="text-[9px] text-gray-400">{srv.location} · {srv.clients}</p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[9px]">
                    <span className="text-gray-400">Verified Partner</span>
                    <Link href="/eoi" className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg">
                      Contact Partner
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}

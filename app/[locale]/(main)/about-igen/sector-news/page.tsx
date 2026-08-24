"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ─────────────────────────────────────────────────────────────────────

const architectureFeatures = [
  "Dedicated Sector Landing Page",
  "50 Industries within the Sector",
  "Sector Overview with Trade Context",
  "Export Leaders in the Sector",
  "Import Signal Tracking",
  "Sector Ranking Index",
  "Leader Directory for that Sector",
  "Corporate Presence Map",
  "Most Engaged Articles",
  "Sector Reports (Quarterly, Pro+)"
];

const intelligenceLayer = [
  { 
    title: "Sector Overview Page", 
    desc: "A structured summary of the sector's current trade position, key bilateral relationships, dominant industries, and policy environment. Updated quarterly." 
  },
  { 
    title: "Top Industries in Sector", 
    desc: "The 50 industries within each sector, ranked by IGEN activity, article volume, and reader engagement. Tracks which industries within a sector are rising and which are stagnant." 
  },
  { 
    title: "Export Leaders", 
    desc: "Companies, countries, and trade corridors driving export growth within the sector. Who is winning. Where they are winning. Why." 
  },
  { 
    title: "Import Signals", 
    desc: "Inbound trade flows, import dependency patterns, and opportunities for import substitution. Critical for manufacturing, policy, and supply chain professionals." 
  },
  { 
    title: "Sector Ranking Index", 
    desc: "A structured ranking of all 20 sectors by IGEN activity — a live pulse of which sectors are India's most active trade intelligence zones." 
  }
];

const engagementLayer = [
  { 
    title: "Most Engaged Articles", 
    desc: "Reader-validated, not editorially selected. The articles that trade professionals in this sector found most relevant, most shareable, most worth discussing." 
  },
  { 
    title: "Leader Voices in Sector", 
    desc: "Which CEOs, CFOs, and Trade Secretaries are most active in this sector. Their insights, interviews, and published monthly articles — curated for sector relevance." 
  },
  { 
    title: "Corporate Presence", 
    desc: "Which companies have active Corporate Profiles on IGEN, and which are being covered by editorial — giving a complete picture of corporate activity in the sector." 
  },
  { 
    title: "Sector Polls", 
    desc: "Live reader polls on key questions affecting the sector — sentiment surveys, outlook polls, risk assessments. Real professional opinion, not media conjecture." 
  },
  { 
    title: "FLC Insights", 
    desc: "Monthly insights published by Founding Leaders (FLC) who operate within this sector. Peer-level intelligence from practitioners, not journalists." 
  }
];

const reports = [
  { 
    title: "Quarterly Sector Report (Pro+)", 
    desc: "A structured 15–30 page intelligence document covering sector performance, key developments, trade flow analysis, export/import signals, risk factors, and outlook. Available to Pro Readers and above." 
  },
  { 
    title: "Industry Depth Brief", 
    desc: "A focused brief on a specific industry within the sector — drill-down intelligence for specialists who need more than overview-level coverage." 
  },
  { 
    title: "Risk Dashboard", 
    desc: "Sector-specific risk indicators: policy risk, geopolitical trade risk, supply chain risk, regulatory risk. Updated monthly." 
  },
  { 
    title: "Sector Outlook", 
    desc: "Forward-looking intelligence on where the sector is heading — export opportunity forecasts, bilateral trade development signals, and emerging competition." 
  },
  { 
    title: "Sector Leader Directory", 
    desc: "A structured directory of the most active leaders in the sector — CEOs, founders, trade secretaries, and emerging voices. Searchable. SEO-indexed." 
  }
];

const rankingSnapshot = [
  { rank: 1, sector: "Technology & IT", articles: 85, industries: 42, engagement: "High" },
  { rank: 2, sector: "Automotive & Auto Components", articles: 72, industries: 38, engagement: "High" },
  { rank: 3, sector: "Pharmaceuticals & Healthcare", articles: 68, industries: 35, engagement: "Rising" },
  { rank: 18, sector: "Textiles & Apparel", articles: 45, industries: 28, engagement: "Stable" },
  { rank: 20, sector: "Heavy Machinery", articles: 31, industries: 22, engagement: "Opportunity" },
];

const planComparison = [
  { feature: "Read Sector Articles", free: "✓", pro: "✓" },
  { feature: "Sector Overview Pages", free: "✓", pro: "✓" },
  { feature: "Follow 1 Sector", free: "✓", pro: "—" },
  { feature: "Follow 5 Sectors", free: "—", pro: "✓" },
  { feature: "Quarterly Sector Reports", free: "—", pro: "✓" },
  { feature: "Industry Depth Briefs", free: "—", pro: "✓" },
  { feature: "Risk Dashboard", free: "—", pro: "✓" },
  { feature: "Sector Engagement Analytics", free: "—", pro: "✓" },
];

const useCases = [
  { 
    role: "Industry Heads & Sr. Managers", 
    desc: "Live inside one or two sectors and need the deepest possible coverage of their domain — not surface-level news." 
  },
  { 
    role: "Export Promotion Bodies", 
    desc: "Tracking which sectors are gaining bilateral trade momentum and where Indian exporters have competitive opportunity." 
  },
  { 
    role: "Trade Consultants", 
    desc: "Advising companies across multiple sectors — needing both breadth (all 20 sectors) and depth (50 industries per sector)." 
  },
  { 
    role: "IGEN EXPO Exhibitors", 
    desc: "Using Sector News to prepare sector intelligence before attending, and to follow up on sector developments after." 
  },
  { 
    role: "Corporate Trade Teams", 
    desc: "Tracking competitor activity, supply chain signals, and sector-level risk within their operating domains." 
  },
  { 
    role: "Founding Leaders (FLC)", 
    desc: "Publish monthly sector insights on IGEN — contributing to the very intelligence ecosystem they consume." 
  },
];

const faqs = [
  { 
    q: "What are the 20 sectors covered on IGEN?", 
    a: "IGEN's 20 sectors are aligned with IGEN EXPO's exhibition architecture and cover the full breadth of India's trade economy. Each sector contains 50 industries. The complete sector list is available on the Sector News hub." 
  },
  { 
    q: "How many industries does IGEN cover across all sectors?", 
    a: "1,000 industries — 50 per sector across all 20 sectors. At full publishing scale, IGEN targets active coverage of all 1,000 industries." 
  },
  { 
    q: "What is a Sector Overview Page?", 
    a: "A structured landing page for each sector — summarising trade position, key industries, export/import signals, active leaders, and bilateral trade relationships. Updated quarterly." 
  },
  { 
    q: "What is a Quarterly Sector Report?", 
    a: "A downloadable PDF report — 15–30 pages covering sector performance, trade flows, key developments, risk signals, and forward outlook. Available to Pro Readers." 
  },
  { 
    q: "Is Sector News free to access?", 
    a: "You can read all sector articles for free. Advanced features like Sector Reports, Risk Dashboards, and following multiple sectors require Pro Reader access." 
  },
  { 
    q: "How is IGEN Sector News aligned with IGEN EXPO?", 
    a: "Both use the same 20-sector taxonomy. IGEN News provides year-round digital intelligence. IGEN EXPO provides annual physical gathering. Together they form a complete trade intelligence and networking ecosystem." 
  },
  { 
    q: "Can I follow more than one sector?", 
    a: "Free readers follow 1 sector. Pro readers follow up to 5 sectors. Emerging Leaders and Corporate members have unlimited sector follows." 
  },
  { 
    q: "What is the Sector Ranking Index?", 
    a: "A live ranking of all 20 sectors by article volume, reader engagement, and trade intelligence activity on IGEN — showing which sectors are most active at any given time." 
  },
  { 
    q: "Can companies appear in Sector News?", 
    a: "Editorial coverage of companies is independent. However, Corporate Plan members gain structured visibility within their sector — corporate profile pages, corporate spotlight features, and co-branded intelligence briefs." 
  },
  { 
    q: "How often is Sector News updated?", 
    a: "All 20 sectors receive minimum 3–5 updates daily. At full scale, IGEN ensures no sector is inactive for more than 24 hours." 
  },
];

// ── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQ({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[var(--color-neutral-light)] dark:divide-[var(--color-neutral-mid)]/20">
      {faqs.map((faq, idx) => (
        <div key={idx} className="py-5">
          <button
            className="flex w-full items-center justify-between gap-4 text-left"
            onClick={() => setOpen(open === idx ? null : idx)}
          >
            <span className="font-semibold text-[var(--color-text-body)]">{faq.q}</span>
            <span className="shrink-0 text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {open === idx ? "−" : "+"}
            </span>
          </button>
          {open === idx && (
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SectorNewsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 12-item mega menu nav */}
      <AboutIGENMegaMenuNav />

      {/* ─── 0. HERO BANNER ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] px-4 py-20 md:px-6 md:py-28">
        {/* subtle background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-neutral-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-light) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
            🟢 Mega Menu 4 — Architecture Layer
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-gold-light,#F0652E)]">
            Your Sector. Your Intelligence. Your Advantage.
          </p>
          <h1 className="mb-5 font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            20 Sector Hubs. 1,000 Industries.
            <br />
            India's Most Structured
            <br />
            Trade Intelligence by Sector.
          </h1>
          <p
            className="mx-auto mb-10 w-full text-base leading-relaxed text-white/80 md:text-lg"
            style={{ maxWidth: "48rem" }}
          >
            IGEN SECTOR NEWS organises all trade intelligence across 20 industry sectors — aligned with the IGEN EXPO model. Each sector is a complete intelligence hub: articles, rankings, leader voices, corporate presence, and expert reports.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sector-news"
              className="rounded-full bg-[var(--color-accent-gold-dark)] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:bg-opacity-90"
            >
              Choose Your Sector →
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Access Sector Reports (Pro)
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 1. WHAT IS SECTOR NEWS? ────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                What is Sector News?
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                India's 20 Digital Exhibition Halls
              </h2>
              <p className="mb-5 text-lg font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                In IGEN's physical exhibition world, every hall is organised by sector. Visitors know exactly where to find their industry, their competitors, their potential partners. There is no confusion. No wandering.
              </p>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                IGEN SECTOR NEWS applies this same architecture digitally. 20 sectors. Each one is a dedicated intelligence hub — not just a content category.
              </p>
              <p className="text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Each sector contains its own articles, rankings, leader directory, corporate presence, engagement analytics, and downloadable reports. This is the deepest sector intelligence available in Indian trade media.
              </p>
            </div>
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 dark:border-blue-400/20 dark:bg-blue-400/5">
              <div className="mb-4 flex items-center justify-center text-5xl">
                🏢 ⇄ 💻
              </div>
              <p className="mb-2 text-center text-lg font-bold text-[var(--color-text-body)]">
                The Intelligence Loop
              </p>
              <p className="text-center text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Each sector page is a complete trade intelligence universe for that industry domain, mirroring the physical structure of IGEN Expo. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. THE 20 SECTOR ARCHITECTURE ────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              The 20 Sector Architecture
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Every Sector Is Its Own Intelligence Hub
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[var(--color-neutral-dark)] dark:text-gray-400">
              IGEN organises all trade coverage across 20 aligned sectors — the same sectors used at IGEN EXPO. These are not arbitrary categories. They represent the real structure of India's trade economy.
            </p>
          </div>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <div className="bg-[var(--color-primary)] p-6 text-center text-white">
              <h3 className="font-bold">What's Inside Each of the 20 Sectors?</h3>
              <p className="mt-1 text-sm text-white/80">This is not categorised news. This is structured sector intelligence.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {architectureFeatures.map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 border-b border-t-0 border-l-0 sm:border-r border-[var(--color-neutral-light)] p-4 dark:border-[var(--color-neutral-mid)]/20"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] text-green-600 dark:bg-green-900/30">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-body)]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. SECTOR INTELLIGENCE LAYER ───────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Sector Intelligence Layer
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Beyond Articles — Deep Structural Intelligence
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {intelligenceLayer.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-md dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-3xl">🔬</div>
                <h3 className="mb-3 font-bold text-[var(--color-text-body)]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. SECTOR ENGAGEMENT LAYER ─────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Sector Engagement Layer
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                The Community Intelligence Within Each Sector
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                It's not just about what is published; it's about how the community reacts. IGEN captures the engagement pulse of professionals working inside the sector to highlight what truly matters.
              </p>
              
              <div className="grid gap-6">
                {engagementLayer.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary)] dark:bg-[var(--color-primary-light)]/10 dark:text-[var(--color-primary-light)]">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="mb-1 font-bold text-[var(--color-text-body)]">{item.title}</h4>
                      <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl border border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 p-8 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
              <div className="mb-6">
                <h4 className="mb-2 font-display text-lg font-bold">Community Analytics</h4>
                <p className="text-sm text-[var(--color-neutral-mid)]">Sample view of sector interaction data</p>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-xl border border-[var(--color-neutral-light)] bg-white p-4 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)]">
                   <div className="mb-2 flex items-center justify-between">
                     <span className="text-xs font-bold uppercase text-[var(--color-neutral-dark)]">Trending Poll: Auto Sector</span>
                     <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700 dark:bg-red-900/30">Live</span>
                   </div>
                   <p className="mb-3 text-sm font-semibold text-[var(--color-text-body)]">Will EV subsidies extension directly increase export output in Q3?</p>
                   <div className="space-y-2 text-xs">
                     <div>
                       <div className="mb-1 flex justify-between"><span className="text-[var(--color-neutral-dark)]">Yes, significantly</span> <span className="font-bold">64%</span></div>
                       <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"><div className="h-full bg-blue-500" style={{width: '64%'}}></div></div>
                     </div>
                     <div>
                       <div className="mb-1 flex justify-between"><span className="text-[var(--color-neutral-dark)]">No, supply chain constraints remain</span> <span className="font-bold">36%</span></div>
                       <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"><div className="h-full bg-gray-400" style={{width: '36%'}}></div></div>
                     </div>
                   </div>
                </div>

                 <div className="rounded-xl border border-[var(--color-neutral-light)] bg-white p-4 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)]">
                   <div className="mb-2 flex items-center justify-between">
                     <span className="text-xs font-bold uppercase text-[var(--color-neutral-dark)]">Active Leaders</span>
                     <span className="text-xs text-[var(--color-neutral-mid)]">Sector: Tech & IT</span>
                   </div>
                   <div className="flex gap-2">
                     {[1,2,3,4,5].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border border-white bg-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-700" style={{ zIndex: 6-i, marginLeft: i > 1 ? '-0.5rem' : 0 }}></div>
                     ))}
                     <span className="ml-2 flex items-center text-xs font-medium text-[var(--color-primary)]">
                       +42 active this week
                     </span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. SECTOR REPORTS LAYER ────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] bg-blue-50/50 px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 dark:bg-blue-900/10 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
             <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] dark:bg-[var(--color-primary-light)]/10 dark:text-[var(--color-primary-light)]">
              Sector Reports
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              From News to Intelligence — The Report Layer
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[var(--color-neutral-dark)] dark:text-gray-400">
              Go completely beyond the daily news cycle. IGEN Sector Reports compile month-on-month and quarterly intelligence into actionable PDF briefs for your strategy team.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {reports.map((report, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="absolute -right-4 -top-4 text-6xl opacity-5">📄</div>
                <h3 className="mb-3 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {report.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {report.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. SECTOR RANKING SNAPSHOT ─────────────────────────────────────── */}
       <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Sector Ranking Snapshot
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Which Sectors Are India's Most Active Trade Zones?
            </h2>
            <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">
              Live ranking of all 20 sectors by article volume, reader engagement, and trade intelligence activity.
            </p>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-[var(--color-neutral-light)]/40 text-xs uppercase tracking-wider text-[var(--color-neutral-mid)] dark:bg-[var(--background)]">
                   <tr>
                     <th className="px-6 py-4 font-bold">Rank</th>
                     <th className="px-6 py-4 font-bold">Sector</th>
                     <th className="px-6 py-4 font-bold">Weekly Articles</th>
                     <th className="px-6 py-4 font-bold">Active Industries</th>
                     <th className="px-6 py-4 font-bold">Engagement</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[var(--color-neutral-light)] dark:divide-[var(--color-neutral-mid)]/20">
                   {rankingSnapshot.map((row, idx) => (
                     <tr key={idx} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                       <td className="whitespace-nowrap px-6 py-4 font-bold text-[var(--color-text-body)]">{row.rank}</td>
                       <td className="whitespace-nowrap px-6 py-4 font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">{row.sector}</td>
                       <td className="whitespace-nowrap px-6 py-4 text-[var(--color-neutral-dark)] dark:text-gray-400">{row.articles}</td>
                       <td className="whitespace-nowrap px-6 py-4 text-[var(--color-neutral-dark)] dark:text-gray-400">{row.industries}</td>
                       <td className="whitespace-nowrap px-6 py-4">
                         <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                           ${row.engagement === 'High' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                             row.engagement === 'Rising' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' :
                             row.engagement === 'Stable' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' :
                             'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300'
                           }
                         `}>
                           {row.engagement}
                         </span>
                       </td>
                     </tr>
                   ))}
                   <tr className="bg-[var(--color-neutral-light)]/20 dark:bg-[var(--background)]">
                     <td colSpan={5} className="py-3 text-center text-xs font-medium text-[var(--color-neutral-mid)]">
                       ... 15 more sectors. Full Ranking Index available to all readers.
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </section>

      {/* ─── 7. ALIGNED WITH IGEN EXPO ──────────────────────────────────────── */}
      <section className="bg-[var(--color-primary)] px-4 py-16 text-white md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-light,#F0652E)]">
                Aligned with IGEN EXPO
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-white md:text-3xl">
                Where Digital Intelligence Meets Physical Exhibition Power
              </h2>
              <p className="mb-8 text-base leading-relaxed text-white/80">
                IGEN SECTOR NEWS is directly aligned with IGEN EXPO's 20-sector framework. Every sector on IGEN NEWS has a corresponding physical exhibition sector at IGEN EXPO. This creates a unique intelligence loop:
              </p>
              
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="mt-1 text-2xl">🔍</div>
                  <div>
                    <h4 className="font-bold">Pre-Expo</h4>
                    <p className="text-sm text-white/70">Professionals use IGEN Sector Intelligence to research sectors before attending.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 text-2xl">📢</div>
                  <div>
                    <h4 className="font-bold">During Expo</h4>
                    <p className="text-sm text-white/70">IGEN NEWS covers live sector developments, leader announcements, and corporate activity from the exhibition floor.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 text-2xl">📊</div>
                  <div>
                    <h4 className="font-bold">Post-Expo</h4>
                    <p className="text-sm text-white/70">IGEN compiles sector intelligence reports, leader spotlight summaries, and bilateral trade signals generated at the event.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="font-bold italic text-white">
                  "IGEN SECTOR NEWS is the year-round intelligence companion to IGEN EXPO's annual gathering."
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               {/* Visual proxy for Digital -> Physical -> Digital loop */}
               <div className="col-span-2 flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-sm">
                 <div className="mb-4 text-4xl">📱</div>
                 <p className="font-bold">Digital Intelligence</p>
                 <p className="text-xs text-white/60">365 Days a Year</p>
               </div>
               <div className="col-span-2 flex items-center justify-center text-2xl text-white/40">
                 ↓ ↻ ↑
               </div>
               <div className="col-span-2 flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/5 p-8 text-center backdrop-blur-sm">
                 <div className="mb-4 text-4xl">🏢</div>
                 <p className="font-bold">Physical Exhibition</p>
                 <p className="text-xs text-white/60">Annual Gathering</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. UPGRADE HOOK ────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Upgrade Hook
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Free Access to Sectors. Pro Access to Intelligence.
            </h2>
            <p className="font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              You can browse any sector. But you track a sector properly only with Pro.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <div className="grid grid-cols-3 divide-x divide-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/40 px-0 py-3 text-center text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)] dark:divide-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)]">
              <div className="px-4">Feature</div>
              <div className="px-4">Free Reader</div>
              <div className="px-4 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                Pro Reader ⭐
              </div>
            </div>
            {planComparison.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 divide-x divide-[var(--color-neutral-light)] border-t border-[var(--color-neutral-light)] text-center dark:divide-[var(--color-neutral-mid)]/20 dark:border-[var(--color-neutral-mid)]/20"
              >
                <div className="px-4 py-4 text-left text-sm font-medium text-[var(--color-text-body)]">
                  {row.feature}
                </div>
                <div className="px-4 py-4 text-sm text-[var(--color-neutral-mid)]">{row.free}</div>
                <div className="px-4 py-4 text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {row.pro}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/reader-plans"
              className="inline-flex rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Upgrade to Pro Reader — ₹24,999/year →
            </Link>
            <p className="mt-2 text-xs font-semibold text-[var(--color-accent-gold-dark)]">
              Founding Member Pricing | First 500 Only
            </p>
          </div>
        </div>
      </section>

      {/* ─── 9. WHO USES SECTOR NEWS? ───────────────────────────────────────── */}
      <section className="border-t border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Who Uses Sector News?
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Built for Sector Specialists, Not General Readers
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <h3 className="mb-3 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {uc.role}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ────────────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              FAQ
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQ faqs={faqs} />
        </div>
      </section>

      {/* ─── 11. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-primary)] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-extrabold text-white md:text-4xl">
            Your Sector Deserves Structured Intelligence,
            <br />
            Not Scattered News
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/80">
            IGEN SECTOR NEWS gives every trade professional a home — a sector hub that knows their industry, tracks their leaders, ranks their companies, and surfaces their opportunities.
          </p>
          
          <div className="mb-10 grid gap-4 text-left sm:grid-cols-2">
             {[
               { tier: "Free Reader", desc: "Explore all 20 sectors. Follow one. Start discovering." },
               { tier: "Pro Reader", desc: "Follow 5 sectors. Download quarterly reports. Track risks and rankings." },
               { tier: "Emerging Leader", desc: "Publish your insight within your sector. Build authority in your domain." },
               { tier: "Corporate", desc: "Claim your sector presence. Be seen by every professional in your industry." },
             ].map((p) => (
               <div key={p.tier} className="rounded-xl border border-white/10 bg-white/10 p-4">
                 <p className="font-bold text-white">{p.tier}</p>
                 <p className="text-sm text-white/70">{p.desc}</p>
               </div>
             ))}
          </div>
          
          <div className="mb-8 rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
             <p className="font-bold text-[var(--color-accent-gold-light,#F0652E)]">
               Founding Member Access — ₹24,999/year. First 500 slots. Price protection for life.
             </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sector-news"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Choose Your Sector
            </Link>
             <Link
              href="/reader-plans"
               className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
            >
              Download Sector Report
            </Link>
            <Link
              href="/reader-plans"
               className="rounded-full bg-[var(--color-accent-gold-dark)] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-opacity-90"
            >
              Claim Corporate Presence
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

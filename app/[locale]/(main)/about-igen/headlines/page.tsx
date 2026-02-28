"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ─────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: "🖊️",
    title: "Editor's Desk",
    desc: "Priyanshi-curated stories covering Top Industry Developments, Policy Impact Headlines, Export-Import Signals, Industry Risk Alerts, and Regulatory Highlights. Updated daily. No opinion. Pure intelligence.",
  },
  {
    icon: "👔",
    title: "Leader Mentions",
    desc: "The people moving markets. CEO Headlines. CFO Signals. Founder Announcements. CXO Movements. Government Trade Officials making policy decisions that affect your sector.",
  },
  {
    icon: "🏢",
    title: "Corporate Spotlight",
    desc: "Major corporate announcements. Expansion moves. M&A highlights. Earnings signals. Companies entering or exiting industries — intelligence that affects supply chains and competition.",
  },
  {
    icon: "🧠",
    title: "Trade Intelligence Highlights",
    desc: "The strategic layer. Top 10 daily developments. Weekly strategic signals. High-impact trade developments. Industry disruption alerts. Long-form strategic reads.",
  },
];

const editorsDesk = [
  {
    title: "Top Industry Story of the Day",
    desc: "The single most impactful industry development across IGEN's 20-sector universe — selected for strategic significance, not click potential.",
  },
  {
    title: "Policy Signal of the Day",
    desc: "One trade policy development that will affect export-import conditions across key sectors in the coming quarter.",
  },
  {
    title: "Risk Alert",
    desc: "One sector or country showing early warning signals — supply chain disruption, regulatory shift, or geopolitical trade tension.",
  },
  {
    title: "Export Opportunity Signal",
    desc: "One bilateral trade development opening new market access or competitive advantage for Indian exporters.",
  },
];

const curationComparison = [
  { feature: "Daily Scanning", without: "45–90 mins scanning news", with: "10 mins reading what matters" },
  { feature: "Industry Exposure", without: "Random industry exposure", with: "Structured sector intelligence" },
  { feature: "Strategic Stance", without: "Reactionary awareness", with: "Proactive strategic positioning" },
  { feature: "Content Style", without: "Opinion-heavy journalism", with: "Structured trade intelligence" },
  { feature: "Trade Perspective", without: "No export/import angle", with: "Bilateral trade framing always" },
];

const leaderRoles = [
  "CEO", "CFO", "CTO", "Founder", "Chairman", "COO", "Trade Secretary",
  "Managing Director", "CHRO", "CIO", "CSO", "Ambassador", "Commerce Minister"
];

const corporateFocus = [
  { title: "Major Announcements", desc: "Product launches, market entries, strategic partnerships with trade implications." },
  { title: "Expansion Moves", desc: "New geographies, sectors, supply chain changes." },
  { title: "M&A Signals", desc: "Mergers, acquisitions, and consolidation trends that reshape industry landscapes." },
  { title: "Earnings Intelligence", desc: "Not just numbers, but sector implications." },
  { title: "Industry Entry / Exit", desc: "When major players enter or leave an industry, the entire competitive landscape shifts." },
];

const strategicSignals = [
  { title: "Weekly Strategic Signals", desc: "Five high-impact trade developments with sector implications" },
  { title: "Industry Disruption Alerts", desc: "Early warning on technologies, policies, or market movements that will restructure industries" },
  { title: "Strategic Long Reads", desc: "In-depth coverage of bilateral relationships, sector outlooks, and trade architecture shifts" },
];

const planComparison = [
  { feature: "Read Headlines", free: "✓", pro: "✓" },
  { feature: "Download Industry Briefs", free: "—", pro: "✓" },
  { feature: "Weekly Strategic Brief PDF", free: "—", pro: "✓" },
  { feature: "Advanced Sector Filters", free: "—", pro: "✓" },
  { feature: "Leader Alert Notifications", free: "—", pro: "✓" },
  { feature: "Policy Signal Digest", free: "—", pro: "✓" },
];

const priyanshiStandard = [
  { title: "No Exaggeration", desc: "Every headline reflects factual developments. No sensationalism." },
  { title: "No Paid Tone", desc: "Corporate announcements are reported neutrally. No advertorial content." },
  { title: "No Hallucinated Facts", desc: "Every article is sample-checked for accuracy and industry correctness." },
  { title: "No Mis-Tagging", desc: "Every headline is correctly attributed to sector, industry, and country." },
  { title: "Professional Tone", desc: "IGEN speaks to trade professionals. The language reflects that." },
];

const useCases = [
  { role: "Export Directors", desc: "Need to know if a bilateral trade policy shifted overnight." },
  { role: "Industry Consultants", desc: "Advising clients on sector positioning — need the signal before their clients do." },
  { role: "Senior Managers", desc: "Present industry intelligence to leadership — need curated, credible, structured summaries." },
  { role: "Founding Leaders (FLC)", desc: "Publish monthly insights on IGEN — need structured awareness of what's already been covered." },
  { role: "Corporate Trade Heads", desc: "Managing supply chain risk across multiple countries and sectors." },
];

const faqs = [
  {
    q: "What is IGEN HEADLINES?",
    a: "A daily curated layer of the most strategically important trade developments across 20 sectors, 25 leader categories, and 195 countries — selected and reviewed by IGEN's editorial team.",
  },
  {
    q: "How is HEADLINES different from FEED?",
    a: "FEED is volume-driven discovery. HEADLINES is curation-driven authority. Think of FEED as the full newspaper — HEADLINES as the editorial page with the most important stories selected for you.",
  },
  {
    q: "Who curates HEADLINES?",
    a: "Priyanshi leads IGEN's Quality and Governance function. Her team sample-checks all articles for accuracy, tone, and strategic relevance before they qualify for HEADLINES.",
  },
  {
    q: "How often is HEADLINES updated?",
    a: "Daily. With key sections updated throughout the day as significant developments emerge.",
  },
  {
    q: "Can I access HEADLINES on mobile?",
    a: "Yes. IGEN HEADLINES is accessible across web and mobile interfaces.",
  },
  {
    q: "Are Leader Mentions only for Indian leaders?",
    a: "No. IGEN covers 195 countries and tracks leader movements across all bilateral trade relationships with India.",
  },
  {
    q: "What is an Industry Brief?",
    a: "A downloadable PDF summarising key developments in a specific industry or sector — curated weekly and available to Pro Readers.",
  },
  {
    q: "Is Corporate Spotlight paid content?",
    a: "No. Corporate Spotlight is independently curated editorial coverage of significant corporate trade developments. Corporate Plan subscribers gain structured visibility, but HEADLINES content is editorially independent.",
  },
  {
    q: "Can I get HEADLINES delivered by email?",
    a: "Pro Readers receive structured weekly digests. Newsletter alerts for breaking policy signals are also available.",
  },
  {
    q: "How do I become a featured leader in Leader Mentions?",
    a: "Emerging Leader Plan subscribers who publish industry insights and are mentioned in trade coverage qualify for Leader Mentions. Learn more under Leader News.",
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

export default function HeadlinesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 12-item mega menu nav */}
      <AboutIGENMegaMenuNav />

      {/* ─── 1. HERO BANNER ─────────────────────────────────────────────────── */}
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
            🟢 Mega Menu 2 — Authority Engine
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-gold-light,#FFD700)]">
            Not Everything Is News. Some Things Are Signals.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Curated Trade Intelligence
            <br />
            for Professionals Who Can't Afford to Miss What Matters
          </h1>
          <p
            className="mx-auto mb-10 w-full text-base leading-relaxed text-white/80 md:text-lg"
            style={{ maxWidth: "48rem" }}
          >
            IGEN HEADLINES is a hand-curated layer above the noise — separating critical trade developments from daily volume, so your most valuable 10 minutes each morning are never wasted.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/headlines"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Read Today's Headlines →
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Download This Week's Industry Brief (Pro)
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. WHAT ARE HEADLINES? ─────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                What Are Headlines?
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                The Editorial Intelligence Layer
              </h2>
              <p className="mb-5 text-lg font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                While the FEED gives you volume, HEADLINES gives you clarity.
              </p>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Every day, IGEN's editorial team — led by Priyanshi — curates the most strategically important trade stories from across 20 sectors, 195 countries, and 25 leadership categories. These are not just the most-clicked articles. These are the articles that matter most for informed trade decision-making.
              </p>
              <p className="text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Think of HEADLINES as your daily briefing from a senior trade intelligence analyst — without the cost of hiring one.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-8 dark:border-[var(--color-primary-light)]/20 dark:bg-[var(--color-primary-light)]/5">
              <div className="mb-4 text-4xl text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                "
              </div>
              <p className="mb-6 text-lg font-medium italic leading-relaxed text-[var(--color-text-body)]">
                In exhibitions, VIP speakers are separated from general exhibitors. HEADLINES is that separation layer — digital, daily, structured.
              </p>
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-neutral-mid)]">
                — Founder, IGEN NEWS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. THE FOUR HEADLINES PILLARS ──────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              The Four Headlines Pillars
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Four Dimensions of Curated Trade Intelligence
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-md dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-3xl">{pillar.icon}</div>
                <h3 className="mb-3 font-bold text-[var(--color-text-body)]">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. EDITOR'S DESK — FEATURED TODAY ──────────────────────────────── */}
      <section className="bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:bg-[var(--background)] border-y border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Editor's Desk
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              This is What India's Trade World Must Know Right Now
            </h2>
            <p className="text-sm font-semibold text-[var(--color-neutral-dark)] dark:text-gray-400">
              Each section below refreshes daily with curated content:
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {editorsDesk.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-[var(--color-neutral-light)] bg-white p-6 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-lg font-bold text-[var(--color-primary)] dark:bg-[var(--color-primary-light)]/10 dark:text-[var(--color-primary-light)]">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-[var(--color-text-body)]">{item.title}</h3>
                  <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. WHY CURATION MATTERS ────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Why Curation Matters
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              The Cost of Reading Without Structure
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <div className="grid grid-cols-2 divide-x divide-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/40 text-center text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)] dark:divide-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)]">
              <div className="px-4 py-4 text-[var(--color-neutral-mid)]">Without HEADLINES</div>
              <div className="px-4 py-4 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                With HEADLINES ✨
              </div>
            </div>
            {curationComparison.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 divide-x divide-[var(--color-neutral-light)] border-t border-[var(--color-neutral-light)] text-center dark:divide-[var(--color-neutral-mid)]/20 dark:border-[var(--color-neutral-mid)]/20"
              >
                <div className="p-5 text-sm font-medium text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {row.without}
                </div>
                <div className="p-5 text-sm font-bold text-[var(--color-text-body)]">
                  {row.with}
                </div>
              </div>
            ))}
            <div className="border-t border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-4 text-center dark:border-[var(--color-primary-light)]/20 dark:bg-[var(--color-primary-light)]/5">
              <p className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                Time saved weekly by Pro Reader subscribers: estimated 3–5 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. LEADER MENTIONS TRACKER ─────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Leader Mentions Tracker
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                Leadership Moves Shape Markets
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Every leadership announcement — from a CEO's strategic pivot to a Trade Secretary's policy signal — has downstream implications for entire sectors. IGEN HEADLINES tracks all of them.
              </p>
              <p className="mb-4 text-sm font-bold text-[var(--color-text-body)]">
                Designation categories monitored in Leader Mentions:
              </p>
              <div className="flex flex-wrap gap-2">
                {leaderRoles.map((role) => (
                  <span
                    key={role}
                    className="rounded-lg border border-[var(--color-neutral-light)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-neutral-dark)] shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)] dark:text-[var(--color-text-body)]"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-lg font-semibold italic text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                When leaders speak, sectors move. HEADLINES tells you who said what — and why it matters for trade.
              </p>
            </div>
            
            {/* Visual representation of a leader card */}
             <div className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-xl dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)] lg:ml-auto lg:max-w-md">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl dark:bg-blue-900/30">
                  👔
                </div>
                <div>
                  <p className="text-sm font-bold text-[var(--color-text-body)]">R. Narayanan</p>
                  <p className="text-xs font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">CEO, Reliance Logistics</p>
                </div>
              </div>
              <h4 className="mb-2 font-bold leading-tight text-[var(--color-text-body)]">
                "We are expanding our cold chain capacity by 40% in Q3 to support growing agri-exports to the GCC."
              </h4>
              <p className="mb-4 text-xs text-[var(--color-neutral-mid)]">Source: Earnings Call Q2</p>
              <div className="flex gap-2">
                <span className="rounded bg-[var(--color-neutral-light)]/50 px-2 py-1 text-[10px] font-bold uppercase text-[var(--color-neutral-dark)] dark:bg-[var(--background)]">Logistics</span>
                <span className="rounded bg-[var(--color-neutral-light)]/50 px-2 py-1 text-[10px] font-bold uppercase text-[var(--color-neutral-dark)] dark:bg-[var(--background)]">GCC Trade</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. CORPORATE SPOTLIGHT ─────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Corporate Spotlight
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Corporate Intelligence, Not Corporate PR
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[var(--color-neutral-dark)] dark:text-gray-400">
              IGEN maintains editorial independence. Corporate Spotlight is not advertising. It is structured reporting on developments that reshape the market.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
             {corporateFocus.map((focus, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="absolute -right-4 -top-4 text-6xl opacity-5">🏢</div>
                <h3 className="mb-3 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {focus.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {focus.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. WEEKLY STRATEGIC SIGNALS ────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] bg-[var(--color-primary)] px-4 py-16 text-white md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
             <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-light,#FFD700)]">
                Weekly Strategic Signals
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-white md:text-3xl">
                Beyond Today — The Bigger Picture
              </h2>
              <p className="mb-8 text-base leading-relaxed text-white/80">
                Every week, IGEN HEADLINES publishes a structured intelligence layer for professionals thinking 30–90 days ahead:
              </p>
              <div className="grid gap-5">
                {strategicSignals.map((signal, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{signal.title}</h4>
                      <p className="text-sm text-white/70">{signal.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-sm lg:ml-auto lg:max-w-md">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center text-6xl">
                 📄
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold">This Week's Strategic Brief</h3>
               <p className="mb-8 text-sm text-white/80">
                12 pages of curated intelligence covering the top 5 sector shifts, 3 policy alerts, and the leader focus of the week.
              </p>
               <Link
                href="/reader-plans"
                className="inline-block w-full rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl focus:ring-4 focus:ring-white/30"
              >
                Download Brief — Available to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. UPGRADE HOOK ────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Upgrade Hook
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Deeper Intelligence Requires Deeper Access
            </h2>
            <p className="font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              Free readers see the headlines. Pro readers take the brief home.
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
              Upgrade to Pro — ₹24,999/year →
            </Link>
            <p className="mt-2 text-xs font-semibold text-[var(--color-accent-gold-dark)]">
              Founding Member Access | First 500 Only
            </p>
          </div>
        </div>
      </section>

      {/* ─── 10. THE PRIYANSHI STANDARD ─────────────────────────────────────── */}
       <section className="border-y border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              The Priyanshi Standard
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              What Makes IGEN HEADLINES Different From General News
            </h2>
             <p className="text-sm font-semibold text-[var(--color-neutral-dark)] dark:text-gray-400">
              IGEN HEADLINES operates under a strict editorial framework:
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
             {priyanshiStandard.map((std, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/30">
                  ✕
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-[var(--color-text-body)]">{std.title}</h3>
                  <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">{std.desc}</p>
                </div>
              </div>
             ))}
             {/* Final quote card */}
             <div className="flex items-center justify-center rounded-2xl bg-[var(--color-primary)] p-6 text-center text-white md:col-span-2 lg:col-span-1">
               <div>
                  <p className="mb-3 text-lg font-bold italic leading-snug">
                    "Priyanshi protects trust. Trust protects revenue."
                  </p>
                  <p className="text-xs font-medium uppercase tracking-widest text-white/70">
                    — IGEN Internal Team Constitution
                  </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── 11. WHO READS HEADLINES? ───────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Who Reads Headlines?
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Professionals for Whom Missing a Signal Has Real Consequences
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {useCases.map((uc) => (
              <div
                key={uc.role}
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

      {/* ─── 12. FAQ ────────────────────────────────────────────────────────── */}
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

      {/* ─── 13. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-primary)] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 font-display text-3xl font-extrabold text-white md:text-4xl">
            The Most Important 10 Minutes
            <br />
            of Your Trade Day
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/80">
            IGEN HEADLINES gives you structured clarity in a world of trade noise. Free to access. Deeper with Pro.
          </p>
          <div className="mb-10 grid gap-4 text-left sm:grid-cols-2">
            {[
              { tier: "Free Reader", desc: "Read today's HEADLINES. Stay informed." },
              { tier: "Pro Reader", desc: "Download industry briefs. Get weekly strategic signals. Never miss a policy shift." },
              { tier: "Emerging Leader", desc: "Build your own presence in the very HEADLINES section you read daily." },
              { tier: "Corporate", desc: "Brief your entire team with structured trade intelligence, not WhatsApp forwards." },
            ].map((p) => (
              <div key={p.tier} className="rounded-xl border border-white/10 bg-white/10 p-4">
                <p className="font-bold text-white">{p.tier}</p>
                <p className="text-sm text-white/70">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-8 text-sm font-semibold text-[var(--color-accent-gold-light,#FFD700)]">
            🌟 First 500 Founding Member slots — ₹24,999/year. Founding price locked permanently.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/headlines"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Read Today's Headlines
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
            >
              Download Industry Brief
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full bg-[var(--color-accent-gold-dark)] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-opacity-90"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

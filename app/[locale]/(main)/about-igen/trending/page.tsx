"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ─────────────────────────────────────────────────────────────────────

const signalLayers = [
  {
    title: "Layer 1 — Engagement Signals",
    desc: "Most Read Today. Most Liked. Most Bookmarked. Most Commented. Fastest Rising Article of the Day. These are reader-validated signals of what the trade community considers important.",
    icon: "📡",
  },
  {
    title: "Layer 2 — Sector Momentum",
    desc: "Sector Heat Map shows abnormal spikes. Sector Engagement Index reveals weekly patterns. Sector Competition Rankings show reader share gains.",
    icon: "🔥",
  },
  {
    title: "Layer 3 — Search Behaviour",
    desc: "Rising Keywords in trade searches. Bilateral trade buzz. Leader names trending. Industry search spikes and export trend keywords.",
    icon: "🔍",
  },
  {
    title: "Layer 4 — Time Filters",
    desc: "Trending Now (live). Today. This Week. This Month. All Time. Giving context between short-term spikes and long-term momentum patterns.",
    icon: "⏳",
  },
];

const trendingBoard = [
  { rank: 1, topic: "Top Article Today", signal: "2.3K reads", momentum: "↑ Rising" },
  { rank: 2, topic: "Sector In Focus", signal: "847 likes", momentum: "↑ Rising" },
  { rank: 3, topic: "Bilateral Trade Topic", signal: "412 comments", momentum: "→ Stable" },
  { rank: 4, topic: "Leader News", signal: "1.1K shares", momentum: "↑ Rising" },
  { rank: 5, topic: "Industry Insight", signal: "329 bookmarks", momentum: "↑ Rising" },
];

const heatMapCategories = [
  {
    title: "Hottest Sectors This Week",
    desc: "Tracks abnormal volume and engagement — indicating policy developments or major corporate announcements driving attention.",
    color: "bg-orange-500",
  },
  {
    title: "Fastest Growing Sector",
    desc: "The sector gaining the most new followers and article engagement week-over-week.",
    color: "bg-green-500",
  },
  {
    title: "Quietest Sector (Opportunity View)",
    desc: "Counterintuitively, low-engagement sectors often signal under-covered opportunities — fewer competitors watching means more upside.",
    color: "bg-blue-500",
  },
];

const scenarios = [
  {
    title: "Scenario 1 — The Early Sector Call",
    desc: "A trade consultant notices unusual comment volume 3 weeks before it becomes mainstream news. Clients reposition inventory before policy announcements. Advantage secured.",
  },
  {
    title: "Scenario 2 — The Bilateral Buzz Signal",
    desc: "An export manager spots rising bilateral keyword searches for India + Country X. Reaches out to a distributor early. New export relationship established.",
  },
  {
    title: "Scenario 3 — The Leader Movement",
    desc: "A corporate affairs team picks up a leader name trending before an official announcement. They prepare a response plan ahead of the news cycle.",
  },
];

const searchSignals = [
  { title: "Rising Keywords", desc: "Trade terms entering volumes for the first time indicate emerging stories." },
  { title: "Bilateral Buzz", desc: "Spikes in country pairing searches signal developing relationships." },
  { title: "Leader Name Trending", desc: "CEO/CFO/Secretary names trending usually ahead of announcements." },
  { title: "Industry Search Spikes", desc: "Sudden surge in niche industry searches often precedes media coverage." },
  { title: "Export Trend Keywords", desc: "Commodity names or HS codes reveal where opportunities are crystallising." },
];

const planComparison = [
  { feature: "See Trending Articles", free: "✓", pro: "✓" },
  { feature: "Sector Heat Map", free: "Basic", pro: "Full" },
  { feature: "Engagement Analytics", free: "—", pro: "✓" },
  { feature: "Search Behaviour Signals", free: "—", pro: "✓" },
  { feature: "Time Filter — All Time", free: "—", pro: "✓" },
  { feature: "Weekly Trend Report", free: "—", pro: "✓" },
  { feature: "Export Keyword Tracker", free: "—", pro: "✓" },
];

const timeFilters = [
  { title: "Trending Now", desc: "Real-time. Spiking in the last 60 mins." },
  { title: "Today", desc: "The full daily picture of engagement." },
  { title: "This Week", desc: "Weekly momentum patterns." },
  { title: "This Month", desc: "Industry narrative shifts." },
  { title: "All Time", desc: "Historical archive of trade intelligence." },
];

const faqs = [
  {
    q: "What is IGEN TRENDING?",
    a: "IGEN's momentum tracking engine — surfacing real-time engagement signals, sector heat, search behaviour, and social activity to show what India's trade professional community is focusing on.",
  },
  {
    q: "Is TRENDING based on editorial selection or reader data?",
    a: "Primarily reader data — likes, comments, shares, bookmarks, and read time. Not editorial selection. This makes it a genuine signal of professional community interest.",
  },
  {
    q: "How is TRENDING different from FEED and HEADLINES?",
    a: "FEED = volume discovery. HEADLINES = editorial curation. TRENDING = community momentum signals. They serve three different reader behaviours.",
  },
  {
    q: "What is the Sector Heat Map?",
    a: "A live visual indicator of engagement intensity across IGEN's 20 sectors — showing which sectors are experiencing abnormal activity and which are quieter than usual.",
  },
  {
    q: "Can I filter TRENDING by my sector?",
    a: "Yes. Free users can see sector-level trending basics. Pro users get full sector engagement analytics and time-filtered views.",
  },
  {
    q: "What are Rising Keywords?",
    a: "Trade terms entering search volume on IGEN for the first time — leading indicators of emerging stories, bilateral developments, or new export opportunities.",
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

export default function TrendingLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Mega Menu Nav */}
      <AboutIGENMegaMenuNav />

      {/* ─── 1. HERO BANNER ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] px-4 py-20 md:px-6 md:py-28 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-neutral-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-light) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            🔴 Mega Menu 3 — Momentum Engine
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-gold-light,#F0652E)]">
            In Trade, Momentum Is Intelligence.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-white">
            Discover What's Rising Before It Peaks —
            <br />
            India's Trade Momentum Engine
          </h1>
          <p className="mx-auto mb-10 w-full max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            IGEN TRENDING tracks real-time engagement signals, sector heat, search behaviour, and social activity across 20 sectors and 195 countries — so you always know what's gaining momentum before the crowd does.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/trending"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              See What's Trending Now
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Unlock Full Analytics with Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. WHAT IS TRENDING? ─────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                What is Trending?
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                Social Signals Turned Into Trade Intelligence
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                In physical exhibitions, a crowded booth is a psychological magnet — it signals relevance, credibility, and urgency without a single word. People cluster where others cluster.
              </p>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                IGEN TRENDING is that crowded booth signal, digitised. Every article, sector, country, and leader on IGEN generates engagement data — likes, comments, shares, bookmarks, and search spikes.
              </p>
              <div className="rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-4 italic">
                "If 5,000 professionals are suddenly reading about a specific sector, that's not coincidence. That's a signal."
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-blue-900 overflow-hidden flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="relative text-center p-8">
                    <div className="text-6xl mb-4 animate-pulse">📈</div>
                    <div className="text-white font-bold text-xl">Real-time Momentum Tracking</div>
                    <div className="text-white/60 text-sm">Processing 100k+ events hourly</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. THE TRENDING ENGINE — FOUR SIGNAL LAYERS ──────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                The Trending Engine
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              What TRENDING Tracks and Why It Matters
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {signalLayers.map((layer, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-md dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-3xl">{layer.icon}</div>
                <h3 className="mb-3 font-bold text-[var(--color-text-body)]">
                  {layer.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. LIVE TRENDING BOARD ─────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Live Trending Board
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Right Now — What India's Trade Community Is Engaging With
            </h2>
            <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">Updated every hour. Full analytics available to Pro Readers.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-lg dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-neutral-light)]/50 dark:bg-[var(--background)]">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)]">Rank</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)]">Article / Topic</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)] text-center">Engagement Signal</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)] text-right">Momentum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral-light)] dark:divide-[var(--color-neutral-mid)]/20">
                {trendingBoard.map((row) => (
                  <tr key={row.rank} className="hover:bg-[var(--color-neutral-light)]/20 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-[var(--color-primary)]">#{row.rank}</td>
                    <td className="px-6 py-4 font-semibold text-[var(--color-text-body)]">{row.topic}</td>
                    <td className="px-6 py-4 text-center text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">{row.signal}</td>
                    <td className="px-6 py-4 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.momentum.includes('Rising') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                            {row.momentum}
                        </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 5. SECTOR HEAT MAP ─────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Sector Heat Map
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Which Sectors Are Hot — Which Are Cooling
            </h2>
            <p className="mx-auto max-w-2xl text-[var(--color-neutral-dark)] dark:text-gray-400">
               A live visual representation of engagement intensity across all 20 sectors. Updated throughout the day.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
             {heatMapCategories.map((item, idx) => (
               <div key={idx} className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-8 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)] flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${item.color} mb-6 flex items-center justify-center text-3xl text-white shadow-lg`}>
                    {idx === 0 ? "🔥" : idx === 1 ? "🚀" : "🧊"}
                  </div>
                  <h3 className="mb-3 font-bold text-[var(--color-text-body)] text-lg">{item.title}</h3>
                  <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── 6. WHY TRENDING INTELLIGENCE MATTERS ────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Real-World Scenarios
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Three Scenarios Where Trending Gave Advantage
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {scenarios.map((s, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl border border-[var(--color-neutral-light)] bg-white dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold shadow-lg">
                    {idx + 1}
                </div>
                <h3 className="mb-4 font-bold text-[var(--color-text-body)] mt-2">{s.title}</h3>
                <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-lg font-medium italic text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            "These are not hypotheticals. This is what structured trade intelligence does when you're paying attention."
          </p>
        </div>
      </section>

      {/* ─── 7. SEARCH BEHAVIOUR SIGNALS ────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)] border-y border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Search Behaviour
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              What People Are Searching Tells You What's Next
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {searchSignals.map((signal, idx) => (
               <div key={idx} className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
                  <h3 className="mb-3 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">{signal.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                    {signal.desc}
                  </p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. UPGRADE HOOK ────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              The Analytics Advantage
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              The Trend Everyone Sees.
              <br />The Analytics Only Pros Get.
            </h2>
            <p className="font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              Free readers see the trend. Pro readers see what's driving it.
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
          <div className="mt-8 text-center text-sm font-semibold text-[var(--color-accent-gold-dark)]">
             ₹24,999/year — Founding Member Access. First 500 Professionals.
          </div>
        </div>
      </section>

      {/* ─── 9. TIME FILTER INTELLIGENCE ────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-primary)] text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-light,#F0652E)]">
                Time Horizons
            </span>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Different Horizons, Different Insights
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {timeFilters.map((filter, idx) => (
               <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <h3 className="mb-3 font-bold text-lg">{filter.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {filter.desc}
                  </p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
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
      <section className="bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-display text-4xl font-extrabold text-[var(--color-text-body)]">
            Don't Follow the Trend. Lead It.
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
            The professionals who act on trade signals before they become mainstream news are the ones who build competitive advantage.
          </p>
          <div className="grid gap-4 sm:grid-cols-4 text-left mb-10">
              {[
                  { tier: "Free Reader", desc: "See what's trending today." },
                  { tier: "Pro Reader", desc: "Full analytics & search signals." },
                  { tier: "Emerging Leader", desc: "Publish on trending topics." },
                  { tier: "Corporate", desc: "Track conversation heat." },
              ].map((p) => (
                  <div key={p.tier} className="bg-white dark:bg-[var(--color-neutral-white)] p-4 rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20 shadow-sm">
                      <p className="font-bold text-[var(--color-primary)] text-sm mb-1">{p.tier}</p>
                      <p className="text-xs text-[var(--color-neutral-dark)] dark:text-gray-400">{p.desc}</p>
                  </div>
              ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/trending"
              className="rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              See What's Trending Now
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-[var(--color-primary)]/30 bg-white px-8 py-4 text-sm font-bold text-[var(--color-primary)] transition-all hover:bg-gray-50 dark:bg-transparent dark:border-white/30 dark:text-white"
            >
              Upgrade for Full Analytics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

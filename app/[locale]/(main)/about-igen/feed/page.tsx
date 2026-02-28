"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ─────────────────────────────────────────────────────────────────────

const discoveryLayers = [
  {
    icon: "🏭",
    title: "By Sector",
    desc: "Browse trade news across all 20 IGEN sectors. See which sectors are most active today. Follow the sectors you care about. Get alerts when key sectors go quiet or spike.",
    href: "/about-igen/feed/by-sector",
  },
  {
    icon: "🔬",
    title: "By Industry Depth",
    desc: "Drill into 1,000+ industries. Search any industry directly. Discover the fastest-growing and surface the under-covered opportunities your competitors are missing.",
    href: "/about-igen/feed/by-industry-depth",
  },
  {
    icon: "🌍",
    title: "By Country & Bilateral Trade",
    desc: "Access all 195 country pages — each structured around India's bilateral trade relationship. Filter by Trade Zone: ASEAN, EU, GCC, Africa, and more.",
    href: "/about-igen/feed/by-country",
  },
  {
    icon: "📡",
    title: "By Content Stream",
    desc: "RSS AI articles for real-time volume, Manual AI Authority articles for depth, Breaking Trade Updates, QC-Verified articles, or Most Discussed Today.",
    href: "/about-igen/feed/by-content-stream",
  },
  {
    icon: "📣",
    title: "By Social Signals",
    desc: "See what India's trade community is engaging with. Most Liked. Most Commented. Most Shared. Community Picks curated by Founding Professionals.",
    href: "/about-igen/feed/social-signals",
  },
];

const pulseBoard = [
  { signal: "Articles Published", today: "120+" },
  { signal: "Sectors Active", today: "20 / 20" },
  { signal: "Countries Updated", today: "30+" },
  { signal: "Leader Mentions", today: "15+" },
  { signal: "New Industries Covered", today: "8" },
];

const highways = [
  {
    tag: "Highway 1",
    icon: "⚡",
    title: "RSS AI Articles",
    subtitle: "Volume Engine",
    desc: "Structured rewrites of global trade news, pulled from curated RSS feeds, tagged accurately to sector and industry. Provides freshness, SEO coverage, and daily volume. Makes up 60–70% of daily output.",
    pct: "60–70%",
    color: "bg-blue-500",
  },
  {
    tag: "Highway 2",
    icon: "🎯",
    title: "Manual AI Authority Articles",
    subtitle: "Authority Engine",
    desc: "Deeper content created by IGEN's Content Factory — focused on trade implications, export/import angles, and industry analysis. Higher value. Sales-ready. Makes up 30–40% of daily output.",
    pct: "30–40%",
    color: "bg-[var(--color-primary)]",
  },
];

const useCases = [
  {
    role: "Export Managers",
    desc: "Track bilateral country developments and sector-specific policy shifts daily.",
    icon: "🚢",
  },
  {
    role: "Industry Analysts",
    desc: "Monitor 1,000 industries and surface under-covered intelligence before competitors do.",
    icon: "📊",
  },
  {
    role: "Trade Consultants",
    desc: "Follow multiple sectors simultaneously, building structured knowledge for client advisory.",
    icon: "🤝",
  },
  {
    role: "Senior Professionals",
    desc: "Start the day with structured intelligence briefing — replacing fragmented WhatsApp forwards.",
    icon: "💼",
  },
  {
    role: "Founding Professionals (FPC)",
    desc: "Use the FEED as their daily trade command centre — following unlimited sectors, industries, and countries.",
    icon: "⭐",
  },
];

const socialSignals = [
  { icon: "❤️", label: "Most Liked Today", desc: "See what resonated across industries" },
  { icon: "💬", label: "Most Commented", desc: "Join the discussion on key trade developments" },
  { icon: "🔗", label: "Most Shared", desc: "Articles worth sending to your network" },
  { icon: "👔", label: "Articles with Leader Quotes", desc: "Intelligence from CEOs, CFOs, Trade Secretaries" },
  { icon: "🌟", label: "Community Picks", desc: "Curated by IGEN's Founding Professionals" },
];

const habitSchedule = [
  { time: "6:00 AM", action: "First RSS AI articles published" },
  { time: "9:00 AM", action: "Manual AI articles begin" },
  { time: "12:00 PM", action: "Social signals peak — Most Liked updates" },
  { time: "6:00 PM", action: "Daily digest compiled" },
  { time: "10:00 PM", action: "Final QC sweep complete" },
];

const planComparison = [
  { feature: "Read Articles", free: "Unlimited", pro: "Unlimited" },
  { feature: "Follow Sectors", free: "1", pro: "5" },
  { feature: "Follow Industries", free: "5", pro: "50" },
  { feature: "Follow Countries", free: "—", pro: "10" },
  { feature: "Bookmark Articles", free: "Limited", pro: "Unlimited" },
  { feature: "Download Industry Briefs", free: "—", pro: "✓" },
  { feature: "Advanced Filters", free: "—", pro: "✓" },
];

const faqs = [
  {
    q: "What is the IGEN FEED?",
    a: "The FEED is IGEN's primary real-time content discovery engine — structured trade news published daily across 20 sectors, 1,000 industries, and 195 countries.",
  },
  {
    q: "How is FEED different from regular news sites?",
    a: "Every article is tagged to a specific sector, industry, country, and leader — making it searchable, organised, and structured. No clickbait. No noise.",
  },
  {
    q: "How many articles are published per day?",
    a: "At full scale, IGEN publishes 120–150 structured articles per day across both content highways.",
  },
  {
    q: "Can I filter the FEED by my sector?",
    a: "Yes. Free users can follow 1 sector. Pro users can follow up to 5 sectors with advanced filters.",
  },
  {
    q: "What is the RSS AI Content Highway?",
    a: "RSS feeds pull structured trade news from global sources. AI rewrites it in IGEN's structured format with accurate tagging. This makes up 60–70% of daily volume.",
  },
  {
    q: "Is all content QC-verified?",
    a: "Yes. A 4-layer QC process covers Engineer self-check, Execution QC, Quality QC, and Technical QC.",
  },
  {
    q: "What happens when I hit my follow limit?",
    a: 'IGEN shows a contextual upgrade prompt: "Follow more sectors. Upgrade to Pro."',
  },
];

// ── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQ({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-[var(--color-neutral-light)] dark:divide-[var(--color-neutral-mid)]/20">
      {faqs.map((faq: { q: string; a: string }, idx: number) => (
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

export default function FeedPage() {
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
            🔵 Mega Menu 1 — Volume Engine
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-gold-light,#FFD700)]">
            Every Trade Story. Every Sector. Every Moment.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            The Live Heartbeat of
            <br />
            India's Trade Intelligence
          </h1>
          <p className="mx-auto mb-10 w-full max-w-2xl text-base leading-relaxed text-white/80 md:text-lg" style={{maxWidth: '42rem'}}>
            IGEN FEED is your always-on window into the world of structured trade news — updated every hour across 20 sectors, 1,000 industries, and 195 countries.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start Reading Free →
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Upgrade to Pro for Full Access
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. WHAT IS THE FEED ────────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                What Is the Feed?
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                Your Real-Time Trade Discovery Engine
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                The FEED is the primary content discovery mode on IGEN NEWS — built for professionals who need structured, high-volume trade intelligence without noise. Unlike general news platforms, every article in FEED is tagged to a specific Sector, Industry, Country, and where applicable, a Leader Designation.
              </p>
              <p className="text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                This is not random news. This is structured, industrial trade intelligence — published daily, organised by taxonomy, and designed to compound into the most searchable trade archive in India.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-8 dark:border-[var(--color-primary-light)]/20 dark:bg-[var(--color-primary-light)]/5">
              <p className="mb-2 text-4xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">120+</p>
              <p className="mb-6 text-sm font-semibold text-[var(--color-neutral-dark)] dark:text-gray-400">
                Structured articles published daily across 20 sectors and 195 countries
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { v: "20", l: "Sectors" },
                  { v: "1,000+", l: "Industries" },
                  { v: "195", l: "Countries" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="font-display text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">{s.v}</p>
                    <p className="text-xs text-[var(--color-neutral-mid)]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FIVE DISCOVERY LAYERS ───────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              How the Feed Is Organised
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Five Discovery Layers — One Unified Platform
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {discoveryLayers.map((layer, idx) => (
              <Link
                key={idx}
                href={layer.href}
                className="group rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-md dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-3xl">{layer.icon}</div>
                <h3 className="mb-2 font-bold text-[var(--color-text-body)] group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-primary-light)]">
                  {layer.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">{layer.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. PULSE BOARD ─────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 px-4 py-12 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Live Activity Indicators
            </span>
            <h2 className="font-display text-xl font-bold text-[var(--color-text-body)] md:text-2xl">
              The Pulse Board — What's Moving Right Now
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <div className="grid divide-y divide-[var(--color-neutral-light)] dark:divide-[var(--color-neutral-mid)]/20 md:grid-cols-5 md:divide-x md:divide-y-0">
              {pulseBoard.map((row) => (
                <div key={row.signal} className="px-6 py-6 text-center">
                  <p className="mb-1 font-display text-3xl font-extrabold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                    {row.today}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neutral-mid)]">
                    {row.signal}
                  </p>
                </div>
              ))}
            </div>
            <p className="border-t border-[var(--color-neutral-light)] px-6 py-3 text-center text-xs italic text-[var(--color-neutral-mid)] dark:border-[var(--color-neutral-mid)]/20">
              Updated continuously throughout the day.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 5. WHY THE FEED WORKS — Exhibition Logic ───────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Why the Feed Works
              </span>
              <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                Built on Exhibition Logic.
                <br />Designed for Digital Scale.
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                For 30+ years, IGEN's founder structured physical exhibitions by Hall, Sector, Category, Country, and Leader presence. Visitors found their trade world quickly — or they left.
              </p>
              <p className="mb-8 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                A visitor who can instantly find their sector, their country, their industry — stays. Explores. Returns. Upgrades.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: "🏛️", title: "Mega Menus", eq: "Exhibition Halls" },
                { icon: "🛤️", title: "Submenus", eq: "Exhibition Aisles" },
                { icon: "🏪", title: "Articles", eq: "Exhibition Booths" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-5 rounded-2xl border border-[var(--color-neutral-light)] bg-white p-5 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <p className="font-bold text-[var(--color-text-body)]">{item.title}</p>
                    <p className="text-sm text-[var(--color-accent-gold-dark)]">= {item.eq}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CONTENT HIGHWAYS ────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Content Highways Explained
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Two Streams. One Goal: Structured Trade Intelligence.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {highways.map((h) => (
              <div
                key={h.tag}
                className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className={`${h.color} px-6 py-4 text-white`}>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">{h.tag}</span>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="text-2xl">{h.icon}</span>
                    <div>
                      <p className="font-bold">{h.title}</p>
                      <p className="text-xs opacity-80">{h.subtitle}</p>
                    </div>
                    <span className="ml-auto rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                      {h.pct}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-[var(--color-neutral-dark)] dark:text-gray-400">
            Both highways are QC-verified before publishing. No hallucinated facts. No wrong tags.
          </p>
        </div>
      </section>

      {/* ─── 7. UPGRADE COMPARISON ──────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Upgrade Hook
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              How Far Can You Go on Free?
            </h2>
            <p className="text-sm font-semibold text-red-500">
              You hit the wall fast on Free. Pro opens the full FEED.
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
            <p className="mt-2 text-xs text-[var(--color-neutral-mid)]">Founding Member Price</p>
          </div>
        </div>
      </section>

      {/* ─── 8. USE CASES ───────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Feed Use Cases
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Who Uses the FEED and Why
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {useCases.map((uc) => (
              <div
                key={uc.role}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-3xl">{uc.icon}</div>
                <h3 className="mb-2 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
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

      {/* ─── 9. SOCIAL SIGNALS ──────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Social Signals Block
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              The Trade World Is Talking. Are You Listening?
            </h2>
            <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">
              Every article on IGEN carries real engagement data.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {socialSignals.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 text-center shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-3 text-3xl">{s.icon}</div>
                <p className="mb-1 font-bold text-[var(--color-text-body)]">{s.label}</p>
                <p className="text-xs leading-snug text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-base font-bold italic text-[var(--color-text-body)]">
            "Engagement builds memory. Structure builds authority."
          </p>
        </div>
      </section>

      {/* ─── 10. DAILY HABIT ────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)] md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Daily Habit Formation
            </span>
            <h2 className="mb-2 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              The FEED Is Built to Become Your Morning Ritual
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            {habitSchedule.map((row, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-6 px-6 py-4 ${
                  idx < habitSchedule.length - 1
                    ? "border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20"
                    : ""
                }`}
              >
                <span className="w-20 shrink-0 text-xs font-black text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {row.time}
                </span>
                <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-primary-light)]" />
                <span className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">{row.action}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm italic text-[var(--color-neutral-dark)] dark:text-gray-400">
            Start your day on IGEN FEED. End it knowing more than when you started.
          </p>
        </div>
      </section>

      {/* ─── 11. FAQ ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
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

      {/* ─── 12. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-primary)] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 font-display text-3xl font-extrabold text-white md:text-4xl">
            Start With the FEED.
            <br />Never Stop.
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/80">
            IGEN FEED is free to access. But the deeper you go, the more structured your trade intelligence becomes — and the more you need Pro.
          </p>
          <div className="mb-10 grid gap-4 text-left sm:grid-cols-2">
            {[
              { tier: "Free Reader", desc: "Access the FEED. Follow 1 sector." },
              { tier: "Pro Reader", desc: "Follow 5 sectors, 50 industries, 10 countries." },
              { tier: "Emerging Leader", desc: "Build your industry profile while consuming structured intelligence." },
              { tier: "Corporate", desc: "Give your entire team structured FEED access." },
            ].map((p) => (
              <div key={p.tier} className="rounded-xl border border-white/10 bg-white/10 p-4">
                <p className="font-bold text-white">{p.tier}</p>
                <p className="text-sm text-white/70">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-8 text-sm font-semibold text-yellow-300">
            🌟 Join the first 500 Founding Professionals. Founding Member pricing: ₹24,999/year.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Start Free
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
            >
              Upgrade to Pro
            </Link>
            <Link
              href="/reader-plans"
              className="text-sm font-semibold text-white/70 underline transition-colors hover:text-white"
            >
              Explore All Plans →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

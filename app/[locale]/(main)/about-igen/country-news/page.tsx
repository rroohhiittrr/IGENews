"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ─────────────────────────────────────────────────────────────────────

const countryPageSections = [
  {
    icon: "📊",
    title: "Trade Insights",
    desc: "Export Signals from India to that country. Import Trends from that country to India. Bilateral Policy Updates. Trade Agreements status and developments. Investment Activity both inbound and outbound.",
  },
  {
    icon: "🏆",
    title: "Country Ranking Intelligence",
    desc: "Most Active Trade Partners. Fastest Growing Countries. Sector-wise Country Map. Trade Deficit Watch. Opportunity Countries — where India has room to grow bilateral trade.",
  },
  {
    icon: "👔",
    title: "Country Leaders",
    desc: "CEOs, Trade Secretaries, Embassy Officials, and Diplomatic Leaders shaping each bilateral relationship. Country-wise CEO presence. Trade Secretary signals. Embassy mentions.",
  },
  {
    icon: "🎪",
    title: "Bilateral Event Coverage",
    desc: "Trade missions, bilateral summits, investment conferences, export promotion events — all covered with trade intelligence framing.",
  },
];

const tradeZones = [
  "ASEAN (Southeast Asia)",
  "European Union",
  "GCC (Gulf Cooperation Council)",
  "Africa (54 Nations)",
  "Americas (North and South)",
  "South Asia (SAARC)",
  "East Asia (China, Japan, Korea, Taiwan)",
  "Central Asia and CIS",
  "Oceania and Pacific",
];

const tradeStatuses = [
  { label: "Top 20 Trade Partners", desc: "where the volume is" },
  { label: "Fastest Growing", desc: "where momentum is building" },
  { label: "Emerging Partners", desc: "early-stage bilateral opportunity" },
  { label: "Under-Covered", desc: "minimal trade today, high future potential" },
  { label: "Trade Deficit Watch", desc: "where India imports significantly more than it exports" },
];

const momentumSignals = [
  { signal: "Article Volume", measures: "How much IGEN content is covering this bilateral relationship" },
  { signal: "Engagement Rate", measures: "How much IGEN's professional community is reading and discussing this country" },
  { signal: "Search Spike", measures: "Whether this country is gaining abnormal search interest on IGEN" },
  { signal: "Policy Activity", measures: "Recent bilateral trade agreements, tariff changes, or diplomatic developments" },
];

const exportQuestions = [
  {
    num: "1",
    title: "Where are the current export signals?",
    desc: "Which Indian sectors are successfully exporting to this country? What is the product mix? Which trade corridors are active?",
  },
  {
    num: "2",
    title: "Where are the untapped opportunities?",
    desc: "Which sectors have export potential to this country that is not yet being realised? Under-penetrated product categories. Unaddressed buyer segments.",
  },
  {
    num: "3",
    title: "What are the policy barriers and enablers?",
    desc: "Current trade agreements status. Tariff structures. Regulatory requirements. Bilateral policy shifts that open or close market access.",
  },
  {
    num: "4",
    title: "Who are the key contacts and leaders?",
    desc: "Trade Secretaries managing this bilateral relationship. Indian Embassy trade officials. Key business chambers. Corporate leaders with established relationships.",
  },
  {
    num: "5",
    title: "What is everyone else doing?",
    desc: "Competitor activity. Corporate expansion moves. M&A signals involving Indian companies entering this market.",
  },
];

const topTradePartners = [
  { country: "USA", relationship: "Highest Volume", momentum: "Stable", opportunity: "Services, Pharma, IT" },
  { country: "UAE", relationship: "Highest Growth", momentum: "Rising", opportunity: "FMCG, Textiles, Infra" },
  { country: "China", relationship: "Highest Complexity", momentum: "Monitored", opportunity: "Import Strategy" },
  { country: "Germany", relationship: "Premium Tier", momentum: "Stable", opportunity: "Engineering, Auto" },
  { country: "Japan", relationship: "Strategic", momentum: "Rising", opportunity: "Manufacturing, Energy" },
  { country: "UK", relationship: "FTA Priority", momentum: "Rising", opportunity: "Finance, Tech, EdTech" },
];

const bilateralSections = [
  { num: 1, title: "Trade Overview", desc: "Total bilateral trade volume. Export-to-import ratio. Year-on-year growth. Top traded commodities. Key trade corridors." },
  { num: 2, title: "Current Developments", desc: "Latest news affecting the bilateral relationship. Policy announcements. Diplomatic signals. Corporate moves involving this country." },
  { num: 3, title: "Sector-wise Breakdown", desc: "Which of IGEN's 20 sectors are most active in this bilateral relationship? Where is trade concentrated? Where is it growing?" },
  { num: 4, title: "Leaders Shaping the Relationship", desc: "Indian government officials. Foreign government counterparts. Business community leaders. Diplomatic and trade mission activity." },
  { num: 5, title: "Opportunity Intelligence", desc: "Where India could gain more. Sectors with export potential. Investment opportunities. Bilateral trade gaps that represent future growth." },
];

const tradeZoneRegions = [
  {
    icon: "🛢️",
    title: "GCC — India's Fastest Growing Trade Zone",
    desc: "The Gulf Cooperation Council represents India's most dynamic recent bilateral growth zone. Remittance flows, energy imports, and FMCG exports make this a critical region. IGEN tracks all 6 GCC nations with deep coverage.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: "🌏",
    title: "ASEAN — India's Strategic Priority Zone",
    desc: "Southeast Asia represents India's most important strategic trade priority over the next decade — with ASEAN nations representing both export opportunities and supply chain diversification targets.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: "🌍",
    title: "Africa — India's Emerging Opportunity Continent",
    desc: "54 African nations represent the world's largest untapped trade opportunity for Indian exporters. IGEN tracks all major bilateral relationships, investment flows, and sector-specific opportunities.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: "🇪🇺",
    title: "EU — India's Premium Trade Relationship",
    desc: "The European Union remains India's most complex and highest-value trade partnership. FTA negotiations, regulatory convergence, and sector-specific market access shape this relationship daily.",
    color: "from-purple-500 to-violet-600",
  },
];

const planComparison = [
  { feature: "Read Country Articles", free: "✓", pro: "✓" },
  { feature: "Country Overview Pages", free: "✓", pro: "✓" },
  { feature: "Follow Countries", free: "—", pro: "10" },
  { feature: "Country Alerts", free: "—", pro: "✓" },
  { feature: "Bilateral Policy Digest", free: "—", pro: "✓" },
  { feature: "Export Opportunity Reports", free: "—", pro: "✓" },
  { feature: "Country Momentum Score", free: "Basic", pro: "Full" },
];

const useCases = [
  { role: "Export Managers", desc: "Track specific destination markets daily — needing bilateral policy updates, competitor activity, and opportunity signals before their next shipment decision." },
  { role: "Import Procurement Teams", desc: "Monitor supply country developments — price signals, export policy changes, production disruptions, and new supplier opportunities." },
  { role: "Trade Finance Professionals", desc: "Track country risk, bilateral investment flows, and payment infrastructure developments across key trade partners." },
  { role: "Diplomatic & Govt Officials", desc: "Work on bilateral trade promotion, export incentive policy, and trade mission coordination." },
  { role: "EXIM-focused Consultants", desc: "Advise exporters on market entry, compliance, regulatory navigation, and bilateral trade strategy." },
  { role: "Corporate Trade Heads", desc: "Manage multi-country supply chains, tracking 10–30 countries simultaneously — impossible without structured intelligence architecture." },
];

const faqs = [
  {
    q: "Does IGEN really cover all 195 countries?",
    a: "Yes. IGEN's architecture includes a dedicated page for every country that India has a bilateral trade relationship with. Coverage depth varies — the most active trade partners receive daily updates while smaller bilateral relationships receive weekly updates at minimum.",
  },
  {
    q: "What is a Bilateral Trade Page?",
    a: "A structured intelligence page on IGEN dedicated to the trade relationship between India and one specific country — covering export signals, import trends, bilateral policy, investment activity, and the leaders shaping that relationship.",
  },
  {
    q: "Can I filter country news by sector?",
    a: "Yes. Country pages can be cross-filtered with sector tags — showing which sectors are driving bilateral trade with that country.",
  },
  {
    q: "What is the Country Momentum Score?",
    a: "A composite signal combining IGEN article volume, reader engagement, search spikes, and policy activity for each country — indicating whether a bilateral relationship is gaining or losing trade momentum.",
  },
  {
    q: "How is Country News different from general world news?",
    a: "IGEN Country News has a single lens: India's bilateral trade relationship with each country. No politics for politics' sake. No cultural coverage. Purely trade, investment, policy, and leadership intelligence with trade implications.",
  },
  {
    q: "Can I follow multiple countries?",
    a: "Free readers cannot follow countries directly. Pro readers can follow up to 10 countries. Emerging Leaders and Corporate members have unlimited country follows.",
  },
  {
    q: "What are Trade Zone Views?",
    a: "Regional groupings (ASEAN, EU, GCC, Africa etc.) that allow readers to browse country news by geographic trade zone rather than individual country — useful for regional trade strategy.",
  },
  {
    q: "Does IGEN cover India-China trade specifically?",
    a: "Yes. India-China is one of IGEN's most monitored bilateral relationships — given its complexity, volume, and policy sensitivity.",
  },
  {
    q: "How often are country pages updated?",
    a: "Top 50 trade partners receive daily updates. All 195 countries receive at minimum one new article per week. At full scale, IGEN targets 20–30 countries updated per day.",
  },
  {
    q: "Is this useful for embassy and trade promotion professionals?",
    a: "Very much so. IGEN Country News tracks bilateral developments, diplomatic signals, and trade mission activity — making it a structured intelligence tool for trade promotion bodies.",
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

export default function CountryNewsLandingPage() {
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
        {/* Decorative globe accent */}
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-10 text-[20rem] leading-none select-none hidden lg:block">
          🌍
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            🌐 Mega Menu 5 — Bilateral Trade Architecture
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-gold-light,#F4A024)]">
            India Trades with the World. IGEN Maps Every Relationship.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-white">
            195 Country Intelligence Pages —
            <br />
            Structured Around India's Bilateral Trade Reality
          </h1>
          <p className="mx-auto mb-10 w-full max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Every country India trades with has a dedicated intelligence page on IGEN NEWS — tracking export signals, import trends, policy developments, bilateral agreements, and leadership activity. This is not world news. This is India's trade world, structured.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/country-news"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Country Intelligence
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Follow Your Export Markets (Pro)
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. WHAT IS COUNTRY NEWS? ─────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                What is Country News?
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                The Bilateral Trade Intelligence Architecture
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                In physical trade exhibitions, Country Pavilions are sacred spaces. Every country gets its own zone — its own presence, its own identity, its own representatives. The bilateral relationship between India and each nation is made visible, tangible, and navigable.
              </p>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                IGEN COUNTRY NEWS is that structure in digital form. Every one of 195 countries has a dedicated IGEN page — structured around the bilateral trade relationship between that country and India.
              </p>
              <div className="rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-4 italic text-[var(--color-text-body)]">
                "This is the most granular bilateral trade intelligence architecture available in Indian trade media."
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-blue-900 overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              <div className="relative text-center p-8">
                <div className="text-7xl mb-4">🌐</div>
                <div className="text-white font-bold text-xl">195 Countries</div>
                <div className="text-white/60 text-sm mt-1">Bilateral Trade Intelligence</div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {["USA", "UAE", "China", "Germany", "Japan"].map((c) => (
                    <span key={c} className="rounded-full bg-white/15 border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. COUNTRY PAGE ARCHITECTURE ────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Country Page Architecture
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              What Every Country Page Contains
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {countryPageSections.map((section, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-md dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-3xl">{section.icon}</div>
                <h3 className="mb-3 font-bold text-[var(--color-text-body)]">
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {section.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. 195 COUNTRY MAP ─────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              195 Country Map
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              India's Complete Trade World — Structured and Searchable
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* By Trade Zone */}
            <div className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
              <h3 className="mb-5 text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-sm">🌐</span>
                By Trade Zone
              </h3>
              <div className="space-y-2">
                {tradeZones.map((zone) => (
                  <div key={zone} className="flex items-center gap-3 rounded-lg bg-[var(--color-neutral-light)]/40 px-3 py-2 dark:bg-[var(--background)]">
                    <div className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                    <span className="text-sm font-medium text-[var(--color-text-body)]">{zone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Trade Status */}
            <div className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
              <h3 className="mb-5 text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-sm">📈</span>
                By Trade Status
              </h3>
              <div className="space-y-3">
                {tradeStatuses.map((status) => (
                  <div key={status.label}>
                    <p className="text-sm font-bold text-[var(--color-text-body)]">{status.label}</p>
                    <p className="text-xs text-[var(--color-neutral-dark)] dark:text-gray-400">— {status.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* By Your Industry */}
            <div className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
              <h3 className="mb-5 text-lg font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-sm">🏭</span>
                By Your Industry
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Filter 195 countries by which ones are most relevant to your sector — see bilateral trade flow by sector for targeted export intelligence.
              </p>
              <div className="mt-auto rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 p-4 text-center">
                <p className="text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  20 Sectors × 195 Countries
                </p>
                <p className="text-xs text-[var(--color-neutral-dark)] dark:text-gray-400 mt-1">
                  Complete bilateral trade matrix
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. COUNTRY MOMENTUM SCORE ──────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Country Momentum Score
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              A Live Intelligence Signal for Every Trade Relationship
            </h2>
            <p className="mx-auto max-w-2xl text-[var(--color-neutral-dark)] dark:text-gray-400">
              IGEN's Country Momentum Score combines four signals for every country.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-lg dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-neutral-light)]/50 dark:bg-[var(--background)]">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)]">Signal</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)]">What It Measures</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral-light)] dark:divide-[var(--color-neutral-mid)]/20">
                {momentumSignals.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--color-neutral-light)]/20 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] whitespace-nowrap">
                      {row.signal}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">
                      {row.measures}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-xl border-l-4 border-[var(--color-accent-gold-dark)] bg-[var(--color-accent-gold-dark)]/5 p-4">
            <p className="text-sm font-semibold text-[var(--color-text-body)]">
              ⚡ A rising Country Momentum Score is an early signal of opportunity — or risk.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 6. EXPORT INTELLIGENCE LAYER ───────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Export Intelligence Layer
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              The Five Questions Every Exporter Needs Answered — By Country
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {exportQuestions.map((q) => (
              <div
                key={q.num}
                className="relative rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold shadow-lg text-sm">
                  {q.num}
                </div>
                <h3 className="mb-3 mt-2 font-bold text-[var(--color-text-body)]">{q.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {q.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. TOP TRADE PARTNERS — INTELLIGENCE SNAPSHOT ──────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Top Trade Partners
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Intelligence Snapshot — India's Key Bilateral Relationships
            </h2>
            <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">All 195 country pages fully accessible on IGEN. Updated daily.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-lg dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-neutral-light)]/50 dark:bg-[var(--background)]">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)]">Country</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)]">Trade Relationship</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)] text-center">Momentum</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)] text-right">Opportunity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral-light)] dark:divide-[var(--color-neutral-mid)]/20">
                {topTradePartners.map((row) => (
                  <tr key={row.country} className="hover:bg-[var(--color-neutral-light)]/20 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-[var(--color-text-body)]">{row.country}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">{row.relationship}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        row.momentum === "Rising"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : row.momentum === "Monitored"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        {row.momentum === "Rising" ? "↑ " : row.momentum === "Monitored" ? "⚠ " : "→ "}{row.momentum}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-[var(--color-text-body)]">{row.opportunity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 8. BILATERAL TRADE MAP — HOW IT WORKS ──────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-primary)] text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-light,#F4A024)]">
              Bilateral Trade Map
            </span>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              India + Country = Complete Trade Picture
            </h2>
            <p className="mt-3 text-sm text-white/70">Every IGEN Country Page follows a structured bilateral format:</p>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {bilateralSections.map((section) => (
              <div key={section.num} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                  {section.num}
                </div>
                <h3 className="mb-3 font-bold text-lg">{section.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {section.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. TRADE ZONE INTELLIGENCE ─────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Trade Zone Intelligence
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Regional Architecture for Global Trade Thinking
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {tradeZoneRegions.map((zone, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${zone.color}`} />
                <div className="p-6 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{zone.icon}</div>
                    <div>
                      <h3 className="mb-3 font-bold text-[var(--color-text-body)] text-lg">{zone.title}</h3>
                      <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                        {zone.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. UPGRADE HOOK ────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 border-y border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Follow the Countries That Matter
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Free Readers Can Browse.
              <br />Pro Readers Track Their Markets.
            </h2>
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
              Founding Member Access | First 500 Only | Lifetime Price Lock
            </p>
          </div>
        </div>
      </section>

      {/* ─── 11. WHO USES COUNTRY NEWS? ─────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Who Uses Country News?
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Built for Trade Professionals with Cross-Border Responsibilities
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="px-4 py-16 md:px-6 md:py-20 border-t border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)]">
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
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-extrabold text-white md:text-4xl">
            India Trades with 195 Countries.
            <br />
            Know Every One.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-white/80">
            Your next export market might be a country you haven't tracked yet. Your next supply chain risk might be developing in a country you're not monitoring. IGEN COUNTRY NEWS gives you the structured bilateral intelligence to stay ahead.
          </p>
          <div className="grid gap-4 sm:grid-cols-4 text-left mb-10">
            {[
              { tier: "Free Reader", desc: "Browse all 195 country pages. Explore bilateral trade intelligence." },
              { tier: "Pro Reader", desc: "Follow 10 countries. Get alerts. Download export opportunity reports." },
              { tier: "Emerging Leader", desc: "Publish your insight on a bilateral trade relationship." },
              { tier: "Corporate", desc: "Build your corporate profile within key country pages." },
            ].map((p) => (
              <div key={p.tier} className="rounded-xl border border-white/10 bg-white/10 p-4">
                <p className="font-bold text-white text-sm mb-1">{p.tier}</p>
                <p className="text-xs text-white/70">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="mb-8 text-sm font-semibold text-[var(--color-accent-gold-light,#F4A024)]">
            🌟 ₹24,999/year — Founding Member Access. 195 Countries. One Platform. First 500 Professionals.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/country-news"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore Country Map
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
            >
              Follow Your Export Markets
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

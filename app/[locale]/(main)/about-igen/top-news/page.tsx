"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ──────────────────────────────────────────────────────────────────────

const fourPillars = [
  {
    icon: "🎙️",
    pillar: "Pillar 1",
    title: "IGEN Weekly Trade Podcast",
    subtitle: "India's Structured Trade Intelligence, Heard",
    desc: "The IGEN Weekly Trade Podcast brings IGEN's structured trade intelligence to audio — making it accessible during commutes, travel, and the moments when reading is not possible.",
    series: [
      "Weekly Trade Podcast — top 5 trade developments",
      "Leader Interviews — CEOs, Trade Secretaries, Founders",
      "Sector Focus Series — dedicated episodes for 20 sectors",
      "Corporate Voices — structured industry insights",
      "FLC Special Episodes — founding leader conversations",
    ],
  },
  {
    icon: "🏢",
    pillar: "Pillar 2",
    title: "Top Company News",
    subtitle: "India's Most Significant Corporate Trade Moves",
    desc: "Not a PR feed. Structured editorial coverage of the corporate developments most significant to India's trade landscape — ranked, contextualised, and indexed.",
    categories: [
      "Top Corporate Moves — strategic weekly announcements",
      "Fastest Growing Companies — trade momentum rankings",
      "Corporate Spotlight — in-depth weekly features",
      "Earnings Highlights — trade-contextualised results",
      "Industry Dominators — tracking sector leaders",
    ],
  },
  {
    icon: "👤",
    pillar: "Pillar 3",
    title: "Top Leader News",
    subtitle: "India's Most Influential Trade Voices",
    desc: "Leadership in trade is about impact — on sectors, bilateral relationships, and policy. TOP LEADER NEWS measures and recognises that impact.",
    rankings: [
      "Most Influential Leaders — structured narrative impact",
      "Leader Momentum Index — real-time influence signals",
      "Leader of the Month — most prestigious editorial award",
      "Rising Industry Voices — emerging leaders to watch",
      "FLC Highlights — founding leader community insights",
    ],
  },
  {
    icon: "🌍",
    pillar: "Pillar 4",
    title: "Top Country News",
    subtitle: "Bilateral Trade Relationships Gaining Momentum",
    desc: "Surfacing the bilateral relationships that matter most — right now. Weekly activity, monthly spotlights, and quarterly growth leaders.",
    features: [
      "Most Active Trade Country — weekly engagement signals",
      "Country Spotlight — complete monthly intelligence",
      "Bilateral Growth Leader — fastest-growing quarterly pairing",
      "Strategic Trade Region — ASEAN, GCC, EU spotlights",
      "Investment Focus — countries generating corporate interest",
    ],
  },
];

const recognitionEconomy = [
  {
    entity: "Company",
    benefits: [
      "Gains structured, searchable, editorial coverage",
      "Signals industry significance to partners and clients",
      "Creates permanent SEO asset under sector + company",
      "Provides shareable content for corporate communications",
    ],
    bg: "bg-blue-900/40",
    border: "border-blue-500/30",
  },
  {
    entity: "Leader",
    benefits: [
      "Validates professional positioning and authority",
      "Creates an SEO-indexed recognition record",
      "Builds professional credibility with potential partners",
      "Generates content for referencing in professional contexts",
    ],
    bg: "bg-purple-900/40",
    border: "border-purple-500/30",
  },
  {
    entity: "Country Relationship",
    benefits: [
      "Signals bilateral opportunity to exporters",
      "Generates interest from trade bodies and missions",
      "Creates a structured reference document for the moment",
    ],
    bg: "bg-emerald-900/40",
    border: "border-emerald-500/30",
  },
];

const monetisationArchitecture = [
  { title: "Podcast Sponsorships", desc: "Sector-focused episodes, leader interviews, and regional trade series integrations." },
  { title: "Corporate Spotlight", desc: "Sponsorship-friendly visibility and co-branded intelligence briefs for Corporate members." },
  { title: "Recognition Upsell", desc: "Emerging Leader and FLC members gain enhanced chances for prestigious editorial recognition." },
  { title: "Country Partnerships", desc: "Amplification for trade bodies, embassies, and export promotion councils." },
  { title: "Annual Top 100", desc: "Sponsorship-ready high-value rankings of companies, leaders, and trade relationships." },
];

const listenerJourney = [
  { step: 1, action: "Discovery", desc: "Professional finds IGEN podcast on Spotify or Apple Podcasts." },
  { step: 2, action: "Intelligence", desc: "Episode provides valuable sector or bilateral trade insights." },
  { step: 3, action: "Visit", desc: "Listener visits indiaglobalnews.com to read the full intelligence briefs." },
  { step: 4, action: "Experience", desc: "Reader engages with FEED, HEADLINES, and SECTOR NEWS channels." },
  { step: 5, action: "Conversion", desc: "Follow limit reached → Upgrade to Pro Reader or higher." },
];

const faqs = [
  {
    q: "What is IGEN TOP NEWS?",
    a: "IGEN's prestige content layer — featuring the Weekly Trade Podcast, Top Company News, Top Leader News, and Top Country News. It is built to be the platform's pinnacle for recognition and audio-first intelligence.",
  },
  {
    q: "How does IGEN select companies for Corporate Spotlight?",
    a: "Editorial selection is independent, based on trade significance and sector impact. Corporate Plan members gain enhanced visibility and co-branded intelligence opportunities.",
  },
  {
    q: "How is the Leader of the Month selected?",
    a: "By IGEN's editorial team, using the Leader Momentum Index — combining mentions, engagement, and community response. It is not a paid placement.",
  },
  {
    q: "Where can I listen to the IGEN Trade Podcast?",
    a: "Available directly on indiaglobalnews.com and on major platforms like Spotify, Apple Podcasts, and Google Podcasts.",
  },
  {
    q: "Can my company be featured in Top Company News?",
    a: "Significant developments are eligible for coverage. Corporate Plan subscribers receive structured visibility and priority consideration for spotlight features.",
  },
  {
    q: "Can I apply to be a guest on the Podcast?",
    a: "Emerging Leader and FLC members have priority. All trade professionals can reach out to the editorial team for consideration.",
  },
  {
    q: "What is the Bilateral Growth Leader feature?",
    a: "A quarterly spotlight on the fastest-growing trade relationship between India and a partner country, based on composite IGEN data signals.",
  },
  {
    q: "Is TOP NEWS free to access?",
    a: "Top News articles and podcast episodes are free. Deeper intelligence features like briefs and reports require Pro Reader access.",
  },
  {
    q: "How often is the Weekly Trade Podcast published?",
    a: "Every Monday, briefing professionals on the preceding week's most significant trade developments.",
  },
  {
    q: "What is the FLC Special Episode?",
    a: "Exclusive audio conversations with IGEN's first 100 Founding Leaders, covering their sectors and professional journeys.",
  },
];

// ── FAQ Accordion Component ───────────────────────────────────────────────────

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

// ── Page Component ─────────────────────────────────────────────────────────────

export default function TopNewsLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AboutIGENMegaMenuNav />

      {/* ─── 1. HERO BANNER ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary-dark)] to-[var(--color-primary-dark)] px-4 py-20 md:px-6 md:py-28 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[var(--color-accent-gold-light,#F0652E)]/30 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-light,#F0652E)]">
            🏆 Mega Menu 9 — The Prestige Layer
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/60">
            The Best of IGEN. Elevated. Celebrated. Amplified.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-white">
            Where India's Top Trade Stories,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-gold-light,#F0652E)] to-amber-200">
              Companies, Leaders, and Countries
            </span>
            <br />
            Get the Recognition They Deserve
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg" style={{overflowWrap: "break-word", wordBreak: "normal"}}>
            IGEN TOP NEWS is the prestige layer of the platform — featuring the Weekly Trade Podcast, Top Corporate Moves, Most Influential Leaders, and Top Country Spotlight.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/top-news"
              className="group flex items-center gap-2 rounded-full bg-[var(--color-accent-gold-light,#F0652E)] px-8 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:scale-105"
            >
              <span className="text-lg">🎙️</span> Listen to the Podcast
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Nominate a Leader or Company
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. WHAT IS TOP NEWS? ────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                The Pinnacle of IGEN
              </span>
              <h2 className="mb-6 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-4xl">
                The Prestige and Revenue Engine of IGEN
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                <p>
                  Every platform needs a pinnacle — a layer where the best rises to the surface and gets the recognition that builds lasting reputation.
                </p>
                <p>
                  In physical exhibitions, this is the keynote stage. The headline sponsor. The featured speaker. The most prominent booth in the hall.
                </p>
                <p className="font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  IGEN TOP NEWS is that digital stage.
                </p>
                <p>
                  It is structured to be four things simultaneously: a reader destination, a recognition engine, a sponsorship-ready commercial layer, and a podcast amplification platform.
                </p>
              </div>
              <div className="mt-8 rounded-xl bg-[var(--color-primary)]/5 border-l-4 border-[var(--color-primary)] p-5 italic text-[var(--color-text-body)]">
                "Top News will eventually shift to the #1 revenue position on IGEN. Top is monetisable." — IGEN Founder
              </div>
            </div>
            {/* Visual element */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-gold-dark)] opacity-20 blur group-hover:opacity-40 transition-opacity"></div>
              <div className="relative rounded-2xl bg-white dark:bg-[var(--color-neutral-white)] p-8 shadow-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20 pb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl shadow-inner">🏆</div>
                    <div>
                      <h4 className="font-bold text-[var(--color-text-body)]">Industry Recognition</h4>
                      <p className="text-xs text-[var(--color-neutral-dark)]">Building long-term digital reputations</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["Audience Discovery", "Commercial Sponsorship", "Leader Interviews", "Revenue Growth"].map((item, i) => (
                      <div key={item} className="flex items-center justify-between text-sm">
                        <span className="text-[var(--color-text-body)]">{item}</span>
                        <div className="h-1.5 w-24 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className={`h-full rounded-full bg-[var(--color-primary)]`} style={{width: `${90 - (i*15)}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FOUR TOP NEWS PILLARS ──────────────────────────────────── */}
      {fourPillars.map((pillar, idx) => (
        <section key={pillar.pillar} className={`px-4 py-16 md:px-6 md:py-24 ${idx % 2 === 1 ? 'bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]' : ''}`}>
          <div className="mx-auto max-w-7xl">
            <div className={`grid gap-12 lg:grid-cols-2 ${idx % 2 === 1 ? 'lg:direction-rtl' : ''} lg:items-center`}>
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-4 inline-flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-xl text-white shadow-lg">{pillar.icon}</span>
                  <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-accent-gold-dark)]">{pillar.pillar}</span>
                </div>
                <h2 className="mb-2 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                  {pillar.title}
                </h2>
                <h3 className="mb-6 text-lg font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {pillar.subtitle}
                </h3>
                <p className="mb-8 text-base text-[var(--color-neutral-dark)] dark:text-gray-400 leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="grid gap-4">
                  {(pillar.series || pillar.categories || pillar.rankings || pillar.features).map((item, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-[var(--color-neutral-light)] bg-white p-4 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)] transition-all hover:translate-x-1 hover:border-[var(--color-primary)]/20">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)] opacity-60" />
                      <p className="text-sm font-medium text-[var(--color-text-body)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`aspect-square sm:aspect-video lg:aspect-[4/3] rounded-3xl bg-gradient-to-br overflow-hidden shadow-2xl flex items-center justify-center p-8 text-center
                  ${idx === 0 ? 'from-[var(--color-primary)] to-[var(--color-secondary)]' :
                    idx === 1 ? 'from-[var(--color-primary-dark)] to-[var(--color-primary)]' :
                    idx === 2 ? 'from-[var(--color-accent-green-dark)] to-[var(--color-accent-green)]' :
                    'from-[var(--color-accent-gold-dark)] to-[var(--color-accent-gold)]'}`}>
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  <div className="relative text-white">
                    <div className="text-8xl mb-6 opacity-80">{pillar.icon}</div>
                    <div className="text-2xl font-bold tracking-tight">{pillar.title}</div>
                    <div className="mt-2 text-white/50 text-sm font-medium uppercase tracking-widest">{pillar.subtitle}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── 4. THE RECOGNITION ECONOMY ───────────────────────────────────── */}
      <section className="px-4 py-20 bg-[var(--color-primary)] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="mx-auto max-w-7xl relative">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-light,#F0652E)]">
              Beyond Intelligence
            </span>
            <h2 className="font-display text-4xl font-bold mb-4">The Recognition Economy</h2>
            <p className="max-w-2xl mx-auto text-white/70">Recognition is not vanity. In trade, recognition is a commercial asset.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {recognitionEconomy.map((e) => (
              <div key={e.entity} className={`rounded-3xl border ${e.border} ${e.bg} p-8 backdrop-blur-sm shadow-2xl`}>
                <h3 className="text-xl font-bold mb-6 text-[var(--color-accent-gold-light,#F0652E)]">When a {e.entity} Is Featured:</h3>
                <ul className="space-y-5">
                  {e.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="shrink-0 mt-1 h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">✓</div>
                      <span className="text-white/80 text-sm leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. MONETISATION ARCHITECTURE ────────────────────────────────── */}
      <section className="px-4 py-20 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Commercial Engine
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)]">Monetisation Architecture</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {monetisationArchitecture.map((m, i) => (
              <div key={i} className="group relative rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)] transition-all hover:border-[var(--color-primary)] hover:shadow-lg">
                <div className="mb-6 h-1 w-12 bg-[var(--color-primary)] opacity-20 group-hover:w-full transition-all duration-500"></div>
                <h3 className="mb-3 font-bold text-[var(--color-text-body)]">{m.title}</h3>
                <p className="text-xs leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. LISTENER JOURNEY ────────────────────────────────────────── */}
      <section className="px-4 py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Audience Growth
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)]">
              Podcast Listener to Subscriber Journey
            </h2>
          </div>
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-1/2 left-0 right-0 hidden h-0.5 -translate-y-1/2 bg-[var(--color-primary)] opacity-10 lg:block"></div>
            <div className="grid gap-8 lg:grid-cols-5">
              {listenerJourney.map((step) => (
                <div key={step.step} className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-xl font-bold text-white shadow-xl">
                    {step.step}
                  </div>
                  <h3 className="mb-2 font-bold text-[var(--color-text-body)]">{step.action}</h3>
                  <p className="text-xs text-[var(--color-neutral-dark)] dark:text-gray-400 leading-relaxed px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-16 text-center text-lg font-medium italic text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            "The podcast is not just content. It is IGEN's outermost acquisition funnel."
          </p>
        </div>
      </section>

      {/* ─── 7. FAQ ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-24 border-t border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              FAQ
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)]">Frequently Asked Questions</h2>
          </div>
          <div className="rounded-3xl border border-[var(--color-neutral-light)] bg-white p-8 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <FAQ faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ─── 8. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-t from-[var(--color-neutral-light)]/20 to-transparent dark:from-[var(--background)]/20 px-4 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 font-display text-3xl font-extrabold text-[var(--color-text-body)] md:text-5xl">
            The Best of Trade Intelligence —
            <br />
            Heard, Read, and Recognised
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400 max-w-2xl mx-auto" style={{overflowWrap: "break-word", wordBreak: "normal"}}>
            IGEN TOP NEWS is where serious trade professionals get seen. Join the platform while Founding pricing lasts.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left mb-16">
            {[
              { tier: "Free Reader", desc: "Listen to the Weekly Podcast. Read Top News." },
              { tier: "Pro Reader", desc: "Download structured recognition reports & briefs." },
              { tier: "Emerging Leader", desc: "Be featured in Rising Industry Voices & podcast." },
              { tier: "Corporate", desc: "Co-brand corporate intelligence briefs." },
            ].map((p) => (
              <div key={p.tier} className="bg-white dark:bg-[var(--color-neutral-white)] p-6 rounded-2xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20 shadow-xl shadow-gray-100 dark:shadow-none hover:-translate-y-1 transition-transform">
                <p className="font-black text-[var(--color-primary)] text-sm mb-2">{p.tier}</p>
                <p className="text-xs text-[var(--color-neutral-dark)] dark:text-gray-400 leading-normal">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/top-news"
              className="rounded-full bg-[var(--color-primary)] px-10 py-4 text-sm font-bold text-white shadow-2xl shadow-blue-900/40 transition-all hover:scale-105"
            >
              Listen to the Podcast
            </Link>
            <Link
              href="/top-news"
              className="rounded-full border border-[var(--color-primary)]/20 bg-white px-10 py-4 text-sm font-bold text-[var(--color-primary)] transition-all hover:bg-gray-50 dark:bg-transparent dark:border-white/20 dark:text-white"
            >
              Read Top News
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full bg-[var(--color-accent-gold-dark)] px-10 py-4 text-sm font-bold text-white shadow-2xl shadow-amber-900/40 transition-all hover:scale-105"
            >
              Explore All Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

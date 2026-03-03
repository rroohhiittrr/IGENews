"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ─────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: "📊",
    title: "Industry Reports",
    subtitle: "Quarterly Structured Intelligence Documents",
    desc: "IGEN's industry reports synthesise three months of sectoral, bilateral, and leadership data into coherent, usable reference documents for professionals and policymakers.",
    items: [
      "Quarterly Sector Reports (20 sectors)",
      "Industry Intelligence Briefs",
      "Country Intelligence Reports",
      "Risk Analysis Reports",
      "Export Opportunity Maps"
    ]
  },
  {
    icon: "🏆",
    title: "Rankings",
    subtitle: "Validated Intelligence That Creates Reference Points",
    desc: "Methodology-backed rankings that become industry standards used for board presentations, hiring, and strategic market positioning.",
    items: [
      "Industry Growth Ranking (1,000 industries)",
      "Leader Ranking (Momentum Index)",
      "Corporate Ranking (Intelligence Signals)",
      "Sector Activity Ranking",
      "Country Trade Ranking (195 partners)"
    ]
  },
  {
    icon: "🗳️",
    title: "Surveys and Polls",
    subtitle: "Professional Sentiment Data",
    desc: "Real-time pulse checks from India's most targeted trade panel — senior professionals, exporters, and corporate leaders across all 20 sectors.",
    items: [
      "Industry Sentiment Poll (Monthly)",
      "Export Outlook Survey (Quarterly)",
      "Leader Confidence Index",
      "Corporate Outlook Survey",
      "Annual Trade Survey (Flagship)"
    ]
  },
  {
    icon: "📄",
    title: "Whitepapers",
    subtitle: "Highest-Value Structured Research",
    desc: "Where corporate internal expertise meets IGEN's research infrastructure to produce long-form, co-branded, high-authority research documents.",
    items: [
      "Sponsored Reports",
      "Corporate Whitepapers",
      "Trade Outlook Books",
      "Annual Intelligence Book (Flagship)",
      "Structured Download Centre"
    ]
  }
];

const authorityEffects = [
  {
    title: "Citation Authority",
    desc: "When strategists cite IGEN rankings in board presentations, IGEN becomes a reference institution, not just a news source."
  },
  {
    title: "SEO Authority",
    desc: "Long-form research documents rank on Google for high-value search queries, compounding discovery surface over years."
  },
  {
    title: "Policy Influence",
    desc: "Structured surveys reach policymakers and trade academics, influencing the very environment India's trade operates in."
  },
  {
    title: "Sponsorship Value",
    desc: "Research products command significantly higher rates. A sector report is worth 10x the sponsorship value of a standard article."
  }
];

const audiences = [
  {
    role: "Corporate Strategists",
    needs: "Need quarterly sector intelligence for board presentations and market entry planning — structured research, not just news."
  },
  {
    role: "Export Promotion Bodies",
    needs: "Use bilateral opportunity maps and country intelligence reports to guide exporter outreach and market development programs."
  },
  {
    role: "Trade Policy Officials",
    needs: "Use professional sentiment indices to understand real-time community response to policy initiatives and trade shifts."
  },
  {
    role: "Investment Analysts",
    needs: "Track momentum indices as leading indicators of sector performance, especially where public market data is limited."
  },
  {
    role: "Corporate Plan Members",
    needs: "Commission whitepapers as part of their structured visibility and thought leadership strategy on the IGEN platform."
  }
];

const pricingTable = [
  { product: "Read Report Summaries", free: "✓", pro: "✓", leader: "✓", corporate: "✓" },
  { product: "Download Quarterly Reports", free: "—", pro: "✓", leader: "✓", corporate: "✓" },
  { product: "Survey Participation", free: "—", pro: "✓", leader: "✓", corporate: "✓" },
  { product: "Whitepaper Download Centre", free: "—", pro: "✓", leader: "✓", corporate: "✓" },
  { product: "Annual Intelligence Book", free: "—", pro: "✓", leader: "✓", corporate: "✓" },
  { product: "Commission Corporate Whitepaper", free: "—", pro: "—", leader: "—", corporate: "✓" },
  { product: "Co-branded Research Reports", free: "—", pro: "—", leader: "—", corporate: "✓" }
];

const faqs = [
  {
    q: "What is the Trade Intelligence Lab?",
    a: "IGEN's research authority layer — publishing quarterly reports, structured rankings, professional sentiment surveys, and sponsored whitepapers that convert IGEN's daily content intelligence into long-form reference documents."
  },
  {
    q: "How is a Quarterly Sector Report different from a news article?",
    a: "A news article covers a single development. A Quarterly Sector Report synthesises three months of developments across a sector — trade flows, policy changes, leadership movements, and risk signals — into a structured 15–30 page document."
  },
  {
    q: "Are the rankings validated?",
    a: "Yes. IGEN's rankings are based on composite intelligence signals from across the platform — article volume, reader engagement, export/import signals, and editorial assessment. Methodology is documented with each publication."
  },
  {
    q: "What is a Sponsored Report?",
    a: "A research document commissioned by a corporate entity and produced by IGEN's research team — with IGEN maintaining editorial control and the sponsor listed transparently for credibility."
  },
  {
    q: "Can I commission a whitepaper as a Corporate Plan member?",
    a: "Yes. Corporate Plan members have access to co-branded intelligence brief and whitepaper opportunities through IGEN's research team. Contact the corporate team to discuss scope."
  },
  {
    q: "What is the Annual Trade Survey?",
    a: "IGEN's flagship annual survey of the professional community — covering sector performance, bilateral priorities, and outlook across all 20 sectors. The most comprehensive study of its kind in India."
  }
];

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
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

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function TradeIntelligenceLabPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AboutIGENMegaMenuNav />

      {/* ─── 1. HERO BANNER ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] px-4 py-20 text-white md:px-6 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(var(--color-neutral-light) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            🔬 Mega Menu 10 — Research Authority
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-gold-light,#F4A024)]">
            News Informs. Intelligence Transforms.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-white">
            IGEN Trade Intelligence Lab —
            <br />
            Where India's Trade Knowledge Becomes Research
          </h1>
          <p className="mx-auto mb-10 w-full max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
            The Trade Intelligence Lab is IGEN's research authority layer — publishing quarterly industry reports, structured rankings, professional sentiment surveys, and sponsored whitepapers that transform daily news into reference documents used by industry leaders.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/trade-intelligence-lab"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Browse Intelligence Reports
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Download Latest Ranking
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. WHAT IS THE LAB? ─────────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                The Lab Philosophy
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
                From News Platform to Reference Institution
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                IGEN's ambition is not to remain a news platform. It is to become India's reference institution for structured trade intelligence. The Trade Intelligence Lab is where that transformation happens.
              </p>
              <p className="mb-8 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Every day, IGEN publishes 120+ structured articles. The Lab converts this raw volume into quarterly sector analysis, validated rankings, and professional sentiment data that endures.
              </p>
              <div className="rounded-2xl border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-6 dark:bg-[var(--color-primary)]/10">
                <p className="text-lg font-medium italic text-[var(--color-text-body)]">
                  "IGEN must not remain news. It must become reference institution."
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-[var(--color-neutral-mid)]">
                  — IGEN Founder
                </p>
              </div>
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-blue-900 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/graphy.png')" }} />
                <div className="relative flex h-full flex-col items-center justify-center p-8 text-center text-white">
                  <div className="text-8xl mb-6">📉</div>
                  <div className="text-2xl font-bold">120+ Articles Daily</div>
                  <div className="text-white/60 mt-2">Converted into structured research</div>
                  <div className="mt-8 space-y-3 w-full">
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-[var(--color-accent-gold-dark)]" />
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-[var(--color-primary-light)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FOUR LAB PILLARS ─────────────────────────────────────────────── */}
      <section className="bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:bg-[var(--background)] md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
              Four Lab Pillars
            </h2>
            <p className="mt-4 text-[var(--color-neutral-dark)] dark:text-gray-400">
              Research intelligence products that generate trust and strategic value.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group rounded-3xl border border-[var(--color-neutral-light)] bg-white p-8 shadow-sm transition-all hover:border-[var(--color-primary)]/30 hover:shadow-xl dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 text-4xl dark:bg-[var(--color-primary-light)]/10">
                    {pillar.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-display text-xl font-bold text-[var(--color-text-body)]">
                      {pillar.title}
                    </h3>
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                      {pillar.subtitle}
                    </p>
                    <p className="mb-6 text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                      {pillar.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.items.map((item, i) => (
                        <span key={i} className="rounded-lg bg-[var(--color-neutral-light)]/50 px-3 py-1.5 text-[11px] font-semibold text-[var(--color-text-body)] dark:bg-[var(--background)]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. AUTHORITY COMPOUNDING EFFECT ─────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="grid gap-4 sm:grid-cols-2">
                {authorityEffects.map((effect, idx) => (
                  <div key={idx} className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
                    <h4 className="mb-2 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                      {effect.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                      {effect.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                The Compound Advantage
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
                Research Authority Is IGEN's Most Durable Asset
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Media platforms compete on speed. Research platforms compete on depth and credibility. By publishing methodology-backed research, IGEN builds authority that news alone cannot create.
              </p>
              <p className="text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                A quarterly sector report is worth 10x the sponsorship value of an article because it stays relevant for months, not hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. WHO USES THE LAB? ───────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
              Who Uses the Lab?
            </h2>
            <p className="mt-4 text-[var(--color-neutral-dark)] dark:text-gray-400">
              Five audiences with five different research needs.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {audiences.map((audience, idx) => (
              <div key={idx} className="flex flex-col rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
                <h3 className="mb-3 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {audience.role}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {audience.needs}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. PRICING AND ACCESS ───────────────────────────────────────────── */}
      <section className="bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:bg-[var(--background)] border-y border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Access the Lab
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
              Research Intelligence at Every Level
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-xl dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <div className="grid grid-cols-5 bg-[var(--color-neutral-light)]/50 px-2 py-3 text-center text-[10px] font-black uppercase tracking-widest text-[var(--color-neutral-mid)] dark:bg-[var(--background)]">
              <div className="col-span-1 border-r text-left pl-4">Product</div>
              <div className="col-span-1 border-r">Free</div>
              <div className="col-span-1 border-r text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">Pro</div>
              <div className="col-span-1 border-r">Leader</div>
              <div className="col-span-1">Corporate</div>
            </div>
            {pricingTable.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 border-t border-[var(--color-neutral-light)] text-center dark:border-[var(--color-neutral-mid)]/20"
              >
                <div className="col-span-1 border-r px-4 py-4 text-left text-[11px] font-bold text-[var(--color-text-body)]">
                  {row.product}
                </div>
                <div className="col-span-1 border-r px-2 py-4 text-sm text-[var(--color-neutral-mid)]">{row.free}</div>
                <div className="col-span-1 border-r px-2 py-4 text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">{row.pro}</div>
                <div className="col-span-1 border-r px-2 py-4 text-sm text-[var(--color-neutral-mid)]">{row.leader}</div>
                <div className="col-span-1 px-2 py-4 text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">{row.corporate}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/reader-plans"
              className="rounded-full bg-[var(--color-primary)] px-10 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Upgrade to Pro — ₹24,999/year
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)]">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ─── 8. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-primary)] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 font-display text-4xl font-extrabold text-white">
            Intelligence That Compounds. Reports That Endure.
          </h2>
          <p className="mb-12 text-lg text-white/80">
            The Trade Intelligence Lab is where IGEN's daily content volume becomes permanent research authority. Cite an IGEN ranking in your next board presentation.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left mb-12">
            {[
              { tier: "Free Reader", desc: "Access report summaries. See what research looks like." },
              { tier: "Pro Reader", desc: "Download quarterly reports & annual intelligence books." },
              { tier: "Emerging Leader", desc: "Contribute expertise & be cited as a sector expert." },
              { tier: "Corporate", desc: "Commission research & co-brand intelligence briefs." },
            ].map((p) => (
              <div key={p.tier} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="font-bold text-white text-sm mb-1">{p.tier}</p>
                <p className="text-xs text-white/60">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/trade-intelligence-lab"
              className="rounded-full bg-[var(--color-accent-gold-dark)] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-opacity-90"
            >
              Browse Research Reports
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white hover:bg-white/20"
            >
              Commission a Whitepaper
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

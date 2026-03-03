"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ─────────────────────────────────────────────────────────────────────

const foundingCircles = [
  {
    id: "fpc",
    title: "FPC — Founding Professionals Community",
    subtitle: "For Pro Reader Plan members",
    tagline: "India's First Structured Trade Intelligence Professional Circle",
    description: "The FPC is IGEN's founding community for serious trade professionals — the first 500 individuals who commit to structured trade intelligence through the Pro Reader plan. These are not just subscribers. They are the founding reader community of IGEN NEWS PLATFORM.",
    limit: "Strictly limited to 500 professionals. No exceptions.",
    benefits: [
      "Founding Professional Digital Badge",
      "Name Listed on IGEN's Founding Wall",
      "Early Access to New Features",
      "Quarterly Founding Professional Virtual Meet",
      "Priority Industry Poll Participation",
      "Founding Certificate",
      "Lifetime Price Protection"
    ],
    cta: "Join FPC — ₹24,999/year",
    slots: "Slots Remaining: 422" // Mock counter
  },
  {
    id: "flc",
    title: "FLC — Founding Leaders Community",
    subtitle: "For Emerging Leader Plan members",
    tagline: "Charter Circle of India's Emerging Industry Voices",
    description: "The FLC is IGEN's most exclusive individual membership — limited to the first 100 leaders who join at Charter Leader level. These are the professionals whose insights, presence, and advocacy will shape the platform's authority trajectory for years.",
    limit: "Strictly limited to 100 leaders. No expansion planned.",
    benefits: [
      "Charter Leader Badge and Recognition",
      "Premium Leader Profile with Priority Google Indexing",
      "Homepage Carousel Feature",
      "Annual Founding Leader Roundtable",
      "Priority Podcast Invitation",
      "Quarterly Leader Insight Guaranteed Publication Window",
      "Founder Recognition Letter",
      "Public Announcement Post"
    ],
    cta: "Join FLC — ₹69,999/year",
    slots: "Only 12 Slots Remaining" // Mock counter
  },
  {
    id: "fcc",
    title: "FCC — Founding Corporate Community",
    subtitle: "For Corporate Plan members",
    tagline: "Founding Corporate Trade Partners of IGEN",
    description: "The FCC is IGEN's most exclusive corporate membership — limited to the first 20 companies who commit at Corporate Plan level. These companies are not advertisers. They are founding institutional partners of India's most structured trade intelligence platform.",
    limit: "Strictly limited to 20 corporates. Founding Corporate status is permanent.",
    benefits: [
      "Founding Corporate Seal",
      "Priority Industry Placement",
      "Annual Corporate Feature Article",
      "Quarterly Trade Intelligence Brief Co-branding",
      "Executive Roundtable Participation",
      "Press Release Amplification",
      "Founding Corporate Recognition Plaque",
      "Permanent Legacy Recognition"
    ],
    cta: "Founding Corporate Partner — ₹3,00,000/year",
    slots: "Only 20 Total Slots"
  }
];

const discussions = [
  { title: "Industry Discussion Threads", desc: "Structured conversations around specific industries — news interpretation, strategy questions, and professional peer exchange." },
  { title: "Country Discussion", desc: "Bilateral-focused discussion spaces for exporters, importers, and trade consultants." },
  { title: "Leader AMA Sessions", desc: "Moderated discussions where the community can engage directly with sector experts and Founding Leaders." },
  { title: "Corporate Announcements", desc: "A structured space for Corporate Plan members to share significant developments within the community context." },
  { title: "Suggest Industry Coverage", desc: "A direct feedback mechanism for IGEN's editorial team to shape content factory priorities." }
];

const pillars = [
  { title: "Status", desc: "A badge, a founding wall listing, a charter seal. Status signals credibility to peers and potential partners." },
  { title: "Recognition", desc: "Being named, featured, spotlighted, and celebrated through structured, credible channels." },
  { title: "Identity", desc: "Founding members are part of an institutional authority that does not expire with the subscription." }
];

const calendar = [
  { period: "Monthly", items: ["Leader of the Month", "Top FPC Contributor Highlight", "Corporate Spotlight", "Community Poll Results"] },
  { period: "Quarterly", items: ["FPC Virtual Meet", "FLC Leader Roundtable", "FCC Executive Roundtable", "Founding Wall Updates"] },
  { period: "Annually", items: ["Annual Founding Leader Roundtable", "Annual Intelligence Book Launch", "Recognition Certificates", "Annual Trade Survey"] }
];

const faqs = [
  { q: "What is the difference between FPC, FLC, and FCC?", a: "FPC is for Pro Readers (first 500), FLC is for Emerging Leaders (first 100), and FCC is for Corporate members (first 20)." },
  { q: "Can I be part of more than one founding circle?", a: "No. Each founding circle is tied to a specific plan level." },
  { q: "What happens after the founding slots fill?", a: "New subscribers continue to join at standard prices, but founding status and benefits are no longer available. Ever." },
  { q: "Is the Founding Wall permanent?", a: "Yes. It is a permanent, SEO-indexed page listing all founding members and partners. It does not expire." },
  { q: "Can founding members lose their status?", a: "Founding status and price protection are maintained as long as the subscription remains active." },
  { q: "What is the Quarterly Virtual Meet for FPC?", a: "A closed-door session with IGEN's leadership for intelligence briefings, platform updates, and networking." },
  { q: "Who is invited to the Annual Founding Leader Roundtable?", a: "All 100 FLC Charter Leaders are invited to this hybrid or virtual gathering." },
  { q: "Is the FCC recognition visible to general readers?", a: "Yes, the FCC seal is displayed on corporate profile pages and visible to everyone." },
  { q: "Can I suggest industry coverage as a community member?", a: "Yes, all community members can suggest coverage; however, FPC, FLC, and FCC members have priority consideration." },
  { q: "Are community discussions moderated?", a: "Yes, for professional standards, factual accuracy, and community guidelines compliance." }
];

// ── COMPONENTS ───────────────────────────────────────────────────────────────

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

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Mega Menu Nav */}
      <AboutIGENMegaMenuNav />

      {/* ─── HERO BANNER ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] px-4 py-20 text-white md:px-6 md:py-28">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
            🟢 Mega Menu 11 — Retention Engine
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F4A024]">
            People Don't Just Pay for Access. They Pay for Belonging.
          </p>
          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Join the Community That Is Building India's Structured Trade Intelligence Ecosystem
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
            IGEN COMMUNITY is where India's trade professionals, emerging leaders, and corporate partners come together in three founding prestige circles — FPC, FLC, and FCC.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/reader-plans" className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
              Join the Community →
            </Link>
            <Link href="#circles" className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold backdrop-blur-sm transition-all hover:bg-white/20">
              Explore Founding Circle Benefits
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHAT IS IGEN COMMUNITY? ───────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                The Retention and Prestige Engine
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
                Digital platforms build traffic. Institutional platforms build community.
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                <p>
                  IGEN's goal is not to be the most visited trade platform — it is to be the one that serious trade professionals <strong>belong to</strong>. The distinction matters enormously.
                </p>
                <p>
                  Traffic is generated by algorithms. It is anonymous. Community is built by belonging. It is recognised. It is invested.
                </p>
                <div className="rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-4 italic text-[var(--color-text-body)]">
                  "Subscribers who feel recognised renew." — IGEN Internal Constitution
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[var(--color-neutral-light)]/50 p-6 dark:bg-[var(--color-neutral-white)]/5">
                <h4 className="mb-2 font-bold">Traffic</h4>
                <p className="text-sm opacity-70">Anonymous, transactional, and ephemeral. Algorithms drive it, but belonging sustains it.</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-6 shadow-sm">
                <h4 className="mb-2 font-bold text-[var(--color-primary)]">Community</h4>
                <p className="text-sm opacity-70">Recognised, invested, and durable. It renews because members feel seen and heard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE THREE FOUNDING CIRCLES ─────────────────────────────────────── */}
      <section id="circles" className="bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:bg-[var(--background)] dark:border-y dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
              The Three Founding Prestige Circles
            </h2>
            <p className="mt-4 text-[var(--color-neutral-dark)]">Exclusive access for IGEN's founding members.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {foundingCircles.map((circle) => (
              <div key={circle.id} className="flex flex-col rounded-3xl border border-[var(--color-neutral-light)] bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">{circle.subtitle}</span>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-[var(--color-text-body)]">{circle.title}</h3>
                  <p className="mt-3 text-sm italic text-[var(--color-accent-gold-dark)]">"{circle.tagline}"</p>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {circle.description}
                </p>
                <div className="mb-6 flex-1 text-sm">
                  <p className="mb-3 font-bold uppercase tracking-tighter text-[var(--color-text-body)]">Member Benefits:</p>
                  <ul className="space-y-2">
                    {circle.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">✓</span>
                        <span className="text-sm opacity-80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto border-t border-[var(--color-neutral-light)] pt-6 dark:border-[var(--color-neutral-mid)]/20">
                  <p className="mb-4 text-xs font-bold text-red-600 uppercase">{circle.limit}</p>
                  <Link href="/reader-plans" className="block w-full rounded-xl bg-[var(--color-primary)] py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-90">
                    {circle.cta}
                  </Link>
                  <p className="mt-2 text-center text-xs font-medium text-[var(--color-neutral-mid)]">{circle.slots}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY DISCUSSIONS ─────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Community Discussions
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
              Where Trade Professionals Think Together
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {discussions.map((d, i) => (
              <div key={i} className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
                <div className="mb-4 text-3xl">💬</div>
                <h4 className="mb-2 font-bold text-[var(--color-text-body)]">{d.title}</h4>
                <p className="text-sm text-[var(--color-neutral-dark)] dark:text-gray-400">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PSYCHOLOGY OF BELONGING ────────────────────────────────────── */}
      <section className="bg-[var(--color-primary)] px-4 py-16 text-white md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-3xl font-bold md:text-4xl">
                The Psychology of Belonging
              </h2>
              <p className="mb-8 text-lg text-white/80">
                Retention that subscriptions alone cannot build. IGEN's community provides status, recognition, and identity.
              </p>
              <div className="space-y-6">
                {pillars.map((p, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold">{p.title}</h4>
                      <p className="text-sm text-white/70">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-md">
              <p className="mb-6 text-xl font-medium leading-relaxed italic">
                "People pay for belonging. Recognition creates loyalty. Identity prevents churn."
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="h-12 w-12 rounded-full bg-white/20" />
                <div>
                  <p className="font-bold">IGEN Community Philosophy</p>
                  <p className="text-xs text-white/60">Internal Strategic Document</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RECOGNITION CALENDAR ──────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Stay Visible All Year
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)] md:text-4xl">
              Community Recognition Calendar
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {calendar.map((c, i) => (
              <div key={i} className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-8 dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
                <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-[var(--color-primary)]">{c.period}</h4>
                <ul className="space-y-4">
                  {c.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-gold-dark)]" />
                      <span className="text-sm font-medium opacity-80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ───────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-neutral-light)]/30 px-4 py-16 dark:bg-[var(--background)] dark:border-t dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--color-text-body)]">Frequently Asked Questions</h2>
          </div>
          <FAQ faqs={faqs} />
        </div>
      </section>

      {/* ─── FINAL CTA SECTION ──────────────────────────────────────────────── */}
      <section className="bg-[var(--color-primary)] px-4 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-4xl font-extrabold leading-tight md:text-5xl">
            You Are Not Joining a Platform. You Are Helping Build an Institution.
          </h2>
          <p className="mb-12 text-lg text-white/80">
            Join the founding community of India's structured trade intelligence platform. Become a member of the prestige circles today.
          </p>
          <div className="mb-12 grid gap-4 text-left sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <h5 className="font-bold">FPC</h5>
              <p className="text-xs opacity-70">First 500 Founding Professionals. Lifetime price protection.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <h5 className="font-bold">FLC</h5>
              <p className="text-xs opacity-70">First 100 Charter Leaders. Exclusive roundtable & podcasts.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <h5 className="font-bold">FCC</h5>
              <p className="text-xs opacity-70">First 20 Founding Corporates. Institutional co-branding.</p>
            </div>
          </div>
          <p className="mb-8 text-sm font-bold text-[#F4A024]">
            Founding slots fill when the community is complete — not on a calendar date. Join before yours is taken.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/reader-plans" className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] transition-transform hover:-translate-y-1">
              Join FPC
            </Link>
            <Link href="/reader-plans" className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold transition-transform hover:-translate-y-1">
              Apply for FLC
            </Link>
            <Link href="/reader-plans" className="rounded-full bg-[#F4A024] px-8 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-1">
              Corporate Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

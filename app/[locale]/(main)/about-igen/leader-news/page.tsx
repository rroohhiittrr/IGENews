"use client";

import Link from "next/link";
import { useState } from "react";
import AboutIGENMegaMenuNav from "@/components/about-igen/AboutIGENMegaMenuNav";

// ── DATA ──────────────────────────────────────────────────────────────────────

const corporateDesignations = [
  "CEO", "CFO", "CTO", "COO", "CHRO", "CIO", "CSO", "CMO",
  "Managing Director", "Executive Director", "President",
];

const entrepreneurialDesignations = [
  "Founder", "Co-Founder", "Chairman", "Vice Chairman", "Promoter",
];

const functionalDesignations = [
  "Chief Strategy Officer", "Chief Compliance Officer",
  "Chief Revenue Officer", "Chief Sustainability Officer",
];

const governmentDesignations = [
  "Trade Secretary", "Commerce Minister", "Export Promotion Council Head",
  "Ambassador & Trade Representative", "EXIM Policy Official",
];

const fourPillars = [
  {
    icon: "🏷️",
    pillar: "Pillar 1",
    title: "By Designation",
    desc: "Browse all leadership news filtered by specific designation. See only CEO news, or only Trade Secretary developments, or only Founder announcements. 25 clean designation lanes.",
  },
  {
    icon: "👤",
    pillar: "Pillar 2",
    title: "Leader Profiles",
    desc: "Structured, SEO-indexed profile pages for leaders active on IGEN. Emerging Leaders, Charter Leaders in the FLC founding circle, Most Active Leaders, Leader Rankings, and Leader Spotlights.",
  },
  {
    icon: "💡",
    pillar: "Pillar 3",
    title: "Leader Insights",
    desc: "Monthly published insights from leaders who contribute to IGEN. Most Discussed Leader Articles, Leader Interviews, Podcast Features, and AMA Sessions with trade professionals.",
  },
  {
    icon: "🛡️",
    pillar: "Pillar 4",
    title: "Leader Reputation Tools",
    desc: "Claim your leader profile. Build your SEO presence on IGEN. Publish your monthly industry insight. Get verified badge. Upgrade to Emerging Leader Plan for full profile activation.",
  },
];

const intelligenceSignals = [
  {
    icon: "👔",
    title: "CEO Movements & Announcements",
    desc: "When a CEO in your sector announces a new strategic direction, enters a new market, or signals a shift in trade policy engagement — that's intelligence that affects supply chains, competition, and opportunity.",
  },
  {
    icon: "📊",
    title: "CFO Signals",
    desc: "Financial leadership insights often precede market movements. Earnings commentary, investment signals, working capital strategy, and trade finance approach — CFO signals matter for the entire sector.",
  },
  {
    icon: "🚀",
    title: "Founder Insights",
    desc: "Founders signal long-term strategic intent. Their public statements, investment moves, and sector predictions carry market-moving weight for everyone operating in their ecosystem.",
  },
  {
    icon: "🏛️",
    title: "Trade Secretary & Government Activity",
    desc: "Policy is shaped by officials. Trade Secretary movements, commerce ministry signals, export promotion council announcements, and diplomatic appointments — all affect bilateral trade conditions.",
  },
  {
    icon: "🔄",
    title: "CXO Movements (Appointments, Exits, New Roles)",
    desc: "When a senior leader moves from one company to another, it signals capability shifts, strategic bets, and competitive intelligence. IGEN tracks all significant CXO movements across 20 sectors.",
  },
];

const leaderRankings = [
  {
    icon: "⭐",
    title: "Most Active Leaders",
    desc: "Ranked by article mentions, published insights, and community engagement on IGEN.",
  },
  {
    icon: "💬",
    title: "Most Discussed Leader Articles",
    desc: "Reader-validated intelligence on which leadership voices are generating the most professional discussion.",
  },
  {
    icon: "📈",
    title: "Leader Momentum Index",
    desc: "A composite signal showing which leaders are gaining influence within their sector, based on IGEN reader engagement.",
  },
  {
    icon: "🏆",
    title: "Leader of the Month",
    desc: "Monthly recognition for the leader whose insight, announcement, or activity generated the most structured trade intelligence value.",
  },
  {
    icon: "🌟",
    title: "Rising Industry Voices",
    desc: "Emerging leaders gaining influence and visibility before achieving widespread recognition — the most valuable signal for who to watch.",
  },
];

const planComparison = [
  { feature: "Read Leader News", free: "✓", leader: "✓" },
  { feature: "Leader Profile Page", free: "—", leader: "✓ (Dedicated)" },
  { feature: "Publish Monthly Insight", free: "—", leader: "1/month" },
  { feature: "Verified Leader Badge", free: "—", leader: "✓" },
  { feature: "SEO-Indexed Profile", free: "—", leader: "✓" },
  { feature: "Featured in Leader Directory", free: "—", leader: "✓" },
  { feature: "FLC Charter Access", free: "—", leader: "✓ (if Founding)" },
  { feature: "Quote Placement in Articles", free: "—", leader: "✓ (if editorial)" },
];

const flcBenefits = [
  "Charter Leader Badge and Recognition Seal",
  "Enhanced Leader Profile with Priority Google Indexing",
  "Homepage Carousel Rotation (Leader Spotlight)",
  "Annual Founding Leader Roundtable (invite-only)",
  "Priority Podcast Invitation",
  "Quarterly Leader Insight Guaranteed Publication Window",
  "Founder Recognition Letter from Mr. Vijay Singh",
  "Public LinkedIn-style Announcement Post on IGEN",
];

const whosBenefits = [
  {
    icon: "📰",
    type: "The Consumer",
    desc: "Senior professionals who follow specific leaders and designations to gain intelligence on strategic direction, sector shifts, and competitive moves. They use LEADER NEWS as their leadership intelligence feed.",
  },
  {
    icon: "🌱",
    type: "The Aspiring Leader",
    desc: "A professional with 8–15 years of experience who wants to build structured visibility in their sector. They use LEADER NEWS to understand the landscape — then use the Emerging Leader Plan to enter it.",
  },
  {
    icon: "🎯",
    type: "The Established Leader",
    desc: "A CEO, Founder, or Trade Secretary who wants structured digital presence and professional reputation management. They use the Emerging Leader or FLC plan to ensure their insights are indexed and their voice reaches India's trade professional community.",
  },
];

const faqs = [
  {
    q: "What are the 25 leadership designations IGEN tracks?",
    a: "IGEN monitors CEO, CFO, CTO, COO, CHRO, CIO, CSO, CMO, Managing Director, Executive Director, President, Founder, Co-Founder, Chairman, Vice Chairman, Promoter, Chief Strategy Officer, Chief Compliance Officer, Chief Revenue Officer, Chief Sustainability Officer, Trade Secretary, Commerce Minister, Export Promotion Council Head, Ambassador/Trade Representative, and EXIM Policy Official.",
  },
  {
    q: "Is LEADER NEWS only for well-known leaders?",
    a: "No. IGEN tracks all 25 designations across all 20 sectors — including leaders at mid-market companies and government trade bodies. The platform is as interested in Emerging Leaders as established ones.",
  },
  {
    q: "What is an Emerging Leader Profile?",
    a: "A dedicated, SEO-indexed page at indiaglobalnews.com/leaders/your-name — showing your designation, sector expertise, published insights, and verified badge. Available to Emerging Leader Plan subscribers.",
  },
  {
    q: "Can I publish my own insights on IGEN?",
    a: "Yes. Emerging Leader Plan subscribers publish one structured industry insight per month. FLC Charter Leaders publish with enhanced visibility and guaranteed publication windows.",
  },
  {
    q: "How does IGEN Leader News differ from LinkedIn?",
    a: "LinkedIn is a general professional network. IGEN LEADER NEWS is a structured trade intelligence platform — your profile is indexed under specific sector, industry, and designation keywords, and your insights reach a targeted trade professional audience, not a general social feed.",
  },
  {
    q: "Is the Emerging Leader Plan worth it if I'm not famous?",
    a: "That is exactly the point of the plan — to build visibility and authority before widespread recognition. The leaders who benefit most are those who start early, while the platform is growing.",
  },
  {
    q: "What is the FLC?",
    a: "The Founding Leaders Community — limited to the first 100 leaders who join at Charter Leader level. It comes with permanent recognition, enhanced profile features, roundtable access, podcast invitations, and a public founding announcement.",
  },
  {
    q: "Can I just read Leader News without a paid plan?",
    a: "Yes. All Leader News articles are free to read. The paid tiers give you your own leader profile, publishing rights, verification, and community access.",
  },
  {
    q: "Does IGEN share leader analytics?",
    a: "Emerging Leader Plan subscribers get access to basic analytics — article reach, profile views, follower count, and engagement on their published insights.",
  },
  {
    q: "How do I claim my leader profile?",
    a: "Click 'Claim Your Profile' on any leader profile page or within the Leader Reputation Tools section of LEADER NEWS.",
  },
];

// ── FAQ Accordion ──────────────────────────────────────────────────────────────

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

export default function LeaderNewsLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Mega Menu Nav */}
      <AboutIGENMegaMenuNav />

      {/* ─── 1. HERO BANNER ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-primary)] px-4 py-20 md:px-6 md:py-28 text-white">
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-neutral-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-neutral-light) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glowing orb */}
        <div className="pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-[var(--color-accent-gold-light,#F4A024)]/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            👔 Mega Menu 6 — Leadership Intelligence
          </span>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-gold-light,#F4A024)]">
            In Trade, Leaders Don't Just Follow Markets. They Move Them.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl text-white">
            Track 25 Leadership Designations
            <br />
            <span className="text-[var(--color-accent-gold-light,#F4A024)]">Across India's Trade Universe</span>
            {" "}— In Real Time
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg" style={{overflowWrap: "break-word", wordBreak: "normal"}}>
            IGEN LEADER NEWS is the only structured leadership monitoring system built specifically for trade intelligence — tracking CEOs, CFOs, Founders, Trade Secretaries, and 21 more designations across 20 sectors and 195 countries.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/leader-news"
              className="rounded-full bg-[var(--color-accent-gold-light,#F4A024)] px-8 py-3 text-sm font-bold text-[var(--color-primary)] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Leader Intelligence
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Build Your Leader Profile
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. WHAT IS LEADER NEWS? ──────────────────────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                What is Leader News?
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                Where Leadership Intelligence Meets Trade Intelligence
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                In physical exhibitions, leaders attract crowds. A CEO on stage draws more attention than any booth display. A Trade Secretary's presence signals government commitment. A Founder's announcement becomes sector news.
              </p>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                IGEN LEADER NEWS brings this dynamic into the digital trade intelligence ecosystem — monitoring leadership activity, movements, and insights across 25 designation categories with structured, searchable, SEO-indexed precision.
              </p>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                This is not a celebrity news section. This is professional leadership intelligence — the kind that helps you understand who is shaping your sector, which companies are making strategic leadership bets, and where India's most influential trade voices are focused.
              </p>
              <div className="rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-4 italic text-[var(--color-text-body)]">
                "Leadership monitoring builds the prestige layer. It creates aspiration. And aspiration drives upgrades." — IGEN Founder
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-purple-900 overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="relative text-center p-8">
                <div className="text-7xl mb-4 animate-pulse">👔</div>
                <div className="text-white font-bold text-xl">25 Designation Tracking System</div>
                <div className="text-white/60 text-sm mt-2">20 Sectors · 195 Countries · Real-Time</div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {["CEO", "CFO", "Founder", "CTO", "Secretary", "Minister"].map((d) => (
                    <span key={d} className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/80 border border-white/20">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. 25 LEADERSHIP DESIGNATIONS ───────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Complete Coverage
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              25 Leadership Designations — Across the C-Suite and Government
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Corporate Leadership", color: "bg-blue-600", items: corporateDesignations },
              { label: "Entrepreneurial Leadership", color: "bg-purple-600", items: entrepreneurialDesignations },
              { label: "Functional Specialists", color: "bg-emerald-600", items: functionalDesignations },
              { label: "Government & Trade", color: "bg-amber-600", items: governmentDesignations },
            ].map((group) => (
              <div
                key={group.label}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)] overflow-hidden shadow-sm"
              >
                <div className={`${group.color} px-5 py-3`}>
                  <h3 className="font-bold text-white text-sm">{group.label}</h3>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {group.items.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/50 px-3 py-1 text-xs font-medium text-[var(--color-text-body)] dark:border-[var(--color-neutral-mid)]/30 dark:bg-white/5"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
            Every designation matters. Every announcement is tracked. Every insight is indexed.
          </p>
        </div>
      </section>

      {/* ─── 4. FOUR PILLARS ──────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Four Leader News Pillars
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              How IGEN Monitors Leadership Activity
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {fourPillars.map((p, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-md dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center shadow">
                  {idx + 1}
                </div>
                <div className="mb-4 text-3xl">{p.icon}</div>
                <div className="mb-1 text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                  {p.pillar}
                </div>
                <h3 className="mb-3 font-bold text-[var(--color-text-body)]">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. INTELLIGENCE SIGNALS ──────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Leader Intelligence Signals
            </span>
            <h2 className="mb-4 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              What IGEN Tracks — And Why It Matters
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {intelligenceSignals.map((sig, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-3xl">{sig.icon}</div>
                <h3 className="mb-3 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {sig.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {sig.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. LEADER PROFILE SYSTEM ─────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Leader Profile System
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                Your Digital Trade Identity — Structured and Searchable
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Every leader active on IGEN has the opportunity to claim a structured, SEO-indexed profile page.
              </p>
              <div className="mb-5 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2">Profile URL</p>
                <code className="text-sm font-mono text-[var(--color-text-body)]">indiaglobalnews.com/leaders/<em>your-name</em></code>
              </div>
              <h3 className="mb-3 font-bold text-[var(--color-text-body)]">What the Profile Contains:</h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Professional Summary and Designation",
                  "Sector and Industry Specialisation Tags",
                  "Published Monthly Insights Archive",
                  "Quoted Articles and Media Mentions on IGEN",
                  "Engagement Metrics (if Emerging Leader)",
                  "Verified Badge (Emerging Leader and above)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-body)]">
                    <span className="mt-0.5 text-[var(--color-primary)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-4 italic text-[var(--color-text-body)]">
                "When someone Googles your name, a structured IGEN leader profile appears — indexed by sector, industry, and designation. This is systematic reputation building, not random social media presence."
              </div>
            </div>
            {/* Profile card mockup */}
            <div className="rounded-2xl border border-[var(--color-neutral-light)] bg-white dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)] shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[var(--color-primary)] to-purple-700 px-6 py-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl">
                    👔
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">Your Name Here</h3>
                      <span className="rounded-full bg-[var(--color-accent-gold-light,#F4A024)] px-2 py-0.5 text-xs font-bold text-[var(--color-primary)]">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">Managing Director, XYZ Exports Ltd.</p>
                    <p className="text-white/60 text-xs mt-1">Textiles · India-EU Trade · 15 yrs exp.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: "Sector", value: "Textiles & Apparel" },
                  { label: "Industry Tags", value: "B2B Export · EU Markets · Sustainable Fabrics" },
                  { label: "Published Insights", value: "12 articles · Last: Feb 2026" },
                  { label: "Profile Views", value: "4,820 this month" },
                  { label: "Media Mentions", value: "3 quote placements on IGEN" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 text-sm border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20 pb-3 last:border-0">
                    <span className="font-semibold text-[var(--color-neutral-dark)] dark:text-gray-400 shrink-0">{row.label}</span>
                    <span className="text-right text-[var(--color-text-body)]">{row.value}</span>
                  </div>
                ))}
                <Link
                  href="/reader-plans"
                  className="mt-2 block w-full rounded-xl bg-[var(--color-primary)] py-3 text-center text-sm font-bold text-white transition-all hover:opacity-90"
                >
                  Claim Your Profile →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. LEADER RANKINGS ────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Leader Rankings
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              The Most Influential Trade Voices on IGEN
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {leaderRankings.map((rank, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-4xl">{rank.icon}</div>
                <h3 className="mb-2 font-bold text-[var(--color-text-body)] text-sm">{rank.title}</h3>
                <p className="text-xs leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">{rank.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. LEADER INSIGHTS — PUBLISHING LAYER ───────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Visual */}
            <div className="relative rounded-2xl bg-gradient-to-br from-emerald-900 to-[var(--color-primary)] overflow-hidden p-8 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="relative">
                <div className="mb-6 text-5xl">💡</div>
                <h3 className="mb-2 text-xl font-bold">Leader Insight Published</h3>
                <p className="text-white/70 text-sm mb-6">by Rajesh Mehta, CEO — AutoTrade India</p>
                <div className="space-y-3">
                  {[
                    { tag: "SEO-Indexed", color: "bg-emerald-500" },
                    { tag: "Tagged: Automotive · India-Germany Trade", color: "bg-blue-500" },
                    { tag: "Appears in: LEADER NEWS, FEED, HEADLINES", color: "bg-purple-500" },
                    { tag: "Permanently Archived", color: "bg-amber-500" },
                  ].map((badge) => (
                    <div key={badge.tag} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${badge.color}`} />
                      <span className="text-xs text-white/80">{badge.tag}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg border border-white/20 bg-white/10 p-3 text-xs text-white/70 italic">
                  "This is not a blog. This is structured thought leadership on a platform that 10,000+ trade professionals read daily."
                </div>
              </div>
            </div>
            {/* Content */}
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
                Leader Insights — The Publishing Layer
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
                When Leaders Write, Markets Listen
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                Emerging Leader Plan subscribers publish one structured industry insight per month on IGEN. These insights:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Are SEO-indexed under the leader's profile page",
                  "Are tagged to relevant sector, industry, and country",
                  "Appear in LEADER NEWS, FEED, and HEADLINES (if selected by editorial team)",
                  "Are permanently archived on IGEN — compounding reputation over time",
                  "Are shareable with a unique article URL linked to the leader's profile",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-body)]">
                    <span className="mt-0.5 shrink-0 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-1.5 py-0.5 text-xs font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. REPUTATION ENGINE ──────────────────────────────────────────── */}
      <section className="bg-[var(--color-primary)] px-4 py-16 md:px-6 md:py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-light,#F4A024)]">
              The Reputation Engine
            </span>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Why Leader Visibility on IGEN Is a Long-Term Asset
            </h2>
          </div>
          <p className="mx-auto mb-10 max-w-2xl text-center text-white/80 text-base leading-relaxed">
            Digital reputation compounds. An insight published on IGEN in January is still indexed, still searchable, still being found in December. In five years, a library of structured insights — all tagged correctly, all SEO-optimised, all associated with your leader profile — becomes an irreplaceable professional asset.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                label: "Scenario A — No IGEN Presence",
                icon: "❌",
                color: "border-red-500/30 bg-red-900/20",
                items: [
                  "LinkedIn posts that disappear in the feed",
                  "Conference appearances that leave no searchable record",
                  "Reputation built on relationships alone",
                ],
              },
              {
                label: "Scenario B — Active IGEN Emerging Leader",
                icon: "✅",
                color: "border-emerald-400/30 bg-emerald-900/20",
                items: [
                  "12 published insights per year",
                  "Leader profile indexed on Google under sector + industry + designation keywords",
                  "Mentions in editorial articles",
                  "FLC community participation",
                  "A growing, structured digital reputation archive",
                ],
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border ${s.color} p-6`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="font-bold text-white">{s.label}</h3>
                </div>
                <ul className="space-y-2">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="shrink-0 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-[var(--color-accent-gold-light,#F4A024)]/30 bg-white/5 p-6 text-center italic text-[var(--color-accent-gold-light,#F4A024)]">
            "What is your digital reputation worth on Google?" — IGEN Sales Positioning
          </div>
        </div>
      </section>

      {/* ─── 10. UPGRADE HOOK — EMERGING LEADER PLAN ─────────────────────── */}
      <section className="border-b border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Emerging Leader Plan
            </span>
            <h2 className="mb-3 font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Stop Consuming Leadership Intelligence.
              <br />Start Creating It.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <div className="grid grid-cols-3 divide-x divide-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/40 px-0 py-3 text-center text-xs font-black uppercase tracking-widest text-[var(--color-neutral-mid)] dark:divide-[var(--color-neutral-mid)]/20 dark:bg-[var(--background)]">
              <div className="px-4">Feature</div>
              <div className="px-4">Free Reader</div>
              <div className="px-4 text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                Emerging Leader ⭐
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
                  {row.leader}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-[var(--color-accent-gold-dark)]/30 bg-[var(--color-accent-gold-dark)]/5 p-4 text-center">
            <p className="text-sm font-bold text-[var(--color-accent-gold-dark)]">
              Become an Emerging Leader — ₹69,999/year
            </p>
            <p className="text-xs text-[var(--color-neutral-dark)] dark:text-gray-400 mt-1">
              Charter Leader Founding Access · First 100 Leaders Only
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href="/reader-plans"
              className="rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Become an Emerging Leader
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. FLC — FOUNDING LEADERS COMMUNITY ────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-light,#F4A024)]">
                FLC — Founding Leaders Community
              </span>
              <h2 className="mb-5 font-display text-2xl font-bold md:text-3xl">
                The Most Exclusive Circle in India's Trade Intelligence Ecosystem
              </h2>
              <p className="mb-5 text-base leading-relaxed text-white/80">
                The Founding Leaders Community (FLC) is limited to the first 100 leaders who join IGEN at the Charter Leader level. These are not subscribers. They are founding voices of India's structured trade intelligence platform.
              </p>
              <div className="rounded-2xl border border-[var(--color-accent-gold-light,#F4A024)]/30 bg-[var(--color-accent-gold-light,#F4A024)]/10 p-4 text-center">
                <p className="font-bold text-[var(--color-accent-gold-light,#F4A024)] text-lg">
                  Only 100 Charter Leader founding slots exist. Ever.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-white text-lg mb-4">FLC Benefits:</h3>
              {flcBenefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent-gold-light,#F4A024)] text-[var(--color-primary)] text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-sm text-white/80">{benefit}</span>
                </div>
              ))}
              <div className="pt-2">
                <Link
                  href="/reader-plans"
                  className="block w-full rounded-full bg-[var(--color-accent-gold-light,#F4A024)] py-3 text-center text-sm font-bold text-[var(--color-primary)] transition-all hover:opacity-90"
                >
                  Apply for FLC Charter — First 100 Only
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 12. WHO BENEFITS? ─────────────────────────────────────────────── */}
      <section className="border-y border-[var(--color-neutral-light)] px-4 py-16 dark:border-[var(--color-neutral-mid)]/20 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              Who Benefits?
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Three Types of Professionals — Three Different Use Cases
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {whosBenefits.map((w, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-8 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]"
              >
                <div className="mb-4 text-4xl">{w.icon}</div>
                <h3 className="mb-3 font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] text-lg">
                  {w.type}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FAQ ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:px-6 md:py-20 bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)]">
              FAQ
            </span>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text-body)] md:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="rounded-2xl border border-[var(--color-neutral-light)] bg-white p-6 shadow-sm dark:border-[var(--color-neutral-mid)]/20 dark:bg-[var(--color-neutral-white)]">
            <FAQ faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ─── 14. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-neutral-light)]/30 dark:bg-[var(--background)] px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-display text-4xl font-extrabold text-[var(--color-text-body)]">
            In Trade, Visibility Is Currency.
            <br />Build Yours.
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-[var(--color-neutral-dark)] dark:text-gray-400">
            IGEN LEADER NEWS is free to consume. But the professionals building lasting trade reputations are the ones publishing, profiling, and compounding their presence on IGEN — not just reading.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left mb-10">
            {[
              { tier: "Free Reader", desc: "Follow 25 leadership designations. Track the leaders shaping your sector." },
              { tier: "Emerging Leader", desc: "Build your Google-indexed profile. Publish your monthly insight. Join the leader directory." },
              { tier: "FLC Charter Leader", desc: "One of 100 founding voices of India's structured trade intelligence platform. Permanent recognition." },
              { tier: "Corporate", desc: "Ensure your leadership team has visible, structured presence across IGEN's leader ecosystem." },
            ].map((p) => (
              <div
                key={p.tier}
                className="bg-white dark:bg-[var(--color-neutral-white)] p-4 rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)]/20 shadow-sm"
              >
                <p className="font-bold text-[var(--color-primary)] text-sm mb-1">{p.tier}</p>
                <p className="text-xs text-[var(--color-neutral-dark)] dark:text-gray-400">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mb-6 rounded-xl border border-[var(--color-accent-gold-dark)]/30 bg-[var(--color-accent-gold-dark)]/5 px-6 py-4">
            <p className="font-bold text-[var(--color-accent-gold-dark)]">
              Emerging Leader Plan — ₹69,999/year · Charter Founding Access · First 100 Leaders · Permanent price protection.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/leader-news"
              className="rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Leader Intelligence
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-[var(--color-primary)]/30 bg-white px-8 py-4 text-sm font-bold text-[var(--color-primary)] transition-all hover:bg-gray-50 dark:bg-transparent dark:border-white/30 dark:text-white"
            >
              Claim Your Profile
            </Link>
            <Link
              href="/reader-plans"
              className="rounded-full border border-[var(--color-accent-gold-dark)]/50 bg-[var(--color-accent-gold-dark)]/10 px-8 py-4 text-sm font-bold text-[var(--color-accent-gold-dark)] transition-all hover:bg-[var(--color-accent-gold-dark)]/20"
            >
              Upgrade to Emerging Leader
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { Check, Info, Shield, Users, Award, TrendingUp, HelpCircle, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PLANS = [
  {
    name: "FREE PLAN",
    tagline: "First-time explorers.",
    description: "New to IGEN. Want to experience the platform before committing.",
    price: "Free",
    period: "Forever",
    features: [
      "Unlimited article reading (20 sectors)",
      "Follow 1 sector",
      "Follow 5 industries",
      "Community access (read-only)",
      "Basic FEED and HEADLINES",
      "Access to TRENDING and SECTOR NEWS",
    ],
    limits: [
      "No country follows",
      "Standard bookmarks only",
      "No downloadable briefs",
      "No advanced filters",
    ],
    cta: "Start Free Today",
    ctaLink: "#",
    popular: false,
    color: "var(--color-primary)",
  },
  {
    name: "PRO READER",
    tagline: "Serious professionals.",
    description: "Who need structured, organised trade intelligence — not random news.",
    price: "₹24,999",
    period: "per year",
    anchorPrice: "₹39,999",
    founding: "First 500 Only",
    features: [
      "Everything in Free, plus:",
      "Follow 5 sectors",
      "Follow 50 industries",
      "Follow 10 countries",
      "Follow 25 leader types",
      "Unlimited organized bookmarks",
      "Download weekly/quarterly briefs (PDF)",
      "Advanced intelligence filters",
    ],
    cta: "Become a Pro Reader",
    ctaLink: "#",
    popular: true,
    color: "var(--color-accent-gold-dark)",
  },
  {
    name: "EMERGING LEADER",
    tagline: "Build industry authority.",
    description: "Professionals who want to build structured visibility — not just consume intelligence.",
    price: "₹69,999",
    period: "per year",
    anchorPrice: "₹99,999",
    founding: "First 100 Only",
    features: [
      "Everything in Pro Reader, plus:",
      "Personal Leader Profile Page",
      "SEO-indexed profile",
      "Publish 1 industry insight/month",
      "Verified Leader Badge",
      "Featured in Leader Directory",
      "Founding Leader Community (FLC)",
      "Annual Leader Roundtable",
    ],
    cta: "Become an Emerging Leader",
    ctaLink: "#",
    popular: false,
    color: "var(--color-primary-light)",
  },
  {
    name: "CORPORATE PLAN",
    tagline: "Enterprise trade infrastructure.",
    description: "Companies, export houses, and teams who need multi-user intelligence access.",
    price: "₹3,00,000",
    period: "per year (Start)",
    anchorPrice: "₹4,00,000",
    founding: "First 20 Only",
    features: [
      "Everything in Leader Plan, plus:",
      "Corporate Profile Page",
      "Multi-user team access",
      "Publish 2+ corporate insights/month",
      "Co-branded intelligence briefs",
      "Dedicated Account Manager",
      "Corporate Roundtable participation",
      "Annual corporate feature article",
    ],
    cta: "Schedule Consultation",
    ctaLink: "#",
    popular: false,
    color: "var(--color-neutral-dark)",
  },
];

const COMPARISON_FEATURES = [
  { name: "Read Articles", free: true, pro: true, leader: true, corporate: "team" },
  { name: "Follow Sectors", free: "1", pro: "5", leader: "Unlimited", corporate: "Unlimited" },
  { name: "Follow Industries", free: "5", pro: "50", leader: "Unlimited", corporate: "Unlimited" },
  { name: "Follow Countries", free: false, pro: "10", leader: "Unlimited", corporate: "Unlimited" },
  { name: "Follow Leaders", free: false, pro: "10 (25 desg)", leader: "Unlimited", corporate: "Unlimited" },
  { name: "Unlimited Bookmarks", free: false, pro: true, leader: true, corporate: true },
  { name: "Download Industry Briefs", free: false, pro: true, leader: true, corporate: true },
  { name: "Leader Profile Page", free: false, pro: false, leader: true, corporate: "Team" },
  { name: "Publish Monthly Insights", free: false, pro: false, leader: "1/month", corporate: "2+/month" },
  { name: "Verified Badge", free: false, pro: false, leader: true, corporate: true },
  { name: "Corporate Profile Page", free: false, pro: false, leader: false, corporate: true },
  { name: "Multi-user Access", free: false, pro: false, leader: false, corporate: true },
  { name: "Founding Community Access", free: false, pro: "FPC", leader: "FLC", corporate: "FCC" },
  { name: "Dedicated Account Manager", free: false, pro: false, leader: false, corporate: true },
];

const FAQS = [
  {
    q: "Is there a free trial for paid plans?",
    a: "The Free Plan gives unlimited article reading indefinitely — that is your trial. The moment you hit a follow limit, IGEN shows you exactly what Pro would unlock.",
  },
  {
    q: "Can I cancel my paid plan?",
    a: "Yes. All plans offer cancellation. Founding Member pricing, however, is only available during the founding access window — once that closes, the anchor price applies on renewal.",
  },
  {
    q: "What is a Founding Member?",
    a: "The first 500 Pro Readers, first 100 Emerging Leaders, and first 20 Corporates to join IGEN at paid tiers. They receive permanently locked pricing, founding recognition, and community badges.",
  },
  {
    q: "Is the Emerging Leader Plan worth it if I'm not well-known?",
    a: "That is precisely who it's designed for. The leaders who benefit most are those who start building digital authority before they achieve widespread recognition. Reputation compounds over time.",
  },
];

export default function ReaderPlansPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-light),transparent)] opacity-20" />
        <div className="container relative mx-auto px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold backdrop-blur-sm">
            <Shield className="h-4 w-4 text-[var(--color-accent-gold)]" />
            <span>Start Free. Upgrade When Serious. Lead When Ready.</span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold md:text-6xl">
            Four Plans. One Destination:<br />
            <span className="text-[var(--color-accent-gold-light)]">India's Most Structured Trade Intelligence Platform.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-white/80">
            IGEN READER PLANS are not just access tiers — they are progression pathways. 
            From free discovery to professional organisation, from personal authority-building to enterprise visibility. 
            Choose where you are. Grow to where you want to be.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="rounded-lg bg-[var(--color-accent-gold-dark)] px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105">
              Start Free Today
            </button>
            <button className="rounded-lg border border-white/30 bg-white/10 px-8 py-3 font-bold backdrop-blur-sm transition-all hover:bg-white/20">
              Compare All Plans
            </button>
          </div>
        </div>
      </section>

      {/* 2. Pricing Philosophy */}
      <section className="bg-white py-20 dark:bg-[var(--color-neutral-white)]">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">Pricing Philosophy</h2>
            <h3 className="mb-8 font-display text-3xl font-bold">Why IGEN Doesn't Race to the Bottom</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-[var(--color-neutral-light)] p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Shield className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-bold">Filters Seriousness</h4>
                <p className="text-sm text-[var(--color-neutral-dark)]">
                  High price signals seriousness. It filters casual browsers from committed professionals, creating a more valuable community.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-neutral-light)] p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-bold">Protects Editorial</h4>
                <p className="text-sm text-[var(--color-neutral-dark)]">
                  Subscription-driven, not advertising-driven. Content decisions are made for readers, not for advertisers.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-neutral-light)] p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-bold">Founding Urgency</h4>
                <p className="text-sm text-[var(--color-neutral-dark)]">
                  Early members get permanently lower pricing. Rewards the professionals who believed in IGEN early.
                </p>
              </div>
            </div>
            <p className="mt-12 text-center font-serif italic text-[var(--color-neutral-dark)] opacity-70">
              "Premium price filters seriousness. Serious members engage more. Engaged members renew." — IGEN Pricing Constitution
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Four Plans */}
      <section className="bg-[var(--color-neutral-light)]/30 py-24 dark:bg-black/20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">A Clear Progression Path</h2>
            <p className="text-[var(--color-neutral-dark)]">Choose where you are. Grow to where you want to be.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <div 
                key={plan.name} 
                className={`relative flex flex-col rounded-3xl border bg-white p-8 transition-all hover:scale-[1.02] dark:bg-[var(--color-neutral-white)] ${
                  plan.popular ? 'border-2 border-[var(--color-accent-gold-dark)] shadow-xl ring-4 ring-[var(--color-accent-gold-dark)]/10' : 'border-[var(--color-neutral-light)] shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-accent-gold-dark)] px-4 py-1 text-xs font-bold text-white shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xs font-bold tracking-widest text-[var(--color-neutral-dark)] opacity-20">{plan.name}</h3>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-xs text-[var(--color-neutral-dark)]">{plan.period}</span>
                  </div>
                  {plan.anchorPrice && (
                    <div className="text-sm text-[var(--color-neutral-dark)]/60 line-through">{plan.anchorPrice}</div>
                  )}
                  {plan.founding && (
                    <div className="mt-1 inline-block rounded bg-[var(--color-accent-gold)] px-2 py-0.5 text-[10px] font-bold text-white">{plan.founding}</div>
                  )}
                </div>
                <div className="mb-6 flex-1">
                  <div className="mb-2 text-sm font-bold">{plan.tagline}</div>
                  <p className="mb-6 text-xs text-[var(--color-neutral-dark)]">{plan.description}</p>
                  <ul className="space-y-3">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.limits && plan.limits.map((limit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs opacity-50">
                        <span className="h-3.5 w-3.5 text-center leading-none text-red-500">×</span>
                        <span className="line-through">{limit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  className={`w-full rounded-xl py-3 text-sm font-bold transition-all ${
                    plan.popular ? 'bg-[var(--color-accent-gold-dark)] text-white hover:opacity-90' : 'bg-[var(--color-primary)] text-white hover:opacity-90'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Full Plan Comparison */}
      <section className="bg-white py-24 dark:bg-[var(--color-neutral-white)]">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">Full Plan Comparison</h2>
            <p className="text-[var(--color-neutral-dark)]">Side by side — Find your plan.</p>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-[var(--color-neutral-light)] shadow-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[var(--color-neutral-light)]/20 text-sm font-bold">
                  <th className="p-6">Feature</th>
                  <th className="p-6">Free</th>
                  <th className="p-6">Pro Reader</th>
                  <th className="p-6">Emerging Leader</th>
                  <th className="p-6">Corporate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral-light)]">
                {COMPARISON_FEATURES.map((feat) => (
                  <tr key={feat.name} className="hover:bg-[var(--color-neutral-light)]/5">
                    <td className="p-6 text-sm font-medium">{feat.name}</td>
                    <td className={`p-6 text-sm ${feat.free === true ? 'text-green-500' : feat.free === false ? 'opacity-20' : ''}`}>
                      {feat.free === true ? <Check className="h-4 w-4" /> : feat.free === false ? '—' : feat.free}
                    </td>
                    <td className={`p-6 text-sm ${feat.pro === true ? 'text-green-500' : feat.pro === false ? 'opacity-20' : ''}`}>
                      {feat.pro === true ? <Check className="h-4 w-4" /> : feat.pro === false ? '—' : feat.pro}
                    </td>
                    <td className={`p-6 text-sm ${feat.leader === true ? 'text-green-500' : feat.leader === false ? 'opacity-20' : ''}`}>
                      {feat.leader === true ? <Check className="h-4 w-4" /> : feat.leader === false ? '—' : feat.leader}
                    </td>
                    <td className={`p-6 text-sm ${feat.corporate === true ? 'text-green-500' : feat.corporate === false ? 'opacity-20' : ''}`}>
                      {feat.corporate === true ? <Check className="h-4 w-4" /> : feat.corporate === false ? '—' : feat.corporate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Founding Member Benefits */}
      <section className="bg-[var(--color-primary)] py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 font-display text-4xl font-bold">Founding Member Benefits</h2>
              <p className="mb-8 text-lg text-white/70">
                Why joining early is a different decision from joining later. We reward the visionaries who build the platform with us.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <Shield className="mb-4 h-6 w-6 text-[var(--color-accent-gold)]" />
                  <h4 className="mb-2 font-bold">Lifetime Price Protection</h4>
                  <p className="text-xs text-white/60">Your entry price is locked permanently. No matter how much IGEN grows.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <Award className="mb-4 h-6 w-6 text-[var(--color-accent-gold)]" />
                  <h4 className="mb-2 font-bold">Founding Recognition</h4>
                  <p className="text-xs text-white/60">Permanent spot on the IGEN Founding Wall — an SEO-indexed legacy.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <Shield className="mb-4 h-6 w-6 text-[var(--color-accent-gold)]" />
                  <h4 className="mb-2 font-bold">Founding Certificate</h4>
                  <p className="text-xs text-white/60">A digital and printable certificate of your founding status.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <Zap className="mb-4 h-6 w-6 text-[var(--color-accent-gold)]" />
                  <h4 className="mb-2 font-bold">Early Feature Access</h4>
                  <p className="text-xs text-white/60">Access AI Plus tools and Trade Intelligence Lab before public release.</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl bg-white p-1 lg:p-2">
              <div className="absolute -right-8 -top-8 h-24 w-24 animate-pulse rounded-full bg-[var(--color-accent-gold-dark)]/20 blur-2xl" />
              <div className="overflow-hidden rounded-[calc(1.5rem-2px)] bg-[var(--color-neutral-light)]/30 p-8 text-black dark:text-white">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-xs text-[var(--color-neutral-dark)]">
                  <div className="mb-2 text-[var(--color-primary)] font-bold">// IGEN FOUNDING MEMBER CERTIFICATE</div>
                  <div className="mb-1">Member ID: IGEN-F-0429</div>
                  <div className="mb-1">Category: Pro Reader (Charter)</div>
                  <div className="mb-4">Status: <span className="text-green-600 font-bold">LOCKED FOR LIFE</span></div>
                  <div className="h-px bg-[var(--color-neutral-light)] my-4" />
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] opacity-40 uppercase">Acknowledge By</div>
                      <div className="font-serif text-lg italic mt-1">IGEN Editorial Board</div>
                    </div>
                    <div className="h-16 w-16 border-2 border-[var(--color-accent-gold-dark)] rounded-full flex items-center justify-center font-bold text-[var(--color-accent-gold-dark)] transform -rotate-12">
                      IGEN SEAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upgrade Triggers */}
      <section className="bg-white py-24 dark:bg-[var(--color-neutral-white)]">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center font-display text-4xl font-bold">When Do Readers Upgrade?</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6 rounded-2xl border border-[var(--color-neutral-light)] p-8 transition-colors hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">01</div>
                <div>
                  <h4 className="mb-1 font-bold">From Free to Pro</h4>
                  <p className="text-sm text-[var(--color-neutral-dark)]">"I've hit my sector follow limit and there are 4 more sectors I need to track." or "I need to download industry briefs for my boardroom presentation."</p>
                </div>
              </div>
              <div className="flex items-center gap-6 rounded-2xl border border-[var(--color-neutral-light)] p-8 transition-colors hover:border-[var(--color-accent-gold-dark)]/30 hover:bg-[var(--color-accent-gold-dark)]/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-gold-dark)] text-white">02</div>
                <div>
                  <h4 className="mb-1 font-bold">From Pro to Emerging Leader</h4>
                  <p className="text-sm text-[var(--color-neutral-dark)]">"I want my own Google-indexed leader profile and the ability to publish my monthly insights to build structured credibility."</p>
                </div>
              </div>
              <div className="flex items-center gap-6 rounded-2xl border border-[var(--color-neutral-light)] p-8 transition-colors hover:border-black/30 hover:bg-black/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white">03</div>
                <div>
                  <h4 className="mb-1 font-bold">From Emerging Leader to Corporate</h4>
                  <p className="text-sm text-[var(--color-neutral-dark)]">"My team needs structured access, and our company needs a co-branded profile indexed under our specific trade sectors."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="bg-[var(--color-neutral-light)]/20 py-24 dark:bg-black/10">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center font-display text-4xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white dark:bg-[var(--color-neutral-white)]">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-bold">{faq.q}</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="border-t border-[var(--color-neutral-light)] p-6 text-sm text-[var(--color-neutral-dark)]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] py-24 text-white">
        <div className="container relative mx-auto px-6 text-center">
          <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl">There Is No Better Time to Join Than Now</h2>
          <p className="mx-auto mb-4 max-w-2xl text-white/70">
            The first 500 professionals. The first 100 leaders. The first 20 corporates. 
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-[var(--color-accent-gold-light)] font-bold">
            Founding Access closes when slots fill. Not on a calendar date — when the community is complete.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <Link href="#" className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
              <span className="mb-2 text-2xl font-bold">Free</span>
              <span className="text-xs text-white/50 mb-4">No commitment. Start today.</span>
              <span className="mt-auto font-bold text-[var(--color-accent-gold)]">Start Free →</span>
            </Link>
            <Link href="#" className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
              <span className="mb-2 text-2xl font-bold">₹24,999</span>
              <span className="text-xs text-white/50 mb-4">Pro Reader (Founding)</span>
              <span className="mt-auto font-bold text-[var(--color-accent-gold)]">Become Pro →</span>
            </Link>
            <Link href="#" className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
              <span className="mb-2 text-2xl font-bold">₹69,999</span>
              <span className="text-xs text-white/50 mb-4">Emerging Leader (Founding)</span>
              <span className="mt-auto font-bold text-[var(--color-accent-gold)]">Build Authority →</span>
            </Link>
            <Link href="#" className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
              <span className="mb-2 text-2xl font-bold">₹3,00,000</span>
              <span className="text-xs text-white/50 mb-4">Corporate (Founding)</span>
              <span className="mt-auto font-bold text-[var(--color-accent-gold)]">Schedule Consultation →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

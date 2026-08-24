"use client";

import { Layout, Activity, FileText, BarChart3, Settings, Shield, UserCheck, Heart, MessageSquare, Share2, Bookmark, History, TrendingUp, Users, Globe, Building2, ChevronRight, Check, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SECTIONS = [
  {
    id: "dashboard",
    icon: <Layout className="h-6 w-6" />,
    title: "My Dashboard",
    subtitle: "Your Command Centre",
    description: "The personalized home within IGEN — showing you only what you've chosen to follow, organized exactly the way you want.",
    items: [
      { name: "My Followed Sectors", desc: "Current activity, latest articles, and rankings for your sectors." },
      { name: "My Industries", desc: "Track specific industries spiking in engagement within your sectors." },
      { name: "My Countries", desc: "Developments, policies, and momentum scores for bilateral trade." },
      { name: "My Leaders", desc: "A curated leadership intelligence feed across 25 designations." },
      { name: "My Alerts", desc: "Manage spikes, policy changes, and AI Plus monitoring signals." },
    ]
  },
  {
    id: "activity",
    icon: <Activity className="h-6 w-6" />,
    title: "My Activity",
    subtitle: "Professional Intelligence Trail",
    description: "A structured record of how you've engaged with IGEN's content over time, revealing the shape of your trade interests.",
    items: [
      { name: "My Likes", desc: "A record of content you've validated as most relevant." },
      { name: "My Comments", desc: "Your professional voice, archived across IGEN discussions." },
      { name: "My Shares", desc: "Intelligence you've found worth amplifying to your network." },
      { name: "My Bookmarks", desc: "Your organized research library, filterable and exportable." },
      { name: "My Reading History", desc: "A structured trail for research reference and profile building." },
    ]
  },
  {
    id: "contributions",
    icon: <FileText className="h-6 w-6" />,
    title: "My Contributions",
    subtitle: "Your Professional Presence",
    description: "The section for members who are not just consuming intelligence but creating it and building their professional identity.",
    items: [
      { name: "My Published Insights", desc: "Your permanent, SEO-indexed thought leadership archive." },
      { name: "My Drafts", desc: "Your publishing workspace for refining insights before review." },
      { name: "My Leader Page", desc: "A link to your dedicated public leader profile and metrics." },
      { name: "My Corporate Page", desc: "Manage your company's structured presence and mentions." },
      { name: "My Engagement Score", desc: "A measure of your overall IGEN professional participation." },
    ]
  },
  {
    id: "analytics",
    icon: <BarChart3 className="h-6 w-6" />,
    title: "My Analytics (Pro+)",
    subtitle: "Measure Your Footprint",
    description: "Structured data on the reach and impact of your IGEN professional presence — turning activity into measurable intelligence.",
    items: [
      { name: "Engagement Stats", desc: "Stats on how readers interact with your published insights." },
      { name: "Article Reach", desc: "Geographic, sector, and designation-level reach analytics." },
      { name: "Follower Count", desc: "A measure of your professional authority building on IGEN." },
      { name: "Sector Influence", desc: "Measure of your influence based on citations and seniority." },
      { name: "Reputation Score", desc: "Holistic indicator of your overall IGEN authority build." },
    ]
  }
];

const FOLLOW_LIMITS = [
  { type: "Sectors", free: "1", pro: "5", leader: "Unlimited", corporate: "Unlimited" },
  { type: "Industries", free: "5", pro: "50", leader: "Unlimited", corporate: "Unlimited" },
  { type: "Countries", free: "—", pro: "10", leader: "Unlimited", corporate: "Unlimited" },
  { type: "Leaders", free: "—", pro: "10", leader: "Unlimited", corporate: "Unlimited" },
  { type: "Custom Alerts", free: "—", pro: "—", leader: "✓", corporate: "✓" },
];

const STEPS = [
  { title: "Create Your Account", desc: "Sign up at indiaglobalnews.com in under 2 minutes." },
  { title: "Follow Your First Sector", desc: "Search for your primary industry sector to activate your feed." },
  { title: "Follow Key Industries", desc: "Within your sector, follow specific industries (5 on Free, 50 on Pro)." },
  { title: "Set Up Your Alerts", desc: "Configure spikes and activity alerts for your key follows." },
  { title: "Claim Your Profile", desc: "Emerging Leaders can claim their dedicated profile and start publishing." },
];

const FAQS = [
  { q: "What is MY TRADENEWS?", a: "Your personal dashboard within IGEN — organising all your followed sectors, industries, countries, and leaders in one place." },
  { q: "Is it available to free users?", a: "The basic Dashboard (follows and activity) is available to all. Advanced features like analytics require Pro Reader or above." },
  { q: "How do I set up my personalised dashboard?", a: "Simply create a free account and start following sectors and industries. Your dashboard activates immediately." },
  { q: "Can I export my bookmarks?", a: "Pro Readers and above can export bookmarks as a structured PDF brief for research and meeting preparation." },
];

export default function MyTradeNewsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="bg-white py-24 dark:bg-[var(--color-neutral-white)]">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-1.5 text-sm font-bold text-[var(--color-primary)]">
            <Settings className="h-4 w-4" />
            <span>Your Personal Control Centre</span>
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold md:text-6xl">
            My TradeNews — Your Trade World.<br />
            <span className="text-[var(--color-primary)]">Organised Exactly the Way You Think.</span>
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-[var(--color-neutral-dark)]">
            MY TRADENEWS is your private dashboard within IGEN — 
            organising your followed sectors, industries, countries, and leaders into a single personalised intelligence environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="rounded-xl bg-[var(--color-primary)] px-8 py-4 font-bold text-white shadow-lg transition-all hover:opacity-90">
              Go to My Dashboard
            </button>
            <button className="rounded-xl border border-[var(--color-neutral-light)] bg-white px-8 py-4 font-bold transition-all hover:bg-[var(--color-neutral-light)]/20 dark:bg-transparent">
              Set Up Your Profile
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[var(--color-neutral-light)]/30 py-24 dark:bg-black/20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">Personalisation</h2>
            <h3 className="mb-12 font-display text-4xl font-bold">Ownership Is the Highest Form of Retention</h3>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="text-left">
                <p className="mb-6 text-lg text-[var(--color-neutral-dark)]">
                  In physical exhibitions, every serious exhibitor has a back-office dashboard — managing their booth and tracking competitors. 
                  MY TRADENEWS is that dashboard for IGEN.
                </p>
                <p className="mb-8 text-[var(--color-neutral-dark)] opacity-70">
                  A user who personalises IGEN does not leave. They have configured the platform to feel like theirs. 
                  Built their library. Claimed their page. Tracked their influence.
                </p>
                <blockquote className="border-l-4 border-[var(--color-primary)] pl-6 font-serif text-xl italic text-[var(--color-primary)]">
                  "Users who personalise do not leave."
                </blockquote>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[var(--color-neutral-white)]">
                  <Heart className="mb-4 h-8 w-8 text-pink-500" />
                  <div className="text-2xl font-bold">1 Sector</div>
                  <div className="text-xs opacity-50 uppercase">Followed</div>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[var(--color-neutral-white)]">
                  <Bookmark className="mb-4 h-8 w-8 text-blue-500" />
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs opacity-50 uppercase">Saved</div>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[var(--color-neutral-white)]">
                  <Activity className="mb-4 h-8 w-8 text-green-500" />
                  <div className="text-2xl font-bold">85</div>
                  <div className="text-xs opacity-50 uppercase">Engagement</div>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[var(--color-neutral-white)]">
                  <Shield className="mb-4 h-8 w-8 text-[var(--color-accent-gold-dark)]" />
                  <div className="text-2xl font-bold">✓</div>
                  <div className="text-xs opacity-50 uppercase">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Sections */}
      <section className="bg-white py-24 dark:bg-[var(--color-neutral-white)]">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">The Four Dashboard Sections</h2>
            <p className="opacity-60">Everything you need to manage your trade intelligence footprint.</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {SECTIONS.map((section) => (
              <div key={section.id} className="rounded-3xl border border-[var(--color-neutral-light)] p-10 hover:border-[var(--color-primary)]/30 hover:shadow-xl transition-all">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
                    {section.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold">{section.title}</h4>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] opacity-50">{section.subtitle}</p>
                  </div>
                </div>
                <p className="mb-8 text-sm opacity-60">{section.description}</p>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.name} className="flex items-start gap-3 rounded-xl bg-[var(--color-neutral-light)]/10 p-4 transition-colors hover:bg-[var(--color-neutral-light)]/20">
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                      <div>
                        <div className="text-sm font-bold">{item.name}</div>
                        <div className="text-xs opacity-50">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage Table */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-16 font-display text-4xl font-bold">The Personalisation Advantage</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-left backdrop-blur-md">
                <h4 className="mb-4 text-xl font-bold text-red-400">Without personalization:</h4>
                <p className="opacity-60 text-sm leading-relaxed">
                  You start from the beginning every visit—rediscovering what you already know, missing updates on what you care about. Reactive news consumption.
                </p>
              </div>
              <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-10 text-left backdrop-blur-md">
                <h4 className="mb-4 text-xl font-bold text-blue-400">With MY TRADENEWS:</h4>
                <p className="opacity-80 text-sm leading-relaxed">
                  Your sectors are there. Your bookmarks contain last week's research. Your alerts flagged two developments since your last visit. Proactive intelligence management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Limits Table */}
      <section className="bg-white py-24 dark:bg-[var(--color-neutral-white)]">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">Follow Architecture</h2>
            <p className="opacity-60">Your intelligence follows your professional world.</p>
          </div>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--color-neutral-light)] shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-[var(--color-neutral-light)]/20 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-6">Follow Type</th>
                  <th className="p-6">Free</th>
                  <th className="p-6">Pro</th>
                  <th className="p-6">Leader+</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral-light)]">
                {FOLLOW_LIMITS.map((limit) => (
                  <tr key={limit.type} className="hover:bg-[var(--color-neutral-light)]/5">
                    <td className="p-6 font-bold">{limit.type}</td>
                    <td className="p-6 opacity-60">{limit.free}</td>
                    <td className="p-6 font-bold">{limit.pro}</td>
                    <td className="p-6 text-[var(--color-primary)] font-bold">{limit.leader}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <section className="bg-[var(--color-primary)] py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">Set Up Your Dashboard</h2>
            <p className="opacity-70 text-lg">Five steps to a fully personalised IGEN experience.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-5">
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-md">
                <div className="mb-4 text-3xl font-bold opacity-20">0{idx + 1}</div>
                <h4 className="mb-2 font-bold">{step.title}</h4>
                <p className="text-xs opacity-60 leading-relaxed">{step.desc}</p>
                {idx < 4 && (
                  <ChevronRight className="absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 opacity-20 lg:block" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm font-bold text-[var(--color-accent-gold-light)]">
            "IGEN gets more valuable every time you return to it."
          </p>
        </div>
      </section>

      {/* Corporate Section */}
      <section className="bg-white py-24 dark:bg-[var(--color-neutral-white)]">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl rounded-[3rem] bg-[var(--color-neutral-light)]/20 p-12 lg:p-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Building2 className="mb-6 h-12 w-12 text-[var(--color-primary)]" />
                <h2 className="mb-6 font-display text-3xl font-bold">My TradeNews for Teams</h2>
                <p className="mb-8 opacity-60 text-lg">
                  Corporate trade heads can configure structured intelligence environments for multiple users within their organisation.
                </p>
                <ul className="space-y-4">
                  {[
                    "Multi-user accounts under one subscription",
                    "Coordinated sector and country coverage",
                    "Shared bookmarks and research library",
                    "Corporate-level engagement analytics"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold">
                      <Check className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-[var(--color-neutral-light)] bg-white p-8 shadow-xl dark:bg-[var(--color-neutral-white)]">
                <div className="mb-6 flex items-center justify-between border-b border-[var(--color-neutral-light)] pb-4">
                  <div className="text-sm font-bold">Team Dashboard Overview</div>
                  <Users className="h-5 w-5 opacity-20" />
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Global Trade Head", role: "Admin", active: true },
                    { name: "Sector Lead (Agri)", role: "Editor", active: true },
                    { name: "Country Manager (UAE)", role: "Viewer", active: false },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-neutral-light)] p-3">
                      <div className="flex flex-1 items-center gap-3">
                         <div className="h-8 w-8 rounded-full bg-[var(--color-neutral-light)]" />
                         <div>
                           <div className="text-[10px] font-bold">{user.name}</div>
                           <div className="text-[9px] opacity-40">{user.role}</div>
                         </div>
                      </div>
                      <div className={`h-1.5 w-1.5 rounded-full ${user.active ? 'bg-green-500' : 'bg-slate-300'}`} />
                    </div>
                  ))}
                  <button className="w-full rounded-lg border border-dashed border-[var(--color-neutral-light)] py-2 text-[10px] font-bold opacity-40 hover:opacity-100 transition-opacity">
                    <Plus className="inline h-3 w-3 mr-1" /> Add Team Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-neutral-light)]/20 py-24 dark:bg-black/10">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center font-display text-4xl font-bold">Dashboard FAQ</h2>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-[var(--color-neutral-light)] bg-white dark:bg-[var(--color-neutral-white)]">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left font-bold"
                  >
                    {faq.q}
                    <ChevronRight className={`h-5 w-5 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="border-t border-[var(--color-neutral-light)] p-6 text-sm opacity-60">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--color-primary)] py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 font-display text-4xl font-bold">IGEN Is Built for You. Make It Yours.</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg opacity-70">
            OWN your trade intelligence environment today. It takes 5 minutes to set up, but pays back every daily visit.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
             <Link href="#" className="rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-md hover:bg-white/10 transition-all">
                <div className="mb-2 text-2xl font-bold">Free</div>
                <div className="text-xs opacity-50 mb-4">Initial Setup</div>
                <div className="font-bold text-[var(--color-accent-gold-light)]">Create Account →</div>
             </Link>
             <Link href="#" className="rounded-2xl border-2 border-[var(--color-accent-gold)] bg-white/5 p-8 backdrop-blur-md ring-4 ring-white/5 scale-105">
                <div className="mb-2 text-2xl font-bold">Pro Reader</div>
                <div className="text-xs opacity-70 mb-4">Structure Everything</div>
                <div className="font-bold text-[var(--color-accent-gold-light)]">Configure Dashboard →</div>
             </Link>
             <Link href="#" className="rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-md hover:bg-white/10 transition-all">
                <div className="mb-2 text-2xl font-bold">Leader+</div>
                <div className="text-xs opacity-50 mb-4">Authority Setup</div>
                <div className="font-bold text-[var(--color-accent-gold-light)]">Claim Profile →</div>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

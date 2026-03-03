"use client";

import { Zap, Brain, Search, Activity, BarChart, Shield, Clock, TrendingUp, Info, ChevronRight, Check, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PILLARS = [
  {
    id: "monitoring",
    icon: <Activity className="h-6 w-6" />,
    title: "Smart Monitoring",
    description: "Automated, always-on monitoring across your sectors, countries, industries, and leaders. AI watches everything, you get the alerts.",
    features: [
      { name: "AI Industry Tracker", desc: "Filters for developments that meet significance thresholds." },
      { name: "Country Watch Alerts", desc: "Monitor policy shifts and export signals for 195 countries." },
      { name: "Leader Activity Monitor", desc: "Track CEO updates and policy signals from trade officials." },
      { name: "Custom Alerts", desc: "Define your own parameters for keywords, companies, or pairs." }
    ]
  },
  {
    id: "signals",
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Predictive Signals",
    description: "Forward-looking intelligence based on pattern analysis across IGEN's entire content universe.",
    features: [
      { name: "Industry Momentum Index", desc: "Composite score measuring volume, growth, and engagement." },
      { name: "Sector Growth Forecast", desc: "Forward-looking trade signals and bilateral developments." },
      { name: "Trade Sentiment Score", desc: "Real-time read on professional optimism or caution." },
      { name: "Risk Indicator", desc: "Early warning signals for sectors or countries showing stress." }
    ]
  },
  {
    id: "research",
    icon: <Search className="h-6 w-6" />,
    title: "Smart Research Tools",
    description: "On-demand AI tools that compress hours of research into structured, usable intelligence in minutes.",
    features: [
      { name: "AI Industry Summary", desc: "Structured summaries of trade position and key signals." },
      { name: "Country Trade Snapshot", desc: "Bilateral trade relationship summaries ready for briefings." },
      { name: "Leader Summary Generator", desc: "Intelligence summaries for meeting prep and competitive research." },
      { name: "Comparative Analysis Tool", desc: "Compare sectors, countries, or industries side-by-side." }
    ]
  },
  {
    id: "personalisation",
    icon: <Brain className="h-6 w-6" />,
    title: "AI Personalisation",
    description: "Your own personalized intelligence layer that learns from your interests and reading patterns.",
    features: [
      { name: "My AI Feed", desc: "A curated version of the feed based on your unique follows." },
      { name: "Auto Curated Daily Digest", desc: "Your personalized intelligence brief delivered every morning." },
      { name: "Smart Recommendations", desc: "Discover articles and leaders that pattern analysis suggests." },
      { name: "Predictive Interest Mapping", desc: "A mirror of your evolving professional interests." }
    ]
  }
];

const Users = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const COMPARISON = [
  { task: "Monitoring 5 sectors", without: "45 min/day scanning", with: "Automated alerts", icon: <Activity className="h-4 w-4" /> },
  { task: "Researching a country", without: "60–90 min online", with: "5 min AI snapshot", icon: <Search className="h-4 w-4" /> },
  { task: "Summarising industry news", without: "2 hours/week", with: "20 min smart digest", icon: <Clock className="h-4 w-4" /> },
  { task: "Tracking 10 leader movements", without: "Impossible at scale", with: "Automated leader monitor", icon: <Users className="h-4 w-4" /> },
  { task: "Spotting emerging signals", without: "Luck", with: "Predictive momentum index", icon: <TrendingUp className="h-4 w-4" /> },
];

const FAQS = [
  { q: "What is IGEN AI Plus?", a: "The premium intelligence layer of IGEN — bringing automated monitoring, predictive trade signals, smart research tools, and AI personalisation to trade professionals." },
  { q: "Is AI Plus an additional cost?", a: "AI Plus is included at the Emerging Leader and Corporate plan levels. Pro Readers can access AI Plus as a premium add-on." },
  { q: "What is the Industry Momentum Index?", a: "A composite score measuring article volume growth, engagement acceleration, search spikes, and leader activity concentration." },
  { q: "Is the AI trained on IGEN's content only?", a: "Yes. AI Plus draws primarily from IGEN's verified, QC-checked content archive to ensure accuracy and editorial integrity." },
];


export default function AIPlusPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent)]" />
        <div className="absolute -left-1/4 -top-1/4 h-[100%] w-[100%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent)] blur-3xl" />
        
        <div className="container relative mx-auto px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-400 backdrop-blur-xl">
            <Zap className="h-4 w-4 animate-pulse" />
            <span>AI-Powered Performance</span>
          </div>
          
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Trade Intelligence Is No Longer Reactive.<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent italic">
              AI Plus Makes It Predictive.
            </span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-3xl text-lg opacity-70">
            Smart Monitoring. Predictive Signals. AI-Personalised Trade Intelligence. 
            Welcome to the premium intelligence layer built for serious professionals.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-bold transition-all hover:bg-blue-500">
              Explore AI Plus Features
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-bold backdrop-blur-md transition-all hover:bg-white/10">
              Upgrade to Access AI Plus
            </button>
          </div>
        </div>
      </section>

      {/* What is AI Plus Section */}
      <section className="bg-white py-24 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">Personal Analyst</h2>
              <h3 className="mb-6 font-display text-4xl font-bold">The Intelligence Layer That Makes IGEN Feel Like Yours.</h3>
              <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
                AI Plus doesn't replace human judgment. It handles the watching, filtering, and summarising—so you can apply your judgment to decisions, not information management.
              </p>
              <ul className="space-y-4">
                {[
                  "Watches your sectors 24/7 without missing a signal",
                  "Alerts you before something becomes mainstream news",
                  "Summarises a country's trade position in 60 seconds",
                  "Tracks leader activity across your entire network"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                      <Check className="h-4 w-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-3xl bg-slate-100 p-8 dark:bg-slate-800">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-700">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-blue-500 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-600" />
                    <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-slate-600/50" />
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-700 opacity-60">
                   <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-600" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-600" />
                    <div className="h-3 w-1/4 rounded bg-slate-100 dark:bg-slate-600/50" />
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border-2 border-dashed border-blue-500/20 bg-blue-50/50 p-6 text-center dark:bg-blue-950/20">
                  <Brain className="mx-auto mb-2 h-8 w-8 text-blue-500" />
                  <p className="text-sm font-bold text-blue-600 italic">"IGEN AI Plus is not an experiment. It is a premium intelligence infrastructure."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-slate-50 py-24 dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold">How AI Plus Elevates Your Intelligence</h2>
            <p className="mx-auto max-w-2xl opacity-60">Four technical pillars built to transform trade data into strategic advantage.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div key={pillar.id} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 transition-all hover:border-blue-500/30 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white transition-colors group-hover:bg-blue-600">
                  {pillar.icon}
                </div>
                <h4 className="mb-4 font-display text-2xl font-bold">{pillar.title}</h4>
                <p className="mb-10 opacity-60">{pillar.description}</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {pillar.features.map((feat) => (
                    <div key={feat.name} className="space-y-1">
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{feat.name}</div>
                      <div className="text-xs opacity-50">{feat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Efficiency Comparison */}
      <section className="bg-white py-24 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center font-display text-4xl font-bold">The Cost of Information Overload</h2>
            <p className="mb-16 text-center opacity-60">Senior professionals save an average of 6–10 hours per week with AI Plus.</p>
            
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-xl dark:border-slate-800">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr className="text-sm font-bold uppercase tracking-wider">
                    <th className="p-6">Efficiency Task</th>
                    <th className="p-6">Without AI Plus</th>
                    <th className="p-6 text-blue-600">With AI Plus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {COMPARISON.map((row, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-6">
                        <div className="flex items-center gap-3 font-semibold">
                          <span className="opacity-40">{row.icon}</span>
                          {row.task}
                        </div>
                      </td>
                      <td className="p-6 text-sm opacity-60">{row.without}</td>
                      <td className="p-6 text-sm font-bold text-blue-600 dark:text-blue-400">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 dark:bg-blue-900/20">
                          <Zap className="h-3 w-3" />
                          {row.with}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-center text-sm italic opacity-50">
              "At a senior cost-per-hour, AI Plus pays for itself in weeks."
            </p>
          </div>
        </div>
      </section>

      {/* AI Integrity Commitment */}
      <section className="bg-blue-600 py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Shield className="mx-auto mb-6 h-12 w-12" />
            <h2 className="mb-8 font-display text-4xl font-bold">The AI Integrity Commitment</h2>
            <p className="mb-12 text-xl opacity-80">
              Built on IGEN's structured content universe—not the open web. 
              No hallucinations. No misattributed quotes. No classification errors.
            </p>
            <div className="grid gap-6 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <h4 className="mb-2 font-bold flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  Verified Archive Only
                </h4>
                <p className="text-sm opacity-70">All signals are based on IGEN's QC-verified, accurately tagged content archive.</p>
              </div>
               <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <h4 className="mb-2 font-bold flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  Human QC Layer
                </h4>
                <p className="text-sm opacity-70">Technology power meets manual verification by Sanjay and Priyanshi's team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white py-24 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center font-display text-4xl font-bold">Intelligence FAQ</h2>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left font-bold"
                  >
                    {faq.q}
                    <ChevronRight className={`h-5 w-5 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="bg-slate-50 p-6 text-sm opacity-70 dark:bg-slate-800/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.2),transparent)]" />
        <div className="container relative mx-auto px-6 text-center">
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
            Intelligence Is No Longer About Reading More.<br />
            <span className="text-blue-500 italic">It's About Seeing Better.</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg opacity-60">
            Automated, predictive, and personalized. The future of trade intelligence starts now.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-10 text-left backdrop-blur-xl">
              <h4 className="mb-2 font-display text-2xl font-bold">Pro Reader</h4>
              <p className="mb-8 text-sm opacity-50">Automate your sector monitoring and get the predictive edge.</p>
              <Link href="#" className="mt-auto font-bold text-blue-400 hover:text-blue-300">Upgrade Plan →</Link>
            </div>
            <div className="flex flex-col rounded-3xl border-2 border-blue-500/50 bg-blue-500/10 p-10 text-left backdrop-blur-xl ring-4 ring-blue-500/10 scale-105">
              <div className="mb-2 inline-block rounded bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">Included</div>
              <h4 className="mb-2 font-display text-2xl font-bold">Emerging Leader</h4>
              <p className="mb-8 text-sm opacity-70">Personalized analytics and monthly insight distribution tools.</p>
              <Link href="#" className="mt-auto font-bold text-blue-400 hover:text-blue-300">Get Active Access →</Link>
            </div>
            <div className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-10 text-left backdrop-blur-xl text-white">
               <h4 className="mb-2 font-display text-2xl font-bold">Corporate Plan</h4>
              <p className="mb-8 text-sm opacity-50">Give your entire team AI-powered research and monitoring tools.</p>
              <Link href="#" className="mt-auto font-bold text-blue-400 hover:text-blue-300">Schedule Demo →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

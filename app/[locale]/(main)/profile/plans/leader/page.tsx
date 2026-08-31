"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  FileText,
  Star,
  Crown,
  Zap,
  TrendingUp,
  Users,
  Award,
  Lock,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Mic2,
  Bot,
  PenLine,
  Handshake,
} from "lucide-react";
import CheckoutModal from "@/components/profile/CheckoutModal";

/* ─────────────────────────────────────────────
   PLAN DATA
───────────────────────────────────────────── */
const plans = [
  {
    id: "free",
    name: "FREE LEADER",
    badge: null,
    tagline: "Bundled or Exploring",
    price: "₹0",
    annualPrice: "₹0",
    annualSaving: null,
    period: "forever",
    theme: "free",
    icon: "🔓",
    cta: "Activate Free Profile",
    description: "A basic unlisted presence to get started. Not Google-indexed.",
    articles: { total: 0, self: 0, ai: 0, sme: 0, asme: 0 },
    tabs: 1,
    sectorTags: 0,
    benefits: [
      "Basic public profile (name, photo, title, company)",
      "1 unverified sector tag (no Blue Tick)",
      "Basic bio (500 characters)",
      "Standard contact inquiry form",
      "Auto-created with Company Page bundle",
    ],
    locked: [
      "Blue Tick (KYC) Verification",
      "Google-indexed /topleader/name URL",
      "Article publishing of any kind",
      "Thought Leadership & Awards tabs",
      "Sector Authority ranking",
      "Leader Influence Score",
      "Press Kit & Video Introduction",
    ],
  },
  {
    id: "pioneer",
    name: "PIONEER",
    badge: null,
    tagline: "Emerging Executive Authority",
    price: "₹4,999",
    annualPrice: "₹49,990",
    annualSaving: "Save ₹9,998 (2 months free)",
    period: "month",
    theme: "pioneer",
    icon: "🔷",
    cta: "Become a Pioneer",
    description: "Your verified entry into India's executive authority infrastructure.",
    articles: { total: 4, self: 4, ai: 0, sme: 0, asme: 0 },
    tabs: 2,
    sectorTags: 1,
    benefits: [
      "KYC Blue Tick Verification — Curated by iGEN",
      "Google-indexed authority URL: /topleader/name",
      "2-Tab Profile: Overview + Leadership Story",
      "1 verified sector tag (1 of 50 sectors)",
      "Full bio with career timeline & philosophy",
      "Company association badge",
      "Sector directory listing (general placement)",
      "Leader Influence Score (private — owner only)",
      "Shareable profile card with Blue Tick watermark",
      "Identity Portability — page belongs to you, not company",
      "4 self-authored articles published per month",
    ],
    locked: [
      "Thought Leadership & Awards tabs",
      "Sector Authority tab",
      "Video Introduction",
      "Public Influence Score",
      "Featured / Top 10 sector listing",
    ],
  },
  {
    id: "luminary",
    name: "LUMINARY",
    badge: "MOST POPULAR",
    tagline: "Authority Leader & Thought Pioneer",
    price: "₹9,999",
    annualPrice: "₹99,990",
    annualSaving: "Save ₹19,998 (2 months free)",
    period: "month",
    theme: "luminary",
    icon: "🌟",
    cta: "Become a Luminary",
    description: "Multi-sector authority with a collaborative content engine behind you.",
    articles: { total: 6, self: 2, ai: 2, sme: 1, asme: 1 },
    tabs: 4,
    sectorTags: 3,
    benefits: [
      "Everything in Pioneer",
      "4-Tab Profile: Overview + Story + Thought Leadership + Awards",
      "Up to 3 verified sector tags (multi-sector authority)",
      "Featured listing — Top 10 in your sector directory",
      "Video Introduction (30–90 sec embedded bio)",
      "Leader Influence Score — PUBLIC on your profile",
      "Speaking & Media tab (conference videos, press mentions)",
      "Downloadable Digital Bio Card (auto-generated PDF)",
      "Priority inquiry routing",
      "iGEN Sector Newsletter feature (your quote included)",
      "Associate up to 2 companies (board/advisor roles)",
      "6 articles/month: 2 self + 2 AI Editor + 1 SME + 1 ASME",
    ],
    locked: [
      "Sector Authority tab (live ranking dashboard)",
      "Guaranteed Sector #1 or Top 3 pinned rank",
      "Press Kit download",
      "Dedicated Account Manager",
      "Investor Due Diligence Profile",
    ],
  },
  {
    id: "sovereign",
    name: "SOVEREIGN",
    badge: "SECTOR ICON",
    tagline: "Visionary Leader & Sector Icon",
    price: "₹16,999",
    annualPrice: "₹1,69,990",
    annualSaving: "Save ₹33,998 (2 months free)",
    period: "month",
    theme: "sovereign",
    icon: "👑",
    cta: "Claim Sovereignty",
    description: "Own your sector. The only plan with a guaranteed Sector #1 ranking.",
    articles: { total: 8, self: 4, ai: 2, sme: 1, asme: 1 },
    tabs: 5,
    sectorTags: 5,
    benefits: [
      "Everything in Luminary",
      "5-Tab Full Profile including Sector Authority tab",
      "Guaranteed Sector #1 or Top 3 pinned ranking (finite slots)",
      "Up to 5 verified sector tags (cross-sector dominance)",
      "Full Multimedia Profile (video + gallery + documents)",
      "Downloadable Press Kit (media-ready PDF)",
      "Sector Authority tab — live ranking & audience analytics",
      "Co-bylined iGEN press release (1 per quarter)",
      "iGEN Expo & Global Event speaking eligibility",
      "Dedicated iGEN Account Manager",
      "Institutional Investor Due Diligence Profile",
      "International sector tagging (global visibility)",
      "Editorial feature in iGEN articles",
      "8 articles/month: 4 self + 2 AI Editor + 1 SME + 1 ASME",
    ],
    locked: [],
  },
];

/* ─────────────────────────────────────────────
   THEME CONFIG
───────────────────────────────────────────── */
const themeConfig = {
  free: {
    card: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1923]",
    badge: "",
    badgeBg: "",
    priceColor: "text-gray-500 dark:text-gray-400",
    ctaClass: "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1D1D46] dark:text-white",
    checkColor: "text-gray-400",
    accentDot: "bg-gray-400",
    glow: "",
  },
  pioneer: {
    card: "border-blue-500/30 dark:border-[#3B82F6]/20 bg-gradient-to-b from-white to-blue-50/20 dark:from-[#050d1e] dark:to-[#071428]",
    badge: "",
    badgeBg: "",
    priceColor: "text-blue-600 dark:text-blue-400",
    ctaClass: "bg-[#1D1D46] hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20",
    checkColor: "text-blue-500",
    accentDot: "bg-blue-500",
    glow: "shadow-blue-500/10",
  },
  luminary: {
    card: "border-amber-500/40 dark:border-[#D4A017]/30 bg-gradient-to-b from-white to-amber-50/20 dark:from-[#0d1014] dark:to-[#1a1200] relative overflow-hidden",
    badge: "MOST POPULAR",
    badgeBg: "bg-amber-500",
    priceColor: "text-amber-600 dark:text-amber-400",
    ctaClass: "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg shadow-amber-900/30",
    checkColor: "text-amber-500",
    accentDot: "bg-amber-500",
    glow: "shadow-amber-500/10",
  },
  sovereign: {
    card: "border-purple-500/40 dark:border-[#7C3AED]/30 bg-gradient-to-b from-white via-purple-50/10 to-white dark:from-[#060308] dark:via-[#0e0515] dark:to-[#060308] relative overflow-hidden",
    badge: "SECTOR ICON",
    badgeBg: "bg-gradient-to-r from-purple-600 to-violet-600",
    priceColor: "text-purple-600 dark:text-purple-400",
    ctaClass: "bg-gradient-to-r from-purple-700 to-violet-600 hover:from-purple-800 hover:to-violet-700 text-white shadow-lg shadow-purple-900/30",
    checkColor: "text-purple-500",
    accentDot: "bg-purple-500",
    glow: "shadow-purple-500/15",
  },
};

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
const faqs = [
  {
    q: "What makes iGEN verification different from LinkedIn or Twitter?",
    a: "LinkedIn and Twitter verification is algorithmic — anyone can pay for a badge. iGEN's Blue Tick is curated by a KYC process backed by the India Chamber of Exports (ICE), operational since 1994. Your verification carries 30 years of institutional credibility behind it.",
  },
  {
    q: "What does 'identity portability' mean?",
    a: "On LinkedIn, your authority is tied to your employer's company page. If you change companies, you lose that association. On iGEN, your Leader Page belongs to *you* — not your company. Your authority, your Blue Tick, your sector rank, all travel with you.",
  },
  {
    q: "Are the Sovereign Sector #1 slots really limited?",
    a: "Yes. We enforce a maximum of one Sovereign leader per sector per tier. When a Sovereign slot is filled in your sector, no one else can claim a guaranteed #1 in that sector until it opens. This is a hard product constraint — not marketing copy.",
  },
  {
    q: "How does the collaborative article engine work for Luminary & Sovereign?",
    a: "For Luminary (6/mo): You write 2 yourself. Our iGEN AI Editor produces 2 (you review & approve before publishing). One SME and one Associate SME from your sector each contribute 1 article about you or co-authored with you. For Sovereign (8/mo): you write 4, plus the same 4 collaborative articles.",
  },
  {
    q: "Can I get a Leader Page bundled with a Company Page?",
    a: "Yes — this is our primary sales route. When a company purchases an iGEN Company Page, Leader Pages for 1–4 executives are included in the bundle. You can upgrade individual leader tiers independently after activation.",
  },
  {
    q: "What is the Leader Influence Score?",
    a: "It's a composite metric calculated from Page Views + Awards count + Sector Rank position. For Pioneer leaders, it's visible only on your dashboard (private gamification). For Luminary and Sovereign, it's publicly displayed on your profile — a visible trust signal to investors, media, and partners.",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function LeaderPlansPage() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!user) return null;

  const currentPlan =
    user.leaderPlan ||
    (user.onboardingRole === "leader" && user.onboardingStatus === "Approved" ? "free" : "none");

  const getDisplayPrice = (plan: (typeof plans)[0]) => {
    if (plan.id === "free") return { price: "₹0", sub: "/ forever" };
    if (billingCycle === "annual") return { price: plan.annualPrice, sub: `/ year` };
    return { price: plan.price, sub: `/ month` };
  };

  const handlePlanSelect = async (planId: string, name: string, priceStr: string) => {
    if (planId === "free") {
      await updateOnboarding({
        onboardingRole: "leader",
        onboardingStatus: "Draft",
        onboardingForm: {},
        onboardingDocs: {},
        onboardingFeedback: "",
        leaderPlan: "free",
      });
    } else {
      setSelectedPlan({ id: planId, name, price: priceStr });
      setCheckoutOpen(true);
    }
  };

  const handlePaymentSuccess = async (updatedFields: any) => {
    await updateOnboarding(updatedFields);
  };

  return (
    <div className="min-h-screen pb-28">
      {/* ── Active Profile Banner ── */}
      {user.onboardingRole === "leader" && user.onboardingStatus === "Approved" && (
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-6">
          <div className="mb-2 p-4 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 border border-blue-200 dark:border-blue-900/30 rounded-2xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-[#1D1D46] dark:text-white">
                  Active Leader Profile: {user.name || "Leader"}{" "}
                  <span className="ml-1 text-[10px] font-black uppercase bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    {currentPlan === "none" ? "Free" : currentPlan}
                  </span>
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Manage your profile, articles, and public presence from your dashboard.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/${locale}/profile`)}
              className="px-4 py-2 bg-[#1D1D46] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              Go to My Profile <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="text-center px-5 pt-10 pb-6 max-w-3xl mx-auto">
        <span className="text-xs font-black tracking-widest text-[#F0652E] uppercase bg-[#F0652E]/10 px-3 py-1.5 rounded-full inline-block mb-4">
          Executive Authority Infrastructure
        </span>
        <h1
          className="text-3xl md:text-5xl font-bold text-[#1D1D46] dark:text-white leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The World Trusts{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-amber-500 to-purple-600">
            Visible Leaders.
          </span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed max-w-xl mx-auto">
          Invisible leaders lose media, speaking, and investment opportunities silently every single day.
          Your competitor is one Blue Tick away from owning your sector.
        </p>

        {/* Founding Member Counter */}
        <div className="mt-6 inline-flex items-center gap-2.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 px-4 py-2.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
            Founding Member Offer — First 50 leaders lock rates for life
          </span>
          <span className="text-[10px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">
            43 / 50 Taken
          </span>
        </div>

        {/* Billing Toggle */}
        <div className="mt-6 inline-flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-[#1D1D46] text-[#1D1D46] dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-white dark:bg-[#1D1D46] text-[#1D1D46] dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Annual
            <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">
              2 MONTHS FREE
            </span>
          </button>
        </div>
      </div>

      {/* ── Pricing Cards ── */}
      <div className="px-5 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {plans.map((plan) => {
            const theme = themeConfig[plan.theme as keyof typeof themeConfig];
            const isActive = currentPlan === plan.id;
            const { price, sub } = getDisplayPrice(plan);

            return (
              <div
                key={plan.id}
                className={`rounded-[28px] border-2 p-6 flex flex-col transition-all duration-300 hover:shadow-2xl ${theme.card} ${theme.glow}`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className={`absolute top-4 right-4 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${theme.badgeBg}`}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Card Header */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{plan.icon}</span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {plan.tagline}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#1D1D46] dark:text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1 leading-snug">
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={`text-3xl font-black ${theme.priceColor}`}>{price}</span>
                    <span className="text-xs text-gray-400">{sub}</span>
                  </div>
                  {billingCycle === "annual" && plan.annualSaving && (
                    <div className="mt-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {plan.annualSaving}
                    </div>
                  )}
                </div>

                {/* Article Engine Pill */}
                {plan.id !== "free" && (
                  <div className="mb-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-3">
                    <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Content Engine / Month
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#1D1D46] dark:text-white bg-white dark:bg-white/10 px-2 py-0.5 rounded-full border border-gray-100 dark:border-white/10">
                        <PenLine className="w-2.5 h-2.5" />
                        {plan.articles.self} Self
                      </span>
                      {plan.articles.ai > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/20">
                          <Bot className="w-2.5 h-2.5" />
                          {plan.articles.ai} AI
                        </span>
                      )}
                      {plan.articles.sme > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/20">
                          <Handshake className="w-2.5 h-2.5" />
                          {plan.articles.sme} SME
                        </span>
                      )}
                      {plan.articles.asme > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/20 px-2 py-0.5 rounded-full border border-violet-100 dark:border-violet-900/20">
                          <Handshake className="w-2.5 h-2.5" />
                          {plan.articles.asme} ASME
                        </span>
                      )}
                      <span className="ml-auto text-[10px] font-black text-[#1D1D46] dark:text-white">
                        = {plan.articles.total}/mo
                      </span>
                    </div>
                  </div>
                )}

                <div className="h-px bg-gray-100 dark:bg-white/5 w-full mb-4" />

                {/* Benefits */}
                <div className="flex-1 space-y-1 mb-5">
                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2">
                    {plan.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-gray-600 dark:text-gray-300 leading-snug">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.checkColor}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.locked.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-50 dark:border-white/5">
                      <div className="text-[9px] font-black uppercase tracking-widest text-gray-300 dark:text-white/20 mb-2">
                        Not Included:
                      </div>
                      <ul className="space-y-1.5">
                        {plan.locked.map((l, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px] text-gray-300 dark:text-white/25 leading-snug">
                            <Lock className="w-3 h-3 shrink-0 mt-0.5 text-gray-200 dark:text-white/15" />
                            <span>{l}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div>
                  {isActive ? (
                    <div className="w-full py-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-center font-bold text-xs rounded-2xl">
                      ✓ Your Current Plan
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handlePlanSelect(
                          plan.id,
                          plan.name,
                          plan.id === "free"
                            ? "Free"
                            : billingCycle === "annual"
                            ? `${plan.annualPrice}/year`
                            : `${plan.price}/month`
                        )
                      }
                      className={`w-full py-3.5 text-center font-bold text-sm rounded-2xl transition-all ${theme.ctaClass}`}
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Content Engine Explainer ── */}
      <div className="px-5 md:px-8 max-w-7xl mx-auto mt-16">
        <div className="bg-white dark:bg-[#0c1829] rounded-[28px] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-gray-50 dark:border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#F0652E]/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#F0652E]" />
              </div>
              <h2 className="text-lg font-bold text-[#1D1D46] dark:text-white">
                The iGEN Content Publishing Engine
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
              No competitor offers a multi-author content engine tied to an individual leader&apos;s profile.
              Leaders with 6–8 published articles per month see 4× more investor profile views and 3× more speaking inquiries.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 dark:border-white/5">
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">Plan</th>
                  <th className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-4">Total / Month</th>
                  <th className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-4">
                    <span className="flex items-center justify-center gap-1"><PenLine className="w-3 h-3" /> Self-Authored</span>
                  </th>
                  <th className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-4">
                    <span className="flex items-center justify-center gap-1"><Bot className="w-3 h-3" /> AI Editor</span>
                  </th>
                  <th className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-4">
                    <span className="flex items-center justify-center gap-1"><Handshake className="w-3 h-3" /> SME</span>
                  </th>
                  <th className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-4">
                    <span className="flex items-center justify-center gap-1"><Handshake className="w-3 h-3" /> ASME</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Free", icon: "🔓", total: 0, self: 0, ai: 0, sme: 0, asme: 0, color: "text-gray-400" },
                  { name: "Pioneer", icon: "🔷", total: 4, self: 4, ai: 0, sme: 0, asme: 0, color: "text-blue-600 dark:text-blue-400" },
                  { name: "Luminary", icon: "🌟", total: 6, self: 2, ai: 2, sme: 1, asme: 1, color: "text-amber-600 dark:text-amber-400" },
                  { name: "Sovereign", icon: "👑", total: 8, self: 4, ai: 2, sme: 1, asme: 1, color: "text-purple-600 dark:text-purple-400" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-2 font-black text-sm ${row.color}`}>
                        {row.icon} {row.name}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-lg font-black ${row.total === 0 ? "text-gray-300 dark:text-white/20" : row.color}`}>
                        {row.total === 0 ? "—" : row.total}
                      </span>
                    </td>
                    {[row.self, row.ai, row.sme, row.asme].map((val, j) => (
                      <td key={j} className="px-4 py-4 text-center">
                        <span className={`text-sm font-bold ${val === 0 ? "text-gray-200 dark:text-white/10" : "text-[#1D1D46] dark:text-white"}`}>
                          {val === 0 ? "—" : val}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Competitive Comparison ── */}
      <div className="px-5 md:px-8 max-w-7xl mx-auto mt-10">
        <div className="bg-white dark:bg-[#0c1829] rounded-[28px] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-gray-50 dark:border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-[#1D1D46] dark:text-white">
                Why iGEN Beats LinkedIn & Twitter
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              LinkedIn charges ₹5,000–₹8,919/mo for zero institutional authority. We deliver more, for less.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 dark:border-white/5">
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4 w-56">Feature</th>
                  <th className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-4">LinkedIn Premium</th>
                  <th className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 py-4">Twitter / X</th>
                  <th className="text-center text-[10px] font-black uppercase tracking-widest text-[#F0652E] px-4 py-4">iGEN Pioneer+</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Price (India)", "₹5,000–₹8,919/mo", "₹2,570/mo", "₹4,999/mo"],
                  ["Verification Type", "Algorithmic badge", "Paid badge (not curated)", "✅ KYC Institutional"],
                  ["Sector-Specific Ranking", "❌ None", "❌ None", "✅ 50 Sectors"],
                  ["Identity Portability", "❌ Company-linked", "❌ Handle-linked", "✅ Leader-owned"],
                  ["Google Authority URL", "linkedin.com/in/...", "x.com/...", "✅ /topleader/name"],
                  ["Content Engine", "❌ No publishing", "❌ No bylined articles", "✅ Up to 8/mo"],
                  ["Press Kit", "❌", "❌", "✅ Sovereign tier"],
                  ["ICE Legacy Trust (1994)", "❌ None", "❌ None", "✅ 30 years"],
                  ["Influence Score", "❌", "❌", "✅ Luminary+"],
                  ["Finite Sector Slots", "❌ 1 billion profiles", "❌ Unlimited", "✅ 10 leaders max/sector"],
                ].map(([feature, li, tw, ige], i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-6 py-3.5 text-xs font-semibold text-gray-700 dark:text-gray-300">{feature}</td>
                    <td className="px-4 py-3.5 text-center text-xs text-gray-400">{li}</td>
                    <td className="px-4 py-3.5 text-center text-xs text-gray-400">{tw}</td>
                    <td className="px-4 py-3.5 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400">{ige}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Profile Tab Architecture Visual ── */}
      <div className="px-5 md:px-8 max-w-7xl mx-auto mt-10">
        <div className="bg-white dark:bg-[#0c1829] rounded-[28px] border border-gray-100 dark:border-white/5 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1D1D46] dark:text-white">
                Your Public Profile Grows With Your Plan
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5">Each tier unlocks more tabs on your public authority page.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                tier: "Free",
                icon: "🔓",
                color: "border-gray-200 dark:border-white/10",
                tabColor: "bg-gray-100 dark:bg-white/5 text-gray-500",
                tabs: ["🏠 Overview (basic)"],
                locked: ["📖 Leadership Story", "💡 Thought Leadership", "🏆 Awards", "📊 Sector Authority", "🎤 Speaking & Media"],
              },
              {
                tier: "Pioneer",
                icon: "🔷",
                color: "border-blue-300/40 dark:border-blue-500/20",
                tabColor: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400",
                tabs: ["🏠 Overview (Blue Tick)", "📖 Leadership Story"],
                locked: ["💡 Thought Leadership", "🏆 Awards & Recognition", "📊 Sector Authority", "🎤 Speaking & Media"],
              },
              {
                tier: "Luminary",
                icon: "🌟",
                color: "border-amber-300/40 dark:border-amber-500/20",
                tabColor: "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400",
                tabs: ["🏠 Overview", "📖 Leadership Story", "💡 Thought Leadership", "🏆 Awards & Recognition", "🎤 Speaking & Media"],
                locked: ["📊 Sector Authority"],
              },
              {
                tier: "Sovereign",
                icon: "👑",
                color: "border-purple-300/40 dark:border-purple-500/20",
                tabColor: "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400",
                tabs: ["🏠 Overview", "📖 Leadership Story", "💡 Thought Leadership", "🏆 Awards & Recognition", "🎤 Speaking & Media", "📊 Sector Authority (#1)"],
                locked: [],
              },
            ].map((t, i) => (
              <div key={i} className={`rounded-2xl border-2 p-4 ${t.color}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span>{t.icon}</span>
                  <span className="text-sm font-black text-[#1D1D46] dark:text-white">{t.tier}</span>
                  <span className="ml-auto text-[10px] font-bold text-gray-400">{t.tabs.length} tabs</span>
                </div>
                <div className="space-y-1.5">
                  {t.tabs.map((tab, j) => (
                    <div key={j} className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg ${t.tabColor}`}>
                      {tab}
                    </div>
                  ))}
                  {t.locked.map((tab, j) => (
                    <div key={j} className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-white/3 text-gray-300 dark:text-white/15 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> {tab}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Urgency Block ── */}
      <div className="px-5 md:px-8 max-w-7xl mx-auto mt-10">
        <div className="rounded-[28px] bg-gradient-to-br from-[#050d1e] to-[#0a1628] border border-blue-900/30 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_#3B82F6_0%,_transparent_60%)]" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
                title: "Competitor Dominance",
                desc: "Right now, your sector competitor is one Blue Tick away from owning the top slot that investors, journalists, and partners see first.",
              },
              {
                icon: <Star className="w-5 h-5 text-blue-400" />,
                title: "First-Mover Lock-in",
                desc: "Only 10 verified leaders per sector. Only 1 Sovereign Sector #1 per sector. The internet permanently rewards whoever acts first.",
              },
              {
                icon: <Zap className="w-5 h-5 text-purple-400" />,
                title: "The Cost of Invisibility",
                desc: "Every day without a Blue Tick, you miss a media pitch, a speaking invite, or an investor due-diligence call. Invisible leaders lose silently.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-lg md:text-xl font-bold text-white italic">
              &ldquo;The world trusts visible leaders. Invisible leaders lose opportunities silently.&rdquo;
            </p>
            <p className="text-xs text-white/40 mt-2">— iGEN Leader Page Manifesto</p>
          </div>
        </div>
      </div>

      {/* ── All Plans Include ── */}
      <div className="px-5 md:px-8 max-w-7xl mx-auto mt-10">
        <div className="bg-white dark:bg-[#0c1829] rounded-[28px] border border-gray-100 dark:border-white/5 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#F0652E]" />
            <h2 className="text-lg font-bold text-[#1D1D46] dark:text-white">All Paid Plans Include</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: "KYC Institutional Verification", desc: "Backed by India Chamber of Exports, operational since 1994. Not algorithmic — curated." },
              { icon: Globe, title: "Google-Indexed Authority URL", desc: "/topleader/yourname is a permanent SEO asset. Rank on Google for your own name." },
              { icon: Users, title: "Identity Portability", desc: "Your page belongs to you — not your company. Your authority follows you everywhere." },
              { icon: BarChart3, title: "Leader Influence Score", desc: "Composite metric: Page Views + Awards + Sector Rank. Private for Pioneer, public for Luminary+." },
              { icon: Award, title: "Sector Directory Listing", desc: "Verified, curated presence in your sector's top leader directory. Featured for Luminary+." },
              { icon: Mic2, title: "Inquiry & Speaking Pipeline", desc: "Inbound form for media, speaking invites, and investor inquiries — routed to your dashboard." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F0652E]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#F0652E]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-1">{item.title}</h4>
                    <p className="text-[11px] text-gray-500 leading-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="px-5 md:px-8 max-w-4xl mx-auto mt-10">
        <h2 className="text-xl font-bold text-[#1D1D46] dark:text-white mb-5 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#0c1829] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-[#1D1D46] dark:text-white leading-snug">
                  {faq.q}
                </span>
                {openFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Checkout Modal ── */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          planName={selectedPlan.name}
          price={selectedPlan.price}
          category="leader"
          planId={selectedPlan.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Check, X, ShieldAlert, Sparkles, ArrowRight,
  Bookmark, Brain, Bell, Users, FileDown, MessageSquare,
  Globe, Camera, LayoutDashboard, Zap
} from "lucide-react";
import CheckoutModal from "@/components/profile/CheckoutModal";
import ReaderFreeInfo from "@/components/profile/upgrade/free/ReaderFreeInfo";

const FEATURE_MATRIX = [
  {
    category: "Content Access",
    icon: LayoutDashboard,
    features: [
      { label: "Public trade news & headlines", free: true, pro: true, premium: true, enterprise: true },
      { label: "Personalized algorithm feed", free: false, pro: true, premium: true, enterprise: true },
      { label: "Exclusive sector intelligence articles", free: false, pro: true, premium: true, enterprise: true },
      { label: "In-depth bilateral trade analysis", free: false, pro: false, premium: true, enterprise: true },
      { label: "Embargoed reports (24hr early access)", free: false, pro: false, premium: false, enterprise: true },
    ],
  },
  {
    category: "Reading Tools",
    icon: Bookmark,
    features: [
      { label: "Bookmarks & reading list", free: false, pro: "Up to 50", premium: "Unlimited", enterprise: "Unlimited" },
      { label: "Full article archive search", free: false, pro: true, premium: true, enterprise: true },
      { label: "Download PDF reports & briefings", free: false, pro: false, premium: false, enterprise: true },
    ],
  },
  {
    category: "AI & Intelligence",
    icon: Brain,
    features: [
      { label: '"Ask IGE" AI trade Q&A', free: false, pro: false, premium: "20/month", enterprise: "Unlimited" },
      { label: "CEPA duty calculator", free: false, pro: true, premium: true, enterprise: true },
      { label: "Custom AI alert rules", free: false, pro: false, premium: false, enterprise: true },
    ],
  },
  {
    category: "Alerts & Notifications",
    icon: Bell,
    features: [
      { label: "Weekly email digest", free: false, pro: true, premium: true, enterprise: true },
      { label: "Real-time sector push alerts", free: false, pro: false, premium: true, enterprise: true },
      { label: "Policy & tariff change monitoring", free: false, pro: false, premium: true, enterprise: true },
    ],
  },
  {
    category: "SME Expert Access",
    icon: Users,
    features: [
      { label: "Browse SME expert profiles", free: false, pro: true, premium: true, enterprise: true },
      { label: "Send consulting inquiries to SMEs", free: false, pro: false, premium: true, enterprise: true },
      { label: "Book paid 1:1 sessions with SMEs", free: false, pro: false, premium: false, enterprise: true },
    ],
  },
  {
    category: "Community",
    icon: MessageSquare,
    features: [
      { label: "Community access (read-only)", free: true, pro: true, premium: true, enterprise: true },
      { label: "Full Q&A participation & debate", free: false, pro: false, premium: true, enterprise: true },
      { label: "Private Pro Plus rooms", free: false, pro: false, premium: false, enterprise: true },
    ],
  },
  {
    category: "Profile & Visibility",
    icon: Globe,
    features: [
      { label: "Custom photo upload", free: false, pro: false, premium: true, enterprise: true },
      { label: "Profile visible to platform members", free: false, pro: false, premium: true, enterprise: true },
      { label: "Banner image upload", free: false, pro: false, premium: false, enterprise: true },
      { label: "Public profile (SEO indexed by Google)", free: false, pro: false, premium: false, enterprise: true },
    ],
  },
];

export default function ReaderPlansPage() {
  const { user, updateOnboarding } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string } | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);

  if (!user) return null;
  const currentPlan = user.readerPlan || "free";

  const plans = [
    {
      id: "free",
      name: "FREE READER",
      tagline: "General readers & students",
      price: "₹0",
      annualPrice: "₹0",
      period: "forever",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
      accentColor: "text-gray-500",
      checkColor: "text-gray-400",
      headline: "Read the news",
      highlights: [
        "Public trade news & headlines",
        "Follow up to 5 sectors",
        "Community read-only access",
        "Basic news feed",
      ],
      badge: null,
    },
    {
      id: "pro",
      name: "PRO READER",
      tagline: "Trade professionals & analysts",
      price: "₹299",
      annualPrice: "₹2,990",
      annualSaving: "Save ₹598",
      period: "month",
      color: "border-blue-500/30 dark:border-blue-400/20 bg-white dark:bg-[#122238]",
      accentColor: "text-blue-600 dark:text-blue-400",
      checkColor: "text-blue-500",
      headline: "Personalised intelligence",
      highlights: [
        "Personalized algorithm feed",
        "Bookmarks & reading list (50 articles)",
        "Exclusive sector intelligence articles",
        "Weekly email digest",
        "Browse SME expert profiles",
        "CEPA duty calculator",
        "Full article archive search",
      ],
      badge: null,
    },
    {
      id: "premium",
      name: "PREMIUM READER",
      tagline: "Decision-makers & sourcing leads",
      price: "₹499",
      annualPrice: "₹4,990",
      annualSaving: "Save ₹998",
      period: "month",
      color: "border-[#1D1D46] dark:border-[#F0652E] bg-[#f4f7fb]/40 dark:bg-[#172c47] relative overflow-hidden shadow-xl",
      accentColor: "text-[#F0652E]",
      checkColor: "text-emerald-500",
      headline: "Decision-maker tools",
      highlights: [
        "Everything in Pro",
        '"Ask IGE" AI trade Q&A (20/month)',
        "Real-time sector push alerts",
        "Send consulting inquiries to SMEs",
        "Full community Q&A participation",
        "Custom photo upload",
        "Platform-visible profile",
        "Policy & tariff change monitoring",
      ],
      badge: "MOST POPULAR",
    },
    {
      id: "enterprise",
      name: "PRO PLUS READER",
      tagline: "Enterprise teams & power users",
      price: "₹999",
      annualPrice: "₹9,990",
      annualSaving: "Save ₹1,998",
      period: "month",
      color: "border-purple-500/30 bg-white dark:bg-[#122238] relative overflow-hidden",
      accentColor: "text-purple-600 dark:text-purple-400",
      checkColor: "text-purple-500",
      headline: "Full intelligence platform",
      highlights: [
        "Everything in Premium",
        "Unlimited AI trade Q&A",
        "Embargoed reports (24hr early access)",
        "Book paid 1:1 sessions with SMEs",
        "Downloadable PDF reports",
        "Custom alert rules",
        "Public SEO-indexed profile",
        "Banner image upload",
        "Private Pro Plus community rooms",
      ],
      badge: null,
    },
  ];

  const getDisplayPrice = (plan: typeof plans[0]) => {
    if (plan.id === "free") return { price: "₹0", sub: "forever" };
    if (billingCycle === "annual") return { price: plan.annualPrice, sub: `per year · ${plan.annualSaving}` };
    return { price: plan.price, sub: `per ${plan.period}` };
  };

  const handleOpenCheckout = (planId: string, name: string, priceStr: string) => {
    setSelectedPlan({ id: planId, name, price: priceStr });
    setCheckoutOpen(true);
  };

  const handlePaymentSuccess = async (updatedFields: any) => {
    await updateOnboarding(updatedFields);
  };

  const renderFeatureValue = (val: boolean | string) => {
    if (val === true) return <Check className="w-4 h-4 text-emerald-500 mx-auto" />;
    if (val === false) return <X className="w-3.5 h-3.5 text-gray-300 dark:text-white/20 mx-auto" />;
    return <span className="text-[10px] font-bold text-[#F0652E]">{val}</span>;
  };

  const TIER_COLS = ["free", "pro", "premium", "enterprise"] as const;

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-7xl mx-auto pb-24">

      {/* ── Page Header ── */}
      <div className="text-center mb-10">
        <span className="text-xs font-black tracking-widest text-[#F0652E] uppercase bg-[#F0652E]/10 px-3 py-1.5 rounded-full inline-block mb-4">
          Reader Intelligence Engine
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D46] dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
          Reader Upgrade Plans
        </h1>
        <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">
          Each tier unlocks genuinely different capabilities — from personalized feeds and AI trade Q&A to real-time alerts and direct SME expert access.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 inline-flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${billingCycle === "monthly" ? "bg-white dark:bg-[#1D1D46] text-[#1D1D46] dark:text-white shadow-sm" : "text-gray-500"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${billingCycle === "annual" ? "bg-white dark:bg-[#1D1D46] text-[#1D1D46] dark:text-white shadow-sm" : "text-gray-500"}`}
          >
            Annual
            <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">2 MONTHS FREE</span>
          </button>
        </div>
      </div>

      {/* ── Plan Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 items-stretch">
        {plans.map((plan) => {
          const isActive = currentPlan === plan.id;
          const { price, sub } = getDisplayPrice(plan);
          return (
            <div key={plan.id} className={`rounded-[32px] border-2 p-6 md:p-7 flex flex-col transition-all duration-300 hover:shadow-xl ${plan.color}`}>
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-[#F0652E] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}

              <div className="mb-5 relative z-10">
                <span className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">{plan.tagline}</span>
                <h3 className="text-base font-bold text-[#1D1D46] dark:text-white">{plan.name}</h3>
                <p className={`text-xs font-bold mt-1 ${plan.accentColor}`}>{plan.headline}</p>
                <div className="mt-4 flex items-baseline gap-0.5">
                  <span className={`text-3xl font-black ${plan.accentColor}`}>{price}</span>
                  {plan.id !== "free" && <span className="text-xs text-gray-400 ml-1">/{billingCycle === "annual" ? "year" : "month"}</span>}
                </div>
                {plan.id !== "free" && billingCycle === "annual" && plan.annualSaving && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    {plan.annualSaving}
                  </span>
                )}
                {plan.id === "free" && <span className="text-[11px] text-gray-400 mt-0.5 block">Forever free</span>}
              </div>

              <div className="h-px bg-gray-100 dark:bg-white/10 w-full mb-5" />

              <div className="flex-1 mb-6 space-y-2.5 relative z-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">What you unlock:</p>
                {plan.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.checkColor}`} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                {isActive ? (
                  <div className="w-full py-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-center font-bold text-sm rounded-2xl">
                    ✓ Your Current Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenCheckout(plan.id, plan.name, plan.id === "free" ? "Free" : billingCycle === "annual" ? `${plan.annualPrice}/year` : `${plan.price}/month`)}
                    className={`w-full py-3.5 text-center font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 ${
                      plan.id === "enterprise" ? "bg-gradient-to-r from-purple-700 to-violet-600 hover:opacity-90 text-white shadow-lg"
                      : plan.badge ? "bg-[#1D1D46] hover:bg-[#F0652E] text-white shadow-lg"
                      : plan.id === "pro" ? "bg-[#1E3A5F] hover:bg-[#162d4a] text-white"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1D1D46] dark:text-white"
                    }`}
                  >
                    {plan.id === "free" ? "Switch to Free" : "Upgrade Plan"}
                    {plan.id !== "free" && <ArrowRight className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Full Feature Comparison Matrix (collapsible) ── */}
      <div className="mb-12">
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-white dark:bg-[#122238] border border-gray-100 dark:border-white/5 rounded-2xl text-xs font-bold text-gray-500 hover:text-[#1D1D46] dark:hover:text-white transition-all shadow-sm"
        >
          <Zap className="w-4 h-4 text-[#F0652E]" />
          {showMatrix ? "Hide" : "Show"} Full Feature Comparison
          <span className={`transition-transform ${showMatrix ? "rotate-180" : ""}`}>▼</span>
        </button>

        {showMatrix && (
          <div className="mt-4 bg-white dark:bg-[#122238] rounded-[24px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
            {/* Sticky header row */}
            <div className="grid grid-cols-5 border-b border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 sticky top-0">
              <div className="p-4 col-span-1" />
              {["Free", "Pro", "Premium", "Pro Plus"].map((h, i) => (
                <div key={i} className={`p-4 text-center text-[10px] font-black uppercase tracking-widest ${i === 2 ? "text-[#F0652E]" : "text-gray-500"}`}>
                  {h}
                </div>
              ))}
            </div>

            {FEATURE_MATRIX.map((section) => (
              <div key={section.category}>
                <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-white/3 border-y border-gray-50 dark:border-white/5 flex items-center gap-2">
                  <section.icon className="w-3.5 h-3.5 text-[#F0652E]" />
                  <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{section.category}</span>
                </div>
                {section.features.map((feat, fi) => (
                  <div key={fi} className="grid grid-cols-5 border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/3 transition-colors">
                    <div className="p-3 pl-5 text-xs text-gray-600 dark:text-gray-300 col-span-1 flex items-center">{feat.label}</div>
                    {TIER_COLS.map((tier) => (
                      <div key={tier} className={`p-3 text-center flex items-center justify-center ${tier === "premium" ? "bg-[#F0652E]/3 dark:bg-[#F0652E]/5" : ""}`}>
                        {renderFeatureValue(feat[tier])}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── All Paid Plans Include ── */}
      <div className="bg-white dark:bg-[#122238] rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-white/5 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#F0652E]" />
          <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white">All Paid Plans Include</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Personalized Algorithm Feed", desc: "Your feed is ranked by AI based on your followed sectors, industries, and reading history." },
            { title: "Full Article Archive", desc: "Search and read every article ever published on IGE News — no paywalls on past content." },
            { title: "Taxonomy Intelligence", desc: "Content is tagged to bilateral trade sectors, CEPA treaties, and industry verticals for precision reading." },
            { title: "CEPA Duty Calculator", desc: "Calculate real import duty savings across active CEPA agreements instantly." },
            { title: "SME Expert Directory", desc: "Browse verified industry expert profiles by sector, experience, and consulting availability." },
            { title: "Priority SEO on Profile", desc: "Paid profiles rank higher in directory searches and get more Reader feed visibility." },
          ].map((b, i) => (
            <div key={i} className="flex gap-3">
              <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-1">{b.title}</h4>
                <p className="text-[11px] text-gray-500 leading-normal">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentPlan === "free" && <ReaderFreeInfo />}

      {selectedPlan && (
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          planName={selectedPlan.name}
          price={selectedPlan.price}
          category="reader"
          planId={selectedPlan.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

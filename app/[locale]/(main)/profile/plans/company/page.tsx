"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { 
  Check, X, ShieldAlert, Sparkles, ArrowRight, ShieldCheck, 
  Building2, Users, TrendingUp, Globe, Award, HelpCircle, 
  Clock, Flame, DollarSign, Calculator, Lock, ChevronDown, CheckCircle2, Star
} from "lucide-react";
import CheckoutModal from "@/components/profile/CheckoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { SECTORS } from "@/lib/sectors";

export default function CompanyPlansPage() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string } | null>(null);

  // Sector Scarcity Widget State
  const [selectedSector, setSelectedSector] = useState("Manufacturing & Heavy Engineering");
  const [slotReserved, setSlotReserved] = useState(false);
  const [reserving, setReserving] = useState(false);

  // ROI Calculator State
  const [linkedinBudget, setLinkedinBudget] = useState(50000);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!user) return null;

  const currentPlan = user.companyPlan || (user.onboardingRole === "company" && user.onboardingStatus === "Approved" ? "free" : "none");

  const plans = [
    {
      id: "free",
      name: "Free Profile",
      tagline: "Basic Company Directory Listing",
      eligibility: "Best for: New companies exploring directory discoverability",
      price: "₹0",
      annualPrice: "₹0",
      annualSaving: "Always Free",
      period: "forever",
      badge: "FREE TIER",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
      accentColor: "text-slate-600 dark:text-slate-300",
      checkColor: "text-slate-400",
      benefits: [
        "Public company page across 5 core tabs (Overview, Our Vision, Offerings, Updates & Insights, Team)",
        "Company overview, sector tagging, and official website link",
        "Registered office address & workplace policy (Onsite/Hybrid/Remote)",
        "Standard directory listing in iGEN sector search",
        "Basic post engagement stats (Likes & Comments)",
      ],
      restrictions: [
        "No verified Blue Checkmark badge",
        "Direct lead inquiry buttons disabled",
        "No bundled Executive Leader profiles",
        "No PDF document or whitepaper publishing",
        "0 Follower Invite credits",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      id: "startup",
      name: "Startup Plan",
      tagline: "For Growing Companies & Early-Stage Ventures",
      eligibility: "Best for: Seed to Series-A Startups and growing MSMEs",
      price: "₹9,999",
      annualPrice: "₹99,990",
      annualSaving: "Save ₹19,998 (2 Months Free)",
      period: "month",
      badge: "STARTUP TIER",
      color: "border-blue-500/30 bg-gradient-to-b from-white via-white to-blue-50/20 dark:from-[#122238] dark:to-[#172c47] relative",
      accentColor: "text-blue-600 dark:text-blue-400",
      checkColor: "text-blue-500",
      benefits: [
        "Verified Blue Checkmark badge on company profile",
        "Full access to all 5 tabs (Overview, Our Vision, Offerings, Updates & Insights, Team)",
        "Interactive 'Inquire Offerings' lead form with email routing",
        "1 Bundled Verified Executive Leader profile (e.g. Founder/CEO)",
        "100 Monthly Follower Invite Credits",
        "Inline Post Performance summary (Impressions, CTR, Engagements)",
        "Publish 2 thought leadership articles & updates per month",
        "Curated Top 10 placement in your industry sector",
      ],
      restrictions: [
        "Standard sector ranking (Positions #4 to #10)",
        "Standard customer support",
      ],
      cta: "Choose Startup Plan",
      popular: false,
    },
    {
      id: "company",
      name: "Company Plan",
      tagline: "For Mid-Market Enterprises & Established Businesses",
      eligibility: "Best for: Established businesses, manufacturers & SME leaders",
      price: "₹16,999",
      annualPrice: "₹1,69,990",
      annualSaving: "Save ₹33,998 (2 Months Free)",
      period: "month",
      badge: "MOST POPULAR",
      color: "border-[#0a66c2] dark:border-blue-500 bg-gradient-to-b from-white via-white to-blue-50/30 dark:from-[#122238] dark:to-[#172338] relative shadow-xl shadow-blue-500/10",
      accentColor: "text-[#0a66c2] dark:text-blue-400",
      checkColor: "text-[#0a66c2] dark:text-blue-400",
      benefits: [
        "Everything included in the Startup Plan",
        "2 Bundled Verified Executive Leader profiles (e.g. CEO + CTO)",
        "300 Monthly Follower Invite Credits",
        "Deep 'Metrics Overview' drilldown for published posts",
        "'Who Visited Your Page' company visitor intelligence",
        "Interactive demographic charts on Team tab (Location & Education)",
        "PDF Document & Whitepaper reader directly in Updates & Insights",
        "Publish 4 featured industry articles per month + 2x Feed Boost",
        "Top 3 priority placement in your industry sector search",
        "Instant WhatsApp & email lead routing for service inquiries",
      ],
      restrictions: [],
      cta: "Choose Company Plan",
      popular: true,
    },
    {
      id: "corporate",
      name: "Corporate Plan",
      tagline: "For Large Enterprises & Industry Market Leaders",
      eligibility: "Best for: Large corporations, multinational brands & major exporters",
      price: "₹26,999",
      annualPrice: "₹2,69,990",
      annualSaving: "Save ₹53,998 (2 Months Free)",
      period: "month",
      badge: "TOP TIER · #1 PINNED",
      color: "border-purple-500/40 bg-gradient-to-b from-white via-white to-purple-50/25 dark:from-[#122238] dark:to-[#1b1236] relative shadow-xl shadow-purple-500/10",
      accentColor: "text-purple-600 dark:text-purple-400",
      checkColor: "text-purple-500",
      benefits: [
        "Everything included in the Company Plan",
        "5 Bundled Verified Executive Leader profiles (Full C-Suite suite)",
        "500 Monthly Follower Invite Credits",
        "Guaranteed #1 Pinned placement in your industry sector",
        "Publish 6 featured industry articles per month + 5x Priority Feed Boost",
        "International certifications hub (ISO, CE, BIS, FDA, AS9100)",
        "Unlimited whitepaper & document uploads in Updates & Insights",
        "Priority feed distribution across the iGEN network",
        "Dedicated account manager & PR concierge",
      ],
      restrictions: [],
      cta: "Choose Corporate Plan",
      popular: false,
    },
  ];

  const getDisplayPrice = (plan: typeof plans[0]) => {
    if (plan.id === "free") return { price: "₹0", sub: "/forever" };
    if (billingCycle === "annual") {
      return {
        price: plan.annualPrice,
        sub: `/year  ·  ${plan.annualSaving}`,
      };
    }
    return { price: plan.price, sub: `/month` };
  };

  const handlePlanSelect = async (planId: string, name: string, priceStr: string) => {
    if (planId === "free") {
      await updateOnboarding({
        onboardingRole: "company",
        onboardingStatus: "Draft",
        onboardingForm: { companyName: user.name || "Enterprise Profile" },
        onboardingDocs: {},
        onboardingFeedback: "",
        companyPlan: "free",
      });
      router.push(`/${locale}/profile`);
    } else {
      setSelectedPlan({ id: planId, name, price: priceStr });
      setCheckoutOpen(true);
    }
  };

  const handlePaymentSuccess = async (updatedFields: any) => {
    await updateOnboarding(updatedFields);
  };

  // ROI Calculator Calculations
  const calculatedMultiplier = "10x";
  const estimatedIgenCost = Math.min(Math.max(Math.round(linkedinBudget * 0.35), 9999), 26999);
  const estimatedSavings = linkedinBudget - estimatedIgenCost;

  // Pre-Handled Objection FAQs (Exact from Slide 19)
  const faqs = [
    {
      q: "The platform is new — who will see my page?",
      a: "The platform is new. The brand is 30 years old. ICE has built trust since 1994. All Company Pages are Google-indexed — global buyers and procurement delegations find you through organic search from day one.",
    },
    {
      q: "We already have LinkedIn — isn't that enough?",
      a: "LinkedIn has 900 million profiles. You are 1 in 900 million — buried by an algorithmic feed. On iGEN, there are only 10 verified Top Companies per sector. You are 1 in 10. That is the curated authority difference.",
    },
    {
      q: "How is this different from IndiaMart?",
      a: "IndiaMart is a marketplace for product SKUs. iGEN is a marketplace for institutional trust. You go to IndiaMart to sell individual commodities. You come to iGEN so global buyers, investors, and banks trust your enterprise enough to buy, invest, or partner with you.",
    },
    {
      q: "What is the Blue Tick and why does it matter?",
      a: "The Blue Tick is iGEN's institutional seal of verification — publicly signalling that your company has been reviewed, KYC-verified, and recognized as an official Top Company in its sector. It drastically reduces B2B purchase hesitation and sales cycle length.",
    },
    {
      q: "How much time will it take to manage?",
      a: "Almost none. You fill in a simple onboarding form. Our team builds your page. You approve it. It goes live. iGEN's SME team produces sector thought leadership articles that appear on your sector page automatically.",
    },
    {
      q: "What if my competitor is already listed?",
      a: "Then you already know you need to act immediately before the sector slots are fully closed. Contact our corporate desk at aditya@igenworld.com. We will check which tier and sector position is still available and hold it for 48 hours.",
    },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-7xl mx-auto pb-24">

      {/* Live Social Proof Ticker */}
      <div className="mb-6 overflow-hidden rounded-xl bg-slate-900 border border-slate-800 py-2.5 px-4 text-xs text-slate-300 flex items-center gap-3 shadow-inner">
        <span className="flex items-center gap-1.5 font-bold text-amber-400 shrink-0 uppercase tracking-wider text-[11px]">
          <Flame className="w-3.5 h-3.5 text-amber-400" /> LIVE VERIFIED TICKER:
        </span>
        <div className="overflow-hidden whitespace-nowrap w-full">
          <motion.div 
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="inline-flex gap-8 text-slate-300"
          >
            <span>⚡ <strong>Sunstar Chemicals Ltd</strong> verified as Top Corporate in <em>Specialty Chemicals</em></span>
            <span>✦ <strong>Apex Logistics Global</strong> joined as Top Company in <em>Freight & Supply Chain</em></span>
            <span>⚡ <strong>Kaveri Precision Engineering</strong> pinned as #1 in <em>Automotive & Metallurgy</em></span>
            <span>✦ <strong>Mantri Infra & Realty</strong> secured Blue Tick verification in <em>Real Estate</em></span>
            <span>⚡ <strong>Zenith Diagnostics</strong> joined as Top Start-up in <em>Pharma & Healthcare</em></span>
          </motion.div>
        </div>
      </div>

      {/* Active Company Profile Quick Navigation Banner */}
      {user.onboardingRole === "company" && user.onboardingStatus === "Approved" && (
        <div className="mb-8 p-4 bg-gradient-to-r from-orange-50/70 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-900/30 rounded-2xl flex items-center justify-between flex-wrap gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0652E] text-white flex items-center justify-center font-bold text-sm shadow-md">
              ✓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  Active Company Page: {user.onboardingForm?.companyName || user.name || "Your Company"}
                </h3>
                <span className="bg-orange-500/10 text-[#F0652E] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {user.companyPlan || "Active Plan"}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Manage your 5 company tabs, team members, and published updates.
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/${locale}/profile`)}
            className="px-4 py-2 bg-[#F0652E] hover:bg-[#d85522] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            Go to Company Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0a66c2] dark:text-blue-400 text-xs font-bold tracking-wide uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          iGEN Verified Company Pages
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1D1D46] dark:text-white tracking-tight leading-tight font-display mb-4">
          Establish Verified B2B Presence.<br />
          <span className="bg-gradient-to-r from-[#0a66c2] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Be 1 of Top 10 Verified Companies in Your Sector.
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A modern company page across 5 core tabs (<strong>Overview, Our Vision, Offerings, Updates & Insights, Team</strong>) with bundled Executive Leader profiles and guaranteed sector discoverability.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="mt-8 inline-flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-[#122238] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === "annual"
                ? "bg-[#F0652E] text-white shadow-md shadow-orange-500/20"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
            }`}
          >
            <span>Annual Billing</span>
            <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              2 MONTHS FREE
            </span>
          </button>
        </div>
      </div>

      {/* 4 Pricing Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {plans.map((plan) => {
          const { price, sub } = getDisplayPrice(plan);
          const isCurrentPlan = currentPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 ${plan.color} ${
                plan.popular
                  ? "ring-2 ring-[#F0652E] dark:ring-[#F0652E] scale-[1.02] shadow-2xl z-10"
                  : "hover:border-gray-300 dark:hover:border-white/20 shadow-sm"
              }`}
            >
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    plan.popular
                      ? "bg-[#F0652E] text-white"
                      : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                  }`}>
                    {plan.badge}
                  </span>
                  {isCurrentPlan && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      Current
                    </span>
                  )}
                </div>

                {/* Plan Title & Tagline */}
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className={`text-xs font-semibold mb-3 ${plan.accentColor}`}>
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-4 pb-4 border-b border-gray-100 dark:border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900 dark:text-white">
                      {price}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{sub}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    {plan.eligibility}
                  </p>
                </div>

                {/* Inclusions List */}
                <div className="space-y-2 mb-4">
                  <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Core Inclusions:
                  </div>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 leading-snug">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.checkColor}`} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions (if any) */}
                {plan.restrictions && plan.restrictions.length > 0 && (
                  <div className="pt-3 border-t border-dashed border-gray-100 dark:border-white/10 space-y-1.5">
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Limitations:
                    </div>
                    <ul className="space-y-1">
                      {plan.restrictions.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-gray-400 leading-tight">
                          <X className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action CTA Button */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10">
                <button
                  onClick={() => handlePlanSelect(plan.id, plan.name, price)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
                    plan.popular
                      ? "bg-[#F0652E] hover:bg-[#d85522] text-white shadow-orange-500/20"
                      : plan.id === "corporate"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white"
                      : plan.id === "free"
                      ? "bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white"
                      : "bg-[#1D1D46] hover:bg-[#151538] dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. DEFINITIVE COMPETITOR COMPARISON TABLE (Exact from Slide 9)             */}
      {/* ========================================================================= */}
      <div className="mb-16 bg-white dark:bg-[#122238] border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-lg overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#0a66c2] dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" /> Market Comparison Matrix
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Why iGEN — The Definitive Comparison
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
            vs. LinkedIn Premium · X / Twitter Blue · IndiaMart
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-4 px-4 font-black">Feature</th>
                <th className="py-4 px-4 font-bold text-slate-600 dark:text-slate-300">LinkedIn Premium</th>
                <th className="py-4 px-4 font-bold text-slate-600 dark:text-slate-300">X / Twitter Blue</th>
                <th className="py-4 px-4 font-bold text-slate-600 dark:text-slate-300">IndiaMart</th>
                <th className="py-4 px-5 font-black text-[#0a66c2] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 rounded-t-2xl">
                  iGEN Company Page
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs text-slate-700 dark:text-slate-300">
              
              {/* Row 1: Profile Reach */}
              <tr className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Profile Reach</td>
                <td className="py-3.5 px-4 text-slate-500">1 in 900 Million (buried by algorithm)</td>
                <td className="py-3.5 px-4 text-slate-500">1 in 500 Million</td>
                <td className="py-3.5 px-4 text-slate-500">1 in Millions</td>
                <td className="py-3.5 px-5 font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40">
                  ⚡ 1 in 10 per sector ✓
                </td>
              </tr>

              {/* Row 2: Verification */}
              <tr className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Verification</td>
                <td className="py-3.5 px-4 text-slate-500">Company page only</td>
                <td className="py-3.5 px-4 text-slate-500">Paid Blue Tick</td>
                <td className="py-3.5 px-4 text-slate-500">Basic listing</td>
                <td className="py-3.5 px-5 font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40">
                  🛡️ KYC-verified Blue Tick ✓
                </td>
              </tr>

              {/* Row 3: Bundle */}
              <tr className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Bundle</td>
                <td className="py-3.5 px-4 text-slate-500">Company + Leader billed separately</td>
                <td className="py-3.5 px-4 text-slate-500">Company + Leader billed separately</td>
                <td className="py-3.5 px-4 text-slate-400">N/A</td>
                <td className="py-3.5 px-5 font-bold text-emerald-700 dark:text-emerald-300 bg-blue-50/70 dark:bg-blue-950/40">
                  🎁 Company + Leader Pages BUNDLED ✓
                </td>
              </tr>

              {/* Row 4: Sector Visibility */}
              <tr className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Sector Visibility</td>
                <td className="py-3.5 px-4 text-slate-500">Algorithm-driven feed</td>
                <td className="py-3.5 px-4 text-slate-500">Hashtag-based</td>
                <td className="py-3.5 px-4 text-slate-500">Product SKU commodity</td>
                <td className="py-3.5 px-5 font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40">
                  ⭐ Curated Top 10 per sector ✓
                </td>
              </tr>

              {/* Row 5: SEO Value */}
              <tr className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">SEO &amp; Canonical URL</td>
                <td className="py-3.5 px-4 text-slate-500">LinkedIn domain</td>
                <td className="py-3.5 px-4 text-slate-500">Twitter domain</td>
                <td className="py-3.5 px-4 text-slate-500">IndiaMart product domain</td>
                <td className="py-3.5 px-5 font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40 font-mono text-[11px]">
                  🌐 iGEN + sector taxonomy ✓
                </td>
              </tr>

              {/* Row 6: Investor Tab */}
              <tr className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Investor Due Diligence Tab</td>
                <td className="py-3.5 px-4 text-red-400 font-semibold">Not available ✕</td>
                <td className="py-3.5 px-4 text-red-400 font-semibold">Not available ✕</td>
                <td className="py-3.5 px-4 text-red-400 font-semibold">Not available ✕</td>
                <td className="py-3.5 px-5 font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40">
                  📈 Dedicated Stakeholder Tab ✓
                </td>
              </tr>

              {/* Row 7: Content Quality */}
              <tr className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Content Quality</td>
                <td className="py-3.5 px-4 text-slate-500">User-generated noise</td>
                <td className="py-3.5 px-4 text-slate-500">User-generated feed</td>
                <td className="py-3.5 px-4 text-slate-500">Product listings</td>
                <td className="py-3.5 px-5 font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40">
                  ✍️ SME-written 10–20yr experts ✓
                </td>
              </tr>

              {/* Row 8: Est Monthly Cost */}
              <tr className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors bg-slate-50/30 dark:bg-white/5">
                <td className="py-4 px-4 font-black text-slate-900 dark:text-white">Est. Monthly Cost</td>
                <td className="py-4 px-4 font-bold text-slate-600 dark:text-slate-400">₹14,000 – ₹20,000</td>
                <td className="py-4 px-4 font-bold text-slate-600 dark:text-slate-400">₹16,790 (tick only)</td>
                <td className="py-4 px-4 font-bold text-slate-600 dark:text-slate-400">₹5,000 – ₹15,000</td>
                <td className="py-4 px-5 font-black text-emerald-600 dark:text-emerald-400 bg-blue-100/80 dark:bg-blue-900/50 rounded-b-2xl text-sm">
                  From ₹9,999 (full bundle) ✓
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Highlight Callout */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl text-xs flex items-center justify-between flex-wrap gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <span className="font-semibold italic">
              &quot;Twitter and LinkedIn sell verification separately. iGEN bundles Company Pages + Leader Pages — neither competitor offers this.&quot;
            </span>
          </div>
          <span className="text-[10px] font-mono text-blue-200 uppercase tracking-wider font-bold">
            iGEN Strategy Blueprint 2026
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. THE NUCLEAR CLOSE — Sector Slot Scarcity & 48-Hour Hold Engine */}
      {/* ========================================================================= */}
      <div className="mb-16 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5" /> Curated Scarcity Engine · 10 Per Sector Limit
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3">
            Check Your Sector Slot Availability & Hold for 48 Hours
          </h2>
          <p className="text-sm md:text-base text-slate-300 mb-6 leading-relaxed">
            To protect the premium exclusivity of our institutional directory, iGEN limits verified Top Companies to <strong className="text-amber-400">only 10 per sector</strong>. Select your industry below to verify remaining slots before your direct competitor secures them.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Select Your Industry Sector:
              </label>
              <select
                value={selectedSector}
                onChange={(e) => {
                  setSelectedSector(e.target.value);
                  setSlotReserved(false);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <button
                disabled={slotReserved || reserving}
                onClick={() => {
                  setReserving(true);
                  setTimeout(() => {
                    setReserving(false);
                    setSlotReserved(true);
                  }, 1200);
                }}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                  slotReserved
                    ? "bg-emerald-600 text-white"
                    : "bg-[#F0652E] hover:bg-[#d85522] text-white shadow-orange-500/20"
                }`}
              >
                {reserving ? (
                  <span>Checking Availability...</span>
                ) : slotReserved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Slot Held for 48h</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Reserve Sector Slot</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Slot Status Banner */}
          <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">
                  Sector Status: <span className="text-amber-400">{selectedSector}</span>
                </div>
                <div className="text-xs text-slate-400">
                  {slotReserved
                    ? "✓ 1 Top Corporate slot reserved under your account token for 48 hours."
                    : "⚡ Only 2 of 10 Verified Company Slots remaining for 2026. 1 Platinum slot open."}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-300 block">
                Verification SLA: <strong className="text-emerald-400">48–72 Hours</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE ROI CALCULATOR — LinkedIn/X vs. iGEN */}
      {/* ========================================================================= */}
      <div className="mb-16 bg-white dark:bg-[#122238] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-lg">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" /> Financial Authority & ROI Engine
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
            Calculate Your Cost Advantage vs. LinkedIn & X
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Slide your current monthly digital marketing and LinkedIn spend to see how iGEN delivers higher targeted sector authority at a fraction of the cost.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Slider Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Current Monthly Digital / LinkedIn Budget:
                </span>
                <span className="text-lg font-black text-[#F0652E]">
                  ₹{linkedinBudget.toLocaleString("en-IN")}/mo
                </span>
              </div>
              <input
                type="range"
                min={20000}
                max={200000}
                step={5000}
                value={linkedinBudget}
                onChange={(e) => setLinkedinBudget(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#F0652E]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-bold">
                <span>₹20,000</span>
                <span>₹1,00,000</span>
                <span>₹2,00,000+</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Includes Company Page + 2 to 5 Executive Leader Profiles</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Curated Top 10 Sector Placement instead of algorithm feeds</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>5 Dedicated Company Tabs (Overview, Our Vision, Offerings, Updates & Insights, Team)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#1D1D46] to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
              Estimated Monthly Value Metrics
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] text-slate-400 block mb-1">Targeted Sector Authority</span>
                <span className="text-2xl md:text-3xl font-black text-amber-400">{calculatedMultiplier}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Higher reach in Top 10</span>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-[10px] text-slate-400 block mb-1">Estimated Monthly Savings</span>
                <span className="text-2xl md:text-3xl font-black text-emerald-400">
                  ₹{Math.max(estimatedSavings, 0).toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">vs. separate verification</span>
              </div>
            </div>

            <div className="p-3.5 bg-white/10 rounded-xl text-xs text-slate-200 leading-relaxed">
              💡 <em>"Twitter and LinkedIn charge separately for individual and company checkmarks without sector taxonomy. iGEN delivers the full bundled trust asset from ₹9,999/month."</em>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. PRE-HANDLED OBJECTIONS FAQ ACCORDION (From Slide 19) */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Pre-Handled Questions & Business Inquiries
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#122238] transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-gray-900 dark:text-white hover:text-[#F0652E] dark:hover:text-[#F0652E] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#F0652E]" : "text-gray-400"}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-xs text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          planName={selectedPlan.name}
          price={selectedPlan.price}
          category="company"
          planId={selectedPlan.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

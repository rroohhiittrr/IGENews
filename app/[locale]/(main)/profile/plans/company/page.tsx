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
      name: "FREE COMPANY PROFILE",
      tagline: "Basic Unverified Listing",
      eligibility: "Best for: Early exploratory presence",
      price: "₹0",
      annualPrice: "₹0",
      annualSaving: "Always Free",
      period: "forever",
      badge: "EXPLORATORY",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
      accentColor: "text-slate-600 dark:text-slate-300",
      checkColor: "text-slate-400",
      benefits: [
        "Basic company profile page",
        "Company name & primary sector tagging",
        "Basic summary & corporate overview",
        "Website URL & public social links",
        "Public directory listing",
      ],
      restrictions: [
        "No Blue Tick KYC verification",
        "Stakeholder tabs locked (Investors, Employees, Brand)",
        "No bundled Executive Leader Profiles",
        "No article or trade intelligence publishing",
        "Unlisted in curated Top 10 Sector Directory",
      ],
      cta: "Create Free Profile",
      popular: false,
    },
    {
      id: "startup",
      name: "TOP START-UP",
      tagline: "Emerging Trust & Authority",
      eligibility: "Best for: Growing MSMEs & High-Growth Startups",
      price: "₹9,999",
      annualPrice: "₹99,990",
      annualSaving: "Save ₹19,998 (2 Mos Free)",
      period: "month",
      badge: "EMERGING TRUST",
      color: "border-blue-500/30 bg-gradient-to-b from-white via-white to-blue-50/20 dark:from-[#122238] dark:to-[#172c47] relative",
      accentColor: "text-blue-600 dark:text-blue-400",
      checkColor: "text-blue-500",
      benefits: [
        "Institutional Blue Tick Verification (KYC-backed)",
        "Full Company Page — All 4 Core Stakeholder Tabs",
        "📈 Investors Tab (Financials, capex roadmap & pitch deck)",
        "👥 Employees Tab (Culture, EVP & employer branding)",
        "🤝 Stakeholders Tab (Banking partners, governance & vendors)",
        "📢 Brand Tab (Macro capability domains & awards)",
        "1 Bundled Executive Leader Profile (Founder/MD)",
        "Publish 2 trade articles/month (15-day pacing gap)",
        "Curated Top 10 Sector Listing placement",
        "High-authority Google indexing (topcompany/[name])",
      ],
      restrictions: [
        "Standard sector positioning (Slots #4 - #10)",
        "No dedicated account manager",
      ],
      cta: "Upgrade to Top Start-up",
      popular: false,
    },
    {
      id: "company",
      name: "TOP COMPANY",
      tagline: "Business Authority & Discovery",
      eligibility: "Best for: Mid-Tier Enterprises & Proven Manufacturers",
      price: "₹16,999",
      annualPrice: "₹1,69,990",
      annualSaving: "Save ₹33,998 (2 Mos Free)",
      period: "month",
      badge: "MOST POPULAR · 90X REACH",
      color: "border-[#F0652E] dark:border-[#F0652E] bg-gradient-to-b from-white via-white to-orange-50/30 dark:from-[#122238] dark:to-[#221c17] relative shadow-xl shadow-orange-500/10",
      accentColor: "text-[#F0652E]",
      checkColor: "text-[#F0652E]",
      benefits: [
        "Everything in Top Start-up",
        "2 Bundled Executive Leader Profiles (e.g. CEO + CTO)",
        "Publish 4 articles/month (1 article weekly)",
        "Priority Sector Positioning (Top 3–5 search placement)",
        "Interactive Production Gallery & Corporate Media Showcase",
        "Direct Inbound Buyer RFQ & Lead Inquiry Form",
        "AI Contextual Recommendations in reader feeds",
        "Company comparison tool eligibility for global buyers",
        "Full Traffic & Profile Views Analytics Dashboard",
      ],
      restrictions: [],
      cta: "Upgrade to Top Company",
      popular: true,
    },
    {
      id: "corporate",
      name: "TOP CORPORATE",
      tagline: "Sector Leadership & Export Dominance",
      eligibility: "Best for: Large Corporates, Industry Titans & Exporters",
      price: "₹26,999",
      annualPrice: "₹2,69,990",
      annualSaving: "Save ₹53,998 (2 Mos Free)",
      period: "month",
      badge: "SECTOR LEADERSHIP · #1 PINNED",
      color: "border-purple-500/40 bg-gradient-to-b from-white via-white to-purple-50/25 dark:from-[#122238] dark:to-[#1b1236] relative shadow-xl shadow-purple-500/10",
      accentColor: "text-purple-600 dark:text-purple-400",
      checkColor: "text-purple-500",
      benefits: [
        "Everything in Top Company",
        "5 Bundled Executive Leader Profiles (Full C-Suite Suite)",
        "TOP COMPANY — Guaranteed Sector #1 Pinned Placement",
        "Publish 6 articles/month (1/week + 2 add-on top-ups)",
        "🌍 Global Corridors Tab (Interactive export map & country flows)",
        "International Certifications Hub (BIS, CE, FDA, AS9100, ISO)",
        "Dedicated IGE Account Manager & PR Concierge",
        "Co-bylined press releases with IGE editorial team",
        "Speaking & keynote placement eligibility at IGE global expos",
        "Institutional Investor Due Diligence & ROI tracking suite",
      ],
      restrictions: [],
      cta: "Upgrade to Top Corporate",
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
  const calculatedMultiplier = "90x";
  const estimatedIgenCost = Math.min(Math.max(Math.round(linkedinBudget * 0.35), 9999), 26999);
  const estimatedSavings = linkedinBudget - estimatedIgenCost;

  // Pre-handled Objections FAQs
  const faqs = [
    {
      q: "The platform is new — who will see my company page?",
      a: "The digital platform is new, but the India Global Expo brand is 30+ years old with trust built across thousands of industry leaders since 1994. All Company Pages are Google-indexed and sector-tagged, ensuring international procurement teams and investors discover you organically from day one.",
    },
    {
      q: "We already have LinkedIn Premium — isn't that enough?",
      a: "LinkedIn has 900+ million profiles where your company is buried by an algorithm. On iGEN, there are only 10 verified Top Companies per sector. You are 1 in 10, not 1 in 900 million. Furthermore, LinkedIn charges separately for employee verification, while iGEN bundles Company + Leader Pages.",
    },
    {
      q: "How is this different from IndiaMart or TradeIndia?",
      a: "IndiaMart is a marketplace for individual product SKUs where suppliers compete on price. iGEN is an institutional trust asset. You go to IndiaMart to sell a commodity; you come to iGEN so global buyers, banks, and institutional investors trust your company enough to award high-value contracts and credit lines.",
    },
    {
      q: "What is the Blue Tick and why does it matter?",
      a: "The Blue Tick is iGEN's KYC-verified institutional seal, publicly confirming that your company has undergone corporate verification and is recognized as a Top Company in its sector. It drastically shortens sales cycles and removes buyer hesitation during overseas due diligence.",
    },
    {
      q: "How much time will it take for our team to manage?",
      a: "Almost none. You fill in a structured onboarding form, and our editorial concierge team builds and structures all 4 stakeholder tabs for you. You approve it, and it goes live. Your page works for you 365 days a year.",
    },
    {
      q: "What if my direct competitor is already listed?",
      a: "Because we enforce a strict limit of 10 verified companies per sector (and only 1 #1 slot), available sector slots fill up fast. If your competitor is already listed, you can use our 48-hour sector slot reservation to lock in your position before the category is capped.",
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
                Manage your 4 stakeholder tabs, bundled leader profiles, and buyer inquiries.
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F0652E] text-xs font-bold tracking-wide uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          iGEN Institutional Trust Asset · Mission 2047
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1D1D46] dark:text-white tracking-tight leading-tight font-display mb-4">
          Stop Being 1 in 900 Million.<br />
          <span className="bg-gradient-to-r from-[#F0652E] via-amber-500 to-indigo-600 bg-clip-text text-transparent">
            Be 1 in 10 Verified Companies in Your Sector.
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          The verified 4-stakeholder digital trust asset that bundles your <strong>Company Page + Executive Leader Profiles</strong> with guaranteed Top 10 sector discoverability.
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
      {/* 2. THE NUCLEAR CLOSE — Sector Slot Scarcity & 48-Hour Hold Engine */}
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
                <span>4 Dedicated Stakeholder Tabs (Investors, Talent, Ops, Brand)</span>
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

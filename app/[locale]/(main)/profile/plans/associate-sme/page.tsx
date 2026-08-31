"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { Check, X, ShieldAlert, Sparkles, Star, ArrowRight, Mail } from "lucide-react";
import CheckoutModal from "@/components/profile/CheckoutModal";

export default function AssociateSmePlansPage() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string } | null>(null);

  if (!user) return null;

  const currentPlan = user.associateSmePlan || (user.onboardingRole === "associate-sme" && user.onboardingStatus === "Approved" ? "free" : "none");

  const plans = [
    {
      id: "free",
      name: "FREE ASME",
      tagline: "Eligibility: < 10 Years Experience",
      price: "₹0",
      annualPrice: "₹0",
      annualSaving: null,
      period: "forever",
      badge: null,
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
      accentColor: "text-gray-500",
      checkColor: "text-gray-400",
      benefits: [
        "ASME profile page (Google-indexed)",
        "Basic 'ASME' verification badge",
        "0 articles/month (Write access locked)",
        "Up to 2 sector expertise tags",
        "Follow up to 10 Reader connections",
        "Basic public profile URL",
        "Community access (read-only)",
      ],
      restrictions: [
        "No article publishing allowed",
        "No consulting revenue activation",
        "No premium badge or priority ranking",
        "No custom banner or profile styling",
      ],
      cta: "Activate Free Plan",
      isSovereign: false,
    },
    {
      id: "pro",
      name: "ASME PRO",
      tagline: "Core Value: Build Authority + Visibility",
      price: "₹2,499",
      annualPrice: "₹24,990",
      annualSaving: "Save ₹4,998",
      period: "month",
      badge: null,
      color: "border-blue-500/30 dark:border-blue-400/20 bg-white dark:bg-[#122238]",
      accentColor: "text-blue-600 dark:text-blue-400",
      checkColor: "text-blue-500",
      benefits: [
        "Everything in Free ASME",
        "Verified blue 'ASME Pro' badge",
        "Publish up to 4 articles/month (Max 1/week)",
        "Up to 10 sector expertise tags",
        "Profile listed in Expert Directory",
        "Consulting inquiry form on your profile",
        "Platform-Only public visibility toggle",
        "Article view & engagement insights",
        "Priority placement over Free members",
        "AI discovery recommendations",
        "Podcast & interview opportunities",
      ],
      restrictions: [
        "No full consulting booking system",
        "No article revenue share",
        "No custom banner or premium styling",
      ],
      cta: "Upgrade to ASME Pro",
      isSovereign: false,
    },
    {
      id: "elite",
      name: "ASME ELITE",
      tagline: "Core Value: Revenue + Authority Amplification",
      price: "₹4,999",
      annualPrice: "₹49,990",
      annualSaving: "Save ₹9,998",
      period: "month",
      badge: "RECOMMENDED",
      color: "border-emerald-500/40 bg-gradient-to-b from-white to-emerald-50/30 dark:from-[#122238] dark:to-[#0c3125]/20 relative overflow-hidden shadow-2xl",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      checkColor: "text-emerald-500",
      benefits: [
        "Everything in ASME Pro",
        "Gold 'ASME Elite' verification badge",
        "Publish up to 6 articles/month",
        "Priority #1 ranking in sector searches",
        "Full consulting booking system (1:1 sessions)",
        "Revenue share on article reads (70/30 split)",
        "Downloadable PDF trade report publishing",
        "Custom profile banner + branding",
        "Eligible for IGE roundtables & webinars",
        "Featured in IGE Newsletter (20K+ subscribers)",
        "'Open to Consulting' badge in Reader feeds",
        "Fully Public profile (Google SEO indexed)",
        "Speaking opportunities",
      ],
      restrictions: [],
      cta: "Upgrade to ASME Elite",
      isSovereign: false,
    },
    {
      id: "sovereign",
      name: "ASME SOVEREIGN",
      tagline: "Eligibility: Invite / Apply Only",
      price: "₹9,999",
      annualPrice: "₹99,990",
      annualSaving: "Save ₹19,998",
      period: "month",
      badge: "ELITE",
      color: "border-purple-500/30 bg-gradient-to-b from-white via-white to-purple-50/20 dark:from-[#122238] dark:to-[#1a113b]/30 relative overflow-hidden",
      accentColor: "text-purple-600 dark:text-purple-400",
      checkColor: "text-purple-500",
      benefits: [
        "Everything in ASME Elite",
        "Sovereign Gold badge (highest designation)",
        "Publish up to 8 articles/month (Max 2/week)",
        "Dedicated IGE Account Manager",
        "IGE-managed PR & co-bylined editorials",
        "80/20 revenue share on consulting bookings",
        "Speaking & keynote placement at IGE events",
        "Sovereign ASME widget in all Reader feeds",
        "White-label PDF reports under your seal",
        "IGE Board Advisory Council eligibility",
        "Custom SEO landing page by IGE editorial",
        "Priority CEPA & policy briefing access",
        "Government & investor visibility pipeline",
      ],
      restrictions: [],
      cta: "Upgrade to ASME Sovereign",
      isSovereign: false,
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
        onboardingRole: "associate-sme",
        onboardingStatus: "Draft",
        onboardingForm: {},
        onboardingDocs: {},
        onboardingFeedback: "",
        associateSmePlan: "free",
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
    <div className="p-5 md:p-8 lg:p-10 max-w-7xl mx-auto pb-24">

      {/* Active ASME Profile Quick Navigation Banner */}
      {user.onboardingRole === "associate-sme" && user.onboardingStatus === "Approved" && (
        <div className="mb-8 p-4 bg-gradient-to-r from-teal-50/70 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-teal-200 dark:border-teal-900/30 rounded-2xl flex items-center justify-between flex-wrap gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              ✓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-[#1D1D46] dark:text-white">Active ASME Profile: {user.name || "Specialist"}</p>
                <span className="text-[10px] font-black uppercase bg-teal-600 text-white px-2 py-0.5 rounded-full">
                  {currentPlan === "none" ? "Free" : currentPlan} Plan
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">To view and manage your public articles, consulting, and bio, visit your Profile section.</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/${locale}/profile`)}
            className="px-4 py-2 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
          >
            Go to My Profile <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      {/* Page Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-black tracking-widest text-[#F0652E] uppercase bg-[#F0652E]/10 px-3 py-1.5 rounded-full inline-block mb-4">
          Associate Contributor Engine
        </span>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#1D1D46] dark:text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Associate Subject Matter Expert (ASME) Plans
        </h1>
        <p className="text-sm text-gray-500 mt-3 max-w-lg mx-auto leading-relaxed">
          Position yourself as an industry specialist, publish trade insights, and activate
          consulting monetization features for your IGE ASME profile.
        </p>

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

      {/* 4-Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 items-stretch">
        {plans.map((plan) => {
          const isActive = currentPlan === plan.id;
          const { price, sub } = getDisplayPrice(plan);

          return (
            <div
              key={plan.id}
              className={`rounded-[32px] border-2 p-6 md:p-7 flex flex-col transition-all duration-300 hover:shadow-xl ${plan.color}`}
            >
              {plan.badge && (
                <div
                  className={`absolute top-4 right-4 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    plan.badge === "RECOMMENDED"
                      ? "bg-[#F0652E]"
                      : "bg-gradient-to-r from-purple-600 to-violet-500"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              {/* Card Header */}
              <div className="mb-5">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 block mb-1 uppercase tracking-wider">
                  {plan.tagline}
                </span>
                <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-0.5">
                  <span className="text-3xl font-black text-[#1D1D46] dark:text-white">
                    {price}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">{sub}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-white/10 w-full mb-5" />

              {/* Benefits list */}
              <div className="flex-1 space-y-4 mb-6">
                <div>
                  <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">
                    Key Features:
                  </span>
                  <ul className="space-y-2.5">
                    {plan.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 leading-normal"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.restrictions && plan.restrictions.length > 0 && (
                  <div className="pt-2 border-t border-gray-50 dark:border-white/5">
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">
                      Locked:
                    </span>
                    <ul className="space-y-2">
                      {plan.restrictions.map((restriction, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-400 leading-normal"
                        >
                          <X className="w-3.5 h-3.5 text-gray-300 dark:text-white/20 shrink-0 mt-0.5" />
                          <span>{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div>
                {isActive ? (
                  <div className="w-full py-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-center font-bold text-sm rounded-2xl">
                    ✓ Your Current Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlanSelect(plan.id, plan.name, plan.price === "₹0" ? "Free" : `${plan.price}/${plan.period}`)}
                    className={`w-full py-3.5 text-center font-bold text-sm rounded-2xl transition-all ${
                      plan.isSovereign
                        ? "bg-gradient-to-r from-purple-700 to-violet-600 hover:opacity-90 text-white shadow-lg"
                        : plan.badge
                        ? "bg-[#1D1D46] hover:bg-[#F0652E] text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1D1D46] dark:text-white"
                    }`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Common Platform Benefits Section */}
      <div className="bg-white dark:bg-[#122238] rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#F0652E]" />
          <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white">All Paid Plans Include</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Better Discoverability", desc: "Gain higher exposure across sector lists, rankings, and standard taxonomy." },
            { title: "SEO Advantage", desc: "Premium metadata optimization to rank your public contributions on search engines." },
            { title: "Taxonomy Tagging", desc: "Direct taxonomy mapping tags your dashboard contents to bilateral trade sectors." },
            { title: "AI Recommendation Visibility", desc: "Be recommended to global companies and SMEs via IGENews AI search." },
            { title: "Premium Ranking Opportunities", desc: "Eligibility to enter sector rankings, performance list reviews, and juries." },
            { title: "Networking & Engagement", desc: "Secure direct-messaging interface, custom alerts, and sector webinars." },
          ].map((benefit, i) => (
            <div key={i} className="flex gap-3">
              <Check className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white mb-1">{benefit.title}</h4>
                <p className="text-[11px] text-gray-500 leading-normal">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal Integration */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          planName={selectedPlan.name}
          price={selectedPlan.price}
          category="associate-sme"
          planId={selectedPlan.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

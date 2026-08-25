"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Check, X, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import CheckoutModal from "@/components/profile/CheckoutModal";
import ReaderFreeInfo from "@/components/profile/upgrade/free/ReaderFreeInfo";

export default function ReaderPlansPage() {
  const { user, updateOnboarding } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string } | null>(null);

  if (!user) return null;

  const currentPlan = user.readerPlan || "free";

  const plans = [
    {
      id: "free",
      name: "FREE READER",
      tagline: "Best For: General readers, students, early users",
      price: "₹0",
      period: "forever",
      benefits: [
        "Follow up to 5 sectors",
        "Follow up to 25 industries (5/sector)",
        "Follow up to 10 countries (2 bilateral + 8 other)",
        "Follow up to 5 leaders",
        "Basic FEED and HEADLINES access",
        "Access to TRENDING and SECTOR NEWS",
        "Community access (read-only)",
        "Standard initials-based system avatar",
        "Permanently private profile view",
      ],
      restrictions: [
        "No custom photo upload",
        "No downloadable briefs",
        "No advanced filters",
      ],
      cta: "Current Plan",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
    },
    {
      id: "pro",
      name: "PRO READER",
      tagline: "Core Value: Professional Industry Intelligence Access",
      price: "₹299",
      period: "month",
      yearlyPrice: "₹2,990/year (2 months free)",
      benefits: [
        "Everything in Free",
        "Follow up to 10 sectors",
        "Follow up to 50 industries",
        "Follow up to 20 countries (5 bilateral + 15 other)",
        "Follow up to 15 leaders",
        "Unlimited article reading",
        "Exclusive sector intelligence articles",
        "Standard initials-based system avatar",
        "Permanently private profile view",
      ],
      restrictions: [
        "No custom photo upload",
        "No downloadable briefs",
        "No advanced filters",
      ],
      cta: "Upgrade to Pro",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
    },
    {
      id: "premium",
      name: "PREMIUM READER",
      tagline: "Core Value: Collaborative Network & Custom Profile",
      price: "₹499",
      period: "month",
      yearlyPrice: "₹4,990/year (2 months free)",
      benefits: [
        "Everything in Pro",
        "Follow up to 20 sectors",
        "Follow up to 100 industries",
        "Follow up to 35 countries (10 bilateral + 25 other)",
        "Follow up to 30 leaders",
        "Custom photo upload allowed",
        "Profile: Platform-Only Public or Private",
        "Full community participation (Q&A & debate)",
      ],
      restrictions: [
        "PDF briefing downloads blocked",
      ],
      cta: "Upgrade to Premium",
      color: "border-[#1D1D46] dark:border-[#F0652E] bg-[#f4f7fb]/40 dark:bg-[#172c47] relative overflow-hidden shadow-lg",
      popular: true,
    },
    {
      id: "enterprise",
      name: "PRO PLUS READER",
      tagline: "Core Value: Decision-Maker Intelligence Platform",
      price: "₹999",
      period: "month",
      yearlyPrice: "₹9,990/year (2 months free)",
      benefits: [
        "Everything in Premium",
        "Unlimited sectors followed",
        "Unlimited industries followed",
        "Unlimited countries followed",
        "Unlimited leaders followed",
        "Downloadable PDF reports & briefings",
        "Full public profile toggle (SEO indexable)",
        "Full access to AI Plus tools",
        "Enterprise team dashboards",
      ],
      restrictions: [],
      cta: "Upgrade to Pro Plus",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
    },
  ];

  const handleOpenCheckout = (planId: string, name: string, priceStr: string) => {
    setSelectedPlan({ id: planId, name, price: priceStr });
    setCheckoutOpen(true);
  };

  const handlePaymentSuccess = async (updatedFields: any) => {
    await updateOnboarding(updatedFields);
  };

  return (
    <div className="p-5 md:p-8 lg:p-10 max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-black tracking-widest text-[#F0652E] uppercase bg-[#F0652E]/10 px-3 py-1.5 rounded-full inline-block mb-3">
          READER SUBSCRIPTION ENGINE
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D46] dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
          Reader Upgrade Plans
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
          Unlock the decision-maker intelligence tools and unlimited industry trade insights tailored to your needs.
        </p>
      </div>

      {/* Grid of Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 items-stretch">
        {plans.map((plan) => {
          const isActive = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-[32px] border-2 p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-xl ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-[#F0652E] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Popular
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 block mb-1 uppercase tracking-wider">
                  {plan.tagline}
                </span>
                <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">{plan.name}</h3>
                
                {/* Pricing block */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#1D1D46] dark:text-white">{plan.price}</span>
                  <span className="text-xs text-gray-400">/{plan.period}</span>
                </div>
                {plan.yearlyPrice && (
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    {plan.yearlyPrice}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-white/10 w-full mb-6" />

              {/* Benefits list */}
              <div className="flex-1 space-y-4 mb-8">
                <div className="text-xs font-bold text-[#1D1D46] dark:text-white/70 uppercase tracking-wider">
                  What's Included:
                </div>
                <ul className="space-y-3">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300 leading-normal">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Restrictions (if any) */}
                {plan.restrictions.length > 0 && (
                  <div className="pt-4 space-y-3 border-t border-dashed border-gray-100 dark:border-white/5 mt-4">
                    <div className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Restrictions:
                    </div>
                    <ul className="space-y-2">
                      {plan.restrictions.map((restriction, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400 leading-normal">
                          <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
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
                  <div className="w-full py-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-center font-bold text-sm rounded-2xl">
                    ✓ Your Current Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenCheckout(plan.id, plan.name, plan.price === "₹0" ? "Free" : `${plan.price}/${plan.period}`)}
                    className={`w-full py-4 text-center font-bold text-sm rounded-2xl transition-all ${
                      plan.popular
                        ? "bg-[#1D1D46] hover:bg-[#0642BA] text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1D1D46] dark:text-white"
                    }`}
                  >
                    {plan.price === "₹0" ? "Switch to Free" : "Upgrade Plan"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {currentPlan === "free" && <ReaderFreeInfo />}

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
          category="reader"
          planId={selectedPlan.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Check, X, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import CheckoutModal from "@/components/profile/CheckoutModal";
import SmeOnboarding from "@/components/profile/sme/free/SmeOnboarding";
import SmeDashboard from "@/components/profile/sme/free/SmeDashboard";

export default function SmePlansPage() {
  const { user, updateOnboarding } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string } | null>(null);

  if (!user) return null;

  // Onboarding check
  if (user.onboardingRole === "sme" && user.onboardingStatus !== "Approved" && user.onboardingStatus !== "none") {
    return <SmeOnboarding />;
  }

  // Approved dashboard check
  if (user.onboardingRole === "sme" && user.onboardingStatus === "Approved") {
    return <SmeDashboard />;
  }

  const currentPlan = user.smePlan || "none";

  const plans = [
    {
      id: "free",
      name: "FOUNDING ASSOCIATE SME (FREE)",
      eligibility: "Eligibility: 10+ years experience",
      price: "₹0",
      period: "forever",
      benefits: [
        "SME profile page",
        "Google indexed identity",
        "Basic verification badge",
        "Publish limited articles",
        "Sector tagging",
        "Industry discoverability",
        "Founding member badge",
        "Networking visibility",
        "Limited ranking eligibility",
        "Community access",
      ],
      restrictions: [
        "Limited consulting access",
        "Limited report opportunities",
        "Lower ranking priority",
      ],
      cta: "Activate Free",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
    },
    {
      id: "pro",
      name: "ASSOCIATE SME PRO",
      eligibility: "Core Value: Build Authority + Visibility",
      price: "₹49,000",
      period: "year",
      benefits: [
        "Everything in Free",
        "Verified Associate SME badge",
        "Unlimited article publishing",
        "Consulting profile activation",
        "Consulting revenue opportunities",
        "Industry ranking eligibility",
        "Featured sector listing",
        "Podcast/interview opportunities",
        "Industry networking access",
        "AI discovery recommendations",
        "Sector visibility boost",
        "Basic report writing access",
        "Public thought leadership profile",
      ],
      restrictions: [],
      cta: "Buy Pro Plan",
      color: "border-[#1D1D46] dark:border-[#F0652E] bg-[#f4f7fb]/40 dark:bg-[#172c47] relative overflow-hidden shadow-lg",
      popular: true,
    },
    {
      id: "elite",
      name: "SME ELITE",
      eligibility: "Eligibility: 20+ years experience",
      price: "₹1.5L - ₹3L",
      period: "year",
      benefits: [
        "Premium Blue Tick SME verification",
        "Priority Top SME rankings",
        "Full consulting monetization",
        "Revenue share consulting model",
        "Industry judge eligibility",
        "Awards jury participation",
        "Premium report writing access",
        "Featured homepage visibility",
        "AI-powered discoverability",
        "Speaking opportunities",
        "Investor visibility",
        "Government & policy visibility",
        "Premium networking access",
        "Sector authority positioning",
        "Priority lead generation",
      ],
      restrictions: [],
      cta: "Buy Elite Plan",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
    },
  ];

  const handlePlanSelect = async (planId: string, name: string, priceStr: string) => {
    if (planId === "free") {
      await updateOnboarding({
        onboardingRole: "sme",
        onboardingStatus: "Draft",
        onboardingForm: {},
        onboardingDocs: {},
        onboardingFeedback: "",
        smePlan: "free",
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
    <div className="p-5 md:p-8 lg:p-10 max-w-6xl mx-auto pb-20">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-black tracking-widest text-[#F0652E] uppercase bg-[#F0652E]/10 px-3 py-1.5 rounded-full inline-block mb-3">
          EXPERT AUTHORITY ENGINE
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D46] dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
          Subject Matter Expert (SME) Plans
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
          Position yourself as an industry authority, write reports, and activate monetization features for consulting opportunities.
        </p>
      </div>

      {/* Grid of Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
        {plans.map((plan) => {
          const isActive = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`rounded-[32px] border-2 p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-xl ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-[#F0652E] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 block mb-1 uppercase tracking-wider">
                  {plan.eligibility}
                </span>
                <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">{plan.name}</h3>
                
                {/* Pricing block */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#1D1D46] dark:text-white">{plan.price}</span>
                  <span className="text-xs text-gray-400">/{plan.period}</span>
                </div>
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
                    {plan.id === "free" ? "✓ Active Free Plan" : "✓ Your Current Plan"}
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlanSelect(plan.id, plan.name, plan.price === "₹0" ? "Free" : `${plan.price}/${plan.period}`)}
                    className={`w-full py-4 text-center font-bold text-sm rounded-2xl transition-all ${
                      plan.popular
                        ? "bg-[#1D1D46] hover:bg-[#0642BA] text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1D1D46] dark:text-white"
                    }`}
                  >
                    {plan.price === "₹0" ? "Activate Founding Plan" : "Purchase Plan"}
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
          category="sme"
          planId={selectedPlan.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

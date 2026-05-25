"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";
import CheckoutModal from "@/components/profile/CheckoutModal";
import CompanyOnboarding from "@/components/profile/company/free/CompanyOnboarding";
import CompanyDashboard from "@/components/profile/company/free/CompanyDashboard";

export default function CompanyPlansPage() {
  const { user, updateOnboarding } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string } | null>(null);

  if (!user) return null;

  // Onboarding check
  if (user.onboardingRole === "company" && user.onboardingStatus !== "Approved" && user.onboardingStatus !== "none") {
    return <CompanyOnboarding />;
  }

  // Approved dashboard check
  if (user.onboardingRole === "company" && user.onboardingStatus === "Approved") {
    return <CompanyDashboard />;
  }

  const currentPlan = user.companyPlan || "none";

  const plans = [
    {
      id: "free",
      name: "FREE COMPANY PAGE",
      eligibility: "Best For: Startups & early MSMEs",
      price: "₹0",
      period: "forever",
      benefits: [
        "Basic company page",
        "Sector tagging",
        "Limited company description",
        "Website & social links",
        "Basic discoverability",
        "Public company listing",
        "Limited news visibility",
      ],
      restrictions: [
        "No blue tick",
        "No premium SEO",
        "No leader bundle",
        "No featured visibility",
      ],
      cta: "Activate Free",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
    },
    {
      id: "silver",
      name: "SILVER / GROWTH COMPANY",
      eligibility: "Core Value: Verified Company Page & Team Bundle",
      price: "₹99,000",
      period: "year",
      benefits: [
        "Verified company page",
        "Blue Tick verification",
        "SEO optimized page",
        "Investors tab",
        "Employees tab",
        "Brand tab",
        "Stakeholders tab",
        "2 bundled leader pages",
        "PR article publishing",
        "Sector discoverability",
        "AI recommendations",
        "Featured company listings",
        "Analytics dashboard",
        "Lead visibility",
      ],
      restrictions: [],
      cta: "Buy Silver Plan",
      color: "border-[#1E3A5F] dark:border-[#F4A024] bg-[#f4f7fb]/40 dark:bg-[#172c47] relative overflow-hidden shadow-lg",
      popular: true,
    },
    {
      id: "gold",
      name: "GOLD / PLATINUM COMPANY",
      eligibility: "Core Value: Sector Dominance & Enterprise Visibility",
      price: "₹3L - ₹10L",
      period: "year",
      benefits: [
        "Everything in Silver",
        "Homepage featured placement",
        "Premium ranking visibility",
        "Unlimited leader pages",
        "Premium PR publishing",
        "Video gallery",
        "Investor visibility",
        "AI discovery boosts",
        "Premium analytics",
        "Recruitment branding",
        "Export visibility",
        "Trade intelligence access",
        "Sponsored visibility",
        "Priority networking",
        "Sector dominance positioning",
        "Premium awards participation",
      ],
      restrictions: [],
      cta: "Buy Gold Plan",
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
    },
  ];

  const handlePlanSelect = async (planId: string, name: string, priceStr: string) => {
    if (planId === "free") {
      await updateOnboarding({
        onboardingRole: "company",
        onboardingStatus: "Draft",
        onboardingForm: {},
        onboardingDocs: {},
        onboardingFeedback: "",
        companyPlan: "free",
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
        <span className="text-xs font-black tracking-widest text-[#F4A024] uppercase bg-[#F4A024]/10 px-3 py-1.5 rounded-full inline-block mb-3">
          BUSINESS REPRESENTATIVE ENGINE
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
          Company Page Plans
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
          Create verified company profiles, bundle leader pages, publish official PR announcements, and boost your B2B trade analytics.
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
                <div className="absolute top-4 right-4 bg-[#F4A024] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 block mb-1 uppercase tracking-wider">
                  {plan.eligibility}
                </span>
                <h3 className="text-xl font-bold text-[#1E3A5F] dark:text-white">{plan.name}</h3>
                
                {/* Pricing block */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#1E3A5F] dark:text-white">{plan.price}</span>
                  <span className="text-xs text-gray-400">/{plan.period}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-white/10 w-full mb-6" />

              {/* Benefits list */}
              <div className="flex-1 space-y-4 mb-8">
                <div className="text-xs font-bold text-[#1E3A5F] dark:text-white/70 uppercase tracking-wider">
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
                    {plan.id === "free" ? "✓ Active Free Page" : "✓ Your Current Plan"}
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlanSelect(plan.id, plan.name, plan.price === "₹0" ? "Free" : `${plan.price}/${plan.period}`)}
                    className={`w-full py-4 text-center font-bold text-sm rounded-2xl transition-all ${
                      plan.popular
                        ? "bg-[#1E3A5F] hover:bg-[#2F6FA3] text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1E3A5F] dark:text-white"
                    }`}
                  >
                    {plan.price === "₹0" ? "Activate Free Page" : "Purchase Plan"}
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
          <Sparkles className="w-5 h-5 text-[#F4A024]" />
          <h3 className="text-lg font-bold text-[#1E3A5F] dark:text-white">All Paid Plans Include</h3>
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
                <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white mb-1">{benefit.title}</h4>
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
          category="company"
          planId={selectedPlan.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

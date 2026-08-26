"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { Check, X, ShieldAlert, Sparkles, Star, ArrowRight, Mail } from "lucide-react";
import CheckoutModal from "@/components/profile/CheckoutModal";
import SmeOnboarding from "@/components/profile/sme/free/SmeOnboarding";
import SmeDashboard from "@/components/profile/sme/free/SmeDashboard";

export default function SmePlansPage() {
  const { user, updateOnboarding } = useAuth();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string } | null>(null);

  if (!user) return null;

  // Redirect to onboarding/dashboard if already an SME
  if (user.onboardingRole === "sme" && user.onboardingStatus !== "Approved" && user.onboardingStatus !== "none") {
    return <SmeOnboarding />;
  }
  if (user.onboardingRole === "sme" && user.onboardingStatus === "Approved") {
    return <SmeDashboard />;
  }

  const currentPlan = user.smePlan || "none";

  const plans = [
    {
      id: "free",
      name: "FOUNDING ASSOCIATE SME",
      tagline: "Eligibility: 10+ Years Experience",
      price: "₹0",
      annualPrice: "₹0",
      annualSaving: null,
      period: "forever",
      badge: null,
      color: "border-slate-200 dark:border-white/10 bg-white dark:bg-[#122238]",
      accentColor: "text-gray-500",
      checkColor: "text-gray-400",
      benefits: [
        "SME profile page (Google-indexed)",
        "Basic 'Associate SME' verification badge",
        "Publish up to 3 articles/month",
        "Up to 2 sector expertise tags",
        "Follow up to 10 Reader connections",
        "Basic public profile URL",
        "Founding member badge",
        "Community access (read-only)",
      ],
      restrictions: [
        "No consulting revenue activation",
        "No premium badge or priority ranking",
        "No custom banner or profile styling",
      ],
      cta: "Activate Free Plan",
      isSovereign: false,
    },
    {
      id: "pro",
      name: "ASSOCIATE SME PRO",
      tagline: "Core Value: Build Authority + Visibility",
      price: "₹3,499",
      annualPrice: "₹34,990",
      annualSaving: "Save ₹6,998",
      period: "month",
      badge: null,
      color: "border-blue-500/30 dark:border-blue-400/20 bg-white dark:bg-[#122238]",
      accentColor: "text-blue-600 dark:text-blue-400",
      checkColor: "text-blue-500",
      benefits: [
        "Everything in Free",
        "Verified blue 'Associate SME Pro' badge",
        "Unlimited article publishing",
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
      cta: "Upgrade to Associate Pro",
      isSovereign: false,
    },
    {
      id: "elite",
      name: "SME ELITE",
      tagline: "Core Value: Revenue + Authority Amplification",
      price: "₹7,999",
      annualPrice: "₹79,990",
      annualSaving: "Save ₹15,998",
      period: "month",
      badge: "RECOMMENDED",
      color: "border-emerald-500/40 bg-gradient-to-b from-white to-emerald-50/30 dark:from-[#122238] dark:to-[#0c3125]/20 relative overflow-hidden shadow-2xl",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      checkColor: "text-emerald-500",
      benefits: [
        "Everything in Associate Pro",
        "Gold 'SME Elite' verification badge",
        "Priority #1 ranking in sector searches",
        "Full consulting booking system (1:1 sessions)",
        "Revenue share on article reads",
        "Downloadable PDF trade report publishing",
        "Custom profile banner + branding",
        "Eligible for IGE roundtables & webinars",
        "Featured in IGE Newsletter (20K+ subscribers)",
        "'Open to Consulting' badge in Reader feeds",
        "Fully Public profile (Google SEO indexed)",
        "Industry judge & awards jury eligibility",
        "Speaking opportunities",
      ],
      restrictions: [],
      cta: "Upgrade to SME Elite",
      isSovereign: false,
    },
    {
      id: "sovereign",
      name: "SME SOVEREIGN",
      tagline: "Eligibility: 20+ Years — Invite / Apply Only",
      price: "₹1.5L–₹3L",
      annualPrice: "₹1.5L–₹3L",
      annualSaving: null,
      period: "year",
      badge: "ELITE",
      color: "border-purple-500/30 bg-gradient-to-b from-white via-white to-purple-50/20 dark:from-[#122238] dark:to-[#1a113b]/30 relative overflow-hidden",
      accentColor: "text-purple-600 dark:text-purple-400",
      checkColor: "text-purple-500",
      benefits: [
        "Everything in SME Elite",
        "Sovereign Gold badge (highest designation)",
        "Dedicated IGE Account Manager",
        "IGE-managed PR & co-bylined editorials",
        "80/20 revenue share on consulting bookings",
        "Speaking & keynote placement at IGE events",
        "Sovereign SME widget in all Reader feeds",
        "White-label PDF reports under your seal",
        "IGE Board Advisory Council eligibility",
        "Custom SEO landing page by IGE editorial",
        "Priority CEPA & policy briefing access",
        "Government & investor visibility pipeline",
      ],
      restrictions: [],
      cta: "Apply for SME Sovereign",
      isSovereign: true,
    },
  ];

  const getDisplayPrice = (plan: typeof plans[0]) => {
    if (plan.id === "free") return { price: "₹0", sub: "/forever" };
    if (plan.id === "sovereign") return { price: "₹1.5L–₹3L", sub: "/year · custom" };
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
        onboardingRole: "sme",
        onboardingStatus: "Draft",
        onboardingForm: {},
        onboardingDocs: {},
        onboardingFeedback: "",
        smePlan: "free",
      });
    } else if (planId === "sovereign") {
      window.location.href = `mailto:sovereign@indiaglobalnews.com?subject=SME Sovereign Application&body=Name: ${user.name}%0AEmail: ${user.email}%0AYears of Experience: %0AIndustry Sector: %0ALinkedIn: `;
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

      {/* Page Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-black tracking-widest text-[#F0652E] uppercase bg-[#F0652E]/10 px-3 py-1.5 rounded-full inline-block mb-4">
          Expert Authority Engine
        </span>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#1D1D46] dark:text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Subject Matter Expert (SME) Plans
        </h1>
        <p className="text-sm text-gray-500 mt-3 max-w-lg mx-auto leading-relaxed">
          Position yourself as an industry authority, publish trade intelligence, and activate
          consulting monetization features for your IGE Expert profile.
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
              {/* Badge */}
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

              {/* Sovereign ambient shimmer */}
              {plan.id === "sovereign" && (
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none rounded-[30px]" />
              )}

              {/* Card Header */}
              <div className="mb-6 relative z-10">
                <span className="text-[10px] font-bold text-gray-400 block mb-1.5 uppercase tracking-wider leading-relaxed">
                  {plan.tagline}
                </span>
                <h3 className="text-base font-bold text-[#1D1D46] dark:text-white leading-tight">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-4">
                  <div className="flex items-baseline gap-0.5 flex-wrap">
                    <span className={`text-3xl font-black ${plan.accentColor}`}>{price}</span>
                    {plan.id !== "free" && plan.id !== "sovereign" && (
                      <span className="text-xs text-gray-400 ml-0.5">{sub.split("·")[0]}</span>
                    )}
                  </div>
                  {plan.id !== "free" && billingCycle === "annual" && plan.annualSaving && (
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                      {plan.annualSaving}
                    </span>
                  )}
                  {plan.id === "free" && (
                    <span className="text-[11px] text-gray-400 mt-0.5 block">Forever free</span>
                  )}
                  {plan.id === "sovereign" && (
                    <span className="text-[11px] text-gray-400 mt-0.5 block">Custom · negotiated</span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 dark:bg-white/10 w-full mb-5" />

              {/* Benefits */}
              <div className="flex-1 space-y-4 mb-7 relative z-10">
                <div className="text-[10px] font-black text-[#1D1D46] dark:text-white/70 uppercase tracking-widest">
                  What&apos;s Included:
                </div>
                <ul className="space-y-2.5">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300 leading-normal">
                      <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.checkColor}`} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {plan.restrictions.length > 0 && (
                  <div className="pt-3 space-y-2 border-t border-dashed border-gray-100 dark:border-white/5 mt-3">
                    <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-3 h-3" /> Not Included:
                    </div>
                    <ul className="space-y-1.5">
                      {plan.restrictions.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400 leading-normal">
                          <X className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="relative z-10">
                {isActive ? (
                  <div className="w-full py-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-center font-bold text-sm rounded-2xl">
                    ✓ Your Current Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlanSelect(
                      plan.id,
                      plan.name,
                      plan.id === "free" ? "Free" :
                      plan.id === "sovereign" ? "Custom" :
                      billingCycle === "annual" ? `${plan.annualPrice}/year` : `${plan.price}/month`
                    )}
                    className={`w-full py-3.5 text-center font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 ${
                      plan.id === "sovereign"
                        ? "bg-gradient-to-r from-purple-700 to-violet-600 hover:from-purple-800 hover:to-violet-700 text-white shadow-lg"
                        : plan.id === "elite"
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                        : plan.id === "pro"
                        ? "bg-[#1E3A5F] hover:bg-[#162d4a] text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1D1D46] dark:text-white"
                    }`}
                  >
                    {plan.isSovereign && <Mail className="w-4 h-4" />}
                    {plan.cta}
                    {!plan.isSovereign && plan.id !== "free" && <ArrowRight className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* All Paid Plans Include */}
      <div className="bg-white dark:bg-[#122238] rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-white/5 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-[#F0652E]" />
          <h3 className="text-lg font-bold text-[#1D1D46] dark:text-white">All Paid SME Plans Include</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Google-Indexed Expert Profile", desc: "Your profile and published articles are indexed by search engines, building your digital authority." },
            { title: "B2B Reader Audience Access", desc: "Your expertise is surfaced to our verified community of import/export decision-makers and trade professionals." },
            { title: "Sector Taxonomy Tagging", desc: "Your expertise is mapped to bilateral trade sectors, CEPA treaties, and industry verticals." },
            { title: "IGE Verified Expert Badge", desc: "A platform-verified badge that builds trust with Readers considering your consulting services." },
            { title: "Consulting Lead Generation", desc: "Your profile actively captures consulting inquiries from Reader members browsing your articles." },
            { title: "Priority SEO over Free Tier", desc: "Paid profiles rank higher in directory searches and get more visibility in Reader news feeds." },
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

      {/* Sovereign Apply Banner */}
      <div className="bg-gradient-to-r from-[#1a113b] via-purple-900 to-violet-950 rounded-[32px] p-8 md:p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.25),transparent)] pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Sovereign Tier — By Application Only</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Are you a 20+ year industry veteran?
          </h3>
          <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed mb-6">
            SME Sovereign is reserved for sector legends, ex-government officials, FICCI/CII board
            members, and practitioners who have shaped India's trade policy. Apply for a personal
            review by our editorial team.
          </p>
          <a
            href={`mailto:sovereign@indiaglobalnews.com?subject=SME Sovereign Application&body=Name: ${user.name}%0AEmail: ${user.email}%0AYears of Experience: %0AIndustry Sector: %0ALinkedIn: `}
            className="inline-flex items-center gap-2 bg-white text-purple-900 font-bold text-sm px-6 py-3 rounded-2xl hover:bg-purple-50 transition-all shadow-lg"
          >
            <Mail className="w-4 h-4" />
            Apply for SME Sovereign
          </a>
        </div>
      </div>

      {/* Checkout Modal */}
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

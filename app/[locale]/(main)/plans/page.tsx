"use client";

import Link from "next/link";
import { Check, Sparkles, TrendingUp, Globe, Shield, Zap, Users, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started with trade intelligence",
    features: [
      "Access to daily news summaries",
      "Basic sector insights",
      "Limited country reports (5/month)",
      "Email support",
    ],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "₹2,999",
    description: "For professionals seeking deeper insights",
    features: [
      "Everything in Free",
      "Unlimited sector insights",
      "Full country & leader analysis",
      "Advanced search & filters",
      "Priority email support",
      "Weekly market trends",
    ],
    cta: "Choose Plan",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹9,999",
    description: "Advanced intelligence for serious traders",
    features: [
      "Everything in Starter",
      "AI-powered trade recommendations",
      "Real-time breaking news alerts",
      "Custom sector tracking",
      "Export reports & analytics",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Choose Plan",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for your organization",
    features: [
      "Everything in Pro",
      "White-label solutions",
      "Unlimited team members",
      "Custom integrations",
      "On-premise deployment options",
      "24/7 priority support",
      "Dedicated support team",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Real-Time Intelligence",
    description: "Stay ahead with instant updates on market trends and trade opportunities",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Access comprehensive insights from 150+ countries and bilateral relations",
  },
  {
    icon: Shield,
    title: "Verified Data",
    description: "Trust in our curated, fact-checked news from reliable sources",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Leverage advanced AI to discover hidden patterns and opportunities",
  },
  {
    icon: Users,
    title: "Expert Analysis",
    description: "Get deep-dive reports from industry experts and trade analysts",
  },
  {
    icon: FileText,
    title: "Custom Reports",
    description: "Generate tailored reports for your specific sectors and regions",
  },
];

export default function PlansPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-neutral-light)] to-white dark:from-[var(--color-neutral-white)] dark:to-[var(--background)]">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold-light)] px-4 py-1.5 mb-6">
          <Sparkles className="h-4 w-4 text-[var(--color-accent-gold)]" />
          <span className="text-sm font-semibold text-[var(--color-accent-gold-dark)]">
            Upgrade to Premium
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-body)] mb-4">
          {t("plans.title")}
        </h1>
        <p className="text-lg text-[var(--color-neutral-dark)] max-w-2xl mx-auto mb-8">
          {t("plans.subtitle")}
        </p>
      </section>

      {/* Benefits Grid */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center text-[var(--color-text-body)] mb-8">
          Why Upgrade?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[var(--color-neutral-white)] rounded-lg p-6 shadow-sm border border-[var(--color-neutral-mid)]/20 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <benefit.icon className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-body)] mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[var(--color-neutral-dark)]">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl p-8 transition-all ${
                plan.highlighted
                  ? "bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-xl scale-105"
                  : "bg-white dark:bg-[var(--color-neutral-white)] border border-[var(--color-neutral-mid)]/20 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-accent-gold)] text-white px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.highlighted ? "text-white" : "text-[var(--color-text-body)]"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className={`text-3xl font-bold ${
                      plan.highlighted ? "text-white" : "text-[var(--color-primary)]"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span
                      className={plan.highlighted ? "text-white/80" : "text-[var(--color-neutral-dark)]"}
                    >
                      {t("plans.perMonth")}
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm ${
                    plan.highlighted ? "text-white/80" : "text-[var(--color-neutral-dark)]"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2">
                    <Check
                      className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "text-white" : "text-[var(--color-accent-green)]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-white" : "text-[var(--color-text-body)]"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                className={`block w-full text-center py-3 px-4 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-white text-[var(--color-primary)] hover:bg-gray-100"
                    : plan.name === "Free"
                    ? "bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] cursor-not-allowed"
                    : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                }`}
              >
                {plan.cta === "Current Plan" ? t("plans.currentPlan") : t("plans.choosePlan")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center text-[var(--color-text-body)] mb-8">
          Compare {t("plans.features")}
        </h2>
        <div className="bg-white dark:bg-[var(--color-neutral-white)] rounded-xl shadow-sm border border-[var(--color-neutral-mid)]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-light)]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-body)]">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-text-body)]">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-text-body)]">
                    Starter
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-text-body)]">
                    Pro
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-text-body)]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral-mid)]/20">
                {[
                  ["Daily News", true, true, true, true],
                  ["Sector Insights", "Basic", "Full", "Full", "Full"],
                  ["Country Reports", "5/month", "Unlimited", "Unlimited", "Unlimited"],
                  ["AI Analysis", false, false, true, true],
                  ["Real-time Alerts", false, false, true, true],
                  ["API Access", false, false, true, true],
                  ["Team Members", "1", "1", "5", "Unlimited"],
                  ["Support", "Email", "Priority", "Dedicated", "24/7"],
                ].map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-[var(--color-text-body)] font-medium">
                      {row[0]}
                    </td>
                    {[1, 2, 3, 4].map((col) => (
                      <td key={col} className="px-6 py-4 text-center">
                        {typeof row[col] === "boolean" ? (
                          row[col] ? (
                            <Check className="h-5 w-5 text-[var(--color-accent-green)] mx-auto" />
                          ) : (
                            <span className="text-[var(--color-neutral-mid)]">—</span>
                          )
                        ) : (
                          <span className="text-sm text-[var(--color-text-body)]">{row[col]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Trade Intelligence?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals making smarter trade decisions with India Global News
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-[var(--color-primary)] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

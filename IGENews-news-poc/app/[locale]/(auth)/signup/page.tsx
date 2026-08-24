"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail, Lock, User, ShieldCheck, FileText, X, Shield, ExternalLink } from "lucide-react";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Consent & Agreement States
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeReaderConsent, setAgreeReaderConsent] = useState(false);

  // Policy Modal state
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms || !agreeReaderConsent) {
      setError("You must accept the Terms of Service, Privacy Policy, and Reader Data Consent to create an account.");
      return;
    }

    setLoading(true);

    try {
      const success = await signup({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (!success) {
        setError("Could not create account. Please try again.");
        setLoading(false);
        return;
      }

      // Successful signup — go to onboarding
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Panel - Brand & Visual */}
      <div className="lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden py-12 px-8 lg:px-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-light rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center min-h-full text-white">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                Welcome to IGENews
              </h1>
              <p className="text-xl text-white/90 font-medium">
                The Intelligence Pulse of Global India
              </p>
            </div>

            <div className="h-px bg-white/20 w-24"></div>

            <div className="space-y-6 text-lg text-white/90">
              <p className="leading-relaxed">
                Join 50,000+ leaders getting real-time trade intelligence, market trends, and personalized insights.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent-gold rounded-full flex-shrink-0"></div>
                  <span>Real-time market analytics and tracking</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent-gold rounded-full flex-shrink-0"></div>
                  <span>Verified B2B intelligence sources</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-accent-gold rounded-full flex-shrink-0"></div>
                  <span>Personalized trade news feed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-neutral-light">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-6">
              <h2 className="text-3xl font-display font-bold text-primary mb-2">
                Create Account
              </h2>
              <p className="text-neutral-dark text-base">
                Enter your details to get started
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-breaking-light border border-breaking text-sm text-breaking font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-mid" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-mid rounded-lg focus:border-primary focus:outline-none transition-colors text-text-body font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-mid" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-mid rounded-lg focus:border-primary focus:outline-none transition-colors text-text-body font-medium"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-mid" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-mid rounded-lg focus:border-primary focus:outline-none transition-colors text-text-body font-medium"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-mid" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral-mid rounded-lg focus:border-primary focus:outline-none transition-colors text-text-body font-medium"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              {/* Terms, Data & Privacy Policy Agreements (GDPR & Global Consumer Privacy Compliant) */}
              <div className="p-4 bg-neutral-light/50 rounded-xl border border-neutral-mid/40 space-y-3 my-4">
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Privacy & Reader Consent</span>
                </div>

                {/* Checkbox 1: Terms of Service & Privacy Policy (Mandatory) */}
                <label className="flex items-start gap-3 cursor-pointer group text-xs text-neutral-dark hover:text-black transition-colors">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (error) setError("");
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer flex-shrink-0"
                  />
                  <span className="leading-relaxed">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setActiveModal("terms")}
                      className="font-bold text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() => setActiveModal("privacy")}
                      className="font-bold text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      Privacy Policy
                    </button>
                    , and give explicit consent for my personal data to be processed in compliance with GDPR and global privacy regulations. <span className="text-red-500 font-bold">*</span>
                  </span>
                </label>

                {/* Checkbox 2: Reader Confirmation & Communications (Mandatory) */}
                <label className="flex items-start gap-3 cursor-pointer group text-xs text-neutral-dark hover:text-black transition-colors">
                  <input
                    type="checkbox"
                    checked={agreeReaderConsent}
                    onChange={(e) => {
                      setAgreeReaderConsent(e.target.checked);
                      if (error) setError("");
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer flex-shrink-0"
                  />
                  <span className="leading-relaxed">
                    I confirm that I am at least 18 years old and agree to receive essential reader trade news, market updates, and account communications. <span className="text-red-500 font-bold">*</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral-dark text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-primary hover:text-secondary underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeModal === "terms" ? (
                  <FileText className="w-6 h-6 text-accent-gold" />
                ) : (
                  <Shield className="w-6 h-6 text-accent-gold" />
                )}
                <h3 className="text-xl font-bold font-display">
                  {activeModal === "terms" ? "Terms of Service" : "Privacy & Data Protection Policy"}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-neutral-dark leading-relaxed">
              {activeModal === "terms" ? (
                <>
                  <p className="font-semibold text-primary">
                    Effective Date: August 2026 | IGENews Global Terms of Service
                  </p>
                  <p>
                    Welcome to IGENews. By registering for an account or subscribing to our trade intelligence platform, you enter into a legally binding agreement with IGENews.
                  </p>
                  <h4 className="font-bold text-black text-base mt-3">1. Account Registration & Responsibility</h4>
                  <p>
                    You agree to provide accurate, complete information during signup. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
                  </p>
                  <h4 className="font-bold text-black text-base mt-3">2. Intellectual Property & Acceptable Use</h4>
                  <p>
                    All market insights, news articles, trade data reports, and analysis published on IGENews are protected by copyright laws. You may not scrape, redistribute, or commercially exploit content without prior written permission.
                  </p>
                  <h4 className="font-bold text-black text-base mt-3">3. Subscriptions & Services</h4>
                  <p>
                    Free and paid plan features are provided as described in our plan documentation. We reserve the right to refine services and update terms with notice to registered readers.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-primary">
                    Effective Date: August 2026 | GDPR & Global Privacy Policy
                  </p>
                  <p>
                    IGENews respects your privacy and is committed to protecting personal data in compliance with GDPR, DPDP Act, and international data protection laws.
                  </p>
                  <h4 className="font-bold text-black text-base mt-3">1. Data We Collect & Legal Basis</h4>
                  <p>
                    We collect personal identifiers (such as name, email address, company details, and trade interest preferences) solely to deliver personalized news feeds, account notifications, and market analytics.
                  </p>
                  <h4 className="font-bold text-black text-base mt-3">2. Reader Rights (GDPR / Global Compliance)</h4>
                  <p>
                    You have the right to access, rectify, export, or request deletion of your personal data at any time through your Profile Settings or by contacting privacy@igenews.com.
                  </p>
                  <h4 className="font-bold text-black text-base mt-3">3. Consent & Security</h4>
                  <p>
                    By checking the consent tickmarks during signup, you explicitly agree to our data handling practices. We implement enterprise-grade encryption and access controls to safeguard your information.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-light/50 border-t border-neutral-mid flex items-center justify-between">
              <span className="text-xs text-neutral-dark font-medium">
                Clicking accept confirms you have read the complete policy.
              </span>
              <button
                onClick={() => {
                  setAgreeTerms(true);
                  setActiveModal(null);
                }}
                className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow transition-all"
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


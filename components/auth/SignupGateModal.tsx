"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useActiveMode } from "@/contexts/ActiveModeContext";
import { Lock, Mail, User, Shield, ArrowRight, Loader2, KeyRound } from "lucide-react";

export default function SignupGateModal() {
  const { signup, login } = useAuth();
  const { resetAnonymousCount, triggerPostSignupFlow, setShowSignupGate } = useActiveMode();

  const [tab, setTab] = useState<"signup" | "login">("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Signup form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Login form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill out all fields.");
      return;
    }

    if (!agreeTerms) {
      setError("You must accept the terms to create an account.");
      return;
    }

    setLoading(true);
    try {
      const ok = await signup({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (!ok) {
        setError("Could not create account. Please try again.");
        setLoading(false);
        return;
      }

      // Success! Reset anonymous counter & trigger post-signup choice
      resetAnonymousCount();
      triggerPostSignupFlow();
    } catch (err: any) {
      setError(err.message || "An error occurred.");
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginEmail.trim() || !loginPassword) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const ok = await login(loginEmail.trim().toLowerCase(), loginPassword);

      if (!ok) {
        setError("Invalid email or password. Please check your details.");
        setLoading(false);
        return;
      }

      // Success! Reset anonymous counter & close modal
      resetAnonymousCount();
      setShowSignupGate(false);
    } catch (err: any) {
      setError(err.message || "An error occurred during log in.");
      setLoading(false);
    }
  };

  return (
    <div
      data-active-gate-modal="true"
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200 my-auto">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] via-[#0642BA] to-[var(--color-secondary)] p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md mb-3 border border-white/20">
            <Lock className="w-6 h-6 text-amber-300" />
          </div>

          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold tracking-wide uppercase border border-amber-300/30">
            10 / 10 Anonymous Clicks Used
          </div>

          <h2 className="text-xl font-bold font-display leading-tight">
            Create your free account to keep reading
          </h2>
          <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
            You&apos;ve reached your anonymous browsing limit. Sign up now for unlimited preview access and personalized trade news.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setTab("signup");
              setError("");
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              tab === "signup"
                ? "bg-white text-[var(--color-primary)] shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Create Free Account
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setError("");
            }}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              tab === "login"
                ? "bg-white text-[var(--color-primary)] shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Log In
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 font-medium flex items-center gap-2">
              <span className="font-bold">!</span>
              <span>{error}</span>
            </div>
          )}

          {tab === "signup" ? (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-[11px] text-slate-600 leading-snug">
                  I agree to the Terms of Service & Privacy Policy to unlock reading.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#0642BA] text-white text-xs font-bold shadow-lg shadow-blue-900/15 hover:shadow-blue-900/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up & Continue"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#0642BA] text-white text-xs font-bold shadow-lg shadow-blue-900/15 hover:shadow-blue-900/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In & Continue"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure 256-bit SSL Registration</span>
          </div>
        </div>
      </div>
    </div>
  );
}

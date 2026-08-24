"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useActiveMode } from "@/contexts/ActiveModeContext";
import { SlidersHorizontal, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function OnboardingGateModal() {
  const router = useRouter();
  const { setShowOnboardingGate } = useActiveMode();

  const handleStartOnboarding = () => {
    setShowOnboardingGate(false);
    router.push("/onboarding");
  };

  return (
    <div
      data-active-gate-modal="true"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[var(--color-primary)] to-[#0642BA] p-7 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md mb-3 border border-white/20 shadow-inner">
            <SlidersHorizontal className="w-7 h-7 text-amber-300" />
          </div>

          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold tracking-wide uppercase border border-amber-300/30">
            10 / 10 Preview Clicks Reached
          </div>

          <h2 className="text-xl font-bold font-display leading-tight">
            Complete your onboarding to continue
          </h2>
          <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
            You&apos;ve used your 10 preview clicks as a registered reader. To continue reading unlimited articles, please complete your personalized feed setup.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              What you&apos;ll customize:
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                <span><strong>Sectors & Industries:</strong> Pick trade sectors you follow</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                <span><strong>Bilateral Countries:</strong> Track specific country corridors</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                <span><strong>Leaders & Reader Identity:</strong> Tailored leadership insights</span>
              </li>
            </ul>
          </div>

          {/* Hard Gate Action Only */}
          <button
            type="button"
            onClick={handleStartOnboarding}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[#0642BA] text-white font-bold text-sm shadow-xl shadow-blue-900/20 hover:shadow-blue-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Complete Onboarding Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Mandatory setup step • Takes ~60 seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

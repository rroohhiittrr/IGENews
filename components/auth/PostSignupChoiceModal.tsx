"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useActiveMode } from "@/contexts/ActiveModeContext";
import { Sparkles, Compass, ArrowRight, CheckCircle2 } from "lucide-react";

export default function PostSignupChoiceModal() {
  const router = useRouter();
  const { deferOnboarding, setShowPostSignupChoice } = useActiveMode();

  const handleSetupNow = () => {
    setShowPostSignupChoice(false);
    router.push("/onboarding");
  };

  const handleBrowseFirst = () => {
    deferOnboarding();
  };

  return (
    <div
      data-active-gate-modal="true"
      className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[var(--color-primary)] to-[#0642BA] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md mb-4 border border-white/20 shadow-inner">
            <Sparkles className="w-7 h-7 text-amber-300 animate-pulse" />
          </div>

          <span className="inline-block px-3 py-1 mb-3 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold tracking-wide uppercase border border-emerald-300/30">
            Account Created Successfully 🎉
          </span>

          <h2 className="text-2xl font-bold font-display leading-tight">
            Want to personalize your feed now?
          </h2>
          <p className="text-xs text-white/80 mt-2 max-w-md mx-auto leading-relaxed">
            Customize your news experience by selecting your preferred bilateral countries, trade sectors, industries, and leadership categories.
          </p>
        </div>

        {/* Action Choice Body */}
        <div className="p-6 space-y-4">
          {/* Option 1: Set it up now */}
          <button
            type="button"
            onClick={handleSetupNow}
            className="w-full text-left p-4 rounded-2xl border-2 border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] bg-blue-50/50 hover:bg-blue-50 transition-all group relative overflow-hidden shadow-sm hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">
                    Yes, set it up now
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[var(--color-primary)] text-[10px] font-bold">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Tailor your feed immediately (Sectors → Countries → Leaders) for maximum relevance.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--color-primary)] absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Option 2: Browse first */}
          <button
            type="button"
            onClick={handleBrowseFirst}
            className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white transition-all group relative"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex-1 pr-6">
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                  Not now, I&apos;ll browse first
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Browse with the default trade feed. (You can personalize anytime later or after 10 preview clicks).
                </p>
              </div>
            </div>
          </button>

          {/* Benefits summary list */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Full access to global trade headlines and market trends</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Personalization takes less than 60 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

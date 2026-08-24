"use client";

import React from "react";
import { useActiveMode } from "@/contexts/ActiveModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Zap, ZapOff } from "lucide-react";

export default function ActiveToggle() {
  const {
    isActiveMode,
    toggleActiveMode,
    anonymousClickCount,
    postSignupClickCount,
    onboardingStatus,
  } = useActiveMode();
  const { isLoggedIn } = useAuth();

  // Determine current click count to display
  let currentClicks = 0;
  let maxClicks = 10;
  let clickLabel = "Anon";

  if (!isLoggedIn) {
    currentClicks = anonymousClickCount;
    clickLabel = "Anon";
  } else if (onboardingStatus === "deferred") {
    currentClicks = postSignupClickCount;
    clickLabel = "Reg";
  } else {
    clickLabel = "Done";
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        id="active-mode-toggle"
        data-active-toggle="true"
        onClick={toggleActiveMode}
        title={isActiveMode ? "Active Mode is ON (10-click gating active)" : "Active Mode is OFF (Browsing unlocked)"}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-all duration-200 shadow-sm border ${
          isActiveMode
            ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 shadow-emerald-900/5"
            : "bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200"
        }`}
      >
        {/* Toggle Icon */}
        <span
          className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] ${
            isActiveMode ? "bg-emerald-600 text-white" : "bg-slate-400 text-white"
          }`}
        >
          {isActiveMode ? <Zap className="w-2.5 h-2.5 fill-current" /> : <ZapOff className="w-2.5 h-2.5" />}
        </span>

        {/* Name */}
        <span className="whitespace-nowrap font-bold">Active</span>

        {/* ON / OFF Switch Pill */}
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide transition-colors ${
            isActiveMode ? "bg-emerald-600 text-white" : "bg-slate-500 text-white"
          }`}
        >
          {isActiveMode ? "ON" : "OFF"}
        </span>

        {/* Live Click Counter Indicator Pill (Visible when Active Mode is ON) */}
        {isActiveMode && onboardingStatus !== "complete" && (
          <span
            className={`hidden md:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
              currentClicks >= 9
                ? "bg-red-500 text-white animate-pulse"
                : currentClicks >= 5
                ? "bg-amber-500 text-white"
                : "bg-emerald-200 text-emerald-900"
            }`}
          >
            {currentClicks}/{maxClicks}
          </span>
        )}
      </button>
    </div>
  );
}

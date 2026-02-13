"use client";

import { useState } from "react";
import { Globe, ChevronDown, SlidersHorizontal } from "lucide-react";

export type NewsViewType = "top" | "trending" | "headlines" | "discussed";

interface MobileHeaderProps {
  activeView: NewsViewType;
  onViewChange: (view: NewsViewType) => void;
}

const VIEW_OPTIONS: { value: NewsViewType; label: string; icon: string }[] = [
  { value: "top", label: "Top News", icon: "⭐" },
  { value: "trending", label: "Trending", icon: "🔥" },
  { value: "headlines", label: "Headlines", icon: "📰" },
  { value: "discussed", label: "Most Discussed", icon: "💬" },
];

const LANGUAGES = ["EN", "HI", "TA", "TE", "BN"];

export default function MobileHeader({ activeView, onViewChange }: MobileHeaderProps) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-neutral-light)] shadow-sm md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left — Language Toggle */}
        <div className="relative">
          <button
            onClick={() => { setShowLangMenu(!showLangMenu); setShowViewMenu(false); }}
            className="flex items-center gap-1 rounded-full bg-[var(--color-neutral-light)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-neutral-dark)] active:bg-[var(--color-neutral-mid)]/30"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{currentLang}</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showLangMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
              <div className="absolute left-0 top-full mt-1 z-50 min-w-[100px] rounded-xl border border-[var(--color-neutral-light)] bg-white py-1 shadow-xl">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setCurrentLang(lang); setShowLangMenu(false); }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      currentLang === lang
                        ? "bg-[var(--color-primary)] text-white font-medium"
                        : "text-[var(--color-neutral-dark)] active:bg-[var(--color-neutral-light)]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Center — Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <h1
            className="text-base font-bold text-[var(--color-primary)] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            India Global News
          </h1>
          <p className="text-[9px] text-[var(--color-neutral-dark)] leading-none -mt-0.5">
            by iGenWorld
          </p>
        </div>

        {/* Right — News Type Switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowViewMenu(!showViewMenu); setShowLangMenu(false); }}
            className="flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2.5 py-1.5 text-xs font-medium text-white active:bg-[var(--color-primary-dark)]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="max-w-[60px] truncate">{VIEW_OPTIONS.find(v => v.value === activeView)?.label}</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${showViewMenu ? "rotate-180" : ""}`} />
          </button>

          {showViewMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowViewMenu(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 min-w-[180px] rounded-xl border border-[var(--color-neutral-light)] bg-white py-1 shadow-xl overflow-hidden">
                {VIEW_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => { onViewChange(option.value); setShowViewMenu(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                      activeView === option.value
                        ? "bg-[var(--color-primary)] text-white font-medium"
                        : "text-[var(--color-neutral-dark)] active:bg-[var(--color-neutral-light)]"
                    }`}
                  >
                    <span className="text-base">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

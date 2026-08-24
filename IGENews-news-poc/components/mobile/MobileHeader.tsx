"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Globe, ChevronDown, SlidersHorizontal, Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export type NewsViewType = "top" | "trending" | "headlines" | "discussed";

interface MobileHeaderProps {
  activeView: NewsViewType;
  onViewChange: (view: NewsViewType) => void;
}

const VIEW_OPTIONS: { value: NewsViewType; label: string; icon: string }[] = [
  { value: "top",       label: "Top News",       icon: "⭐" },
  { value: "trending",  label: "Trending",        icon: "🔥" },
  { value: "headlines", label: "Headlines",       icon: "📰" },
  { value: "discussed", label: "Most Discussed",  icon: "💬" },
];

const LANGUAGES = ["EN", "HI", "TA", "TE", "BN"];

export default function MobileHeader({ activeView, onViewChange }: MobileHeaderProps) {
  const [showLangMenu,  setShowLangMenu]  = useState(false);
  const [showViewMenu,  setShowViewMenu]  = useState(false);
  const [currentLang,   setCurrentLang]   = useState("EN");
  const params  = useParams();
  const router  = useRouter();
  const locale  = (params?.locale as string) || "en";
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[var(--background)] border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)] shadow-sm md:hidden">
      {/* ── Row 1: Language | Logo | Actions ── */}
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
              <div className="absolute left-0 top-full mt-1 z-50 min-w-[100px] rounded-xl border border-[var(--color-neutral-light)] bg-white dark:bg-[var(--background)] py-1 shadow-xl">
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
        <div className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/IGEN NEWS - White Background - Rectangle.svg"
            alt="India Global News"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>

        {/* Right — Action Icons + View Switcher */}
        <div className="flex items-center gap-1.5">

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex items-center justify-center h-7 w-7 rounded-full bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] active:bg-[var(--color-neutral-mid)]/30 transition-colors"
          >
            {theme === "dark"
              ? <Sun className="h-3.5 w-3.5 text-[var(--color-accent-gold)]" />
              : <Moon className="h-3.5 w-3.5" />
            }
          </button>

          {/* Search icon */}
          <button
            onClick={() => router.push(`/${locale}/search`)}
            aria-label="Search"
            className="flex items-center justify-center h-7 w-7 rounded-full bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] active:bg-[var(--color-neutral-mid)]/30 transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => router.push(`/${locale}/profile`)}
            aria-label="Notifications"
            className="relative flex items-center justify-center h-7 w-7 rounded-full bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] active:bg-[var(--color-neutral-mid)]/30 transition-colors"
          >
            <Bell className="h-3.5 w-3.5" />
            {/* Unread dot */}
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-[var(--color-breaking)]" />
          </button>

          {/* News Type Switcher */}
          <div className="relative">
            <button
              onClick={() => { setShowViewMenu(!showViewMenu); setShowLangMenu(false); }}
              className="flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2.5 py-1.5 text-xs font-medium text-white active:bg-[var(--color-primary-dark)]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span className="max-w-[56px] truncate">{VIEW_OPTIONS.find(v => v.value === activeView)?.label}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${showViewMenu ? "rotate-180" : ""}`} />
            </button>

            {showViewMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowViewMenu(false)} />
                <div className="absolute right-0 top-full mt-1 z-50 min-w-[180px] rounded-xl border border-[var(--color-neutral-light)] bg-white dark:bg-[var(--background)] py-1 shadow-xl overflow-hidden">
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
      </div>
    </header>
  );
}

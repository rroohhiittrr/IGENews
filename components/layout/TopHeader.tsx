"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  User,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function TopHeader() {
  const t = useTranslations();
  const [isDark, setIsDark] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifCount] = useState(3);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[var(--color-neutral-light)] bg-white px-4 shadow-sm lg:px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0">
        <Image
          src="/IGEN NEWS - White Background - Rectangle.svg"
          alt="India Global News"
          width={160}
          height={40}
          className="h-9 w-auto object-contain"
          priority
        />
      </Link>

      {/* Search Bar */}
      <div className={`relative mx-4 hidden md:flex flex-1 max-w-xl transition-all duration-300 ${searchFocused ? 'max-w-2xl' : ''}`}>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-neutral-dark)]" />
          <input
            type="text"
            placeholder={t("header.searchPlaceholder")}
            className="w-full rounded-full border border-[var(--color-neutral-mid)] bg-[var(--color-neutral-light)] py-2 pl-10 pr-16 text-sm text-[var(--color-text-body)] placeholder-[var(--color-neutral-dark)] outline-none transition-all focus:border-[var(--color-secondary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-secondary)]/20"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden rounded border border-[var(--color-neutral-mid)] bg-white px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-neutral-dark)] lg:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile Search */}
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] md:hidden">
          <Search className="h-[18px] w-[18px]" />
        </button>

        {/* Language */}
        <button className="hidden items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] sm:flex">
          <Globe className="h-3.5 w-3.5" />
          <span>EN</span>
          <ChevronDown className="h-3 w-3" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]">
          <Bell className="h-[18px] w-[18px]" />
          {notifCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-breaking)] text-[9px] font-bold text-white">
              {notifCount}
            </span>
          )}
        </button>

        {/* Dark Mode */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]"
        >
          {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        {/* Plan Badge */}
        <span className="hidden rounded-full bg-[var(--color-neutral-light)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-neutral-dark)] uppercase tracking-wider sm:inline-block">
          {t("common.free")}
        </span>

        {/* Profile Avatar / Dossier Link */}
        <Link 
          href="/profile"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B4FBA] text-white text-xs font-bold hover:opacity-90 shadow-2xs"
          title="Company Dossier & Command Center"
        >
          <User className="h-4 w-4" />
        </Link>

        {/* Upgrade CTA */}
        <Link
          href="/profile/plans/company"
          className="hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#F0652E] to-amber-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all hover:opacity-95 sm:flex"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Enterprise Plans</span>
        </Link>
      </div>
    </header>
  );
}

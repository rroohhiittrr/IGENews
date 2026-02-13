"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Bell,
  BellOff,
  Moon,
  Sun,
  Globe,
  ChevronRight,
  Shield,
  HelpCircle,
  LogOut,
  Crown,
  Sparkles,
  Heart,
  Bookmark,
  BarChart3,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { sectors, countries } from "@/lib/mockData";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("EN");

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)]/30 pb-24">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-neutral-light)] shadow-sm md:hidden">
        <div className="px-4 py-3">
          <h1
            className="text-lg font-bold text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Profile
          </h1>
        </div>
      </header>

      {/* Desktop placeholder */}
      <div className="hidden md:block max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>Profile</h1>
        <p className="text-[var(--color-neutral-dark)] mt-2">This page is optimized for mobile view.</p>
      </div>

      {/* Mobile Content */}
      <div className="md:hidden">
        {/* User Card */}
        <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white border-2 border-white/30">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Guest User</h2>
              <p className="text-xs text-white/60">rroohhiittrr@gmail.com</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider">
                  Free Plan
                </span>
              </div>
            </div>
          </div>

          {/* Upgrade CTA */}
          <Link
            href="/plans"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-gold)] py-3 text-sm font-semibold text-white shadow-lg transition-all active:scale-[0.98]"
          >
            <Crown className="h-4 w-4" />
            Upgrade to Pro — Unlock All Sectors
          </Link>
        </div>

        {/* Sections */}
        <div className="px-4 mt-4 space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-white border border-[var(--color-neutral-light)] p-3 text-center shadow-sm">
              <Heart className="h-4 w-4 text-red-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-[var(--color-text-body)]">24</p>
              <p className="text-[10px] text-[var(--color-neutral-dark)]">Liked</p>
            </div>
            <div className="rounded-xl bg-white border border-[var(--color-neutral-light)] p-3 text-center shadow-sm">
              <Bookmark className="h-4 w-4 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-[var(--color-text-body)]">12</p>
              <p className="text-[10px] text-[var(--color-neutral-dark)]">Saved</p>
            </div>
            <div className="rounded-xl bg-white border border-[var(--color-neutral-light)] p-3 text-center shadow-sm">
              <BarChart3 className="h-4 w-4 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-[var(--color-text-body)]">156</p>
              <p className="text-[10px] text-[var(--color-neutral-dark)]">Read</p>
            </div>
          </div>

          {/* My Sectors */}
          <div className="rounded-xl bg-white border border-[var(--color-neutral-light)] p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
              My Sectors
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {sectors.slice(0, 6).map((sector) => (
                <span
                  key={sector.id}
                  className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--color-primary)]"
                >
                  {sector.icon} {sector.name}
                </span>
              ))}
              <span className="rounded-full bg-[var(--color-neutral-light)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-neutral-dark)]">
                +{sectors.length - 6} more
              </span>
            </div>
          </div>

          {/* My Countries */}
          <div className="rounded-xl bg-white border border-[var(--color-neutral-light)] p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
              My Countries
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {countries.slice(0, 5).map((country) => (
                <span
                  key={country.id}
                  className="rounded-full bg-[var(--color-secondary)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--color-secondary)]"
                >
                  {country.flagEmoji} {country.pairName}
                </span>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="rounded-xl bg-white border border-[var(--color-neutral-light)] shadow-sm overflow-hidden">
            <h3 className="px-4 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Settings
            </h3>

            {/* Notifications */}
            <button
              onClick={() => setNotifications(!notifications)}
              className="w-full flex items-center justify-between px-4 py-3 active:bg-[var(--color-neutral-light)]/50"
            >
              <div className="flex items-center gap-3">
                {notifications ? (
                  <Bell className="h-4 w-4 text-[var(--color-secondary)]" />
                ) : (
                  <BellOff className="h-4 w-4 text-[var(--color-neutral-dark)]" />
                )}
                <span className="text-sm text-[var(--color-text-body)]">Notifications</span>
              </div>
              <div
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  notifications ? "bg-[var(--color-secondary)]" : "bg-[var(--color-neutral-mid)]"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    notifications ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-between px-4 py-3 active:bg-[var(--color-neutral-light)]/50"
            >
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="h-4 w-4 text-indigo-500" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-500" />
                )}
                <span className="text-sm text-[var(--color-text-body)]">Dark Mode</span>
              </div>
              <div
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  darkMode ? "bg-indigo-500" : "bg-[var(--color-neutral-mid)]"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    darkMode ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </button>

            {/* Language */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-[var(--color-accent-green)]" />
                <span className="text-sm text-[var(--color-text-body)]">Language</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg bg-[var(--color-neutral-light)] px-2 py-1 text-xs font-medium text-[var(--color-neutral-dark)] outline-none"
              >
                <option value="EN">English</option>
                <option value="HI">हिंदी</option>
                <option value="TA">தமிழ்</option>
                <option value="TE">తెలుగు</option>
                <option value="BN">বাংলা</option>
              </select>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-neutral-light)]">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--color-neutral-dark)]" />
                <span className="text-sm text-[var(--color-text-body)]">Email</span>
              </div>
              <span className="text-xs text-[var(--color-neutral-dark)]">rroohhiittrr@gmail.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-xl bg-white border border-[var(--color-neutral-light)] shadow-sm overflow-hidden">
            <Link href="/help" className="flex items-center justify-between px-4 py-3 active:bg-[var(--color-neutral-light)]/50">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-4 w-4 text-[var(--color-neutral-dark)]" />
                <span className="text-sm text-[var(--color-text-body)]">Help & Support</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[var(--color-neutral-dark)]" />
            </Link>
            <Link href="/privacy" className="flex items-center justify-between px-4 py-3 active:bg-[var(--color-neutral-light)]/50 border-t border-[var(--color-neutral-light)]">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-[var(--color-neutral-dark)]" />
                <span className="text-sm text-[var(--color-text-body)]">Privacy & Terms</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[var(--color-neutral-dark)]" />
            </Link>
            <Link href="https://indiaglobalexpo.com" target="_blank" className="flex items-center justify-between px-4 py-3 active:bg-[var(--color-neutral-light)]/50 border-t border-[var(--color-neutral-light)]">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-[var(--color-accent-green)]" />
                <span className="text-sm text-[var(--color-text-body)]">India Global Expo</span>
              </div>
              <ChevronRight className="h-4 w-4 text-[var(--color-neutral-dark)]" />
            </Link>
          </div>

          {/* Logout */}
          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 border border-red-200 py-3 text-sm font-medium text-red-600 active:bg-red-100">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>

          {/* App Info */}
          <div className="text-center py-2">
            <p className="text-[10px] text-[var(--color-neutral-dark)]">
              India Global News v1.0.0 · by iGenWorld
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Logo from "@/components/header/Logo";
import SearchBar from "@/components/header/SearchBar";
import LanguageSelector from "@/components/header/LanguageSelector";
import NotificationBell from "@/components/header/NotificationBell";
import DarkModeToggle from "@/components/header/DarkModeToggle";
import PlanBadge from "@/components/header/PlanBadge";
import ProfileAvatar from "@/components/header/ProfileAvatar";
import UpgradeButton from "@/components/header/UpgradeButton";
import AuthButtons from "@/components/header/AuthButtons";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function TopHeader() {
  const { isLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[var(--color-neutral-light)] bg-white px-4 shadow-sm lg:px-6">
      <Logo />
      <SearchBar />
      <div className="flex items-center gap-1 sm:gap-2">
        <Link
          href="/about-igen"
          className="hidden sm:flex items-center rounded-full px-2.5 py-1.5 text-xs font-medium text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] transition-all"
        >
          About IGEN
        </Link>
        <LanguageSelector />
        <NotificationBell />
        <DarkModeToggle />
        {isLoggedIn ? (
          <>
            <PlanBadge />
            <ProfileAvatar />
            <UpgradeButton />
          </>
        ) : (
          <AuthButtons />
        )}
      </div>
    </header>
  );
}

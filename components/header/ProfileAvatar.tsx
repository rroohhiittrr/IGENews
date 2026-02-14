"use client";

import { User, ChevronDown, LogOut, Crown, Building2, Globe, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function ProfileAvatar() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsOpen(false);
    router.push("/login");
  };

  if (!isLoggedIn || !user) {
    return (
      <Link href="/login">
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-neutral-mid)] text-white text-xs font-semibold hover:bg-[var(--color-primary)] transition-colors">
          <User className="h-4 w-4" />
        </button>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] text-white px-3 py-1.5 hover:bg-[var(--color-primary-dark)] transition-all shadow-md hover:shadow-lg"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          <User className="h-4 w-4" />
        </div>
        <span className="hidden md:inline text-sm font-semibold">{user.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-2xl border border-[var(--color-neutral-light)] overflow-hidden z-50">
          {/* User Info Section */}
          <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 p-4 border-b border-[var(--color-neutral-light)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-md">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[var(--color-primary)] text-base" style={{ fontFamily: "var(--font-display)" }}>
                  {user.name}
                </h3>
                <p className="text-xs text-[var(--color-neutral-dark)]">{user.email}</p>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                  {user.plan === "free" ? "🆓" : <Crown className="h-3 w-3" />}
                  {user.plan.toUpperCase()} MEMBER
                </div>
              </div>
            </div>
          </div>

          {/* Onboarding Info */}
          {user.onboardingComplete && (user.sectors?.length > 0 || user.countries?.length > 0 || user.leaders?.length > 0) && (
            <div className="p-4 border-b border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)]/30">
              <p className="text-xs font-semibold text-[var(--color-neutral-dark)] mb-2">Your Interests</p>
              
              {/* Sectors */}
              {user.sectors && user.sectors.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Building2 className="h-3 w-3 text-[var(--color-secondary)]" />
                    <span className="text-xs font-medium text-[var(--color-neutral-dark)]">Sectors:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.sectors.slice(0, 3).map((sector) => (
                      <span key={sector} className="inline-block px-2 py-0.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs">
                        {sector}
                      </span>
                    ))}
                    {user.sectors.length > 3 && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--color-neutral-mid)]/10 text-[var(--color-neutral-dark)] text-xs">
                        +{user.sectors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Countries */}
              {user.countries && user.countries.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Globe className="h-3 w-3 text-[var(--color-primary)]" />
                    <span className="text-xs font-medium text-[var(--color-neutral-dark)]">Countries:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.countries.slice(0, 3).map((country) => (
                      <span key={country} className="inline-block px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs">
                        {country}
                      </span>
                    ))}
                    {user.countries.length > 3 && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--color-neutral-mid)]/10 text-[var(--color-neutral-dark)] text-xs">
                        +{user.countries.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Leaders */}
              {user.leaders && user.leaders.length > 0 && (
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Users className="h-3 w-3 text-[var(--color-accent)]" />
                    <span className="text-xs font-medium text-[var(--color-neutral-dark)]">Leader Roles:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.leaders.slice(0, 3).map((leader) => (
                      <span key={leader} className="inline-block px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs">
                        {leader}
                      </span>
                    ))}
                    {user.leaders.length > 3 && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--color-neutral-mid)]/10 text-[var(--color-neutral-dark)] text-xs">
                        +{user.leaders.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Onboarding Incomplete Warning */}
          {!user.onboardingComplete && (
            <div className="p-3 bg-amber-50 border-b border-amber-200">
              <p className="text-xs text-amber-800">
                ⚠️ <Link href="/onboarding" className="underline font-semibold hover:text-amber-900">Complete your onboarding</Link> to personalize your news feed
              </p>
            </div>
          )}

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-neutral-light)]/50 transition-colors"
            >
              <User className="h-4 w-4 text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--color-neutral-dark)]">View Full Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { Settings, ChevronLeft } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import InterestsCard from "@/components/profile/InterestsCard";
import ActivityStats from "@/components/profile/ActivityStats";
import MyNewsSection from "@/components/profile/MyNewsSection";

export default function ProfilePage() {
  const { user, isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push(`/${locale}/login`);
    }
  }, [isLoggedIn, loading, router, locale]);

  // Show loading state while checking authentication
  if (loading || !isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-[var(--color-neutral-light)]/30 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-neutral-dark)]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)]/30 pb-28">
      {/* ── Mobile-only sticky header ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-[var(--background)] border-b border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-mid)] shadow-sm md:hidden">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center h-7 w-7 rounded-full bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] active:bg-[var(--color-neutral-mid)]/30 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <h1
          className="text-base font-bold text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          My Profile
        </h1>

        <button
          className="flex items-center justify-center h-7 w-7 rounded-full bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] active:bg-[var(--color-neutral-mid)]/30 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </header>

      {/* ── Page content ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 md:pt-8">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column: Interests (4 cols) */}
          <div className="lg:col-span-5 h-full">
            <InterestsCard user={user} />
          </div>

          {/* Right Column: Stats (8 cols) */}
          <div className="lg:col-span-7 h-full">
            <ActivityStats />
          </div>
        </div>

        {/* Full Width: My News / Activity */}
        <MyNewsSection />
      </div>
    </div>
  );
}

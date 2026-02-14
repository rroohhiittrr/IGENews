"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import InterestsCard from "@/components/profile/InterestsCard";
import ActivityStats from "@/components/profile/ActivityStats";
import MyNewsSection from "@/components/profile/MyNewsSection";

export default function ProfilePage() {
  const { user, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, loading, router]);

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
    <div className="min-h-screen bg-[var(--color-neutral-light)]/30 pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
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

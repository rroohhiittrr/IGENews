"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Search } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import InterestsCard from "@/components/profile/InterestsCard";
import ActivityStats from "@/components/profile/ActivityStats";
import AuthorityCard from "@/components/profile/AuthorityCard";
import UpgradeJourneyCard from "@/components/profile/UpgradeJourneyCard";

export default function ProfileHome() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="p-5 md:p-8 lg:p-10">
      {/* Top Bar */}
      <div className="hidden md:flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1E3A5F]" style={{ fontFamily: "var(--font-display)" }}>
          Profile
        </h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-11 pr-6 py-2.5 rounded-full bg-white shadow-sm text-sm w-72 border-none focus:outline-none focus:ring-2 focus:ring-[#F4A024] transition-all"
          />
        </div>
      </div>

      {/* Mobile top gap for status bar */}
      <div className="h-2 md:hidden" />

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left / Center */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
          <ProfileHeader user={user} />
          <AuthorityCard user={user} />
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:space-y-8">
          <InterestsCard user={user} />
          <UpgradeJourneyCard user={user} />
        </div>
      </div>

      {/* Activity below */}
      <div className="mt-6 lg:mt-8">
        <ActivityStats />
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/contexts/AuthContext";
import { User, LogIn } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/profile/ProfileHeader";
import InterestsCard from "@/components/profile/InterestsCard";
import ActivityStats from "@/components/profile/ActivityStats";
import MyNewsSection from "@/components/profile/MyNewsSection";

export default function ProfilePage() {
  const { user, isLoggedIn } = useAuth();

  // If not logged in, show login prompt
  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-[var(--color-neutral-light)]/30 pb-24 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-8 py-12 rounded-3xl bg-white shadow-2xl max-w-md mx-4"
        >
          <div className="h-20 w-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-[var(--color-primary)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Please Log In
          </h2>
          <p className="text-[var(--color-neutral-dark)] mb-8 leading-relaxed">
            Join our community to access your personalized profile, save articles, and track your reading history.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full px-6 py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Log In Now
            </Link>
            <p className="text-sm text-[var(--color-neutral-dark)]">
              Don't have an account? <Link href="/signup" className="text-[var(--color-secondary)] font-semibold hover:underline">Sign up</Link>
            </p>
          </div>
        </motion.div>
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

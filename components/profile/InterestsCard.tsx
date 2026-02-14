"use client";

import { UserProfile } from "@/contexts/AuthContext";
import { Building2, Globe, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface InterestsCardProps {
  user: UserProfile;
}

export default function InterestsCard({ user }: InterestsCardProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (!user.onboardingComplete) {
     return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-lg border border-amber-100"
        >
            <h2 className="text-lg font-bold text-amber-900 mb-2">Complete Your Profile</h2>
            <p className="text-sm text-amber-800 mb-4">You haven't completed your onboarding yet. Tell us your interests to get personalized news.</p>
            <Link href="/onboarding" className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg font-medium text-sm hover:bg-amber-700 transition-colors">
                Complete Onboarding <ChevronRight className="h-4 w-4" />
            </Link>
        </motion.div>
     )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-3xl bg-white p-6 shadow-xl border border-[var(--color-neutral-light)] h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
          Your Interests
        </h2>
        <Link href="/onboarding" className="text-xs font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
            Edit Interests
        </Link>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 flex-1"
      >
        {/* Sectors */}
        <motion.div variants={item}>
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                    <Building2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-neutral-dark)]">Sectors</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {user.sectors?.length > 0 ? (
                    user.sectors.map((sector) => (
                        <span key={sector} className="px-3 py-1 rounded-full bg-[var(--color-neutral-light)]/50 text-xs font-medium text-[var(--color-neutral-dark)] border border-[var(--color-neutral-light)]">
                            {sector}
                        </span>
                    ))
                ) : (
                    <span className="text-xs text-[var(--color-neutral-mid)] italic">No sectors selected</span>
                )}
            </div>
        </motion.div>

        {/* Countries */}
        <motion.div variants={item}>
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Globe className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-neutral-dark)]">Countries</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {user.countries?.length > 0 ? (
                    user.countries.map((country) => (
                        <span key={country} className="px-3 py-1 rounded-full bg-[var(--color-neutral-light)]/50 text-xs font-medium text-[var(--color-neutral-dark)] border border-[var(--color-neutral-light)]">
                            {country}
                        </span>
                    ))
                ) : (
                    <span className="text-xs text-[var(--color-neutral-mid)] italic">No countries selected</span>
                )}
            </div>
        </motion.div>

        {/* Leaders */}
        <motion.div variants={item}>
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    <Users className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-neutral-dark)]">Leader Roles</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {user.leaders?.length > 0 ? (
                    user.leaders.map((leader) => (
                        <span key={leader} className="px-3 py-1 rounded-full bg-[var(--color-neutral-light)]/50 text-xs font-medium text-[var(--color-neutral-dark)] border border-[var(--color-neutral-light)]">
                            {leader}
                        </span>
                    ))
                ) : (
                    <span className="text-xs text-[var(--color-neutral-mid)] italic">No roles selected</span>
                )}
            </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

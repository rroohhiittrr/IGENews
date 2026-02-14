"use client";

import { UserProfile } from "@/contexts/AuthContext";
import { User, Mail, Phone, Crown, Calendar, Edit2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  user: UserProfile;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  // Mock data for display purposes
  const joinDate = "Oct 2023";
  const memberSince = "Free Member";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl border border-[var(--color-neutral-light)]"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[var(--color-primary-light)]/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-[var(--color-secondary-light)]/10 blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="h-28 w-28 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-1 shadow-lg">
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <User className="h-12 w-12 text-[var(--color-neutral-mid)]" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-[var(--color-neutral-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
              {user.name}
            </h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold border border-[var(--color-primary)]/20 w-fit mx-auto md:mx-0">
              {user.plan === "free" ? "🆓" : <Crown className="h-3 w-3" />}
              {user.plan.toUpperCase()} MEMBER
            </span>
          </div>

          <div className="flex flex-col gap-1 text-sm text-[var(--color-neutral-dark)] items-center md:items-start">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[var(--color-neutral-mid)]" />
              <span>{user.email}</span>
            </div>
            {user.mobile && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--color-neutral-mid)]" />
                <span>{user.mobile}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[var(--color-neutral-mid)]" />
              <span>Joined {joinDate}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
            Edit Profile
          </button>
          <button className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-white border border-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] font-semibold hover:bg-[var(--color-neutral-light)] transition-colors text-sm">
            Account Settings
          </button>
        </div>
      </div>
    </motion.div>
  );
}

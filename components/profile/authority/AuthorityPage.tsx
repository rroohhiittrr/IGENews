"use client";

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { BadgeCheck, Star, Trophy, TrendingUp, Shield, Zap, Medal, CheckCircle, Lock } from "lucide-react";

export default function AuthorityPage() {
  const { user } = useAuth();
  const isVerified = user?.accountType === "sme" || user?.accountType === "leader";

  const badges = [
    { icon: Star,       label: "Founding Member",        earned: true,  color: "text-amber-500",  bg: "bg-amber-50",   border: "border-amber-200" },
    { icon: TrendingUp, label: "Active Reader",           earned: true,  color: "text-blue-500",   bg: "bg-blue-50",    border: "border-blue-200" },
    { icon: Shield,     label: "Sector Enthusiast",       earned: true,  color: "text-emerald-500",bg: "bg-emerald-50", border: "border-emerald-200" },
    { icon: Trophy,     label: "Top Commentator",         earned: false, color: "text-gray-400",   bg: "bg-gray-50",    border: "border-gray-200" },
    { icon: Medal,      label: "Verified Industry Voice", earned: false, color: "text-gray-400",   bg: "bg-gray-50",    border: "border-gray-200" },
    { icon: Zap,        label: "Trade Intelligence Pro",  earned: false, color: "text-gray-400",   bg: "bg-gray-50",    border: "border-gray-200" },
  ];

  const stages = [
    { n: 1, title: "Reader",      desc: "Consuming intelligence — reading and bookmarking content.",          done: true,                         active: true  },
    { n: 2, title: "Contributor", desc: "Engaging & sharing — commenting and participating in discussions.", done: user?.accountType !== "reader", active: true  },
    { n: 3, title: "Authority",   desc: "Verified expert — publishing articles and building reputation.",    done: false,                         active: isVerified },
    { n: 4, title: "Influence",   desc: "Monetization & impact — consulting, reports, speaking.",            done: false,                         active: false },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E3A5F]" style={{ fontFamily: "var(--font-display)" }}>
          Authority & Recognition
        </h1>
        <p className="text-sm text-gray-500 mt-1">Your digital industry identity, reputation, and growth journey</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left */}
        <div className="space-y-6">
          {/* Verification */}
          <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isVerified ? "bg-blue-50 text-blue-500" : "bg-gray-100 text-gray-400"}`}>
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#1E3A5F] text-sm">{isVerified ? "Verified Identity" : "Unverified"}</h3>
                <p className="text-xs text-gray-500">{isVerified ? "Your profile is verified" : "Apply for verification"}</p>
              </div>
            </div>
            {!isVerified && (
              <button className="w-full py-2.5 bg-[#1E3A5F] text-white text-sm font-bold rounded-xl hover:bg-[#F4A024] transition-colors">
                Apply for SME Status
              </button>
            )}
          </div>

          {/* Reputation Score */}
          <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#1E3A5F]">Reputation Score</h3>
              <span className="text-2xl font-black text-[#F4A024]">740</span>
            </div>
            <div className="h-3 w-full bg-[#f4f7fb] rounded-full overflow-hidden mb-2">
              <motion.div initial={{ width: 0 }} animate={{ width: "74%" }} transition={{ duration: 1.2, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#F4A024] rounded-full" />
            </div>
            <p className="text-xs text-gray-400 mb-4">74% — Top 15% in your tracked sectors</p>
            <div className="grid grid-cols-2 gap-3">
              {[["Articles","342"],["Comments","42"],["Likes","856"],["Reports","8"]].map(([l,v]) => (
                <div key={l} className="bg-[#f4f7fb] rounded-xl p-3 text-center">
                  <div className="text-lg font-black text-[#1E3A5F]">{v}</div>
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="xl:col-span-2 space-y-6">
          {/* Growth Journey */}
          <div className="bg-white rounded-[28px] p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#1E3A5F] mb-8 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F4A024]" /> Growth Journey
            </h3>
            <div className="relative pl-8">
              <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-[#1E3A5F]/15 rounded-full" />
              <div className="space-y-5">
                {stages.map((s) => (
                  <div key={s.n} className={`relative flex gap-5 ${!s.active ? "opacity-40" : ""}`}>
                    <div className={`absolute -left-8 z-10 w-6 h-6 rounded-full border-4 border-[#f4f7fb] shadow-md ${s.done ? "bg-[#F4A024]" : s.active ? "bg-[#1E3A5F]" : "bg-gray-300"}`} />
                    <div className={`flex-1 rounded-2xl p-5 ${s.done ? "bg-[#f4f7fb]" : s.active ? "bg-[#1E3A5F]/5 border border-[#1E3A5F]/10" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-1 gap-4 flex-wrap">
                        <h4 className={`font-bold text-base ${s.active ? "text-[#1E3A5F]" : "text-gray-400"}`}>
                          Stage {s.n}: {s.title}
                        </h4>
                        {s.done
                          ? <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg"><CheckCircle className="w-3.5 h-3.5" /> Done</span>
                          : !s.active
                          ? <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-lg"><Lock className="w-3.5 h-3.5" /> Locked</span>
                          : null
                        }
                      </div>
                      <p className={`text-sm leading-relaxed ${s.active ? "text-gray-600" : "text-gray-400"}`}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-[28px] p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#1E3A5F] mb-6 flex items-center gap-2">
              <Medal className="w-5 h-5 text-[#F4A024]" /> Achievements & Badges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {badges.map((b) => (
                <div key={b.label} className={`rounded-2xl p-4 border text-center hover:shadow-md transition-all ${b.earned ? `${b.bg} ${b.border}` : "bg-gray-50 border-gray-100"}`}>
                  <div className={`w-12 h-12 rounded-2xl ${b.earned ? b.bg : "bg-gray-100"} flex items-center justify-center mx-auto mb-3`}>
                    <b.icon className={`w-6 h-6 ${b.color}`} />
                  </div>
                  <p className={`text-xs font-bold leading-snug ${b.earned ? "text-[#1E3A5F]" : "text-gray-400"}`}>{b.label}</p>
                  {!b.earned && <p className="text-[10px] text-gray-400 mt-1">Not yet earned</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

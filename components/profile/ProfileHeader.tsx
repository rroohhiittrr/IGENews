"use client";

import { UserProfile } from "@/contexts/AuthContext";
import { Edit2, Instagram, Facebook, Twitter, Linkedin, Send, BadgeCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProfileHeaderProps {
  user: UserProfile;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const getMemberStatus = (user: UserProfile) => {
    const role = user.onboardingRole || "reader";
    
    if (role === "sme") {
      const isPaid = user.smePlan === "pro" || user.smePlan === "elite" || user.smePlan === "sovereign";
      const status = user.onboardingStatus || "Draft";
      if (status === "Approved" && isPaid) {
        return { isFree: false, label: "Verified SME", badgeType: "blue-tick" };
      }
      return { isFree: true, label: "Free & Unverified — Self-Declared", badgeType: "orange-star" };
    }
    
    if (role === "associate-sme") {
      const isPaid = user.associateSmePlan === "pro" || user.associateSmePlan === "elite" || user.associateSmePlan === "sovereign" || user.associateSmePlan === "plus" || user.associateSmePlan === "premium";
      const status = user.onboardingStatus || "Draft";
      if (status === "Approved" && isPaid) {
        return { isFree: false, label: "Verified Associate SME", badgeType: "blue-tick" };
      }
      return { isFree: true, label: "Free & Unverified — Self-Declared", badgeType: "orange-star" };
    }
    
    if (role === "company") {
      const isPaid = user.companyPlan === "silver" || user.companyPlan === "gold";
      const status = user.onboardingStatus || "Draft";
      if (status === "Approved" && isPaid) {
        return { isFree: false, label: "Verified Company", badgeType: "blue-tick" };
      }
      return { isFree: true, label: "Unverified Company Listing", badgeType: "orange-star" };
    }
    
    if (role === "leader") {
      const isPaid = user.leaderPlan === "pioneer" || user.leaderPlan === "luminary" || user.leaderPlan === "sovereign" || user.leaderPlan === "verified" || user.leaderPlan === "elite";
      const status = user.onboardingStatus || "Draft";
      if (status === "Approved" && isPaid) {
        const tierName = user.leaderPlan === "sovereign" ? "Sovereign Leader" : user.leaderPlan === "luminary" ? "Luminary Leader" : "Pioneer Leader";
        return { isFree: false, label: `Verified ${tierName}`, badgeType: "blue-tick" };
      }
      return { isFree: true, label: "Free & Unverified — Self-Declared", badgeType: "orange-star" };
    }
    
    // Default to reader
    const isReaderPaid = user.readerPlan === "pro" || user.readerPlan === "premium" || user.readerPlan === "enterprise";
    if (isReaderPaid) {
      return { isFree: false, label: "Verified Reader", badgeType: "blue-tick" };
    }
    return { isFree: true, label: "Free Reader", badgeType: "orange-star" };
  };

  const statusInfo = getMemberStatus(user);
  const username = user.email.split("@")[0];
  const roleSlug = user.onboardingRole || "reader";
  const publicUrl = `indiaglobalnews.com/${roleSlug}/${username}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#122238] rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/5 relative text-left"
    >
      {/* Badge + Edit top right */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        {statusInfo.isFree && (
          <Link 
            href={`/${locale}/profile/plans/${roleSlug}`}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#C55A11] text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity"
            title="Free Member — Profile Unverified. Upgrade to get Verified Blue Tick."
          >
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span>FREE MEMBER</span>
          </Link>
        )}
        <button className="text-gray-400 hover:text-[#F0652E] transition-colors">
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#8b5cf6] p-1 flex items-center justify-center overflow-hidden shadow-lg">
             <div className="w-full h-full rounded-full bg-[#a78bfa] flex items-end justify-center relative">
                <div className="w-16 h-16 bg-white/40 rounded-full absolute top-6"></div>
                <div className="w-24 h-24 bg-white/30 rounded-t-full relative top-6"></div>
             </div>
          </div>
        </div>

        {/* Info Area */}
        <div className="flex-1 text-center md:text-left space-y-4 pt-2">
           <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2">
              <h2 className="text-2xl font-bold text-[#1D1D46] dark:text-white">
                {(!user.name || user.name === "SME Pro User" || user.name === "Your Name" || user.name.toLowerCase().includes("user"))
                  ? (user.onboardingRole === "company" || user.accountType === "company" ? "Mehta Traders" : user.onboardingRole === "sme" ? "Dr. Vikram Malhotra" : user.onboardingRole === "associate-sme" ? "Ananya Krishnan" : user.onboardingRole === "leader" ? "Karan Singhania" : "Mehta Traders")
                  : user.name}
              </h2>
              {!statusInfo.isFree && (
                 <span className="px-2 py-0.5 bg-blue-50 text-[#1D1D46] dark:bg-blue-950/20 dark:text-blue-400 text-[10px] font-black rounded-lg border border-blue-200 dark:border-transparent uppercase tracking-wider flex items-center gap-1 shrink-0">
                    <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" /> Verified
                 </span>
              )}
           </div>
           
           <span className="inline-block text-[10px] font-bold text-[#F0652E] bg-[#F0652E]/10 px-3 py-1 rounded-full uppercase tracking-widest">
              {statusInfo.label}
           </span>
           
           <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto md:mx-0">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                 <span className="font-medium text-gray-400 sm:w-36 text-left">Registration date:</span>
                 <span className="text-[#1D1D46] dark:text-white font-medium text-left">24 November 2026</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                 <span className="font-medium text-gray-400 sm:w-36 text-left">Country, city:</span>
                 <span className="text-[#1D1D46] dark:text-white font-medium text-left">{user.countries?.[0] || "Not set"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                 <span className="font-medium text-gray-400 sm:w-36 text-left">E-mail:</span>
                 <span className="text-[#1D1D46] dark:text-white font-medium text-left">{user.email}</span>
              </div>
              {user.mobile && (
                 <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-medium text-gray-400 sm:w-36 text-left">Phone:</span>
                    <span className="text-[#1D1D46] dark:text-white font-medium text-left">{user.mobile}</span>
                 </div>
              )}
              <div className="flex flex-col sm:flex-row sm:gap-2">
                 <span className="font-medium text-gray-400 sm:w-36 text-left">Public Profile URL:</span>
                 <span className="text-[#1D1D46] dark:text-white font-mono text-xs font-semibold text-left select-all truncate">{publicUrl}</span>
              </div>
           </div>

           {/* Social Icons */}
           <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
              {[Instagram, Facebook, Twitter, Linkedin, Send].map((Icon, i) => (
                 <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#1D1D46] text-white flex items-center justify-center hover:bg-[#F0652E] hover:-translate-y-1 transition-all shadow-md">
                    <Icon className="w-4 h-4" />
                  </a>
              ))}
           </div>
        </div>

      </div>
    </motion.div>
  );
}

"use client";

import { UserProfile } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

interface UpgradeJourneyCardProps {
  user: UserProfile;
}

export default function UpgradeJourneyCard({ user }: UpgradeJourneyCardProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-[#1D1D46] rounded-[32px] p-8 shadow-xl text-white h-full flex flex-col relative overflow-hidden"
    >
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <h2 className="text-xl font-medium mb-1 opacity-90">Individual Subscription</h2>
      <h3 className="text-2xl font-bold text-[#F0652E] mb-8">IGENews Premium</h3>

      <ul className="space-y-4 mb-10 flex-1 text-sm text-white/90 font-light leading-relaxed">
         <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0 opacity-80"></span>
            <span>1 month Premium for free</span>
         </li>
         <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0 opacity-80"></span>
            <span>Unlimited access to industry reports and SME insights</span>
         </li>
         <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0 opacity-80"></span>
            <span>Cancel anytime</span>
         </li>
         <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0 opacity-80"></span>
            <span>Best promotions, discounts, and monthly offers</span>
         </li>
      </ul>

      <Link href={`/${locale}/profile/plans/reader`} className="block w-full py-3.5 bg-white text-[#1D1D46] text-center font-bold rounded-2xl shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:bg-[#F0652E] hover:text-white transition-colors relative z-10">
        Subscribe
      </Link>
    </motion.div>
  );
}

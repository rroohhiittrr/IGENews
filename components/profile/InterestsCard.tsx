"use client";

import { UserProfile } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Building2, Globe } from "lucide-react";

interface InterestsCardProps {
  user: UserProfile;
}

export default function InterestsCard({ user }: InterestsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full"
    >
      <h2 className="text-xl font-bold text-[#1E3A5F] mb-6">Identity Details</h2>

      <div className="space-y-6">
         <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Primary Role:</p>
            <div className="bg-[#f4f7fb] px-4 py-3 rounded-2xl text-sm font-bold text-[#1E3A5F] capitalize shadow-inner">
               {user.accountType ? user.accountType.replace("-", " ") : "Not selected"}
            </div>
         </div>

         <div>
            <p className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
               <Building2 className="w-4 h-4" /> Tracked Sectors:
            </p>
            <div className="flex flex-wrap gap-2">
               {user.sectors?.slice(0, 3).map(s => (
                  <span key={s} className="px-3 py-1.5 bg-[#1E3A5F] text-white text-xs font-bold rounded-xl shadow-sm capitalize">
                     {s.replace("-", " ")}
                  </span>
               ))}
               {user.sectors?.length > 3 && (
                  <span className="px-3 py-1.5 bg-[#f4f7fb] text-[#1E3A5F] text-xs font-bold rounded-xl shadow-sm">
                     +{user.sectors.length - 3}
                  </span>
               )}
            </div>
         </div>

         <div>
            <p className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
               <Globe className="w-4 h-4" /> Tracked Regions:
            </p>
            <div className="flex flex-wrap gap-2">
               {user.countries?.slice(0, 3).map(c => (
                  <span key={c} className="px-3 py-1.5 bg-[#F4A024] text-white text-xs font-bold rounded-xl shadow-sm">
                     {c}
                  </span>
               ))}
               {user.countries?.length > 3 && (
                  <span className="px-3 py-1.5 bg-[#f4f7fb] text-[#1E3A5F] text-xs font-bold rounded-xl shadow-sm">
                     +{user.countries.length - 3}
                  </span>
               )}
            </div>
         </div>
      </div>
    </motion.div>
  );
}

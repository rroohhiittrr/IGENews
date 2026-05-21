"use client";

import { UserProfile } from "@/contexts/AuthContext";
import { Edit2, Instagram, Facebook, Twitter, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  user: UserProfile;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative"
    >
      <button className="absolute top-6 right-6 text-gray-400 hover:text-[#F4A024] transition-colors">
        <Edit2 className="w-5 h-5" />
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Avatar with circle background */}
        <div className="relative shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#8b5cf6] p-1 flex items-center justify-center overflow-hidden shadow-lg">
             {/* Abstract person shape since no photo */}
             <div className="w-full h-full rounded-full bg-[#a78bfa] flex items-end justify-center relative">
                <div className="w-16 h-16 bg-white/40 rounded-full absolute top-6"></div>
                <div className="w-24 h-24 bg-white/30 rounded-t-full relative top-6"></div>
             </div>
          </div>
        </div>

        {/* Info Area */}
        <div className="flex-1 text-center md:text-left space-y-4 pt-2">
           <h2 className="text-2xl font-bold text-[#1E3A5F]">{user.name || "User Name"}</h2>
           
           <div className="space-y-2 text-sm text-gray-500 max-w-md mx-auto md:mx-0">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                 <span className="font-medium text-gray-400 sm:w-36 text-left">Registration date:</span>
                 <span className="text-[#1E3A5F] font-medium text-left">24 November 2026</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                 <span className="font-medium text-gray-400 sm:w-36 text-left">Country, city:</span>
                 <span className="text-[#1E3A5F] font-medium text-left">{user.countries?.[0] || "Not set"}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                 <span className="font-medium text-gray-400 sm:w-36 text-left">E-mail:</span>
                 <span className="text-[#1E3A5F] font-medium text-left">{user.email}</span>
              </div>
              {user.mobile && (
                 <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-medium text-gray-400 sm:w-36 text-left">Phone:</span>
                    <span className="text-[#1E3A5F] font-medium text-left">{user.mobile}</span>
                 </div>
              )}
           </div>

           {/* Social Icons */}
           <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
              {[Instagram, Facebook, Twitter, Linkedin, Send].map((Icon, i) => (
                 <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center hover:bg-[#F4A024] hover:-translate-y-1 transition-all shadow-md">
                    <Icon className="w-4 h-4" />
                 </a>
              ))}
           </div>
        </div>

      </div>
    </motion.div>
  );
}

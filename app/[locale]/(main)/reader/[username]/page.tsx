"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, MapPin, Briefcase, Calendar, 
  MessageSquare, BookOpen, Compass, 
  ArrowLeft, Check, UserPlus, Info
} from "lucide-react";
import { SECTORS } from "@/lib/sectors";

// Helper to format date
const formatMonthYear = () => {
  const d = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

export default function ReaderPublicProfile() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const locale = (params?.locale as string) || "en";
  const username = params?.username as string;

  const [activeTab, setActiveTab] = useState<"activity" | "comments" | "interests">("interests");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(12);

  // Determine if viewing own public profile or someone else's
  const isOwnProfile = user?.email?.split("@")[0] === username;

  // Retrieve user variables or mock visitor details
  const displayName = isOwnProfile ? (user?.name || "Reader") : `${username.charAt(0).toUpperCase() + username.slice(1)} Reader`;
  const avatarBase64 = isOwnProfile ? (user?.onboardingForm?.avatarBase64 || "") : "";
  const profession = isOwnProfile ? (user?.onboardingForm?.profession || "Import Coordinator") : "Global Sourcing Analyst";
  const organisation = isOwnProfile ? (user?.onboardingForm?.organisation || "Acme Logistics") : "Trade Operations India";
  const country = isOwnProfile ? (user?.onboardingForm?.country || "India") : "India";
  const city = isOwnProfile ? (user?.onboardingForm?.city || "Mumbai") : "Mumbai";
  const sectors = isOwnProfile ? (user?.sectors || ["pharma", "it", "logistics"]) : ["manufacturing", "logistics", "retail"];

  const getSectorName = (id: string) => {
    return SECTORS.find(s => s.id === id)?.name || id;
  };

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowersCount(prev => prev - 1);
    } else {
      setFollowersCount(prev => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] dark:bg-[#0b1329] py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Button */}
        <div className="flex justify-start">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#122238] border border-gray-150 dark:border-white/5 rounded-xl text-xs font-bold text-[#1D1D46] dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        </div>

        {/* ── PUBLIC PROFILE HEADER (Section 1.4) ── */}
        <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm text-left relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
            <Star className="w-72 h-72 text-[#C55A11] -mr-20 -mb-20" />
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            
            {/* Avatar (120x120px display) */}
            <div className="shrink-0">
              {avatarBase64 ? (
                <img 
                  src={avatarBase64} 
                  alt={displayName} 
                  className="w-[120px] h-[120px] rounded-full object-cover border-4 border-[#1D1D46]/10 shadow-md"
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#1D1D46] to-[#0642BA] text-white flex items-center justify-center font-bold text-3xl uppercase shadow-md border-4 border-white dark:border-[#122238]">
                  {displayName.slice(0, 2)}
                </div>
              )}
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center md:text-left space-y-4 pt-1">
              <div className="space-y-1.5">
                
                {/* Name & FREE MEMBER Badge */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  <h1 className="text-2xl md:text-3xl font-bold text-[#1D1D46] dark:text-white">{displayName}</h1>
                  
                  {/* FREE MEMBER orange star badge with custom tooltip */}
                  <div 
                    className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#C55A11] text-white text-[9px] font-black rounded-lg uppercase tracking-wider shadow-sm cursor-help relative group"
                  >
                    <Star className="w-3 h-3 fill-white text-white" />
                    <span>FREE MEMBER</span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-gray-900 text-white text-[9px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg leading-normal font-semibold z-30">
                      Free Member — Profile Unverified. This member has not yet completed identity verification.
                    </div>
                  </div>
                </div>

                {/* Profession / Role & Location */}
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  {profession} {organisation && `at ${organisation}`}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-gray-400 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {city}, {country}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> iGEN Member Since {formatMonthYear()}</span>
                </div>
              </div>

              {/* Action and stats counts */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
                <div className="flex gap-4 text-xs text-gray-500">
                  <span><strong>{followersCount}</strong> followers</span>
                  <span><strong>{sectors.length}</strong> sectors followed</span>
                </div>

                {!isOwnProfile && (
                  <button 
                    onClick={handleFollowToggle}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                      isFollowing 
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                        : "bg-[#1D1D46] hover:bg-[#0642BA] text-white"
                    }`}
                  >
                    {isFollowing ? <><Check className="w-3.5 h-3.5" /> Following</> : `+ Follow ${displayName}`}
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* ── PUBLIC TABS (Section 1.4) ── */}
        <div className="bg-white dark:bg-[#122238] rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm text-left">
          
          {/* Tab Navigation */}
          <div className="flex gap-1 border-b border-gray-100 dark:border-white/5 pb-3 mb-6">
            {[
              { id: "interests", label: "Interests", icon: Compass },
              { id: "comments", label: "Comments Bank", icon: MessageSquare },
              { id: "activity", label: "Activity Stats", icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isActive 
                      ? "bg-[#1D1D46] text-white"
                      : "text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          <AnimatePresence mode="wait">
            
            {/* Interests Tab */}
            {activeTab === "interests" && (
              <motion.div 
                key="interests" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm">Followed Sectors & Interests</h3>
                <p className="text-xs text-gray-400">Trade directories and news feeds followed by this reader.</p>
                
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {sectors.map((sectorId) => (
                    <span 
                      key={sectorId} 
                      className="px-4 py-2 bg-[#f4f7fb] dark:bg-white/5 text-[#1D1D46] dark:text-gray-300 text-xs font-bold rounded-xl border border-gray-150 dark:border-white/5 shadow-sm capitalize"
                    >
                      {getSectorName(sectorId)}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Comments Tab */}
            {activeTab === "comments" && (
              <motion.div 
                key="comments" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm">Public Comments Bank</h3>
                <p className="text-xs text-gray-400">Chronological list of public insights and comments contributed on articles.</p>

                <div className="space-y-4 pt-2">
                  {[
                    {
                      id: "com-1",
                      articleTitle: "Pharma API Import Duty Reductions: What Exporters Need to Know",
                      commentText: "Great analysis on pharma import duties. This will help local formulation labs manage API sourcing risks more effectively.",
                      time: "2 hours ago",
                      likes: 14
                    },
                    {
                      id: "com-2",
                      articleTitle: "Global Semiconductor Alliance: Bilateral Treaties & Directives",
                      commentText: "The semiconductor corridor is a major step for manufacturing partnerships. Hopefully, the logistics timelines can be reduced as well.",
                      time: "2 days ago",
                      likes: 8
                    }
                  ].map((com) => (
                    <div key={com.id} className="p-4 bg-[#f4f7fb] dark:bg-white/5 rounded-2xl space-y-2 border border-transparent">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-[10px] text-gray-400 font-medium">Commented on: <strong className="text-blue-500 cursor-pointer hover:underline">{com.articleTitle}</strong></span>
                        <span className="text-[9px] text-gray-400 shrink-0">{com.time}</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-200 font-medium leading-relaxed">"{com.commentText}"</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#F0652E] font-bold">
                        <span>★ {com.likes} likes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Activity Tab (Hidden for free) */}
            {activeTab === "activity" && (
              <motion.div 
                key="activity" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="font-bold text-[#1D1D46] dark:text-white text-sm">Public Reading Activity</h3>
                
                <div className="p-6 bg-orange-500/5 border border-dashed border-orange-500/20 rounded-2xl flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-3">
                  <Info className="w-8 h-8 text-orange-500" />
                  <h4 className="text-xs font-bold text-[#1D1D46] dark:text-white">Activity History is Private</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    Reading history details and article counters are kept strictly private on the Free Reader plan. Only premium Pro members can configure public activity visibility stats.
                  </p>
                  <button 
                    onClick={() => router.push(`/${locale}/profile/plans/reader`)}
                    className="px-4 py-2 bg-[#C55A11] hover:bg-[#A0450B] text-white text-[10px] font-black rounded-xl uppercase tracking-wider transition-all"
                  >
                    View Pro Upgrade Options
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}

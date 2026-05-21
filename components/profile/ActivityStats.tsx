"use client";

import { Bookmark, Heart, MessageCircle, Clock, TrendingUp, BookOpen, Download, Users, Globe, Activity, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityStats() {
  const stats = [
    { label: "Articles Read", value: "342", icon: BookOpen, color: "text-[#1E3A5F]", bg: "bg-[#f4f7fb]", trend: "+24%" },
    { label: "Bookmarks", value: "124", icon: Bookmark, color: "text-[#F4A024]", bg: "bg-orange-50", trend: "+12%" },
    { label: "Likes Given", value: "856", icon: Heart, color: "text-rose-600", bg: "bg-rose-50", trend: "+5%" },
    { label: "Comments", value: "42", icon: MessageCircle, color: "text-blue-600", bg: "bg-blue-50", trend: "+2" },
    { label: "Read Later", value: "15", icon: Clock, color: "text-slate-600", bg: "bg-slate-100", trend: "-3" },
    { label: "Reports", value: "8", icon: Download, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+1" },
    { label: "Following", value: "34", icon: Users, color: "text-violet-600", bg: "bg-violet-50", trend: "+8" },
    { label: "Regions", value: "5", icon: Globe, color: "text-teal-600", bg: "bg-teal-50", trend: "0" },
    { label: "Activity", value: "88", icon: Activity, color: "text-cyan-600", bg: "bg-cyan-50", trend: "+4%" },
    { label: "Reputation", value: "740", icon: Award, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+15" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-[#1E3A5F]">Overview</h2>
        <span className="text-xs font-bold px-4 py-2 rounded-xl bg-[#f4f7fb] text-[#1E3A5F]">
          Last 30 Days
        </span>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={{ y: -4, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
            className="rounded-3xl bg-[#f4f7fb]/50 p-5 border border-gray-100 flex flex-col justify-between transition-all hover:bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-700 bg-emerald-100' : stat.trend === '0' ? 'text-slate-600 bg-slate-200' : 'text-rose-700 bg-rose-100'} px-2 py-1 rounded-xl`}>
                {stat.trend.startsWith('+') && <TrendingUp className="h-3 w-3 mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-[#1E3A5F] tracking-tight">{stat.value}</h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

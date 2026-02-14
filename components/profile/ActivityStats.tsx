"use client";

import { Bookmark, Heart, MessageCircle, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityStats() {
  // Mock data - in a real app, these would come from the database
  const stats = [
    {
      label: "Bookmarks",
      value: "124",
      icon: Bookmark,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+12%"
    },
    {
      label: "Likes Given",
      value: "856",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50",
      trend: "+5%"
    },
    {
      label: "Comments",
      value: "42",
      icon: MessageCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      trend: "+2"
    },
    {
      label: "Read Later",
      value: "15",
      icon: Clock,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      trend: "-3"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-display)" }}>
          Overview
        </h2>
        <span className="text-xs text-[var(--color-neutral-mid)]">Last 30 Days</span>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 flex-1"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="rounded-2xl bg-white p-4 shadow-lg border border-[var(--color-neutral-light)] flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'} px-1.5 py-0.5 rounded-full`}>
                {stat.trend.startsWith('+') && <TrendingUp className="h-2 w-2 mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{stat.value}</h3>
              <p className="text-xs text-[var(--color-neutral-dark)] font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

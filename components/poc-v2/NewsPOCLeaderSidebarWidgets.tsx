"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

export function TrendingLeadersCard() {
  const leaders = [
    {
      country: "US",
      name: "Jensen Huang",
      role: "CEO, NVIDIA",
      badge: "↑ Trending",
      badgeStyle: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
    },
    {
      country: "IN",
      name: "Nandan Nilekani",
      role: "Chairman, Infosys",
      badge: "↑ High",
      badgeStyle: "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
    },
    {
      country: "IN",
      name: "Shaktikanta Das",
      role: "Governor, RBI",
      badge: "↑ Rising",
      badgeStyle: "bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
    },
    {
      country: "IN",
      name: "N. Chandrasekaran",
      role: "Chairman, Tata Sons",
      badge: "↑ Rising",
      badgeStyle: "bg-blue-100/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
    },
    {
      country: "IN",
      name: "Mukesh Ambani",
      role: "Chairman, Reliance",
      badge: "→ Stable",
      badgeStyle: "bg-gray-200/80 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <h3 className="font-serif text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            TRENDING LEADERS
          </h3>
        </div>
        <span className="bg-emerald-100/80 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
          High Traffic
        </span>
      </div>

      {/* Leader Items */}
      <div className="space-y-2.5">
        {leaders.map((leader, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-2xs hover:border-blue-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-xs flex items-center justify-center shrink-0">
                {leader.country}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {leader.name}
                </h4>
                <p className="text-[10px] text-gray-400 font-normal truncate">
                  {leader.role}
                </p>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${leader.badgeStyle}`}>
              {leader.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrendingTopicsCard() {
  const topics = [
    "#AI Leadership",
    "#CEO Succession",
    "#Executive Appointments",
    "#Corporate Strategy",
    "#Leadership Changes",
    "#Business Expansion",
    "#Sustainability",
    "#Innovation"
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
      <h3 className="font-serif text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
        TRENDING TOPICS
      </h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, idx) => (
          <span
            key={idx}
            className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all cursor-pointer shadow-2xs"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RecommendedReportsCard() {
  const [activeTab, setActiveTab] = useState<"free" | "premium">("free");

  const reports = [
    {
      category: "Tech Leadership",
      tag: "Free",
      title: "India Tech Executive Survey Q1 2026",
      description: "Key strategies deployed by top 100 Indian enterprise CEOs regarding domestic production and supply lines.",
      buttonText: "Download Free"
    },
    {
      category: "Logistics",
      tag: "Free",
      title: "Global Logistics Executive Report",
      description: "Strategic shifts and corridor routing adjustments adopted by maritime and shipping directors.",
      buttonText: "Download Free"
    }
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          RECOMMENDED REPORTS
        </h3>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1 inline-flex items-center gap-1">
          <button
            onClick={() => setActiveTab("free")}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
              activeTab === "free"
                ? "bg-blue-600 text-white shadow-2xs"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600"
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${
              activeTab === "premium"
                ? "bg-blue-600 text-white shadow-2xs"
                : "text-gray-500 dark:text-gray-400 hover:text-blue-600"
            }`}
          >
            Premium
          </button>
        </div>
      </div>

      {/* Reports */}
      <div className="space-y-3">
        {reports.map((report, idx) => (
          <div
            key={idx}
            className="border border-slate-800 dark:border-gray-700 rounded-2xl p-4 space-y-3 bg-white dark:bg-gray-900/60"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-gray-400">{report.category}</span>
              <span className="font-semibold text-blue-600">{report.tag}</span>
            </div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">
              {report.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              {report.description}
            </p>
            <button
              onClick={() => alert(`Downloading report: ${report.title}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-full text-center block transition-colors shadow-xs"
            >
              {report.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NewsPOCLeaderSidebarWidgets() {
  return (
    <div className="space-y-6">
      <TrendingLeadersCard />
      <TrendingTopicsCard />
      <RecommendedReportsCard />
    </div>
  );
}

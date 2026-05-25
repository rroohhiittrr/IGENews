"use client";

import { Check, X, ShieldAlert, Sparkles } from "lucide-react";

export default function ReaderFreeInfo() {
  const benefits = [
    "Access to limited daily news",
    "Access to sector headlines",
    "Limited AI combined news",
    "Save articles",
    "Follow sectors",
    "Join newsletters",
    "Basic profile",
    "Limited bookmarks",
    "Limited comments",
    "Access to public company pages",
    "Access to public leader pages",
  ];

  const restrictions = [
    "No premium reports",
    "No exclusive SME articles",
    "No AI deep intelligence",
    "Limited monthly article reads",
  ];

  return (
    <div className="bg-white dark:bg-[#122238] rounded-[32px] p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-sm max-w-2xl mx-auto my-8">
      <div className="flex items-center gap-2.5 mb-4">
        <Sparkles className="w-5 h-5 text-[#F4A024]" />
        <h2 className="text-xl font-bold text-[#1E3A5F] dark:text-white">Your Free Reader Plan</h2>
      </div>
      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        You are currently on the Free Reader plan. You can view general news feed items, follow specific bilateral trade sectors, and browse directories.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold text-[#1E3A5F] dark:text-white uppercase tracking-wider mb-3">Included Features:</h4>
          <ul className="space-y-2.5">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" /> Restrictions:
          </h4>
          <ul className="space-y-2.5">
            {restrictions.map((restriction, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>{restriction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

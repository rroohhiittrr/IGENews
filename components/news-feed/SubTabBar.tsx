"use client";

import { useState } from "react";
import { FeedTab } from "@/types/types";

interface SubTabBarProps {
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
  prefix?: string;
}

const TABS: { id: FeedTab; label: string }[] = [
  { id: "sector", label: "Sector News" },
  { id: "country", label: "Country News" },
  { id: "leader", label: "Leader News" },
];

export default function SubTabBar({ activeTab, onTabChange, prefix = "Feed" }: SubTabBarProps) {
  return (
    <div className="flex border-b border-[var(--color-neutral-light)]">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "text-[var(--color-primary)]"
              : "text-[var(--color-neutral-dark)] hover:text-[var(--color-primary)]"
          }`}
        >
          {tab.label} {prefix}
          {/* Active indicator */}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t bg-[var(--color-secondary)]" />
          )}
        </button>
      ))}
    </div>
  );
}

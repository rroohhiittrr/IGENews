"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Newspaper,
  LayoutList,
  Grid3X3,
  TrendingUp,
  Search,
  Bookmark,
  Clock,
} from "lucide-react";
import { useTranslations } from "next-intl";



export default function NavigationPanel() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navItems = [
    { label: t("feed") || "Intelligence Stream", href: "/", icon: Newspaper },
    { label: t("headlines") || "Sector Headlines", href: "/headlines", icon: LayoutList },
    { label: t("categories") || "GDP Categories", href: "/categories", icon: Grid3X3 },
    { label: t("trending") || "Market Movement", href: "/trending", icon: TrendingUp },
    { label: t("search") || "Predictive Search", href: "/search", icon: Search },
    { label: t("bookmarks") || "Saved Dossiers", href: "/mynews?tab=bookmarks", icon: Bookmark },
    { label: t("readLater") || "Briefing Queue", href: "/mynews?tab=readlater", icon: Clock },
  ];

  const isActive = (href: string) => {
    // Handle locale prefix in pathname
    const cleanPath = pathname.replace(/^\/(en|hi|ta|kn)/, '') || '/';
    if (href === "/") return cleanPath === "/";
    return cleanPath.startsWith(href.split("?")[0]);
  };

  return (
    <nav className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] p-3 shadow-2xs space-y-1">
      <h3 className="mb-2 px-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
        Executive Navigation
      </h3>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              active
                ? "bg-[#0B4FBA] text-white shadow-xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
